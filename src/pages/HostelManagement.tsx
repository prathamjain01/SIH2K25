import React, { useState } from 'react';
import { Building, Users, Bed, Wifi, Car } from 'lucide-react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import { useAuth } from '../contexts/AuthContext';

interface Room {
  id: string;
  number: string;
  block: string;
  floor: number;
  capacity: number;
  occupied: number;
  type: 'single' | 'double' | 'triple';
  amenities: string[];
  status: 'available' | 'occupied' | 'maintenance';
  students?: string[];
}

export default function HostelManagement() {
  const { user } = useAuth();
  const [selectedBlock, setSelectedBlock] = useState('A');

  const [rooms] = useState<Room[]>([
    {
      id: '1',
      number: 'A101',
      block: 'A',
      floor: 1,
      capacity: 2,
      occupied: 1,
      type: 'double',
      amenities: ['WiFi', 'AC', 'Attached Bathroom'],
      status: 'available',
      students: ['Alex Johnson']
    },
    {
      id: '2',
      number: 'A102',
      block: 'A',
      floor: 1,
      capacity: 2,
      occupied: 2,
      type: 'double',
      amenities: ['WiFi', 'Fan', 'Attached Bathroom'],
      status: 'occupied',
      students: ['John Doe', 'Mike Wilson']
    },
    {
      id: '3',
      number: 'A103',
      block: 'A',
      floor: 1,
      capacity: 1,
      occupied: 0,
      type: 'single',
      amenities: ['WiFi', 'AC', 'Attached Bathroom', 'Study Table'],
      status: 'available'
    },
    {
      id: '4',
      number: 'B201',
      block: 'B',
      floor: 2,
      capacity: 3,
      occupied: 2,
      type: 'triple',
      amenities: ['WiFi', 'Fan', 'Common Bathroom'],
      status: 'available',
      students: ['Sarah Wilson', 'Emma Davis']
    }
  ]);

  const blocks = ['A', 'B', 'C', 'D'];
  const filteredRooms = rooms.filter(room => room.block === selectedBlock);

  const getStatusColor = (status: string, occupied: number, capacity: number) => {
    if (status === 'maintenance') return 'bg-red-100 border-red-300';
    if (occupied === 0) return 'bg-green-100 border-green-300';
    if (occupied === capacity) return 'bg-gray-100 border-gray-300';
    return 'bg-yellow-100 border-yellow-300';
  };

  const getStatusText = (status: string, occupied: number, capacity: number) => {
    if (status === 'maintenance') return 'Maintenance';
    if (occupied === 0) return 'Available';
    if (occupied === capacity) return 'Full';
    return 'Partial';
  };

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.occupied > 0).length;
  const availableRooms = rooms.filter(r => r.occupied < r.capacity && r.status === 'available').length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  const isStudent = user?.role === 'student';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hostel Management</h1>
        {!isStudent && (
          <Button>
            <Users className="w-4 h-4 mr-2" />
            Allocate Room
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
            </div>
            <Building className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-gray-900">{occupiedRooms}</p>
            </div>
            <Bed className="w-8 h-8 text-red-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">{availableRooms}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Occupancy</p>
              <p className="text-2xl font-bold text-blue-600">{occupancyRate}%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">{occupancyRate}%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Block Selection */}
      <Card title="Room Status" subtitle="Real-time room availability">
        <div className="flex space-x-2 mb-6">
          {blocks.map(block => (
            <button
              key={block}
              onClick={() => setSelectedBlock(block)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedBlock === block
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Block {block}
            </button>
          ))}
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map(room => (
            <div
              key={room.id}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getStatusColor(room.status, room.occupied, room.capacity)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Room {room.number}</h3>
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-white bg-opacity-70">
                  {getStatusText(room.status, room.occupied, room.capacity)}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Floor:</span>
                  <span className="font-medium">{room.floor}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{room.occupied}/{room.capacity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{room.type}</span>
                </div>
              </div>

              {room.amenities && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.map(amenity => (
                      <span key={amenity} className="text-xs px-2 py-1 bg-white bg-opacity-70 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {room.students && room.students.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">Residents:</p>
                  {room.students.map(student => (
                    <p key={student} className="text-xs text-gray-700">{student}</p>
                  ))}
                </div>
              )}

              {!isStudent && room.occupied < room.capacity && room.status === 'available' && (
                <Button size="sm" className="w-full mt-3">
                  Allocate Room
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Facilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Common Facilities" subtitle="Available amenities">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Wifi className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">WiFi</p>
                <p className="text-sm text-gray-500">24/7 High Speed</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Car className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Parking</p>
                <p className="text-sm text-gray-500">Covered Area</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Common Room</p>
                <p className="text-sm text-gray-500">TV & Games</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Bed className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">Laundry</p>
                <p className="text-sm text-gray-500">Washing & Drying</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Recent Activity" subtitle="Latest room updates">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium">Room A103 allocated to John Smith</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium">Maintenance completed for B205</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium">New student checked in A107</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}