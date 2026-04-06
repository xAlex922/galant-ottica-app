'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Glasses, Eye, AlertCircle } from 'lucide-react';

interface Prescrizione {
  id: string;
  tipo: 'occhiali' | 'lenti_contatto';
  data_prescrizione: string;
  data_scadenza: string | null;
  od_potere: number | null;
  od_cilindro: number | null;
  od_asse: number | null;
  od_addizione: number | null;
  os_potere: number | null;
  os_cilindro: number | null;
  os_asse: number | null;
  os_addizione: number | null;
  od_curva_base: number | null;
  od_diametro: number | null;
  os_curva_base: number | null;
  os_diametro: number | null;
  note: string | null;
  medico: string | null;
}

export default function PrescriptionsHistoryTab() {
  const { user } = useAuth();
  const [prescrizioni, setPrescrizioni] = useState<Prescrizione[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'occhiali' | 'lenti_contatto' | 'tutte'>('tutte');

  useEffect(() => {
    if (user) fetchPrescrizioni();
  }, [user]);

  const fetchPrescrizioni = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('prescrizioni')
        .select('*')
        .order('data_prescrizione', { ascending: false });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message);
      }

      setPrescrizioni(data || []);
    } catch (err: any) {
      console.error('Error fetching prescrizioni:', err);
      setError(err.message || 'Errore nel caricamento delle prescrizioni');
    } finally {
      setLoading(false);
    }
  };

  const filteredPrescrizioni = prescrizioni.filter((p) => {
    if (activeType === 'tutte') return true;
    return p.tipo === activeType;
  });

  const occhiali = prescrizioni.filter((p) => p.tipo === 'occhiali');
  const lenti = prescrizioni.filter((p) => p.tipo === 'lenti_contatto');

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Non specificata';
    return new Date(dateString + 'T00:00:00').toLocaleDateString('it-IT');
  };

  const isScaduta = (dataScadenza: string | null): boolean => {
    if (!dataScadenza) return false;
    return new Date(dataScadenza) < new Date();
  };

  const formatNumber = (num: number | null): string => {
    if (num === null || num === undefined) return '-';
    return num > 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
  };

  // Loading
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-white border rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-700 font-medium">Errore</p>
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={fetchPrescrizioni} className="text-red-700 underline text-sm mt-2">Riprova</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Type Filter Buttons */}
      <div className="flex space-x-2 bg-white border rounded-lg p-1">
        <button
          onClick={() => setActiveType('tutte')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeType === 'tutte' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Tutte ({prescrizioni.length})
        </button>
        <button
          onClick={() => setActiveType('occhiali')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeType === 'occhiali' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Glasses className="w-4 h-4" />
          <span>Occhiali ({occhiali.length})</span>
        </button>
        <button
          onClick={() => setActiveType('lenti_contatto')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeType === 'lenti_contatto' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Lenti ({lenti.length})</span>
        </button>
      </div>

      {/* Empty State */}
      {filteredPrescrizioni.length === 0 && (
        <div className="bg-white border rounded-lg p-12 text-center">
          <div className="text-5xl mb-4">{activeType === 'lenti_contatto' ? '👁️' : activeType === 'occhiali' ? '🕶️' : '📋'}</div>
          <p className="text-gray-500 font-medium">Nessuna prescrizione trovata</p>
          <p className="text-gray-400 text-sm mt-1">
            {activeType === 'tutte'
              ? 'Le prescrizioni verranno aggiunte dal personale dello studio'
              : `Nessuna prescrizione per ${activeType === 'occhiali' ? 'occhiali' : 'lenti a contatto'}`}
          </p>
        </div>
      )}

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescrizioni.map((p) => (
          <div key={p.id} className="bg-white border rounded-lg overflow-hidden">
            {/* Card Header */}
            <div className={`px-6 py-4 flex items-center justify-between ${p.tipo === 'occhiali' ? 'bg-blue-50 border-b border-blue-100' : 'bg-emerald-50 border-b border-emerald-100'}`}>
              <div className="flex items-center space-x-3">
                {p.tipo === 'occhiali' ? (
                  <div className="p-2 bg-blue-100 rounded-lg"><Glasses className="w-5 h-5 text-blue-600" /></div>
                ) : (
                  <div className="p-2 bg-emerald-100 rounded-lg"><Eye className="w-5 h-5 text-emerald-600" /></div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">{p.tipo === 'occhiali' ? 'Prescrizione Occhiali' : 'Prescrizione Lenti a Contatto'}</p>
                  <p className="text-sm text-gray-500">Data: {formatDate(p.data_prescrizione)}</p>
                </div>
              </div>
              {/* Scadenza Badge */}
              {p.data_scadenza && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isScaduta(p.data_scadenza) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {isScaduta(p.data_scadenza) ? 'Scaduta' : 'Valida'} – {formatDate(p.data_scadenza)}
                </span>
              )}
            </div>

            {/* Card Body: OD / OS */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Occhio Destro */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Occhio Destro (OD)</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Potere</span>
                      <span className="text-sm font-semibold">{formatNumber(p.od_potere)}</span>
                    </div>
                    {(p.od_cilindro !== null) && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Cilindro</span>
                        <span className="text-sm font-semibold">{formatNumber(p.od_cilindro)}</span>
                      </div>
                    )}
                    {(p.od_asse !== null) && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Asse</span>
                        <span className="text-sm font-semibold">{p.od_asse}°</span>
                      </div>
                    )}
                    {(p.od_addizione !== null) && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Addizione</span>
                        <span className="text-sm font-semibold">+{p.od_addizione.toFixed(2)}</span>
                      </div>
                    )}
                    {/* LAC specifici */}
                    {p.tipo === 'lenti_contatto' && p.od_curva_base !== null && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Curva Base</span>
                        <span className="text-sm font-semibold">{p.od_curva_base.toFixed(2)}</span>
                      </div>
                    )}
                    {p.tipo === 'lenti_contatto' && p.od_diametro !== null && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Diametro</span>
                        <span className="text-sm font-semibold">{p.od_diametro.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Occhio Sinistro */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Occhio Sinistro (OS)</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Potere</span>
                      <span className="text-sm font-semibold">{formatNumber(p.os_potere)}</span>
                    </div>
                    {(p.os_cilindro !== null) && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Cilindro</span>
                        <span className="text-sm font-semibold">{formatNumber(p.os_cilindro)}</span>
                      </div>
                    )}
                    {(p.os_asse !== null) && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Asse</span>
                        <span className="text-sm font-semibold">{p.os_asse}°</span>
                      </div>
                    )}
                    {(p.os_addizione !== null) && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Addizione</span>
                        <span className="text-sm font-semibold">+{p.os_addizione.toFixed(2)}</span>
                      </div>
                    )}
                    {/* LAC specifici */}
                    {p.tipo === 'lenti_contatto' && p.os_curva_base !== null && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Curva Base</span>
                        <span className="text-sm font-semibold">{p.os_curva_base.toFixed(2)}</span>
                      </div>
                    )}
                    {p.tipo === 'lenti_contatto' && p.os_diametro !== null && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Diametro</span>
                        <span className="text-sm font-semibold">{p.os_diametro.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Medico + Note */}
              {(p.medico || p.note) && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  {p.medico && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Medico:</span> {p.medico}
                    </p>
                  )}
                  {p.note && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Note:</span> {p.note}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}