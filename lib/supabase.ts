import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client per uso pubblico (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Client per uso server-side (API routes) con service role
export function getServiceSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Types helper per TypeScript
export type Database = {
  public: {
    Tables: {
      clienti: {
        Row: {
          id: string;
          codice: string;
          nome: string;
          cognome: string | null;
          email: string | null;
          telefono: string | null;
          auth_user_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      prodotti: {
        Row: {
          id: string;
          codice: string;
          nome: string;
          descrizione: string | null;
          prezzo: number;
          slug: string | null;
          immagini: string[] | null;
          marca_id: string | null;
          categoria_id: string | null;
          tipo_lac: string | null;
          visibile_storefront: boolean;
          attivo: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      prodotti_varianti: {
        Row: {
          id: string;
          prodotto_id: string;
          sku: string;
          potere: number;
          curva_base: number | null;
          diametro: number | null;
          cilindro: number | null;
          asse: number | null;
          giacenza: number;
          prezzo_override: number | null;
          attivo: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      ordini: {
        Row: {
          id: string;
          numero: string;
          cliente_id: string;
          email_cliente: string;
          stato: string;
          stato_pagamento: string;
          subtotale: number;
          totale: number;
          indirizzo_spedizione: any;
          metodo_pagamento: string;
          stripe_payment_intent_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      ordini_righe: {
        Row: {
          id: string;
          ordine_id: string;
          variante_id: string;
          prodotto_nome: string;
          quantita: number;
          prezzo_unitario: number;
          totale_riga: number;
          parametri_ottici: any;
          created_at: string;
        };
      };
    };
  };
};