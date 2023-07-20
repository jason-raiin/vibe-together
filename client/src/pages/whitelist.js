import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { SubmitEmailButton } from '../components/button';
import { EmailField } from '../components/field';

const WhiteListPage = () => {
  const [email, setEmail] = useState('');
  const [invalid, setInvalid] = useState(false);

  const emailInputHandler = (event) => {
    setEmail(event.target.field);
    setInvalid(false);
  };

  const submitEmailHandler = async () => {
    if (!email) {
      setInvalid(true);
      return;
    }
  };
  return (
    <>
      <div
        className="standard-outer-window"
        style={{
          display: 'flex',
          height: '30vh',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '15vh',
          marginRight: '15vh',
          marginTop: '5vh',
          marginBottom: '5vh',
        }}
      >
        <Stack spacing={0} sx={{ width: '100%' }}>
          <div style={{ display: 'flex', gap: '1vh' }}>
            <div
              style={{
                height: '2.5vh',
                width: '2.5vh',
                border: '0.5vh solid #97b690',
                borderRadius: '2.5vh',
                backgroundColor: '#ee5250',
              }}
            />
            <div
              style={{
                height: '2.5vh',
                width: '2.5vh',
                border: '0.5vh solid #97b690',
                borderRadius: '2.5vh',
                backgroundColor: '#5cfcf4',
              }}
            />
            <div
              style={{
                height: '2.5vh',
                width: '2.5vh',
                border: '0.5vh solid #97b690',
                borderRadius: '2.5vh',
                backgroundColor: '#fff69d',
              }}
            />
          </div>
          <div
            className="standard-inner-window"
            style={{
              display: 'flex',
              height: '30vh',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Stack spacing={2} alignItems="center" justifyContent="center">
              <p>
                Sorry, as our website is still in beta, you will need to submit
              </p>
              <p>
                the email account you use for Spotify so that we can whitelist
                it.
              </p>
              <EmailField emailInputHandler={emailInputHandler} />
              <SubmitEmailButton submitEmailHandler={submitEmailHandler} />
              <p>
                Click{' '}
                <a className="inTextLink" href="/">
                  here
                </a>{' '}
                to return to the homepage.
              </p>
            </Stack>
          </div>
        </Stack>
      </div>
    </>
  );
};

export default WhiteListPage;
