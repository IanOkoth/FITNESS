import { NextResponse } from "next/server";

/**
 * POST /api/contact
 * Receives the contact form submission.
 * Currently logs to console — replace with email service, database, or webhook.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, phone, country, goal, format, message, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ ok: true }); // silently accept spam
    }

    // Basic validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    // Process the submission
    // TODO: Replace with your preferred backend action:
    //   - Send an email (nodemailer, SendGrid, Resend, etc.)
    //   - Save to database (Prisma, Drizzle, etc.)
    //   - Forward to webhook (Slack, Zapier, etc.)
    console.log("📩 New contact form submission:", {
      name: name.trim(),
      email: email.trim(),
      phone: phone || "",
      country: country || "",
      goal: goal || "",
      format: format || "",
      message: message || "",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: "Request received. Your coach will reply within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
