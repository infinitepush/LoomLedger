import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Button from '../ui/Button';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="section newsletter" id="newsletter-section">
      <div className="container">
        <div className="newsletter__card">
          <div className="newsletter__content">
            <h2 className="newsletter__title">Stay Connected to India's Handloom Heritage</h2>
            <p className="newsletter__subtitle">
              Get curated stories, new artisan profiles, and exclusive collection previews delivered to your inbox.
            </p>

            {submitted ? (
              <div className="newsletter__success">
                <Check size={20} />
                <span>Thank you! You'll hear from us soon.</span>
              </div>
            ) : (
              <form className="newsletter__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="newsletter__input"
                  required
                  id="newsletter-email"
                />
                <Button type="submit" size="lg" icon={ArrowRight} iconPosition="right">
                  Subscribe
                </Button>
              </form>
            )}

            <p className="newsletter__note">No spam. Unsubscribe anytime. Read our privacy policy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
