import { Close, Redo, Send } from '@mui/icons-material';
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
import { verify, resendOtp } from '../../actions/user';
import { useValue } from '../../context/ContextProvider';
import { IoLogIn } from 'react-icons/io5';

const OtpDialogue = () => {
  const {
    state: { openOtp },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Login');
  const otpRef = useRef();
  const emailRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_OTP_DIALOGUE' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otpRef.current.value;
    const email = emailRef.current.value;

    verify(email, otp, dispatch);
  };

  const handleResend = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    resendOtp(email, dispatch);
  }

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
              id="Email"
              label="Enter email address"
              type="email"
              fullWidth
              inputRef={emailRef}
              required
            />
            <TextField
              autoFocus
              margin="normal"
              variant="outlined"
              id="otp"
              label="Enter OTP"
              type="text"
              fullWidth
              inputRef={otpRef}
              inputProps={{ minLength: 5, maxLength: 5 }}
              required
            />
        </DialogContent>
        <DialogActions sx={{ px: '19px', display: 'flex', justifyContent: 'space-between', paddingInline: 3}}>
          <Button onClick={handleResend} variant="contained" endIcon={<Redo />}>
              Resend OTP
          </Button>

          <Button type="submit" variant="contained" endIcon={<IoLogIn />}>
            Verify
          </Button>

        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OtpDialogue;
