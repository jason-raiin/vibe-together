import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { reportWebVitals } from './reportWebVitals';
import HomePage from './pages/home.page';
import HomePageRedirect from './redirects/homepage.redirect';
import UserPage from './pages/user.page';
import RoomPage from './pages/room.page';
import CreateRoomPage from './pages/create.page';
import JoinRoomPage from './pages/join.page';
import { ultimateAccessToken } from './spotify/spotify';

export default function App() {
  const [loggedIn, setLoginState] = useState(false);
  const [userId, setUserId] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    ultimateAccessToken(accessToken).then(({ id, result }) => {
      setLoginState(result);
      setUserId(id);
    });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={loggedIn ? <UserPage userId={userId} /> : <HomePage />}
        />
        <Route path="callback" element={<HomePageRedirect />} />
        <Route path="room" element={<RoomPage />} />
        <Route path="create" element={<CreateRoomPage userId={userId} />} />
        <Route path="join" element={<JoinRoomPage userId={userId} />} />
        {/*  <Route
          path="join-room"
          element={loggedIn ? <JoinRoomRedirect /> : <SpotifyLoginRedirect />}
        />
        <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);

reportWebVitals();
