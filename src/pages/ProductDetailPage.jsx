import { useParams, Link } from 'react-router';
import { Heart, ShoppingBag, ShieldCheck, MapPin, Clock, Star, ChevronRight, Share2, Truck, RotateCcw, Award } from 'lucide-react';
import VerificationBadge from '../components/ui/VerificationBadge';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products.json';
import './ProductDetailPage.css';

const imageModules = import.meta.glob('../assets/images/*.png', { eager: true });
function getImage(filename) {
  const key = Object.keys(imageModules).find(k => k.endsWith(filename));
  return key ? imageModules[key].default : '';
}
function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
}

const timeline = [
  { stage: 'Raw Materials Sourced', date: 'Jan 2025', location: 'Local Market', status: 'complete' },
  { stage: 'Handwoven on Loom', date: 'Feb 2025', location: 'Artisan Workshop', status: 'complete' },
  { stage: 'Quality Inspection', date: 'Mar 2025', location: 'Verification Center', status: 'complete' },
  { stage: 'Blockchain Registered', date: 'Mar 2025', location: 'Digital', status: 'complete' },
  { stage: 'Listed on LoomLedger', date: 'Mar 2025', location: 'Platform', status: 'current' },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug) || products[0];
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="pdp" id="product-detail-page">
      {/* Breadcrumb */}
      <div className="container">
        <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/marketplace">Marketplace</Link>
          <ChevronRight size={14} />
          <Link to={`/marketplace?cat=${product.categorySlug}`}>{product.category}</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>
      </div>

      <div className="container">
        <div className="pdp__grid">
          {/* Image Gallery */}
          <div className="pdp__gallery">
            <div className="pdp__main-image-wrap">
              <img src={getImage(product.image)} alt={product.name} className="pdp__main-image" />
              {product.verified && (
                <div className="pdp__image-badge">
                  <ShieldCheck size={14} />
                  <span>Blockchain Verified</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="pdp__info">
            <div className="pdp__meta-row">
              {product.verified && <VerificationBadge size="md" />}
              {product.giCertified && <Badge variant="saffron" size="sm" icon={Award}>GI Certified</Badge>}
              <Badge variant="indigo" size="sm">{product.category}</Badge>
            </div>

            <h1 className="pdp__title">{product.name}</h1>

            <div className="pdp__weaver-row">
              <span>by <Link to={`/artisan/${product.weaver.id}`} className="pdp__weaver-link">{product.weaver.name}</Link></span>
              <span className="pdp__weaver-sep">·</span>
              <span className="pdp__region"><MapPin size={12} /> {product.region}</span>
            </div>

            <div className="pdp__rating-row">
              <div className="pdp__stars">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className={`pdp__star ${i <= Math.floor(product.rating) ? 'pdp__star--filled' : ''}`}>★</span>
                ))}
              </div>
              <span className="pdp__rating-text">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="pdp__pricing">
              <span className="pdp__price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="pdp__original-price">{formatPrice(product.originalPrice)}</span>
                  <Badge variant="accent" size="sm">{Math.round((1 - product.price / product.originalPrice) * 100)}% off</Badge>
                </>
              )}
            </div>

            <p className="pdp__description">{product.description}</p>

            <div className="pdp__details-grid">
              <div className="pdp__detail-item">
                <Clock size={16} />
                <div>
                  <span className="pdp__detail-label">Craft Time</span>
                  <span className="pdp__detail-value">{product.craftTime}</span>
                </div>
              </div>
              <div className="pdp__detail-item">
                <MapPin size={16} />
                <div>
                  <span className="pdp__detail-label">Origin</span>
                  <span className="pdp__detail-value">{product.region}</span>
                </div>
              </div>
            </div>

            <div className="pdp__tags">
              {product.tags.map(tag => (
                <Badge key={tag} variant="default" size="sm">{tag}</Badge>
              ))}
            </div>

            <div className="pdp__actions">
              <Button size="lg" fullWidth icon={ShoppingBag} onClick={() => addItem(product)}>
                Add to Cart
              </Button>
              <button
                className={`pdp__wishlist-btn ${wishlisted ? 'pdp__wishlist-btn--active' : ''}`}
                onClick={() => toggleItem(product)}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
              <button className="pdp__share-btn" aria-label="Share">
                <Share2 size={20} />
              </button>
            </div>

            <div className="pdp__promises">
              <div className="pdp__promise">
                <Truck size={16} />
                <span>Free shipping on orders above ₹5,000</span>
              </div>
              <div className="pdp__promise">
                <RotateCcw size={16} />
                <span>Easy 14-day returns</span>
              </div>
              <div className="pdp__promise">
                <ShieldCheck size={16} />
                <span>Authenticity guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Journey Timeline */}
        <div className="pdp__journey">
          <h2 className="pdp__section-title">Product Journey</h2>
          <p className="pdp__section-desc">Track the complete journey of this handloom product from raw materials to your doorstep.</p>
          <div className="pdp__timeline">
            {timeline.map((step, i) => (
              <div className={`pdp__timeline-step ${step.status === 'current' ? 'pdp__timeline-step--current' : ''}`} key={i}>
                <div className="pdp__timeline-dot" />
                {i < timeline.length - 1 && <div className="pdp__timeline-line" />}
                <div className="pdp__timeline-content">
                  <span className="pdp__timeline-stage">{step.stage}</span>
                  <span className="pdp__timeline-meta">{step.date} · {step.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Verification */}
        <div className="pdp__blockchain">
          <div className="pdp__blockchain-inner">
            <ShieldCheck size={24} />
            <div>
              <h3 className="pdp__blockchain-title">Blockchain Verified</h3>
              <p className="pdp__blockchain-desc">This product's authenticity is recorded on the blockchain.</p>
              <code className="pdp__blockchain-id">{product.blockchainId}</code>
            </div>
            <Button as={Link} to="/verify" variant="secondary" size="sm">Verify Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
