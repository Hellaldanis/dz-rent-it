export default function Skeleton({ className = '', variant = 'text' }) {
  const baseClasses = 'animate-pulse bg-gray-300 dark:bg-gray-700';
  
  const variants = {
    text: 'h-4 rounded',
    title: 'h-8 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
    button: 'h-12 rounded-lg'
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}></div>
  );
}

export function ItemDetailSkeleton() {
  return (
    <div className="flex-1 px-4 md:px-10 py-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        {/* Title */}
        <Skeleton variant="title" className="w-3/4" />
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-4">
            <Skeleton variant="rect" className="w-full h-96" />
          </div>
          
          {/* Booking card */}
          <div className="space-y-4">
            <Skeleton variant="rect" className="w-full h-64" />
          </div>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton variant="title" className="w-40" />
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-5/6" />
          <Skeleton variant="text" className="w-4/6" />
        </div>
        
        {/* Reviews */}
        <div className="space-y-4">
          <Skeleton variant="title" className="w-48" />
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4">
              <Skeleton variant="circle" className="w-12 h-12" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" className="w-32" />
                <Skeleton variant="text" className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
