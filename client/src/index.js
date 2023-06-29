import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { reportWebVitals } from './reportWebVitals';
import HomePage from './pages/home.page';
import { HomePageRedirect } from './redirects/homepage.redirect';
import UserPage from './pages/user.page';

export default function App() {
  const [loggedIn, setLoginState] = useState(false);
  const login = () => setLoginState(true);
  const logout = () => setLoginState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={loggedIn ? <UserPage /> : <HomePage />} />
        <Route path="callback" element={<HomePageRedirect login={login} />} />
        {/*  <Route
          path="join"
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
