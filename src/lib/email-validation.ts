/**
 * Email validation utilities for preventing fake references
 * Only corporate domain emails are allowed for referees
 */

// List of free email providers that are not allowed for references
const FREE_EMAIL_PROVIDERS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'outlook.co.uk',
  'live.com',
  'live.co.uk',
  'icloud.com',
  'me.com',
  'aol.com',
  'mail.com',
  'protonmail.com',
  'proton.me',
  'zoho.com',
  'yandex.com',
  'gmx.com',
  'gmx.co.uk',
  'inbox.com',
  'mail.ru',
  'tutanota.com',
  'fastmail.com',
  'hushmail.com',
];

/**
 * Check if an email domain is a free email provider
 * @param email - Email address to check
 * @returns true if it's a free email provider, false if corporate
 */
export function isFreeEmailProvider(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Extract domain from email
  const domain = email.toLowerCase().split('@')[1];

  if (!domain) {
    return false;
  }

  // Check if domain is in the free providers list
  return FREE_EMAIL_PROVIDERS.includes(domain);
}

/**
 * Validate that an email is from a corporate domain (not free provider)
 * @param email - Email address to validate
 * @returns Object with validation result and error message
 */
export function validateCorporateEmail(email: string): {
  valid: boolean;
  error?: string;
} {
  if (!email) {
    return {
      valid: false,
      error: 'Email is required',
    };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      error: 'Please enter a valid email address',
    };
  }

  // Check if it's a free email provider
  if (isFreeEmailProvider(email)) {
    const domain = email.split('@')[1];
    return {
      valid: false,
      error: `Personal email addresses (${domain}) are not accepted. Please use your official work email (e.g., name@company.com) to ensure reference authenticity.`,
    };
  }

  return {
    valid: true,
  };
}

/**
 * Get a helpful error message for email validation
 */
export function getEmailValidationHelperText(): string {
  return 'Use your official work email (e.g., john@careuk.com). Personal emails like Gmail are not accepted for references.';
}
