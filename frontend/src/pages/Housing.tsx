import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { House, Room, RoomStatus } from '../types';

// Données de démonstration
const mockHouses: House[] = [
  {
    id: 'h1',
    number: 'A',
    totalRooms: 20,
    occupancyRate: 85,
    rooms: [
      {
        id: 'r1',
        number: '101',
        status: RoomStatus.OCCUPIED,
        house: {} as House,
        currentResident: {
          id: '1',
          email: 'alice.martin@example.com',
          firstName: 'Alice',
          lastName: 'Martin',
          status: 'active' as any,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        },
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: 'r2',
        number: '102',
        status: RoomStatus.AVAILABLE,
        house: {} as House,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: 'r3',
        number: '103',
        status: RoomStatus.MAINTENANCE,
        house: {} as House,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'h2',
    number: 'B',
    totalRooms: 18,
    occupancyRate: 94,
    rooms: [
      {
        id: 'r4',
        number: '201',
        status: RoomStatus.OCCUPIED,
        house: {} as House,
        currentResident: {
          id: '2',
          email: 'thomas.dubois@example.com',
          firstName: 'Thomas',
          lastName: 'Dubois',
          status: 'active' as any,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        },
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: 'r5',
        number: '202',
        status: RoomStatus.RESERVED,
        house: {} as House,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'h3',
    number: 'C',
    totalRooms: 22,
    occupancyRate: 77,
    rooms: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

const roomStatusConfig = {
  [RoomStatus.AVAILABLE]: { label: 'Disponible', color: 'green' as const, icon: '✅' },
  [RoomStatus.OCCUPIED]: { label: 'Occupée', color: 'blue' as const, icon: '👤' },
  [RoomStatus.MAINTENANCE]: { label: 'Maintenance', color: 'yellow' as const, icon: '🔧' },
  [RoomStatus.RESERVED]: { label: 'Réservée', color: 'orange' as const, icon: '📅' }
};

export const Housing: React.FC = () => {
  const [houses, setHouses] = useState<House[]>(mockHouses);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showHouseModal, setShowHouseModal] = useState(false);

  // Statistiques globales
  const globalStats = {
    totalHouses: houses.length,
    totalRooms: houses.reduce((sum, house) => sum + house.totalRooms, 0),
    occupiedRooms: houses.reduce((sum, house) => {
      return sum + Math.round((house.totalRooms * house.occupancyRate) / 100);
    }, 0),
    availableRooms: houses.reduce((sum, house) => {
      return sum + Math.round((house.totalRooms * (100 - house.occupancyRate)) / 100);
    }, 0),
    averageOccupancy: Math.round(
      houses.reduce((sum, house) => sum + house.occupancyRate, 0) / houses.length
    )
  };

  const handleRoomStatusChange = (houseId: string, roomId: string, newStatus: RoomStatus) => {
    setHouses(prev => prev.map(house => 
      house.id === houseId 
        ? {
            ...house,
            rooms: house.rooms.map(room => 
              room.id === roomId 
                ? { ...room, status: newStatus, updatedAt: new Date().toISOString() }
                : room
            )
          }
        : house
    ));
  };

  const RoomCard: React.FC<{ room: Room; houseId: string }> = ({ room, houseId }) => {
    const statusConfig = roomStatusConfig[room.status];
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{statusConfig.icon}</span>
              <h4 className="font-semibold">Chambre {room.number}</h4>
            </div>
            <Badge color={statusConfig.color} size="sm">
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2">
            {room.currentResident ? (
              <div>
                <p className="text-sm text-gray-600">Résident :</p>
                <p className="font-medium">
                  {room.currentResident.firstName} {room.currentResident.lastName}
                </p>
                <p className="text-sm text-gray-500">{room.currentResident.email}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucun résident assigné</p>
            )}
            
            <div className="flex flex-wrap gap-2 pt-3">
              {room.status === RoomStatus.MAINTENANCE && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleRoomStatusChange(houseId, room.id, RoomStatus.AVAILABLE)}
                >
                  Remettre en service
                </Button>
              )}
              
              {room.status === RoomStatus.AVAILABLE && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoomStatusChange(houseId, room.id, RoomStatus.RESERVED)}
                  >
                    Réserver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoomStatusChange(houseId, room.id, RoomStatus.MAINTENANCE)}
                  >
                    Maintenance
                  </Button>
                </>
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

  const HouseCard: React.FC<{ house: House }> = ({ house }) => {
    const occupiedCount = Math.round((house.totalRooms * house.occupancyRate) / 100);
    const availableCount = house.totalRooms - occupiedCount;
    
    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedHouse(house)}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Maison {house.number}</h3>
              <p className="text-gray-600">{house.totalRooms} chambres</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {house.occupancyRate}%
              </div>
              <div className="text-sm text-gray-600">Taux d'occupation</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-semibold text-green-600">{occupiedCount}</div>
              <div className="text-xs text-gray-600">Occupées</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-600">{availableCount}</div>
              <div className="text-xs text-gray-600">Disponibles</div>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${house.occupancyRate}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm">
              Gérer les chambres
            </Button>
            <span className="text-xs text-gray-500">
              Mis à jour le {new Date(house.updatedAt).toLocaleDateString('fr-FR')}
            </span>
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
              <h1 className="text-3xl font-bold text-gray-900">Logements</h1>
              <p className="text-gray-600">Gestion des maisons et chambres de la résidence</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => setShowRoomModal(true)}
              >
                + Nouvelle chambre
              </Button>
              <Button 
                variant="primary"
                onClick={() => setShowHouseModal(true)}
              >
                + Nouvelle maison
              </Button>
            </div>
          </div>

          {/* Statistiques globales */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{globalStats.totalHouses}</div>
                <div className="text-sm text-gray-600">Maisons</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{globalStats.totalRooms}</div>
                <div className="text-sm text-gray-600">Chambres totales</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{globalStats.occupiedRooms}</div>
                <div className="text-sm text-gray-600">Occupées</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{globalStats.availableRooms}</div>
                <div className="text-sm text-gray-600">Disponibles</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{globalStats.averageOccupancy}%</div>
                <div className="text-sm text-gray-600">Taux moyen</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vue maisons */}
        {!selectedHouse && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Vue d'ensemble des maisons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {houses.map((house) => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
          </div>
        )}

        {/* Vue détaillée d'une maison */}
        {selectedHouse && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedHouse(null)}
                  className="mb-2"
                >
                  ← Retour aux maisons
                </Button>
                <h2 className="text-2xl font-bold">Maison {selectedHouse.number}</h2>
                <p className="text-gray-600">
                  {selectedHouse.totalRooms} chambres • {selectedHouse.occupancyRate}% d'occupation
                </p>
              </div>
              <Button variant="primary">
                + Ajouter une chambre
              </Button>
            </div>

            {/* Statistiques de la maison */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(roomStatusConfig).map(([status, config]) => {
                const count = selectedHouse.rooms.filter(room => room.status === status).length;
                return (
                  <Card key={status}>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{config.icon}</span>
                        <div>
                          <div className="text-xl font-bold">{count}</div>
                          <div className="text-sm text-gray-600">{config.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Liste des chambres */}
            <h3 className="text-lg font-semibold mb-4">
              Chambres ({selectedHouse.rooms.length})
            </h3>
            
            {selectedHouse.rooms.length === 0 ? (
              <Card>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    Aucune chambre configurée pour cette maison
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedHouse.rooms.map((room) => (
                  <RoomCard key={room.id} room={room} houseId={selectedHouse.id} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modal nouvelle maison (placeholder) */}
        {showHouseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Ajouter une nouvelle maison</h3>
              <p className="text-gray-600 mb-4">
                Formulaire de création de maison à implémenter...
              </p>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowHouseModal(false)}
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

        {/* Modal nouvelle chambre (placeholder) */}
        {showRoomModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Ajouter une nouvelle chambre</h3>
              <p className="text-gray-600 mb-4">
                Formulaire de création de chambre à implémenter...
              </p>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowRoomModal(false)}
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

export default Housing;