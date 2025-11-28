import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ItemDetail = lazy(() => import('./pages/ItemDetail'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Publish = lazy(() => import('./pages/Publish'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const PublicProfile = lazy(() => import('./pages/PublicProfile'));
const About = lazy(() => import('./pages/About'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Terms = lazy(() => import('./pages/Terms'));
const FAQ = lazy(() => import('./pages/FAQ'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const Contact = lazy(() => import('./pages/Contact'));
const Messages = lazy(() => import('./pages/Messages'));
const Payments = lazy(() => import('./pages/Payments'));
const BookingRequest = lazy(() => import('./pages/BookingRequest'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="bg-background-light dark:bg-background-dark min-h-screen">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="text-text-light dark:text-text-dark font-medium">Loading...</p>
                  </div>
                </div>
              }>
                <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/:userId" element={<PublicProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/booking-request" element={<BookingRequest />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              </Routes>
              </Suspense>
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
