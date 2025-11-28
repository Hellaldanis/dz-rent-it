export default function Button({ 
  children, 
  loading = false, 
  disabled = false,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90 disabled:opacity-50',
    secondary: 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-50',
    ghost: 'bg-transparent text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-secondary-dark'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg font-medium transition-all
        disabled:cursor-not-allowed
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        inline-flex items-center justify-center gap-2
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
          <span>Loading...</span>
        </>
      ) : children}
    </button>
  );
}
