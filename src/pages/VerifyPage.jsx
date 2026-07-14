import { useState } from 'react';
import { ShieldCheck, QrCode, Hash, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import './VerifyPage.css';

export default function VerifyPage() {
  const [method, setMethod] = useState('qr');
  const [productId, setProductId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    setVerifying(true);
    setResult(null);
    setTimeout(() => {
      setVerifying(false);
      setResult({
        verified: true,
        productName: 'Banarasi Silk Saree — Crimson & Gold',
        artisan: 'Ramesh Vishwakarma',
        region: 'Varanasi, Uttar Pradesh',
        blockchainId: '0x7a3b9c1d2e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
        timestamp: new Date().toISOString(),
        giCertified: true,
      });
    }, 2000);
  };

  return (
    <div className="verify" id="verify-page">
      <div className="verify__header">
        <div className="container">
          <div className="verify__header-content">
            <Badge variant="success" size="sm" icon={ShieldCheck}>Product Verification</Badge>
            <h1 className="verify__title">Verify Authenticity</h1>
            <p className="verify__subtitle">
              Check if your handloom product is genuine using our blockchain-backed verification system. 
              Scan the QR code or enter the Product ID.
            </p>
          </div>
        </div>
      </div>

      <div className="container container--narrow">
        {/* Method Tabs */}
        <div className="verify__methods">
          <button
            className={`verify__method ${method === 'qr' ? 'verify__method--active' : ''}`}
            onClick={() => setMethod('qr')}
          >
            <QrCode size={18} />
            <span>QR Code Scan</span>
          </button>
          <button
            className={`verify__method ${method === 'id' ? 'verify__method--active' : ''}`}
            onClick={() => setMethod('id')}
          >
            <Hash size={18} />
            <span>Product ID</span>
          </button>
          <button
            className={`verify__method ${method === 'blockchain' ? 'verify__method--active' : ''}`}
            onClick={() => setMethod('blockchain')}
          >
            <ShieldCheck size={18} />
            <span>Blockchain Hash</span>
          </button>
        </div>

        {/* Input Area */}
        <div className="verify__input-area">
          {method === 'qr' ? (
            <div className="verify__qr-zone">
              <div className="verify__qr-placeholder">
                <QrCode size={48} />
                <p>Point your camera at the product's QR code</p>
                <p className="verify__qr-note">Or upload a photo of the QR code</p>
                <Button variant="secondary" size="sm">Upload QR Image</Button>
              </div>
            </div>
          ) : (
            <form className="verify__form" onSubmit={handleVerify}>
              <label className="verify__label">
                {method === 'id' ? 'Product ID' : 'Blockchain Transaction Hash'}
              </label>
              <div className="verify__input-group">
                <Search size={18} className="verify__input-icon" />
                <input
                  type="text"
                  value={productId}
                  onChange={e => setProductId(e.target.value)}
                  placeholder={method === 'id' ? 'e.g., PROD-BAN-2025-001' : 'e.g., 0x7a3b9c1d...'}
                  className="verify__input"
                  id="verify-input"
                />
              </div>
              <Button type="submit" size="lg" fullWidth loading={verifying} icon={ShieldCheck}>
                {verifying ? 'Verifying...' : 'Verify Product'}
              </Button>
            </form>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className={`verify__result ${result.verified ? 'verify__result--success' : 'verify__result--fail'}`}>
            <div className="verify__result-icon">
              {result.verified ? <CheckCircle size={32} /> : <XCircle size={32} />}
            </div>
            <h3 className="verify__result-title">
              {result.verified ? 'Product Verified ✓' : 'Verification Failed'}
            </h3>
            <p className="verify__result-desc">
              {result.verified
                ? 'This product is authentic and its provenance is verified on the blockchain.'
                : 'We could not verify this product. It may be counterfeit or not registered on our platform.'}
            </p>

            {result.verified && (
              <div className="verify__result-details">
                <div className="verify__result-row">
                  <span className="verify__result-label">Product</span>
                  <span className="verify__result-value">{result.productName}</span>
                </div>
                <div className="verify__result-row">
                  <span className="verify__result-label">Artisan</span>
                  <span className="verify__result-value">{result.artisan}</span>
                </div>
                <div className="verify__result-row">
                  <span className="verify__result-label">Region</span>
                  <span className="verify__result-value">{result.region}</span>
                </div>
                <div className="verify__result-row">
                  <span className="verify__result-label">Blockchain ID</span>
                  <code className="verify__result-hash">{result.blockchainId}</code>
                </div>
                <div className="verify__result-row">
                  <span className="verify__result-label">GI Certified</span>
                  <Badge variant="saffron" size="xs">Yes</Badge>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
