import React, { useState } from 'react';
import './TransactionList.css';

function TransactionList() {
  const [transactions] = useState([
    { id: 1, date: '2026-06-29', amount: 150.00, status: 'Completed', description: 'Product Purchase' },
    { id: 2, date: '2026-06-28', amount: 75.50, status: 'Completed', description: 'Subscription Fee' },
    { id: 3, date: '2026-06-27', amount: 220.00, status: 'Pending', description: 'Service Payment' }
  ]);

  return (
    <div className="transaction-list">
      <h2>Recent Transactions</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td><span className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;