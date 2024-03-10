import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Delete, DeleteForever, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { useValue } from '../context/ContextProvider';

const DeleteActions = ({ params, rowId, setRowId }) => {
    const { dispatch } = useValue();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
        
    const handleItemUpdate = () => {
    setLoading(params.row.itemID);
    try {
        fetch('https://inventory.nalmart.com/items/' + params.row.itemID, {
        method: 'DELETE',
        // headers: {
        //     'Content-Type': 'application/json',
        //     // 'Authorization': `Bearer ${token}`
        // },
        // body: JSON.stringify(params.row),
        }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        }).then(data => {
        console.log('Item deleted successfully:', data);
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
            open: true,
            severity: 'success',
            message: 'Item Deleted successfully: Sku: ' + data.itemID
            },
        });
            setSuccess(true);
        setLoading('');
        }).catch(error => {
        console.error('Error deleting item:', error);
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'error',
                message: 'Error deleting item: ' + error.message
            },
        });
        setLoading('');
        });
    } catch (error) {
        console.error('Error deleting item:', error);
        setLoading('');
    }
}

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          // disabled={params.row.itemID === rowId || loading }
          onClick={handleItemUpdate}
        >
          <DeleteForever />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default DeleteActions;
