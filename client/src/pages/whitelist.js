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
        className="standard-box"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '15vh',
          marginRight: '15vh',
          marginTop: '5vh',
          marginBottom: '5vh',
          paddingTop: '10vh',
          paddingBottom: '10vh',
        }}
      >
        <Stack spacing={2} alignItems="center" justifyContent="center">
          Sorry, as our website is still in beta, you will need to submit the
          email account you use for Spotify so that we can whitelist it.
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
    </>
  );
};

export default WhiteListPage;
