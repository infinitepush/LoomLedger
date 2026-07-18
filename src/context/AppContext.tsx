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
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signUpBuyer: (name: string, email: string, phone: string, password?: string) => Promise<void>;
  signUpArtisan: (artisanData: Partial<Artisan> & { password?: string }) => Promise<any>;
  addProduct: (product: Partial<Product>) => Promise<any>;
  approveArtisan: (artisanId: string) => Promise<void>;
  rejectArtisan: (artisanId: string) => Promise<void>;
  deleteArtisan: (artisanId: string) => Promise<void>;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
  toggleSaveArtisan: (artisan: Artisan) => Promise<void>;
  isArtisanSaved: (artisanId: string) => boolean;
  addNotification: (message: string) => void;
  markNotificationsRead: () => Promise<void>;
  placeOrder: (shippingDetails?: any) => Promise<void>;
  updateUserAddress?: (addressData: any) => void;
  loadGlobalData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getApiBase = () => {
  let envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  envUrl = envUrl.trim().replace(/\/+$/, '');
  if (!envUrl.endsWith('/api')) {
    envUrl = `${envUrl}/api`;
  }
  return envUrl;
};

export const API_BASE = getApiBase();

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [savedArtisans, setSavedArtisans] = useState<Artisan[]>([]);
  const [notifications, setNotifications] = useState<{ id: string; message: string; date: string; read: boolean }[]>([]);


  // Helper function for API requests with auto-refresh token
  const apiRequest = async (url: string, options: RequestInit = {}): Promise<any> => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('ll_access_token') : null;
    
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Token expired, attempt refresh
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('ll_refresh_token') : null;
      if (refreshToken) {
        try {
          const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });
          const refreshData = await refreshRes.json();
          if (refreshData.success) {
            localStorage.setItem('ll_access_token', refreshData.data.accessToken);
            localStorage.setItem('ll_refresh_token', refreshData.data.refreshToken);
            
            // Retry request with new token
            headers.set('Authorization', `Bearer ${refreshData.data.accessToken}`);
            const retryRes = await fetch(`${API_BASE}${url}`, {
              ...options,
              headers,
            });
            const retryJson = await retryRes.json();
            return retryJson.data || retryJson;
          }
        } catch {
          // Refresh failed, logout
          logout();
        }
      }
    }

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Request failed');
    }
    return json.data !== undefined ? json.data : json;
  };

  // Load initial global data
  const loadGlobalData = async () => {
    try {
      const prodsRes = await apiRequest('/products?limit=100');
      if (prodsRes) {
        if (Array.isArray(prodsRes)) {
          setProducts(prodsRes);
        } else if (prodsRes.products) {
          setProducts(prodsRes.products);
        }
      }
      
      const artisansRes = await apiRequest('/artisans?status=all');
      if (artisansRes) setArtisans(artisansRes);
    } catch (err) {
      console.error('Failed to load initial global catalogs:', err);
    }
  };

  const loadUserData = async (currentUser: any) => {
    try {
      // Notifications
      const notifs = await apiRequest('/notifications');
      if (notifs) {
        setNotifications(notifs.map((n: any) => ({
          id: n.id,
          message: n.message,
          date: n.createdAt.split('T')[0],
          read: n.read
        })));
      }

      if (currentUser.role === 'buyer') {
        // Cart
        const cartItems = await apiRequest('/cart');
        if (cartItems) {
          setCart(cartItems.map((item: any) => ({
            product: {
              id: item.productId,
              name: item.name,
              price: item.price,
              originalPrice: item.originalPrice,
              image: item.image,
              category: item.category,
              weaver: { name: item.artisanName }
            } as any,
            quantity: item.quantity
          })));
        }

        // Wishlist
        const wishlistItems = await apiRequest('/wishlist');
        if (wishlistItems) setWishlist(wishlistItems);

        // Saved Artisans
        const saved = await apiRequest('/artisans/saved');
        if (saved) setSavedArtisans(saved);

        // Orders
        const ords = await apiRequest('/orders/buyer');
        if (ords) setOrders(ords);

      } else if (currentUser.role === 'artisan') {
        // Orders
        const ords = await apiRequest('/orders/artisan');
        if (ords) setOrders(ords);
      }
    } catch (err) {
      console.error('Failed to load user-specific data:', err);
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem('ll_user');
    const localAccessToken = localStorage.getItem('ll_access_token');
    
    loadGlobalData();

    if (localUser && localAccessToken) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);
      loadUserData(parsedUser);
    }
  }, []);

  // Auth Functions
  const login = async (email: string, password = 'password123'): Promise<boolean> => {
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data && data.accessToken) {
        localStorage.setItem('ll_access_token', data.accessToken);
        localStorage.setItem('ll_refresh_token', data.refreshToken);
        localStorage.setItem('ll_user', JSON.stringify(data.user));
        setUser(data.user);
        await loadUserData(data.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('ll_refresh_token');
    if (refreshToken) {
      fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => {});
    }

    localStorage.removeItem('ll_user');
    localStorage.removeItem('ll_access_token');
    localStorage.removeItem('ll_refresh_token');
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setNotifications([]);
  };

  const signUpBuyer = async (name: string, email: string, phone: string, password = 'password123') => {
    try {
      const data = await apiRequest('/auth/register/buyer', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (data && data.accessToken) {
        localStorage.setItem('ll_access_token', data.accessToken);
        localStorage.setItem('ll_refresh_token', data.refreshToken);
        localStorage.setItem('ll_user', JSON.stringify(data.user));
        setUser(data.user);
        await loadUserData(data.user);
      }
    } catch (err: any) {
      throw new Error(err.message || 'Registration failed');
    }
  };

  const signUpArtisan = async (artisanData: Partial<Artisan> & { password?: string }): Promise<any> => {
    try {
      const payload = {
        name: artisanData.name,
        email: artisanData.email,
        phone: artisanData.phone,
        password: artisanData.password || 'password123',
        state: artisanData.state || 'Uttar Pradesh',
        district: artisanData.district || 'Varanasi',
        craft: artisanData.craft || 'Banarasi Silk Weaving',
        experience: artisanData.experience || '10 Years',
        giNumber: artisanData.giNumber || '',
        bio: artisanData.bio || '',
      };

      const data = await apiRequest('/auth/register/artisan', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (data && data.accessToken) {
        localStorage.setItem('ll_access_token', data.accessToken);
        localStorage.setItem('ll_refresh_token', data.refreshToken);
        localStorage.setItem('ll_user', JSON.stringify(data.user));
        setUser(data.user);
        await loadUserData(data.user);
        return data;
      }
      return { artisanId: 'ART-NEW' };
    } catch (err: any) {
      throw new Error(err.message || 'Registration failed');
    }
  };

  // Product Operations
  const addProduct = async (pData: Partial<Product>) => {
    try {
      const payload = {
        name: pData.name,
        price: pData.price,
        originalPrice: pData.originalPrice,
        category: pData.category || 'Banarasi Silk',
        image: pData.image,
        description: pData.description,
        fabric: pData.fabric,
        craftTime: pData.craftTime,
        tags: pData.tags,
        specifications: pData.specifications,
        giCertified: pData.giCertified,
      };

      const data = await apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      // Reload global list
      await loadGlobalData();
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to list product');
    }
  };

  // Admin Verification Panel
  const approveArtisan = async (artisanId: string) => {
    try {
      await apiRequest(`/admin/approve-artisan/${artisanId}`, { method: 'POST' });
      await loadGlobalData();
    } catch (err: any) {
      throw new Error(err.message || 'Failed to approve artisan');
    }
  };

  const rejectArtisan = async (artisanId: string) => {
    try {
      await apiRequest(`/admin/reject-artisan/${artisanId}`, { method: 'POST' });
      await loadGlobalData();
    } catch (err: any) {
      throw new Error(err.message || 'Rejection failed');
    }
  };

  const deleteArtisan = async (artisanId: string) => {
    try {
      await apiRequest(`/admin/artisans/${artisanId}`, { method: 'DELETE' });
      await loadGlobalData();
    } catch (err: any) {
      throw new Error(err.message || 'Artisan deletion failed');
    }
  };

  // Cart Management
  const addToCart = async (product: Product) => {
    try {
      if (!user) {
        window.dispatchEvent(new CustomEvent('loomledger:login-required', { detail: { message: 'Please log in to add items to your cart.' } }));
        return;
      }

      await apiRequest('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      await loadUserData(user);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (!user) {
        setCart(cart.filter(item => item.product.id !== productId));
        return;
      }

      await apiRequest('/cart/remove', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      });
      await loadUserData(user);
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    try {
      if (!user) {
        if (quantity <= 0) {
          setCart(cart.filter(item => item.product.id !== productId));
        } else {
          setCart(cart.map(item => item.product.id === productId ? { ...item, quantity } : item));
        }
        return;
      }

      await apiRequest('/cart/update', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
      await loadUserData(user);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const clearCart = async () => {
    try {
      if (!user) {
        setCart([]);
        return;
      }

      await apiRequest('/cart/clear', { method: 'POST' });
      setCart([]);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  // Wishlist
  const toggleWishlist = async (product: Product) => {
    try {
      if (!user) {
        window.dispatchEvent(new CustomEvent('loomledger:login-required', { detail: { message: 'Please log in to add items to your wishlist.' } }));
        return;
      }

      await apiRequest('/wishlist/toggle', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id }),
      });
      await loadUserData(user);
    } catch (err) {
      console.error('Failed to toggle wishlist:', err);
    }
  };

  const isWishlisted = (productId: string) => wishlist.some(item => item.id === productId);

  // Saved Artisans
  const toggleSaveArtisan = async (artisan: Artisan) => {
    try {
      if (!user) {
        if (isArtisanSaved(artisan.id)) {
          setSavedArtisans(savedArtisans.filter(item => item.id !== artisan.id));
        } else {
          setSavedArtisans([...savedArtisans, artisan]);
        }
        return;
      }

      await apiRequest('/artisans/save', {
        method: 'POST',
        body: JSON.stringify({ artisanId: artisan.id }),
      });
      await loadUserData(user);
    } catch (err) {
      console.error('Failed to toggle save artisan:', err);
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
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsRead = async () => {
    try {
      if (user) {
        await apiRequest('/notifications/read-all', { method: 'POST' });
      }
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Failed to mark notifications read:', err);
    }
  };

  // Place Order
  const placeOrder = async (shippingDetails?: any) => {
    try {
      if (cart.length === 0) return;
      if (!user) {
        alert('Please login to place orders.');
        return;
      }

      let savedAddrObj: any = null;
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('ll_user_address');
        if (saved) {
          try { savedAddrObj = JSON.parse(saved); } catch (e) {}
        }
      }

      const shipping = shippingDetails || savedAddrObj || {
        shippingName: user.name,
        shippingAddress: 'Lane No. 3, Heritage Colony, Mandir Rd',
        shippingCity: 'Varanasi',
        shippingState: 'Uttar Pradesh',
        shippingPincode: '221001',
        shippingPhone: '+91 99999 88888',
      };

      const payload = {
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        ...shipping,
      };

      await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setCart([]);
      await loadUserData(user);
    } catch (err: any) {
      console.error('Failed to place order:', err);
      throw new Error(err.message || 'Checkout failed');
    }
  };

  const updateUserAddress = (addressData: any) => {
    if (user) {
      setUser({ ...user, shippingAddress: addressData });
    }
  };

  return (
    <AppContext.Provider value={{
      user, products, artisans, orders, cart, wishlist, savedArtisans, notifications,
      login, logout, signUpBuyer, signUpArtisan, addProduct, approveArtisan, rejectArtisan, deleteArtisan,
      addToCart, removeFromCart, updateCartQuantity, clearCart, toggleWishlist, isWishlisted,
      toggleSaveArtisan, isArtisanSaved, addNotification, markNotificationsRead, placeOrder,
      updateUserAddress, loadGlobalData
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
