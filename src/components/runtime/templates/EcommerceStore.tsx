'use client'

import React, { useState } from 'react';
import { ShoppingCart, Search, Star, Heart, Menu, Plus, Minus, X, Trash2, ArrowRight } from 'lucide-react';

const sampleData = {
  storeName: "ARCO",
  categories: ["Outerwear", "Knitwear", "Trousers", "Accessories"],
  products: [
    { id: "p1", name: "Structured Wool Coat", category: "Outerwear", price: 495, rating: 4.9, reviews: 124, inStock: true },
    { id: "p2", name: "Merino Crewneck", category: "Knitwear", price: 185, rating: 4.8, reviews: 89, inStock: true },
    { id: "p3", name: "Wide-Leg Trousers", category: "Trousers", price: 245, rating: 4.7, reviews: 67, inStock: true },
    { id: "p4", name: "Cashmere Turtleneck", category: "Knitwear", price: 320, rating: 4.9, reviews: 103, inStock: true },
    { id: "p5", name: "Leather Belt", category: "Accessories", price: 95, rating: 4.6, reviews: 51, inStock: false },
    { id: "p6", name: "Technical Parka", category: "Outerwear", price: 595, rating: 4.8, reviews: 78, inStock: true },
    { id: "p7", name: "Slim Chinos", category: "Trousers", price: 165, rating: 4.7, reviews: 142, inStock: true },
    { id: "p8", name: "Canvas Tote", category: "Accessories", price: 75, rating: 4.5, reviews: 203, inStock: true }
  ]
};

const patterns = [
  'repeating-linear-gradient(45deg,#f5f5f5,#f5f5f5 10px,#efefef 10px,#efefef 20px)',
  'repeating-linear-gradient(-45deg,#f0f0f0,#f0f0f0 8px,#e8e8e8 8px,#e8e8e8 16px)',
  'radial-gradient(circle at 30% 70%,#e8e8e8 0%,#f5f5f5 60%)',
  'linear-gradient(135deg,#eeeeee 0%,#f8f8f8 50%,#e5e5e5 100%)',
  'repeating-linear-gradient(0deg,#f0f0f0,#f0f0f0 4px,#fafafa 4px,#fafafa 20px)',
  'radial-gradient(ellipse at 70% 30%,#e5e5e5 0%,#f5f5f5 60%)',
  'repeating-linear-gradient(90deg,#f0f0f0,#f0f0f0 2px,#fafafa 2px,#fafafa 24px)',
  'linear-gradient(to bottom right,#e8e8e8,#f8f8f8 40%,#eeeeee)',
];

export default function EcommerceStore({ data }) {
  const safeData = data || sampleData;
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState(new Set());

  const storeName = safeData.storeName || safeData.platformName || safeData.name || sampleData.storeName;
  const categories = safeData.categories || safeData.collections || sampleData.categories;
  const products = safeData.products || safeData.inventory || safeData.items || sampleData.products;

  const allCategories = ["All", ...categories];
  const filteredProducts = products.filter(p => activeCategory === "All" || p.category?.toLowerCase() === activeCategory.toLowerCase());

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setIsCartOpen(true);
  };
  const updateQty = (id, delta) => setCart(prev => prev.map(i => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const removeItem = (id) => setCart(prev => prev.filter(i => i.product.id !== id));
  const toggleWish = (id) => { const n = new Set(wishlist); n.has(id) ? n.delete(id) : n.add(id); setWishlist(n); };
  const cartTotal = cart.reduce((t, i) => t + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((t, i) => t + i.qty, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Mulish:wght@300;400;500;600;700;800&display=swap');

        .ec-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .ec-root { font-family: 'Mulish', sans-serif; background: #FAFAFA; color: #111; min-height: 100vh; }

        /* Announcement bar */
        .ec-announce {
          background: #111; color: #fff;
          text-align: center; padding: 11px;
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 500;
        }
        
        /* Navbar */
        .ec-nav {
          background: #FAFAFA; border-bottom: 1px solid #E8E8E8;
          padding: 0 40px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 50;
        }
        .ec-nav-left { display: flex; align-items: center; gap: 32px; }
        .ec-menu-btn { background: none; border: none; cursor: pointer; padding: 8px; color: #111; }
        .ec-logo {
          font-family: 'Tenor Sans', serif;
          font-size: 22px; letter-spacing: 0.25em;
          color: #111; text-transform: uppercase;
        }
        .ec-nav-links { display: none; }
        @media(min-width:768px) {
          .ec-nav-links { display: flex; gap: 28px; }
          .ec-menu-btn { display: none; }
        }
        .ec-nav-link { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #555; cursor: pointer; transition: color 0.2s; }
        .ec-nav-link:hover { color: #111; }
        .ec-nav-right { display: flex; align-items: center; gap: 20px; }
        .ec-nav-icon-btn { background: none; border: none; cursor: pointer; color: #555; transition: color 0.2s; position: relative; }
        .ec-nav-icon-btn:hover { color: #111; }
        .ec-cart-badge {
          position: absolute; top: -6px; right: -8px;
          width: 18px; height: 18px; background: #111; color: #fff;
          font-size: 10px; font-weight: 800; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        /* Hero */
        .ec-hero {
          background: #111; color: #fff;
          display: flex; align-items: stretch; min-height: 480px;
          margin-bottom: 80px;
        }
        .ec-hero-left {
          flex: 1; padding: 80px 80px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .ec-hero-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.3em;
          text-transform: uppercase; color: #888; margin-bottom: 24px;
        }
        .ec-hero-title {
          font-family: 'Tenor Sans', serif;
          font-size: 68px; line-height: 1.0; letter-spacing: -0.02em;
          text-transform: uppercase; margin-bottom: 24px;
        }
        .ec-hero-desc { font-size: 15px; color: #888; max-width: 360px; line-height: 1.7; margin-bottom: 40px; font-weight: 300; }
        .ec-hero-cta {
          display: inline-flex; align-items: center; gap: 12px;
          background: #FFF; color: #111;
          font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 16px 32px; border: none; cursor: pointer;
          transition: background 0.2s; width: fit-content;
        }
        .ec-hero-cta:hover { background: #E8E8E8; }
        .ec-hero-right {
          width: 420px; flex-shrink: 0;
          background: repeating-linear-gradient(135deg,#1a1a1a,#1a1a1a 30px,#222 30px,#222 60px);
          position: relative; overflow: hidden;
        }
        .ec-hero-right::before {
          content: 'SS\\A26';
          white-space: pre;
          position: absolute; top: 40px; right: 40px;
          font-family: 'Tenor Sans', serif;
          font-size: 11px; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          text-align: right;
          line-height: 1.8;
        }

        /* Categories */
        .ec-cats {
          max-width: 1280px; margin: 0 auto;
          padding: 0 40px; margin-bottom: 40px;
          display: flex; gap: 0; border-bottom: 1px solid #E8E8E8; overflow-x: auto;
        }
        .ec-cat-btn {
          padding: 14px 24px; background: none;
          border-bottom: 2px solid transparent; border-top: none; border-left: none; border-right: none;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: #888; cursor: pointer; white-space: nowrap;
          transition: all 0.2s; margin-bottom: -1px;
          font-family: 'Mulish', sans-serif;
        }
        .ec-cat-btn:hover { color: #111; }
        .ec-cat-btn.active { color: #111; border-bottom-color: #111; }

        /* Product grid */
        .ec-products { max-width: 1280px; margin: 0 auto; padding: 0 40px 80px; }
        .ec-products-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .ec-products-count { font-size: 13px; color: #888; font-weight: 400; }
        .ec-sort-btn { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; background: none; border: 1px solid #E8E8E8; padding: 8px 16px; cursor: pointer; color: #555; transition: all 0.2s; font-family: 'Mulish', sans-serif; }
        .ec-sort-btn:hover { border-color: #111; color: #111; }

        .ec-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px 24px; }
        
        .ec-product { cursor: pointer; }
        .ec-product-img {
          aspect-ratio: 3/4; position: relative;
          margin-bottom: 16px; overflow: hidden;
        }
        .ec-product-img-bg { position: absolute; inset: 0; transition: transform 0.5s ease; }
        .ec-product:hover .ec-product-img-bg { transform: scale(1.04); }
        .ec-product-overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          justify-content: flex-end; padding: 16px;
        }
        .ec-wish-btn {
          position: absolute; top: 12px; right: 12px;
          width: 32px; height: 32px; background: rgba(255,255,255,0.85);
          border: none; cursor: pointer; display: flex;
          align-items: center; justify-content: center;
          opacity: 0; transform: translateY(-4px);
          transition: all 0.2s; border-radius: 50%;
          color: #555;
        }
        .ec-product:hover .ec-wish-btn { opacity: 1; transform: translateY(0); }
        .ec-wish-btn.wished { opacity: 1; color: #EF4444; }
        .ec-sold-out-badge {
          position: absolute; top: 12px; left: 12px;
          background: #FFF; color: #111;
          font-size: 9px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 5px 10px;
        }
        .ec-add-btn {
          width: 100%; padding: 14px;
          background: rgba(17,17,17,0.88); backdrop-filter: blur(4px);
          color: #FFF; border: none; cursor: pointer;
          font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          opacity: 0; transform: translateY(8px);
          transition: all 0.2s; font-family: 'Mulish', sans-serif;
        }
        .ec-product:hover .ec-add-btn { opacity: 1; transform: translateY(0); }
        .ec-add-btn:disabled { background: rgba(17,17,17,0.4); cursor: not-allowed; }

        .ec-product-name { font-size: 14px; font-weight: 700; margin-bottom: 4px; letter-spacing: -0.01em; }
        .ec-product-cat { font-size: 11px; color: #888; margin-bottom: 8px; letter-spacing: 0.05em; }
        .ec-product-bottom { display: flex; justify-content: space-between; align-items: center; }
        .ec-product-price { font-family: 'Tenor Sans', serif; font-size: 18px; color: #111; }
        .ec-product-rating { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #888; font-weight: 600; }

        /* Cart */
        .ec-cart-overlay { position: fixed; inset: 0; z-index: 100; display: flex; justify-content: flex-end; }
        .ec-cart-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.3); }
        .ec-cart {
          position: relative; width: 420px; max-width: 100%;
          background: #FAFAFA; height: 100%;
          display: flex; flex-direction: column;
          border-left: 1px solid #E8E8E8;
        }
        .ec-cart-header {
          padding: 28px 32px; border-bottom: 1px solid #E8E8E8;
          display: flex; justify-content: space-between; align-items: center;
          background: #FFF;
        }
        .ec-cart-title { font-family: 'Tenor Sans', serif; font-size: 18px; letter-spacing: 0.1em; text-transform: uppercase; }
        .ec-cart-count { font-size: 12px; font-weight: 700; color: #888; }
        .ec-close-btn { background: none; border: none; cursor: pointer; color: #555; transition: color 0.2s; }
        .ec-close-btn:hover { color: #111; }
        .ec-cart-items { flex: 1; overflow-y: auto; padding: 24px 32px; }
        .ec-cart-empty { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .ec-cart-empty-icon { color: #DDD; margin-bottom: 16px; }
        .ec-cart-empty-text { font-size: 15px; color: #888; font-weight: 300; margin-bottom: 16px; }
        .ec-continue-btn { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; background: none; border: none; cursor: pointer; color: #111; text-decoration: underline; text-underline-offset: 3px; font-family: 'Mulish', sans-serif; }
        
        .ec-cart-item {
          display: flex; gap: 16px; padding: 20px 0;
          border-bottom: 1px solid #E8E8E8;
        }
        .ec-item-img { width: 80px; height: 96px; background: #F0F0F0; flex-shrink: 0; }
        .ec-item-info { flex: 1; display: flex; flex-direction: column; }
        .ec-item-name { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
        .ec-item-cat { font-size: 11px; color: #888; margin-bottom: auto; }
        .ec-item-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; }
        .ec-item-price { font-family: 'Tenor Sans', serif; font-size: 17px; }
        .ec-qty-ctrl { display: flex; align-items: center; gap: 12px; border: 1px solid #E8E8E8; padding: 6px 12px; }
        .ec-qty-btn { background: none; border: none; cursor: pointer; color: #888; transition: color 0.2s; display: flex; align-items: center; }
        .ec-qty-btn:hover { color: #111; }
        .ec-qty-num { font-size: 13px; font-weight: 700; min-width: 16px; text-align: center; }
        .ec-remove-btn { background: none; border: none; cursor: pointer; color: #CCC; transition: color 0.2s; }
        .ec-remove-btn:hover { color: #EF4444; }
        
        .ec-cart-footer { padding: 24px 32px; border-top: 1px solid #E8E8E8; background: #FFF; }
        .ec-subtotal-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; }
        .ec-subtotal-label { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #888; }
        .ec-subtotal-amount { font-family: 'Tenor Sans', serif; font-size: 24px; }
        .ec-checkout-btn {
          width: 100%; padding: 18px;
          background: #111; color: #FFF; border: none; cursor: pointer;
          font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.2s; font-family: 'Mulish', sans-serif;
        }
        .ec-checkout-btn:hover { background: #333; }
        .ec-cart-note { text-align: center; font-size: 11px; color: #AAA; margin-top: 12px; }

        /* Footer */
        .ec-footer {
          background: #FFF; border-top: 1px solid #E8E8E8;
          padding: 80px 40px 40px; margin-top: 80px;
        }
        .ec-footer-top {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px;
          max-width: 1280px; margin: 0 auto 64px;
        }
        .ec-footer-col h4 {
          font-family: 'Tenor Sans', serif; font-size: 12px; letter-spacing: 0.15em;
          text-transform: uppercase; margin-bottom: 24px; color: #111;
        }
        .ec-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .ec-footer-col a {
          font-size: 13px; color: #666; text-decoration: none; transition: color 0.2s;
        }
        .ec-footer-col a:hover { color: #111; }
        .ec-newsletter-desc { font-size: 13px; color: #666; margin-bottom: 16px; line-height: 1.6; }
        .ec-newsletter-form { display: flex; border-bottom: 1px solid #111; padding-bottom: 8px; }
        .ec-newsletter-input {
          background: none; border: none; flex: 1; outline: none;
          font-size: 13px; font-family: 'Mulish', sans-serif;
        }
        .ec-newsletter-btn {
          background: none; border: none; cursor: pointer;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .ec-footer-bottom {
          max-width: 1280px; margin: 0 auto;
          padding-top: 32px; border-top: 1px solid #E8E8E8;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px; color: #999;
        }
        .ec-footer-social { display: flex; gap: 24px; }
        .ec-footer-social a { color: #999; text-decoration: none; transition: color 0.2s; }
        .ec-footer-social a:hover { color: #111; }

        /* Responsive */
        @media (max-width: 1024px) {
          .ec-grid { grid-template-columns: repeat(3, 1fr); }
          .ec-footer-top { grid-template-columns: repeat(2, 1fr); gap: 40px; }
        }

        @media (max-width: 768px) {
          .ec-nav { padding: 0 20px; }
          .ec-hero { flex-direction: column; min-height: auto; margin-bottom: 60px; }
          .ec-hero-left { padding: 60px 24px; }
          .ec-hero-title { font-size: 44px; }
          .ec-hero-right { width: 100%; height: 300px; }
          .ec-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 16px; }
          .ec-footer-top { grid-template-columns: 1fr; gap: 40px; }
          .ec-cart { width: 100%; }
        }

        @media (max-width: 480px) {
          .ec-grid { grid-template-columns: 1fr; }
          .ec-hero-title { font-size: 36px; }
        }
      `}</style>

      <div className="ec-root">
        <div className="ec-announce">Free shipping on orders over $250 · Returns within 30 days</div>
        
        <nav className="ec-nav">
          <div className="ec-nav-left">
            <button className="ec-menu-btn"><Menu size={20} /></button>
            <div className="ec-logo">{storeName}</div>
          </div>
          <div className="ec-nav-links">
            {['New Arrivals', 'Collections', 'Outerwear', 'Knitwear', 'Sale'].map(l => (
              <span key={l} className="ec-nav-link">{l}</span>
            ))}
          </div>
          <div className="ec-nav-right">
            <button className="ec-nav-icon-btn"><Search size={18} /></button>
            <button className="ec-nav-icon-btn" style={{fontSize:12,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',background:'none',border:'none',cursor:'pointer',color:'#555'}}>Account</button>
            <button className="ec-nav-icon-btn" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="ec-cart-badge">{cartCount}</span>}
            </button>
          </div>
        </nav>

        <div className="ec-hero">
          <div className="ec-hero-left">
            <div className="ec-hero-eyebrow">Spring · Summer 2026</div>
            <h1 className="ec-hero-title">Form<br/>Meets<br/>Function</h1>
            <p className="ec-hero-desc">Elevated essentials built for the modern wardrobe. Crafted from responsible materials, designed to last.</p>
            <button className="ec-hero-cta">Shop the Collection <ArrowRight size={14} /></button>
          </div>
          <div className="ec-hero-right"></div>
        </div>

        <div className="ec-cats">
          {allCategories.map(cat => (
            <button key={cat} className={`ec-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </div>

        <div className="ec-products">
          <div className="ec-products-header">
            <span className="ec-products-count">{filteredProducts.length} products</span>
            <button className="ec-sort-btn">Sort: Featured</button>
          </div>
          <div className="ec-grid">
            {filteredProducts.map((product, pi) => (
              <div key={product.id} className="ec-product">
                <div className="ec-product-img">
                  <div className="ec-product-img-bg" style={{background: patterns[pi % patterns.length]}}></div>
                  <div className="ec-product-overlay">
                    <button className={`ec-wish-btn ${wishlist.has(product.id) ? 'wished' : ''}`} onClick={() => toggleWish(product.id)}>
                      <Heart size={14} fill={wishlist.has(product.id) ? '#EF4444' : 'none'} />
                    </button>
                    {!product.inStock && <div className="ec-sold-out-badge">Sold Out</div>}
                    <button className="ec-add-btn" disabled={!product.inStock} onClick={() => product.inStock && addToCart(product)}>
                      <ShoppingCart size={12} /> Add to Cart
                    </button>
                  </div>
                </div>
                <div className="ec-product-name">{product.name}</div>
                <div className="ec-product-cat">{product.category}</div>
                <div className="ec-product-bottom">
                  <span className="ec-product-price">${typeof product.price === 'object' ? (product.price.amount || JSON.stringify(product.price)) : product.price}</span>
                  <span className="ec-product-rating">
                    <Star size={11} fill="#C9A84C" color="#C9A84C" /> {typeof product.rating === 'object' ? (product.rating.value || product.rating.score || JSON.stringify(product.rating)) : product.rating}
                    <span style={{fontWeight:300}}>({product.reviews})</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isCartOpen && (
          <div className="ec-cart-overlay">
            <div className="ec-cart-backdrop" onClick={() => setIsCartOpen(false)}></div>
            <div className="ec-cart">
              <div className="ec-cart-header">
                <div>
                  <div className="ec-cart-title">Cart</div>
                  <div className="ec-cart-count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</div>
                </div>
                <button className="ec-close-btn" onClick={() => setIsCartOpen(false)}><X size={20} /></button>
              </div>
              <div className="ec-cart-items">
                {cart.length === 0 ? (
                  <div className="ec-cart-empty">
                    <ShoppingCart size={48} className="ec-cart-empty-icon" />
                    <div className="ec-cart-empty-text">Your cart is empty</div>
                    <button className="ec-continue-btn" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="ec-cart-item">
                      <div className="ec-item-img" style={{background: patterns[products.findIndex(p=>p.id===item.product.id) % patterns.length]}}></div>
                      <div className="ec-item-info">
                        <div className="ec-item-name">{item.product.name}</div>
                        <div className="ec-item-cat">{item.product.category}</div>
                        <div className="ec-item-bottom">
                          <span className="ec-item-price">${item.product.price * item.qty}</span>
                          <div style={{display:'flex',alignItems:'center',gap:8}}>
                            <div className="ec-qty-ctrl">
                              <button className="ec-qty-btn" onClick={() => updateQty(item.product.id, -1)}><Minus size={11} /></button>
                              <span className="ec-qty-num">{item.qty}</span>
                              <button className="ec-qty-btn" onClick={() => updateQty(item.product.id, 1)}><Plus size={11} /></button>
                            </div>
                            <button className="ec-remove-btn" onClick={() => removeItem(item.product.id)}><Trash2 size={14} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="ec-cart-footer">
                  <div className="ec-subtotal-row">
                    <span className="ec-subtotal-label">Subtotal</span>
                    <span className="ec-subtotal-amount">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="ec-checkout-btn" onClick={() => { alert('Checkout!'); setCart([]); setIsCartOpen(false); }}>
                    Checkout <ArrowRight size={14} />
                  </button>
                  <div className="ec-cart-note">Taxes & shipping calculated at checkout</div>
                </div>
              )}
            </div>
          </div>
        )}

        <footer className="ec-footer">
          <div className="ec-footer-top">
            <div className="ec-footer-col">
              <h4>Shop</h4>
              <ul>
                <li><a href="#">New Arrivals</a></li>
                <li><a href="#">Collections</a></li>
                <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
              </ul>
            </div>
            <div className="ec-footer-col">
              <h4>About</h4>
              <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Craftsmanship</a></li>
                <li><a href="#">Sustainability</a></li>
                <li><a href="#">Stores</a></li>
              </ul>
            </div>
            <div className="ec-footer-col">
              <h4>Assistance</h4>
              <ul>
                <li><a href="#">Shipping & Returns</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Size Guide</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className="ec-footer-col">
              <h4>Newsletter</h4>
              <p className="ec-newsletter-desc">Subscribe to receive updates on new collections and early access to sales.</p>
              <form className="ec-newsletter-form" onSubmit={e => e.preventDefault()}>
                <input className="ec-newsletter-input" placeholder="Your email address" />
                <button className="ec-newsletter-btn">Join</button>
              </form>
            </div>
          </div>
          <div className="ec-footer-bottom">
            <div>&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</div>
            <div className="ec-footer-social">
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}