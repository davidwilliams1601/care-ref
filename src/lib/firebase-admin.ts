/**
 * Firebase Admin SDK configuration for server-side operations
 * This should only be imported in server components, API routes, or server actions
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let adminApp: App;
let adminDb: Firestore;
let adminAuth: Auth;

// Only initialize on server-side
if (typeof window === 'undefined') {
  if (!getApps().length) {
    let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || '';

    // Handle different private key formats
    // Remove quotes if present
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }

    // Replace escaped newlines with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n');

    // Initialize with service account credentials
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } else {
    adminApp = getApps()[0];
  }

  adminDb = getFirestore(adminApp);
  adminAuth = getAuth(adminApp);
}

export { adminApp, adminDb, adminAuth };
