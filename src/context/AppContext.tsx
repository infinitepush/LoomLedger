"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts, mockArtisans, mockOrders, Product, Artisan, Order } from '../data/mockData';

interface AppContextType {
  user: any | null;
  products: Product[];
  artisans: Artisan[];
  orders: Order[];
  cart: { product: Product; quantity: number }[];
  wishlist: Product[];
  savedArtisans: Artisan[];
  notifications: { id: string; message: string; date: string; read: boolean }[];
  login: (email: string, role: 'buyer' | 'artisan' | 'admin') => boolean;
  logout: () => void;
  signUpBuyer: (name: string, email: string, phone: string) => void;
  signUpArtisan: (artisanData: Partial<Artisan>) => string;
  addProduct: (product: Partial<Product>) => void;
  approveArtisan: (artisanId: string) => void;
  rejectArtisan: (artisanId: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  toggleSaveArtisan: (artisan: Artisan) => void;
  isArtisanSaved: (artisanId: string) => boolean;
  addNotification: (message: string) => void;
  markNotificationsRead: () => void;
  placeOrder: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [savedArtisans, setSavedArtisans] = useState<Artisan[]>([]);
  const [notifications, setNotifications] = useState<{ id: string; message: string; date: string; read: boolean }[]>([]);

  // Load from local storage or defaults on mount
  useEffect(() => {
    const localUser = localStorage.getItem('ll_user');
    const localProducts = localStorage.getItem('ll_products');
    const localArtisans = localStorage.getItem('ll_artisans');
    const localOrders = localStorage.getItem('ll_orders');
    const localCart = localStorage.getItem('ll_cart');
    const localWishlist = localStorage.getItem('ll_wishlist');
    const localSaved = localStorage.getItem('ll_saved_artisans');
    const localNotifs = localStorage.getItem('ll_notifications');

    if (localUser) setUser(JSON.parse(localUser));
    setProducts(localProducts ? JSON.parse(localProducts) : mockProducts);
    setArtisans(localArtisans ? JSON.parse(localArtisans) : mockArtisans);
    setOrders(localOrders ? JSON.parse(localOrders) : mockOrders);
    setCart(localCart ? JSON.parse(localCart) : []);
    setWishlist(localWishlist ? JSON.parse(localWishlist) : []);
    setSavedArtisans(localSaved ? JSON.parse(localSaved) : []);
    setNotifications(localNotifs ? JSON.parse(localNotifs) : [
      { id: '1', message: "Welcome to LoomLedger! Securely verify traditional products.", date: "2026-07-15", read: false }
    ]);
  }, []);

  // Persistors
  const saveUser = (u: any) => {
    setUser(u);
    if (u) localStorage.setItem('ll_user', JSON.stringify(u));
    else localStorage.removeItem('ll_user');
  };

  const saveProducts = (p: Product[]) => {
    setProducts(p);
    localStorage.setItem('ll_products', JSON.stringify(p));
  };

  const saveArtisans = (a: Artisan[]) => {
    setArtisans(a);
    localStorage.setItem('ll_artisans', JSON.stringify(a));
  };

  const saveOrders = (o: Order[]) => {
    setOrders(o);
    localStorage.setItem('ll_orders', JSON.stringify(o));
  };

  const saveCart = (c: { product: Product; quantity: number }[]) => {
    setCart(c);
    localStorage.setItem('ll_cart', JSON.stringify(c));
  };

  const saveWishlist = (w: Product[]) => {
    setWishlist(w);
    localStorage.setItem('ll_wishlist', JSON.stringify(w));
  };

  const saveSavedArtisans = (sa: Artisan[]) => {
    setSavedArtisans(sa);
    localStorage.setItem('ll_saved_artisans', JSON.stringify(sa));
  };

  const saveNotifs = (n: typeof notifications) => {
    setNotifications(n);
    localStorage.setItem('ll_notifications', JSON.stringify(n));
  };

  // Auth Functions
  const login = (email: string, role: 'buyer' | 'artisan' | 'admin'): boolean => {
    if (role === 'admin') {
      if (email === 'admin@example.com') {
        saveUser({ name: 'Admin Panel', email, role: 'admin', id: 'ADMIN_01' });
        return true;
      }
      return false;
    }
    if (role === 'buyer') {
      const idx = email.match(/\d/)?.[0] || '1';
      const name = idx === '1' ? 'Priya Sharma' : `Buyer User ${idx}`;
      saveUser({ name, email, role: 'buyer', id: `BUYER_0${idx}` });
      addNotification(`Logged in successfully as ${name}.`);
      return true;
    }
    if (role === 'artisan') {
      const foundArtisan = artisans.find(a => a.email.toLowerCase() === email.toLowerCase());
      if (foundArtisan) {
        saveUser({ name: foundArtisan.name, email: foundArtisan.email, role: 'artisan', id: foundArtisan.id });
        addNotification(`Logged in successfully as Artisan ${foundArtisan.name}.`);
        return true;
      }
      return false;
    }
    return false;
  };

  const logout = () => {
    saveUser(null);
    saveCart([]);
  };

  const signUpBuyer = (name: string, email: string, phone: string) => {
    const newId = `BUYER_0${Math.floor(Math.random() * 1000)}`;
    const newBuyer = { name, email, phone, id: newId, role: 'buyer' };
    saveUser(newBuyer);
    addNotification(`Welcome ${name}! Your LoomLedger account is now ready.`);
  };

  const signUpArtisan = (artisanData: Partial<Artisan>): string => {
    const artId = `ART-OD-2026-0001${(artisans.length + 1).toString().padStart(2, '0')}`;
    const newArtisan: Artisan = {
      id: artId,
      name: artisanData.name || "Unnamed Artisan",
      region: `${artisanData.district || 'Varanasi'}, ${artisanData.state || 'Uttar Pradesh'}`,
      district: artisanData.district || "Varanasi",
      state: artisanData.state || "Uttar Pradesh",
      craft: artisanData.craft || "Traditional Handloom",
      experience: `${artisanData.experience || 5} Years`,
      generation: "New Generation Weaver",
      avatar: "/assets/images/weaver-portrait.png",
      verified: false, // Must be approved by admin!
      walletAddress: "0x" + Math.random().toString(16).substring(2, 10).toUpperCase() + "..." + Math.random().toString(16).substring(2, 6).toUpperCase(),
      verificationHash: "",
      blockchainTimestamp: "",
      giCertified: artisanData.giCertified || false,
      giNumber: artisanData.giNumber || "",
      rating: 5.0,
      followersCount: 0,
      productsCount: 0,
      bio: artisanData.bio || "Crafting heirloom fabrics with passion.",
      specialties: artisanData.specialties || ["Handloom Weaving"],
      awards: [],
      phone: artisanData.phone || "",
      email: artisanData.email || "",
      achievements: []
    };

    saveArtisans([...artisans, newArtisan]);
    addNotification(`Artisan profile submitted for review: ${newArtisan.name}`);
    return artId;
  };

  // Product Operations
  const addProduct = (pData: Partial<Product>) => {
    const newProdId = `PROD_0${products.length + 1}`;
    const wallet = user?.role === 'artisan' ? (artisans.find(a => a.id === user.id)?.walletAddress || '0xArtisanWalletAddress') : '0xArtisanWalletAddress';
    
    // Polygon Amoy transaction hashes & registration mock
    const txHash = "0x" + Math.random().toString(16).substring(2, 12).toLowerCase() + "8f9a0c1d2e3f4a5b6c7d8e9f0a1b2c3d";
    
    const newProduct: Product = {
      id: newProdId,
      name: pData.name || "New Handloom Saree",
      slug: (pData.name || "new-handloom-saree").toLowerCase().replace(/\s+/g, '-'),
      price: pData.price || 5000,
      originalPrice: pData.originalPrice || 6000,
      currency: "INR",
      image: pData.image || "product-banarasi.png",
      gallery: pData.gallery || ["product-banarasi.png"],
      category: pData.category || "Banarasi Silk",
      categorySlug: (pData.category || "Banarasi Silk").toLowerCase().replace(/\s+/g, '-'),
      region: pData.region || user?.region || "Varanasi, Uttar Pradesh",
      weaver: {
        id: user?.id || "ART-OD-2026-000101",
        name: user?.name || "Ramesh Vishwakarma",
        avatar: "/assets/images/weaver-portrait.png"
      },
      verified: true, // Auto verified since uploaded by approved artisan
      blockchainId: txHash,
      giCertified: pData.giCertified || false,
      rating: 5.0,
      reviews: [],
      inStock: true,
      tags: pData.tags || ["New", "Handloom"],
      description: pData.description || "A beautifully styled craft piece.",
      careInstructions: pData.careInstructions || "Dry clean only.",
      craftStory: pData.craftStory || "AI-generated storytelling coming soon.",
      craftTime: pData.craftTime || "15 Days",
      fabric: pData.fabric || "Cotton Silk",
      specifications: pData.specifications || { "Length": "5.5 meters" },
      timeline: [
        { stage: "Yarn Dyeing", date: new Date().toISOString().split('T')[0], location: pData.region || "Workshop", status: "complete" },
        { stage: "Woven on Handloom", date: new Date().toISOString().split('T')[0], location: pData.region || "Workshop", status: "complete" },
        { stage: "Blockchain Secure Passport Minted", date: new Date().toISOString().split('T')[0], location: "Polygon Amoy", status: "complete" }
      ]
    };

    saveProducts([newProduct, ...products]);
    addNotification(`New product listed: ${newProduct.name}. Blockchain transaction logged.`);
  };

  // Admin Verification Panel
  const approveArtisan = (artisanId: string) => {
    const tx = "0x" + Math.random().toString(16).substring(2, 12).toLowerCase() + "7a3b9c1d2e4f5a6b7c8d9e0f1a2b3c4d";
    const timestamp = new Date().toISOString();

    const updatedArtisans = artisans.map(art => {
      if (art.id === artisanId) {
        return {
          ...art,
          verified: true,
          blockchainTimestamp: timestamp,
          verificationHash: tx
        };
      }
      return art;
    });

    saveArtisans(updatedArtisans);
    addNotification(`Artisan ${artisanId} verified and recorded on Polygon Amoy.`);
  };

  const rejectArtisan = (artisanId: string) => {
    saveArtisans(artisans.filter(art => art.id !== artisanId));
    addNotification(`Artisan registration for ${artisanId} rejected.`);
  };

  // Cart Management
  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      saveCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart(cart.map(item => item.product.id === productId ? { ...item, quantity } : item));
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    if (isWishlisted(product.id)) {
      saveWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      saveWishlist([...wishlist, product]);
    }
  };

  const isWishlisted = (productId: string) => wishlist.some(item => item.id === productId);

  // Saved Artisans
  const toggleSaveArtisan = (artisan: Artisan) => {
    if (isArtisanSaved(artisan.id)) {
      saveSavedArtisans(savedArtisans.filter(item => item.id !== artisan.id));
    } else {
      saveSavedArtisans([...savedArtisans, artisan]);
    }
  };

  const isArtisanSaved = (artisanId: string) => savedArtisans.some(item => item.id === artisanId);

  // Notification Queue
  const addNotification = (message: string) => {
    const newNotif = {
      id: Math.random().toString(),
      message,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    saveNotifs([newNotif, ...notifications]);
  };

  const markNotificationsRead = () => {
    saveNotifs(notifications.map(n => ({ ...n, read: true })));
  };

  // Place Order
  const placeOrder = () => {
    if (cart.length === 0) return;
    
    const newOrdersList: Order[] = cart.map((item, idx) => {
      const tx = "0x" + Math.random().toString(16).substring(2, 12).toLowerCase() + "f9a0c1d2e3f4a5b6c7d8e9f0a1b2c3d4";
      return {
        id: `ORD-2026-${1000 + orders.length + idx + 1}`,
        buyerId: user?.id || 'GUEST',
        buyerName: user?.name || 'Guest User',
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        artisanId: item.product.weaver.id,
        artisanName: item.product.weaver.name,
        amount: item.product.price * item.quantity,
        status: 'Processing',
        date: new Date().toISOString().split('T')[0],
        blockchainTxHash: tx,
        walletAddress: user?.walletAddress || '0xDefaultBuyerWalletAddress',
        timeline: [
          { status: 'Order Placed', date: new Date().toISOString().split('T')[0], note: 'Order logged on LoomLedger.' },
          { status: 'Processing', date: new Date().toISOString().split('T')[0], note: 'Artisan has been notified.' }
        ]
      };
    });

    saveOrders([...newOrdersList, ...orders]);
    clearCart();
    addNotification("Checkout complete! Blockchain logs generated for your order items.");
  };

  return (
    <AppContext.Provider value={{
      user, products, artisans, orders, cart, wishlist, savedArtisans, notifications,
      login, logout, signUpBuyer, signUpArtisan, addProduct, approveArtisan, rejectArtisan,
      addToCart, removeFromCart, updateCartQuantity, clearCart, toggleWishlist, isWishlisted,
      toggleSaveArtisan, isArtisanSaved, addNotification, markNotificationsRead, placeOrder
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
