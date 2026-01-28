
'use server';

import { adminDb } from '@/lib/firebase-admin';
import type { ReferenceRequest } from '@/types';

/**
 * Fetch completed references for a specific worker
 * This is used by agencies to verify worker references
 */
export async function getWorkerReferences(workerId: string): Promise<{
  success: boolean;
  references: ReferenceRequest[];
  error?: string;
}> {
  try {
    if (!workerId) {
      return { success: false, references: [], error: 'Worker ID is required' };
    }

    // Reference to worker's requests sub-collection
    const requestsRef = adminDb
      .collection('users')
      .doc(workerId)
      .collection('requests');

    // Query for completed requests only
    const snapshot = await requestsRef
      .where('status', '==', 'Completed')
      .get();

    // Convert documents to ReferenceRequest objects
    const references: ReferenceRequest[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        workerId: data.workerId || workerId,
        employerName: data.employerName || '',
        employerEmail: data.employerEmail || '',
        jobTitle: data.jobTitle || '',
        status: 'Completed',
        dateRequested: data.dateRequested?.toDate().toISOString() || new Date().toISOString(),
        dateCompleted: data.dateCompleted?.toDate().toISOString() || null,
        refereeName: data.refereeName,
        refereeJobTitle: data.refereeJobTitle,
        referenceText: data.referenceText,
        summary: data.summary,
        startDate: data.startDate?.toDate().toISOString(),
        endDate: data.endDate?.toDate().toISOString(),
      } as any; // Cast to any to handle Date vs string conversion
    });

    // Sort by date completed (most recent first)
    references.sort((a, b) => {
      const dateA = a.dateCompleted ? new Date(a.dateCompleted).getTime() : 0;
      const dateB = b.dateCompleted ? new Date(b.dateCompleted).getTime() : 0;
      return dateB - dateA;
    });

    return {
      success: true,
      references,
    };
  } catch (error) {
    console.error('Error fetching worker references:', error);
    return {
      success: false,
      references: [],
      error: 'Failed to fetch worker references',
    };
  }
}
