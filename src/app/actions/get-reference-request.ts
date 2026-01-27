
'use server';

import { adminDb } from '@/lib/firebase-admin';
import type { ReferenceRequest } from '@/types';

/**
 * Fetch a reference request from Firestore
 * This searches across all users to find the request with the given ID
 */
export async function getReferenceRequest(requestId: string): Promise<ReferenceRequest | null> {
  try {
    // We need to search across all users to find the request
    // Get all users
    const usersSnapshot = await adminDb.collection('users').get();

    // Search through each user's requests sub-collection
    for (const userDoc of usersSnapshot.docs) {
      const requestRef = adminDb
        .collection('users')
        .doc(userDoc.id)
        .collection('requests')
        .doc(requestId);

      const requestDoc = await requestRef.get();

      if (requestDoc.exists) {
        const data = requestDoc.data();

        // Convert Firestore Timestamps to ISO strings for client
        return {
          id: requestDoc.id,
          workerId: data?.workerId || userDoc.id,
          employerName: data?.employerName || '',
          employerEmail: data?.employerEmail || '',
          jobTitle: data?.jobTitle || '',
          status: data?.status || 'Pending',
          dateRequested: data?.dateRequested?.toDate().toISOString() || new Date().toISOString(),
          dateCompleted: data?.dateCompleted?.toDate().toISOString() || null,
          refereeName: data?.refereeName,
          refereeJobTitle: data?.refereeJobTitle,
          referenceText: data?.referenceText,
          summary: data?.summary,
          startDate: data?.startDate?.toDate().toISOString(),
          endDate: data?.endDate?.toDate().toISOString(),
        } as any; // Cast to any to handle Date vs string conversion
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching reference request:', error);
    return null;
  }
}
