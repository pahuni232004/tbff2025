export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lazy initialization - Resend will be created when needed
let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Email configuration
const FROM_EMAIL = process.env.CONFIRMATION_EMAIL_FROM || 'noreply@thebhopalfilmfestival.com';
const FESTIVAL_EMAIL = process.env.FESTIVAL_CONTACT_EMAIL || 'info@thebhopalfilmfestival.com';

/**
 * API Route to send confirmation email to film submission users
 * 
 * Environment variables required:
 * - RESEND_API_KEY: Your Resend API key
 * - CONFIRMATION_EMAIL_FROM: Email address to send from (must be verified in Resend)
 * - FESTIVAL_CONTACT_EMAIL: Contact email for the festival (optional)
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the submission data
    const submissionData = await request.json();

    // Validate required fields
    if (!submissionData.emailAddress) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    if (!submissionData.fullName || !submissionData.filmTitle) {
      return NextResponse.json(
        { error: 'Missing required submission data' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      // Don't fail the request, just log the error
      // This allows the form submission to succeed even if email fails
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create email HTML template
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TBFF 2025 Submission Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #FFCE21; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #091529; font-size: 28px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                TBFF 2025
              </h1>
              <p style="margin: 10px 0 0 0; color: #091529; font-size: 16px;">
                The Bhopal Film Festival
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #091529; font-size: 24px; font-weight: bold;">
                Thank You for Your Submission!
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Dear ${submissionData.fullName},
              </p>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                We have successfully received your film submission for <strong>The Bhopal Film Festival 2025</strong>. 
                We are excited to review your work!
              </p>
              
              <!-- Submission Details -->
              <div style="background-color: #f9f9f9; border-left: 4px solid #FFCE21; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 15px 0; color: #091529; font-size: 18px; font-weight: bold;">
                  Your Submission Details:
                </h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 140px;"><strong>Film Title:</strong></td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${submissionData.filmTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Category:</strong></td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${submissionData.filmCategory}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Submitted By:</strong></td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${submissionData.fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${submissionData.emailAddress}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>City:</strong></td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${submissionData.city}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Submission Date:</strong></td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px;">${new Date(submissionData.submittedAt || new Date().toISOString()).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Next Steps -->
              <div style="margin: 25px 0;">
                <h3 style="margin: 0 0 15px 0; color: #091529; font-size: 18px; font-weight: bold;">
                  What Happens Next?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                  <li>Our jury panel will review all submissions carefully</li>
                  <li>Official selections will be announced by <strong>January 30, 2026</strong></li>
                  <li>Selected filmmakers will be notified via email or phone</li>
                  <li>The festival will take place on <strong>February 21, 2026</strong> at Ravindra Bhawan Auditorium, Bhopal</li>
                </ul>
              </div>
              
              <!-- Important Notes -->
              <div style="background-color: #fff9e6; border: 1px solid #FFCE21; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; color: #091529; font-size: 15px; font-weight: bold;">
                  ⚠️ Important Reminders:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #333333; font-size: 14px; line-height: 1.6;">
                  <li>Please ensure your film link remains active until February 2026</li>
                  <li>Keep this email for your records</li>
                  <li>Do not submit duplicate entries for the same film</li>
                </ul>
              </div>
              
              <!-- Contact Information -->
              <p style="margin: 25px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                If you have any questions or need to update your submission, please contact us at:
              </p>
              <p style="margin: 10px 0 0 0; color: #091529; font-size: 16px;">
                <strong>Email:</strong> <a href="mailto:${FESTIVAL_EMAIL}" style="color: #091529; text-decoration: none;">${FESTIVAL_EMAIL}</a>
              </p>
              
              <p style="margin: 30px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                We wish you the best of luck with your submission!
              </p>
              
              <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong>The Bhopal Film Festival Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #091529; padding: 30px 40px; text-align: center;">
              <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6;">
                The Bhopal Film Festival 2025<br>
                <span style="color: #FFCE21;">Celebrating the unique culture of Central India</span>
              </p>
              <p style="margin: 15px 0 0 0; color: #ffffff; font-size: 12px; opacity: 0.8;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Plain text version for email clients that don't support HTML
    const emailText = `
TBFF 2025 - Submission Confirmation

Dear ${submissionData.fullName},

We have successfully received your film submission for The Bhopal Film Festival 2025. We are excited to review your work!

Your Submission Details:
- Film Title: ${submissionData.filmTitle}
- Category: ${submissionData.filmCategory}
- Submitted By: ${submissionData.fullName}
- Email: ${submissionData.emailAddress}
- City: ${submissionData.city}
- Submission Date: ${new Date(submissionData.submittedAt || new Date().toISOString()).toLocaleDateString('en-IN', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

What Happens Next?
- Our jury panel will review all submissions carefully
- Official selections will be announced by January 30, 2026
- Selected filmmakers will be notified via email or phone
- The festival will take place on February 21, 2026 at Ravindra Bhawan Auditorium, Bhopal

Important Reminders:
- Please ensure your film link remains active until February 2026
- Keep this email for your records
- Do not submit duplicate entries for the same film

If you have any questions, please contact us at: ${FESTIVAL_EMAIL}

We wish you the best of luck with your submission!

Best regards,
The Bhopal Film Festival Team

---
The Bhopal Film Festival 2025
Celebrating the unique culture of Central India
This is an automated confirmation email. Please do not reply to this message.
    `;

    // Send email using Resend
    const resendClient = getResend();
    if (!resendClient) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }
    
    const { data, error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: submissionData.emailAddress,
      subject: 'TBFF 2025 - Submission Confirmation',
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Confirmation email sent successfully:', data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Confirmation email sent successfully',
        emailId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while sending the confirmation email' 
      },
      { status: 500 }
    );
  }
}

