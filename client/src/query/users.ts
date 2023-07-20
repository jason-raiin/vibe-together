import axios from 'axios';
import { Room } from '../dtos/room.dto';
import { User } from '../dtos/user.dto';
import { BACKEND_URI } from './constants';

export const addUpdateUser = async (user: User) => {
  try {
    const payload = { user };
    await axios.post(`${BACKEND_URI}/user/`, payload);
    return true;
  } catch (error) {
    console.error('Failed to add/update new user:', error);
    return false;
  }
};

export const getUser = async (userId: string): Promise<User> => {
  try {
    const { data } = await axios.get(`${BACKEND_URI}/user/${userId}`);
    return data;
  } catch (error) {
    console.error('Failed to get user:', error);
  }
  return {} as User;
};

export const getRoomsByUser = async (userId: string): Promise<Room[]> => {
  try {
    const { data } = await axios.get(`${BACKEND_URI}/room/all/${userId}`);
    return data;
  } catch (error) {
    console.error('Failed to get rooms:', error);
    return [];
  }
};
