import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Task, TaskStatus, TaskType } from '../types';

// Données de démonstration
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Nettoyage cuisine commune',
    description: 'Nettoyer la cuisine, faire la vaisselle et sortir les poubelles',
    type: TaskType.CLEANING,
    status: TaskStatus.ASSIGNED,
    priority: 'high',
    assigneeId: '1',
    assigneeName: 'Alice Martin',
    dueDate: '2024-09-22',
    roomNumber: 'Cuisine A',
    createdAt: '2024-09-20',
    updatedAt: '2024-09-20'
  },
  {
    id: '2',
    title: 'Maintenance ascenseur',
    description: 'Vérification mensuelle de l\'ascenseur principal',
    type: TaskType.MAINTENANCE,
    status: TaskStatus.IN_PROGRESS,
    priority: 'medium',
    assigneeId: '2',
    assigneeName: 'Thomas Dubois',
    dueDate: '2024-09-25',
    roomNumber: 'Hall principal',
    createdAt: '2024-09-18',
    updatedAt: '2024-09-21'
  },
  {
    id: '3',
    title: 'Inspection salle de bain étage 2',
    description: 'Contrôle de l\'état des équipements et signalement des réparations nécessaires',
    type: TaskType.INSPECTION,
    status: TaskStatus.COMPLETED,
    priority: 'low',
    assigneeId: '3',
    assigneeName: 'Sophia Garcia',
    dueDate: '2024-09-20',
    completedAt: '2024-09-20',
    roomNumber: 'Salle de bain 2A',
    createdAt: '2024-09-15',
    updatedAt: '2024-09-20'
  },
  {
    id: '4',
    title: 'Nettoyage salle commune',
    description: 'Aspirer, nettoyer les surfaces et réorganiser l\'espace',
    type: TaskType.CLEANING,
    status: TaskStatus.PENDING,
    priority: 'medium',
    dueDate: '2024-09-23',
    roomNumber: 'Salle commune B',
    createdAt: '2024-09-21',
    updatedAt: '2024-09-21'
  },
  {
    id: '5',
    title: 'Réparation robinet chambre 105',
    description: 'Robinet qui fuit dans la chambre 105, réparation urgente',
    type: TaskType.REPAIR,
    status: TaskStatus.OVERDUE,
    priority: 'high',
    assigneeId: '1',
    assigneeName: 'Alice Martin',
    dueDate: '2024-09-19',
    roomNumber: '105',
    createdAt: '2024-09-17',
    updatedAt: '2024-09-19'
  }
];

const statusConfig = {
  [TaskStatus.PENDING]: { label: 'En attente', color: 'gray' as const },
  [TaskStatus.ASSIGNED]: { label: 'Assignée', color: 'blue' as const },
  [TaskStatus.IN_PROGRESS]: { label: 'En cours', color: 'yellow' as const },
  [TaskStatus.COMPLETED]: { label: 'Terminée', color: 'green' as const },
  [TaskStatus.OVERDUE]: { label: 'En retard', color: 'red' as const }
};

const typeConfig = {
  [TaskType.CLEANING]: { label: 'Nettoyage', icon: '🧹' },
  [TaskType.MAINTENANCE]: { label: 'Maintenance', icon: '🔧' },
  [TaskType.INSPECTION]: { label: 'Inspection', icon: '🔍' },
  [TaskType.REPAIR]: { label: 'Réparation', icon: '🛠️' }
};

const priorityConfig = {
  high: { label: 'Haute', color: 'text-red-600', bgColor: 'bg-red-100' },
  medium: { label: 'Moyenne', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  low: { label: 'Basse', color: 'text-green-600', bgColor: 'bg-green-100' }
};

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<TaskType | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filtrage des tâches
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesType = typeFilter === 'all' || task.type === typeFilter;
    return matchesStatus && matchesType;
  });

  // Statistiques
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === TaskStatus.PENDING).length,
    inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
    completed: tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
    overdue: tasks.filter(t => t.status === TaskStatus.OVERDUE).length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && statusFilter !== TaskStatus.COMPLETED;
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus,
            completedAt: newStatus === TaskStatus.COMPLETED ? new Date().toISOString() : undefined,
            updatedAt: new Date().toISOString()
          }
        : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tâches</h1>
              <p className="text-gray-600">Gestion et attribution des tâches de la résidence</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                🎯 Attribution auto
              </Button>
              <Button 
                variant="primary"
                onClick={() => setShowCreateModal(true)}
              >
                + Nouvelle tâche
              </Button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total tâches</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">En attente</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                <div className="text-sm text-gray-600">En cours</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-600">Terminées</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
                <div className="text-sm text-gray-600">En retard</div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select 
              className="btn btn-outline"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
            >
              <option value="all">Tous les statuts</option>
              <option value={TaskStatus.PENDING}>En attente</option>
              <option value={TaskStatus.ASSIGNED}>Assignées</option>
              <option value={TaskStatus.IN_PROGRESS}>En cours</option>
              <option value={TaskStatus.COMPLETED}>Terminées</option>
              <option value={TaskStatus.OVERDUE}>En retard</option>
            </select>

            <select 
              className="btn btn-outline"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TaskType | 'all')}
            >
              <option value="all">Tous les types</option>
              <option value={TaskType.CLEANING}>Nettoyage</option>
              <option value={TaskType.MAINTENANCE}>Maintenance</option>
              <option value={TaskType.INSPECTION}>Inspection</option>
              <option value={TaskType.REPAIR}>Réparation</option>
            </select>
          </div>
        </div>

        {/* Liste des tâches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    Aucune tâche trouvée avec les filtres sélectionnés
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className={isOverdue(task.dueDate) ? 'border-red-200' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{typeConfig[task.type].icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.roomNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[task.priority].bgColor} ${priorityConfig[task.priority].color}`}>
                        {priorityConfig[task.priority].label}
                      </div>
                      <Badge color={statusConfig[task.status].color}>
                        {statusConfig[task.status].label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type :</span>
                      <span>{typeConfig[task.type].label}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Échéance :</span>
                      <span className={isOverdue(task.dueDate) ? 'text-red-600 font-medium' : ''}>
                        {formatDate(task.dueDate)}
                        {isOverdue(task.dueDate) && ' ⚠️'}
                      </span>
                    </div>
                    
                    {task.assigneeName && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Assigné à :</span>
                        <span>{task.assigneeName}</span>
                      </div>
                    )}
                    
                    {task.completedAt && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Terminé le :</span>
                        <span className="text-green-600">{formatDate(task.completedAt)}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {task.status === TaskStatus.PENDING && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(task.id, TaskStatus.ASSIGNED)}
                      >
                        Assigner
                      </Button>
                    )}
                    
                    {task.status === TaskStatus.ASSIGNED && (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleStatusChange(task.id, TaskStatus.IN_PROGRESS)}
                      >
                        Commencer
                      </Button>
                    )}
                    
                    {task.status === TaskStatus.IN_PROGRESS && (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleStatusChange(task.id, TaskStatus.COMPLETED)}
                      >
                        Terminer
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Modal de création (placeholder) */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-lg font-semibold mb-4">Créer une nouvelle tâche</h3>
              <p className="text-gray-600 mb-4">
                Formulaire de création de tâche à implémenter...
              </p>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Annuler
                </Button>
                <Button variant="primary">
                  Créer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;