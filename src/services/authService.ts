
import api from './api';
import { User, UserRole } from '@/contexts/AuthContext';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export const authService = {
  // Login API
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Register API
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Vendor Login API
  vendorLogin: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/vendor/login', credentials);
    return response.data;
  },

  // Vendor Register API
  vendorRegister: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/vendor/register', userData);
    return response.data;
  },

  // Customer Login API
  customerLogin: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/customer/login', credentials);
    return response.data;
  },

  // Customer Register API
  customerRegister: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/customer/register', userData);
    return response.data;
  },

  // Logout API
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};
