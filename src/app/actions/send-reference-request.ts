
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { mockRequests } from '@/lib/mock-data';
import type { ReferenceRequest } from '@/types';

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

    const newRequestObject: ReferenceRequest = {
      ...validatedData,
      id: `req-${Date.now()}`,
      status: 'Sent',
      dateRequested: new Date(),
      dateCompleted: null,
    };
    
    // In a real app, you'd add this to your database.
    // We are pushing to the mock data array to simulate this.
    mockRequests.unshift(newRequestObject);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
    const referenceLink = `${baseUrl}/reference/${newRequestObject.id}`;
    
    const { data, error } = await resend.emails.send({
      from: 'RefVault <onboarding@resend.dev>',
      to: [validatedData.employerEmail],
      subject: `Reference Request for ${validatedData.jobTitle}`,
      text: `Hello, you have been asked to provide a reference for a former employee for their role as ${validatedData.jobTitle}. Please provide the reference by clicking this link: ${referenceLink}`,
    });

    if (error) {
     throw error;
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
