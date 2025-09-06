import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage for logged-in user
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user?.id]);

  // Save cart to localStorage when cart changes (only for logged-in user)
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated, user?.id]);

  const addToCart = (course) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === course.id)) return prev;
      return [...prev, course];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // Clear cart from localStorage on logout
  useEffect(() => {
    if (!isAuthenticated && user?.id) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  }, [isAuthenticated, user?.id]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
