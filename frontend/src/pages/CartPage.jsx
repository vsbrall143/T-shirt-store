// src/pages/CartPage.jsx
import React from "react";
import { useCart, useCartDispatch } from "../context/CartContext.jsx";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const { items } = useCart();
  console.log('🛍️ Cart items from context:', items);
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600 text-lg">
          Your cart is empty.{" "}
          <Link className="text-blue-600 underline hover:text-blue-800" to="/">
            Go shopping
          </Link>
          .
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center bg-white shadow-sm rounded-lg p-4 border"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
                />
                <div className="flex-1 w-full">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-500">Size: {item.size}</p>
                  <p className="text-gray-600">Price: ₹{item.product.price}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0 gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: { index: idx, quantity: Number(e.target.value) },
                      })
                    }
                    className="w-20 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => dispatch({ type: "REMOVE_ITEM", payload: idx })}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <p className="text-2xl font-bold text-gray-800">
              Total: <span className="text-green-600">₹{total}</span>
            </p>
            <button
              onClick={() => navigate("/checkout")}
              disabled={items.length === 0}
              className={`mt-6 inline-block px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                items.length
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
