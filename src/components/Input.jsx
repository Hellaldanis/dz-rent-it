export default function Input({ 
  label, 
  error, 
  success,
  required,
  helperText,
  className = '',
  ...props 
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-text-light dark:text-text-dark">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        required={required}
        className={`
          w-full px-4 py-2 rounded-lg
          border transition-colors
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : success 
            ? 'border-green-500 focus:ring-green-500' 
            : 'border-secondary-light dark:border-secondary-dark focus:ring-primary'
          }
          bg-secondary-light dark:bg-background-dark
          text-text-light dark:text-text-dark
          placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark
          focus:outline-none focus:ring-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${props.id}-error`} className="text-sm text-red-500 flex items-center gap-1" role="alert">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </p>
      )}
      {success && !error && (
        <p className="text-sm text-green-500 flex items-center gap-1" role="status">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {success}
        </p>
      )}
      {helperText && !error && !success && (
        <p id={`${props.id}-helper`} className="text-sm text-text-muted-light dark:text-text-muted-dark">
          {helperText}
        </p>
      )}
    </div>
  );
}
