import React, { useState } from 'react';
import './PaymentForm.css';

function PaymentForm() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted:', formData);
    setFormData({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });
  };

  return (
    <div className="payment-form">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardHolder">Card Holder Name</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            placeholder="John Doe"
            value={formData.cardHolder}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">Process Payment</button>
      </form>
    </div>
  );
}

export default PaymentForm;