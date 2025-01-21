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
      try {
        const response:Response = await fetch('https//:samliweisen.onrender.com/api/user/login',{
          body:JSON.stringify({
            eml: user.email,
            pwd: user.password
          })
        })
        // localStorage.setItem('token',response.token);
        this.isAuthenticated = true;
      } catch (error) {
        console.error(error);
      }
    },
    
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});