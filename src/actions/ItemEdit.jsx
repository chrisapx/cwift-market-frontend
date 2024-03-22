import { Close } from '@mui/icons-material'
import { Avatar, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useValue } from '../context/ContextProvider';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ItemEdit = ({ item }) => {
    const [closeDialog, setClose] = useState(false);
    const { state: { openItemDialog }, dispatch } = useValue();
    
    const handleClose = () => {
        dispatch({ type: 'CLOSE_ITEM_DIALOGUE' });
    };


  return (
    <Dialog
      open={openItemDialog}
      onClose={handleClose}
      fullScreen={true}
      TransitionComponent={Transition}
      
    >
      <DialogTitle>
        <div>Edit product details</div>
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

      <DialogContent>
        <DialogContentText>{item?.name}</DialogContentText>
        <Avatar src={item?.coverPhoto?.url}/>
      </DialogContent>
    </Dialog>
  )
}

export default ItemEdit
