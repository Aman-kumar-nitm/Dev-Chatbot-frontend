import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiLogOut, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import { chatApi } from '../../api/chatApi';
import api from '../../api/axios'
const Sidebar = ({ onSelectChat, currentChatId }) => {
  const { user, logout,checkAuth } = useAuth();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await chatApi.getChats();
      setChats(response.data);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    } finally {
      setLoading(false);
    }
  };

 const handleNewChat = async () => {
  try {
    const response = await chatApi.createChat('New Chat');
    const newChat = response.data;

    if (!newChat || !newChat._id) {
      console.error('Invalid chat response:', response.data);
      return;
    }

    setChats(prev => [newChat, ...(prev || [])]);
    onSelectChat(newChat._id);
    setIsMobileOpen(false);
  } catch (error) {
    console.error('Failed to create chat:', error);
  }
};


  const handleDeleteChat = async (chatId, e) => {
    e.stopPropagation();
    try {
      await chatApi.deleteChat(chatId);
      setChats(chats.filter(chat => chat._id !== chatId));
      if (currentChatId === chatId) {
        onSelectChat(null);
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleUpgrade = async () => {
  const { data } = await api.post("/payment/create-order");


  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: data.amount,
    currency: data.currency,
    order_id: data.id,
    name: "Dev-Chatbot Pro",
     method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: true,
  },
    handler: async () => {
  alert("Payment successful! Activating Dev-Pro...");
  setTimeout(async () => {
    await checkAuth(); // wait for webhook
  }, 3000);
},

  };

  new window.Razorpay(options).open();
};
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg"
      >
        {isMobileOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Dev-Chatbot</h2>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2"
            >
              <FiPlus />
              New Chat
            </Button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-gray-800 rounded animate-pulse"></div>
                ))}
              </div>
            ) : chats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No chats yet
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {chats.map(chat => (
                  <div
                    key={chat._id}
                    onClick={() => {
                      onSelectChat(chat._id);
                      setIsMobileOpen(false);
                    }}
                    className={`
                      group flex items-center justify-between p-3 rounded-lg cursor-pointer
                      hover:bg-gray-800 transition-colors duration-200
                      ${currentChatId === chat._id ? 'bg-gray-800' : ''}
                    `}
                  >
                    <div className="flex-1 truncate">
                      <div className="text-sm text-gray-200 truncate">
                        {chat.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteChat(chat._id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                    >
                      <FiTrash2 className="text-red-400" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upgrade Button */}
          <div className="p-4 border-t border-gray-800">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              disabled={user?.role === 'Dev-Pro'}
              onClick={handleUpgrade}
            >
              <FaCrown className="text-yellow-400" />
              {user?.role === 'Dev-Pro' ? 'Pro Plan Active' : 'Upgrade to Dev-Pro'}
            </Button>
          </div>

          {/* User Section */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <FiUser size={20} />
              </div> */}
              <div className="flex-1">
                <div className="font-medium text-white">{user?.name}</div>
               <div className="text-sm text-gray-400">
  {user?.email ? (
    <>
      {user.email.split('@')[0].length > 15 
        ? `${user.email.split('@')[0].substring(0, 15)}...@${user.email.split('@')[1]}`
        : user.email
      }
    </>
  ) : null}
</div>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
            >
              <FiLogOut />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        ></div>
      )}
    </>
  );
};

export default Sidebar;