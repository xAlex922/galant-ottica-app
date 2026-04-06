import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServiceSupabase } from '@/lib/supabase';
import Stripe from 'stripe';

// IMPORTANTE: Disabilita il body parsing di Next.js per Stripe webhook
export const runtime = 'nodejs';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    // Verifica la firma del webhook
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();

    // Gestisci i diversi tipi di eventi
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const ordineId = paymentIntent.metadata.ordine_id;

        console.log('✅ Payment succeeded:', ordineId);

        // Aggiorna ordine a 'pagato'
        const { error: updateError } = await supabase
          .from('ordini')
          .update({
            stato: 'pagato',
            stato_pagamento: 'paid',
            data_pagamento: new Date().toISOString(),
            stripe_charge_id: paymentIntent.latest_charge as string,
          })
          .eq('id', ordineId);

        if (updateError) {
          console.error('Errore aggiornamento ordine:', updateError);
          break;
        }

        // Scala stock (chiamata RPC function)
        const { error: stockError } = await supabase
          .rpc('scala_stock_ordine', { p_ordine_id: ordineId });

        if (stockError) {
          console.error('Errore scala stock:', stockError);
        }

        // TODO: Invia email conferma ordine
        // await sendConfirmationEmail(ordineId);

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const ordineId = paymentIntent.metadata.ordine_id;

        console.log('❌ Payment failed:', ordineId);

        await supabase
          .from('ordini')
          .update({
            stato_pagamento: 'failed',
          })
          .eq('id', ordineId);

        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;

        console.log('💰 Charge refunded:', charge.id);

        // Trova ordine tramite charge_id
        const { data: ordine } = await supabase
          .from('ordini')
          .select('id')
          .eq('stripe_charge_id', charge.id)
          .single();

        if (ordine) {
          const isPartial = (charge.amount_refunded || 0) < charge.amount;

          await supabase
            .from('ordini')
            .update({
              stato: 'rimborsato',
              stato_pagamento: isPartial ? 'partially_refunded' : 'refunded',
            })
            .eq('id', ordine.id);

          // Ripristina stock
          const { error: stockError } = await supabase
            .rpc('ripristina_stock_ordine', { p_ordine_id: ordine.id });

          if (stockError) {
            console.error('Errore ripristino stock:', stockError);
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    );
  }
}