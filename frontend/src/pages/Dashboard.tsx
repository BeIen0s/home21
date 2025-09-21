import React from 'react';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏠 Home21 - Tableau de bord
          </h1>
          <p className="text-gray-600">
            Plateforme de gestion de résidence - Version moderne
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                👥
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Résidents</p>
                <p className="text-2xl font-semibold text-gray-900">124</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                🏠
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupation</p>
                <p className="text-2xl font-semibold text-gray-900">89%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                📋
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tâches</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                ⚠️
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alertes</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>Nouveau résident</Button>
            <Button variant="secondary">Créer une tâche</Button>
            <Button variant="outline">Voir les rapports</Button>
          </div>
        </div>

        {/* Feature Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🚀 État du développement Home21
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">✅ Architecture TypeScript</span>
              <span className="text-green-600 font-medium">Terminé</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">✅ Design System avec TailwindCSS</span>
              <span className="text-green-600 font-medium">Terminé</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">✅ Dashboard moderne</span>
              <span className="text-green-600 font-medium">Terminé</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">🔄 Pages Résidents</span>
              <span className="text-yellow-600 font-medium">En cours</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">🔄 Gestion des tâches</span>
              <span className="text-yellow-600 font-medium">En cours</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">🔄 Services intégrés</span>
              <span className="text-yellow-600 font-medium">En cours</span>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">🎉</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">
                Home21 fonctionne parfaitement !
              </h3>
              <p className="mt-2 text-sm text-green-700">
                L'application React + TypeScript + TailwindCSS est opérationnelle. 
                Prêt pour le développement des fonctionnalités avancées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;