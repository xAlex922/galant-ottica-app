'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Calendar, CreditCard, Home } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function AnagraficaTab() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    cognome: user?.cognome || '',
    telefono: user?.telefono || '',
    email: user?.email || '',
    codice_fiscale: user?.codice_fiscale || '',
    indirizzo: user?.indirizzo || '',
    cap: user?.cap || '',
    provincia: user?.provincia || '',
    data_nascita: user?.data_nascita || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || '',
        cognome: user.cognome || '',
        telefono: user.telefono || '',
        email: user.email || '',
        codice_fiscale: user.codice_fiscale || '',
        indirizzo: user.indirizzo || '',
        cap: user.cap || '',
        provincia: user.provincia || '',
        data_nascita: user.data_nascita || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await updateProfile({
        nome: formData.nome,
        cognome: formData.cognome,
        telefono: formData.telefono,
        codice_fiscale: formData.codice_fiscale,
        indirizzo: formData.indirizzo,
        cap: formData.cap,
        provincia: formData.provincia,
        data_nascita: formData.data_nascita,
      });

      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || "Errore durante l'aggiornamento del profilo");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: user?.nome || '',
      cognome: user?.cognome || '',
      telefono: user?.telefono || '',
      email: user?.email || '',
      codice_fiscale: user?.codice_fiscale || '',
      indirizzo: user?.indirizzo || '',
      cap: user?.cap || '',
      provincia: user?.provincia || '',
      data_nascita: user?.data_nascita || '',
    });
    setIsEditing(false);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Caricamento profilo...</p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent";
  const displayClass = "text-lg px-4 py-2 bg-gray-50 rounded-lg min-h-[42px] flex items-center";

  return (
    <div className="space-y-6">
      {/* Buttons */}
      <div className="flex justify-end">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Modifica</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Annulla</span>
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Salvataggio...' : 'Salva'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-600 text-sm">Profilo aggiornato con successo!</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-white border rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" /> Nome
            </label>
            {isEditing ? (
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} className={inputClass} placeholder="Il tuo nome" />
            ) : (
              <p className={displayClass}>{user.nome || <span className="text-gray-400 italic">Non specificato</span>}</p>
            )}
          </div>

          {/* Cognome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" /> Cognome
            </label>
            {isEditing ? (
              <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} className={inputClass} placeholder="Il tuo cognome" />
            ) : (
              <p className={displayClass}>{user.cognome || <span className="text-gray-400 italic">Non specificato</span>}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" /> Email
            </label>
            <p className="text-lg px-4 py-2 bg-gray-100 rounded-lg text-gray-500 min-h-[42px] flex items-center">{user.email}</p>
            {isEditing && <p className="text-xs text-gray-400 mt-1">Email non modificabile</p>}
          </div>

          {/* Telefono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" /> Telefono
            </label>
            {isEditing ? (
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className={inputClass} placeholder="+39 333 1234567" />
            ) : (
              <p className={displayClass}>{user.telefono || <span className="text-gray-400 italic">Non specificato</span>}</p>
            )}
          </div>

          {/* Codice Fiscale */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CreditCard className="w-4 h-4 inline mr-1" /> Codice Fiscale
            </label>
            {isEditing ? (
              <input type="text" name="codice_fiscale" value={formData.codice_fiscale} onChange={handleChange} maxLength={16} className={inputClass + " uppercase"} placeholder="RSSMRA80A01H501X" />
            ) : (
              <p className={displayClass + " uppercase"}>{user.codice_fiscale || <span className="text-gray-400 italic normal-case">Non specificato</span>}</p>
            )}
          </div>

          {/* Data Nascita */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" /> Data di Nascita
            </label>
            {isEditing ? (
              <input type="date" name="data_nascita" value={formData.data_nascita} onChange={handleChange} className={inputClass} />
            ) : (
              <p className={displayClass}>
                {user.data_nascita
                  ? new Date(user.data_nascita + 'T00:00:00').toLocaleDateString('it-IT')
                  : <span className="text-gray-400 italic">Non specificato</span>}
              </p>
            )}
          </div>

          {/* Indirizzo */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Home className="w-4 h-4 inline mr-1" /> Indirizzo (con civico)
            </label>
            {isEditing ? (
              <input type="text" name="indirizzo" value={formData.indirizzo} onChange={handleChange} className={inputClass} placeholder="Via Roma 123" />
            ) : (
              <p className={displayClass}>{user.indirizzo || <span className="text-gray-400 italic">Non specificato</span>}</p>
            )}
          </div>

          {/* CAP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" /> CAP
            </label>
            {isEditing ? (
              <input type="text" name="cap" value={formData.cap} onChange={handleChange} maxLength={5} className={inputClass} placeholder="20100" />
            ) : (
              <p className={displayClass}>{user.cap || <span className="text-gray-400 italic">Non specificato</span>}</p>
            )}
          </div>

          {/* Provincia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" /> Provincia
            </label>
            {isEditing ? (
              <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} maxLength={2} className={inputClass + " uppercase"} placeholder="MI" />
            ) : (
              <p className={displayClass + " uppercase"}>{user.provincia || <span className="text-gray-400 italic normal-case">Non specificato</span>}</p>
            )}
          </div>
        </div>

        {/* Ruolo */}
        <div className="pt-6 border-t">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo Account</label>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {user.ruolo === 'admin' ? 'Amministratore' :
             user.ruolo === 'manager' ? 'Manager' :
             user.ruolo === 'operatore' ? 'Operatore' :
             user.ruolo === 'customer' ? 'Cliente' : user.ruolo}
          </span>
        </div>
      </div>
    </div>
  );
}