import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { reportWebVitals } from './reportWebVitals';
import HomePage from './pages/home';
import CallbackRedirect from './redirects/callback';
import UserPage from './pages/user';
import RoomPage from './pages/room';
import CreateRoomPage from './pages/createRoom';
import JoinRoomPage from './pages/joinRoom';
import { ultimateAccessToken } from './spotify/spotify';
import Header from './components/header';
import NoPageRedirect from './redirects/nopage';

export default function App() {
  const [loggedIn, setLoginState] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (!accessToken) return setLoginState(false);
    ultimateAccessToken(accessToken).then(({ id, result }) => {
      setLoginState(result);
      setUserId(id);
    });
  }, [accessToken]);

  return (
    <div>
      <Header loggedIn={loggedIn} setAccessToken={setAccessToken} />
      <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={loggedIn ? <UserPage userId={userId} /> : <HomePage />}
          />
          <Route
            path="callback"
            element={<CallbackRedirect setAccessToken={setAccessToken} />}
          />
          <Route path="room" element={<RoomPage />} />
          <Route path="create" element={<CreateRoomPage userId={userId} />} />
          <Route path="join" element={<JoinRoomPage userId={userId} />} />
          {/*  <Route
          path="join-room"
          element={loggedIn ? <JoinRoomRedirect /> : <SpotifyLoginRedirect />}
        />*/}
          <Route path="*" element={<NoPageRedirect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);

reportWebVitals();
