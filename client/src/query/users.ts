import axios from 'axios';
import { BACKEND_URI } from './constants';
import { User } from '../dtos/user.dto';
import { Room } from '../dtos/room.dto';

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
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to get user:', error);
  }
  return {} as User;
};

export const getRoomsByUser = async (userId: string): Promise<Room[]> => {
  try {
    const { data } = await axios.get(`${BACKEND_URI}/room/all/${userId}`);
    return data.rooms;
  } catch (error) {
    console.error('Failed to get rooms:', error);
  }
  return [];
};
