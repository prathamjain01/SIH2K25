import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  CreditCard, 
  Building, 
  BookOpen, 
  User, 
  Settings,
  GraduationCap,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();

  const getNavItems = () => {
    const baseItems = [
      { to: '/dashboard', icon: Home, label: 'Dashboard' },
      { to: '/profile', icon: User, label: 'Profile' },
      { to: '/settings', icon: Settings, label: 'Settings' }
    ];

    const roleSpecificItems = {
      admin: [
        { to: '/admissions', icon: Users, label: 'Admissions' },
        { to: '/fees', icon: CreditCard, label: 'Fee Management' },
        { to: '/library', icon: BookOpen, label: 'Library Records' },
        { to: '/examinations', icon: FileText, label: 'Examinations' }
      ],
      staff: [
        { to: '/admissions', icon: Users, label: 'Admissions' },
        { to: '/hostel', icon: Building, label: 'Hostel Management' },
        { to: '/library', icon: BookOpen, label: 'Library Records' },
        { to: '/examinations', icon: FileText, label: 'Examinations' }
      ],
      student: [
        { to: '/fees', icon: CreditCard, label: 'My Fees' },
        { to: '/hostel', icon: Building, label: 'Hostel Info' },
        { to: '/library', icon: BookOpen, label: 'Library' },
        { to: '/examinations', icon: FileText, label: 'Examinations' }
      ]
    };

    return [
      ...baseItems.slice(0, 1),
      ...(roleSpecificItems[user?.role || 'student'] || []),
      ...baseItems.slice(1)
    ];
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-dark-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-0
      `}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-dark-700">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">ERP Portal</span>
          </div>
        </div>
        
        <nav className="mt-6 px-4">
          {getNavItems().map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg mb-1 transition-colors duration-200
                ${isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-r-2 border-blue-600' 
                  : 'hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-blue-600'
                }
              `}
              onClick={() => onClose()}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}