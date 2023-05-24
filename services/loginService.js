const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
let accessToken = '';

const loginUrl = `https://accounts.spotify.com/authorize`;
const redirectUri = `http://localhost:3000/callback`;
const loginUrlParameters = `${loginUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-top-read`;
