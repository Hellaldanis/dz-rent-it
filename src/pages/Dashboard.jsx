import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardStats from '../components/DashboardStats';

const mockRentals = [
  {
    id: 2,
    title: "Canon EOS R5 Camera",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7HtuWaNVfNfn2484Fkukx-ArX3ZRk7om4gGiPZdMwWKDmIgejljz5pMawx6gm4HOLe27zpcR16f1yU0JwUOh9NCUC2cBUrBK4Ldj100Xz5Dhq3e5flbNHbVASfz-iGjOUJiDvV-l8nO_nO2bS7PtdTCCWt7DK01_qU0bBlAWBktPyfaAkOHBJzP1Cvg1R-qQxCHw18MwCJzR3i5aJDWMmdnZzOl6ejIyEngHOdNw16gxRWco0GHtUEdH0fRrka6fpGznScIGgRqHA",
    dates: "Aug 15 - Aug 18",
    price: 255.00,
    status: "Pending"
  },
  {
    id: 7,
    title: "Electric Scooter",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBbKb3ng9vIDUM2mSg48XLV_JFMRAQa_T-QbYjbNzv65eplHNGbPDvkEgJ9_CWoMjNocBFYRK9M6p6lmPzb6M7pydTKG74g6MM0SzwtyZ8wFHe6N88NI4S5iThJb_LnBcl5BCn49HMHA4WMheBkywUVmV9c0-ZJfURV1dJW6jUpJqKSCnS0OR7B7dxYclRECZlf6-MMVcM-FORTL9C0u4EFLWfbpGRdNGueh1DlvISF6yJJsJz6iOeOzApXiQ_gTiqLKx3v3cVyKmb",
    dates: "Aug 20 - Aug 25",
    price: 100.00,
    status: "Confirmed"
  }
];

const mockMyItems = [
  {
    id: 1,
    title: "DJI Mavic Air 2 Drone",
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

const mockNotifications = [
  {
    id: 1,
    type: 'message',
    title: 'New message from Ahmed K.',
    description: 'Sent you a message about Canon EOS R5 Camera',
    time: '5 min ago',
    read: false
  },
  {
    id: 2,
    type: 'booking',
    title: 'Booking confirmed!',
    description: 'Your rental for DJI Mavic Drone has been confirmed',
    time: '2 hours ago',
    read: false
  },
  {
    id: 3,
    type: 'review',
    title: 'New review received',
    description: 'Karim L. left a 5-star review on your Gaming Console',
    time: '1 day ago',
    read: true
  },
  {
    id: 4,
    type: 'payment',
    title: 'Payment received',
    description: 'You received $75.00 for Pro DSLR Camera rental',
    time: '2 days ago',
    read: true
  }
];

const mockMessages = [
  {
    id: 1,
    name: 'Ahmed K.',
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+K&background=3b82f6&color=fff',
    lastMessage: 'Is the camera still available for next week?',
    time: '5 min ago',
    unread: 2,
    item: 'Canon EOS R5 Camera'
  },
  {
    id: 2,
    name: 'Yasmine M.',
    avatar: 'https://ui-avatars.com/api/?name=Yasmine+M&background=10b981&color=fff',
    lastMessage: 'Thank you! The drone was in perfect condition.',
    time: '1 hour ago',
    unread: 0,
    item: 'DJI Mavic Drone'
  },
  {
    id: 3,
    name: 'Karim L.',
    avatar: 'https://ui-avatars.com/api/?name=Karim+L&background=f59e0b&color=fff',
    lastMessage: 'Can we extend the rental by 2 more days?',
    time: '3 hours ago',
    unread: 1,
    item: 'Gaming Console PS5'
  },
  {
    id: 4,
    name: 'Sofia B.',
    avatar: 'https://ui-avatars.com/api/?name=Sofia+B&background=8b5cf6&color=fff',
    lastMessage: 'I saw your listing. When is it available?',
    time: '1 day ago',
    unread: 0,
    item: 'Electric Scooter'
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('rentals');
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [drafts, setDrafts] = useState([]);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load drafts from localStorage
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem('itemDrafts') || '[]');
      setDrafts(Array.isArray(d) ? d : []);
    } catch (e) {
      setDrafts([]);
    }
  }, []);

  const handleEditDraft = (draft, index) => {
    navigate('/publish', { state: { draft, draftIndex: index } });
  };

  const handleDeleteDraft = (index) => {
    const updated = drafts.slice();
    updated.splice(index, 1);
    localStorage.setItem('itemDrafts', JSON.stringify(updated));
    setDrafts(updated);
    toast.success('Draft deleted');
  };

  const handlePublishDraft = (index) => {
    // For now, simulate publish by removing draft and notifying user.
    const updated = drafts.slice();
    const [published] = updated.splice(index, 1);
    localStorage.setItem('itemDrafts', JSON.stringify(updated));
    setDrafts(updated);
    toast.success(`${published.title || 'Item'} published`);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    
    // Redirect based on notification type
    if (notif.type === 'message') {
      navigate('/messages');
    } else if (notif.type === 'booking') {
      setActiveTab('rentals');
    } else if (notif.type === 'review') {
      setActiveTab('items');
    } else if (notif.type === 'payment') {
      navigate('/payments');
    }
    // For payment, stay on notifications
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message': return 'chat';
      case 'booking': return 'event_available';
      case 'review': return 'star';
      case 'payment': return 'payments';
      default: return 'notifications';
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      'Pending': 'pending',
      'Confirmed': 'confirmed',
      'Completed': 'completed',
      'Canceled': 'canceled',
      'Active': 'active'
    };
    
    const translatedStatus = t(statusMap[status] || status.toLowerCase());
    
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
          <h1 className="text-text-light dark:text-text-dark text-4xl font-black">{t('myDashboard')}</h1>
          <Link 
            to="/publish"
            className="flex items-center justify-center gap-2 px-4 h-10 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined">add</span>
            <span>{t('addNewItem')}</span>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-3xl opacity-80">shopping_bag</span>
              <span className="text-sm font-medium opacity-80">This Month</span>
            </div>
            <p className="text-3xl font-black mb-1">12</p>
            <p className="text-sm opacity-90">Active Rentals</p>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+18% from last month</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-3xl opacity-80">payments</span>
              <span className="text-sm font-medium opacity-80">Total</span>
            </div>
            <p className="text-3xl font-black mb-1">$2,450</p>
            <p className="text-sm opacity-90">Earnings</p>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+24% from last month</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-3xl opacity-80">star</span>
              <span className="text-sm font-medium opacity-80">Average</span>
            </div>
            <p className="text-3xl font-black mb-1">4.8</p>
            <p className="text-sm opacity-90">Rating</p>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <span>Based on 47 reviews</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-3xl opacity-80">visibility</span>
              <span className="text-sm font-medium opacity-80">This Week</span>
            </div>
            <p className="text-3xl font-black mb-1">328</p>
            <p className="text-sm opacity-90">Profile Views</p>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+12% from last week</span>
            </div>
          </div>
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
              <p className="text-sm font-bold">{t('myRentals')}</p>
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
              <p className="text-sm font-bold">{t('myItems')}</p>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                {mockMyItems.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`relative flex items-center justify-center border-b-[3px] pb-3 pt-2 gap-2 transition-colors ${
                activeTab === 'notifications'
                  ? 'border-b-primary text-text-light dark:text-text-dark'
                  : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark'
              }`}
            >
              <span className="material-symbols-outlined text-lg">notifications</span>
              <p className="text-sm font-bold">Notifications</p>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`relative flex items-center justify-center border-b-[3px] pb-3 pt-2 gap-2 transition-colors ${
                activeTab === 'messages'
                  ? 'border-b-primary text-text-light dark:text-text-dark'
                  : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark'
              }`}
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              <p className="text-sm font-bold">Messages</p>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                3
              </span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`relative flex items-center justify-center border-b-[3px] pb-3 pt-2 gap-2 transition-colors ${
                activeTab === 'stats'
                  ? 'border-b-primary text-text-light dark:text-text-dark'
                  : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark'
              }`}
            >
              <span className="material-symbols-outlined text-lg">bar_chart</span>
              <p className="text-sm font-bold">Statistics</p>
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
                    <Link to={`/item/${rental.id}`} className="flex-1">
                      <button className="w-full py-2 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                        View Details
                      </button>
                    </Link>
                    <Link to="/messages">
                      <button className="flex items-center justify-center p-2 border border-secondary-light dark:border-secondary-dark rounded-lg hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-text-light dark:text-text-dark">chat</span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'items' ? (
          <div>
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold mb-4">
              My Listed Items
            </h2>

            {/* Drafts Section */}
            {drafts.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">Drafts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {drafts.map((draft, i) => (
                    <div key={i} className="flex flex-col gap-3 rounded-xl bg-background-light dark:bg-secondary-dark p-4 shadow-sm">
                      <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url("${(draft.images && draft.images[0] && draft.images[0].preview) || ''}")` }} />
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <p className="text-text-light dark:text-text-dark text-base font-bold">{draft.title || 'Untitled'}</p>
                          <span className="text-xs text-text-muted-light dark:text-text-muted-dark">Draft</span>
                        </div>
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm">{draft.createdAt ? new Date(draft.createdAt).toLocaleString() : ''}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditDraft(draft, i)} className="flex-1 py-2 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Edit</button>
                        <button onClick={() => handlePublishDraft(i)} className="py-2 px-4 border border-secondary-light dark:border-secondary-dark rounded-lg text-sm font-medium text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors">Publish</button>
                        <button onClick={() => handleDeleteDraft(i)} className="py-2 px-4 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    <Link to={`/item/${item.id}`} className="flex-1">
                      <button className="w-full py-2 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                        Edit
                      </button>
                    </Link>
                    <button className="flex-1 py-2 px-4 border border-secondary-light dark:border-secondary-dark rounded-lg text-sm font-medium text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors">
                      View Stats
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'notifications' ? (
          <div>
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold mb-4">
              Notifications
            </h2>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`flex gap-4 p-4 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                    notif.read 
                      ? 'bg-background-light dark:bg-secondary-dark' 
                      : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notif.type === 'message' ? 'bg-blue-100 dark:bg-blue-900/40' :
                    notif.type === 'booking' ? 'bg-green-100 dark:bg-green-900/40' :
                    notif.type === 'review' ? 'bg-yellow-100 dark:bg-yellow-900/40' :
                    'bg-purple-100 dark:bg-purple-900/40'
                  }`}>
                    <span className={`material-symbols-outlined ${
                      notif.type === 'message' ? 'text-blue-600 dark:text-blue-400' :
                      notif.type === 'booking' ? 'text-green-600 dark:text-green-400' :
                      notif.type === 'review' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-purple-600 dark:text-purple-400'
                    }`}>
                      {getNotificationIcon(notif.type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-text-light dark:text-text-dark font-semibold">
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-1">
                      {notif.description}
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-xs mt-2">
                      {notif.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'messages' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold">
                Messages
              </h2>
              <Link to="/messages">
                <button className="flex items-center gap-2 py-2 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined text-lg">open_in_new</span>
                  View All
                </button>
              </Link>
            </div>
            <div className="space-y-3">
              {mockMessages.map((message) => (
                <Link key={message.id} to="/messages">
                  <div className="flex gap-4 p-4 rounded-xl bg-background-light dark:bg-secondary-dark hover:shadow-md cursor-pointer transition-all">
                    <img 
                      src={message.avatar} 
                      alt={message.name}
                      className="w-12 h-12 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-text-light dark:text-text-dark font-semibold truncate">
                            {message.name}
                          </p>
                          <p className="text-text-muted-light dark:text-text-muted-dark text-xs mt-0.5">
                            {message.item}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <p className="text-text-muted-light dark:text-text-muted-dark text-xs whitespace-nowrap">
                            {message.time}
                          </p>
                          {message.unread > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">
                              {message.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm mt-2 truncate ${
                        message.unread > 0 
                          ? 'text-text-light dark:text-text-dark font-medium' 
                          : 'text-text-muted-light dark:text-text-muted-dark'
                      }`}>
                        {message.lastMessage}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">
                    chat_bubble
                  </span>
                </div>
                <div>
                  <h3 className="text-text-light dark:text-text-dark font-bold mb-1">
                    Stay Connected
                  </h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                    Respond quickly to increase your booking rate. Renters prefer hosts who reply within an hour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'stats' ? (
          <DashboardStats />
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
