import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and user data
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - replace with actual API call
      const mockUsers = [
        {
          userId: 1,
          name: 'Super Admin',
          email: 'super@admin.com',
          phone: '9876543210',
          role: 'super_admin' as const,
          isVerified: true
        },
        {
          userId: 2,
          name: 'Society Admin',
          email: 'admin@society.com',
          phone: '9876543211',
          role: 'admin' as const,
          societyId: 1,
          isVerified: true
        },
        {
          userId: 3,
          name: 'John Resident',
          email: 'resident@test.com',
          phone: '9876543212',
          role: 'resident' as const,
          societyId: 1,
          flatId: 1,
          isVerified: true
        },
        {
          userId: 4,
          name: 'Security Staff',
          email: 'security@society.com',
          phone: '9876543213',
          role: 'security_staff' as const,
          societyId: 1,
          isVerified: true
        }
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password123') {
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Mock registration - replace with actual API call
      console.log('Registering user:', userData);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};