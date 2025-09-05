import React from 'react';
import { Users, CreditCard, Building, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import DashboardCard from '../components/Dashboard/DashboardCard';
import Card from '../components/Common/Card';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Students', value: '2,847', change: '+12%', changeType: 'increase' as const, icon: Users, color: 'blue' as const },
          { title: 'Fees Collected', value: '₹24.5L', change: '+8%', changeType: 'increase' as const, icon: CreditCard, color: 'green' as const },
          { title: 'Hostel Occupancy', value: '89%', change: '+5%', changeType: 'increase' as const, icon: Building, color: 'yellow' as const },
          { title: 'Library Records', value: '18,569', change: '+124', changeType: 'increase' as const, icon: BookOpen, color: 'purple' as const }
        ];
      case 'staff':
        return [
          { title: 'My Classes', value: '8', change: 'Today', changeType: 'neutral' as const, icon: Users, color: 'blue' as const },
          { title: 'Assignments', value: '24', change: 'Pending', changeType: 'neutral' as const, icon: BookOpen, color: 'purple' as const },
          { title: 'Students', value: '156', change: 'Active', changeType: 'neutral' as const, icon: Users, color: 'green' as const },
          { title: 'Office Hours', value: '4h', change: 'Today', changeType: 'neutral' as const, icon: Calendar, color: 'yellow' as const }
        ];
      case 'student':
        return [
          { title: 'Attendance', value: '92%', change: '+2%', changeType: 'increase' as const, icon: TrendingUp, color: 'green' as const },
          { title: 'Pending Fees', value: '₹15,000', change: 'Due Soon', changeType: 'neutral' as const, icon: CreditCard, color: 'yellow' as const },
          { title: 'Books Issued', value: '3', change: '2 Due', changeType: 'neutral' as const, icon: BookOpen, color: 'purple' as const },
          { title: 'Assignments', value: '5', change: 'Pending', changeType: 'neutral' as const, icon: Users, color: 'blue' as const }
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  const recentActivities = [
    { activity: 'Fee payment received', time: '2 hours ago', type: 'payment' },
    { activity: 'New student admission', time: '4 hours ago', type: 'admission' },
    { activity: 'Library book returned', time: '1 day ago', type: 'library' },
    { activity: 'Hostel room allocated', time: '2 days ago', type: 'hostel' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card title="Recent Activity" subtitle="Latest updates from the system">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      activity.type === 'payment' ? 'bg-green-500' :
                      activity.type === 'admission' ? 'bg-blue-500' :
                      activity.type === 'library' ? 'bg-purple-500' : 'bg-yellow-500'
                    }`} />
                    <p className="text-sm text-gray-900">{activity.activity}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Stats Chart */}
        <Card title="Monthly Overview" subtitle="Performance metrics">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Admissions</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fee Collection</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Hostel Occupancy</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <span className="text-sm font-medium">89%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}