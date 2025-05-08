import React from 'react';
import { useCart , useCartDispatch} from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const getToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo?.token;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Prepare order items for backend
    const orderItems = items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      size: item.size,
    }));

    let razorpayOrder;
    try {
      const { data } = await axios.post(
        '/api/orders/place-order',
        { items: orderItems, total },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      razorpayOrder = data;
    } catch (err) {
      console.error('Failed to create Razorpay order:', err);
      return;
    }

    const options = {
      key: razorpayOrder.razorpayKey,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'My T-Shirt Store',
      description: 'Order Payment',
      order_id: razorpayOrder.razorpayOrderId,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post(
            '/api/orders/verify',
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: razorpayOrder.order._id, // Pass the MongoDB order ID
            },
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );

          if (verifyRes.data.success) {
            dispatch({ type: 'CLEAR_CART' });
            navigate('/order-confirmation');
          } else {
            alert('❌ Payment verification failed.');
          }
        } catch (err) {
          console.error('Order placement failed:', err);
        }
      },
      prefill: {
        name: 'Vikas',
        email: 'example@example.com',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">🧾 Checkout</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border rounded-lg p-4 shadow-sm"
              >
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-gray-500">Size: {item.size}</p>
                  <p className="text-gray-600">
                    Price: ₹{item.product.price}
                  </p>
                </div>
                <p className="text-lg font-bold text-green-600">
                  ₹{item.product.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-right">
            <h3 className="text-2xl font-semibold text-gray-800">
              Total: ₹{total}
            </h3>
            <button
              onClick={handleCheckout}
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow transition"
            >
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
