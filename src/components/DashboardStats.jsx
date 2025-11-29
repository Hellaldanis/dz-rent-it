import { useState } from 'react';

export default function DashboardStats() {
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data
  const stats = {
    totalRevenue: 12450,
    activeListings: 8,
    totalRentals: 23,
    avgOccupancy: 76,
    revenueChange: +15,
    listingsChange: +2,
    rentalsChange: +8,
    occupancyChange: -3
  };

  const revenueData = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 1500 },
    { month: 'Apr', amount: 2200 },
    { month: 'May', amount: 1900 },
    { month: 'Jun', amount: 2400 },
    { month: 'Jul', amount: 3200 }
  ];

  const popularItems = [
    { id: 1, name: 'Canon EOS R5', rentals: 12, revenue: 3600, image: '📷' },
    { id: 2, name: 'DJI Mavic 3', rentals: 8, revenue: 2400, image: '🚁' },
    { id: 3, name: 'Sony A7 III', rentals: 7, revenue: 2100, image: '📸' },
    { id: 4, name: 'MacBook Pro M2', rentals: 5, revenue: 1500, image: '💻' },
    { id: 5, name: 'GoPro Hero 11', rentals: 4, revenue: 800, image: '🎥' }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
          Statistics & Analytics
        </h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-3xl opacity-80">payments</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              stats.revenueChange >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {stats.revenueChange >= 0 ? '+' : ''}{stats.revenueChange}%
            </span>
          </div>
          <p className="text-sm opacity-80 mb-1">Total Revenue</p>
          <p className="text-3xl font-black">${stats.totalRevenue.toLocaleString()}</p>
        </div>

        {/* Active Listings */}
        <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-3xl opacity-80">inventory_2</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              stats.listingsChange >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {stats.listingsChange >= 0 ? '+' : ''}{stats.listingsChange}
            </span>
          </div>
          <p className="text-sm opacity-80 mb-1">Active Listings</p>
          <p className="text-3xl font-black">{stats.activeListings}</p>
        </div>

        {/* Total Rentals */}
        <div className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-3xl opacity-80">shopping_bag</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              stats.rentalsChange >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {stats.rentalsChange >= 0 ? '+' : ''}{stats.rentalsChange}
            </span>
          </div>
          <p className="text-sm opacity-80 mb-1">Total Rentals</p>
          <p className="text-3xl font-black">{stats.totalRentals}</p>
        </div>

        {/* Occupancy Rate */}
        <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-3xl opacity-80">percent</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              stats.occupancyChange >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {stats.occupancyChange >= 0 ? '+' : ''}{stats.occupancyChange}%
            </span>
          </div>
          <p className="text-sm opacity-80 mb-1">Avg Occupancy</p>
          <p className="text-3xl font-black">{stats.avgOccupancy}%</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="p-6 bg-background-light dark:bg-secondary-dark rounded-xl">
        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
          Revenue Over Time
        </h3>
        <div className="space-y-2">
          {revenueData.map((data) => (
            <div key={data.month} className="flex items-center gap-3">
              <span className="text-sm text-text-muted-light dark:text-text-muted-dark w-8">
                {data.month}
              </span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-8 bg-secondary-light dark:bg-background-dark rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-end px-3 transition-all duration-500 ease-out"
                    style={{ width: `${(data.amount / maxRevenue) * 100}%` }}
                  >
                    <span className="text-white text-sm font-bold">
                      ${data.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      <div className="p-6 bg-background-light dark:bg-secondary-dark rounded-xl">
        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
          Top Performing Items
        </h3>
        <div className="space-y-3">
          {popularItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-secondary-light dark:bg-background-dark rounded-lg hover:ring-2 hover:ring-primary/30 transition-all"
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                index === 0 ? 'bg-yellow-500 text-white' :
                index === 1 ? 'bg-gray-400 text-white' :
                index === 2 ? 'bg-orange-600 text-white' :
                'bg-secondary-light dark:bg-secondary-dark text-text-muted-light dark:text-text-muted-dark'
              }`}>
                {index + 1}
              </div>

              {/* Image */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                {item.image}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="font-semibold text-text-light dark:text-text-dark">
                  {item.name}
                </h4>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  {item.rentals} rentals
                </p>
              </div>

              {/* Revenue */}
              <div className="text-right">
                <p className="font-bold text-lg text-text-light dark:text-text-dark">
                  ${item.revenue}
                </p>
                <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                  Revenue
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-blue-500">trending_up</span>
            <h4 className="font-semibold text-text-light dark:text-text-dark">Best Month</h4>
          </div>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400">July</p>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">$3,200 revenue</p>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-green-500">star</span>
            <h4 className="font-semibold text-text-light dark:text-text-dark">Avg Rating</h4>
          </div>
          <p className="text-2xl font-black text-green-600 dark:text-green-400">4.8</p>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">From 156 reviews</p>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-500/20 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-purple-500">repeat</span>
            <h4 className="font-semibold text-text-light dark:text-text-dark">Repeat Rate</h4>
          </div>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400">42%</p>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Return customers</p>
        </div>
      </div>
    </div>
  );
}
