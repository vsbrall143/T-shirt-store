// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest T-Shirts</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <div key={product._id} className="bg-white border rounded-xl shadow-md p-4 hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="h-52 w-full object-cover rounded-md mb-3" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2">₹{product.price}</p>
 
            <Link to={`/product/${product._id}`}>
              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                View Product
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
