import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Resident, ResidentStatus } from '../types';

// Données de démonstration
const mockResidents: Resident[] = [
  {
    id: '1',
    email: 'alice.martin@example.com',
    firstName: 'Alice',
    lastName: 'Martin',
    phone: '+33 6 12 34 56 78',
    status: ResidentStatus.ACTIVE,
    arrivalDate: '2024-09-01',
    room: {
      id: '101',
      number: '101',
      status: 'occupied' as any,
      house: {
        id: 'h1',
        number: 'A',
        totalRooms: 20,
        rooms: [],
        occupancyRate: 85,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    emergencyContact: {
      name: 'Marie Martin',
      relationship: 'mother',
      phone: '+33 6 87 65 43 21',
      email: 'marie.martin@example.com'
    },
    createdAt: '2024-09-01',
    updatedAt: '2024-09-01'
  },
  {
    id: '2',
    email: 'thomas.dubois@example.com',
    firstName: 'Thomas',
    lastName: 'Dubois',
    phone: '+33 6 98 76 54 32',
    status: ResidentStatus.PENDING,
    arrivalDate: '2024-09-15',
    createdAt: '2024-08-15',
    updatedAt: '2024-08-15'
  },
  {
    id: '3',
    email: 'sophia.garcia@example.com',
    firstName: 'Sophia',
    lastName: 'Garcia',
    phone: '+33 6 45 67 89 01',
    status: ResidentStatus.DEPARTURE_PENDING,
    arrivalDate: '2024-01-15',
    departureDate: '2024-09-30',
    room: {
      id: '205',
      number: '205',
      status: 'occupied' as any,
      house: {
        id: 'h2',
        number: 'B',
        totalRooms: 18,
        rooms: [],
        occupancyRate: 90,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-09-10'
  }
];

const statusConfig = {
  [ResidentStatus.ACTIVE]: { label: 'Actif', color: 'green' as const },
  [ResidentStatus.PENDING]: { label: 'En attente', color: 'yellow' as const },
  [ResidentStatus.DEPARTURE_PENDING]: { label: 'Départ prévu', color: 'orange' as const },
  [ResidentStatus.DEPARTED]: { label: 'Parti', color: 'gray' as const }
};

export const Residents: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>(mockResidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ResidentStatus | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filtrage des résidents
  const filteredResidents = residents.filter(resident => {
    const matchesSearch = 
      resident.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resident.room?.number.includes(searchTerm));
    
    const matchesStatus = statusFilter === 'all' || resident.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Statistiques
  const stats = {
    total: residents.length,
    active: residents.filter(r => r.status === ResidentStatus.ACTIVE).length,
    pending: residents.filter(r => r.status === ResidentStatus.PENDING).length,
    departing: residents.filter(r => r.status === ResidentStatus.DEPARTURE_PENDING).length
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Résidents</h1>
              <p className="text-gray-600">Gestion des résidents de la résidence</p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => setShowAddModal(true)}
            >
              + Nouveau résident
            </Button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total résidents</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <div className="text-sm text-gray-600">Actifs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">En attente</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.departing}</div>
                <div className="text-sm text-gray-600">Départs prévus</div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <Input
                type="text"
                placeholder="Rechercher par nom, email ou chambre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="btn btn-outline"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ResidentStatus | 'all')}
            >
              <option value="all">Tous les statuts</option>
              <option value={ResidentStatus.ACTIVE}>Actifs</option>
              <option value={ResidentStatus.PENDING}>En attente</option>
              <option value={ResidentStatus.DEPARTURE_PENDING}>Départ prévu</option>
              <option value={ResidentStatus.DEPARTED}>Partis</option>
            </select>
          </div>
        </div>

        {/* Liste des résidents */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">
              Liste des résidents ({filteredResidents.length})
            </h2>
          </CardHeader>
          <CardContent>
            {filteredResidents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun résident trouvé
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResidents.map((resident) => (
                  <div 
                    key={resident.id} 
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {resident.firstName[0]}{resident.lastName[0]}
                        </span>
                      </div>
                      
                      {/* Infos principales */}
                      <div>
                        <div className="font-semibold text-gray-900">
                          {resident.firstName} {resident.lastName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {resident.email}
                        </div>
                        <div className="text-sm text-gray-600">
                          {resident.phone}
                        </div>
                      </div>
                    </div>

                    {/* Chambre et dates */}
                    <div className="text-center">
                      <div className="font-medium">
                        {resident.room ? `Chambre ${resident.room.number}` : 'Non assigné'}
                      </div>
                      <div className="text-sm text-gray-600">
                        Arrivée: {formatDate(resident.arrivalDate)}
                      </div>
                      {resident.departureDate && (
                        <div className="text-sm text-gray-600">
                          Départ: {formatDate(resident.departureDate)}
                        </div>
                      )}
                    </div>

                    {/* Statut et actions */}
                    <div className="flex items-center space-x-3">
                      <Badge color={statusConfig[resident.status].color}>
                        {statusConfig[resident.status].label}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal d'ajout (placeholder) */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Ajouter un résident</h3>
              <p className="text-gray-600 mb-4">
                Formulaire d'ajout à implémenter...
              </p>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddModal(false)}
                >
                  Annuler
                </Button>
                <Button variant="primary">
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Residents;