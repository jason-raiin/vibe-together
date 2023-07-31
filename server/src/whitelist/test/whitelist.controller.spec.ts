import { Test } from '@nestjs/testing';
import { WhitelistController } from '../whitelist.controller';
import { WhitelistService } from '../whitelist.service';
import { whitelistStub } from './whitelist.stub';
import { WhitelistRequest } from '../whitelist.schema';

jest.mock('../whitelist.service');

describe('WhitelistController', () => {
  let whitelistController: WhitelistController;
  let whitelistService: WhitelistService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [WhitelistController],
      providers: [WhitelistService],
    }).compile();

    whitelistController =
      moduleRef.get<WhitelistController>(WhitelistController);
    whitelistService = moduleRef.get<WhitelistService>(WhitelistService);
    jest.clearAllMocks();
  });

  describe('requestWhitelist', () => {
    describe('when method is called', () => {
      let request: WhitelistRequest;

      beforeEach(async () => {
        request = await whitelistController.requestWhitelist(
          whitelistStub().email,
          whitelistStub().timestamp,
        );
      });

      test('then it should call usersService', () => {
        expect(whitelistService.requestWhitelist).toBeCalledWith(
          whitelistStub().email,
          whitelistStub().timestamp,
        );
      });

      test('then it should return a user', () => {
        expect(request).toEqual(whitelistStub());
      });
    });
  });
});
