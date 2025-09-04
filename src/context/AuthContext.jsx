import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fraudDetectionUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo credentials
        if (email === 'admin@samaishield.com' && password === 'admin123') {
          const userData = {
            id: '1',
            email: 'admin@samaishield.com',
            name: 'John Admin',
            role: 'Administrator',
            avatar: 'JA',
            loginTime: new Date().toISOString()
          };
          setUser(userData);
          localStorage.setItem('fraudDetectionUser', JSON.stringify(userData));
          resolve(userData);
        } else if (email === 'analyst@samaishield.com' && password === 'analyst123') {
          const userData = {
            id: '2',
            email: 'analyst@samaishield.com',
            name: 'Sarah Analyst',
            role: 'Fraud Analyst',
            avatar: 'SA',
            loginTime: new Date().toISOString()
          };
          setUser(userData);
          localStorage.setItem('fraudDetectionUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fraudDetectionUser');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;