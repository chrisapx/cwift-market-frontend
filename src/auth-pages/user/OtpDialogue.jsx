import { Close, Send } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { login, register } from '../../actions/user';
import { useValue } from '../../context/ContextProvider';
import PasswordField from './PasswordField';
import { IoLogIn } from 'react-icons/io5';

const OtpDialogue = () => {
  const {
    state: { openOtp },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Login');
  const otpRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_OTP_DIALOGUE' });
  };

  const handleSubmit = (e) => {
    const otp = otpRef.current.value;

    verify(regUserObj, dispatch);

    dispatch({ type: 'CLOSE_OTP_DIALOGUE' });
    dispatch({ type: 'OPEN_LOGIN' });
  };

  useEffect(() => {
   setTitle('Verify');
  }, []);
  return (
    <Dialog open={openOtp} onClose={handleClose}>
      
      <DialogTitle 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontWeight: '600',
          fontSize: 'x-large',
          color: (theme) => theme.palette.primary[500],
        }}
      >
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText sx={{fontSize: 12}}>
            Please Verify your account with an otp sent to your email or phone
          </DialogContentText>
          
            <TextField
              autoFocus
              margin="normal"
              variant="outlined"
              id="lastName"
              label="Enter OTP"
              type="text"
              fullWidth
              inputRef={otpRef}
              inputProps={{ minLength: 2 }}
              required
            />
        </DialogContent>
        <DialogActions sx={{ px: '19px',}}>
          <Button type="submit" variant="contained" endIcon={<IoLogIn />}>
            Verify
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OtpDialogue;
