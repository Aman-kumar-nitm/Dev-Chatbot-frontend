import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from '../chat/MessageBubble';
import MessageInput from '../chat/MessageInput';
import { chatApi } from '../../api/chatApi';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../common/Loader';
import { FiMessageSquare } from 'react-icons/fi';

const ChatArea = ({ chatId, onNewChat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const { tokenBalance, updateTokenBalance } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await chatApi.getMessages(chatId);
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    if (!chatId || sending) return;

    setSending(true);
    
    // Add user message immediately
    const userMessage = {
      _id: Date.now().toString(),
      content,
      sender: 'USER',
      createdAt: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    const typingMessage = {
  _id: 'typing',
  content: 'Dev-Chatbot is thinking...',
  sender: 'AI',
  isTyping: true,
  createdAt: new Date().toISOString(),
};
setMessages(prev => [...prev, typingMessage]);
    try {
      const response = await chatApi.sendMessage({
        chatId,
        message:content,
      });
updateTokenBalance(response.data.currToken);
setMessages(prev => prev.filter(msg => msg._id !== 'typing'));
      const aiMessage = {
  _id: Date.now().toString(),
  content: response.data.reply,
  sender: 'AI',
  createdAt: new Date().toISOString(),
};

setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Failed to send message:', error);
      // Show error message
      const errorMessage = {
        _id: Date.now().toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'AI',
        isError: true,
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setSending(false);
    }
  };

  const canSendMessage = () => {
    return tokenBalance > 0 && !sending;
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <FiMessageSquare className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Welcome to Dev-Chatbot</h3>
          <p className="text-gray-500 mb-6">
            Select a chat from the sidebar or start a new conversation to begin.
          </p>
          <button
            onClick={onNewChat}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Start New Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader size="lg" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <FiMessageSquare className="w-12 h-12 mx-auto mb-4" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <MessageBubble
                key={message._id}
                message={message}
                isUser={message.sender === 'USER'}
                isError={message.isError||false}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <div className="max-w-3xl mx-auto">
          <MessageInput
            onSendMessage={handleSendMessage}
            disabled={!canSendMessage()}
            isSending={sending}
          />
          {tokenBalance <= 0 && (
            <div className="mt-2 text-center">
              <p className="text-sm text-red-400">
                You have insufficient tokens. Please upgrade to Dev-Pro.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatArea;