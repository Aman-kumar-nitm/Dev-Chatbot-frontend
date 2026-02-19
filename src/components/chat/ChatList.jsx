import React from 'react';
import ChatItem from './ChatItem';

const ChatList = ({ chats, onSelectChat, onDeleteChat, currentChatId }) => {
  return (
    <div className="space-y-1">
      {chats?.map((chat) => (
        <ChatItem
          key={chat._id}
          chat={chat}
          isActive={currentChatId === chat._id}
          onSelect={() => onSelectChat(chat._id)}
          onDelete={() => onDeleteChat(chat._id)}
        />
      ))}
    </div>
  );
};

export default ChatList;