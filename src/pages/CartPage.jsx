import { Link } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const imageModules = import.meta.glob('../assets/images/*.png', { eager: true });
function getImage(filename) {
  const key = Object.keys(imageModules).find(k => k.endsWith(filename));
  return key ? imageModules[key].default : '';
}
function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
}

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty" id="cart-page">
        <div className="container container--narrow">
          <div className="cart-empty__content">
            <ShoppingBag size={48} strokeWidth={1} />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any handloom treasures yet.</p>
            <Button as={Link} to="/marketplace" icon={ArrowRight} iconPosition="right">
              Browse Marketplace
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const shipping = total >= 5000 ? 0 : 299;
  const grandTotal = total + shipping;

  return (
    <div className="cart" id="cart-page">
      <div className="container">
        <div className="cart__header">
          <h1 className="cart__title">Shopping Cart</h1>
          <span className="cart__count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="cart__grid">
          <div className="cart__items">
            {items.map(item => (
              <div className="cart__item" key={item.id}>
                <Link to={`/product/${item.slug}`} className="cart__item-image-link">
                  <img src={getImage(item.image)} alt={item.name} className="cart__item-image" />
                </Link>
                <div className="cart__item-info">
                  <Link to={`/product/${item.slug}`} className="cart__item-name">{item.name}</Link>
                  <p className="cart__item-meta">by {item.weaver.name} · {item.region}</p>
                  <div className="cart__item-bottom">
                    <div className="cart__qty">
                      <button className="cart__qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                      <span className="cart__qty-value">{item.quantity}</span>
                      <button className="cart__qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                    </div>
                    <span className="cart__item-price">{formatPrice(item.price * item.quantity)}</span>
                    <button className="cart__remove" onClick={() => removeItem(item.id)} aria-label="Remove item"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart__summary">
            <h3 className="cart__summary-title">Order Summary</h3>
            <div className="cart__summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="cart__summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="cart__free-shipping">Free</span> : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="cart__shipping-note">Free shipping on orders above ₹5,000</p>
            )}
            <div className="cart__summary-total">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
            <Button size="lg" fullWidth icon={ArrowRight} iconPosition="right">
              Proceed to Checkout
            </Button>
            <div className="cart__trust">
              <div className="cart__trust-item"><ShieldCheck size={14} /><span>Secure Checkout</span></div>
              <div className="cart__trust-item"><Truck size={14} /><span>Tracked Delivery</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
