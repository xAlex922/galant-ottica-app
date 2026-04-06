'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import {
  Store,
  User,
  Package,
  Zap,
  Calendar,
  ShoppingCart,
  MessageCircle,
  LogOut,
} from 'lucide-react';

// Import section components
import ShopSection from './sections/ShopSection';
import ProfileSection from './sections/ProfileSection';
import OrdersSection from './sections/OrdersSection';
import QuickOrderSection from './sections/QuickOrderSection';
import AppointmentsSection from './sections/AppointmentsSection';
import CartSection from './sections/CartSection';
import ChatSection from './sections/ChatSection';

type Section = 'shop' | 'profile' | 'orders' | 'quick-order' | 'appointments';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('shop');
  const [showCart, setShowCart] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const navigation = [
    { id: 'shop', label: 'Vetrina', icon: Store },
    { id: 'quick-order', label: 'Ordine Rapido', icon: Zap },
    { id: 'appointments', label: 'Prenotazioni', icon: Calendar },
    { id: 'orders', label: 'Ordini', icon: Package },
    { id: 'profile', label: 'Profilo', icon: User },
  ];

  const addToCart = (product: any, quantity: number = 1) => {
    setCartItems([...cartItems, { ...product, quantity }]);
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    const newCart = [...cartItems];
    newCart[index].quantity = quantity;
    setCartItems(newCart);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'shop':
        return <ShopSection addToCart={addToCart} />;
      case 'profile':
        return <ProfileSection />;
      case 'orders':
        return <OrdersSection onNavigate={(section) => setActiveSection(section as Section)} />;
      case 'quick-order':
        return <QuickOrderSection addToCart={addToCart} />;
      case 'appointments':
        return <AppointmentsSection />;
      default:
        return <ShopSection addToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {user?.nome} {user?.cognome}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Cart Button */}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Chat Button */}
              <button
                onClick={() => setShowChat(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-gray-700" />
              </button>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as Section)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-h-[600px]">
            {renderSection()}
          </main>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <CartSection
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          removeFromCart={removeFromCart}
          updateQuantity={updateCartQuantity}
        />
      )}

      {/* Chat Modal */}
      {showChat && (
        <ChatSection onClose={() => setShowChat(false)} />
      )}
    </div>
  );
}