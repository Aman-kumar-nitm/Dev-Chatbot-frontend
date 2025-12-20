import React from 'react';
import { FiTrash2, FiMessageSquare } from 'react-icons/fi';

const ChatItem = ({ chat, isActive, onSelect, onDelete }) => {
  return (
    <div
      onClick={onSelect}
      className={`
        group flex items-center justify-between p-3 rounded-lg cursor-pointer
        transition-all duration-200 hover:bg-gray-800
        ${isActive ? 'bg-gray-800' : ''}
      `}
    >
      <div className="flex items-center gap-3 flex-1">
        <FiMessageSquare className="text-gray-400 flex-shrink-0" size={18} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-200 truncate">
            {chat.title}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(chat.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
        title="Delete chat"
      >
        <FiTrash2 className="text-red-400" size={16} />
      </button>
    </div>
  );
};

export default ChatItem;