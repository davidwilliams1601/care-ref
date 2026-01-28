import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { email, displayName, userType } = await request.json();

    if (!email || !displayName || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - skipping welcome email');
      return NextResponse.json({
        success: true,
        message: 'Email sending skipped (API key not configured)'
      });
    }

    // Initialize Resend client at runtime
    const resend = new Resend(process.env.RESEND_API_KEY);

    const userTypeLabel = userType === 'worker' ? 'Care Worker' : 'Agency';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';

    try {
      const { data, error } = await resend.emails.send({
        from: 'RefVault <noreply@refvault.co.uk>',
        to: [email],
        subject: 'Welcome to RefVault! 🎉',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to RefVault</title>
            </head>
            <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to RefVault!</h1>
              </div>

              <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
                <p style="font-size: 18px; margin-top: 0;">Hi ${displayName},</p>

                <p style="font-size: 16px;">Thank you for creating your ${userTypeLabel} account with RefVault!</p>

                ${userType === 'worker' ? `
                  <p style="font-size: 16px;">You can now:</p>
                  <ul style="font-size: 16px; padding-left: 20px;">
                    <li>Request references from former employers</li>
                    <li>Store all your job references securely in one place</li>
                    <li>Share references instantly with potential employers</li>
                    <li>Track who has viewed your references</li>
                  </ul>
                ` : `
                  <p style="font-size: 16px;">You can now:</p>
                  <ul style="font-size: 16px; padding-left: 20px;">
                    <li>Access verified references from care workers</li>
                    <li>Streamline your recruitment process</li>
                    <li>View AI-generated summaries of references</li>
                    <li>Contact referees directly for verification</li>
                  </ul>
                `}

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${baseUrl}/dashboard" style="background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                    Go to Dashboard
                  </a>
                </div>

                <p style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  Need help? Contact us at <a href="mailto:support@refvault.co.uk" style="color: #667eea; text-decoration: none;">support@refvault.co.uk</a>
                </p>
              </div>

              <div style="text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
                <p style="margin: 5px 0;">© ${new Date().getFullYear()} RefVault. All rights reserved.</p>
                <p style="margin: 5px 0;">Secure reference management for the care industry.</p>
              </div>
            </body>
          </html>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        // Don't fail - return success anyway since user account was created
        return NextResponse.json({
          success: true,
          message: 'Account created successfully (email delivery pending)'
        });
      }

      return NextResponse.json({ success: true, data });
    } catch (emailError: any) {
      console.error('Email sending failed:', emailError);
      // Don't fail - return success anyway since user account was created
      return NextResponse.json({
        success: true,
        message: 'Account created successfully (email not sent)'
      });
    }
  } catch (error: any) {
    console.error('Welcome email error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send welcome email' },
      { status: 500 }
    );
  }
}
