import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to } = body;

    if (!to) {
      return NextResponse.json(
        { error: 'Email address required' },
        { status: 400 }
      );
    }

    // Send test email
    const { data, error } = await resend.emails.send({
      from: 'RefVault <noreply@refvault.co.uk>',
      to: [to],
      subject: 'Test Email from RefVault',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">✉️ Test Email</h1>
            </div>

            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #667eea; margin-top: 0;">Email Delivery Test Successful!</h2>

              <p>This is a test email sent from your RefVault application.</p>

              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">✅ What This Confirms:</h3>
                <ul style="margin-bottom: 0;">
                  <li><strong>Resend API</strong> is configured correctly</li>
                  <li><strong>Domain verification</strong> (refvault.co.uk) is working</li>
                  <li><strong>Email delivery</strong> is operational</li>
                  <li><strong>DNS records</strong> are properly set up</li>
                </ul>
              </div>

              <h3 style="color: #333;">Email Configuration Details:</h3>
              <table style="width: 100%; background: white; border-radius: 8px; padding: 15px; margin: 10px 0;">
                <tr>
                  <td style="padding: 8px; color: #666;"><strong>From:</strong></td>
                  <td style="padding: 8px;">RefVault &lt;noreply@refvault.co.uk&gt;</td>
                </tr>
                <tr>
                  <td style="padding: 8px; color: #666;"><strong>To:</strong></td>
                  <td style="padding: 8px;">${to}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; color: #666;"><strong>Provider:</strong></td>
                  <td style="padding: 8px;">Resend</td>
                </tr>
                <tr>
                  <td style="padding: 8px; color: #666;"><strong>Domain:</strong></td>
                  <td style="padding: 8px;">refvault.co.uk</td>
                </tr>
              </table>

              <p style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <strong>Note:</strong> This is an automated test email. Your production email system is working correctly.
                You can safely delete this message.
              </p>
            </div>

            <div style="text-align: center; color: #999; font-size: 12px; margin-top: 30px;">
              <p>RefVault - Secure Reference Management</p>
              <p>
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color: #667eea; text-decoration: none;">Visit RefVault</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || 'Failed to send test email'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      emailId: data?.id,
      to: to,
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
