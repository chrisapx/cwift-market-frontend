import { Close, Computer, NotificationImportant, Warning } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import { IoCodeWorkingSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const UnderDevelopment = ( {dev} ) => {
    const navigate = useNavigate();
  return (
    <Dialog open={dev} >      
        <DialogContent sx={{paddingBlock: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <IoCodeWorkingSharp style={{fontSize: 90, fontWeight: 200}}/>
            <DialogContentText><Warning/> Currently Under development !</DialogContentText>
            <div>We appreciate your patience</div>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => navigate('/')}>Home</Button>
        </DialogActions>
    </Dialog>
  );
};

export default UnderDevelopment;
