import React, { useState } from 'react';
import { CreditCard, Download, Receipt, AlertCircle } from 'lucide-react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import { useAuth } from '../contexts/AuthContext';

interface FeeRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  course: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export default function FeeManagement() {
  const { user } = useAuth();
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);

  const [feeRecords] = useState<FeeRecord[]>([
    {
      id: '1',
      studentName: 'Alex Johnson',
      rollNumber: 'CS2021001',
      course: 'Computer Science',
      feeType: 'Semester Fee',
      amount: 45000,
      dueDate: '2025-02-01',
      status: 'pending'
    },
    {
      id: '2',
      studentName: 'Sarah Wilson',
      rollNumber: 'EC2021015',
      course: 'Electronics',
      feeType: 'Lab Fee',
      amount: 5000,
      dueDate: '2025-01-25',
      status: 'paid',
      paidDate: '2025-01-15'
    },
    {
      id: '3',
      studentName: 'Mike Brown',
      rollNumber: 'ME2021025',
      course: 'Mechanical',
      feeType: 'Library Fee',
      amount: 2000,
      dueDate: '2025-01-10',
      status: 'overdue'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalAmount = feeRecords.reduce((sum, record) => sum + record.amount, 0);
  const paidAmount = feeRecords.filter(r => r.status === 'paid').reduce((sum, record) => sum + record.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  const isStudent = user?.role === 'student';
  const displayRecords = isStudent ? feeRecords.filter(r => r.rollNumber === user?.rollNumber) : feeRecords;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Fees</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collected</p>
              <p className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Receipt className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-red-600">₹{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Fee Records */}
      <Card title="Fee Records" subtitle={isStudent ? "Your fee details" : "All student fees"}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {!isStudent && <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>}
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fee Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  {!isStudent && (
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{record.studentName}</p>
                        <p className="text-sm text-gray-500">{record.rollNumber}</p>
                        <p className="text-sm text-gray-500">{record.course}</p>
                      </div>
                    </td>
                  )}
                  <td className="py-3 px-4 text-gray-700">{record.feeType}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">₹{record.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(record.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {record.status === 'pending' && (
                        <Button size="sm" onClick={() => setSelectedFee(record)}>
                          Pay Now
                        </Button>
                      )}
                      {record.status === 'paid' && (
                        <Button size="sm" variant="outline">
                          <Receipt className="w-3 h-3 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Modal */}
      {selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee Type:</span>
                  <span className="font-medium">{selectedFee.feeType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₹{selectedFee.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-medium">{new Date(selectedFee.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Credit/Debit Card</option>
                    <option>Net Banking</option>
                    <option>UPI</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setSelectedFee(null)}>Cancel</Button>
              <Button onClick={() => setSelectedFee(null)}>Process Payment</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}