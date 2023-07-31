import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { SubmitEmailButton } from '../components/button';
import { EmailField } from '../components/field';
import { requestWhitelist } from '../query/whitelist';

const WhiteListPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailInputHandler = (event) => setEmail(event.target.value);
  const submitEmailHandler = async () => {
    if (email) {
      await requestWhitelist(email, Date());
      setSubmitted(true);
    }
  };

  return (
    <>
      <div
        className="standard-outer-window"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '5vh',
          marginBottom: '5vh',
          marginLeft: '5vw',
          marginRight: '5vw',
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
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Stack
              spacing={3}
              alignItems="center"
              justifyContent="center"
              className="standard-stack"
            >
              <p>
                Sorry, as our website is still in beta, you will need to submit
                <br></br>
                the email account you use for Spotify so that we can whitelist
                it.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '1vh',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <EmailField emailInputHandler={emailInputHandler} />
                <SubmitEmailButton emailSubmitHandler={submitEmailHandler} />
              </div>
              {invalid && <p>Invalid Email!</p>}
              {submitted && <p>Email has been submitted for whitelisting!</p>}
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
