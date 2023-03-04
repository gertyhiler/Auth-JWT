import { create } from 'zustand';
import { IUser } from '../models/IUser';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';

interface IUserStore {
  user: IUser,
  isAuth: boolean,
  isLoading: boolean,

  setAuth: (isAuth: boolean) => void,
  setLoading: (isLoading: boolean) => void,
  setUser: (user: IUser) => void,
  login: (email: string, password: string) => Promise<any>,
  registration: (email: string, password: string) => Promise<any>,
  logout: () => Promise<any>,
  checkAuth: () => Promise<any>
}

export const useUserStore = create<IUserStore>((set) => ({
  user: {} as IUser,
  isAuth: false,
  isLoading: false,

  setAuth: (isAuth) => set({isAuth}),
  setUser: (user) => set({user}),

  login: async (email, password) => {
    set({isLoading: true});
    try {
      const response = await AuthService.login(email, password);
      console.log('response: ', response);
      localStorage.setItem('token', response.data.accessToken);
      set({isAuth: true});
      set({user: response.data.user});
      set({isLoading: false});
    } catch (error:any) {
      set({isLoading: false});
      console.log(error.response?.data?.message);
    }
  },
  registration: async (email, password) => {
    set({isLoading: true});
    try {
      const response = await AuthService.registration(email, password);
      console.log('response: ', response);
      localStorage.setItem('token', response.data.accessToken);
      set({isAuth: true});
      set({user: response.data.user});
      set({isLoading: false});
    } catch (error:any) {
      set({isLoading: false});
      console.log(error.response?.data?.message);
    }
  },
  logout: async () => {
    set({isLoading: true});
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      set({isAuth: false});
      set({user: {} as IUser});
      set({isLoading: false});
    } catch (error:any) {
      set({isLoading: false});
      console.log(error.response?.data?.message);
    }
  },

  checkAuth: async () => {
    set({isLoading: true});
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
      console.log('response: ', response);
      localStorage.setItem('token', response.data.accessToken);
      set({isAuth: true});
      set({user: response.data.user});
      set({isLoading: false});
    } catch (error: any) {
      set({isLoading: false});
      console.log(error.response?.data?.message);
    }
  }, 

  setLoading: (isLoading) => set({isLoading})

}));