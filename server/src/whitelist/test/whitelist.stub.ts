import { WhitelistRequest } from '../whitelist.schema';

export const whitelistStub = (): WhitelistRequest => ({
  email: 'email@example.com',
  timestamp: new Date(133213213123),
});
