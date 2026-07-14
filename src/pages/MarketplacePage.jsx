import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search, SlidersHorizontal, X, Heart, ChevronDown } from 'lucide-react';
import VerificationBadge from '../components/ui/VerificationBadge';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';
import categories from '../data/categories.json';
import './MarketplacePage.css';

const imageModules = import.meta.glob('../assets/images/*.png', { eager: true });
function getImage(filename) {
  const key = Object.keys(imageModules).find(k => k.endsWith(filename));
  return key ? imageModules[key].default : '';
}
function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
}

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Newest', value: 'newest' },
];

export default function MarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const { toggleItem, isWishlisted } = useWishlist();
  const { addItem } = useCart();

  const activeCategory = searchParams.get('cat') || '';

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory) {
      result = result.filter(p => p.categorySlug === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.weaver.name.toLowerCase().includes(q)
      );
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [activeCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="marketplace" id="marketplace-page">
      {/* Header */}
      <div className="marketplace__header">
        <div className="container">
          <h1 className="marketplace__title">Marketplace</h1>
          <p className="marketplace__subtitle">Browse our curated collection of verified handloom textiles from across India</p>
        </div>
      </div>

      <div className="container">
        <div className="marketplace__toolbar">
          {/* Search */}
          <div className="marketplace__search">
            <Search size={18} className="marketplace__search-icon" />
            <input
              type="search"
              placeholder="Search products, artisans, regions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="marketplace__search-input"
              id="marketplace-search"
            />
          </div>

          {/* Category Pills */}
          <div className="marketplace__categories">
            <button
              className={`marketplace__cat-pill ${!activeCategory ? 'marketplace__cat-pill--active' : ''}`}
              onClick={() => setSearchParams({})}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                className={`marketplace__cat-pill ${activeCategory === cat.slug ? 'marketplace__cat-pill--active' : ''}`}
                onClick={() => setSearchParams({ cat: cat.slug })}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & Filter */}
          <div className="marketplace__controls">
            <div className="marketplace__sort">
              <label htmlFor="sort-select" className="marketplace__sort-label">Sort by</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="marketplace__sort-select"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <span className="marketplace__count">{filtered.length} products</span>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="marketplace__empty" id="marketplace-empty">
            <div className="marketplace__empty-icon">🧶</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <Button onClick={() => { setSearchQuery(''); setSearchParams({}); }}>Clear Filters</Button>
          </div>
        ) : (
          <div className="marketplace__grid">
            {filtered.map(product => (
              <article className="product-card" key={product.id} id={`mp-${product.id}`}>
                <Link to={`/product/${product.slug}`} className="product-card__image-link">
                  <div className="product-card__image-wrap">
                    <img src={getImage(product.image)} alt={product.name} className="product-card__image" loading="lazy" />
                    <button
                      className={`product-card__wishlist ${isWishlisted(product.id) ? 'product-card__wishlist--active' : ''}`}
                      onClick={e => { e.preventDefault(); e.stopPropagation(); toggleItem(product); }}
                      aria-label="Toggle wishlist"
                    >
                      <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    {product.originalPrice > product.price && (
                      <span className="product-card__discount">{Math.round((1 - product.price / product.originalPrice) * 100)}% off</span>
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
                  <button className="product-card__add-btn" onClick={() => addItem(product)}>Add to Cart</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
