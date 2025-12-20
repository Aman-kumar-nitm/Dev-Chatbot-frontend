import api from './axios';

export const chatApi = {
  // Get all chats
  getChats: () => api.get('/chat/getChats'),
  
  // Create new chat
  createChat: (title) => api.post('/chat/create', { title }),
  
  // Get chat messages
  getMessages: (chatId) => api.get(`/chat/getMessages/${chatId}`),
  
  // Send message
  sendMessage: (data) => api.post('/chat/message', data),
  
  // Delete chat
  deleteChat: (chatId) => api.delete(`/chat/deleteChat/${chatId}`),
};