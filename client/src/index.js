import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import { wallpaper } from './components/wallpaper';
import CreateRoomPage from './pages/createRoom';
import HomePage from './pages/home';
import JoinRoomPage from './pages/joinRoom';
import RoomPage from './pages/room';
import UserPage from './pages/user';
import CallbackRedirect from './redirects/callback';
import NoPageRedirect from './redirects/nopage';
import { reportWebVitals } from './reportWebVitals';
import { ultimateAccessToken } from './spotify/spotify';
import './themes/bluetheme.css';

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
      <style>{wallpaper}</style>
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
  /> */}
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
