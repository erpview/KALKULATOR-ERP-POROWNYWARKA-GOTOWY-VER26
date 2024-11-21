import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { Calculator } from './pages/Calculator';
import { Implementation } from './pages/Implementation';
import { Cost } from './pages/Cost';
import { Systems } from './pages/Systems';
import { Compare } from './pages/Compare';
import { AdminSystems } from './pages/AdminSystems';
import { AdminUsers } from './pages/AdminUsers';
import { Login } from './pages/Login';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { UsersProvider } from './context/UsersContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MetaTags } from './components/MetaTags';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <UsersProvider>
          <ComparisonProvider>
            <MetaTags />
            <Toaster position="top-center" />
            <Navigation />
            <Routes>
              <Route path="/" element={<Calculator />} />
              <Route path="/wdrozenie-erp" element={<Implementation />} />
              <Route path="/koszt-wdrozenia-erp" element={<Cost />} />
              <Route path="/systemy-erp" element={<Systems />} />
              <Route path="/porownaj-systemy-erp" element={<Compare />} />
              <Route path="/admin/login" element={<Login />} />
              <Route 
                path="/admin/systemy" 
                element={
                  <ProtectedRoute requireAdmin allowEditor>
                    <AdminSystems />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminUsers />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
          </ComparisonProvider>
        </UsersProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;