import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', name: 'Tableau de bord', href: '/dashboard', icon: '📊' },
  { id: 'residents', name: 'Résidents', href: '/residents', icon: '👥' },
  { id: 'tasks', name: 'Tâches', href: '/tasks', icon: '✅', badge: 3 },
  { id: 'services', name: 'Services', href: '/services', icon: '🛎️' },
  { id: 'housing', name: 'Logements', href: '/housing', icon: '🏠' },
  { id: 'admin', name: 'Administration', href: '/admin', icon: '⚙️' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Récupération des informations utilisateur
  const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    navigate('/login');
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <div className="flex items-center">
              <span className="text-2xl text-white">🏠</span>
              <span className="ml-2 text-xl font-bold text-white">Home21</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.href);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors
                  ${isActiveRoute(item.href)
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {userInfo.firstName?.[0] || 'A'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p className="text-xs text-gray-500">{userInfo.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full"
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar mobile */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-lg">🏠</span>
              <span className="ml-1 font-bold text-gray-900">Home21</span>
            </div>
            <div className="w-6"></div> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;