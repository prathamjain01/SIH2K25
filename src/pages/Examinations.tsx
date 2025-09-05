import React, { useState } from 'react';
import { FileText, Calendar, Clock, Users, Plus } from 'lucide-react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import { useAuth } from '../contexts/AuthContext';

interface Exam {
  id: string;
  subject: string;
  course: string;
  examType: 'midterm' | 'final' | 'quiz' | 'practical';
  date: string;
  time: string;
  duration: string;
  venue: string;
  totalMarks: number;
  status: 'scheduled' | 'ongoing' | 'completed';
  studentsEnrolled: number;
}

interface Result {
  id: string;
  studentName: string;
  rollNumber: string;
  subject: string;
  examType: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  examDate: string;
}

export default function Examinations() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'exams' | 'results'>('exams');

  const [exams] = useState<Exam[]>([
    {
      id: '1',
      subject: 'Data Structures',
      course: 'Computer Science',
      examType: 'midterm',
      date: '2025-02-15',
      time: '10:00 AM',
      duration: '3 hours',
      venue: 'Hall A',
      totalMarks: 100,
      status: 'scheduled',
      studentsEnrolled: 45
    },
    {
      id: '2',
      subject: 'Digital Electronics',
      course: 'Electronics',
      examType: 'final',
      date: '2025-02-20',
      time: '2:00 PM',
      duration: '3 hours',
      venue: 'Hall B',
      totalMarks: 100,
      status: 'scheduled',
      studentsEnrolled: 38
    },
    {
      id: '3',
      subject: 'Algorithms',
      course: 'Computer Science',
      examType: 'quiz',
      date: '2025-01-20',
      time: '11:00 AM',
      duration: '1 hour',
      venue: 'Room 301',
      totalMarks: 50,
      status: 'completed',
      studentsEnrolled: 42
    }
  ]);

  const [results] = useState<Result[]>([
    {
      id: '1',
      studentName: 'Alex Johnson',
      rollNumber: 'CS2021001',
      subject: 'Algorithms',
      examType: 'quiz',
      marksObtained: 42,
      totalMarks: 50,
      percentage: 84,
      grade: 'A',
      examDate: '2025-01-20'
    },
    {
      id: '2',
      studentName: 'Sarah Wilson',
      rollNumber: 'EC2021015',
      subject: 'Circuit Analysis',
      examType: 'midterm',
      marksObtained: 78,
      totalMarks: 100,
      percentage: 78,
      grade: 'B+',
      examDate: '2025-01-18'
    },
    {
      id: '3',
      studentName: 'Mike Brown',
      rollNumber: 'ME2021025',
      subject: 'Thermodynamics',
      examType: 'final',
      marksObtained: 91,
      totalMarks: 100,
      percentage: 91,
      grade: 'A+',
      examDate: '2025-01-15'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'final': return 'bg-red-100 text-red-800';
      case 'midterm': return 'bg-orange-100 text-orange-800';
      case 'quiz': return 'bg-blue-100 text-blue-800';
      case 'practical': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const isStudent = user?.role === 'student';
  const canManageExams = user?.role === 'admin' || user?.role === 'staff';

  const studentResults = isStudent ? results.filter(r => r.rollNumber === user?.rollNumber) : results;
  const upcomingExams = exams.filter(e => e.status === 'scheduled').slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Examination Management</h1>
        {canManageExams && (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Exam
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900">{exams.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">
                {exams.filter(e => e.status === 'scheduled').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {exams.filter(e => e.status === 'completed').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
              <p className="text-2xl font-bold text-purple-600">89%</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('exams')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'exams'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Exam Schedule
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'results'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Results
        </button>
      </div>

      {activeTab === 'exams' && (
        <>
          {/* Upcoming Exams */}
          {isStudent && (
            <Card title="Upcoming Exams" subtitle="Your scheduled examinations">
              <div className="space-y-3">
                {upcomingExams.map(exam => (
                  <div key={exam.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{exam.subject}</h3>
                        <p className="text-sm text-gray-500">{exam.course}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getExamTypeColor(exam.examType)}`}>
                        {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(exam.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {exam.time}
                      </div>
                      <div>Duration: {exam.duration}</div>
                      <div>Venue: {exam.venue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* All Exams */}
          <Card title="All Examinations" subtitle="Complete exam schedule">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Venue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    {canManageExams && <th className="text-left py-3 px-4 font-medium text-gray-700">Enrolled</th>}
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map(exam => (
                    <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{exam.subject}</p>
                          <p className="text-sm text-gray-500">{exam.course}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getExamTypeColor(exam.examType)}`}>
                          {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium">{new Date(exam.date).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">{exam.time} ({exam.duration})</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{exam.venue}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(exam.status)}`}>
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </span>
                      </td>
                      {canManageExams && (
                        <td className="py-3 px-4 text-gray-700">{exam.studentsEnrolled}</td>
                      )}
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          {canManageExams && exam.status === 'completed' && (
                            <Button size="sm">Results</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {activeTab === 'results' && (
        <Card title="Examination Results" subtitle={isStudent ? "Your exam results" : "All student results"}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {!isStudent && <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>}
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Marks</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Percentage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {studentResults.map(result => (
                  <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                    {!isStudent && (
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{result.studentName}</p>
                          <p className="text-sm text-gray-500">{result.rollNumber}</p>
                        </div>
                      </td>
                    )}
                    <td className="py-3 px-4 font-medium text-gray-900">{result.subject}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getExamTypeColor(result.examType)}`}>
                        {result.examType.charAt(0).toUpperCase() + result.examType.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{result.marksObtained}/{result.totalMarks}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="font-medium">{result.percentage}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2 ml-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${result.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(result.examDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}