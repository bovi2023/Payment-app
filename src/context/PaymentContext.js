import React, { createContext, useReducer, useCallback } from 'react';

export const PaymentContext = createContext();

const initialState = {
  transactions: [],
  totalAmount: 0,
  totalCount: 0,
  loading: false,
  error: null,
  processing: false
};

function paymentReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        transactions: action.payload,
        totalAmount: action.payload.reduce((sum, t) => sum + t.amount, 0),
        totalCount: action.payload.length,
        loading: false
      };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'PROCESS_START':
      return { ...state, processing: true, error: null };
    case 'PROCESS_SUCCESS':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        totalCount: state.totalCount + 1,
        totalAmount: state.totalAmount + action.payload.amount,
        processing: false
      };
    case 'PROCESS_FAILURE':
      return { ...state, processing: false, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function PaymentProvider({ children }) {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  const fetchTransactions = useCallback(async (token) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch transactions');
      
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message });
    }
  }, []);

  const processPayment = useCallback(async (paymentData, token) => {
    dispatch({ type: 'PROCESS_START' });
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/payments/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
      });
      
      if (!response.ok) throw new Error('Payment processing failed');
      
      const data = await response.json();
      dispatch({ type: 'PROCESS_SUCCESS', payload: data });
      return data;
    } catch (error) {
      dispatch({ type: 'PROCESS_FAILURE', payload: error.message });
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    fetchTransactions,
    processPayment,
    clearError
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}
