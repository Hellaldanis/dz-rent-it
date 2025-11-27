import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ItemDetail from './pages/ItemDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Publish from './pages/Publish';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="bg-background-light dark:bg-background-dark min-h-screen">
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
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
