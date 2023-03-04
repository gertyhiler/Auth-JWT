import { create } from 'zustand';
import { IUser } from '../models/IUser';
import { AxiosResponse } from 'axios';
import UserService from '../services/UserService';

interface IUsersStore {
  users: IUser[],

  getUsers: () => void,
}

export const useUsersStore = create<IUsersStore>((set) => ({
  users: [] as IUser[],

  getUsers: async () => (set({users: (await UserService.fetchUsers()).data})),
}))