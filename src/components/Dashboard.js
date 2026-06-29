import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-card">
          <p className="stat-label">Total Transactions</p>
          <p className="stat-value">{transactionCount}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Amount</p>
          <p className="stat-value">${totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;