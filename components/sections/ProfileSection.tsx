'use client';

import { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import AnagraficaTab from './profile/AnagraficaTab';
import PrescriptionsHistoryTab from './profile/PrescriptionsHistoryTab';

type ProfileTab = 'anagrafica' | 'prescrizioni';

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('anagrafica');

  const tabs: { id: ProfileTab; label: string; icon: string }[] = [
    { id: 'anagrafica', label: 'Anagrafica', icon: '👤' },
    { id: 'prescrizioni', label: 'Storico Prescrizioni', icon: '📋' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Il Mio Profilo</h2>
        <p className="text-gray-500 mt-1">Gestisci i tuoi dati e visualizza le prescrizioni</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-white border rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'anagrafica' && <AnagraficaTab />}
        {activeTab === 'prescrizioni' && <PrescriptionsHistoryTab />}
      </div>
    </div>
  );
}