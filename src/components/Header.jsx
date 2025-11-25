import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary-light dark:border-secondary-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-4 py-3">
        <Link to="/" className="flex items-center gap-3 text-primary">
          <div className="size-6">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-text-light dark:text-text-dark text-xl font-bold tracking-tight">DZ-RentIt</h2>
        </Link>
        
        <div className="hidden md:flex flex-1 justify-end items-center gap-8">
          <label className="relative flex-grow max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">search</span>
            <input 
              className="form-input w-full rounded-full border-none bg-secondary-light dark:bg-secondary-dark h-10 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
              placeholder="Search for anything" 
              type="search"
            />
          </label>
          <div className="flex gap-2">
            <Link 
              to="/login" 
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark text-sm font-bold transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span>Log In</span>
            </Link>
            <Link 
              to="/signup" 
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-primary text-white text-sm font-bold transition-opacity hover:opacity-90"
            >
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
