import { user1Stub, user2Stub } from '../test/user.stub';
import { room1Stub, room2Stub, roomStub } from '../test/room.stub';

export const RoomsService = jest.fn().mockReturnValue({
  createNewRoom: jest.fn().mockResolvedValue(room1Stub()),
  addNewUserToRoom: jest.fn().mockResolvedValue(room2Stub()),
  getRoom: jest.fn().mockResolvedValue(roomStub()),
  getRoomsByUser: jest.fn().mockResolvedValue([room1Stub(), room2Stub()]),
  getRoomUserDetails: jest.fn().mockResolvedValue([user1Stub(), user2Stub()]),
  updateRoom: jest.fn().mockResolvedValue(roomStub()),
});
