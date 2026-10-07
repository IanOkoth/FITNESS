import { NextResponse } from "next/server";

/**
 * GET /api/checkout/verify?reference=XXX
 * Confirms a Paystack transaction after the customer returns from checkout.
 */
export async function GET(request) {
  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Missing reference." }, { status: 400 });
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ configured: false });
  }

  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${secret}` } }
    );
    const data = await res.json();
    const ok = data?.status && data?.data?.status === "success";
    return NextResponse.json({
      status: ok ? "success" : data?.data?.status || "failed",
      amount: data?.data?.amount ? data.data.amount / 100 : null,
      reference,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ error: "Could not verify payment." }, { status: 500 });
  }
}
