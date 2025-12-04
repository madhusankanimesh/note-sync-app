import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@types/index';

class AuthService {
  async register(credentials: RegisterCredentials & { password2: string }): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register/', credentials);
      const { access, refresh, user } = response.data;

      // Store tokens and user data
      await AsyncStorage.multiSet([
        ['access_token', access],
        ['refresh_token', refresh],
        ['user', JSON.stringify(user)],
      ]);

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login/', credentials);
      const { access, refresh, user } = response.data;

      // Store tokens and user data
      await AsyncStorage.multiSet([
        ['access_token', access],
        ['refresh_token', refresh],
        ['user', JSON.stringify(user)],
      ]);

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear all stored data
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await api.get('/auth/profile/');
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await api.patch('/auth/profile/', data);
      
      // Update stored user data
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('access_token');
      return !!token;
    } catch (error) {
      return false;
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message 
        || error.response.data?.error
        || error.response.data?.detail
        || 'An error occurred';
      
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new AuthService();
