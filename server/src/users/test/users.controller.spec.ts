import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './user.stub';
import { User } from '../users.schema';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('newUser', () => {
    describe('when method is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.newUser(userStub());
      });

      test('then it should call usersService', () => {
        expect(usersService.addUpdateUser).toBeCalledWith(userStub());
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUser', () => {
    describe('when method is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(userStub().id);
      });

      test('then it should call usersService', () => {
        expect(usersService.getUser).toBeCalledWith(userStub().id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
