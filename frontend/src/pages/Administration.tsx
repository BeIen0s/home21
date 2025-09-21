import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const adminSections = [
  {
    id: 'users',
    title: 'Gestion des utilisateurs',
    description: 'Gérer les comptes administrateurs et permissions',
    icon: '👥',
    color: 'blue',
    actions: ['Voir les utilisateurs', 'Ajouter un admin', 'Gérer les rôles']
  },
  {
    id: 'system',
    title: 'Configuration système',
    description: 'Paramètres généraux de l\'application',
    icon: '⚙️',
    color: 'gray',
    actions: ['Paramètres généraux', 'Sauvegardes', 'Logs système']
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Gérer les templates et paramètres de notifications',
    icon: '📧',
    color: 'green',
    actions: ['Templates email', 'Paramètres SMS', 'Historique']
  },
  {
    id: 'reports',
    title: 'Rapports et analytics',
    description: 'Générer des rapports et consulter les statistiques',
    icon: '📊',
    color: 'purple',
    actions: ['Rapport mensuel', 'Statistiques', 'Export données']
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Outils de maintenance et diagnostic',
    icon: '🔧',
    color: 'orange',
    actions: ['Base de données', 'Cache', 'Santé système']
  },
  {
    id: 'security',
    title: 'Sécurité',
    description: 'Paramètres de sécurité et audit',
    icon: '🔒',
    color: 'red',
    actions: ['Logs connexion', 'Sessions actives', 'Politique mot de passe']
  }
];

const recentActivities = [
  {
    id: '1',
    user: 'Admin System',
    action: 'Sauvegarde automatique effectuée',
    timestamp: '2024-09-21T14:30:00Z',
    type: 'system'
  },
  {
    id: '2',
    user: 'Alice Martin',
    action: 'Connexion depuis nouvelle IP',
    timestamp: '2024-09-21T13:15:00Z',
    type: 'security'
  },
  {
    id: '3',
    user: 'Admin System',
    action: 'Notification email envoyée (10 destinataires)',
    timestamp: '2024-09-21T12:00:00Z',
    type: 'notification'
  },
  {
    id: '4',
    user: 'Thomas Dubois',
    action: 'Mot de passe modifié',
    timestamp: '2024-09-21T11:45:00Z',
    type: 'security'
  }
];

const systemStats = {
  totalUsers: 156,
  activeUsers: 89,
  systemUptime: '15 jours',
  lastBackup: '2024-09-21T14:30:00Z',
  diskUsage: 68,
  memoryUsage: 45
};

export const Administration: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('fr-FR');
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'system': return 'blue';
      case 'security': return 'red';
      case 'notification': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
              <p className="text-gray-600">Panneau de contrôle et gestion système</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                📥 Export données
              </Button>
              <Button variant="primary">
                ⚙️ Paramètres système
              </Button>
            </div>
          </div>

          {/* Statistiques système */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{systemStats.totalUsers}</div>
                <div className="text-sm text-gray-600">Utilisateurs totaux</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</div>
                <div className="text-sm text-gray-600">Utilisateurs actifs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{systemStats.systemUptime}</div>
                <div className="text-sm text-gray-600">Uptime système</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{systemStats.diskUsage}%</div>
                <div className="text-sm text-gray-600">Utilisation disque</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{systemStats.memoryUsage}%</div>
                <div className="text-sm text-gray-600">Utilisation RAM</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-sm font-bold text-gray-900">
                  {formatDateTime(systemStats.lastBackup).split(' ')[1]}
                </div>
                <div className="text-xs text-gray-600">Dernière sauvegarde</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sections d'administration */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Sections d'administration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminSections.map((section) => (
                <Card key={section.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{section.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{section.title}</h3>
                        <p className="text-sm text-gray-600">{section.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      {section.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setActiveSection(section.id)}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Activité récente */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Activité récente</h2>
            <Card>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Par {activity.user}
                          </p>
                        </div>
                        <div className="ml-3">
                          <Badge 
                            color={getActivityTypeColor(activity.type) as any} 
                            size="sm"
                          >
                            {activity.type}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDateTime(activity.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card className="mt-6">
              <CardHeader>
                <h3 className="font-semibold">Actions rapides</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🔄 Redémarrer les services
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    💾 Sauvegarder maintenant
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🧹 Nettoyer les logs
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    📊 Générer rapport
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Alertes système */}
            <Card className="mt-6">
              <CardHeader>
                <h3 className="font-semibold">Alertes système</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600">⚠️</span>
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          Utilisation disque élevée
                        </p>
                        <p className="text-xs text-yellow-600">
                          68% d'utilisation détectée
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✅</span>
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Système à jour
                        </p>
                        <p className="text-xs text-green-600">
                          Dernière mise à jour: hier
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de section (placeholder) */}
        {activeSection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-lg font-semibold mb-4">
                {adminSections.find(s => s.id === activeSection)?.title}
              </h3>
              <p className="text-gray-600 mb-4">
                Interface de gestion détaillée à implémenter pour cette section...
              </p>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveSection(null)}
                >
                  Fermer
                </Button>
                <Button variant="primary">
                  Configurer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Administration;