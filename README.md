# RefVault

A secure, portable reference management platform for care workers and healthcare recruitment agencies.

## Overview

RefVault streamlines the reference checking process in the care industry by giving workers a secure vault for their job references that can be shared instantly with potential employers.

## Features

- **For Care Workers**: Store and manage all your job references in one secure place
- **For Agencies**: Verify trusted references with a single click
- **For Referees**: Submit references once using a simple form
- **AI-Powered**: Automatic reference summarization using Google AI
- **Secure Sharing**: Generate time-limited, secure links to share references

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: shadcn/ui + Radix UI + Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **AI**: Google GenKit (Gemini 2.0 Flash)
- **Email**: Resend
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm or yarn
- Firebase project
- Google AI API key
- Resend API key

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in your API keys
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:9002](http://localhost:9002)

### Configuration

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

## Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start GenKit developer UI

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions to Vercel.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── dashboard/   # Dashboard-specific components
│   └── agency/      # Agency-specific components
├── lib/             # Utility functions and configs
├── hooks/           # Custom React hooks
├── ai/              # GenKit AI flows
└── types/           # TypeScript type definitions
```

## License

Private - All rights reserved

## Support

For issues or questions, please open an issue on GitHub.
