import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.returnUrl || '/dashboard';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock login - in production, this would call an API
    const userData = {
      fullName: 'User Name',
      email: formData.email,
      phone: '+213 XXX XX XX XX',
      city: 'Algiers'
    };
    
    login(userData);
    navigate(returnUrl);
  };

  const handleGoogleLogin = () => {
    // Mock Google login - in production, this would use Google OAuth
    const userData = {
      fullName: 'Google User',
      email: 'user@gmail.com',
      phone: '+213 XXX XX XX XX',
      city: 'Algiers'
    };
    
    login(userData);
    navigate(returnUrl);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-3 text-primary mb-6">
            <div className="size-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">DZ-RentIt</h2>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
        </div>

        <div className="rounded-xl border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-secondary-dark p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">Full Name</p>
                  <input
                    className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30"
                    placeholder="Enter your full name"
                    type="text"
                  />
                </label>
              </div>
            )}

            <div>
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">Email</p>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">Password</p>
                  {isLogin && (
                    <a className="text-sm font-medium text-primary hover:underline" href="#">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <div className="relative flex w-full items-stretch">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 pr-10 text-base text-text-light dark:text-text-dark placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30"
                    placeholder="Enter your password"
                    type="password"
                    required
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted-light dark:text-text-muted-dark"
                    type="button"
                  >
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
              </button>
            </div>
          </form>

          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-secondary-light dark:border-secondary-dark"></div>
            <span className="mx-4 flex-shrink text-sm text-text-muted-light dark:text-text-muted-dark">or</span>
            <div className="flex-grow border-t border-secondary-light dark:border-secondary-dark"></div>
          </div>

          <div>
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-secondary-dark px-5 text-base font-medium text-text-light dark:text-text-dark transition-colors hover:bg-secondary-light dark:hover:bg-gray-700"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1001_3)">
                  <path d="M22.0427 12.2381C22.0427 11.3918 21.9688 10.5909 21.8375 9.81818H12.2478V14.4545H17.8285C17.5853 15.9398 16.7844 17.2148 15.5489 18.0193V20.7057H19.4313C21.0841 19.2318 22.0427 17.0352 22.0427 14.4136C22.0427 13.6932 21.9904 12.9614 21.9012 12.2381H22.0427Z" fill="#4285F4" />
                  <path d="M12.2478 22.5C14.9972 22.5 17.3012 21.5955 18.9802 20.0045L15.5489 17.5193C14.6546 18.1182 13.541 18.5227 12.2478 18.5227C9.79211 18.5227 7.71142 16.892 6.94097 14.6864H3.05859V17.2614C4.72619 20.4432 8.1887 22.5 12.2478 22.5Z" fill="#34A853" />
                  <path d="M6.94095 14.1864C6.7364 13.5875 6.6205 12.9545 6.6205 12.3C6.6205 11.6455 6.7364 11.0125 6.94095 10.4136V7.83864H3.05858C2.26823 9.08864 1.84379 10.6182 1.84379 12.3C1.84379 13.9818 2.26823 15.5114 3.05858 16.7614L6.44198 14.2966L6.94095 14.1864Z" fill="#FBBC05" />
                  <path d="M12.2478 6.07727C13.6807 6.07727 14.8989 6.55682 15.862 7.47273L19.0387 4.49545C17.2909 2.875 14.9972 1.9 12.2478 1.9C8.1887 1.9 4.72619 3.95682 3.05859 7.13864L6.94097 9.71364C7.71142 7.508 9.79211 6.07727 12.2478 6.07727Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1001_3">
                    <rect fill="white" height="21" transform="translate(1.5 1.5)" width="21" />
                  </clipPath>
                </defs>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            {' '}
            {isLogin ? (
              <Link
                to="/signup"
                className="font-semibold text-primary hover:underline"
              >
                Create an Account
              </Link>
            ) : (
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-primary hover:underline"
              >
                Log In
              </button>
            )}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
