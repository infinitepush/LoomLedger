import { Link } from 'react-router';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import heroImage from '../../assets/images/hero-weaver.png';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero" id="hero-section">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content">
            <div className="hero__eyebrow">
              <ShieldCheck size={14} />
              <span>Blockchain Verified Authenticity</span>
            </div>
            <h1 className="hero__title">
              Every Thread <br />
              <span className="hero__title-accent">Tells a Story</span>
            </h1>
            <p className="hero__subtitle">
              Discover authentic handloom textiles directly from verified artisans. 
              Each product comes with a blockchain-backed digital passport — 
              so you can trust its origin, craftsmanship, and journey.
            </p>
            <div className="hero__actions">
              <Button as={Link} to="/marketplace" size="lg" icon={ArrowRight} iconPosition="right">
                Explore Marketplace
              </Button>
              <Button as={Link} to="/verify" variant="secondary" size="lg" icon={ShieldCheck}>
                Verify a Product
              </Button>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">12,400+</span>
                <span className="hero__stat-label">Verified Products</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">3,200+</span>
                <span className="hero__stat-label">Artisans</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">28</span>
                <span className="hero__stat-label">States</span>
              </div>
            </div>
          </div>
          <div className="hero__image-wrapper">
            <img
              src={heroImage}
              alt="Master weaver creating intricate Banarasi silk pattern on a traditional handloom"
              className="hero__image"
              loading="eager"
            />
            <div className="hero__image-badge">
              <Sparkles size={14} />
              <span>AI-Powered Weaver Stories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
