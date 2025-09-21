import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ServiceRequest, ServiceStatus, ServiceType } from '../types';

// Données de démonstration
const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    type: ServiceType.GROCERY,
    status: ServiceStatus.PENDING,
    details: {
      items: ['Lait', 'Pain', 'Fruits', 'Légumes'],
      notes: 'Préférer les produits bio si possible',
      deliveryDate: '2024-09-22'
    },
    requesterId: '1',
    requesterName: 'Alice Martin',
    totalAmount: 45.50,
    createdAt: '2024-09-21',
    updatedAt: '2024-09-21'
  },
  {
    id: '2',
    type: ServiceType.TRANSPORT,
    status: ServiceStatus.CONFIRMED,
    details: {
      pickupLocation: 'Résidence Home21',
      destinationLocation: 'Gare SNCF',
      deliveryDate: '2024-09-22',
      notes: 'Départ à 14h30'
    },
    requesterId: '2',
    requesterName: 'Thomas Dubois',
    totalAmount: 15.00,
    createdAt: '2024-09-20',
    updatedAt: '2024-09-21'
  },
  {
    id: '3',
    type: ServiceType.MEAL,
    status: ServiceStatus.IN_PROGRESS,
    details: {
      items: ['Menu végétarien', 'Dessert'],
      quantity: 2,
      deliveryDate: '2024-09-21',
      notes: 'Allergique aux noix'
    },
    requesterId: '3',
    requesterName: 'Sophia Garcia',
    totalAmount: 28.00,
    createdAt: '2024-09-21',
    updatedAt: '2024-09-21'
  },
  {
    id: '4',
    type: ServiceType.RENTAL,
    status: ServiceStatus.COMPLETED,
    details: {
      items: ['Vélo électrique'],
      quantity: 1,
      deliveryDate: '2024-09-20',
      notes: 'Location pour 3 jours'
    },
    requesterId: '1',
    requesterName: 'Alice Martin',
    totalAmount: 60.00,
    createdAt: '2024-09-18',
    updatedAt: '2024-09-20'
  }
];

const serviceConfig = {
  [ServiceType.GROCERY]: {
    name: 'Courses',
    icon: '🛒',
    description: 'Livraison de produits alimentaires et articles du quotidien',
    color: 'green'
  },
  [ServiceType.MEAL]: {
    name: 'Repas',
    icon: '🍽️',
    description: 'Commande de repas préparés et livrés',
    color: 'orange'
  },
  [ServiceType.TRANSPORT]: {
    name: 'Transport',
    icon: '🚗',
    description: 'Service de transport et navette',
    color: 'blue'
  },
  [ServiceType.RENTAL]: {
    name: 'Location',
    icon: '🚲',
    description: 'Location d\'équipements et matériel',
    color: 'purple'
  }
};

const statusConfig = {
  [ServiceStatus.PENDING]: { label: 'En attente', color: 'gray' as const },
  [ServiceStatus.CONFIRMED]: { label: 'Confirmée', color: 'blue' as const },
  [ServiceStatus.IN_PROGRESS]: { label: 'En cours', color: 'yellow' as const },
  [ServiceStatus.COMPLETED]: { label: 'Terminée', color: 'green' as const },
  [ServiceStatus.CANCELLED]: { label: 'Annulée', color: 'red' as const }
};

export const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceRequest[]>(mockServiceRequests);
  const [activeTab, setActiveTab] = useState<ServiceType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | 'all'>('all');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  // Filtrage des services
  const filteredServices = services.filter(service => {
    const matchesType = activeTab === 'all' || service.type === activeTab;
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    return matchesType && matchesStatus;
  });

  // Statistiques
  const stats = {
    total: services.length,
    pending: services.filter(s => s.status === ServiceStatus.PENDING).length,
    active: services.filter(s => s.status === ServiceStatus.IN_PROGRESS).length,
    completed: services.filter(s => s.status === ServiceStatus.COMPLETED).length,
    totalRevenue: services
      .filter(s => s.status === ServiceStatus.COMPLETED)
      .reduce((sum, s) => sum + (s.totalAmount || 0), 0)
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleStatusChange = (serviceId: string, newStatus: ServiceStatus) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, status: newStatus, updatedAt: new Date().toISOString() }
        : service
    ));
  };

  const ServiceCard: React.FC<{ service: ServiceRequest }> = ({ service }) => {
    const config = serviceConfig[service.type];
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{config.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{config.name}</h3>
                <p className="text-sm text-gray-600">{service.requesterName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge color={statusConfig[service.status].color}>
                {statusConfig[service.status].label}
              </Badge>
              {service.totalAmount && (
                <span className="text-sm font-semibold text-gray-900">
                  {service.totalAmount.toFixed(2)}€
                </span>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {/* Items ou détails */}
            {service.details.items && service.details.items.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-700">Articles :</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {service.details.items.slice(0, 3).map((item, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                  {service.details.items.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{service.details.items.length - 3} autres
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Quantité */}
            {service.details.quantity && (
              <div className="text-sm">
                <span className="text-gray-600">Quantité :</span>
                <span className="ml-2 font-medium">{service.details.quantity}</span>
              </div>
            )}

            {/* Locations */}
            {service.details.pickupLocation && (
              <div className="text-sm">
                <span className="text-gray-600">Départ :</span>
                <span className="ml-2">{service.details.pickupLocation}</span>
              </div>
            )}
            {service.details.destinationLocation && (
              <div className="text-sm">
                <span className="text-gray-600">Destination :</span>
                <span className="ml-2">{service.details.destinationLocation}</span>
              </div>
            )}

            {/* Date de livraison */}
            {service.details.deliveryDate && (
              <div className="text-sm">
                <span className="text-gray-600">Date :</span>
                <span className="ml-2 font-medium">
                  {formatDate(service.details.deliveryDate)}
                </span>
              </div>
            )}

            {/* Notes */}
            {service.details.notes && (
              <div className="text-sm">
                <span className="text-gray-600">Notes :</span>
                <p className="text-gray-900 mt-1">{service.details.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-3 border-t">
              {service.status === ServiceStatus.PENDING && (
                <>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleStatusChange(service.id, ServiceStatus.CONFIRMED)}
                  >
                    Confirmer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(service.id, ServiceStatus.CANCELLED)}
                  >
                    Annuler
                  </Button>
                </>
              )}
              
              {service.status === ServiceStatus.CONFIRMED && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleStatusChange(service.id, ServiceStatus.IN_PROGRESS)}
                >
                  Commencer
                </Button>
              )}
              
              {service.status === ServiceStatus.IN_PROGRESS && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleStatusChange(service.id, ServiceStatus.COMPLETED)}
                >
                  Terminer
                </Button>
              )}

              <Button variant="outline" size="sm">
                Détails
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Services</h1>
              <p className="text-gray-600">Gestion des services intégrés de la résidence</p>
            </div>
            <Button 
              variant="primary"
              onClick={() => setShowRequestModal(true)}
            >
              + Nouvelle demande
            </Button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total demandes</div>
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
                <div className="text-2xl font-bold text-yellow-600">{stats.active}</div>
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
                <div className="text-2xl font-bold text-blue-600">{stats.totalRevenue.toFixed(0)}€</div>
                <div className="text-sm text-gray-600">Chiffre d'affaires</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs pour les types de services */}
          <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg w-fit">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-white text-gray-900 shadow' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('all')}
            >
              Tous
            </button>
            {Object.entries(serviceConfig).map(([type, config]) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === type 
                    ? 'bg-white text-gray-900 shadow' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(type as ServiceType)}
              >
                <span>{config.icon}</span>
                <span>{config.name}</span>
              </button>
            ))}
          </div>

          {/* Filtre par statut */}
          <div className="mb-6">
            <select 
              className="btn btn-outline"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ServiceStatus | 'all')}
            >
              <option value="all">Tous les statuts</option>
              <option value={ServiceStatus.PENDING}>En attente</option>
              <option value={ServiceStatus.CONFIRMED}>Confirmées</option>
              <option value={ServiceStatus.IN_PROGRESS}>En cours</option>
              <option value={ServiceStatus.COMPLETED}>Terminées</option>
              <option value={ServiceStatus.CANCELLED}>Annulées</option>
            </select>
          </div>
        </div>

        {/* Services disponibles (si aucun filtre) */}
        {activeTab === 'all' && statusFilter === 'all' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Services disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(serviceConfig).map(([type, config]) => (
                <Card key={type} className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => { setSelectedService(type as ServiceType); setShowRequestModal(true); }}>
                  <CardContent className="text-center">
                    <div className="text-4xl mb-3">{config.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{config.name}</h3>
                    <p className="text-sm text-gray-600">{config.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Liste des demandes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Demandes de service ({filteredServices.length})
          </h2>
          
          {filteredServices.length === 0 ? (
            <Card>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Aucune demande trouvée avec les filtres sélectionnés
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>

        {/* Modal de demande (placeholder) */}
        {showRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-lg font-semibold mb-4">
                Nouvelle demande de service
                {selectedService && ` - ${serviceConfig[selectedService].name}`}
              </h3>
              <p className="text-gray-600 mb-4">
                Formulaire de demande à implémenter...
              </p>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowRequestModal(false);
                    setSelectedService(null);
                  }}
                >
                  Annuler
                </Button>
                <Button variant="primary">
                  Créer la demande
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;