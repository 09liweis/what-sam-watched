import { defineStore } from 'pinia';
import { API_USER_DETAIL, API_USER_LOGIN } from '~/constants/api';

interface User {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface UserResponse {
  user?: any;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  
  actions: {
    async checkToken() {
      const response:UserResponse = await $fetch(API_USER_DETAIL,{
        method:'POST',
        headers: {
          'Authorization': `Bear ${localStorage.getItem('token')}`
        }
      });
      if (response?.user) {
        this.isAuthenticated = true;
      }
    },

    async login(user: User) {
      try {
        const response:LoginResponse = await $fetch(API_USER_LOGIN,{
          method: 'POST',
          body:{
            eml: user.email,
            pwd: user.password
          }
        })
        localStorage.setItem('token',response.token);
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