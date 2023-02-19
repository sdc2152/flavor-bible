import React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Search from '../search/Search';
import FocusTextField from '../../common/FocusTextField';

const AddFlavorModal = ({ open, handleClose }) => {
  const [flavors, setFlavors] = React.useState([]);

  const handleAdd = () => {
    handleClose(flavors);
    setFlavors([]);
  }
  const handleCancel = () => {
    handleClose();
    setFlavors([]);
  }

  const handleSearchChange = (event, values, reason) => {
    if (reason === 'selectOption') {
      const flavorIds = flavors.map((flavor) => flavor.id);
      const newValue = values.find((value) => !flavorIds.includes(value.id));
      if (newValue) {
        setFlavors([...flavors, newValue]);
      }
    } else if (reason === 'clear') {
      setFlavors([]);
    }
  }

  const handleRenderInput = (params) => {
    return <FocusTextField {...params} variant="outlined" label="Search Flavors" />;
  }

  const handleRenderTags = (value, getTagProps) => (value.map((option, index) => (
    <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
  )));

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Add Flavors
      </DialogTitle>
      <DialogContent>
        <Search
          freeSolo
          multiple
          filterSelectedOptions
          value={flavors}
          onChange={handleSearchChange}
          renderInput={handleRenderInput}
          renderTags={handleRenderTags}
          sx={{ minWidth: '500px', mt: 1 }}
          />
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

