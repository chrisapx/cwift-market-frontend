import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';

const UnderDevelopment = ( {dev} ) => {
  return (
    <Dialog open={dev} >
      
      <DialogTitle 
        sx={{  width: 'fit-content', display: 'flex', justifyContent: 'center', fontWeight: '600', fontSize: 'x-large', color: (theme) => theme.palette.primary[500],
        }}
      >
        <DialogContentText> Unavailable </DialogContentText>
      </DialogTitle>
        <DialogContent>
          {/* <input type='file' /> */}
          <DialogContentText>Currently Under development !</DialogContentText>
        </DialogContent>
    </Dialog>
  );
};

export default UnderDevelopment;
