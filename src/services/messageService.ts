
import api from './api';

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  propertyId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface SendMessageRequest {
  recipientId: string;
  propertyId: string;
  content: string;
}

export const messageService = {
  // Send message
  sendMessage: async (messageData: SendMessageRequest): Promise<Message> => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  // Get messages for a property
  getPropertyMessages: async (propertyId: string): Promise<Message[]> => {
    const response = await api.get(`/messages/property/${propertyId}`);
    return response.data;
  },

  // Get user's conversations
  getUserConversations: async (): Promise<Message[]> => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  // Mark message as read
  markAsRead: async (messageId: string): Promise<void> => {
    await api.put(`/messages/${messageId}/read`);
  },
};
