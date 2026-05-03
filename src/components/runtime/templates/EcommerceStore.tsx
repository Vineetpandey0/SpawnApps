"use client";

import React, { useState } from 'react';
import { ShoppingCart, Search, Star, Heart, Menu, Plus, Minus, X, Check, Trash2, ArrowRight } from 'lucide-react';

export default function EcommerceStore({ data }: { data: any }) {
  const [cart, setCart] = useState<{product: any, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  if (!data) return <div className="p-8">Loading store...</div>;

  const { storeName = "ModernShop", categories = [], products = [] } = data;
  const allCategories = ["All", ...categories];

  const filteredProducts = products.filter((p: any) => 
    activeCategory === "All" || p.category?.toLowerCase() === activeCategory.toLowerCase()
  );

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeCartItem = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans pb-24 relative overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-white border-b border-neutral-200 px-4 sm:px-8 py-5 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 rounded-full"><Menu className="w-5 h-5" /></button>
          <span className="font-black text-2xl tracking-tighter uppercase">{storeName}</span>
        </div>
        
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 group-focus-within:text-neutral-900 transition-colors" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-11 pr-4 py-2.5 bg-neutral-100 rounded-full border-transparent focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button className="hidden sm:block text-neutral-600 hover:text-black font-medium text-sm transition-colors">Account</button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-neutral-600 hover:text-black transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-neutral-900 text-white px-4 py-16 sm:px-8 sm:py-24 mb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-500 via-neutral-900 to-black"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 border border-neutral-700 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 text-neutral-300">New Arrivals</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">Summer Collection</h1>
          <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto">Discover the latest trends with our new premium collection. Designed for comfort and style.</p>
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-neutral-200 transition-colors">Shop Now</button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-8 scrollbar-hide border-b border-neutral-200">
          {allCategories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-black text-white' : 'bg-transparent text-neutral-600 hover:bg-neutral-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product: any) => (
            <div key={product.id} className="group flex flex-col">
              <div className="relative aspect-[4/5] bg-neutral-200 mb-4 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-neutral-100 opacity-50 bg-[repeating-linear-gradient(45deg,_transparent,_transparent_10px,_#e5e5e5_10px,_#e5e5e5_20px)]"></div>
                
                <button className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full text-neutral-600 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                  <Heart className="w-4 h-4" />
                </button>

                {!product.inStock && (
                  <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded shadow-sm">
                    Sold Out
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform z-20">
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="w-full py-3.5 bg-black text-white rounded-xl font-semibold shadow-xl hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-neutral-900 line-clamp-1">{product.name}</h3>
                  <span className="font-black text-lg">${product.price}</span>
                </div>
                <div className="text-neutral-500 text-sm mb-2">{product.category}</div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-400 font-normal">({product.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-neutral-100 flex justify-between items-center bg-white">
              <h2 className="font-black text-xl tracking-tight uppercase">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-neutral-50/50">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                  <ShoppingCart className="w-16 h-16 mb-4 text-neutral-300" />
                  <p className="font-medium text-lg text-neutral-600">Your cart is empty</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-4 text-sm font-bold uppercase tracking-wider text-black underline underline-offset-4">Continue Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-neutral-100">
                      <div className="w-20 h-24 bg-neutral-100 rounded-xl shrink-0"></div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-neutral-900 line-clamp-2 leading-tight">{item.product.name}</h4>
                          <button onClick={() => removeCartItem(item.product.id)} className="text-neutral-400 hover:text-red-500 transition-colors p-1 -mr-1 -mt-1"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        <span className="text-neutral-500 text-xs mb-auto">{item.product.category}</span>
                        <div className="flex justify-between items-end mt-4">
                          <span className="font-black">${item.product.price}</span>
                          <div className="flex items-center gap-3 bg-neutral-50 px-2 py-1 rounded-lg border border-neutral-200">
                            <button onClick={() => updateQty(item.product.id, -1)} className="text-neutral-500 hover:text-black"><Minus className="w-3.5 h-3.5" /></button>
                            <span className="font-semibold text-sm w-4 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.product.id, 1)} className="text-neutral-500 hover:text-black"><Plus className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-neutral-100 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-500 font-medium">Subtotal</span>
                  <span className="font-black text-2xl tracking-tight">${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    alert("Checkout process started!");
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex justify-center items-center gap-2"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-neutral-400 mt-4">Taxes and shipping calculated at checkout</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
