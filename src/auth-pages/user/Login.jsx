import { Close, Send } from '@mui/icons-material';
import {
  Avatar,
  Box,
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
// import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';
import { IoLogIn } from 'react-icons/io5';
import { useUser } from '../../context/UserContext';

const LoginDialogue = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const { user, token, storeToken, setCurrentUser } = useUser();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(register);
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const emailOrPhoneRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const birthDateRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
  };

  useEffect(() => {
    if(handleSubmit) setIsRegister(false);
  }, [])

  const handleSubmit = (e) => {
    // alert('submitting')
    e.preventDefault();
    const password = passwordRef.current.value;
    
    if (!isRegister){
      const username = emailOrPhoneRef.current.value;
      const userObj = { 
        username: username,
        password: password
      }

      return login(userObj, dispatch, storeToken);
    } 
    const userName = usernameRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const birthDate = birthDateRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword)
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Passwords mismatch',
        },
      }); 

    const regUserObj = {
      username: userName, 
      firstname: firstName, 
      lastname: lastName, 
      email: email, 
      phone: phone, 
      dateOfBirth : birthDate, 
      password : password 
    };

    register(regUserObj, dispatch);
  };

  const handleVButton = () => {
    dispatch({type: 'CLOSE_LOGIN'})
    dispatch({type: 'OPEN_OTP_DIALOGUE'})
  }

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);
  return (
    <Dialog open={openLogin} onClose={handleClose}>
      
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
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="outlined"
              id="username"
              label="Username"
              type="text"
              fullWidth
              inputRef={usernameRef}
              inputProps={{ minLength: 2,  }}
              required
            />
          )}
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="outlined"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              inputRef={firstNameRef}
              inputProps={{ minLength: 2,  }}
              required
            />
          )}
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="outlined"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              inputRef={lastNameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          { isRegister ? (
            <TextField
              autoFocus={!isRegister}
              margin="normal"
              variant="outlined"
              id="email"
              label="Email"
              type="email"
              fullWidth
              inputRef={emailRef}
              required
            />
          ) : (
            <TextField
              autoFocus={!isRegister}
              margin="normal"
              variant="outlined"
              id="email or phone"
              label="Email or phone"
              type="email or phone"
              fullWidth
              inputRef={emailOrPhoneRef}
              required
            />

          )}
          { isRegister && (
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="outlined"
            id="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            inputRef={phoneRef}
            required
          />
          // <input type='datetime-local'/>
          )}
          {isRegister && (
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="outlined"
            // id="birthDate"
            label="Date of Birth" 
            type="date"
            fullWidth
            inputRef={birthDateRef}
            // required
          />
          )}
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '19px',}}>
          <Button type="submit" variant="contained" endIcon={<IoLogIn />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister
          ? 'Have an account?  '
          : "Don't have an account? "}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </Button>
        <Box>|</Box>
        <Button onClick={handleVButton}>Verify</Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
        {/* <GoogleOneTapLogin /> */}
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialogue;
