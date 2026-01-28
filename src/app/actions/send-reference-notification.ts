'use server';

import { Resend } from 'resend';
import { EMAIL_CONFIG, createEmailTemplate, createPlainTextEmail } from '@/lib/email-config';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendReferenceNotificationParams {
  workerEmail: string;
  workerName: string;
  employerName: string;
  jobTitle: string;
}

/**
 * Notify worker that a reference has been completed
 */
export async function sendReferenceCompletionNotification(
  params: SendReferenceNotificationParams
): Promise<{ success: boolean; error?: string }> {
  try {
    const { workerEmail, workerName, employerName, jobTitle } = params;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
    const dashboardUrl = `${baseUrl}/dashboard`;

    const htmlBody = createEmailTemplate({
      title: 'Reference Received!',
      greeting: `Hi ${workerName},`,
      body: `
        <p style="font-size: 16px;">Great news! Your reference from <strong>${employerName}</strong> for your role as <strong>${jobTitle}</strong> has been completed and added to your vault.</p>

        <p style="font-size: 16px;">This reference is now securely stored and ready to share with potential employers.</p>
      `,
      ctaText: 'View My References',
      ctaUrl: dashboardUrl,
      footerNote: 'Your references are stored securely and can be shared instantly with authorized agencies.',
    });

    const textBody = createPlainTextEmail({
      title: 'Reference Received!',
      greeting: `Hi ${workerName},`,
      body: `Great news! Your reference from ${employerName} for your role as ${jobTitle} has been completed and added to your vault.

This reference is now securely stored and ready to share with potential employers.`,
      ctaText: 'View My References',
      ctaUrl: dashboardUrl,
    });

    const { error } = await resend.emails.send({
      from: EMAIL_CONFIG.FROM_ADDRESS,
      to: [workerEmail],
      subject: `✅ Reference Received from ${employerName}`,
      html: htmlBody,
      text: textBody,
    });

    if (error) {
      console.error('Failed to send reference completion notification:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending reference completion notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

interface SendReferenceReminderParams {
  employerEmail: string;
  employerName: string;
  jobTitle: string;
  referenceLink: string;
  daysSinceRequest: number;
}

/**
 * Send reminder to employer who hasn't completed reference
 */
export async function sendReferenceReminder(
  params: SendReferenceReminderParams
): Promise<{ success: boolean; error?: string }> {
  try {
    const { employerEmail, employerName, jobTitle, referenceLink, daysSinceRequest } = params;

    const htmlBody = createEmailTemplate({
      title: 'Reminder: Reference Request',
      greeting: 'Hello,',
      body: `
        <p style="font-size: 16px;">This is a friendly reminder that you have a pending reference request for a former employee's role as <strong>${jobTitle}</strong> at <strong>${employerName}</strong>.</p>

        <p style="font-size: 16px;">The request was sent <strong>${daysSinceRequest} day${daysSinceRequest > 1 ? 's' : ''} ago</strong>. We understand you're busy, and we'd be grateful if you could spare a few minutes to complete the reference.</p>

        <p style="font-size: 16px;">Your input helps care workers secure employment and continues to build trust in the industry.</p>
      `,
      ctaText: 'Complete Reference Now',
      ctaUrl: referenceLink,
      footerNote: 'If you\'re unable to provide this reference, please let us know so we can notify the care worker.',
    });

    const textBody = createPlainTextEmail({
      title: 'Reminder: Reference Request',
      greeting: 'Hello,',
      body: `This is a friendly reminder that you have a pending reference request for a former employee's role as ${jobTitle} at ${employerName}.

The request was sent ${daysSinceRequest} day${daysSinceRequest > 1 ? 's' : ''} ago.

Please complete the reference by visiting: ${referenceLink}

Your input helps care workers secure employment and continues to build trust in the industry.`,
      ctaText: 'Complete Reference',
      ctaUrl: referenceLink,
    });

    const { error } = await resend.emails.send({
      from: EMAIL_CONFIG.FROM_ADDRESS,
      to: [employerEmail],
      subject: `Reminder: Reference Request for ${jobTitle}`,
      html: htmlBody,
      text: textBody,
    });

    if (error) {
      console.error('Failed to send reference reminder:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending reference reminder:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
