export default function ItemCardSkeleton() {
  return (
    <div className="animate-pulse bg-background-light dark:bg-secondary-dark rounded-xl overflow-hidden shadow-sm">
      <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
  );
}
