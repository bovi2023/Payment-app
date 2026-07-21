import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PaymentContext } from '../context/PaymentContext';
import PaymentForm from '../components/PaymentForm';
import TransactionList from '../components/TransactionList';
import '../styles/Dashboard.css';

function Dashboard() {
  const { user, token, logout } = useContext(AuthContext);
  const { fetchTransactions, loading } = useContext(PaymentContext);

  useEffect(() => {
    if (token) {
      fetchTransactions(token);
    }
  }, [token, fetchTransactions]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Payment Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.name || user?.email}</span>
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="payment-section">
          <h2>Process Payment</h2>
          <PaymentForm />
        </div>

        <div className="transactions-section">
          <h2>Recent Transactions</h2>
          {loading ? (
            <div className="loading">Loading transactions...</div>
          ) : (
            <TransactionList />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;