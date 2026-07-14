import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import categories from '../../data/categories.json';
import './CategoryGrid.css';

const imageModules = import.meta.glob('../../assets/images/*.png', { eager: true });

function getImage(filename) {
  const key = Object.keys(imageModules).find(k => k.endsWith(filename));
  return key ? imageModules[key].default : '';
}

export default function CategoryGrid() {
  return (
    <section className="section categories" id="categories-section">
      <div className="container">
        <div className="section-header">
          <span className="section-header__eyebrow">Shop by Craft</span>
          <h2 className="section-header__title">Explore Handloom Traditions</h2>
          <p className="section-header__subtitle">
            Each region of India tells its own textile story. Discover the craft that speaks to you.
          </p>
        </div>
        <div className="categories__grid">
          {categories.map((cat, i) => (
            <Link
              to={`/marketplace?cat=${cat.slug}`}
              className={`category-card ${i < 2 ? 'category-card--featured' : ''}`}
              key={cat.id}
              id={`category-${cat.slug}`}
            >
              <div className="category-card__image-wrap">
                <img
                  src={getImage(cat.image)}
                  alt={cat.name}
                  className="category-card__image"
                  loading="lazy"
                />
                <div className="category-card__overlay" />
              </div>
              <div className="category-card__content">
                <h3 className="category-card__title">{cat.name}</h3>
                <p className="category-card__region">{cat.region}</p>
                <span className="category-card__count">{cat.productCount} products</span>
              </div>
              <ArrowRight size={16} className="category-card__arrow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
