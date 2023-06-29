import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthDefault from './app/authDefault';
import AuthJoinRoom from './app/authJoinRoom';
import CallBack from './app/callback';
import NoAuthDefault from './app/noAuthDefault';
import NoAuthJoinRoom from './app/noAuthJoinRoom';
import Header from './components/header';
import { User } from './dtos/user.dto';
import './index.css';
import { getUser } from './query/users';
import { reportWebVitals } from './reportWebVitals';
import { ultimateAccessToken } from './spotify/spotify';

export default function App() {
  const [login, setLogin] = useState('loggedOutState');
  const [userdata, setUserData] = useState({} as User);

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
        const response = await ultimateAccessToken(accessToken, refreshToken);
        if (response.result) {
          setLogin('loggedInState');
          const tempdata = await getUser(response.id);
          setUserData(tempdata);
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
            <Route path="/" element={<AuthDefault user={userdata} />} />
            <Route
              path="/joinroom"
              element={<AuthJoinRoom user={userdata} />}
            />
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
              element={
                <NoAuthDefault refreshLoginStatus={refreshLoginStatus} />
              }
            />
            <Route path="/callback" element={<CallBack />} />
            <Route path="/joinroom" element={<NoAuthJoinRoom />} />
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
