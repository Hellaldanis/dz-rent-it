import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
  return (
    <Link 
      to={`/item/${item.id}`}
      className="group flex flex-col gap-3 overflow-hidden rounded-xl bg-background-light dark:bg-secondary-dark shadow-sm transition-all hover:shadow-xl"
    >
      <div 
        className="w-full bg-center bg-no-repeat aspect-video bg-cover" 
        style={{ backgroundImage: `url("${item.image}")` }}
      />
      <div className="p-4 pt-0">
        <p className="text-text-light dark:text-text-dark text-base font-bold leading-normal truncate">
          {item.title}
        </p>
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
          {item.location}
        </p>
        <p className="text-primary text-base font-bold leading-normal mt-2">
          ${item.price}/day
        </p>
      </div>
    </Link>
  );
}
