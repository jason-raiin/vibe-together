import { isValidAccessToken, refreshAccessToken } from './spotify';

export const isValidUser = async (
  accessToken: string,
  refreshToken: string,
) => {
  const result = await isValidAccessToken(accessToken);
  if (!result) {
    const newaccessToken = await refreshAccessToken(refreshToken);
    const newresult = await isValidAccessToken(newaccessToken);
    return newresult;
  }
  return result;
};
