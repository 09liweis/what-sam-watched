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

export const useUserState = () => {

  const user = useState<User|null>("user", () => null);
  const isAuthenticated = useState<boolean>("isAuthenticated",()=>false);


  const checkToken = async() => {
    const response:UserResponse = await $fetch(API_USER_DETAIL,{
      method:'POST',
      headers: {
      'Authorization': `Bear ${localStorage.getItem('token')}`
      }
    });
    if (response?.user) {
        isAuthenticated.value = true;
    }
  }

  const login = async(user: User) => {
    try {
      const response:LoginResponse = await $fetch(API_USER_LOGIN,{
        method: 'POST',
        body:{
          eml: user.email,
          pwd: user.password
        }
      })
      localStorage.setItem('token',response.token);
      isAuthenticated.value = true;
    } catch (error) {
      console.error(error);
    }
  }

  const logout = () => {
      user.value = null;
      isAuthenticated.value = false;
      localStorage.setItem('token','');
    }

  return {
    user,
    isAuthenticated,
    checkToken,
    login,
    logout
  };
};
