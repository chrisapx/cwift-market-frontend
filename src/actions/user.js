import { useValue } from '../context/ContextProvider';
import fetchData from './utils/fetchData';
import { v4 as uuidv4 } from 'uuid';
// import uploadFile from '../firebase/uploadFile';

const url = 
// process.env.REACT_APP_SERVER_URL 
'http://127.0.0.1:8080/users'
// 'https://inventory.nalmart.com/users/';

// const { dispatch } = useValue();
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

export const login = async (user, dispatch) => {
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
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Login successful',
        },
      });
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


// export const updateProfile = async (currentUser, updatedFields, dispatch) => {
//   dispatch({ type: 'START_LOADING' });

//   const { name, file } = updatedFields;
//   let body = { name };
//   try {
//     if (file) {
//       const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
//       const photoURL = await uploadFile(
//         file,
//         `profile/${currentUser?.id}/${imageName}`
//       );
//       body = { ...body, photoURL };
//     }
//     const result = await fetchData(
//       {
//         url: url + '/updateProfile',
//         method: 'PATCH',
//         body,
//         token: currentUser.token,
//       },
//       dispatch
//     );
//     if (result) {
//       dispatch({ type: 'UPDATE_USER', payload: { ...currentUser, ...result } });
//       dispatch({
//         type: 'UPDATE_ALERT',
//         payload: {
//           open: true,
//           severity: 'success',
//           message: 'Your profile has been updated successfully',
//         },
//       });
//       dispatch({
//         type: 'UPDATE_PROFILE',
//         payload: { open: false, file: null, photoURL: result.photoURL },
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: 'UPDATE_ALERT',
//       payload: {
//         open: true,
//         severity: 'error',
//         message: error.message,
//       },
//     });
//     console.log(error);
//   }

//   dispatch({ type: 'END_LOADING' });
// };
