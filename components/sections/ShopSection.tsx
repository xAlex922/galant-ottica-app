'use client';

import { useState, useEffect } from 'react';
import { Glasses, Sun, Eye, Droplets, ShoppingCart, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

const categories = [
  { id: 'montature_vista', label: 'Montature Vista', icon: Glasses },
  { id: 'montature_sole', label: 'Occhiali da Sole', icon: Sun },
  { id: 'lenti_contatto', label: 'Lenti a Contatto', icon: Eye },
  { id: 'liquidi', label: 'Liquidi', icon: Droplets },
];

export default function ShopSection({ addToCart }: { addToCart: (product: any, quantity: number) => void }) {
  const [selectedCategory, setSelectedCategory] = useState('montature_vista');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products?category=${selectedCategory}`);
      const data = await response.json();

      // normalizzazione difensiva
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data?.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, quantity);
    setQuantity(1);
    alert(`${product.name} aggiunto al carrello!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Vetrina Prodotti</h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedProduct(null);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">{product.brand}</p>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-primary">€{product.price.toFixed(2)}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">{selectedProduct.brand}</p>
                  <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative h-64 bg-gray-100 rounded-lg mb-4">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <p className="text-3xl font-bold text-primary mb-4">€{selectedProduct.price.toFixed(2)}</p>

              <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

              <div className="flex items-center space-x-4 mb-6">
                <span className="font-medium">Quantità:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 bg-gray-100 rounded font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Aggiungi al Carrello (€{(selectedProduct.price * quantity).toFixed(2)})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
