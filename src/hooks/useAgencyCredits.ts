'use client';

import * as React from 'react';
import { doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UseAgencyCreditsResult {
  credits: number;
  loading: boolean;
  error: string | null;
  deductCredit: () => Promise<void>;
  addCredits: (amount: number) => Promise<void>;
}

/**
 * Custom hook to manage agency verification credits
 * @param userId - The authenticated agency user's ID
 * @returns Object containing credits, loading state, error state, and credit management functions
 */
export function useAgencyCredits(userId: string | undefined): UseAgencyCreditsResult {
  const [credits, setCredits] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!userId) {
      setLoading(false);
      setCredits(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Reference to user document
      const userRef = doc(db, 'users', userId);

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        userRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            // Get credits field, default to 0 if not set
            setCredits(data?.credits || 0);
          } else {
            setCredits(0);
          }
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching agency credits:', err);
          setError('Failed to load credits. Please try again.');
          setLoading(false);
        }
      );

      // Cleanup listener on unmount
      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up credits listener:', err);
      setError('Failed to load credits. Please try again.');
      setLoading(false);
    }
  }, [userId]);

  /**
   * Deduct one credit from the agency's balance
   */
  const deductCredit = async (): Promise<void> => {
    if (!userId) {
      throw new Error('User not authenticated');
    }

    if (credits <= 0) {
      throw new Error('No credits available');
    }

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        credits: increment(-1),
      });
    } catch (err) {
      console.error('Error deducting credit:', err);
      throw new Error('Failed to deduct credit');
    }
  };

  /**
   * Add credits to the agency's balance
   */
  const addCredits = async (amount: number): Promise<void> => {
    if (!userId) {
      throw new Error('User not authenticated');
    }

    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        credits: increment(amount),
      });
    } catch (err) {
      console.error('Error adding credits:', err);
      throw new Error('Failed to add credits');
    }
  };

  return {
    credits,
    loading,
    error,
    deductCredit,
    addCredits,
  };
}
