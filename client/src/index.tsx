import React, { useEffect } from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './app/homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpotifyService } from './spotify/spotify.service';
import CallBack from './app/callback';
import LoggedInHomePage from './app/loggedinhomepage';

export default function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const spotifyservice = new SpotifyService();

    const isValidToken = async (accessToken: string) => {
      const result = await spotifyservice.isValidAccessToken(accessToken);
      console.log(accessToken);
      console.log(result);

      setLogin(result);
    };
    if (accessToken != null) {
      isValidToken(accessToken);
    }
  }, []);

  return (
    <div>
      {login ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoggedInHomePage />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/callback" element={<CallBack />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
