import { whitelistStub } from '../test/whitelist.stub';

export const WhitelistService = jest.fn().mockReturnValue({
  requestWhitelist: jest.fn().mockResolvedValue(whitelistStub()),
});
