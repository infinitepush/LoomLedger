import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Navbar.css';

const navLinks = [
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Verify', path: '/verify' },
  { label: 'Stories', path: '/stories' },
  { label: 'For Artisans', path: '/seller' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo" id="logo-link">
            <span className="navbar__logo-mark">Loom</span>
            <span className="navbar__logo-text">Ledger</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav" id="desktop-nav" aria-label="Main navigation">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              className="navbar__action-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              id="search-toggle"
            >
              <Search size={20} />
            </button>

            <Link to="/wishlist" className="navbar__action-btn" aria-label="Wishlist" id="wishlist-btn">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="navbar__badge">{wishlistCount}</span>}
            </Link>

            <Link to="/cart" className="navbar__action-btn" aria-label="Cart" id="cart-btn">
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className="navbar__badge">{itemCount}</span>}
            </Link>

            <Link to="/buyer" className="navbar__action-btn navbar__action-btn--user" aria-label="Account" id="account-btn">
              <User size={20} />
            </Link>

            <button
              className="navbar__action-btn navbar__mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="navbar__search" id="search-bar">
            <div className="container">
              <div className="navbar__search-inner">
                <Search size={18} className="navbar__search-icon" />
                <input
                  type="search"
                  placeholder="Search for sarees, fabrics, artisans, regions..."
                  className="navbar__search-input"
                  autoFocus
                  id="search-input"
                />
                <button className="navbar__search-close" onClick={() => setSearchOpen(false)}>
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div className="navbar__overlay" onClick={() => setMobileOpen(false)} />
          <nav className="navbar__mobile" id="mobile-nav" aria-label="Mobile navigation">
            <div className="navbar__mobile-header">
              <span className="navbar__logo">
                <span className="navbar__logo-mark">Loom</span>
                <span className="navbar__logo-text">Ledger</span>
              </span>
              <button className="navbar__action-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <div className="navbar__mobile-links">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="navbar__mobile-footer">
              <Link to="/buyer" className="navbar__mobile-link">My Account</Link>
              <Link to="/seller" className="navbar__mobile-link">Seller Dashboard</Link>
            </div>
          </nav>
        </>
      )}

      {/* Spacer */}
      <div className="navbar__spacer" />
    </>
  );
}
