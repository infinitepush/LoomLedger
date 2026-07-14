import { Link } from 'react-router';
import { Heart, ArrowRight } from 'lucide-react';
import VerificationBadge from '../ui/VerificationBadge';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import products from '../../data/products.json';
import './FeaturedProducts.css';

const imageModules = import.meta.glob('../../assets/images/*.png', { eager: true });

function getImage(filename) {
  const key = Object.keys(imageModules).find(k => k.endsWith(filename));
  return key ? imageModules[key].default : '';
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function ProductCard({ product }) {
  const { toggleItem, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);

  return (
    <article className="product-card" id={`product-${product.id}`}>
      <Link to={`/product/${product.slug}`} className="product-card__image-link">
        <div className="product-card__image-wrap">
          <img
            src={getImage(product.image)}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
          <button
            className={`product-card__wishlist ${wishlisted ? 'product-card__wishlist--active' : ''}`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleItem(product); }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          {product.originalPrice > product.price && (
            <span className="product-card__discount">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% off
            </span>
          )}
        </div>
      </Link>
      <div className="product-card__body">
        <div className="product-card__meta">
          {product.verified && <VerificationBadge size="sm" />}
          <Badge variant="default" size="xs">{product.category}</Badge>
        </div>
        <Link to={`/product/${product.slug}`} className="product-card__title-link">
          <h3 className="product-card__title">{product.name}</h3>
        </Link>
        <p className="product-card__weaver">by {product.weaver.name}</p>
        <p className="product-card__region">{product.region}</p>
        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="product-card__original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="product-card__rating">
            <span className="product-card__star">★</span>
            <span>{product.rating}</span>
            <span className="product-card__review-count">({product.reviewCount})</span>
          </div>
        </div>
        <button
          className="product-card__add-btn"
          onClick={() => addItem(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="section featured" id="featured-section">
      <div className="container">
        <div className="featured__header">
          <div className="section-header">
            <span className="section-header__eyebrow">Curated Selection</span>
            <h2 className="section-header__title">Featured Products</h2>
            <p className="section-header__subtitle">
              Hand-picked by our curation team. Each piece is verified for authenticity and craftsmanship.
            </p>
          </div>
          <Button as={Link} to="/marketplace" variant="secondary" icon={ArrowRight} iconPosition="right">
            View All Products
          </Button>
        </div>
        <div className="featured__grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
