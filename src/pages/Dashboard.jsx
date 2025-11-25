import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const mockRentals = [
  {
    id: 1,
    title: "Pro DSLR Camera",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBbKb3ng9vIDUM2mSg48XLV_JFMRAQa_T-QbYjbNzv65eplHNGbPDvkEgJ9_CWoMjNocBFYRK9M6p6lmPzb6M7pydTKG74g6MM0SzwtyZ8wFHe6N88NI4S5iThJb_LnBcl5BCn49HMHA4WMheBkywUVmV9c0-ZJfURV1dJW6jUpJqKSCnS0OR7B7dxYclRECZlf6-MMVcM-FORTL9C0u4EFLWfbpGRdNGueh1DlvISF6yJJsJz6iOeOzApXiQ_gTiqLKx3v3cVyKmb",
    dates: "Aug 15 - Aug 18",
    price: 75.00,
    status: "Pending"
  },
  {
    id: 2,
    title: "Electric Scooter",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC45IZEopj1c7Sv4duCahD6HWeQrrsaeIvRdIxcjyVU883D_aiGdjrHcoYWRzvmbw0OD4WuCN75gblnMUtqRdbdvoWTBO-0t3qkW3nEvKH_0w52q5dGz66j9A1YPq3xVPw6pBEa3iUO0YyVhGsjlVq5AeeURlHtFCDjy6hsIWL1I2Tq0ra1FBv0gfXwvYYyrAUnKPJZ9DrRU79AlIgsF9-k69q22kUGhwvCNHt1tqXwtl8Kn_lfQVg_tZW2MJZMApUdYRECGBI45z6D",
    dates: "Aug 20 - Aug 25",
    price: 100.00,
    status: "Confirmed"
  }
];

const mockMyItems = [
  {
    id: 3,
    title: "DJI Mavic Drone",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZpj8HtyK9pq__-wmGk05EZcjZbdjQqwCu2sF3taUmKcGEikZGzfmbXvGm1hXp5ttZEDg8majwXuJTnymQV9CeWLMxR8CI3x0bCsQx5UAg4rvPafNr9RZypAhwh5sWt-t-p-G5CQoW5sYyhSTBmO713hWW_B3rO2MbOJbhBOUqG6JC4y7GfRWOt9PTPMqtBMTQ9tK-VNXh3dmumHbhioy2WQdspE6GiNSx-FxXkwx7OormlVA9IW06qSS2Qf7B6NsRDI_KRn_5kCRN",
    price: 45,
    status: "Active",
    bookings: 5
  },
  {
    id: 4,
    title: "Gaming Console PS5",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7h_nvcBRl8c_HGz2XgB5eY4NHeKmWnGSPpiVvc_jcMaxovXpw8BNMXy6K8OGXoEdq46x7Oh6wOvLbcugxO4nf672BrR414vC8oR52RS8f0DWEEN-nQK5eZZBgnmTAS7E7pJsfSqPykoDTA8h7J3jA4ADu-55SjO56-F04PGqXmy-pCQSYDI9MpISZdmTa-__IrLnll3hAvcH8fZ_DTKne2Z9CI1veZH9joi1LNGlbyfEtDzWxz_35Jlh9obSoMF8uf0aTDZPTE9j2",
    price: 25,
    status: "Active",
    bookings: 12
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('rentals');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'Canceled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header showAddButton={isScrolled} />

      <main className="bg-background-light dark:bg-background-dark p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <h1 className="text-text-light dark:text-text-dark text-4xl font-black">My Dashboard</h1>
          <Link 
            to="/publish"
            className="flex items-center justify-center gap-2 px-4 h-10 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined">add</span>
            <span>Add New Item</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="pb-3 mb-6">
          <div className="flex border-b border-secondary-light dark:border-secondary-dark gap-4 sm:gap-8">
            <button
              onClick={() => setActiveTab('rentals')}
              className={`flex items-center justify-center border-b-[3px] pb-3 pt-2 gap-2 transition-colors ${
                activeTab === 'rentals'
                  ? 'border-b-primary text-text-light dark:text-text-dark'
                  : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark'
              }`}
            >
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              <p className="text-sm font-bold">My Rentals</p>
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`relative flex items-center justify-center border-b-[3px] pb-3 pt-2 gap-2 transition-colors ${
                activeTab === 'items'
                  ? 'border-b-primary text-text-light dark:text-text-dark'
                  : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark'
              }`}
            >
              <span className="material-symbols-outlined text-lg">category</span>
              <p className="text-sm font-bold">My Items</p>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                {mockMyItems.length}
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'rentals' ? (
          <div>
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold mb-4">
              Current & Upcoming Rentals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockRentals.map((rental) => (
                <div
                  key={rental.id}
                  className="flex flex-col gap-4 rounded-xl bg-background-light dark:bg-secondary-dark p-4 shadow-sm"
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${rental.image}")` }}
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <p className="text-text-light dark:text-text-dark text-base font-bold">
                        {rental.title}
                      </p>
                      <span className={`text-xs font-bold py-1 px-2.5 rounded-full ${getStatusColor(rental.status)}`}>
                        {rental.status}
                      </span>
                    </div>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Rented: {rental.dates}
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium pt-1">
                      Total Price: ${rental.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                      View Details
                    </button>
                    <button className="flex items-center justify-center p-2 border border-secondary-light dark:border-secondary-dark rounded-lg hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors">
                      <span className="material-symbols-outlined text-text-light dark:text-text-dark">chat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold mb-4">
              My Listed Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockMyItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl bg-background-light dark:bg-secondary-dark p-4 shadow-sm"
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <p className="text-text-light dark:text-text-dark text-base font-bold">
                        {item.title}
                      </p>
                      <span className={`text-xs font-bold py-1 px-2.5 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-primary text-lg font-bold">${item.price}/day</p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      {item.bookings} total bookings
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                      Edit
                    </button>
                    <button className="flex-1 py-2 px-4 border border-secondary-light dark:border-secondary-dark rounded-lg text-sm font-medium text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors">
                      View Stats
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
