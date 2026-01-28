
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import type { ReferenceRequest } from '@/types';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendReferenceRequestSchema = z.object({
  workerId: z.string(),
  employerName: z.string(),
  employerEmail: z.string().email(),
  jobTitle: z.string(),
});

export async function sendReferenceRequest(
  values: z.infer<typeof sendReferenceRequestSchema>
) {
  try {
    const validatedData = sendReferenceRequestSchema.parse(values);

    // Generate unique ID for the request
    const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Create reference to user's requests sub-collection
    const requestRef = adminDb
      .collection('users')
      .doc(validatedData.workerId)
      .collection('requests')
      .doc(requestId);

    // Prepare request data for Firestore
    const requestData = {
      workerId: validatedData.workerId,
      employerName: validatedData.employerName,
      employerEmail: validatedData.employerEmail,
      jobTitle: validatedData.jobTitle,
      status: 'Sent',
      dateRequested: FieldValue.serverTimestamp(),
      dateCompleted: null,
    };

    // Write to Firestore
    await requestRef.set(requestData);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
    const referenceLink = `${baseUrl}/reference/${requestId}`;

    // Try to send email, but don't fail if it doesn't work
    try {
      const { data, error} = await resend.emails.send({
        from: 'RefVault <noreply@refvault.co.uk>',
        to: [validatedData.employerEmail],
        subject: `Reference Request for ${validatedData.jobTitle} at ${validatedData.employerName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Reference Request</h1>
              </div>

              <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px; margin-top: 0;">Hello,</p>

                <p style="font-size: 16px;">A former employee has requested a reference from you through RefVault for their role as <strong>${validatedData.jobTitle}</strong> at <strong>${validatedData.employerName}</strong>.</p>

                <p style="font-size: 16px;">RefVault is a secure platform that makes providing employment references quick and simple. Your responses will be stored securely and shared only with authorized agencies.</p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${referenceLink}" style="background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">
                    Provide Reference
                  </a>
                </div>

                <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
                  This link is unique and secure. It will take you to a simple form where you can provide your reference.
                </p>

                <p style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  Questions? Contact us at <a href="mailto:support@refvault.co.uk" style="color: #667eea; text-decoration: none;">support@refvault.co.uk</a>
                </p>
              </div>

              <div style="text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
                <p style="margin: 5px 0;">© ${new Date().getFullYear()} RefVault. All rights reserved.</p>
                <p style="margin: 5px 0;">Secure reference management for the care industry.</p>
              </div>
            </body>
          </html>
        `,
        text: `Hello,

A former employee has requested a reference from you for their role as ${validatedData.jobTitle} at ${validatedData.employerName}.

Please provide the reference by visiting: ${referenceLink}

RefVault is a secure platform that makes providing employment references quick and simple.

Questions? Contact us at support@refvault.co.uk

© ${new Date().getFullYear()} RefVault
`,
      });

      if (error) {
        console.error('Email sending failed:', error);
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue anyway - the request is saved in Firestore
    }

    return { success: true, message: 'Reference request sent successfully.' };
  } catch (error) {
    console.error('Error sending reference request:', error);
    if (error instanceof z.ZodError) {
       return { success: false, message: 'Invalid data provided.' };
    }
    return { success: false, message: 'Failed to send reference request.' };
  }
}
