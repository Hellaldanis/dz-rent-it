import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const mockConversations = [
  {
    id: 1,
    userId: 'ahmed-k',
    userName: 'Ahmed K.',
    userAvatar: 'A',
    itemTitle: 'Canon EOS R5 Camera',
    itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
    lastMessage: 'Yes, the camera is available for those dates!',
    time: '5 min ago',
    unread: 2,
    isOwner: false
  },
  {
    id: 2,
    userId: 'sarah-m',
    userName: 'Sarah M.',
    userAvatar: 'S',
    itemTitle: 'DJI Mavic Drone',
    itemImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400',
    lastMessage: 'Thanks for renting my drone! Let me know if you need anything.',
    time: '2 hours ago',
    unread: 0,
    isOwner: true
  },
  {
    id: 3,
    userId: 'yacine-b',
    userName: 'Yacine B.',
    userAvatar: 'Y',
    itemTitle: 'MacBook Pro M2',
    itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    lastMessage: 'Can I pick it up tomorrow morning?',
    time: '1 day ago',
    unread: 1,
    isOwner: false
  },
  {
    id: 4,
    userId: 'lina-r',
    userName: 'Lina R.',
    userAvatar: 'L',
    itemTitle: 'Gaming Console PS5',
    itemImage: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
    lastMessage: 'Perfect! I will take good care of it.',
    time: '2 days ago',
    unread: 0,
    isOwner: true
  },
  {
    id: 5,
    userId: 'karim-l',
    userName: 'Karim L.',
    userAvatar: 'K',
    itemTitle: 'Electric Scooter',
    itemImage: 'https://images.unsplash.com/photo-1559968818-92fa0778e77f?w=400',
    lastMessage: 'What is your availability this weekend?',
    time: '3 days ago',
    unread: 0,
    isOwner: false
  }
];

export default function Messages() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConv, setSelectedConv] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedConv) {
      // Load messages for selected conversation
      setMessages([
        {
          id: 1,
          sender: selectedConv.isOwner ? 'user' : 'other',
          text: 'Hi! I am interested in renting this item.',
          time: '10:00 AM'
        },
        {
          id: 2,
          sender: selectedConv.isOwner ? 'other' : 'user',
          text: selectedConv.lastMessage,
          time: '10:15 AM'
        }
      ]);
    }
  }, [selectedConv]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Update conversation last message
      setConversations(conversations.map(conv =>
        conv.id === selectedConv.id
          ? { ...conv, lastMessage: message, time: 'Just now', unread: 0 }
          : conv
      ));
    }
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-10 py-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Messages</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              {totalUnread > 0 ? `${totalUnread} unread message${totalUnread > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <Link to="/dashboard">
            <button className="px-4 py-2 border border-secondary-light dark:border-secondary-dark rounded-lg text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors">
              Back to Dashboard
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-background-light dark:bg-secondary-dark rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-secondary-light dark:border-gray-700">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full px-4 py-2 rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`flex gap-3 p-4 cursor-pointer border-b border-secondary-light dark:border-gray-700 hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors ${
                    selectedConv?.id === conv.id ? 'bg-secondary-light dark:bg-gray-800' : ''
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {conv.userAvatar}
                    </div>
                    {conv.unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-text-light dark:text-text-dark truncate">
                        {conv.userName}
                      </p>
                      <span className="text-xs text-text-muted-light dark:text-text-muted-dark flex-shrink-0">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark truncate">
                      {conv.itemTitle}
                    </p>
                    <p className={`text-sm truncate mt-1 ${
                      conv.unread > 0 
                        ? 'text-text-light dark:text-text-dark font-medium' 
                        : 'text-text-muted-light dark:text-text-muted-dark'
                    }`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-background-light dark:bg-secondary-dark rounded-xl flex flex-col overflow-hidden">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center gap-4 p-4 border-b border-secondary-light dark:border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {selectedConv.userAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-light dark:text-text-dark">
                      {selectedConv.userName}
                    </p>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark truncate">
                      About: {selectedConv.itemTitle}
                    </p>
                  </div>
                  <div 
                    className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url("${selectedConv.itemImage}")` }}
                  />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                          msg.sender === 'user' ? 'bg-blue-500' : 'bg-primary'
                        }`}>
                          {msg.sender === 'user' ? 'Y' : selectedConv.userAvatar}
                        </div>
                        <div>
                          <div className={`rounded-2xl px-4 py-2 ${
                            msg.sender === 'user'
                              ? 'bg-blue-500 text-white rounded-tr-sm'
                              : 'bg-secondary-light dark:bg-gray-700 text-text-light dark:text-text-dark rounded-tl-sm'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <p className={`text-xs text-text-muted-light dark:text-text-muted-dark mt-1 ${
                            msg.sender === 'user' ? 'text-right' : 'text-left'
                          }`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-secondary-light dark:border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-full border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                    />
                    <button
                      type="submit"
                      className="w-12 h-12 bg-primary text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center flex-shrink-0"
                    >
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary-light dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark">
                      chat
                    </span>
                  </div>
                  <p className="text-text-light dark:text-text-dark font-semibold mb-2">
                    Select a conversation
                  </p>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
