import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CallBack from './app/callback';
import Header from './components/header';
import { User } from './dtos/user.dto';
import { getUser } from './query/users';
import { ultimateAccessToken } from './spotify/spotify';
import AuthUserView from './app/AuthUserView';
import AuthJoinRoom from './app/AuthJoinRoom';
import NoAuthJoinRoom from './app/NoAuthJoinRoom';
import NoAuthDefault from './app/NoAuthDefault';

export default function App() {
  const [login, setLogin] = useState('nullstate');
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
            <Route path="/" element={<AuthUserView user={userdata} />} />
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
