'use server';

import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// Admin emails - only these users can access admin panel
// These are super admins who can grant admin access to others
const ADMIN_EMAILS = [
  'david@theentrepreneurialdad.com',
];

export async function isAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;

  // Check if user is a super admin (hardcoded)
  if (ADMIN_EMAILS.includes(email.toLowerCase())) {
    return true;
  }

  // Check if user has admin flag in Firestore
  try {
    const usersSnapshot = await adminDb
      .collection('users')
      .where('email', '==', email.toLowerCase())
      .limit(1)
      .get();

    if (!usersSnapshot.empty) {
      const userData = usersSnapshot.docs[0].data();
      return userData.isAdmin === true;
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
  }

  return false;
}

export async function isSuperAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

// Dashboard Overview Stats
export async function getAdminDashboardStats() {
  try {
    const usersSnapshot = await adminDb.collection('users').get();

    let totalWorkers = 0;
    let totalAgencies = 0;
    let totalCredits = 0;
    let totalCreditsUsed = 0;

    for (const doc of usersSnapshot.docs) {
      const data = doc.data();
      if (data.userType === 'worker') {
        totalWorkers++;
      } else if (data.userType === 'agency') {
        totalAgencies++;
        totalCredits += (data.credits || 0);
        totalCreditsUsed += (data.creditsUsed || 0);
      }
    }

    // Count total references
    let totalReferences = 0;
    let completedReferences = 0;
    let pendingReferences = 0;

    for (const userDoc of usersSnapshot.docs) {
      const requestsSnapshot = await adminDb
        .collection('users')
        .doc(userDoc.id)
        .collection('requests')
        .get();

      totalReferences += requestsSnapshot.size;

      requestsSnapshot.docs.forEach(reqDoc => {
        const status = reqDoc.data().status;
        if (status === 'Completed') completedReferences++;
        else pendingReferences++;
      });
    }

    // Get recent signups (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentSignups = usersSnapshot.docs.filter(doc => {
      const createdAt = doc.data().createdAt?.toDate();
      return createdAt && createdAt > oneDayAgo;
    }).length;

    // Calculate total revenue from purchases
    let totalRevenue = 0;
    for (const userDoc of usersSnapshot.docs) {
      const purchasesSnapshot = await adminDb
        .collection('users')
        .doc(userDoc.id)
        .collection('purchases')
        .get();

      purchasesSnapshot.docs.forEach(purchaseDoc => {
        const amount = purchaseDoc.data().amount;
        if (amount) totalRevenue += amount;
      });
    }

    return {
      success: true,
      stats: {
        totalUsers: usersSnapshot.size,
        totalWorkers,
        totalAgencies,
        totalReferences,
        completedReferences,
        pendingReferences,
        completionRate: totalReferences > 0
          ? Math.round((completedReferences / totalReferences) * 100)
          : 0,
        totalCredits,
        totalCreditsUsed,
        recentSignups,
        totalRevenue: (totalRevenue / 100).toFixed(2), // Convert from pence to pounds
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      success: false,
      error: 'Failed to fetch dashboard stats',
    };
  }
}

// Get all users with pagination
export async function getAdminUsers(
  limit: number = 50,
  userType?: 'worker' | 'agency'
) {
  try {
    let query = adminDb.collection('users').orderBy('createdAt', 'desc').limit(limit);

    if (userType) {
      query = query.where('userType', '==', userType) as any;
    }

    const snapshot = await query.get();

    const users = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email || '',
        displayName: data.displayName || '',
        userType: data.userType || 'worker',
        credits: data.credits || 0,
        creditsUsed: data.creditsUsed || 0,
        workerReferenceId: data.workerReferenceId || null,
        isAdmin: data.isAdmin || false,
        createdAt: data.createdAt?.toDate().toISOString() || null,
        lastLoginAt: data.lastLoginAt?.toDate().toISOString() || null,
      };
    });

    return {
      success: true,
      users,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      users: [],
      error: 'Failed to fetch users',
    };
  }
}

// Search user by email or Worker ID
export async function searchUser(searchTerm: string) {
  try {
    if (!searchTerm) {
      return { success: false, user: null, error: 'Search term required' };
    }

    // Try email search first
    const emailSnapshot = await adminDb
      .collection('users')
      .where('email', '==', searchTerm.toLowerCase())
      .limit(1)
      .get();

    if (!emailSnapshot.empty) {
      const doc = emailSnapshot.docs[0];
      const data = doc.data();
      return {
        success: true,
        user: {
          id: doc.id,
          email: data.email,
          displayName: data.displayName,
          userType: data.userType,
          credits: data.credits || 0,
          workerReferenceId: data.workerReferenceId,
          createdAt: data.createdAt?.toDate().toISOString(),
        },
      };
    }

    // Try Worker ID search
    const workerIdSnapshot = await adminDb
      .collection('users')
      .where('workerReferenceId', '==', searchTerm.toUpperCase())
      .limit(1)
      .get();

    if (!workerIdSnapshot.empty) {
      const doc = workerIdSnapshot.docs[0];
      const data = doc.data();
      return {
        success: true,
        user: {
          id: doc.id,
          email: data.email,
          displayName: data.displayName,
          userType: data.userType,
          credits: data.credits || 0,
          workerReferenceId: data.workerReferenceId,
          createdAt: data.createdAt?.toDate().toISOString(),
        },
      };
    }

    return {
      success: false,
      user: null,
      error: 'User not found',
    };
  } catch (error) {
    console.error('Error searching user:', error);
    return {
      success: false,
      user: null,
      error: 'Search failed',
    };
  }
}

// Adjust user credits (with audit log)
export async function adjustUserCredits(
  userId: string,
  adjustment: number,
  reason: string,
  adminEmail: string
) {
  try {
    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { success: false, error: 'User not found' };
    }

    await userRef.update({
      credits: FieldValue.increment(adjustment),
    });

    // Log the adjustment
    await userRef.collection('creditAdjustments').add({
      adjustment,
      reason,
      adminEmail,
      timestamp: FieldValue.serverTimestamp(),
      newBalance: (userDoc.data()?.credits || 0) + adjustment,
    });

    return {
      success: true,
      message: `Credits adjusted by ${adjustment}`,
    };
  } catch (error) {
    console.error('Error adjusting credits:', error);
    return {
      success: false,
      error: 'Failed to adjust credits',
    };
  }
}

// Get recent references
export async function getRecentReferences(limit: number = 20) {
  try {
    const usersSnapshot = await adminDb.collection('users').get();
    const allReferences: any[] = [];

    for (const userDoc of usersSnapshot.docs) {
      const requestsSnapshot = await adminDb
        .collection('users')
        .doc(userDoc.id)
        .collection('requests')
        .orderBy('dateRequested', 'desc')
        .limit(5)
        .get();

      const userData = userDoc.data();

      requestsSnapshot.docs.forEach(reqDoc => {
        const data = reqDoc.data();
        allReferences.push({
          id: reqDoc.id,
          workerId: userDoc.id,
          workerName: userData.displayName || 'Unknown',
          workerEmail: userData.email || '',
          employerName: data.employerName || '',
          jobTitle: data.jobTitle || '',
          status: data.status || 'Pending',
          dateRequested: data.dateRequested?.toDate().toISOString() || null,
          dateCompleted: data.dateCompleted?.toDate().toISOString() || null,
        });
      });
    }

    // Sort by date and limit
    allReferences.sort((a, b) => {
      const dateA = new Date(a.dateRequested || 0).getTime();
      const dateB = new Date(b.dateRequested || 0).getTime();
      return dateB - dateA;
    });

    return {
      success: true,
      references: allReferences.slice(0, limit),
    };
  } catch (error) {
    console.error('Error fetching recent references:', error);
    return {
      success: false,
      references: [],
      error: 'Failed to fetch references',
    };
  }
}

// Get payment history
export async function getPaymentHistory(limit: number = 50) {
  try {
    const usersSnapshot = await adminDb.collection('users').get();
    const allPayments: any[] = [];

    for (const userDoc of usersSnapshot.docs) {
      const purchasesSnapshot = await adminDb
        .collection('users')
        .doc(userDoc.id)
        .collection('purchases')
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();

      const userData = userDoc.data();

      purchasesSnapshot.docs.forEach(purchaseDoc => {
        const data = purchaseDoc.data();
        allPayments.push({
          id: purchaseDoc.id,
          userId: userDoc.id,
          userEmail: userData.email || '',
          userName: userData.displayName || 'Unknown',
          amount: ((data.amount || 0) / 100).toFixed(2), // Convert to pounds
          currency: data.currency || 'gbp',
          credits: data.credits || 0,
          status: data.status || 'completed',
          stripeSessionId: data.stripeSessionId || '',
          createdAt: data.createdAt?.toDate().toISOString() || null,
        });
      });
    }

    // Sort by date
    allPayments.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return {
      success: true,
      payments: allPayments.slice(0, limit),
    };
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return {
      success: false,
      payments: [],
      error: 'Failed to fetch payments',
    };
  }
}

// Get agency verification insights
export async function getAgencyInsights(limit: number = 20) {
  try {
    const agenciesSnapshot = await adminDb
      .collection('users')
      .where('userType', '==', 'agency')
      .get();

    const insights: any[] = [];

    for (const agencyDoc of agenciesSnapshot.docs) {
      const agencyData = agencyDoc.data();

      // Count viewed workers
      const viewedWorkersSnapshot = await adminDb
        .collection('users')
        .doc(agencyDoc.id)
        .collection('viewedWorkers')
        .get();

      insights.push({
        id: agencyDoc.id,
        email: agencyData.email || '',
        name: agencyData.displayName || 'Unknown',
        credits: agencyData.credits || 0,
        creditsUsed: agencyData.creditsUsed || 0,
        workersVerified: viewedWorkersSnapshot.size,
        lastPurchase: agencyData.lastPurchaseDate?.toDate().toISOString() || null,
        createdAt: agencyData.createdAt?.toDate().toISOString() || null,
      });
    }

    // Sort by workers verified
    insights.sort((a, b) => b.workersVerified - a.workersVerified);

    return {
      success: true,
      insights: insights.slice(0, limit),
    };
  } catch (error) {
    console.error('Error fetching agency insights:', error);
    return {
      success: false,
      insights: [],
      error: 'Failed to fetch agency insights',
    };
  }
}

// Grant admin access to a user
export async function grantAdminAccess(
  userId: string,
  adminEmail: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    // Check if requesting user is a super admin
    const isSuperAdminUser = await isSuperAdmin(adminEmail);
    if (!isSuperAdminUser) {
      return {
        success: false,
        error: 'Only super admins can grant admin access',
      };
    }

    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { success: false, error: 'User not found' };
    }

    await userRef.update({
      isAdmin: true,
    });

    // Log the action
    await userRef.collection('adminAccessLog').add({
      action: 'granted',
      grantedBy: adminEmail,
      timestamp: FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      message: 'Admin access granted successfully',
    };
  } catch (error) {
    console.error('Error granting admin access:', error);
    return {
      success: false,
      error: 'Failed to grant admin access',
    };
  }
}

// Revoke admin access from a user
export async function revokeAdminAccess(
  userId: string,
  adminEmail: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    // Check if requesting user is a super admin
    const isSuperAdminUser = await isSuperAdmin(adminEmail);
    if (!isSuperAdminUser) {
      return {
        success: false,
        error: 'Only super admins can revoke admin access',
      };
    }

    // Prevent revoking access from super admins
    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { success: false, error: 'User not found' };
    }

    const userData = userDoc.data();
    const userEmail = userData?.email;

    if (userEmail && ADMIN_EMAILS.includes(userEmail.toLowerCase())) {
      return {
        success: false,
        error: 'Cannot revoke access from super admins',
      };
    }

    await userRef.update({
      isAdmin: false,
    });

    // Log the action
    await userRef.collection('adminAccessLog').add({
      action: 'revoked',
      revokedBy: adminEmail,
      timestamp: FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      message: 'Admin access revoked successfully',
    };
  } catch (error) {
    console.error('Error revoking admin access:', error);
    return {
      success: false,
      error: 'Failed to revoke admin access',
    };
  }
}
