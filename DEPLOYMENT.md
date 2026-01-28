# RefVault Deployment Guide

This guide walks you through deploying RefVault to Vercel using GitHub.

## Prerequisites

1. **GitHub Account**: Create one at https://github.com if you don't have one
2. **Vercel Account**: Sign up at https://vercel.com (use GitHub to sign in)
3. **Firebase Project**: Create at https://console.firebase.google.com
4. **Google AI API Key**: Get from https://aistudio.google.com/app/apikey
5. **Resend API Key**: Get from https://resend.com/api-keys

## Step 1: Set Up Firebase

### 1.1 Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add project" or select existing project
3. Follow the setup wizard

### 1.2 Enable Firebase Services
1. **Authentication**:
   - Go to Authentication → Get Started
   - Enable Email/Password provider

2. **Firestore Database**:
   - Go to Firestore Database → Create Database
   - Start in production mode
   - Choose your region

3. **Storage**:
   - Go to Storage → Get Started
   - Start in production mode

### 1.3 Get Firebase Config
1. Go to Project Settings (gear icon) → General
2. Scroll to "Your apps" section
3. Click the Web icon (</>) to add a web app
4. Register app with nickname "RefVault Web"
5. Copy the firebaseConfig object values

### 1.4 Create Service Account (for Admin SDK)
1. Go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely
4. You'll need these values:
   - `project_id`
   - `client_email`
   - `private_key`

## Step 2: Push to GitHub

### 2.1 Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit: RefVault project"
```

### 2.2 Create GitHub Repository
1. Go to https://github.com/new
2. Name it "refvault" or your preferred name
3. Make it private (recommended for now)
4. Do NOT initialize with README (you already have one)
5. Click "Create repository"

### 2.3 Push Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/refvault.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project
1. Go to https://vercel.com/new
2. Click "Import" next to your GitHub repository
3. Vercel will auto-detect Next.js settings

### 3.2 Configure Environment Variables
Before deploying, add these environment variables in Vercel:

**Required Variables:**
- `RESEND_API_KEY` - Your Resend API key (OPTIONAL: Leave blank until you have a custom domain - see Step 7 below)
- `GOOGLE_GENAI_API_KEY` - Your Google AI API key
- `NEXT_PUBLIC_BASE_URL` - Will be `https://your-app.vercel.app` (update after first deploy)

**Firebase Client Config (all start with NEXT_PUBLIC_):**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Firebase Admin Config (server-side only):**
- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY` - Paste the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### 3.3 Deploy
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. You'll get a URL like `https://refvault-xyz.vercel.app`

### 3.4 Update NEXT_PUBLIC_BASE_URL
1. Go to Project Settings → Environment Variables
2. Update `NEXT_PUBLIC_BASE_URL` with your Vercel URL
3. Redeploy (Vercel → Deployments → three dots → Redeploy)

## Step 4: Configure Firebase Security Rules

### 4.1 Firestore Rules
Go to Firestore Database → Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // References collection
    match /references/{referenceId} {
      allow read: if request.auth != null && (
        resource.data.workerId == request.auth.uid ||
        resource.data.sharedWith[request.auth.uid] == true
      );
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.workerId == request.auth.uid;
    }

    // Reference Requests collection
    match /referenceRequests/{requestId} {
      allow read, write: if request.auth != null && resource.data.workerId == request.auth.uid;
    }
  }
}
```

### 4.2 Storage Rules
Go to Storage → Rules and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /references/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 5: Set Up Custom Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

## Step 6: Enable Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

You can configure this in Project Settings → Git

## Step 7: Set Up Welcome Emails with Custom Domain

**NOTE**: Welcome emails are currently disabled in development. Follow these steps when you're ready to enable them with your custom domain.

### Why Custom Domain is Required
Resend requires a verified domain to send emails. Free Vercel domains (*.vercel.app) cannot be verified, so you need your own domain.

### Setup Steps

1. **Purchase a Domain**
   - Get a domain from any registrar (Namecheap, GoDaddy, Google Domains, etc.)
   - Example: `refvault.com`

2. **Add Domain to Resend**
   - Go to https://resend.com/domains
   - Click "Add Domain"
   - Enter your domain (e.g., `refvault.com`)
   - Copy the DNS records provided

3. **Configure DNS Records**
   - Go to your domain registrar's DNS settings
   - Add the TXT and MX records provided by Resend
   - Wait for DNS propagation (can take up to 48 hours, usually much faster)

4. **Verify Domain in Resend**
   - Return to Resend dashboard
   - Click "Verify" on your domain
   - Once verified, you'll see a green checkmark

5. **Update Email Sender**
   - Edit `src/app/api/auth/welcome-email/route.ts` line 31
   - Change from: `'RefVault <onboarding@resend.dev>'`
   - To: `'RefVault <noreply@yourdomain.com>'`
   - Or use any email like: `welcome@yourdomain.com`, `hello@yourdomain.com`, etc.

6. **Enable Resend API Key**
   - In Vercel, add environment variable: `RESEND_API_KEY=re_xxxxxxxxxxxxx`
   - Or in local `.env`, uncomment: `RESEND_API_KEY=re_xxxxxxxxxxxxx`
   - Redeploy or restart dev server

7. **Test Email Sending**
   - Create a new test account
   - Check the user's inbox for the welcome email
   - Check Vercel logs or browser console for any errors

### Example DNS Records (Resend)
```
Type: TXT
Name: resend._domainkey
Value: [provided by Resend]

Type: MX
Name: @
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
```

### Current Status
- ✅ Email functionality is built and ready
- ⏸️ Emails are disabled (no `RESEND_API_KEY` set)
- ✅ Signup works without emails (gracefully skips email sending)
- 📧 When ready: Follow steps above to enable with your custom domain

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Review build logs in Vercel dashboard
- Ensure all dependencies are in package.json

### Firebase Connection Issues
- Verify all environment variables are correctly set
- Check Firebase API keys are valid
- Ensure Firebase services (Auth, Firestore, Storage) are enabled

### AI Summarization Fails
- Verify `GOOGLE_GENAI_API_KEY` is set
- Check API key permissions and quotas
- Review Vercel function logs

### TypeScript/ESLint Errors
Your `next.config.ts` has `ignoreBuildErrors` enabled. This is useful during development but should be fixed before production:
- Run `npm run typecheck` locally
- Run `npm run lint` locally
- Fix errors gradually

## Environment Variables Reference

Copy these values from your `.env` file (do NOT commit .env):

```bash
# Get from: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Your Vercel deployment URL
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app

# Get from: https://aistudio.google.com/app/apikey
GOOGLE_GENAI_API_KEY=AIzaSyxxxxxxxxxxxxx

# Get from Firebase Console → Project Settings
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxxxxx

# Get from Firebase Console → Project Settings → Service Accounts
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----"
```

## Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual values in `.env.local`

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:9002

## Next Steps After Deployment

1. **Test Authentication**: Create a test user account
2. **Test Reference Flow**: Request and submit a reference
3. **Verify AI Summarization**: Check that summaries are generated
4. **Monitor Usage**: Watch Vercel analytics and Firebase quotas
5. **Set Up Monitoring**: Consider adding error tracking (Sentry, etc.)

## Support

- Vercel Docs: https://vercel.com/docs
- Firebase Docs: https://firebase.google.com/docs
- Next.js Docs: https://nextjs.org/docs
- GenKit Docs: https://firebase.google.com/docs/genkit

## Security Checklist

- [ ] `.env` files are NOT committed to git
- [ ] All API keys are set in Vercel environment variables
- [ ] Firebase security rules are configured
- [ ] Firebase service account key is kept secure
- [ ] TypeScript errors are fixed (remove `ignoreBuildErrors`)
- [ ] ESLint errors are addressed
- [ ] CORS settings are configured if needed
- [ ] Rate limiting is considered for API routes
