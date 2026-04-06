'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Calendar, Clock, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

interface Prenotazione {
  id: string;
  data_prenotazione: string;
  ora_inizio: string;
  ora_fine: string | null;
  tipo_servizio: string;
  stato: 'confermata' | 'completata' | 'cancellata' | 'no_show';
  note: string | null;
  created_at: string;
}

export default function AppointmentsSection() {
  const { user } = useAuth();
  const [prenotazioni, setPrenotazioni] = useState<Prenotazione[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    data_prenotazione: '',
    ora_inizio: '',
    tipo_servizio: 'controllo_vista',
    note: '',
  });

  const tipiServizio = [
    { value: 'controllo_vista', label: 'Controllo Vista' },
    { value: 'ritiro_occhiali', label: 'Ritiro Occhiali' },
    { value: 'adattamento_lac', label: 'Adattamento Lenti a Contatto' },
    { value: 'consulenza', label: 'Consulenza' },
    { value: 'riparazione', label: 'Riparazione' },
  ];

  useEffect(() => {
    if (user) fetchPrenotazioni();
  }, [user]);

  const fetchPrenotazioni = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('prenotazioni')
        .select('*')
        .neq('stato', 'cancellata')
        .order('data_prenotazione', { ascending: false })
        .order('ora_inizio', { ascending: false });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message);
      }

      setPrenotazioni(data || []);
    } catch (err: any) {
      console.error('Error fetching prenotazioni:', err);
      setError(err.message || 'Errore nel caricamento delle prenotazioni');
    } finally {
      setLoading(false);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user?.id) {
    setError('Utente non autenticato');
    return;
  }

  try {
    setSaving(true);
    setError(null);

    // STEP 1: Ottieni auth user
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) {
      throw new Error('Sessione scaduta');
    }

    // STEP 2: Cerca il cliente
    let { data: clienteData, error: clienteError } = await supabase
      .from('clienti')
      .select('id')
      .eq('auth_user_id', authData.user.id)
      .maybeSingle();

    // STEP 3: Se il cliente non esiste, crealo automaticamente
    if (!clienteData) {
      console.log('Cliente non trovato, creazione automatica...');
      
      const { data: newCliente, error: insertClienteError } = await supabase
        .from('clienti')
        .insert({
          auth_user_id: authData.user.id,
          email: authData.user.email || user.email,
          nome: user.nome || 'Cliente',
          cognome: user.cognome || '',
        })
        .select('id')
        .single();

      if (insertClienteError) {
        console.error('Errore creazione cliente:', insertClienteError);
        throw new Error('Impossibile creare il profilo cliente. Contatta il supporto.');
      }

      clienteData = newCliente;
    }

    if (!clienteData) {
      throw new Error('Profilo cliente non trovato. Contatta il supporto.');
    }

    // STEP 4: Inserisci la prenotazione
    const { error: insertError } = await supabase.from('prenotazioni').insert({
      cliente_id: clienteData.id,
      data_prenotazione: formData.data_prenotazione,
      ora_inizio: formData.ora_inizio,
      tipo_servizio: formData.tipo_servizio,
      note: formData.note.trim() || null,
      stato: 'confermata',
    });

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error(insertError.message);
    }

    // Reset form
    setFormData({
      data_prenotazione: '',
      ora_inizio: '',
      tipo_servizio: 'controllo_vista',
      note: '',
    });

    setShowModal(false);
    await fetchPrenotazioni();
  } catch (err: any) {
    console.error('Error creating prenotazione:', err);
    setError(err.message || 'Errore durante la creazione della prenotazione');
  } finally {
    setSaving(false);
  }
};
  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler cancellare questa prenotazione?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('prenotazioni')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Delete error:', deleteError);
        throw new Error(deleteError.message);
      }

      await fetchPrenotazioni();
    } catch (err: any) {
      console.error('Error deleting prenotazione:', err);
      alert('Errore durante l\'eliminazione: ' + err.message);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string): string => {
    return timeString.substring(0, 5); // HH:MM
  };

  const getServizioLabel = (value: string): string => {
    return tipiServizio.find((s) => s.value === value)?.label || value;
  };

  const getStatoBadge = (stato: string) => {
    const badges = {
      confermata: { color: 'bg-green-100 text-green-700', label: 'Confermata' },
      completata: { color: 'bg-gray-100 text-gray-700', label: 'Completata' },
      cancellata: { color: 'bg-red-100 text-red-700', label: 'Cancellata' },
      no_show: { color: 'bg-orange-100 text-orange-700', label: 'Non Presentato' },
    };
    const badge = badges[stato as keyof typeof badges] || badges.confermata;
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Prenotazioni</h2>
        </div>
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Prenotazioni</h2>
          <p className="text-gray-500 mt-1">Gestisci i tuoi appuntamenti</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuova Prenotazione</span>
        </button>
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
      {prenotazioni.length === 0 && (
        <div className="bg-white border rounded-lg p-12 text-center">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-gray-500 font-medium">Nessuna prenotazione</p>
          <p className="text-gray-400 text-sm mt-1">Clicca su "Nuova Prenotazione" per iniziare</p>
        </div>
      )}

      {/* Prenotazioni List */}
      <div className="space-y-4">
        {prenotazioni.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex items-start p-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 ml-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getServizioLabel(p.tipo_servizio)}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(p.data_prenotazione)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(p.ora_inizio)}</span>
                      </div>
                    </div>
                    {p.note && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        Note: {p.note}
                      </p>
                    )}
                  </div>

                  {/* Badge + Delete */}
                  <div className="flex items-center space-x-3">
                    {getStatoBadge(p.stato)}
                    {p.stato === 'confermata' && (
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Cancella prenotazione"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Green Border for confirmed */}
            {p.stato === 'confermata' && (
              <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Nuova Prenotazione */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Nuova Prenotazione</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Data */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.data_prenotazione}
                  onChange={(e) =>
                    setFormData({ ...formData, data_prenotazione: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Ora */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ora *
                </label>
                <input
                  type="time"
                  required
                  value={formData.ora_inizio}
                  onChange={(e) => setFormData({ ...formData, ora_inizio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Tipo Servizio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo Servizio *
                </label>
                <select
                  required
                  value={formData.tipo_servizio}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo_servizio: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {tipiServizio.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Note (OPZIONALE) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note (opzionale)
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Aggiungi eventuali note..."
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError(null);
                  }}
                  disabled={saving}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Salvando...' : 'Prenota'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}