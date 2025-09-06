import React from 'react';

import { useState, useRef, useEffect } from 'react';
import { mockCourses } from '../data/mockCourses';

const Cart = ({ cartItems, onRemove, onCheckout }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showRemoveAll, setShowRemoveAll] = useState(false);
  const [toast, setToast] = useState(null);
  const cartRef = useRef(null);

  // Responsive drawer for mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Focus trap for modal
  useEffect(() => {
    if (showCheckout && cartRef.current) {
      cartRef.current.focus();
    }
  }, [showCheckout]);

  const handleBuy = () => {
    setSuccess(true);
    onCheckout();
    setTimeout(() => {
      setShowCheckout(false);
      setSuccess(false);
    }, 2000);
    setToast({ type: 'success', message: 'Purchase Successful!' });
    setTimeout(() => setToast(null), 2500);
  };

  // Toast notification for add/remove
  const handleRemove = (id, title) => {
    onRemove(id);
    setToast({ type: 'info', message: `Removed ${title} from cart` });
    setTimeout(() => setToast(null), 2000);
  };

  // Get thumbnails for cart items
  const getThumbnail = (id) => {
    const course = mockCourses.find(c => c.id === id);
    return course ? course.thumbnail : '';
  };

  // Progress bar steps
  const step = success ? 3 : showCheckout ? 2 : 1;
  const steps = ['Cart', 'Checkout', 'Success'];

  return (
    <div
      className={`fixed ${isMobile ? 'inset-0 w-full h-full' : 'right-4 top-20 w-96'} bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 z-50 border border-gray-200 animate-slidein transition-all duration-300`}
      aria-label="Cart"
      role="dialog"
      tabIndex={-1}
    >
  {/* Progress Bar removed from checkout modal */}
  <h2 className="text-3xl font-extrabold mb-6 text-gray-900 drop-shadow-lg">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-gray-500 text-center py-12">
          {/* Animated SVG Cart Icon */}
          <span className="inline-block">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animate-cart">
              <circle cx="30" cy="30" r="28" fill="url(#cartGradient)" />
              <ellipse cx="30" cy="45" rx="15" ry="6" fill="#fff" opacity=".2" />
              <rect x="18" y="20" width="24" height="16" rx="4" fill="#fff" stroke="#6366f1" strokeWidth="2" />
              <circle cx="24" cy="40" r="3" fill="#6366f1" />
              <circle cx="36" cy="40" r="3" fill="#6366f1" />
              <defs>
                <radialGradient id="cartGradient" cx="0" cy="0" r="1" gradientTransform="translate(30 30) scale(30)">
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#6366f1" />
                </radialGradient>
              </defs>
            </svg>
          </span>
          <p className="mt-4 text-lg">Your cart is empty</p>
        </div>
      ) : (
  <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto mb-6 custom-scrollbar">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-4 animate-fadein group">
              <div className="flex items-center gap-4">
                <img src={getThumbnail(item.id)} alt={item.title} className="w-14 h-14 rounded-xl object-cover border shadow-md group-hover:scale-105 transition-transform duration-200" />
                <div>
                  <p className="font-semibold text-gray-900 text-base group-hover:text-indigo-600 transition-colors duration-200">{item.title}</p>
                  <span className="text-sm text-gray-400">{item.instructor}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-base px-2 py-1 rounded-lg ${item.price === 0 ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>{item.price === 0 ? 'FREE' : `₹${item.price}`}</span>
                <button
                  className="ripple text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 rounded-full transition-all duration-200 focus:outline-none relative overflow-hidden cursor-pointer"
                  onClick={(e) => { handleRemove(item.id, item.title); const btn = e.currentTarget; btn.classList.add('ripple-animate'); setTimeout(() => btn.classList.remove('ripple-animate'), 400); }}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  ✕
                  <span className="ripple-effect"></span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-xs text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded-full transition-all duration-200 shadow-md cursor-pointer"
            onClick={() => setShowRemoveAll(true)}
            aria-label="Remove all items"
          >
            Remove All
          </button>
          <span className="font-bold text-xl text-gray-900 drop-shadow-lg">
            Total: <span className="text-indigo-600">₹{cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
          </span>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="flex gap-2">
          <button
            className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 w-full cursor-pointer"
            disabled={cartItems.length === 0}
            onClick={() => setShowCheckout(true)}
            aria-label="Checkout"
          >
            Checkout
          </button>
        </div>
      )}

      {/* Remove All Confirmation Dialog */}
      {showRemoveAll && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fadein">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-80 relative border border-gray-200">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
              onClick={() => setShowRemoveAll(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Remove All Items?</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">Are you sure you want to remove all items from your cart?</p>
            <div className="flex gap-2">
              <button
                className="bg-gradient-to-br from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold w-full shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={() => { onCheckout(); setShowRemoveAll(false); }}
                aria-label="Confirm remove all"
              >
                Yes, Remove All
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl font-bold w-full shadow-lg cursor-pointer"
                onClick={() => setShowRemoveAll(false)}
                aria-label="Cancel remove all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fadein">
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 w-[480px] max-w-full min-h-[420px] relative border border-gray-200 flex flex-col justify-between"
            ref={cartRef}
            tabIndex={0}
            aria-modal="true"
            role="dialog"
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
              onClick={() => setShowCheckout(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white drop-shadow-lg">Checkout</h3>
            {success ? (
              <div className="text-center py-12 animate-bouncein relative">
                {/* Animated SVG Success Icon */}
                <span className="inline-block">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animate-success">
                    <circle cx="30" cy="30" r="28" fill="url(#successGradient)" />
                    <path d="M18 32l8 8 16-16" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <radialGradient id="successGradient" cx="0" cy="0" r="1" gradientTransform="translate(30 30) scale(30)">
                        <stop stopColor="#34d399" />
                        <stop offset="1" stopColor="#10b981" />
                      </radialGradient>
                    </defs>
                  </svg>
                </span>
                <p className="mt-4 text-xl text-green-600 font-bold">Purchase Successful!</p>
                {/* Enhanced Confetti animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg width="100%" height="100%">
                    <circle cx="30" cy="30" r="6" fill="#a78bfa" />
                    <circle cx="80" cy="40" r="5" fill="#f472b6" />
                    <circle cx="150" cy="20" r="7" fill="#34d399" />
                    <circle cx="200" cy="60" r="4" fill="#fbbf24" />
                    <circle cx="250" cy="30" r="6" fill="#60a5fa" />
                    <circle cx="120" cy="80" r="5" fill="#f59e42" />
                    <circle cx="60" cy="100" r="7" fill="#6366f1" />
                    <circle cx="220" cy="120" r="4" fill="#eab308" />
                  </svg>
                </div>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-gray-200 max-h-40 overflow-y-auto mb-6 custom-scrollbar">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-3 flex items-center gap-4 animate-fadein">
                      <img src={getThumbnail(item.id)} alt={item.title} className="w-12 h-12 rounded-xl object-cover border shadow-md" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-base">{item.title}</p>
                        <span className="text-sm text-gray-400">{item.instructor}</span>
                      </div>
                      <span className={`font-bold text-base px-2 py-1 rounded-lg ${item.price === 0 ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>{item.price === 0 ? 'FREE' : `₹${item.price}`}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-xl text-gray-900 drop-shadow-lg">Total:</span>
                  <span className="font-bold text-xl text-indigo-600 drop-shadow-lg">₹{cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    className="w-1/2 flex items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-teal-500 text-white py-3 px-4 rounded-xl font-bold text-base shadow-lg hover:scale-105 hover:from-teal-500 hover:to-green-500 transition-all duration-200 cursor-pointer"
                    style={{ letterSpacing: '0.02em' }}
                    onClick={handleBuy}
                    aria-label="Buy"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 17l5-5 5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Buy Now
                  </button>
                  <button
                    className="w-1/2 flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-xl font-bold text-base shadow-lg hover:scale-105 hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 cursor-pointer"
                    style={{ letterSpacing: '0.02em' }}
                    onClick={() => setShowCheckout(false)}
                    aria-label="Continue Shopping"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Continue
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Animations */}
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-lg font-semibold text-white ${toast.type === 'success' ? 'bg-gradient-to-br from-green-500 to-teal-500' : 'bg-gradient-to-br from-indigo-500 to-purple-500'} animate-fadein`}>
          {toast.message}
        </div>
      )}

      <style>{`
        /* Custom Scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #e5e7eb;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #e5e7eb;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1 40%, #a78bfa 100%);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #6366f1 60%, #7c3aed 100%);
        }
        .animate-slidein { animation: slidein .3s cubic-bezier(.4,0,.2,1); }
        @keyframes slidein { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-fadein { animation: fadein .3s cubic-bezier(.4,0,.2,1); }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        .animate-bouncein { animation: bouncein .5s cubic-bezier(.4,0,.2,1); }
        @keyframes bouncein { 0% { transform: scale(.8); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .animate-cart { animation: carticon .8s cubic-bezier(.4,0,.2,1) alternate infinite; }
        @keyframes carticon { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
        .animate-success { animation: successicon .8s cubic-bezier(.4,0,.2,1) alternate infinite; }
        @keyframes successicon { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
        .ripple { position: relative; overflow: hidden; }
        .ripple-effect { position: absolute; border-radius: 50%; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none; background: rgba(99,102,241,0.15); opacity: 0; transition: opacity .4s; }
        .ripple-animate .ripple-effect { opacity: 1; animation: ripple .4s linear; }
        @keyframes ripple { 0% { opacity: 1; transform: scale(0.7); } 100% { opacity: 0; transform: scale(1.5); } }
        /* Dark mode accent */
        html.dark .bg-white\/70, html.dark .bg-white\/80, html.dark .bg-white { background: rgba(30, 41, 59, 0.7) !important; color: #e0e7ff !important; }
        html.dark .text-gray-900 { color: #e0e7ff !important; }
        html.dark .border-gray-200 { border-color: #6366f1 !important; }
        html.dark .bg-indigo-100 { background: #6366f1 !important; color: #fff !important; }
        html.dark .bg-green-100 { background: #10b981 !important; color: #fff !important; }
      `}</style>
    </div>
  );
};

export default Cart;
