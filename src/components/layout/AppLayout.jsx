import React, { useState,useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import ErrorBoundary from '../common/ErrorBoundary';
import { chatApi } from '../../api/chatApi';
const AppLayout = () => {
  const [currentChatId, setCurrentChatId] = useState(null);

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  useEffect(() => {
  const saved = localStorage.getItem('currentChatId');
  if (saved) setCurrentChatId(saved);
}, []);

useEffect(() => {
  if (currentChatId) {
    localStorage.setItem('currentChatId', currentChatId);
  } else {
    localStorage.removeItem('currentChatId');
  }
}, [currentChatId]);



  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          onSelectChat={setCurrentChatId} 
          currentChatId={currentChatId}
         
        />
        <ErrorBoundary>
          <ChatArea 
          chatId={currentChatId} 
          onNewChat={handleNewChat}

        />
        </ErrorBoundary>
        
      </div>
    </div>
  );
};

export default AppLayout;