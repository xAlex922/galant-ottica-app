import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { ordineId } = await request.json();

    if (!ordineId) {
      return NextResponse.json(
        { error: 'ordineId è richiesto' },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();

    // Fetch ordine dal database
    const { data: ordine, error: ordineError } = await supabase
      .from('ordini')
      .select('*')
      .eq('id', ordineId)
      .single();

    if (ordineError || !ordine) {
      console.error('Errore fetch ordine:', ordineError);
      return NextResponse.json(
        { error: 'Ordine non trovato' },
        { status: 404 }
      );
    }

    // Verifica se esiste già un PaymentIntent
    if (ordine.stripe_payment_intent_id) {
      // Recupera il PaymentIntent esistente
      const existingPI = await stripe.paymentIntents.retrieve(
        ordine.stripe_payment_intent_id
      );
      
      return NextResponse.json({
        clientSecret: existingPI.client_secret,
      });
    }

    // Calcola importo in centesimi
    const amount = Math.round(ordine.totale * 100);

    // Crea nuovo PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ordine_id: ordine.id,
        cliente_id: ordine.cliente_id,
        numero_ordine: ordine.numero,
      },
      receipt_email: ordine.email_cliente,
      description: `Ordine ${ordine.numero} - Galant Ottica`,
    });

    // Salva payment_intent_id nell'ordine
    const { error: updateError } = await supabase
      .from('ordini')
      .update({
        stripe_payment_intent_id: paymentIntent.id,
        stato_pagamento: 'processing',
      })
      .eq('id', ordineId);

    if (updateError) {
      console.error('Errore update ordine:', updateError);
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error: any) {
    console.error('Errore create-payment-intent:', error);
    return NextResponse.json(
      { error: error.message || 'Errore interno del server' },
      { status: 500 }
    );
  }
}