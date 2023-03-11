import React from 'react';
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';

import defaultImage from '../../common/images/default-image.png';
import Search from '../search/Search';

const FlavorForm = () => {
  const dispatch = useDispatch();
  const [image, setImage] = React.useState(defaultImage);
  const [name, setName] = React.useState('');
  const [adjFlavors, setAdjFlavors] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  // image
  const handleImageChange = (event) => {
    console.log('image change');
    if (event.target.files) {
      const file = event.target.files[0];
      const fr = new FileReader();
      fr.onload = () => {
        setImage(fr.result)
      };
      fr.readAsDataURL(file);
    } else {
      setImage(defaultImage);
    }
  }
  const handleRemoveImage = () => {
    setImage(defaultImage);
  }

  // name
  const handleFlavorNameChange = (event) => setName(event.target.value);

  // adjacent flavors
  const handleSearchChange = (event, values, reason) => {
    switch(reason) {
      case 'selectOption':
        const flavorIds = adjFlavors.map((flavor) => flavor.id);
        const newValue = values.find((value) => !flavorIds.includes(value.id));
        if (newValue) {
          setAdjFlavors([...adjFlavors, newValue]);
        }
        break;
      case 'clear':
        setAdjFlavors([]);
        break;
      case 'removeOption':
        setAdjFlavors(values);
        break;
    }
  }
  const handleRenderInput = (params) => {
    return <TextField {...params} variant="outlined" label="Adjacent Flavors" />;
  }
  const handleRenderTags = (value, getTagProps) => (value.map((option, index) => (
    <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
  )));

  // tags
  const handleTagSearchChange = (event, values, reason) => {
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

  const handleTagRenderInput = (params) => {
    return <TextField {...params} variant="outlined" label="Tags" />;
  }

  const handleTagRenderTags = (value, getTagProps) => (value.map((option, index) => (
    <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
  )));


  return (
    <Container
      disableGutters
      sx={{ height: '100%', bgcolor: 'background.paper' }}
    >
      <Box sx={{ position: 'relative' }}>
        <img
          src={image}
          srcSet={image}
          style={{ width: '100%' }}
          alt="flavor-image"
          loading="lazy"
          />
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, left: 0, p: 1 }} >
          <form style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              component="label"
              startIcon={<AddAPhotoIcon />}
            >
              Add Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                />
            </Button>
            <Button
              startIcon={<ClearIcon />}
              onClick={handleRemoveImage}
              disabled={image === defaultImage}
            >
              Remove Image
            </Button>
          </form>
        </Box>
      </Box>


      <Stack spacing={1}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={handleFlavorNameChange}
          />
        <Search
          freeSolo
          multiple
          filterSelectedOptions
          search="flavor"
          value={adjFlavors}
          onChange={handleSearchChange}
          renderInput={handleRenderInput}
          renderTags={handleRenderTags}
          />
        <Search
          freeSolo
          multiple
          filterSelectedOptions
          search="tag"
          value={tags}
          onChange={handleTagSearchChange}
          renderInput={handleTagRenderInput}
          renderTags={handleTagRenderTags}
          />
      </Stack>
    </Container>
  );
}

export default FlavorForm;
