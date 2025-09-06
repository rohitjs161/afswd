import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import Cart from './Cart';
import { useCart } from '../contexts/CartContext';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [showCart, setShowCart] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/quiz"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Quiz
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4 relative">
            <ThemeToggle />
            {/* Cart Icon and Modal only for logged in users */}
            {isAuthenticated && (
              <>
                <button
                  className="relative px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                  onClick={() => setShowCart((prev) => !prev)}
                  aria-label="Open cart"
                >
                  <span className="text-2xl">🛒</span>
                  {cartItems.length > 0 && (
                    <span className="absolute top-1 right-1 bg-indigo-600 text-white text-xs rounded-full px-1">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {showCart && (
                  <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowCart(false)}></div>
                )}
                {showCart && (
                  <div className="fixed right-0 top-0 z-50">
                    <Cart
                      cartItems={cartItems}
                      onRemove={removeFromCart}
                      onCheckout={clearCart}
                    />
                  </div>
                )}
              </>
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome, {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="relative overflow-hidden bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition-all duration-200 cursor-pointer group"
                  style={{ position: 'relative' }}
                >
                  <span className="relative z-10">Logout</span>
                  <span className="absolute left-0 top-0 w-full h-full bg-blue-700 transition-transform duration-300 ease-in-out group-hover:translate-x-full" style={{zIndex:1, pointerEvents:'none'}}></span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition-all duration-200 cursor-pointer group"
                  style={{ position: 'relative' }}
                >
                  <span className="relative z-10">Login</span>
                  <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-transform duration-300 ease-in-out group-hover:translate-x-full" style={{zIndex:1, pointerEvents:'none'}}></span>
                </Link>
                <Link
                  to="/signup"
                  className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition-all duration-200 cursor-pointer group"
                  style={{ position: 'relative' }}
                >
                  <span className="relative z-10">Sign Up</span>
                  <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-transform duration-300 ease-in-out group-hover:translate-x-full" style={{zIndex:1, pointerEvents:'none'}}></span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
