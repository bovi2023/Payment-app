import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PaymentContext } from '../context/PaymentContext';
import { NotificationContext } from '../context/NotificationContext';
import '../styles/PaymentForm.css';

function PaymentForm() {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    recipientEmail: '',
    paymentMethod: 'card'
  });

  const { token } = useContext(AuthContext);
  const { processPayment, processing, error, clearError } = useContext(PaymentContext);
  const { success, error: showError } = useContext(NotificationContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!formData.amount || !formData.recipientEmail) {
      showError('Please fill in all required fields', 5000);
      return;
    }

    try {
      await processPayment({
        ...formData,
        amount: parseFloat(formData.amount)
      }, token);
      
      setFormData({
        amount: '',
        description: '',
        recipientEmail: '',
        paymentMethod: 'card'
      });
      success('Payment processed successfully!', 5000);
    } catch (err) {
      showError('Payment processing failed. Please try again.', 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label htmlFor="amount">Amount *</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          step="0.01"
          min="0"
          required
          disabled={processing}
        />
      </div>

      <div className="form-group">
        <label htmlFor="recipientEmail">Recipient Email *</label>
        <input
          type="email"
          id="recipientEmail"
          name="recipientEmail"
          value={formData.recipientEmail}
          onChange={handleChange}
          placeholder="recipient@example.com"
          required
          disabled={processing}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Payment description (optional)"
          disabled={processing}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          disabled={processing}
        >
          <option value="card">Credit/Debit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="wallet">Digital Wallet</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" disabled={processing} className="submit-button">
        {processing ? 'Processing...' : 'Process Payment'}
      </button>
    </form>
  );
}

export default PaymentForm;