"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, Users, Package, Award, CheckCircle, XCircle, LogOut, 
  ArrowRight, Search, Check, X, RefreshCw, Trash2 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import Badge from '@/components/ui/Badge';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, logout, artisans, approveArtisan, rejectArtisan, deleteArtisan, products, orders, loadGlobalData } = useApp();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'admin') {
      router.push(`/${user.role}/dashboard`);
    } else {
      loadGlobalData();
    }
  }, [user]);

  if (!user) return null;

  // Filter artisans in review queue
  const pendingArtisans = artisans.filter(art => !art.verified);
  const activeArtisans = artisans.filter(art => art.verified);

  const filteredPending = pendingArtisans.filter(art => {
    const name = art.user?.name || art.name || '';
    const craft = art.craft || '';
    const region = art.region || art.district || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      craft.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      await approveArtisan(id);
      showToast('Artisan approved and registered on-chain!', 'success');
      loadGlobalData();
    } catch (err: any) {
      showToast(err.message || 'Approval failed', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setProcessingId(id);
    try {
      await rejectArtisan(id);
      showToast('Artisan application rejected', 'info');
      loadGlobalData();
    } catch (err: any) {
      showToast(err.message || 'Rejection failed', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete artisan "${name}"?\nThis will PERMANENTLY remove this weaver and ALL their listed products from the marketplace database.`)) {
      return;
    }
    setProcessingId(id);
    try {
      await deleteArtisan(id);
      showToast(`Artisan "${name}" and all their listed products were deleted successfully.`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete artisan', 'error');
    } finally {
      setProcessingId(null);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background flex-grow">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white border-r border-border p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-tight">Admin Console</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">Control Panel</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-md bg-primary-light text-primary text-left"
            >
              <ShieldCheck size={18} />
              <span>Moderation Queue</span>
            </button>
            <Link
              href="/marketplace"
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground text-left"
            >
              <Package size={18} />
              <span>Catalog Audit</span>
            </Link>
          </nav>
        </div>

        <button
          onClick={() => { logout(); router.push('/login'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-error hover:bg-error-light/30 rounded-md transition-colors text-left mt-6"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 sm:p-10 max-w-5xl space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">Registry Moderation & Artisan Management</h1>
          <p className="text-xs text-muted-foreground">Approve weaver applications, manage verified artisans, or purge accounts & associated products.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: 'Pending Reviews', value: pendingArtisans.length, icon: ShieldCheck, color: 'text-warning bg-warning-light' },
            { label: 'Verified Artisans', value: activeArtisans.length, icon: Users, color: 'text-success bg-success-light' },
            { label: 'Total Handlooms', value: products.length, icon: Package, color: 'text-primary bg-primary-light' },
            { label: 'Platform Orders', value: orders.length, icon: Award, color: 'text-indigo bg-indigo-light' }
          ].map((stat, i) => (
            <div className="bg-white border border-border p-5 rounded-lg flex items-center gap-4 shadow-xs" key={i}>
              <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">{stat.label}</span>
                <span className="text-xl font-bold text-foreground mt-0.5 block">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Moderation Queue */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border pb-4">
            <h3 className="font-serif font-semibold text-lg text-foreground">Weaver Applications ({pendingArtisans.length})</h3>
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search pending applications..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-border pl-9 pr-4 py-1.5 rounded text-xs outline-none focus:ring-1 focus:ring-primary text-foreground"
              />
            </div>
          </div>

          {filteredPending.length === 0 ? (
            <div className="bg-white border border-border p-12 rounded-xl text-center space-y-3">
              <CheckCircle size={32} className="text-success mx-auto" />
              <h3 className="font-semibold text-foreground">Moderation Queue Clear</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">There are no pending artisan profiles awaiting on-chain deployment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPending.map(artisan => {
                const name = artisan.user?.name || artisan.name || 'Weaver';
                return (
                  <div 
                    key={artisan.id}
                    className="bg-white border border-border rounded-lg p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-4 flex-grow">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif font-semibold text-base text-foreground">{name}</h4>
                            <span className="text-[10px] text-muted-foreground font-mono">{artisan.id.substring(0, 8)}...</span>
                          </div>
                          <p className="text-xs text-primary font-semibold">{artisan.craft} · {artisan.experience}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Origin Cluster: {artisan.region || artisan.district}</p>
                        </div>

                        {artisan.giCertified && (
                          <Badge variant="saffron" size="sm">GI Registered: {artisan.giNumber}</Badge>
                        )}
                      </div>

                      <div className="text-xs space-y-1 bg-secondary/30 p-3.5 rounded border border-border/70">
                        <span className="font-bold text-foreground">Studio Heritage Narrative:</span>
                        <p className="text-muted-foreground leading-relaxed">{artisan.bio}</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Email</span>
                          <span className="font-semibold text-foreground">{artisan.user?.email || artisan.email}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Phone</span>
                          <span className="font-semibold text-foreground">{artisan.user?.phone || artisan.phone}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">GI Certification Status</span>
                          <span className="font-semibold text-accent">{artisan.giCertified ? 'Valid GI Holder' : 'Self-declared Weaver'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 justify-center shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-border">
                      <button
                        onClick={() => handleApprove(artisan.id)}
                        disabled={processingId === artisan.id}
                        className="flex-1 px-4 py-2 bg-success text-white text-xs font-semibold rounded hover:bg-success-hover flex items-center justify-center gap-1.5 shadow disabled:opacity-50"
                      >
                        {processingId === artisan.id ? (
                          <RefreshCw size={12} className="animate-spin" />
                        ) : (
                          <Check size={14} />
                        )}
                        <span>Approve & Mint ID</span>
                      </button>
                      <button
                        onClick={() => handleReject(artisan.id)}
                        disabled={processingId === artisan.id}
                        className="flex-1 px-4 py-2 border border-border text-muted-foreground hover:text-error hover:border-error hover:bg-error-light/10 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <X size={14} />
                        <span>Reject Profile</span>
                      </button>
                      <button
                        onClick={() => handleDelete(artisan.id, name)}
                        disabled={processingId === artisan.id}
                        className="flex-1 px-4 py-2 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        <span>Delete Artisan</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All Verified Artisans Directory & Management */}
        <div className="space-y-4 pt-6">
          <div className="border-b border-border pb-4">
            <h3 className="font-serif font-semibold text-lg text-foreground">Registered Verified Artisans ({activeArtisans.length})</h3>
            <p className="text-xs text-muted-foreground">Manage active weavers on the platform. Deleting an artisan will purge all their listed products from the marketplace.</p>
          </div>

          {activeArtisans.length === 0 ? (
            <div className="bg-white border border-border p-8 rounded-xl text-center text-xs text-muted-foreground">
              No registered artisans currently in the active directory.
            </div>
          ) : (
            <div className="bg-white border border-border rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/40 border-b border-border">
                  <tr>
                    <th className="p-3.5 font-bold text-foreground">Weaver Name</th>
                    <th className="p-3.5 font-bold text-foreground">Craft Specialty</th>
                    <th className="p-3.5 font-bold text-foreground">Region</th>
                    <th className="p-3.5 font-bold text-foreground">Listed Products</th>
                    <th className="p-3.5 font-bold text-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {activeArtisans.map(artisan => {
                    const name = artisan.user?.name || artisan.name || 'Weaver';
                    const artisanProdsCount = products.filter(p => (p as any).artisanId === artisan.id || (p.weaver && p.weaver.id === artisan.id)).length;
                    return (
                      <tr key={artisan.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-3.5 font-semibold text-foreground">
                          <Link href={`/artisan/${artisan.id}`} className="hover:text-primary underline">
                            {name}
                          </Link>
                        </td>
                        <td className="p-3.5 text-muted-foreground">{artisan.craft || 'Handloom'}</td>
                        <td className="p-3.5 text-muted-foreground">{artisan.region || artisan.district || 'India'}</td>
                        <td className="p-3.5 font-semibold text-primary">{artisanProdsCount} products</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleDelete(artisan.id, name)}
                            disabled={processingId === artisan.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded text-xs font-semibold transition-colors disabled:opacity-50"
                          >
                            <Trash2 size={13} />
                            <span>Delete Artisan & Products</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
