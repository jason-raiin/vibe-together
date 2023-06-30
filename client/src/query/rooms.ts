import axios, { AxiosError } from 'axios';
import { BACKEND_URI } from './constants';

export const newRoom = async (userId: string, name: string) => {
  try {
    const payload = { userId, name };
    const response = await axios.post(`${BACKEND_URI}/room/new`, payload);
    return response.data;
  } catch (error) {}
};

export const joinRoom = async (userId: string, roomId: string) => {
  try {
    const payload = { userId, roomId };
    const response = await axios.patch(`${BACKEND_URI}/room/join`, payload);
    return response;
  } catch (error) {}
};

export const getRoom = async (roomId: string) => {
  try {
    const { data } = await axios.get(`${BACKEND_URI}/room/${roomId}`);
    return data;
  } catch (error) {}
};
