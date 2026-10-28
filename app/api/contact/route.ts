import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, ContactFormData } from "@/lib/validation/contact";

// Simple in-memory rate limiting map: IP -> timestamp array
const ipSubmissionTracker = new Map<string, number[]>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipSubmissionTracker.get(ip) || [];
  
  // Filter out timestamps older than the window
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipSubmissionTracker.set(ip, recentTimestamps);
    return true;
  }
  
  recentTimestamps.push(now);
  ipSubmissionTracker.set(ip, recentTimestamps);
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a minute before sending another message.",
        },
        { status: 429 }
      );
    }

    const body = (await req.json()) as Partial<ContactFormData>;

    // Validate request body
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      if (validation.errors.honeypot) {
        // Honeypot tripped
        return NextResponse.json(
          { success: false, error: "Spam detection triggered." },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.errors },
        { status: 422 }
      );
    }

    // Check if live email provider is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactRecipient = process.env.CONTACT_EMAIL || "samir.dev@example.com";
    const allowDemo = process.env.ALLOW_DEMO_SUBMISSIONS === "true";

    if (resendApiKey) {
      // Live email dispatch with Resend REST API
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [contactRecipient],
          reply_to: body.email,
          subject: `Portfolio Message from ${body.name}: ${body.subject}`,
          text: `Name: ${body.name}\nEmail: ${body.email}\nSubject: ${body.subject}\n\nMessage:\n${body.message}`,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.json().catch(() => ({}));
        console.error("Resend delivery failed:", errorData);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to dispatch email via mail provider. Please contact directly via email.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Thank you! Your message was transmitted successfully. I will get back to you shortly.",
      });
    }

    if (allowDemo) {
      // Demo environment enabled by developer
      console.log("Demo contact submission received:", {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      });

      return NextResponse.json({
        success: true,
        demoMode: true,
        message: "Message processed in demo mode. (Configure RESEND_API_KEY in .env.local for live inbox routing).",
      });
    }

    // Email provider is not configured: follow strict requirement:
    // "If a backend or email provider is not configured, explain what environment variables and setup steps are required. Never display a success message when a message has not actually been submitted."
    return NextResponse.json(
      {
        success: false,
        requiresConfiguration: true,
        error:
          "Email service not yet configured. Please set RESEND_API_KEY in .env.local to enable direct inbox delivery, or reach out directly at samir.dev@example.com.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
