import { useState } from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import { newRoom, isValidRoom } from '../query/rooms';

interface ChildComponentProps {
  userId: string;
}

const JoinRoomButton: React.FC<ChildComponentProps> = (props) => {
  const { userId } = props;
  const loginStatus = userId === 'broken';
  const [position, setPosition] = useState('nullState');
  const [invalidRoomCode, setInvalidRoomCode] = useState(false);
  const [codeOutput, setCodeOutput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  function displayRoomNameInput(): void {
    setPosition('createState');
  }

  const handleNameInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNameInput(event.target.value);
  };

  const submitNameInput = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const tempCodeOutput = await newRoom(userId, nameInput);
      console.log(tempCodeOutput.roomId);
      if (typeof tempCodeOutput.roomId === 'string') {
        setCodeOutput(tempCodeOutput.roomId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function displayRoomInput(): void {
    setPosition('joinState');
  }

  const handleCodeInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNameInput(event.target.value);
  };

  const submitCodeInput = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const valid = await isValidRoom(codeInput);
      if (!valid) throw new Error('Invalid Room Code');
      const navigate = useNavigate();
      navigate(`/joinroom?room=${codeInput}&user=${userId}`);
    } catch (error) {
      console.error(error);
      setInvalidRoomCode(true);
    }
  };

  return (
    <div>
      {loginStatus ? (
        ''
      ) : (
        <Button
          variant="contained"
          onClick={displayRoomNameInput}
          title="Create Room"
        >
          Create Room
        </Button>
      )}
      <Button variant="contained" onClick={displayRoomInput} title="Join Room">
        Join Room
      </Button>
      {position === 'createState' ? (
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your room's name here"
            variant="outlined"
            onChange={handleNameInput}
          />
          <Button
            variant="contained"
            onClick={submitNameInput}
            title="Create Room Now"
          >
            Create Room Now
          </Button>
          {codeOutput != '' ? (
            <div>
              {' '}
              <TextField
                id="outlined-basic"
                value={codeOutput}
                label="Room Code"
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  navigator.clipboard.writeText(codeOutput);
                }}
              >
                Copy
              </Button>
            </div>
          ) : (
            <div></div>
          )}
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
          {invalidRoomCode === true ? (
            <div>Invalid Room Code!</div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default JoinRoomButton;
