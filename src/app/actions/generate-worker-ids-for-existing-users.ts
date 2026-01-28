'use server';

import { adminDb } from '@/lib/firebase-admin';
import { generateWorkerReferenceId } from '@/lib/generate-worker-id';

/**
 * One-time migration script to generate Worker Reference IDs for existing workers
 * Run this to add IDs to workers created before the Worker ID system was implemented
 */
export async function generateWorkerIdsForExistingUsers(): Promise<{
  success: boolean;
  updated: number;
  skipped: number;
  error?: string;
}> {
  try {
    let updated = 0;
    let skipped = 0;

    // Get all users with userType 'worker' who don't have a workerReferenceId
    const usersSnapshot = await adminDb
      .collection('users')
      .where('userType', '==', 'worker')
      .get();

    const updatePromises = [];

    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();

      // Skip if already has an ID
      if (userData.workerReferenceId) {
        skipped++;
        continue;
      }

      // Generate new ID
      const workerReferenceId = generateWorkerReferenceId();

      // Update document
      updatePromises.push(
        doc.ref.update({ workerReferenceId }).then(() => {
          updated++;
          console.log(`Generated ID ${workerReferenceId} for worker ${doc.id}`);
        })
      );
    }

    await Promise.all(updatePromises);

    return {
      success: true,
      updated,
      skipped,
    };
  } catch (error) {
    console.error('Error generating worker IDs:', error);
    return {
      success: false,
      updated: 0,
      skipped: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
