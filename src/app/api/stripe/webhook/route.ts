import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(secretKey, {
    apiVersion: '2024-11-20.acacia',
  });
}

export async function POST(req: NextRequest) {
  console.log('🔔 Stripe webhook received');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('❌ STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  console.log('📝 Webhook signature present:', !!signature);

  if (!signature) {
    console.error('❌ No signature provided');
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  const stripe = getStripe();

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log('✅ Webhook signature verified, event type:', event.type);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    console.log('💳 Processing checkout.session.completed event');
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract metadata
    const userId = session.metadata?.userId;
    const creditAmount = parseInt(session.metadata?.creditAmount || '1', 10);

    console.log('👤 User ID from metadata:', userId);
    console.log('💰 Credit amount:', creditAmount);

    if (!userId) {
      console.error('❌ No userId in session metadata');
      return NextResponse.json(
        { error: 'No userId in metadata' },
        { status: 400 }
      );
    }

    try {
      // Add credits to user's Firestore document
      const userRef = adminDb.collection('users').doc(userId);

      console.log('📝 Updating user credits in Firestore...');
      await userRef.update({
        credits: FieldValue.increment(creditAmount),
        lastPurchaseDate: FieldValue.serverTimestamp(),
      });

      console.log(`✅ Added ${creditAmount} credit(s) to user ${userId}`);

      // Optional: Create a purchase record for history
      console.log('💾 Creating purchase record...');
      await userRef.collection('purchases').add({
        amount: session.amount_total,
        currency: session.currency,
        credits: creditAmount,
        stripeSessionId: session.id,
        stripePaymentIntent: session.payment_intent,
        status: 'completed',
        createdAt: FieldValue.serverTimestamp(),
      });

      console.log('✅ Purchase record created successfully');
      return NextResponse.json({ received: true, success: true });
    } catch (error) {
      console.error('❌ Error updating user credits:', error);
      return NextResponse.json(
        { error: 'Failed to update credits' },
        { status: 500 }
      );
    }
  }

  // Handle other event types if needed
  console.log('ℹ️ Received event type:', event.type, '(not handled)');
  return NextResponse.json({ received: true });
}

// GET endpoint for testing webhook configuration
export async function GET() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  return NextResponse.json({
    status: 'Webhook endpoint is accessible',
    configured: {
      webhookSecret: !!webhookSecret,
      stripeKey: !!stripeKey,
    },
    message: webhookSecret
      ? 'Webhook is configured and ready to receive events'
      : 'WARNING: STRIPE_WEBHOOK_SECRET is not set. Please configure it in your environment variables.',
  });
}
