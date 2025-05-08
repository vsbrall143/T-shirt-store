// src/pages/OrderConfirmation.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h1>
      <p className="text-gray-700 text-lg mb-6">
        Thank you for your purchase. Your payment was successful, and your order is now being processed.
      </p>
      <p className="text-gray-600 mb-8">
        You will receive a confirmation email shortly with your order details.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
