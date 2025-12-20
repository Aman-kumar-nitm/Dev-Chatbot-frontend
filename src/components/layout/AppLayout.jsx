import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

const AppLayout = () => {
  const [currentChatId, setCurrentChatId] = useState(null);

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          onSelectChat={setCurrentChatId} 
          currentChatId={currentChatId}
        />
        <ChatArea 
          chatId={currentChatId} 
          onNewChat={handleNewChat}
        />
      </div>
    </div>
  );
};

export default AppLayout;