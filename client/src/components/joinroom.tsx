import { useState } from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const JoinRoom: React.FC = () => {
  const [position, setPosition] = useState('nullState');
  const [codeOutput, setCodeOutput] = useState('');
  const [codeInput, setCodeInput] = useState('');

  function generateEmptyRoom(): void {
    setPosition('createState');
    setCodeOutput('temp');
  }

  function displayRoomInput(): void {
    setPosition('joinState');
  }

  const handleCodeInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCodeInput(event.target.value);
  };

  const submitCodeInput = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={generateEmptyRoom}
        title="Create Room"
      >
        Create Room
      </Button>
      <Button variant="contained" onClick={displayRoomInput} title="Join Room">
        Join Room
      </Button>
      {position === 'createState' ? (
        <div>
          <TextField
            id="outlined-basic"
            value={codeOutput}
            label="Room Code"
            variant="outlined"
            InputProps={{ readOnly: true }}
          />
        </div>
      ) : (
        ''
      )}
      {position === 'joinState' ? (
        <div>
          <TextField
            id="outlined-basic"
            label="Room Code"
            variant="outlined"
            onChange={handleCodeInput}
          />
          <Button
            variant="contained"
            onClick={submitCodeInput}
            title="Submit Code"
          >
            Submit Code
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default JoinRoom;
