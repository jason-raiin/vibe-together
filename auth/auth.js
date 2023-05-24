async function getAccessToken() {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    accessToken = response.data.access_token;
  } catch (error) {
    console.error('Failed to get access token:' );
  }
   
}

export default getAccessToken;