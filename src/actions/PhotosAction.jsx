import { Close } from '@mui/icons-material';
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

import { IoLogIn } from 'react-icons/io5';
import { useValue } from '../context/ContextProvider';
import { useEffect } from 'react';

const PhotosAction = () => {
  const { state: { openImage, photos }, dispatch } = useValue();

  useEffect(() => {
    console.log(photos)
    // dispatch({ 
    //     type: 'CLOSE_PHOTOS_DIALOGUE' ,
    // });
  },[])
  
  const handleClose = () => {
    dispatch({ type: 'CLOSE_IMAGE_DIALOGUE' });
  };

  return (
    <Dialog 
        open={openImage} 
        onClose={handleClose}
        sx={{
            // width: 'fit-content'
        }}
        >
      
      <DialogTitle 
        sx={{
          width: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          fontWeight: '600',
          fontSize: 'x-large',
          color: (theme) => theme.palette.primary[500],
        }}
      >
        <DialogContentText> Edit item Photos </DialogContentText>
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            pl: 12,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={{}}>
        <DialogContent>
          {/* <input type='file' /> */}
          <DialogContentText>Currently not functional ( Under development )</DialogContentText>
        </DialogContent>
          
          <DialogActions sx={{ px: '19px',}}>
            <Button type="submit" variant="contained" endIcon={<IoLogIn />}>
              Submit
            </Button>
          </DialogActions>
      </form>
    </Dialog>
  );
};

export default PhotosAction;
