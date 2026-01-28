import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract metadata
    const userId = session.metadata?.userId;
    const creditAmount = parseInt(session.metadata?.creditAmount || '1', 10);

    if (!userId) {
      console.error('No userId in session metadata');
      return NextResponse.json(
        { error: 'No userId in metadata' },
        { status: 400 }
      );
    }

    try {
      // Add credits to user's Firestore document
      const userRef = adminDb.collection('users').doc(userId);

      await userRef.update({
        credits: FieldValue.increment(creditAmount),
        lastPurchaseDate: FieldValue.serverTimestamp(),
      });

      console.log(`Added ${creditAmount} credit(s) to user ${userId}`);

      // Optional: Create a purchase record for history
      await userRef.collection('purchases').add({
        amount: session.amount_total,
        currency: session.currency,
        credits: creditAmount,
        stripeSessionId: session.id,
        stripePaymentIntent: session.payment_intent,
        status: 'completed',
        createdAt: FieldValue.serverTimestamp(),
      });

      return NextResponse.json({ received: true });
    } catch (error) {
      console.error('Error updating user credits:', error);
      return NextResponse.json(
        { error: 'Failed to update credits' },
        { status: 500 }
      );
    }
  }

  // Handle other event types if needed
  return NextResponse.json({ received: true });
}
