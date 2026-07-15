"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Package, ShoppingBag, BarChart3, TrendingUp, Settings, LogOut, Plus, 
  Trash2, QrCode, Sparkles, ShieldCheck, ArrowLeft, Upload, FileText, Check 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';
import VerificationBadge from '@/components/ui/VerificationBadge';

function ArtisanProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout, products, addProduct, artisans } = useApp();
  
  const initialUpload = searchParams.get('upload') === 'true';
  const [showUploadWizard, setShowUploadWizard] = useState(initialUpload);
  const [wizardStep, setWizardStep] = useState(1);
  
  // Form states
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Banarasi Silk');
  const [prodPrice, setProdPrice] = useState(6500);
  const [prodDesc, setProdDesc] = useState('');
  const [prodFabric, setProdFabric] = useState('');
  const [prodCraftTime, setProdCraftTime] = useState('');
  const [mockSelectedImage, setMockSelectedImage] = useState('product-banarasi.png');
  const [tags, setTags] = useState<string[]>(['Pure Silk', 'Handwoven']);
  const [specs, setSpecs] = useState<Record<string, string>>({
    'Dye Type': 'Natural Indigo Dye',
    'Loom Type': 'Traditional Throw-shuttle Pit Loom',
    'Zari Grade': 'Pure Silver Plated Thread'
  });
  
  // AI generation loading status
  const [generatingAI, setGeneratingAI] = useState(false);
  const [mintingOnChain, setMintingOnChain] = useState(false);
  const [registeredPassport, setRegisteredPassport] = useState<any | null>(null);

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'artisan') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user]);

  if (!user) return null;

  const currentArtisan = artisans.find(a => a.id === user.id) || artisans[0];
  const artisanProducts = products.filter(p => p.weaver.id === user.id);

  // Trigger Gemini AI generation simulation
  const handleAIGenerate = () => {
    if (!prodName.trim()) {
      alert("Please enter a product title first so Gemini can analyze the style!");
      return;
    }
    setGeneratingAI(true);
    setTimeout(() => {
      setGeneratingAI(false);
      setProdDesc(`An authentic handwoven creation featuring intricate, traditional motifs. Inspired by generational weave patterns, this saree is crafted painstakingly using pure threads, creating a shimmering dual-tone effect suitable for weddings and grand festive celebrations.`);
      setProdFabric("Pure mulberry silk warp and weft");
      setProdCraftTime("18 Days on Loom");
      setSpecs({
        'Dye Type': 'Hand-dyed organic colors',
        'Loom Type': 'Traditional hand-operated wooden loom',
        'Zari Type': 'Tested golden zari borders',
        'Thread Count': '120/2 double ply silk'
      });
      setWizardStep(2);
    }, 1800);
  };

  // Trigger Polygon Minting simulation
  const handleMintPassport = (e: React.FormEvent) => {
    e.preventDefault();
    setMintingOnChain(true);
    
    const randomHash = "0x" + Math.random().toString(16).substring(2, 12).toLowerCase() + "8f9a0c1d2e3f4a5b6c7d8e9f0a1b2c3d";
    
    setTimeout(() => {
      setMintingOnChain(false);
      addProduct({
        name: prodName,
        price: prodPrice,
        originalPrice: Math.round(prodPrice * 1.2),
        category: prodCategory,
        image: mockSelectedImage,
        gallery: [mockSelectedImage],
        description: prodDesc,
        fabric: prodFabric,
        craftTime: prodCraftTime,
        specifications: specs,
        giCertified: currentArtisan.giCertified,
        tags: tags
      });
      
      setRegisteredPassport({
        txHash: randomHash,
        wallet: currentArtisan.walletAddress || "0xArtisanWalletAddress",
        title: prodName,
        price: prodPrice,
        tokenId: `PROD_0${products.length + 1}`
      });
      
      setWizardStep(3);
    }, 2000);
  };

  const resetForm = () => {
    setProdName('');
    setProdCategory('Banarasi Silk');
    setProdPrice(6500);
    setProdDesc('');
    setProdFabric('');
    setProdCraftTime('');
    setWizardStep(1);
    setRegisteredPassport(null);
    setShowUploadWizard(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background flex-grow">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white border-r border-border p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary border border-border shrink-0">
              <Image src="/assets/images/weaver-portrait.png" alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm text-foreground leading-tight">{user.name}</p>
                {currentArtisan?.verified && <ShieldCheck size={14} className="text-success" />}
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">{currentArtisan?.craft}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: BarChart3, path: '/artisan/dashboard' },
              { id: 'products', label: 'My Products', icon: Package, path: '/artisan/products' },
              { id: 'orders', label: 'Orders Received', icon: ShoppingBag, path: '/artisan/orders' },
              { id: 'analytics', label: 'Sales Analytics', icon: TrendingUp, path: '/artisan/analytics' },
              { id: 'settings', label: 'Settings', icon: Settings, path: '/artisan/settings' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-md transition-colors text-left ${
                  item.id === 'products'
                    ? 'bg-primary-light text-primary font-bold'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
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
        
        {showUploadWizard ? (
          /* Step-by-Step Blockchain Upload Wizard */
          <div className="space-y-6">
            <button 
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold"
            >
              <ArrowLeft size={14} />
              <span>Back to Product Listing</span>
            </button>

            <div className="bg-white border border-border rounded-xl p-6 sm:p-8 shadow-sm space-y-8">
              {/* Wizard Title */}
              <div className="border-b border-border pb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-serif font-semibold text-foreground">Mint On-Chain Handloom Passport</h2>
                  <p className="text-xs text-muted-foreground">Register your handwoven masterpiece on the Polygon Amoy test network.</p>
                </div>
                <div className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded">
                  Step {wizardStep} of 3
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-between items-center max-w-md mx-auto relative px-10">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 -z-10" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary -translate-y-1/2 -z-10 transition-all duration-300" style={{ width: `${(wizardStep - 1) * 50}%` }} />
                
                {[1, 2, 3].map(stepNum => (
                  <div 
                    key={stepNum}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                      wizardStep >= stepNum 
                        ? 'bg-primary border-primary text-white' 
                        : 'bg-white border-border text-muted-foreground'
                    }`}
                  >
                    {wizardStep > stepNum ? <Check size={12} /> : stepNum}
                  </div>
                ))}
              </div>

              {/* Step Panels */}
              {wizardStep === 1 && (
                /* Step 1: Basic Info & AI Generation Trigger */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
                  {/* Left Column: inputs */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wide">Product Title / Saree Style</label>
                      <input 
                        type="text"
                        required
                        value={prodName}
                        onChange={e => setProdName(e.target.value)}
                        placeholder="e.g., Kora Silk Banarasi Saree with Silver Brocade"
                        className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wide">Category Cluster</label>
                        <select
                          value={prodCategory}
                          onChange={e => setProdCategory(e.target.value)}
                          className="w-full bg-white border border-border px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                        >
                          <option value="Banarasi Silk">Banarasi Silk</option>
                          <option value="Chanderi Cotton">Chanderi Cotton</option>
                          <option value="Pochampally Ikat">Pochampally Ikat</option>
                          <option value="Sambhalpuri Saree">Sambhalpuri Saree</option>
                          <option value="Bhagalpuri Tussar">Bhagalpuri Tussar</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wide">Target Price (INR)</label>
                        <input 
                          type="number"
                          required
                          value={prodPrice}
                          onChange={e => setProdPrice(Number(e.target.value))}
                          className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                        />
                      </div>
                    </div>

                    {/* Image Selector Mock */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wide">Choose Mock Heritage Image Asset</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          'product-banarasi.png',
                          'product-kanjivaram.png',
                          'product-chanderi.png',
                          'product-ikat.png'
                        ].map(img => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => setMockSelectedImage(img)}
                            className={`relative aspect-square rounded border overflow-hidden transition-all ${
                              mockSelectedImage === img ? 'ring-2 ring-primary border-primary' : 'border-border'
                            }`}
                          >
                            <Image src={`/assets/images/${img}`} alt="Asset swatches" fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <button
                        type="button"
                        onClick={handleAIGenerate}
                        disabled={generatingAI || !prodName.trim()}
                        className="flex-1 py-2.5 bg-foreground text-background font-semibold rounded hover:bg-foreground/95 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {generatingAI ? (
                          <>
                            <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                            <span>Gemini Generating Fabric Specs...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} />
                            <span>Auto-Generate Story & Specs via AI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Information Panel */}
                  <div className="md:col-span-5 bg-secondary/30 border border-border p-6 rounded-lg space-y-4 text-xs text-muted-foreground self-start">
                    <h3 className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                      <Sparkles size={16} className="text-primary" />
                      <span>AI Weaver Storyteller</span>
                    </h3>
                    <p className="leading-relaxed">
                      LoomLedger integrates Gemini AI to extract design hallmarks and craft timelines based on your saree style. 
                    </p>
                    <p className="leading-relaxed">
                      Enter your product title and click "Auto-Generate" to verify features like fiber warp count, zari grade, and loom duration before committing to the ledger.
                    </p>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                /* Step 2: Form edit & review generated specs */
                <form onSubmit={handleMintPassport} className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Inputs Left */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wide">Gemini-Generated Story Excerpt</label>
                        <textarea
                          rows={4}
                          required
                          value={prodDesc}
                          onChange={e => setProdDesc(e.target.value)}
                          className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-foreground uppercase tracking-wide">Fabric Blueprint Composition</label>
                          <input 
                            type="text"
                            required
                            value={prodFabric}
                            onChange={e => setProdFabric(e.target.value)}
                            className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-foreground uppercase tracking-wide">Loom Duration Hours</label>
                          <input 
                            type="text"
                            required
                            value={prodCraftTime}
                            onChange={e => setProdCraftTime(e.target.value)}
                            className="w-full bg-white border border-border px-3.5 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-primary text-foreground"
                          />
                        </div>
                      </div>

                      {/* Specifications Editor */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wide border-b border-border pb-1.5">Lead Loom Specifications</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(specs).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <label className="text-[10px] text-muted-foreground uppercase font-semibold">{key}</label>
                              <input
                                type="text"
                                value={value}
                                onChange={e => {
                                  setSpecs(prev => ({
                                    ...prev,
                                    [key]: e.target.value
                                  }));
                                }}
                                className="w-full bg-white border border-border px-3 py-1.5 rounded text-xs outline-none focus:ring-1 focus:ring-primary text-foreground"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right column details review card */}
                    <div className="md:col-span-5 bg-secondary/20 border border-border rounded-lg overflow-hidden flex flex-col justify-between self-stretch">
                      <div>
                        <div className="relative aspect-[4/3] bg-secondary">
                          <Image src={`/assets/images/${mockSelectedImage}`} alt={prodName} fill className="object-cover" />
                        </div>
                        <div className="p-5 space-y-2">
                          <span className="text-[10px] text-primary uppercase font-bold tracking-widest block">{prodCategory}</span>
                          <h4 className="font-serif font-semibold text-foreground text-base leading-tight">{prodName}</h4>
                          <span className="text-sm font-bold text-foreground block">₹{prodPrice.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      
                      <div className="p-5 bg-white border-t border-border space-y-1 text-center text-xs">
                        <span className="text-[9px] uppercase font-bold tracking-wide text-success flex items-center justify-center gap-1">
                          <ShieldCheck size={12} />
                          <span>GI Verified Blueprint Locked</span>
                        </span>
                        <p className="text-[10px] text-muted-foreground">Artisan ID: {currentArtisan.id}</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-6 border-t border-border flex gap-4">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="px-6 py-2.5 border border-border rounded text-sm font-semibold hover:bg-secondary transition-colors"
                    >
                      Back to Step 1
                    </button>
                    
                    <button
                      type="submit"
                      disabled={mintingOnChain}
                      className="flex-grow py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary-hover transition-colors text-sm flex items-center justify-center gap-2 shadow disabled:opacity-50"
                    >
                      {mintingOnChain ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Deploying Digital Passport to Polygon Network...</span>
                        </>
                      ) : (
                        <>
                          <QrCode size={16} />
                          <span>Register On-Chain & Mint Passport</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {wizardStep === 3 && registeredPassport && (
                /* Step 3: Success Modal with Transaction Hash and QR code */
                <div className="text-center py-6 space-y-6 max-w-lg mx-auto">
                  <div className="w-14 h-14 rounded-full bg-success-light text-success flex items-center justify-center mx-auto shadow-sm">
                    <ShieldCheck size={32} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-success bg-success-light px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                      Immutable Record Minted Successfully
                    </span>
                    <h3 className="text-2xl font-serif font-semibold text-foreground">Digital Product Passport Active</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Saree metadata is locked on the Polygon Amoy network. An automated QR code passport has been minted.
                    </p>
                  </div>

                  <div className="bg-secondary/40 border border-border rounded-lg p-5 text-left text-xs space-y-3.5">
                    <div className="flex justify-between items-center py-1.5 border-b border-border">
                      <span className="text-muted-foreground font-medium">Product ID</span>
                      <span className="font-bold text-foreground">{registeredPassport.tokenId}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border">
                      <span className="text-muted-foreground font-medium">Minting Status</span>
                      <span className="font-bold text-success flex items-center gap-1">
                        <Check size={12} />
                        <span>Polygon Confirmed</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border">
                      <span className="text-muted-foreground font-medium">Artisan Signature Wallet</span>
                      <code className="text-[10px] font-mono text-foreground font-bold">{registeredPassport.wallet}</code>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">On-Chain Transaction Block Hash</span>
                      <code className="text-[10px] font-mono text-muted-foreground break-all bg-white border border-border p-2 rounded block">
                        {registeredPassport.txHash}
                      </code>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-muted-foreground font-semibold flex items-center gap-1">
                        <QrCode size={14} className="text-primary" />
                        <span>Verifiable Tag Generated</span>
                      </span>
                      <QrCode size={48} className="text-foreground border border-border rounded p-0.5 bg-white" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={resetForm}
                      className="w-full py-2.5 bg-foreground text-background text-sm font-semibold rounded hover:bg-foreground/95 transition-all shadow"
                    >
                      Exit Passport Wizard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Default Product Listing Workspace view */
          <div className="space-y-6">
            <div className="flex justify-between items-baseline">
              <div>
                <h1 className="text-2xl font-serif font-semibold text-foreground">Workshop Product Listings</h1>
                <p className="text-xs text-muted-foreground">Manage details and block verification states of your active sarees.</p>
              </div>
              <button
                onClick={() => setShowUploadWizard(true)}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover shadow flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Add Saree</span>
              </button>
            </div>

            {artisanProducts.length === 0 ? (
              <div className="bg-white border border-border p-16 rounded-xl text-center space-y-4 shadow-sm">
                <span className="text-3xl">🧶</span>
                <h3 className="font-semibold text-foreground">No Products Listed</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">Upload and mint your first handloom masterpiece to list it on LoomLedger.</p>
                <button
                  onClick={() => setShowUploadWizard(true)}
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover shadow"
                >
                  Create Digital Passport
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {artisanProducts.map(product => (
                  <article 
                    key={product.id} 
                    className="bg-white border border-border rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-sm transition-shadow h-full"
                  >
                    <div className="space-y-4">
                      <div className="relative aspect-[16/10] bg-secondary">
                        <Image src={`/assets/images/${product.image}`} alt={product.name} fill className="object-cover" />
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          {product.verified && <VerificationBadge size="sm" showLabel={false} />}
                          {product.giCertified && <Badge variant="saffron" size="xs">GI Certified</Badge>}
                        </div>
                      </div>
                      
                      <div className="px-5 space-y-1">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{product.category}</span>
                        <h4 className="font-serif font-semibold text-sm sm:text-base text-foreground line-clamp-1">{product.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{product.description}</p>
                      </div>
                    </div>

                    <div className="px-5 py-4 mt-4 border-t border-border flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-muted-foreground block">Price</span>
                        <span className="font-bold text-foreground text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-muted-foreground block">Minted Block Hash</span>
                        <code className="text-[10px] font-mono text-primary font-bold">{product.blockchainId.substring(0, 12)}...</code>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

export default function ArtisanProductsPage() {
  return (
    <React.Suspense fallback={<div className="py-20 text-center text-xs text-muted-foreground">Loading products workspace...</div>}>
      <ArtisanProductsContent />
    </React.Suspense>
  );
}
