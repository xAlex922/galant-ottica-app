'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Package, Calendar, MapPin, Truck, AlertCircle, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Order {
  id: string;
  numero: string;
  data: string;
  stato: string;
  stato_pagamento: string;
  totale: number;
  metodo_pagamento: string;
  metodo_spedizione: string;
  tracking_code: string | null;
  indirizzo_spedizione: any;
  righe: OrderItem[];
  created_at: string;
  updated_at?: string;
}

interface OrderItem {
  id: string;
  prodotto_nome: string;
  prodotto_sku: string;
  quantita: number;
  prezzo_unitario: number;
  totale_riga: number;
  parametri_ottici: any;
}

interface OrdersSectionProps {
  onNavigate?: (section: string) => void;
}

export default function OrdersSection({ onNavigate }: OrdersSectionProps) {
  const { user } = useAuth();
  const [ordini, setOrdini] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchOrdini();
  }, [user]);

  const fetchOrdini = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: ordiniError } = await supabase
        .from('ordini')
        .select(`
          *,
          righe:ordini_righe(*)
        `)
        .order('created_at', { ascending: false });

      if (ordiniError) {
        console.error('Supabase error:', ordiniError);
        throw new Error(ordiniError.message);
      }

      setOrdini(data || []);
    } catch (err: any) {
      console.error('Error fetching ordini:', err);
      setError(err.message || 'Errore nel caricamento degli ordini');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatoBadge = (stato: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      ricevuto: { color: 'bg-blue-100 text-blue-700', label: 'Ricevuto' },
      pagato: { color: 'bg-green-100 text-green-700', label: 'Pagato' },
      in_lavorazione: { color: 'bg-yellow-100 text-yellow-700', label: 'In Lavorazione' },
      spedito: { color: 'bg-purple-100 text-purple-700', label: 'Spedito' },
      consegnato: { color: 'bg-emerald-100 text-emerald-700', label: 'Consegnato' },
      annullato: { color: 'bg-red-100 text-red-700', label: 'Annullato' },
      rimborsato: { color: 'bg-pink-100 text-pink-700', label: 'Rimborsato' },
    };
    const badge = badges[stato] || badges.ricevuto;
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Loading
  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">I Miei Ordini</h2>
        <div className="bg-white border rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">I Miei Ordini</h2>
        <p className="text-gray-500 mt-1">Visualizza lo storico dei tuoi acquisti</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 font-medium">Errore</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {ordini.length === 0 && (
        <div className="bg-white border rounded-lg p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nessun ordine</h3>
          <p className="text-gray-500 mb-6">Non hai ancora effettuato ordini</p>
          <button
            onClick={() => onNavigate?.('shop')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium"
          >
            Inizia a comprare
          </button>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {ordini.map((order) => (
          <div key={order.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Order Header */}
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleExpand(order.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Ordine {order.numero}</h3>
                    {getStatoBadge(order.stato)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(order.created_at || order.data)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4" />
                      <span>{order.righe?.length || 0} articoli</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">€{order.totale.toFixed(2)}</p>
                  <button className="text-gray-400 hover:text-gray-600 mt-2">
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tracking (if available) */}
              {order.tracking_code && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-purple-50 px-3 py-2 rounded">
                  <Truck className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Tracking:</span>
                  <span className="font-mono">{order.tracking_code}</span>
                </div>
              )}
            </div>

            {/* Expanded Details */}
            {expandedOrder === order.id && (
              <div className="border-t bg-gray-50 p-6 space-y-4">
                {/* Indirizzo Spedizione */}
                {order.indirizzo_spedizione && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Indirizzo di Spedizione
                    </h4>
                    <div className="text-sm text-gray-600 bg-white p-3 rounded border">
                      <p className="font-medium">
                        {order.indirizzo_spedizione.nome} {order.indirizzo_spedizione.cognome}
                      </p>
                      <p>{order.indirizzo_spedizione.via}</p>
                      <p>
                        {order.indirizzo_spedizione.cap} {order.indirizzo_spedizione.citta} ({order.indirizzo_spedizione.provincia})
                      </p>
                      {order.indirizzo_spedizione.telefono && (
                        <p className="mt-1">Tel: {order.indirizzo_spedizione.telefono}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Prodotti */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Prodotti Ordinati
                  </h4>
                  <div className="space-y-2">
                    {order.righe?.map((riga) => (
                      <div key={riga.id} className="bg-white p-3 rounded border flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{riga.prodotto_nome}</p>
                          <p className="text-xs text-gray-500">SKU: {riga.prodotto_sku}</p>
                          {riga.parametri_ottici && (
                            <p className="text-xs text-gray-600 mt-1">
                              {riga.parametri_ottici.potere && `PWR: ${riga.parametri_ottici.potere}`}
                              {riga.parametri_ottici.curva_base && ` | BC: ${riga.parametri_ottici.curva_base}`}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 mt-1">Quantità: {riga.quantita}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">€{riga.totale_riga.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">€{riga.prezzo_unitario.toFixed(2)} cad.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Riepilogo */}
                <div className="bg-white p-4 rounded border">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Metodo di pagamento:</span>
                      <span className="font-medium capitalize">{order.metodo_pagamento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Metodo di spedizione:</span>
                      <span className="font-medium capitalize">{order.metodo_spedizione || 'Standard'}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-semibold">Totale:</span>
                      <span className="font-bold text-lg text-primary">€{order.totale.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}