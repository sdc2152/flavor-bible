import React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Search from '../search/Search';
import FocusTextField from '../../common/FocusTextField';

const AddTagsModal = ({ open, handleClose }) => {
  const [tags, setTags] = React.useState([]);

  const handleAdd = () => {
    handleClose(tags);
    setTags([]);
  }
  const handleCancel = () => {
    handleClose();
    setTags([]);
  }

  const handleSearchChange = (event, values, reason) => {
    switch(reason) {
      case 'selectOption':
        const newTag = values[values.length-1];
        const tagExists = tags.find((tag) => tag.name === newTag.name);
        if (!tagExists) {
          setTags([...tags, newTag]);
        }
        break;
      case 'createOption':
        const name = values[values.length-1];
        const nameExists = tags.find((tag) => tag.name === name);
        if (!nameExists) {
          setTags([...tags, { id: null, name }]);
        }
        break;
      case 'clear':
        setTags([]);
        break;
      case 'removeOption':
        setTags(values)
        break;
    }
  }

  const handleRenderInput = (params) => {
    return <FocusTextField {...params} variant="outlined" label="Search Tags" />;
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
        Add Tags
      </DialogTitle>
      <DialogContent>
        <Search
          freeSolo
          multiple
          filterSelectedOptions
          search={'tag'}
          value={tags}
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

export default AddTagsModal;

