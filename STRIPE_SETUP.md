# Stripe Payment Integration Setup Guide

This guide explains how to configure Stripe for credit purchases in your RefVault application.

## Overview

The application uses Stripe Checkout (hosted payment page) to securely process credit purchases. When an agency purchases a credit:

1. User clicks "Purchase 1 Credit" → redirected to Stripe Checkout
2. User completes payment on Stripe's secure page
3. Stripe sends webhook event to your server
4. Webhook handler verifies payment and adds credit to Firestore
5. User redirected back to dashboard with success message

## Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Sign up for a free account
3. Complete your business profile

## Step 2: Get Your API Keys

### For Development (Test Mode):

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test mode** (toggle in top-right)
3. Go to **Developers** → **API keys**
4. Copy the following keys:
   - **Publishable key**: `pk_test_...` (not needed yet)
   - **Secret key**: `sk_test_...` ⚠️ Keep this private!

### For Production (Live Mode):

1. Switch to **Live mode** in Stripe Dashboard
2. Go to **Developers** → **API keys**
3. Copy your live secret key: `sk_live_...`
4. ⚠️ **Never commit this to git or expose it publicly**

## Step 3: Add Environment Variables

### Local Development:

Add to your `.env.local` file:

```bash
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:9002
```

### Production (Vercel):

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following:

| Variable | Value | Environment |
|----------|-------|-------------|
| `STRIPE_SECRET_KEY` | `sk_live_your_live_key` | Production |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (from Step 4) | Production |
| `NEXT_PUBLIC_BASE_URL` | `https://your-domain.com` | Production |

## Step 4: Configure Webhook

Webhooks are crucial - they confirm payment and add credits.

### For Development (using Stripe CLI):

1. Install Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:9002/api/stripe/webhook
   ```

4. Copy the webhook signing secret (starts with `whsec_`)

5. Add to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### For Production:

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your webhook URL:
   ```
   https://your-domain.com/api/stripe/webhook
   ```
4. Select events to listen for:
   - `checkout.session.completed` ✓ (required)
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

## Step 5: Test the Integration

### Using Test Cards:

Stripe provides test cards for testing. No real money is charged in test mode.

| Card Number | Expected Result |
|-------------|----------------|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 0341` | Payment requires authentication (3D Secure) |
| `4000 0000 0000 9995` | Payment declined |

Use any future expiration date (e.g., 12/34) and any 3-digit CVC.

### Testing Flow:

1. Log in as an agency user
2. Navigate to agency dashboard
3. Click "Purchase 1 Credit"
4. You should be redirected to Stripe Checkout
5. Enter test card: `4242 4242 4242 4242`
6. Complete the payment
7. You should be redirected back to dashboard
8. Within a few seconds, your credit balance should update

### Verify in Logs:

Check your server logs for:
- `Added 1 credit(s) to user {userId}` (successful webhook)
- Any error messages

Check Stripe Dashboard:
- **Payments** → Should see test payment listed
- **Developers** → **Webhooks** → Check webhook delivery status

## Step 6: Go Live

When ready for production:

1. Complete Stripe account activation:
   - Add business details
   - Verify bank account for payouts
   - Accept terms of service

2. Switch Stripe Dashboard to **Live mode**

3. Update environment variables in Vercel with **live** keys

4. Update webhook endpoint to production URL

5. Test with a real card (you can refund immediately)

## Troubleshooting

### Credits not appearing after payment:

- Check webhook is configured correctly
- Verify `STRIPE_WEBHOOK_SECRET` is set
- Check Vercel logs for webhook errors
- Verify webhook event was delivered in Stripe Dashboard

### "Payment Failed" error:

- Check `STRIPE_SECRET_KEY` is set correctly
- Ensure key matches environment (test vs live)
- Check server logs for detailed error

### Webhook signature verification failed:

- Webhook secret doesn't match
- Re-copy the signing secret from Stripe Dashboard
- Update `STRIPE_WEBHOOK_SECRET` environment variable
- Redeploy application

### Double-crediting:

- Should not happen - webhook is the only way to add credits
- Check Firestore rules are preventing client-side credit manipulation
- Review webhook logs for duplicate events

## Security Best Practices

✅ **Do:**
- Keep secret keys in environment variables only
- Use different keys for test vs production
- Verify webhook signatures (already implemented)
- Log all payment events for audit

❌ **Don't:**
- Commit API keys to git
- Use live keys in development
- Allow client-side credit manipulation
- Skip webhook signature verification

## Monitoring

### Stripe Dashboard:
- Monitor payments in real-time
- View failed payments and reasons
- Check webhook delivery success rate
- Identify fraudulent transactions

### Application Logs:
- Track credit purchases in Firestore `purchases` sub-collection
- Monitor webhook processing errors
- Alert on payment failures

## Pricing

Stripe charges per successful transaction:
- **UK/Europe**: 1.5% + 20p per transaction
- For £20 credit: ~£0.50 fee (2.5%)

Consider building this into your pricing or offering bulk discounts for multiple credits.

## Support

- Stripe Documentation: [https://stripe.com/docs](https://stripe.com/docs)
- Stripe Support: Available in dashboard
- Test your integration: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)
