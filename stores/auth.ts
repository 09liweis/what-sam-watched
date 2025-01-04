import { defineStore } from 'pinia';

interface User {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  
  actions: {
    async login(user: User) {
      const response = await fetch('https//:samliweisen.onrender.com/api/user/login',{
        body:JSON.stringify({
          eml: user.email,
          pwd: user.password
        })
      })
      this.user = user;
      this.isAuthenticated = false;
    },
    
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});