import { defineStore } from 'pinia';

interface User {
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  
  actions: {
    login(user: User) {
      this.user = user;
      this.isAuthenticated = true;
    },
    
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});