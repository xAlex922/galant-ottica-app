import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

// Inizializza Stripe con la chiave segreta (solo server-side)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-01-28.clover',
  typescript: true,
});

// Helper per formattare importi in centesimi
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100);
}

// Helper per formattare da centesimi a euro
export function formatAmountFromStripe(amount: number): number {
  return amount / 100;
}