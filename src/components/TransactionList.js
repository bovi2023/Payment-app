import React, { useContext } from 'react';
import { PaymentContext } from '../context/PaymentContext';
import '../styles/TransactionList.css';

function TransactionList() {
  const { transactions, totalAmount, totalCount } = useContext(PaymentContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="no-transactions">
        <p>No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <div className="transaction-summary">
        <div className="summary-item">
          <span className="summary-label">Total Transactions</span>
          <span className="summary-value">{totalCount}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Amount</span>
          <span className="summary-value">{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      <div className="transactions-table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Recipient</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className={`transaction-row status-${transaction.status}`}>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>{transaction.recipientEmail}</td>
                <td className="amount">{formatCurrency(transaction.amount)}</td>
                <td>{transaction.paymentMethod}</td>
                <td>
                  <span className={`status-badge status-${transaction.status}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>{transaction.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;