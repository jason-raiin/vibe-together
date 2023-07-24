import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import './indexstyles.css';
import CreateRoomPage from './pages/createRoom';
import HomePage from './pages/home';
import JoinRoomPage from './pages/joinRoom';
import RoomPage from './pages/room';
import UserPage from './pages/user';
import WhiteListPage from './pages/whitelist';
import CallbackRedirect from './redirects/callback';
import NoPageRedirect from './redirects/nopage';
import SpotifyLoginRedirect from './redirects/spotifylogin';
import { reportWebVitals } from './reportWebVitals';
import { ultimateAccessToken } from './spotify/spotify';

export default function App() {
  const [loggedIn, setLoginState] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );
  const [userId, setUserId] = useState('');

  function refreshLoginStatus() {
    useEffect(() => {
      if (!accessToken) return setLoginState(false);
      ultimateAccessToken(accessToken).then(({ id, result }) => {
        setLoginState(result);
        setUserId(id);
      });
    }, [accessToken, loggedIn]);
  }

  refreshLoginStatus();

  return (
    <div>
      <Header loggedIn={loggedIn} setAccessToken={setAccessToken} />
      <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={loggedIn ? <UserPage userId={userId} /> : <HomePage />} //<NewHomePage userId={userId} loggedIn={loggedIn} />}
          />
          <Route path="whitelist" element={<WhiteListPage />} />
          <Route
            path="callback"
            element={<CallbackRedirect setAccessToken={setAccessToken} />}
          />
          <Route path="room" element={<RoomPage userId={userId} />} />
          <Route path="create" element={<CreateRoomPage userId={userId} />} />
          <Route
            path="join"
            element={
              loggedIn ? (
                <JoinRoomPage userId={userId} />
              ) : (
                <SpotifyLoginRedirect />
              )
            }
          />
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
