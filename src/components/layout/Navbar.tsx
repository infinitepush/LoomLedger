"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, User, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout, cart, wishlist } = useApp();
  const { showLoginPrompt } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!user) {
      e.preventDefault();
      showLoginPrompt('Please log in to access your ' + (path === '/cart' ? 'cart' : 'wishlist') + '.');
    }
  };
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const lastScrollY = useRef(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'artisan') return '/artisan/dashboard';
    return '/buyer/dashboard';
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300"
        animate={{ y: visible ? 0 : -80 }}
        transition={{ duration: 0.2 }}
      >
        <div className="container h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 text-2xl font-serif">
            <span className="font-bold text-primary">Loom</span>
            <span className="font-normal text-muted-foreground">Ledger</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Marketplace', path: '/marketplace' },
              { label: 'Verify', path: '/verify' },
              { label: 'Our Weavers', path: '/artisans' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' }
            ].map(link => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary hover:text-foreground ${
                  (link.path === '/' ? pathname === '/' : pathname.startsWith(link.path)) ? 'text-primary bg-secondary/40' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(prev => !prev)}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
              aria-label="Toggle Search"
            >
              <Search size={20} />
            </button>

            <Link
              href="/wishlist"
              onClick={(e) => handleNavClick(e, '/wishlist')}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              onClick={(e) => handleNavClick(e, '/cart')}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors relative mr-2"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth States */}
            {user ? (
              <div className="hidden md:flex items-center gap-3 border-l border-border pl-3">
                <Link
                  href={getDashboardLink()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-sm font-medium rounded-md hover:bg-border transition-all"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>
                
                <button
                  onClick={logout}
                  className="p-2 text-muted-foreground hover:text-error rounded-md hover:bg-error-light transition-colors"
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                </button>
                
                <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
                  {user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2 border-l border-border pl-3">
                <Link href="/login" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="px-4 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors shadow-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors md:hidden"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border bg-background overflow-hidden"
            >
              <div className="container py-4">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 bg-secondary border border-border rounded-md px-4 py-2 h-11 max-w-2xl mx-auto">
                  <Search size={18} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for sarees, fabrics, weavers, regions..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none border-none focus:ring-0 text-foreground"
                    autoFocus
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="p-1 text-muted-foreground hover:text-foreground rounded-full">
                      <X size={14} />
                    </button>
                  )}
                  <button type="submit" className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary-hover font-medium">
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[80vw] bg-background border-l border-border z-50 flex flex-col p-6 shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <span className="font-serif font-bold text-primary text-xl">LoomLedger</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-muted-foreground hover:text-foreground rounded-md">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-2 py-6">
                {[
                  { label: 'Marketplace', path: '/marketplace' },
                  { label: 'Verify', path: '/verify' },
                  { label: 'Our Weavers', path: '/artisans' },
                  { label: 'About', path: '/about' },
                  { label: 'Contact', path: '/contact' }
                ].map(link => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`block px-4 py-3 rounded-md font-medium text-base hover:bg-secondary ${
                      (link.path === '/' ? pathname === '/' : pathname.startsWith(link.path)) ? 'text-primary bg-primary-light' : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-border flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-md">
                      <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
                        {user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <Link href={getDashboardLink()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-sm font-medium rounded-md hover:bg-border transition-colors">
                      <LayoutDashboard size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-error bg-error-light hover:bg-error/10 text-sm font-medium rounded-md transition-colors">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="w-full text-center py-2.5 text-sm font-semibold text-muted-foreground border border-border rounded-md hover:bg-secondary transition-all">
                      Login
                    </Link>
                    <Link href="/signup" className="w-full text-center py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-all">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <div className="h-16 w-full" /> {/* Spacer */}
    </>
  );
}
