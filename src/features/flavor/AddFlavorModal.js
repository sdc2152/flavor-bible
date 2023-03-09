import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FlavorForm from './FlavorForm';

const AddFlavorModal = ({ open, onClose }) => {

  const handleAdd = () => {
    onClose();
  }
  const handleCancel = () => {
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Add Flavor
      </DialogTitle>
      <DialogContent>
        <FlavorForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleAdd} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddFlavorModal;

