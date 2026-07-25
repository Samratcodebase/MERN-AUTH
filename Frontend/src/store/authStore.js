import { create } from "zustand";
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async ({ email, password, name }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        email,
        password,
        name,
      });

      set({
        user: response.data?.Data ?? null,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      set({ error: message, isLoading: false, isAuthenticated: false });
      console.error("Signup error:", error);
      throw error;
    }
  },

  signIn: async ({ email, password }) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${BASE_URL}/signin`, {
        email,
        password,
        name,
      });

      set({
        user: response.data?.Data ?? null,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || "SignIn failed";
      set({ error: message, isLoading: false, isAuthenticated: false });
      console.error("Signup error:", error);
      throw error;
    }
  },
}));
