# Admin Panel Setup Guide

Your admin panel is ready to use! Follow these simple steps to configure admin access.

## Step 1: Set Your Admin Email

Open `src/app/actions/admin-actions.ts` and update the `ADMIN_EMAILS` array on **line 7**:

```typescript
// Replace this example email with your actual email
const ADMIN_EMAILS = [
  'your-email@example.com',  // ← Change this to your email
];
```

You can add multiple admin emails if needed:

```typescript
const ADMIN_EMAILS = [
  'admin1@example.com',
  'admin2@example.com',
  'owner@refvault.com',
];
```

## Step 2: Access the Admin Panel

Once you've set your admin email:

1. **Sign in** to RefVault with the email you added to `ADMIN_EMAILS`
2. Navigate to: `https://your-domain.com/admin/dashboard`
3. You'll see the full admin dashboard with all features

## Admin Panel Features

### 📊 Overview Tab
- Total users (workers vs agencies)
- Reference statistics (completed vs pending)
- Credit balance across all agencies
- Total revenue from Stripe
- Quick user search (by email or Worker ID)
- Manual credit adjustments

### 👥 Users Tab
- View all users (paginated)
- Filter by user type (worker/agency)
- See credits, Worker IDs, join dates
- Search and manage individual users

### 📄 References Tab
- All reference requests across platform
- Status tracking (Sent/Pending/Completed)
- Completion rates and timelines
- Identify stuck references (pending > 7 days)

### 💳 Payments Tab
- All Stripe transactions
- Revenue breakdown by package size
- Credits purchased vs used
- Payment status and history

### 🏢 Agencies Tab
- Agency verification activity
- Credit usage patterns
- Workers verified per agency
- Last purchase dates
- Manual credit adjustment tools

## Admin Actions

### Adjust User Credits

1. Search for a user (email or Worker ID)
2. Click "Adjust Credits" button
3. Enter adjustment amount:
   - Positive number: Add credits (e.g., `5`)
   - Negative number: Deduct credits (e.g., `-3`)
4. Provide a reason (for audit log)
5. Click "Apply Adjustment"

All credit adjustments are logged with:
- Admin email
- Adjustment amount
- Reason
- Timestamp
- New balance

### Search Users

The quick search supports:
- Email addresses (exact match)
- Worker Reference IDs (e.g., `RV-123456`)

### Refresh Data

Click the "Refresh" button in the top-right to reload all dashboard data.

## Security Notes

- Only emails listed in `ADMIN_EMAILS` can access the admin panel
- Non-admin users are automatically redirected to home page
- All admin actions are logged in Firestore
- Credit adjustments create audit trails in `users/{userId}/creditAdjustments`

## Customization

### Add More Admin Emails

Edit `src/app/actions/admin-actions.ts`:

```typescript
const ADMIN_EMAILS = [
  'admin@refvault.com',
  'support@refvault.com',
  'manager@refvault.com',
];
```

### Change Data Limits

Modify the data fetch limits in `src/app/admin/dashboard/page.tsx`:

```typescript
// Current defaults:
getAdminUsers(50)           // 50 users
getRecentReferences(20)     // 20 references
getPaymentHistory(50)       // 50 payments
getAgencyInsights(20)       // 20 agencies
```

## Troubleshooting

### "Access Denied" or Redirected to Home

**Cause:** Your email is not in the `ADMIN_EMAILS` list.

**Solution:**
1. Check the email you're signed in with matches exactly
2. Verify the email is in `ADMIN_EMAILS` (line 7 of `admin-actions.ts`)
3. Redeploy if you changed the code on Vercel

### Dashboard Shows Zero Data

**Cause:** Firestore queries are taking time or there's no data yet.

**Solutions:**
- Click the "Refresh" button
- Check browser console for errors
- Verify Firebase Admin SDK is configured correctly
- Ensure Firestore has data (create test users/references)

### Credit Adjustment Not Working

**Cause:** User might not exist or have an agency account.

**Solutions:**
- Verify the user exists (search for them first)
- Ensure the user has `userType: 'agency'`
- Check browser console for error messages
- Verify Firebase Admin SDK permissions

## Next Steps

1. Set your admin email in `admin-actions.ts`
2. Sign in with that email
3. Navigate to `/admin/dashboard`
4. Explore the admin features

For advanced customization, see the code comments in:
- `src/app/actions/admin-actions.ts` (server actions)
- `src/app/admin/dashboard/page.tsx` (dashboard UI)

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Vercel function logs
3. Verify Firebase Admin SDK configuration
4. Ensure all environment variables are set

---

**Important:** Keep your admin email secure and only grant access to trusted team members.
