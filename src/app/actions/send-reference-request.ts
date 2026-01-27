
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
      const { data, error } = await resend.emails.send({
        from: 'RefVault <onboarding@resend.dev>',
        to: [validatedData.employerEmail],
        subject: `Reference Request for ${validatedData.jobTitle}`,
        text: `Hello, you have been asked to provide a reference for a former employee for their role as ${validatedData.jobTitle}. Please provide the reference by clicking this link: ${referenceLink}`,
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
