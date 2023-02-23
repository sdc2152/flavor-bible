import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import ContainedElement from '../../common/ContainedElement';
import AddTagsModal from '../addTagsModal/AddTagsModal';
import {
  fetchFlavorDetail,
  postTags,
  unlinkTags,
  selectTags,
} from '../flavor/flavorSlice';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.3),
}));

const FlavorTags = ({ flavorId }) => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags(flavorId));
  const [tagsOpen, setTagsOpen] = React.useState(false);

  const handleTagClick = (tag) => () => {
    console.log('tag click', tag);
  }
  const handleTagDelete = (tag) => () => {
    dispatch(unlinkTags({ flavorId, tagIds: [tag.id] }))
      .then(() => dispatch(fetchFlavorDetail(flavorId)));
  }

  const handleOpen = () => setTagsOpen(true);
  const handleClose = (values) => {
    if (values) {
      const tagNames = values.map((t) => t.name);
      dispatch(postTags({ flavorId, tagNames }))
        .then(() => dispatch(fetchFlavorDetail(flavorId)));
    }
    setTagsOpen(false);
  }

  return tags
    ? (
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto auto 1fr' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>Tags</Typography>
          <Button onClick={handleOpen} startIcon={<AddIcon />}>Add</Button>
          <AddTagsModal open={tagsOpen} handleClose={handleClose} />
        </Box>
        <Divider />
        <ContainedElement style={{ overflowX: 'auto' }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            mt: 1,
            p: 0,
          }} component="ul">
            {tags.map((tag) => (
              <ListItem key={tag.id}>
                <Chip
                  label={tag.name}
                  onClick={handleTagClick(tag)}
                  onDelete={handleTagDelete(tag)}
                  />
              </ListItem>
            ))}
          </Box>
        </ContainedElement>
      </Box>
    ) : null;
}

export default FlavorTags;
