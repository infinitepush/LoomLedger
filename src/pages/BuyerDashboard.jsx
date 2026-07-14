import { useState } from 'react';
import { ShoppingBag, Heart, Package, ShieldCheck, Star, Settings, ChevronRight, MapPin, Clock } from 'lucide-react';
import Badge from '../components/ui/Badge';
import VerificationBadge from '../components/ui/VerificationBadge';
import './DashboardPage.css';

const orders = [
  { id: 'ORD-2025-1847', product: 'Banarasi Silk — Crimson & Gold', artisan: 'Ramesh Vishwakarma', amount: 12500, status: 'Shipped', date: 'Jul 12, 2025' },
  { id: 'ORD-2025-1820', product: 'Pochampally Ikat — Indigo', artisan: 'Venkata Rao', amount: 5200, status: 'Delivered', date: 'Jul 5, 2025' },
  { id: 'ORD-2025-1798', product: 'Pashmina Shawl — Heritage', artisan: 'Mohammad Dar', amount: 28000, status: 'Delivered', date: 'Jun 28, 2025' },
];

const verifiedPurchases = [
  { product: 'Banarasi Silk — Crimson & Gold', verifiedDate: 'Jul 14, 2025', blockchainId: '0x7a3b...c4e2' },
  { product: 'Pochampally Ikat — Indigo', verifiedDate: 'Jul 6, 2025', blockchainId: '0x3c4d...2d3e' },
];

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard" id="buyer-dashboard">
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar-header">
          <div className="dashboard__avatar">PS</div>
          <div>
            <p className="dashboard__user-name">Priya Sharma</p>
            <p className="dashboard__user-role">Premium Buyer</p>
          </div>
        </div>
        <nav className="dashboard__nav">
          {[
            { id: 'overview', label: 'Overview', icon: ShoppingBag },
            { id: 'orders', label: 'My Orders', icon: Package },
            { id: 'wishlist', label: 'Wishlist', icon: Heart },
            { id: 'verified', label: 'Verified Purchases', icon: ShieldCheck },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              className={`dashboard__nav-item ${activeTab === item.id ? 'dashboard__nav-item--active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="dashboard__main">
        <div className="dashboard__header">
          <div>
            <h1 className="dashboard__title">My Account</h1>
            <p className="dashboard__subtitle">Track orders, manage wishlist, and view verified purchases.</p>
          </div>
        </div>

        <div className="dashboard__stats">
          {[
            { label: 'Total Orders', value: '12', icon: Package },
            { label: 'Wishlist Items', value: '8', icon: Heart },
            { label: 'Verified Purchases', value: '10', icon: ShieldCheck },
            { label: 'Reviews Written', value: '6', icon: Star },
          ].map((stat, i) => (
            <div className="dashboard__stat-card" key={i}>
              <div className="dashboard__stat-icon"><stat.icon size={20} /></div>
              <div>
                <p className="dashboard__stat-label">{stat.label}</p>
                <p className="dashboard__stat-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Recent Orders</h2>
            <button className="dashboard__view-all">View All <ChevronRight size={14} /></button>
          </div>
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr><th>Order ID</th><th>Product</th><th>Artisan</th><th>Amount</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td><code className="dashboard__order-id">{order.id}</code></td>
                    <td>{order.product}</td>
                    <td>{order.artisan}</td>
                    <td className="dashboard__amount">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td><Badge variant={order.status === 'Delivered' ? 'success' : 'indigo'} size="xs">{order.status}</Badge></td>
                    <td className="dashboard__date">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Verified Purchases</h2>
          </div>
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr><th>Product</th><th>Verified Date</th><th>Blockchain ID</th><th>Status</th></tr>
              </thead>
              <tbody>
                {verifiedPurchases.map((vp, i) => (
                  <tr key={i}>
                    <td className="dashboard__product-name">{vp.product}</td>
                    <td className="dashboard__date">{vp.verifiedDate}</td>
                    <td><code className="dashboard__order-id">{vp.blockchainId}</code></td>
                    <td><VerificationBadge size="sm" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
