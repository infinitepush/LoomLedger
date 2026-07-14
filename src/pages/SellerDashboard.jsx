import { useState } from 'react';
import { Link } from 'react-router';
import { Package, DollarSign, BarChart3, Upload, Plus, TrendingUp, Eye, ShoppingBag, Clock, Star, Settings, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import VerificationBadge from '../components/ui/VerificationBadge';
import './DashboardPage.css';

const stats = [
  { label: 'Total Revenue', value: '₹4,82,500', change: '+12.5%', icon: DollarSign, trend: 'up' },
  { label: 'Orders', value: '48', change: '+8.3%', icon: ShoppingBag, trend: 'up' },
  { label: 'Products Listed', value: '24', change: '+2', icon: Package, trend: 'up' },
  { label: 'Profile Views', value: '1,284', change: '+23.1%', icon: Eye, trend: 'up' },
];

const recentOrders = [
  { id: 'ORD-2025-1847', product: 'Banarasi Silk — Crimson & Gold', customer: 'Priya Sharma', amount: 12500, status: 'Shipped', date: 'Jul 12, 2025' },
  { id: 'ORD-2025-1842', product: 'Chanderi Silk Cotton — Ivory Bloom', customer: 'Ankit Patel', amount: 6800, status: 'Processing', date: 'Jul 11, 2025' },
  { id: 'ORD-2025-1838', product: 'Banarasi Silk — Crimson & Gold', customer: 'Meera Desai', amount: 12500, status: 'Delivered', date: 'Jul 10, 2025' },
  { id: 'ORD-2025-1835', product: 'Kanjivaram Silk — Royal Purple', customer: 'Rahul Gupta', amount: 18500, status: 'Delivered', date: 'Jul 9, 2025' },
];

const myProducts = [
  { name: 'Banarasi Silk — Crimson & Gold', stock: 12, sold: 48, revenue: '₹6,00,000', status: 'Active' },
  { name: 'Kanjivaram Silk — Royal Purple', stock: 5, sold: 22, revenue: '₹4,07,000', status: 'Active' },
  { name: 'Chanderi Silk Cotton — Ivory', stock: 0, sold: 35, revenue: '₹2,38,000', status: 'Out of Stock' },
];

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard" id="seller-dashboard">
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar-header">
          <div className="dashboard__avatar">RV</div>
          <div>
            <p className="dashboard__user-name">Ramesh Vishwakarma</p>
            <p className="dashboard__user-role">Master Weaver</p>
          </div>
          <VerificationBadge size="sm" showLabel={false} />
        </div>
        <nav className="dashboard__nav">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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
            <h1 className="dashboard__title">Seller Dashboard</h1>
            <p className="dashboard__subtitle">Welcome back, Ramesh. Here's your workshop overview.</p>
          </div>
          <Button icon={Plus}>Add Product</Button>
        </div>

        {/* Stats */}
        <div className="dashboard__stats">
          {stats.map((stat, i) => (
            <div className="dashboard__stat-card" key={i}>
              <div className="dashboard__stat-icon"><stat.icon size={20} /></div>
              <div>
                <p className="dashboard__stat-label">{stat.label}</p>
                <p className="dashboard__stat-value">{stat.value}</p>
                <p className="dashboard__stat-change dashboard__stat-change--up">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Recent Orders</h2>
            <button className="dashboard__view-all">View All <ChevronRight size={14} /></button>
          </div>
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td><code className="dashboard__order-id">{order.id}</code></td>
                    <td>{order.product}</td>
                    <td>{order.customer}</td>
                    <td className="dashboard__amount">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td>
                      <Badge
                        variant={order.status === 'Delivered' ? 'success' : order.status === 'Shipped' ? 'indigo' : 'saffron'}
                        size="xs"
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="dashboard__date">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* My Products */}
        <div className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">My Products</h2>
            <Button variant="secondary" size="sm" icon={Plus}>Add New</Button>
          </div>
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myProducts.map((p, i) => (
                  <tr key={i}>
                    <td className="dashboard__product-name">{p.name}</td>
                    <td>{p.stock}</td>
                    <td>{p.sold}</td>
                    <td>{p.revenue}</td>
                    <td>
                      <Badge variant={p.status === 'Active' ? 'success' : 'warning'} size="xs">{p.status}</Badge>
                    </td>
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
