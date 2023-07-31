import { userStub } from '../test/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  addUpdateUser: jest.fn().mockResolvedValue(userStub()),
  getUser: jest.fn().mockResolvedValue(userStub()),
});
