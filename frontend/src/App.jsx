// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Header from './components/Header';
import Checkout from './components/Checkout.jsx';
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
import OrderConfirmation from './pages/OrderConfirmation';
function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
