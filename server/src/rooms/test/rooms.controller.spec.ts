import { Test } from '@nestjs/testing';
import { RoomsController } from '../rooms.controller';
import { RoomsService } from '../rooms.service';
import { room1Stub, room2Stub, roomStub } from './room.stub';
import { Room } from '../rooms.schema';
import { user1Stub, user2Stub } from './user.stub';
import { User } from 'src/users/users.schema';

jest.mock('../rooms.service');

describe('UsersController', () => {
  let roomsController: RoomsController;
  let roomsService: RoomsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [RoomsController],
      providers: [RoomsService],
    }).compile();

    roomsController = moduleRef.get<RoomsController>(RoomsController);
    roomsService = moduleRef.get<RoomsService>(RoomsService);
    jest.clearAllMocks();
  });

  describe('createNewRoom', () => {
    describe('when method is called', () => {
      let room: Room;

      beforeEach(async () => {
        room = await roomsController.createNewRoom(
          user1Stub().id,
          roomStub().name,
        );
      });

      test('then it should call roomsService', () => {
        expect(roomsService.createNewRoom).toBeCalledWith(
          user1Stub().id,
          roomStub().name,
        );
      });

      test('then it should return a room', () => {
        expect(room).toEqual(room1Stub());
      });
    });
  });

  describe('addNewUserToRoom', () => {
    describe('when method is called', () => {
      let room: Room;

      beforeEach(async () => {
        room = await roomsController.addNewUserToRoom(
          user2Stub().id,
          roomStub().id,
        );
      });

      test('then it should call roomsService', () => {
        expect(roomsService.addNewUserToRoom).toBeCalledWith(
          roomStub().id,
          user2Stub().id,
        );
      });

      test('then it should return a room', () => {
        expect(room).toEqual(room2Stub());
      });
    });
  });

  describe('getRoom', () => {
    describe('when method is called', () => {
      let room: Room;

      beforeEach(async () => {
        room = await roomsController.getRoom(roomStub().id);
      });

      test('then it should call roomsService', () => {
        expect(roomsService.getRoom).toBeCalledWith(roomStub().id);
      });

      test('then it should return a room', () => {
        expect(room).toEqual(roomStub());
      });
    });
  });

  describe('getUsersInRoom', () => {
    describe('when method is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await roomsController.getUsersInRoom(room2Stub().id);
      });

      test('then it should call roomsService', () => {
        expect(roomsService.getRoomUserDetails).toBeCalledWith(room2Stub().id);
      });

      test('then it should return a list of users', () => {
        expect(users).toEqual([user1Stub(), user2Stub()]);
      });
    });
  });

  describe('getRoomsByUser', () => {
    describe('when method is called', () => {
      let rooms: Room[];

      beforeEach(async () => {
        rooms = await roomsController.getRoomsByUser(user1Stub().id);
      });

      test('then it should call roomsService', () => {
        expect(roomsService.getRoomsByUser).toBeCalledWith(user1Stub().id);
      });

      test('then it should return a list of rooms', () => {
        expect(rooms).toEqual([room1Stub(), room2Stub()]);
      });
    });
  });
});
