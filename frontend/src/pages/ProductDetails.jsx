// src/pages/ProductDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCartDispatch } from '../context/CartContext.jsx';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useCartDispatch();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);

  // Fetch product
  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error loading product:', err));
  }, [id]);

  // Set default size once product is loaded
  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) return <div className="p-8 text-center">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded-md mb-6"
      />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-xl text-gray-700 mt-2">₹{product.price}</p>
      <p className="text-gray-600 mt-4">{product.description}</p>

      {/* Size selector */}
      <div className="mt-4">
        <label>
          Size:
          <select
            value={selectedSize}
            onChange={e => setSelectedSize(e.target.value)}
            className="ml-2 border rounded p-1"
          >
            {product.sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Quantity selector */}
      <div className="mt-4">
        <label>
          Qty:
          <input
            type="number"
            min="1"
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
            className="ml-2 border rounded w-16 text-center"
          />
        </label>
      </div>

      {/* Add to Cart */}
      <button
        onClick={() =>{

          console.log('🛒 [ProductDetails] Add to Cart clicked:', { id: product._id, qty, selectedSize });
          
          dispatch({
            type: 'ADD_ITEM',
            payload: { product, quantity: qty, size: selectedSize }
          })
        }}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
