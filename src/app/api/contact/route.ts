import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organization, message } = body;

    // Validate incoming data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Simulate network delay for realistic loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate successful email send
    console.log("=========================================");
    console.log("✅ SIMULATED EMAIL SENT SUCCESSFULLY");
    console.log("From:", name);
    console.log("Email:", email);
    console.log("Organization:", organization || "N/A");
    console.log("Message:");
    console.log(message);
    console.log("=========================================");

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
