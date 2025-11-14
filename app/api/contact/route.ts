import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { formatFileSize } from "@/lib/s3";

const resend = new Resend(process.env.RESEND_API_KEY);

interface AttachmentInfo {
  url: string;
  fileName: string;
  fileSize: number;
  contentType: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, attachments = [] } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Generate attachments HTML
    const attachmentsHtml =
      attachments.length > 0
        ? `
      <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Attachments (${
          attachments.length
        })</h3>
        ${attachments
          .map(
            (attachment: AttachmentInfo) => `
          <div style="background-color: white; padding: 12px; border-radius: 4px; margin: 8px 0; border-left: 4px solid #007bff;">
            <p style="margin: 0; font-weight: bold;">
              <a href="${
                attachment.url
              }" style="color: #007bff; text-decoration: none;" target="_blank">
                📎 ${attachment.fileName}
              </a>
            </p>
            <p style="margin: 4px 0 0 0; color: #666; font-size: 12px;">
              Size: ${formatFileSize(attachment.fileSize)} | Type: ${
              attachment.contentType
            }
            </p>
          </div>
        `
          )
          .join("")}
        <p style="color: #666; font-size: 11px; margin: 10px 0 0 0;">
          Click on the attachment names above to download the files.
        </p>
      </div>
    `
        : "";

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@yourdomain.com",
      to: [process.env.TO_EMAIL || "your-email@example.com"],
      subject: `New Contact Form Message from ${name}${
        attachments.length > 0
          ? ` (${attachments.length} attachment${
              attachments.length > 1 ? "s" : ""
            })`
          : ""
      }`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">
${message}
            </div>
          </div>
          ${attachmentsHtml}
          <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from the Tailgate Warriors contact form.
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
