import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    dateOfBirth: user?.dateOfBirth || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile logic here
    console.log('Updated profile:', formData);
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <Header />

      <main className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-text-light dark:text-text-dark text-4xl font-black mb-2">My Profile</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="pb-3 mb-6">
          <div className="flex border-b border-secondary-light dark:border-secondary-dark gap-4 sm:gap-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center justify-center border-b-[3px] pb-3 pt-2 gap-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-b-primary text-text-light dark:text-text-dark'
                  : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark'
              }`}
            >
              <span className="material-symbols-outlined text-lg">person</span>
              <p className="text-sm font-bold">Profile Info</p>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center justify-center border-b-[3px] pb-3 pt-2 gap-2 transition-colors ${
                activeTab === 'security'
                  ? 'border-b-primary text-text-light dark:text-text-dark'
                  : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark'
              }`}
            >
              <span className="material-symbols-outlined text-lg">lock</span>
              <p className="text-sm font-bold">Security</p>
            </button>
          </div>
        </div>

        {/* Profile Info Tab */}
        {activeTab === 'profile' && (
          <div className="rounded-xl border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-secondary-dark p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
                    {user.fullName}
                  </h2>
                  <p className="text-text-muted-light dark:text-text-muted-dark">{user.email}</p>
                </div>
              </div>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-4 h-10 bg-secondary-light dark:bg-background-dark text-text-light dark:text-text-dark text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                  <span>Edit</span>
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="flex flex-col">
                    <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">
                      Full Name
                    </p>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      type="text"
                    />
                  </label>
                </div>

                <div>
                  <label className="flex flex-col">
                    <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">
                      Email
                    </p>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      type="email"
                    />
                  </label>
                </div>

                <div>
                  <label className="flex flex-col">
                    <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">
                      Phone Number
                    </p>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      type="tel"
                    />
                  </label>
                </div>

                <div>
                  <label className="flex flex-col">
                    <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">
                      Date of Birth
                    </p>
                    <input
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      type="date"
                    />
                  </label>
                </div>

                <div>
                  <label className="flex flex-col">
                    <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">
                      City
                    </p>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      type="text"
                    />
                  </label>
                </div>

                <div>
                  <label className="flex flex-col">
                    <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">
                      Address
                    </p>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      type="text"
                    />
                  </label>
                </div>
              </div>

              {editMode && (
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex h-12 px-6 items-center justify-center rounded-lg bg-primary text-white text-base font-bold transition-opacity hover:opacity-90"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="flex h-12 px-6 items-center justify-center rounded-lg bg-secondary-light dark:bg-background-dark text-text-light dark:text-text-dark text-base font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>

            <div className="mt-8 pt-8 border-t border-secondary-light dark:border-secondary-dark">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 h-10 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="rounded-xl border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-secondary-dark p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
              Change Password
            </h2>
            <form className="space-y-5 max-w-md">
              <div>
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">
                    Current Password
                  </p>
                  <input
                    className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark"
                    type="password"
                    placeholder="Enter current password"
                  />
                </label>
              </div>

              <div>
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">
                    New Password
                  </p>
                  <input
                    className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark"
                    type="password"
                    placeholder="Enter new password"
                  />
                </label>
              </div>

              <div>
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">
                    Confirm New Password
                  </p>
                  <input
                    className="form-input h-12 w-full rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark p-3 text-base text-text-light dark:text-text-dark"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="flex h-12 px-6 items-center justify-center rounded-lg bg-primary text-white text-base font-bold transition-opacity hover:opacity-90"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
