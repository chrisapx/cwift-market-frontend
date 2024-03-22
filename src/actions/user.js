import { useUser } from "../context/UserContext";

const url = import.meta.env.VITE_API_URL + 'users'; 
// 'http://127.0.0.1:8080/users'

export const register = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  try {
    const response = await fetch(url + '/u1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Your account has been created successfully',
        },
      });
      dispatch({ type: 'OPEN_LOGIN' });
      dispatch({ type: 'OPEN_OTP_DIALOGUE' });
    } else {
      // Parse error message from response
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: 'Error creating account: ' + error.message,
      },
    });
  }

  dispatch({ type: 'END_LOADING' });
};

export const login = async (user, dispatch, storeToken) => {

  dispatch({ type: 'START_LOADING' });

  try {
    const response = await fetch(url + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      response.json()
      .then(tkn => {
        console.log(tkn.jwt);
        storeToken(tkn.jwt);
      });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Login successful',
        },
      });
      dispatch({type: 'CLOSE_LOGIN'})
    } else {
      // Parse error message from response
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: 'Login error: ' + error.message,
      },
    });
  }

  dispatch({ type: 'END_LOADING' });
};


export const verify = async (email, otp, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  try {
      const response = await fetch(url + '/v/' + email + '?otp=' + otp, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      const responseData = await response.json();
      if (response.ok && responseData) {
          dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                  open: true,
                  severity: 'success',
                  message: "Verification success",
              },
          });
          dispatch({ type: 'END_LOADING' });
          dispatch({ type: 'CLOSE_OTP_DIALOGUE' });
          dispatch({ type: 'OPEN_LOGIN' });
      } else {
          dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                  open: true,
                  severity: 'error',
                  message: responseData == false ? 'Invalid OTP' : 'OTP Invalid or expired',
              },
          });

          dispatch({ type: 'END_LOADING' });
          // throw new Error(responseData);
      }
  } catch (error) {
      dispatch({
          type: 'UPDATE_ALERT',
          payload: {
              open: true,
              severity: 'error',
              message: 'Login error: ' + error.message,
          },
      });
  }

  dispatch({ type: 'END_LOADING' });
};

export const resendOtp = async (email, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  try {
      const response = await fetch(url + '/v/' + email + '/otp', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      const responseData = await response.json();
      if (response.ok && responseData) {
          dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                  open: true,
                  severity: 'success',
                  message: "New Otp Sent to " + email,
              },
          });
          dispatch({ type: 'END_LOADING' });
      } else {
          dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                  open: true,
                  severity: 'error',
                  message: responseData == false && 'Unable to resend Otp, Ensure that the email provided is Registered',
              },
          });

          dispatch({ type: 'END_LOADING' });
      }
  } catch (error) {
      dispatch({
          type: 'UPDATE_ALERT',
          payload: {
              open: true,
              severity: 'error',
              message: 'Login error: ' + error.message,
          },
      });
  }

  dispatch({ type: 'END_LOADING' });
};