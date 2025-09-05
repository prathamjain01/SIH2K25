import React, { useState } from 'react';
import { Book, Search, Plus, Calendar, User } from 'lucide-react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import { useAuth } from '../contexts/AuthContext';

interface BookRecord {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  issuedTo?: string;
  issueDate?: string;
  dueDate?: string;
  status: 'available' | 'issued' | 'overdue';
}

export default function Library() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [books] = useState<BookRecord[]>([
    {
      id: '1',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0262033848',
      category: 'Computer Science',
      totalCopies: 5,
      availableCopies: 3,
      status: 'available'
    },
    {
      id: '2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      category: 'Computer Science',
      totalCopies: 3,
      availableCopies: 0,
      issuedTo: 'Alex Johnson',
      issueDate: '2025-01-10',
      dueDate: '2025-01-24',
      status: 'issued'
    },
    {
      id: '3',
      title: 'Digital Signal Processing',
      author: 'Alan V. Oppenheim',
      isbn: '978-0131988422',
      category: 'Electronics',
      totalCopies: 4,
      availableCopies: 2,
      status: 'available'
    },
    {
      id: '4',
      title: 'Mechanics of Materials',
      author: 'Ferdinand Beer',
      isbn: '978-0073398235',
      category: 'Mechanical',
      totalCopies: 2,
      availableCopies: 0,
      issuedTo: 'Mike Wilson',
      issueDate: '2024-12-15',
      dueDate: '2024-12-29',
      status: 'overdue'
    }
  ]);

  const categories = ['all', 'Computer Science', 'Electronics', 'Mechanical', 'Civil'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'issued': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalBooks = books.length;
  const availableBooks = books.filter(b => b.availableCopies > 0).length;
  const issuedBooks = books.filter(b => b.status === 'issued' || b.status === 'overdue').length;
  const overdueBooks = books.filter(b => b.status === 'overdue').length;

  const isStudent = user?.role === 'student';
  const canManageBooks = user?.role === 'admin' || user?.role === 'staff';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Library Management</h1>
        {canManageBooks && (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Book
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Books</p>
              <p className="text-2xl font-bold text-gray-900">{totalBooks}</p>
            </div>
            <Book className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">{availableBooks}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Issued</p>
              <p className="text-2xl font-bold text-yellow-600">{issuedBooks}</p>
            </div>
            <User className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{overdueBooks}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-xs font-bold">{overdueBooks}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books, authors, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Books Table */}
      <Card title="Book Collection" subtitle="Manage library inventory">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Book Details</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Copies</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                {!isStudent && <th className="text-left py-3 px-4 font-medium text-gray-700">Issued To</th>}
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{book.title}</p>
                      <p className="text-sm text-gray-500">by {book.author}</p>
                      <p className="text-xs text-gray-400">ISBN: {book.isbn}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{book.category}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{book.availableCopies}/{book.totalCopies}</span>
                    <p className="text-xs text-gray-500">available</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(book.status)}`}>
                      {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                    </span>
                  </td>
                  {!isStudent && (
                    <td className="py-3 px-4">
                      {book.issuedTo ? (
                        <div>
                          <p className="text-sm font-medium">{book.issuedTo}</p>
                          <p className="text-xs text-gray-500">
                            Due: {book.dueDate && new Date(book.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  )}
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {book.availableCopies > 0 && isStudent && (
                        <Button size="sm">Issue</Button>
                      )}
                      {canManageBooks && book.status === 'issued' && (
                        <Button size="sm" variant="outline">Return</Button>
                      )}
                      {canManageBooks && book.availableCopies > 0 && (
                        <Button size="sm" variant="outline">Issue</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Activity */}
      {canManageBooks && (
        <Card title="Recent Activity" subtitle="Latest library transactions">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <div>
                  <p className="text-sm font-medium">Clean Code returned by Alex Johnson</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <div>
                  <p className="text-sm font-medium">Digital Signal Processing issued to Sarah Wilson</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                <div>
                  <p className="text-sm font-medium">Mechanics of Materials overdue reminder sent</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}