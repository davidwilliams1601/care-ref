# Quick Start Guide

Get RefVault running in 5 minutes!

## 1. Get Your API Keys

### Google AI API Key (Required for AI summarization)
1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### Resend API Key (Required for emails)
1. Go to https://resend.com
2. Sign up for free account
3. Go to API Keys tab
4. Create new API key
5. Copy the key

### Firebase (Required for database/auth)
1. Go to https://console.firebase.google.com
2. Create new project or use existing
3. Add web app to get config values
4. Enable Authentication (Email/Password)
5. Enable Firestore Database
6. Enable Storage

## 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:
```bash
# Required for AI
GOOGLE_GENAI_API_KEY=AIzaSy...

# Required for emails
RESEND_API_KEY=re_...

# Required for Firebase (from Firebase Console → Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123...
NEXT_PUBLIC_FIREBASE_APP_ID=1:123...

# Local development
NEXT_PUBLIC_BASE_URL=http://localhost:9002
```

## 3. Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:9002

## 4. Test the App

1. Click "Sign Up" to create an account
2. Request a reference
3. Submit a reference (use the link)
4. See AI-generated summary

## Troubleshooting

**Can't connect to Firebase?**
- Check all Firebase environment variables are correct
- Ensure Firebase services are enabled in console

**AI summarization not working?**
- Verify `GOOGLE_GENAI_API_KEY` is set
- Check you have quota remaining (free tier: 15 requests/minute)

**Build errors?**
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Make sure you're using Node 18+

## Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment guide.

Quick version:
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## Need Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Review [README.md](./README.md) for project overview
- Open an issue on GitHub
