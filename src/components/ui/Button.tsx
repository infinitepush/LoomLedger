import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  iconPosition?: 'left' | 'right';
  as?: any;
  href?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  as: Component = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-sm',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-border active:bg-border-strong',
    outline: 'border border-border bg-white text-foreground hover:bg-secondary hover:text-foreground',
    ghost: 'text-muted-foreground hover:bg-secondary hover:text-foreground',
    link: 'text-primary p-0 bg-transparent hover:underline'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}

      {!loading && Icon && iconPosition === 'left' && (
        <Icon size={size === 'sm' ? 14 : 16} className="mr-1.5 shrink-0" />
      )}

      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <Icon size={size === 'sm' ? 14 : 16} className="ml-1.5 shrink-0" />
      )}
    </Component>
  );
}
