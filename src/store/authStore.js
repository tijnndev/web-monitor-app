import { create } from "zustand";
import axios from "axios";
import { encodeBase64 } from "./encode";

const useAuthStore = create((set) => ({
  user: null,

  register: async (username, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, { username, password });
      set({ user: response.data.user });
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("authorization", encodeBase64(response.data.username));
      set({ user: response.data.token });
      return true;
    } catch (error) {
      alert(error.response?.data?.message || "Invalid email or password");
      return false;
    }
  },

  logout: async () => {
    try {
      localStorage.clear()
      set({ user: null });
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));

export default useAuthStore;
