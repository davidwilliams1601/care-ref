'use client';

import * as React from 'react';
import { collection, query, onSnapshot, deleteDoc, doc, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ReferenceRequest } from '@/types';

interface UseReferencesResult {
  requests: ReferenceRequest[];
  loading: boolean;
  error: string | null;
  deleteRequest: (requestId: string) => Promise<void>;
}

/**
 * Convert Firestore Timestamp objects to JavaScript Date objects
 */
const convertTimestamps = (data: any): ReferenceRequest => {
  return {
    ...data,
    dateRequested: data.dateRequested?.toDate() || new Date(),
    dateCompleted: data.dateCompleted?.toDate() || null,
    startDate: data.startDate?.toDate() || null,
    endDate: data.endDate?.toDate() || null,
  } as ReferenceRequest;
};

/**
 * Custom hook to fetch and manage user's reference requests from Firestore
 * @param userId - The authenticated user's ID
 * @returns Object containing requests array, loading state, error state, and delete function
 */
export function useReferences(userId: string | undefined): UseReferencesResult {
  const [requests, setRequests] = React.useState<ReferenceRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!userId) {
      setLoading(false);
      setRequests([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Reference to user's requests sub-collection
      const requestsRef = collection(db, 'users', userId, 'requests');
      const q = query(requestsRef);

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const fetchedRequests = snapshot.docs.map((doc) => {
            const data = doc.data();
            return convertTimestamps({
              id: doc.id,
              ...data,
            });
          });

          // Sort by dateRequested (most recent first)
          fetchedRequests.sort((a, b) => {
            return b.dateRequested.getTime() - a.dateRequested.getTime();
          });

          setRequests(fetchedRequests);
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching references:', err);
          setError('Failed to load references. Please try again.');
          setLoading(false);
        }
      );

      // Cleanup listener on unmount
      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up references listener:', err);
      setError('Failed to load references. Please try again.');
      setLoading(false);
    }
  }, [userId]);

  /**
   * Delete a reference request from Firestore
   */
  const deleteRequest = async (requestId: string): Promise<void> => {
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      const requestRef = doc(db, 'users', userId, 'requests', requestId);
      await deleteDoc(requestRef);
    } catch (err) {
      console.error('Error deleting reference:', err);
      throw new Error('Failed to delete reference');
    }
  };

  return {
    requests,
    loading,
    error,
    deleteRequest,
  };
}
