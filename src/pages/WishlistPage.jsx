import { Link } from 'react-router';
import { Heart, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import VerificationBadge from '../components/ui/VerificationBadge';
import Badge from '../components/ui/Badge';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './WishlistPage.css';

const imageModules = import.meta.glob('../assets/images/*.png', { eager: true });
function getImage(filename) {
  const key = Object.keys(imageModules).find(k => k.endsWith(filename));
  return key ? imageModules[key].default : '';
}
function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
}

export default function WishlistPage() {
  const { items, toggleItem } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="wishlist-empty" id="wishlist-page">
        <div className="container container--narrow">
          <div className="wishlist-empty__content">
            <Heart size={48} strokeWidth={1} />
            <h2>Your wishlist is empty</h2>
            <p>Save handloom pieces you love and come back to them later.</p>
            <Button as={Link} to="/marketplace" icon={ArrowRight} iconPosition="right">
              Browse Marketplace
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist" id="wishlist-page">
      <div className="container">
        <h1 className="wishlist__title">Wishlist</h1>
        <p className="wishlist__count">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
        <div className="wishlist__grid">
          {items.map(product => (
            <article className="product-card" key={product.id}>
              <Link to={`/product/${product.slug}`} className="product-card__image-link">
                <div className="product-card__image-wrap">
                  <img src={getImage(product.image)} alt={product.name} className="product-card__image" loading="lazy" />
                  <button
                    className="product-card__wishlist product-card__wishlist--active"
                    onClick={e => { e.preventDefault(); e.stopPropagation(); toggleItem(product); }}
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
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
                <div className="product-card__footer">
                  <span className="product-card__price">{formatPrice(product.price)}</span>
                </div>
                <button className="product-card__add-btn" onClick={() => addItem(product)}>Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
