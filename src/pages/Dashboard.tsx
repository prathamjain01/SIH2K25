import React from 'react';
import { Users, CreditCard, Building, BookOpen, TrendingUp, Calendar, GraduationCap } from 'lucide-react';
import DashboardCard from '../components/Dashboard/DashboardCard';
import Card from '../components/Common/Card';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  // Sample data for admin dashboard
  const branchData = [
    { branch: 'CSE', total: 450, paid: 380, pending: 70 },
    { branch: 'AIML', total: 320, paid: 290, pending: 30 },
    { branch: 'ECE', total: 280, paid: 240, pending: 40 },
    { branch: 'Civil', total: 350, paid: 310, pending: 40 },
    { branch: 'Mechanical', total: 400, paid: 350, pending: 50 },
    { branch: 'IT', total: 250, paid: 220, pending: 30 }
  ];

  const totalStudents = branchData.reduce((sum, branch) => sum + branch.total, 0);
  const totalPaid = branchData.reduce((sum, branch) => sum + branch.paid, 0);
  const totalPending = branchData.reduce((sum, branch) => sum + branch.pending, 0);

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Students', value: totalStudents.toLocaleString(), change: '+12%', changeType: 'increase' as const, icon: Users, color: 'blue' as const },
          { title: 'Fees Paid', value: totalPaid.toLocaleString(), change: `${Math.round((totalPaid/totalStudents)*100)}%`, changeType: 'increase' as const, icon: CreditCard, color: 'green' as const },
          { title: 'Fees Pending', value: totalPending.toLocaleString(), change: `${Math.round((totalPending/totalStudents)*100)}%`, changeType: 'neutral' as const, icon: CreditCard, color: 'red' as const },
          { title: 'Total Branches', value: branchData.length.toString(), change: 'Active', changeType: 'neutral' as const, icon: GraduationCap, color: 'purple' as const }
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
        {/* Admin Branch Statistics */}
        {user?.role === 'admin' && (
          <div className="lg:col-span-2">
            <Card title="Branch-wise Student Statistics" subtitle="Student distribution and fee status by branch">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Branch</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Total Students</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Fees Paid</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Fees Pending</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Payment Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchData.map((branch) => {
                      const paymentRate = Math.round((branch.paid / branch.total) * 100);
                      return (
                        <tr key={branch.branch} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{branch.branch}</td>
                          <td className="py-3 px-4 text-gray-700">{branch.total}</td>
                          <td className="py-3 px-4">
                            <span className="text-green-600 font-medium">{branch.paid}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-red-600 font-medium">{branch.pending}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="font-medium mr-2">{paymentRate}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${paymentRate >= 80 ? 'bg-green-500' : paymentRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  style={{ width: `${paymentRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Recent Activity */}
        <div className={user?.role === 'admin' ? 'lg:col-span-1' : 'lg:col-span-2'}>
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
        {user?.role !== 'admin' && (
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
        )}
      </div>
    </div>
  );
}