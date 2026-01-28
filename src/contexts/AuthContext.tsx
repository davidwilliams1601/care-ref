'use client';

import * as React from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { generateWorkerReferenceId } from '@/lib/generate-worker-id';

type UserType = 'worker' | 'agency' | 'admin';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  userType: UserType;
  emailVerified: boolean;
  createdAt: any;
  lastLogin: any;
  profileComplete: boolean;
  // Worker specific
  workerReferenceId?: string; // Friendly ID like RV-482917
  jobTitle?: string;
  phoneNumber?: string;
  // Agency specific
  agencyName?: string;
  registrationNumber?: string;
  credits?: number;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string, userType: UserType) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (userType: UserType) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Create user profile in Firestore
  const createUserProfile = async (
    uid: string,
    email: string,
    displayName: string,
    userType: UserType
  ): Promise<void> => {
    const profile: UserProfile = {
      uid,
      email,
      displayName,
      userType,
      emailVerified: false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      profileComplete: false,
    };

    // Add type-specific fields
    if (userType === 'worker') {
      profile.workerReferenceId = generateWorkerReferenceId();
    } else if (userType === 'agency') {
      profile.credits = 0;
    }

    await setDoc(doc(db, 'users', uid), profile);
  };

  // Update last login timestamp
  const updateLastLogin = async (uid: string): Promise<void> => {
    try {
      await setDoc(
        doc(db, 'users', uid),
        { lastLogin: serverTimestamp() },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  };

  // Sign up with email/password
  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    userType: UserType
  ): Promise<void> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      await updateProfile(result.user, { displayName });

      // Create user profile in Firestore
      await createUserProfile(result.user.uid, email, displayName, userType);

      // Send verification email
      await sendEmailVerification(result.user);

      // Send welcome email via server action
      try {
        const emailResponse = await fetch('/api/auth/welcome-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, displayName, userType }),
        });

        const emailResult = await emailResponse.json();

        if (!emailResponse.ok) {
          console.error('Welcome email failed:', emailResult.error);
        } else {
          console.log('Welcome email sent successfully:', emailResult.message || 'Success');
        }
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't throw - allow signup to complete even if email fails
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to sign up');
    }
  };

  // Sign in with email/password
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateLastLogin(result.user.uid);
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (userType: UserType): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if user profile exists
      const existingProfile = await fetchUserProfile(result.user.uid);

      if (!existingProfile) {
        // New user - create profile
        await createUserProfile(
          result.user.uid,
          result.user.email!,
          result.user.displayName || 'User',
          userType
        );

        // Send welcome email
        try {
          const emailResponse = await fetch('/api/auth/welcome-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: result.user.email,
              displayName: result.user.displayName,
              userType,
            }),
          });

          const emailResult = await emailResponse.json();

          if (!emailResponse.ok) {
            console.error('Welcome email failed:', emailResult.error);
          } else {
            console.log('Welcome email sent successfully:', emailResult.message || 'Success');
          }
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't throw - allow signup to complete even if email fails
        }
      } else {
        // Existing user - update last login
        await updateLastLogin(result.user.uid);
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      setUserProfile(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Failed to send password reset email');
    }
  };

  // Refresh user profile
  const refreshUserProfile = async (): Promise<void> => {
    if (user) {
      const profile = await fetchUserProfile(user.uid);
      setUserProfile(profile);
    }
  };

  // Auth state listener
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const profile = await fetchUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
