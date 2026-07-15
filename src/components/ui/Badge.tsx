import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'saffron' | 'indigo' | 'success' | 'warning' | 'error' | 'accent';
  size?: 'xs' | 'sm' | 'md';
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  icon: Icon
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-muted text-muted-foreground border-border/80',
    saffron: 'bg-accent-light text-accent border-accent/15',
    indigo: 'bg-indigo-light text-indigo border-indigo/15',
    success: 'bg-success-light text-success border-success/15',
    warning: 'bg-warning-light text-warning border-warning/15',
    error: 'bg-error-light text-error border-error/15',
    accent: 'bg-primary-light text-primary border-primary/15'
  };

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
    sm: 'px-2.5 py-1 text-xs font-semibold',
    md: 'px-3 py-1 text-sm font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1 border rounded-full ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {Icon && <Icon size={size === 'xs' ? 10 : 12} />}
      <span>{children}</span>
    </span>
  );
}
