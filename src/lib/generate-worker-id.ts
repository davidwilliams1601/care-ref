/**
 * Generate a friendly worker reference ID
 * Format: RV-XXXXXX (e.g., RV-482917)
 */
export function generateWorkerReferenceId(): string {
  // Generate 6-digit number
  const number = Math.floor(100000 + Math.random() * 900000);
  return `RV-${number}`;
}

/**
 * Validate worker reference ID format
 */
export function isValidWorkerReferenceId(id: string): boolean {
  return /^RV-\d{6}$/.test(id);
}
