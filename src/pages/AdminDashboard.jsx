import { useState } from 'react';
import { Users, Package, ShieldCheck, BarChart3, Settings, ChevronRight, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import './DashboardPage.css';

const stats = [
  { label: 'Total Users', value: '5,842', change: '+124 this month', icon: Users },
  { label: 'Verified Artisans', value: '3,218', change: '+42 pending', icon: ShieldCheck },
  { label: 'Listed Products', value: '12,456', change: '+186 this week', icon: Package },
  { label: 'Verification Rate', value: '94.2%', change: '+1.8%', icon: BarChart3 },
];

const pendingArtisans = [
  { name: 'Sunita Devi', region: 'Bhagalpur, Bihar', craft: 'Tussar Silk', applied: 'Jul 13, 2025', docs: 'Complete' },
  { name: 'Kabir Khan', region: 'Lucknow, UP', craft: 'Chikankari', applied: 'Jul 12, 2025', docs: 'Complete' },
  { name: 'Deepa Nair', region: 'Trivandrum, Kerala', craft: 'Kasavu Saree', applied: 'Jul 11, 2025', docs: 'Incomplete' },
];

const pendingProducts = [
  { name: 'Tussar Silk Saree — Natural Gold', artisan: 'Sunita Devi', submitted: 'Jul 13, 2025', giClaim: true },
  { name: 'Chikankari Kurta — White Pearl', artisan: 'Kabir Khan', submitted: 'Jul 12, 2025', giClaim: false },
];

const flaggedItems = [
  { product: 'Pashmina Shawl — Kashmir Blue', reason: 'Possible machine-made', reported: 'Jul 10, 2025', severity: 'High' },
  { product: 'Silk Saree — Generic Label', reason: 'Missing GI documentation', reported: 'Jul 9, 2025', severity: 'Medium' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard" id="admin-dashboard">
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar-header">
          <div className="dashboard__avatar" style={{ backgroundColor: 'var(--color-indigo-light)', color: 'var(--color-indigo)' }}>AD</div>
          <div>
            <p className="dashboard__user-name">Admin Panel</p>
            <p className="dashboard__user-role">Super Admin</p>
          </div>
        </div>
        <nav className="dashboard__nav">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'artisans', label: 'Verify Artisans', icon: ShieldCheck },
            { id: 'products', label: 'Approve Products', icon: Package },
            { id: 'users', label: 'User Management', icon: Users },
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
            <h1 className="dashboard__title">Admin Dashboard</h1>
            <p className="dashboard__subtitle">Platform overview and moderation tools.</p>
          </div>
        </div>

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

        {/* Pending Artisan Verifications */}
        <div className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Pending Artisan Verifications</h2>
            <Badge variant="saffron" size="sm">{pendingArtisans.length} pending</Badge>
          </div>
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr><th>Name</th><th>Region</th><th>Craft</th><th>Applied</th><th>Docs</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {pendingArtisans.map((a, i) => (
                  <tr key={i}>
                    <td className="dashboard__product-name">{a.name}</td>
                    <td>{a.region}</td>
                    <td>{a.craft}</td>
                    <td className="dashboard__date">{a.applied}</td>
                    <td><Badge variant={a.docs === 'Complete' ? 'success' : 'warning'} size="xs">{a.docs}</Badge></td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button variant="primary" size="sm" icon={CheckCircle}>Approve</Button>
                        <Button variant="ghost" size="sm" icon={XCircle}>Reject</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Product Approvals */}
        <div className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Pending Product Approvals</h2>
            <Badge variant="indigo" size="sm">{pendingProducts.length} pending</Badge>
          </div>
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr><th>Product</th><th>Artisan</th><th>Submitted</th><th>GI Claim</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {pendingProducts.map((p, i) => (
                  <tr key={i}>
                    <td className="dashboard__product-name">{p.name}</td>
                    <td>{p.artisan}</td>
                    <td className="dashboard__date">{p.submitted}</td>
                    <td>{p.giClaim ? <Badge variant="saffron" size="xs">Yes</Badge> : <Badge variant="default" size="xs">No</Badge>}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button variant="primary" size="sm" icon={CheckCircle}>Approve</Button>
                        <Button variant="ghost" size="sm" icon={XCircle}>Reject</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Flagged Items */}
        <div className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Flagged Items</h2>
            <Badge variant="accent" size="sm" icon={AlertTriangle}>{flaggedItems.length} flags</Badge>
          </div>
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr><th>Product</th><th>Reason</th><th>Reported</th><th>Severity</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {flaggedItems.map((f, i) => (
                  <tr key={i}>
                    <td className="dashboard__product-name">{f.product}</td>
                    <td>{f.reason}</td>
                    <td className="dashboard__date">{f.reported}</td>
                    <td><Badge variant={f.severity === 'High' ? 'accent' : 'warning'} size="xs">{f.severity}</Badge></td>
                    <td><Button variant="secondary" size="sm">Review</Button></td>
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
