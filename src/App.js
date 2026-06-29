import React from 'react';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import PaymentForm from './components/PaymentForm';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <div className="container">
          <Dashboard />
          <PaymentForm />
        </div>
        <TransactionList />
      </main>
    </div>
  );
}

export default App;
