import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { PaymentProvider } from './context/PaymentContext';
import { NotificationProvider } from './context/NotificationContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Notifications from './components/Notifications';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import './App.css';

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="app">
      <Notifications />
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;