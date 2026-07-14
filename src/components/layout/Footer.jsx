import { Link } from 'react-router';
import { Globe, MessageCircle, Play, Mail } from 'lucide-react';
import './Footer.css';

const footerLinks = {
  marketplace: {
    title: 'Marketplace',
    links: [
      { label: 'Browse All', path: '/marketplace' },
      { label: 'Banarasi Silk', path: '/marketplace?cat=banarasi-silk' },
      { label: 'Kanjivaram', path: '/marketplace?cat=kanjivaram' },
      { label: 'Chanderi', path: '/marketplace?cat=chanderi' },
      { label: 'Pashmina', path: '/marketplace?cat=pashmina' },
      { label: 'Ikat', path: '/marketplace?cat=ikat' },
    ],
  },
  platform: {
    title: 'Platform',
    links: [
      { label: 'Verify Product', path: '/verify' },
      { label: 'Artisan Stories', path: '/stories' },
      { label: 'How It Works', path: '/#how-it-works' },
      { label: 'For Artisans', path: '/seller' },
      { label: 'Pricing', path: '/pricing' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press Kit', path: '/press' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Help Center', path: '/help' },
      { label: 'Shipping & Returns', path: '/shipping' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Accessibility', path: '/accessibility' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-mark">Loom</span>
              <span className="footer__logo-text">Ledger</span>
            </Link>
            <p className="footer__tagline">
              Digital trust platform for authentic handloom products. Every thread verified, every artisan celebrated.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram"><Globe size={18} /></a>
              <a href="#" className="footer__social-link" aria-label="Twitter"><MessageCircle size={18} /></a>
              <a href="#" className="footer__social-link" aria-label="YouTube"><Play size={18} /></a>
              <a href="#" className="footer__social-link" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map(section => (
            <div className="footer__column" key={section.title}>
              <h4 className="footer__column-title">{section.title}</h4>
              <ul className="footer__list">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer__link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} LoomLedger. All rights reserved.
          </p>
          <p className="footer__note">
            Made with care for India's handloom heritage.
          </p>
        </div>
      </div>
    </footer>
  );
}
