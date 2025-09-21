import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const token = localStorage.getItem('auth_token');
    const userInfo = localStorage.getItem('user_info');

    if (token && userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        // Si les données sont corrompues, on déconnecte l'utilisateur
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
      }
    }

    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_info', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout
  };
};