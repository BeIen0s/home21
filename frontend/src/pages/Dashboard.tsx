import React from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

// Données de démonstration
const dashboardStats = {
  residents: {
    total: 156,
    active: 142,
    pending: 8,
    departing: 6
  },
  occupancy: {
    rate: 89,
    available: 18,
    maintenance: 5,
    total: 163
  },
  tasks: {
    pending: 12,
    inProgress: 8,
    completed: 24,
    overdue: 3
  },
  services: {
    requests: 7,
    completed: 156,
    revenue: 4780
  }
};

const recentActivities = [
  {
    id: '1',
    type: 'resident',
    title: 'Nouveau résident',
    description: 'Alice Martin a rejoint la résidence',
    time: '2 heures',
    icon: '👤',
    color: 'blue'
  },
  {
    id: '2',
    type: 'task',
    title: 'Tâche terminée',
    description: 'Nettoyage cuisine commune - Bâtiment A',
    time: '4 heures',
    icon: '✅',
    color: 'green'
  },
  {
    id: '3',
    type: 'service',
    title: 'Commande livrée',
    description: 'Courses pour Thomas Dubois',
    time: '6 heures',
    icon: '🛒',
    color: 'orange'
  },
  {
    id: '4',
    type: 'maintenance',
    title: 'Maintenance programmée',
    description: 'Chambre 205 - Réparation robinet',
    time: '1 jour',
    icon: '🔧',
    color: 'yellow'
  }
];

const quickActions = [
  { id: 'new-resident', title: 'Nouveau résident', icon: '👥', route: '/residents', color: 'blue' },
  { id: 'create-task', title: 'Créer une tâche', icon: '✅', route: '/tasks', color: 'green' },
  { id: 'service-request', title: 'Demande de service', icon: '🛎️', route: '/services', color: 'orange' },
  { id: 'housing-manage', title: 'Gérer logements', icon: '🏠', route: '/housing', color: 'purple' }
];

const announcements = [
  {
    id: '1',
    title: 'Maintenance programmée',
    content: 'Interruption d\'eau prévue demain de 9h à 12h dans le bâtiment A.',
    priority: 'high',
    date: '2024-09-21'
  },
  {
    id: '2', 
    title: 'Nouvelle salle de sport',
    content: 'Ouverture de la nouvelle salle de sport au rez-de-chaussée du bâtiment B.',
    priority: 'medium',
    date: '2024-09-20'
  },
  {
    id: '3',
    title: 'Horaires de la laverie',
    content: 'Nouveaux horaires : 7h-22h en semaine, 8h-20h le weekend.',
    priority: 'low',
    date: '2024-09-19'
  }
];

const priorityColors: Record<string, string> = {
  high: 'red',
  medium: 'yellow',
  low: 'green'
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble de votre résidence étudiante
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/residents')}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Résidents</p>
                  <p className="text-2xl font-bold text-blue-600">{dashboardStats.residents.total}</p>
                  <p className="text-xs text-gray-500">{dashboardStats.residents.active} actifs</p>
                </div>
                <div className="text-3xl text-blue-600">👥</div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/housing')}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupation</p>
                  <p className="text-2xl font-bold text-green-600">{dashboardStats.occupancy.rate}%</p>
                  <p className="text-xs text-gray-500">{dashboardStats.occupancy.available} disponibles</p>
                </div>
                <div className="text-3xl text-green-600">🏠</div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/tasks')}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tâches actives</p>
                  <p className="text-2xl font-bold text-yellow-600">{dashboardStats.tasks.pending + dashboardStats.tasks.inProgress}</p>
                  <p className="text-xs text-gray-500">{dashboardStats.tasks.overdue} en retard</p>
                </div>
                <div className="text-3xl text-yellow-600">✅</div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/services')}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Services</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardStats.services.requests}</p>
                  <p className="text-xs text-gray-500">{dashboardStats.services.revenue}€ ce mois</p>
                </div>
                <div className="text-3xl text-orange-600">🛎️</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actions rapides */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Actions rapides</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate(action.route)}
                    >
                      <span className="mr-3 text-lg">{action.icon}</span>
                      {action.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Annonces */}
            <Card className="mt-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">Annonces</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                          <p className="text-xs text-gray-400 mt-2">{formatDate(announcement.date)}</p>
                        </div>
                        <Badge color={priorityColors[announcement.priority] as any} size="sm">
                          {announcement.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activité récente */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Activité récente</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-white
                        ${activity.color === 'blue' ? 'bg-blue-500' : 
                          activity.color === 'green' ? 'bg-green-500' : 
                          activity.color === 'orange' ? 'bg-orange-500' : 
                          activity.color === 'yellow' ? 'bg-yellow-500' : 'bg-gray-500'}
                      `}>
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        Il y a {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Graphiques placeholder */}
            <Card className="mt-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">Statistiques mensuelles</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{dashboardStats.residents.active}</div>
                    <div className="text-sm text-gray-600">Résidents actifs</div>
                    <div className="text-xs text-gray-400">+12% ce mois</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{dashboardStats.tasks.completed}</div>
                    <div className="text-sm text-gray-600">Tâches terminées</div>
                    <div className="text-xs text-gray-400">+5% ce mois</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{dashboardStats.services.revenue}€</div>
                    <div className="text-sm text-gray-600">Chiffre d'affaires</div>
                    <div className="text-xs text-gray-400">+18% ce mois</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;