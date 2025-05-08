import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { items } = useCart(); // ✅ Hook used inside a function component

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/">Home</Link>
      <Link to="/cart" className="relative">
        Cart
        {items.length > 0 && (
          <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {items.length}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Header;
