import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import Dashboard from './pages/Dashboard';
import Residents from './pages/Residents';
import Tasks from './pages/Tasks';
import Services from './pages/Services';
import Housing from './pages/Housing';
import Administration from './pages/Administration';

// Configuration TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/services" element={<Services />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/admin" element={<Administration />} />
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  🏠 Home21 - Page en construction
                </h1>
                <p className="text-gray-600">Cette page sera bientôt disponible !</p>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
