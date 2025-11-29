import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-black text-primary opacity-20">404</h1>
          </div>

          {/* Icon */}
          <div className="mb-6">
            <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark">
              search_off
            </span>
          </div>

          {/* Message */}
          <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
            Page Not Found
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">arrow_back</span>
                Go Back
              </span>
            </button>
            
            <Link
              to="/"
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">home</span>
                Go Home
              </span>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-secondary-light dark:border-secondary-dark">
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
              Maybe you'd like to try:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/catalog"
                className="px-4 py-2 rounded-lg bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Browse Catalog
              </Link>
              <Link
                to="/publish"
                className="px-4 py-2 rounded-lg bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Publish Item
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 rounded-lg bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
