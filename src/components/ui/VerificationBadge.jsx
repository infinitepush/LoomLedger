import { ShieldCheck } from 'lucide-react';
import './VerificationBadge.css';

export default function VerificationBadge({ size = 'sm', showLabel = true }) {
  return (
    <span className={`verification-badge verification-badge--${size}`}>
      <ShieldCheck size={size === 'sm' ? 14 : size === 'md' ? 16 : 20} />
      {showLabel && <span>Verified</span>}
    </span>
  );
}
