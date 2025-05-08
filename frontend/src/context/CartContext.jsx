import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const STORAGE_KEY = 'cartItems';

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) =>
          i.product._id === action.payload.product._id &&
          i.size === action.payload.size
      );

      let items;
      if (existing) {
        items = state.items.map((i) =>
          i.product._id === action.payload.product._id &&
          i.size === action.payload.size
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      } else {
        items = [...state.items, action.payload];
      }

      return { ...state, items };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((_, idx) => idx !== action.payload);
      return { ...state, items: newItems };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((i, idx) =>
        idx === action.payload.index
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
      return { ...state, items: newItems };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// ✅ Lazy initializer to load cart from localStorage
function initializer() {
  const storedCart = localStorage.getItem(STORAGE_KEY);
  if (storedCart) {
    try {
      const parsed = JSON.parse(storedCart);
      if (Array.isArray(parsed)) {
        return { items: parsed };
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
    }
  }
  return initialState;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, initializer);

  // Save cart to localStorage on state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
}
