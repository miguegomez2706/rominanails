import { create } from 'zustand';
import { authService } from '../services';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('rominanails_token') || null,
  isAuthenticated: false,
  loading: true,

  login: async (credentials) => {
    const { data } = await authService.login(credentials);
    localStorage.setItem('rominanails_token', data.token);
    set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
    return data;
  },

  logout: () => {
    localStorage.removeItem('rominanails_token');
    set({ user: null, token: null, isAuthenticated: false, loading: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('rominanails_token');
    if (!token) {
      set({ loading: false, isAuthenticated: false });
      return;
    }
    try {
      const { data } = await authService.verify();
      set({ user: data.user, isAuthenticated: true, loading: false });
    } catch {
      localStorage.removeItem('rominanails_token');
      set({ user: null, token: null, isAuthenticated: false, loading: false });
    }
  },
}));

export default useAuthStore;
