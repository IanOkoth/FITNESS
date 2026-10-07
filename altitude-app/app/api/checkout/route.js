import { NextResponse } from "next/server";
import { CURRENCY, productById } from "../../lib/merch";

/**
 * POST /api/checkout
 * Initializes a Paystack transaction (card + M-Pesa for KES) and returns the
 * hosted checkout URL. Prices are recomputed from the server-side catalog so
 * client-supplied prices are never trusted.
 *
 * Requires env var PAYSTACK_SECRET_KEY. When it is missing the route responds
 * { configured: false } so the front end can fall back to a WhatsApp order.
 */
export async function POST(request) {
  try {
    const { email, items, callbackUrl } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    // Recompute the total from trusted catalog data.
    let amount = 0;
    const lineSummary = [];
    for (const line of items) {
      const product = productById(line?.id);
      const qty = Math.max(1, Math.min(99, parseInt(line?.qty, 10) || 0));
      if (!product) {
        return NextResponse.json(
          { error: `Unknown product: ${line?.id}` },
          { status: 400 }
        );
      }
      amount += product.price * qty;
      lineSummary.push(`${qty} x ${product.name} (${line?.size || "-"})`);
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      // Payments not configured yet — tell the client to use the WhatsApp path.
      return NextResponse.json({ configured: false });
    }

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack expects the smallest currency unit.
        currency: CURRENCY,
        callback_url: callbackUrl,
        metadata: { order: lineSummary.join(", ") },
      }),
    });

    const data = await res.json();
    if (!res.ok || !data?.status) {
      return NextResponse.json(
        { error: data?.message || "Payment provider error." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Something went wrong starting checkout." },
      { status: 500 }
    );
  }
}
