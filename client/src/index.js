import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { reportWebVitals } from './reportWebVitals';
import HomePage from './pages/home.page';
import CallbackRedirect from './redirects/callback.redirect';
import UserPage from './pages/user.page';
import RoomPage from './pages/room.page';
import CreateRoomPage from './pages/create.page';
import JoinRoomPage from './pages/join.page';
import { ultimateAccessToken } from './spotify/spotify';
import Header from './components/header.component';
import HomePageRedirect from './redirects/homepage.redirect';

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
          <Route path="*" element={<HomePageRedirect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);

reportWebVitals();
