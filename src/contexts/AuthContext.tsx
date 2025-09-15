import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'staff' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  branch?: string;
  year?: string;
  rollNumber?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@student.edu',
    role: 'student',
    department: 'Computer Science',
    branch: 'CSE',
    year: '3rd Year',
    rollNumber: 'CS2021001'
  },
  {
    id: '2',
    name: 'Dr. Sarah Wilson',
    email: 'sarah@staff.edu',
    role: 'staff',
    department: 'Computer Science',
    branch: 'CSE'
  },
  {
    id: '3',
    name: 'Michael Admin',
    email: 'admin@college.edu',
    role: 'admin',
    department: 'Administration'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = sampleUsers.find(u => u.email === email && u.role === role);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}