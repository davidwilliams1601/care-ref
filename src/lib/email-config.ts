/**
 * Centralized email configuration for RefVault
 */

export const EMAIL_CONFIG = {
  // Sender addresses
  FROM_ADDRESS: 'RefVault <noreply@refvault.co.uk>',
  SUPPORT_EMAIL: 'support@refvault.co.uk',

  // Email branding
  BRAND_NAME: 'RefVault',
  BRAND_COLOR: '#667eea',
  BRAND_GRADIENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',

  // Footer text
  FOOTER_TEXT: 'Secure reference management for the care industry.',
  FOOTER_COPYRIGHT: `© ${new Date().getFullYear()} RefVault. All rights reserved.`,
} as const;

/**
 * Email template wrapper with consistent styling
 */
export function createEmailTemplate(options: {
  title: string;
  greeting: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
  footerNote?: string;
}): string {
  const { title, greeting, body, ctaText, ctaUrl, footerNote } = options;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - ${EMAIL_CONFIG.BRAND_NAME}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
        <div style="background: ${EMAIL_CONFIG.BRAND_GRADIENT}; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">${title}</h1>
        </div>

        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; margin-top: 0;">${greeting}</p>

          ${body}

          ${ctaText && ctaUrl ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${ctaUrl}" style="background: ${EMAIL_CONFIG.BRAND_COLOR}; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">
                ${ctaText}
              </a>
            </div>
          ` : ''}

          ${footerNote ? `
            <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
              ${footerNote}
            </p>
          ` : ''}

          <p style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Questions? Contact us at <a href="mailto:${EMAIL_CONFIG.SUPPORT_EMAIL}" style="color: ${EMAIL_CONFIG.BRAND_COLOR}; text-decoration: none;">${EMAIL_CONFIG.SUPPORT_EMAIL}</a>
          </p>
        </div>

        <div style="text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
          <p style="margin: 5px 0;">${EMAIL_CONFIG.FOOTER_COPYRIGHT}</p>
          <p style="margin: 5px 0;">${EMAIL_CONFIG.FOOTER_TEXT}</p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Creates plain text version of email
 */
export function createPlainTextEmail(options: {
  title: string;
  greeting: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
}): string {
  const { title, greeting, body, ctaText, ctaUrl } = options;

  return `
${title}
${'='.repeat(title.length)}

${greeting}

${body}

${ctaText && ctaUrl ? `
${ctaText}: ${ctaUrl}
` : ''}

Questions? Contact us at ${EMAIL_CONFIG.SUPPORT_EMAIL}

${EMAIL_CONFIG.FOOTER_COPYRIGHT}
${EMAIL_CONFIG.FOOTER_TEXT}
  `.trim();
}
