import axios from 'axios';
import { BACKEND_URI } from './constants';
import { User } from '../dtos/user.dto';

export const addUpdateUser = async (user: User) => {
  try {
    const payload = { user };
    await axios.post(`${BACKEND_URI}/user/`, payload);
  } catch (error) {
    console.error('Failed to add/update new user:', error);
  }
};

export const getUser = async (userId: string): Promise<User> => {
  try {
    const { data } = await axios.get(`${BACKEND_URI}/user/${userId}`);
    return data.user;
  } catch (error) {
    console.error('Failed to get user:', error);
  }
  return {} as User;
};
