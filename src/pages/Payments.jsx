import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const mockPayments = [
  {
    id: 1,
    type: 'received',
    amount: 75.00,
    itemTitle: 'Pro DSLR Camera',
    itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
    fromUser: 'John D.',
    date: '2024-11-25',
    time: '14:30',
    status: 'completed',
    transactionId: 'TXN-2024-001'
  },
  {
    id: 2,
    type: 'sent',
    amount: 100.00,
    itemTitle: 'Electric Scooter',
    itemImage: 'https://images.unsplash.com/photo-1559968818-92fa0778e77f?w=400',
    toUser: 'Ahmed K.',
    date: '2024-11-24',
    time: '10:15',
    status: 'completed',
    transactionId: 'TXN-2024-002'
  },
  {
    id: 3,
    type: 'pending',
    amount: 45.00,
    itemTitle: 'DJI Mavic Drone',
    itemImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400',
    fromUser: 'Sarah M.',
    date: '2024-11-28',
    time: '09:00',
    status: 'pending',
    transactionId: 'TXN-2024-003'
  },
  {
    id: 4,
    type: 'received',
    amount: 25.00,
    itemTitle: 'Gaming Console PS5',
    itemImage: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
    fromUser: 'Lina R.',
    date: '2024-11-22',
    time: '16:45',
    status: 'completed',
    transactionId: 'TXN-2024-004'
  }
];

export default function Payments() {
  const [payments, setPayments] = useState(mockPayments);
  const [filter, setFilter] = useState('all');
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPayments = payments.filter(payment => {
    if (filter === 'all') return true;
    if (filter === 'received') return payment.type === 'received';
    if (filter === 'sent') return payment.type === 'sent';
    if (filter === 'pending') return payment.status === 'pending';
    return true;
  });

  const totalReceived = payments
    .filter(p => p.type === 'received' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalSent = payments
    .filter(p => p.type === 'sent' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handlePaymentMethod = () => {
    alert('Payment method setup coming soon!\n\nYou will be able to:\n- Add credit/debit cards\n- Connect PayPal\n- Setup bank transfers\n- Add mobile payment methods');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-10 py-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">{t('payments')}</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              {t('manageTransactions')}
            </p>
          </div>
          <Link to="/dashboard">
            <button className="px-4 py-2 border border-secondary-light dark:border-secondary-dark rounded-lg text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors">
              {t('backToDashboard')}
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
                arrow_downward
              </span>
              <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase">
                {t('received')}
              </span>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${totalReceived.toFixed(2)}
            </p>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
              {t('totalEarnings')}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">
                arrow_upward
              </span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">
                {t('sent')}
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${totalSent.toFixed(2)}
            </p>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
              {t('totalSpent')}
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-3xl">
                schedule
              </span>
              <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 uppercase">
                {t('pending')}
              </span>
            </div>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              ${pendingAmount.toFixed(2)}
            </p>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
              {t('awaitingProcessing')}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {t('allTransactions')}
          </button>
          <button
            onClick={() => setFilter('received')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'received'
                ? 'bg-primary text-white'
                : 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {t('received')}
          </button>
          <button
            onClick={() => setFilter('sent')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'sent'
                ? 'bg-primary text-white'
                : 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {t('sent')}
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-primary text-white'
                : 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {t('pending')}
          </button>

          <button
            onClick={handlePaymentMethod}
            className="ml-auto px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="material-symbols-outlined">credit_card</span>
            {t('paymentMethods')}
          </button>
        </div>

        {/* Payments List */}
        <div className="space-y-4">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12 bg-background-light dark:bg-secondary-dark rounded-xl">
              <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">
                receipt_long
              </span>
              <p className="text-text-light dark:text-text-dark font-semibold mb-2">
                {t('noTransactionsFound')}
              </p>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                {t('transactionHistory')}
              </p>
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="bg-background-light dark:bg-secondary-dark rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div
                    className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url("${payment.itemImage}")` }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-bold text-text-light dark:text-text-dark text-lg">
                          {payment.itemTitle}
                        </h3>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          {payment.type === 'received' && `${t('paymentFrom')} ${payment.fromUser}`}
                          {payment.type === 'sent' && `${t('paymentTo')} ${payment.toUser}`}
                          {payment.type === 'pending' && `${t('pendingFrom')} ${payment.fromUser}`}
                        </p>
                      </div>
                      <span className={`text-xs font-bold py-1 px-3 rounded-full whitespace-nowrap ${getStatusColor(payment.status)}`}>
                        {t(payment.status)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted-light dark:text-text-muted-dark mb-3">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">calendar_today</span>
                        <span>{payment.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">schedule</span>
                        <span>{payment.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">tag</span>
                        <span>{payment.transactionId}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-2xl font-bold ${
                          payment.type === 'received' 
                            ? 'text-green-600 dark:text-green-400' 
                            : payment.type === 'sent'
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {payment.type === 'received' ? '+' : payment.type === 'sent' ? '-' : ''}
                          ${payment.amount.toFixed(2)}
                        </p>
                      </div>
                      <button className="px-4 py-2 border border-secondary-light dark:border-secondary-dark rounded-lg text-sm font-medium text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors">
                        {t('viewReceipt')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
