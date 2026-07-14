import './Skeleton.css';

export function Skeleton({ width, height, radius = 'md', className = '' }) {
  return (
    <div
      className={`skeleton skeleton--${radius} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="skeleton-card">
      <Skeleton height="280px" radius="md" className="skeleton-card__image" />
      <div className="skeleton-card__body">
        <Skeleton width="70%" height="14px" />
        <Skeleton width="50%" height="12px" />
        <div className="skeleton-card__row">
          <Skeleton width="80px" height="16px" />
          <Skeleton width="60px" height="12px" />
        </div>
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="skeleton-category">
      <Skeleton height="160px" radius="md" />
      <Skeleton width="60%" height="14px" />
      <Skeleton width="40%" height="12px" />
    </div>
  );
}
