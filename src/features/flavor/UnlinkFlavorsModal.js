import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const UnlinkFlavorsModal = ({ open, handleClose }) => {
  const handleCancel = () => handleClose(false);
  const handleDelete = () => handleClose(true);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete Flavor
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action will not delete the selected flavors it will unlink them from the current flavor.
          Are you sure you would like to remove these flavors?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UnlinkFlavorsModal;
