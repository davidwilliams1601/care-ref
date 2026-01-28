
'use server';

import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export interface ViewedWorker {
  workerId: string;
  workerName: string;
  dateFirstViewed: string; // ISO string
  dateLastViewed: string; // ISO string
  referenceCount: number;
  viewCount: number;
}

/**
 * Check if an agency has already viewed a specific worker
 */
export async function hasAgencyViewedWorker(
  agencyId: string,
  workerId: string
): Promise<boolean> {
  try {
    const viewedRef = adminDb
      .collection('users')
      .doc(agencyId)
      .collection('viewedWorkers')
      .doc(workerId);

    const doc = await viewedRef.get();
    return doc.exists;
  } catch (error) {
    console.error('Error checking viewed worker:', error);
    return false;
  }
}

/**
 * Record that an agency has viewed a worker's references
 */
export async function recordWorkerView(
  agencyId: string,
  workerId: string,
  workerName: string,
  referenceCount: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const viewedRef = adminDb
      .collection('users')
      .doc(agencyId)
      .collection('viewedWorkers')
      .doc(workerId);

    const doc = await viewedRef.get();

    if (doc.exists) {
      // Worker already viewed - update last viewed date and increment view count
      await viewedRef.update({
        dateLastViewed: FieldValue.serverTimestamp(),
        viewCount: FieldValue.increment(1),
        referenceCount, // Update in case worker has new references
      });
    } else {
      // First time viewing - create new record
      await viewedRef.set({
        workerId,
        workerName,
        dateFirstViewed: FieldValue.serverTimestamp(),
        dateLastViewed: FieldValue.serverTimestamp(),
        referenceCount,
        viewCount: 1,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error recording worker view:', error);
    return {
      success: false,
      error: 'Failed to record worker view',
    };
  }
}

/**
 * Get all workers that an agency has previously viewed
 */
export async function getAgencyViewedWorkers(
  agencyId: string
): Promise<{ success: boolean; workers: ViewedWorker[]; error?: string }> {
  try {
    const viewedRef = adminDb
      .collection('users')
      .doc(agencyId)
      .collection('viewedWorkers');

    const snapshot = await viewedRef.orderBy('dateLastViewed', 'desc').get();

    const workers: ViewedWorker[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        workerId: doc.id,
        workerName: data.workerName || 'Unknown',
        dateFirstViewed: data.dateFirstViewed?.toDate().toISOString() || new Date().toISOString(),
        dateLastViewed: data.dateLastViewed?.toDate().toISOString() || new Date().toISOString(),
        referenceCount: data.referenceCount || 0,
        viewCount: data.viewCount || 1,
      };
    });

    return {
      success: true,
      workers,
    };
  } catch (error) {
    console.error('Error fetching viewed workers:', error);
    return {
      success: false,
      workers: [],
      error: 'Failed to fetch viewed workers',
    };
  }
}
