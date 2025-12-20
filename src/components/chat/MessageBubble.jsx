import React, { useState } from 'react';
import { FiUser, FiCpu, FiCopy, FiCheck } from 'react-icons/fi';

const MessageBubble = ({ message, isUser, isError = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[85%] md:max-w-[70%] rounded-2xl p-4
          ${isError ? 'bg-red-900/20 border border-red-800/50' : ''}
          ${isUser 
            ? 'bg-gray-800 rounded-tr-none' 
            : 'bg-gray-800/50 rounded-tl-none border border-gray-700'
          }
        
        ` }
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1 rounded-full ${isUser ? 'bg-primary-600' : 'bg-purple-600'}`}>
            {isUser ? (
              <FiUser className="text-white" size={14} />
            ) : (
              <FiCpu className="text-white" size={14} />
            )}
          </div>
          <span className="text-sm font-medium text-gray-300">
            {isUser ? 'You' : 'Dev-Chatbot'}
          </span>
          <span className="text-xs text-gray-500 ml-auto">
           
            {formatTime(message.createdAt)}
          </span>
          {!isUser && !isError && (
            <button
              onClick={handleCopy}
              className="ml-2 p-1 hover:bg-gray-700 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <FiCheck className="text-green-400" size={14} />
              ) : (
                <FiCopy className="text-gray-400" size={14} />
              )}
            </button>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className={`whitespace-pre-wrap ${isError ? 'text-red-300' : 'text-gray-200'}`}>
            {message.content}
          </div>
        </div>

        {/* Error indicator */}
        {isError && (
          <div className="mt-2 pt-2 border-t border-red-800/50">
            <span className="text-xs text-red-400 flex items-center gap-1">
              <FiCpu size={12} />
              System Error
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;