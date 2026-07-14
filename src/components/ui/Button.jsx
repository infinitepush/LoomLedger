import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  as: Component = 'button',
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full',
    loading && 'btn--loading',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <span className="btn__spinner" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="28" strokeDashoffset="8" />
          </svg>
        </span>
      )}
      {Icon && iconPosition === 'left' && !loading && <Icon size={size === 'sm' ? 14 : 16} className="btn__icon" />}
      {children && <span className="btn__label">{children}</span>}
      {Icon && iconPosition === 'right' && !loading && <Icon size={size === 'sm' ? 14 : 16} className="btn__icon" />}
    </Component>
  );
}
