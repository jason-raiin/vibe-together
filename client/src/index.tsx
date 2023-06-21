import React, { useEffect } from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './app/homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CallBack from './app/callback';
import LoggedInHomePage from './app/loggedinhomepage';
import Header from './components/header';
import { isValidUser } from './spotify/login';
import LoggedInJoinRoom from './app/loggedinjoinroom';
import JoinRoom from './app/joinroom';

export default function App() {
  const [login, setLogin] = useState('nullstate');

  function refreshPage() {
    setLogin('loggedOutState');
  }

  function refreshLoginStatus() {
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const isValidToken = async (
        accessToken: string,
        refreshToken: string,
      ) => {
        const { result } = await isValidUser(accessToken, refreshToken);
        if (result) {
          setLogin('loggedInState');
        } else {
          setLogin('loggedOutState');
        }
      };

      if (accessToken != null && refreshToken != null) {
        isValidToken(accessToken, refreshToken);
      } else {
        setLogin('loggedOutState');
      }
    }, []);
  }

  refreshLoginStatus();

  return (
    <div>
      <Header refreshPage={refreshPage} />
      {login === 'loggedInState' ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoggedInHomePage />} />
            <Route path="/joinroom" element={<LoggedInJoinRoom />} />
          </Routes>
        </BrowserRouter>
      ) : (
        ''
      )}
      {login === 'loggedOutState' ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<HomePage refreshLoginStatus={refreshLoginStatus} />}
            />
            <Route path="/callback" element={<CallBack />} />
            <Route path="/joinroom" element={<JoinRoom />} />
          </Routes>
        </BrowserRouter>
      ) : (
        ''
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
