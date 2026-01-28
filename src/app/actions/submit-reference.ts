
'use server';

import { z } from 'zod';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { sendReferenceCompletionNotification } from './send-reference-notification';

const submitReferenceSchema = z.object({
  requestId: z.string(),
  workerId: z.string(),
  refereeName: z.string(),
  refereeJobTitle: z.string(),
  startDate: z.string(), // ISO date string
  endDate: z.string().optional(), // ISO date string
  referenceText: z.string(),
  summary: z.string(),
});

export async function submitReference(
  values: z.infer<typeof submitReferenceSchema>
) {
  try {
    const validatedData = submitReferenceSchema.parse(values);

    // Reference to the specific request document
    const requestRef = adminDb
      .collection('users')
      .doc(validatedData.workerId)
      .collection('requests')
      .doc(validatedData.requestId);

    // Check if request exists
    const requestDoc = await requestRef.get();
    if (!requestDoc.exists) {
      return { success: false, message: 'Reference request not found.' };
    }

    // Check if already completed
    const existingData = requestDoc.data();
    if (existingData?.status === 'Completed') {
      return { success: false, message: 'This reference has already been submitted.' };
    }

    // Prepare update data
    const updateData = {
      refereeName: validatedData.refereeName,
      refereeJobTitle: validatedData.refereeJobTitle,
      startDate: new Date(validatedData.startDate),
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      referenceText: validatedData.referenceText,
      summary: validatedData.summary,
      status: 'Completed',
      dateCompleted: FieldValue.serverTimestamp(),
    };

    // Update the request document
    await requestRef.update(updateData);

    // Send notification email to worker
    try {
      const userDoc = await adminDb.collection('users').doc(validatedData.workerId).get();
      const userData = userDoc.data();

      if (userData?.email && userData?.displayName) {
        await sendReferenceCompletionNotification({
          workerEmail: userData.email,
          workerName: userData.displayName,
          employerName: existingData?.employerName || 'your former employer',
          jobTitle: existingData?.jobTitle || 'your previous role',
        });
      }
    } catch (emailError) {
      // Log but don't fail the reference submission if email fails
      console.error('Failed to send completion notification:', emailError);
    }

    return { success: true, message: 'Reference submitted successfully.' };
  } catch (error) {
    console.error('Error submitting reference:', error);
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Invalid data provided.' };
    }
    return { success: false, message: 'Failed to submit reference.' };
  }
}
