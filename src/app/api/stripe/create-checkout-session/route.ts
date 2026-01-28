import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

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
  try {
    const { userId, userEmail, quantity = 1, priceInPence = 2000 } = await req.json();

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate quantity
    if (quantity < 1 || quantity > 100) {
      return NextResponse.json(
        { error: 'Invalid quantity. Must be between 1 and 100.' },
        { status: 400 }
      );
    }

    // Validate price (basic sanity check)
    if (priceInPence < 1000 || priceInPence > 1000000) {
      return NextResponse.json(
        { error: 'Invalid price' },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    const creditLabel = quantity === 1 ? 'Credit' : 'Credits';
    const pricePerCredit = Math.round(priceInPence / quantity / 100);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${quantity} Verification ${creditLabel}`,
              description: `${quantity} credit${quantity > 1 ? 's' : ''} to verify care worker references (£${pricePerCredit} per credit)`,
            },
            unit_amount: priceInPence,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/agency?purchase=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/agency/purchase?canceled=true`,
      customer_email: userEmail,
      metadata: {
        userId,
        creditAmount: quantity.toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
