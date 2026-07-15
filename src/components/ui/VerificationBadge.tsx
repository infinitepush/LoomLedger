import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function VerificationBadge({
  size = 'sm',
  showLabel = true
}: VerificationBadgeProps) {
  const sizeMap = {
    sm: { icon: 14, text: 'text-[10px]' },
    md: { icon: 16, text: 'text-xs' },
    lg: { icon: 20, text: 'text-sm' }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success-light border border-success/15 text-success font-bold ${sizeMap[size].text}`}>
      <ShieldCheck size={sizeMap[size].icon} className="fill-success/10" />
      {showLabel && <span>Verified Handloom</span>}
    </span>
  );
}
