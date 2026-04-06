import { supabase } from './supabase';

export interface Product {
  id: string;
  codice: string;
  nome: string;
  descrizione: string;
  prezzo: number;
  categoria_id: string;
  marca_id?: string;
  immagini: string[];
  slug: string;
  tipo_lac?: string;
  tipologia_uso?: string;
  pezzi_confezione?: number;
  visibile_storefront: boolean;
  in_evidenza: boolean;
  attivo: boolean;
  created_at: string;
  varianti?: ProductVariant[];
  categoria?: Category;
  marca?: Brand;
}

export interface ProductVariant {
  id: string;
  prodotto_id: string;
  sku: string;
  potere: number;
  curva_base?: number;
  diametro?: number;
  cilindro?: number;
  asse?: number;
  addizione?: string;
  giacenza: number;
  giacenza_minima: number;
  prezzo_override?: number;
  attivo: boolean;
}

export interface Category {
  id: string;
  nome: string;
  tipo: string;
  slug?: string;
  ordine: number;
  attiva: boolean;
}

export interface Brand {
  id: string;
  nome: string;
  slug: string;
  logo_url?: string;
  attiva: boolean;
}

export interface Cliente {
  id: string;
  codice: string;
  nome: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  auth_user_id?: string;
}

export interface Order {
  id: string;
  numero: string;
  cliente_id: string;
  email_cliente: string;
  stato: string;
  stato_pagamento: string;
  subtotale: number;
  sconto_totale: number;
  costo_spedizione: number;
  totale: number;
  totale_iva: number;
  indirizzo_spedizione: any;
  indirizzo_fatturazione?: any;
  metodo_pagamento: string;
  metodo_spedizione?: string;
  corriere?: string;
  tracking_code?: string;
  data_spedizione?: string;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  data_pagamento?: string;
  fattura_richiesta?: boolean;
  fattura_numero?: string;
  note_cliente?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  righe?: OrderItem[];
  cliente?: Cliente;
}

export interface OrderItem {
  id: string;
  ordine_id: string;
  variante_id: string;
  prodotto_nome: string;
  prodotto_sku: string;
  quantita: number;
  prezzo_unitario: number;
  sconto_percentuale?: number;
  totale_riga: number;
  iva_percentuale?: number;
  parametri_ottici: any;
  occhio?: string;
  created_at?: string;
}

export async function getProducts(filters?: {
  categoria?: string;
  marca?: string;
  search?: string;
  inEvidenza?: boolean;
}) {
  try {
    let query = supabase
      .from('prodotti')
      .select(`
        *,
        categoria:categorie(id, nome, slug),
        marca:marche(id, nome, slug, logo_url),
        varianti:prodotti_varianti(
          id, sku, potere, curva_base, diametro,
          cilindro, asse, giacenza, prezzo_override, attivo
        )
      `)
      .eq('attivo', true)
      .eq('visibile_storefront', true);

    if (filters?.categoria) {
      query = query.eq('categoria.slug', filters.categoria);
    }

    if (filters?.marca) {
      query = query.eq('marca.slug', filters.marca);
    }

    if (filters?.search) {
      query = query.ilike('nome', `%${filters.search}%`);
    }

    if (filters?.inEvidenza) {
      query = query.eq('in_evidenza', true);
    }

    const { data, error } = await query.order('ordine_visualizzazione');

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return { data: null, error: error.message };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('prodotti')
      .select(`
        *,
        categoria:categorie(id, nome, slug),
        marca:marche(id, nome, slug, logo_url),
        varianti:prodotti_varianti(
          id, sku, potere, curva_base, diametro,
          cilindro, asse, addizione, giacenza, 
          giacenza_minima, prezzo_override, attivo
        )
      `)
      .eq('slug', slug)
      .eq('attivo', true)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return { data: null, error: error.message };
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categorie')
      .select('*')
      .eq('attiva', true)
      .order('ordine');

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return { data: null, error: error.message };
  }
}

export async function getBrands() {
  try {
    const { data, error } = await supabase
      .from('marche')
      .select('*')
      .eq('attiva', true)
      .order('ordine');

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching brands:', error);
    return { data: null, error: error.message };
  }
}

export async function getOrdersByCustomer(clienteId: string) {
  try {
    const { data, error } = await supabase
      .from('ordini')
      .select(`
        *,
        righe:ordini_righe(*)
      `)
      .eq('cliente_id', clienteId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return { data: null, error: error.message };
  }
}

export async function getOrderById(orderId: string) {
  try {
    const { data, error } = await supabase
      .from('ordini')
      .select(`
        *,
        righe:ordini_righe(*),
        cliente:clienti(*)
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching order:', error);
    return { data: null, error: error.message };
  }
}

export async function createOrder(orderData: {
  cliente_id: string;
  email_cliente: string;
  subtotale: number;
  sconto_totale?: number;
  costo_spedizione: number;
  totale: number;
  totale_iva: number;
  indirizzo_spedizione: any;
  indirizzo_fatturazione?: any;
  metodo_pagamento: string;
  metodo_spedizione?: string;
  note_cliente?: string;
  righe: Array<{
    variante_id: string;
    prodotto_nome: string;
    prodotto_sku: string;
    quantita: number;
    prezzo_unitario: number;
    parametri_ottici: any;
    occhio?: string;
  }>;
}) {
  try {
    const { data: ordine, error: ordineError } = await supabase
      .from('ordini')
      .insert({
        cliente_id: orderData.cliente_id,
        email_cliente: orderData.email_cliente,
        subtotale: orderData.subtotale,
        sconto_totale: orderData.sconto_totale || 0,
        costo_spedizione: orderData.costo_spedizione,
        totale: orderData.totale,
        totale_iva: orderData.totale_iva,
        indirizzo_spedizione: orderData.indirizzo_spedizione,
        indirizzo_fatturazione: orderData.indirizzo_fatturazione,
        metodo_pagamento: orderData.metodo_pagamento,
        metodo_spedizione: orderData.metodo_spedizione || 'standard',
        note_cliente: orderData.note_cliente,
        stato: 'ricevuto',
        stato_pagamento: 'pending',
      })
      .select()
      .single();

    if (ordineError) throw ordineError;

    const righeData = orderData.righe.map(riga => ({
      ordine_id: ordine.id,
      variante_id: riga.variante_id,
      prodotto_nome: riga.prodotto_nome,
      prodotto_sku: riga.prodotto_sku,
      quantita: riga.quantita,
      prezzo_unitario: riga.prezzo_unitario,
      parametri_ottici: riga.parametri_ottici,
      occhio: riga.occhio,
    }));

    const { error: righeError } = await supabase
      .from('ordini_righe')
      .insert(righeData);

    if (righeError) throw righeError;

    return { data: ordine, error: null };
  } catch (error: any) {
    console.error('Error creating order:', error);
    return { data: null, error: error.message };
  }
}

export async function checkStockAvailability(
  varianteId: string,
  quantita: number
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .rpc('check_stock_disponibile', {
        p_variante_id: varianteId,
        p_quantita: quantita,
      });

    if (error) throw error;

    return data === true;
  } catch (error) {
    console.error('Error checking stock:', error);
    return false;
  }
}

export async function validateCoupon(
  codice: string,
  clienteId: string,
  subtotale: number
) {
  try {
    const { data, error } = await supabase
      .rpc('valida_coupon', {
        p_codice: codice,
        p_cliente_id: clienteId,
        p_subtotale: subtotale,
      });

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error validating coupon:', error);
    return { data: null, error: error.message };
  }
}

export async function calculateShipping(
  subtotale: number,
  cap: string,
  metodo: 'standard' | 'express'
) {
  try {
    const { data, error } = await supabase
      .rpc('calcola_spedizione', {
        p_subtotale: subtotale,
        p_cap: cap,
        p_metodo: metodo,
      });

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error calculating shipping:', error);
    return { data: null, error: error.message };
  }
}