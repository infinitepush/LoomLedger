import './Badge.css';

export default function Badge({ children, variant = 'default', size = 'sm', icon: Icon, className = '' }) {
  const classes = ['badge', `badge--${variant}`, `badge--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      {Icon && <Icon size={size === 'xs' ? 10 : 12} />}
      {children}
    </span>
  );
}
