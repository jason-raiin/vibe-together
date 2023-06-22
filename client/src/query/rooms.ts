import axios from 'axios';
import { BACKEND_URI } from './constants';

export const newRoom = async (userId: string, name: string) => {
  try {
    const payload = { userId, name };
    const response = await axios.post(`${BACKEND_URI}/room/new`, payload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Failed to create new room:', error);
    return '';
  }
};

export const joinRoom = async (userId: string, roomId: string) => {
  try {
    const payload = { userId, roomId };
    const response = await axios.patch(`${BACKEND_URI}/room/join`, payload);
    console.log(response);
  } catch (error) {
    console.error('Failed to add user to room:', error);
  }
};

export const getRoom = async (roomId: string) => {
  try {
    await axios.get(`${BACKEND_URI}/room/${roomId}`);
  } catch (error) {
    console.error('Failed to add user to room:', error);
  }
};

export const isRoomJoinable = async (
  roomId: string,
  userId: string,
): Promise<boolean> => {
  const payload = { userId, roomId };
  const response = await axios.patch(`${BACKEND_URI}/room/joinable`, payload);
  return response.data;
};
