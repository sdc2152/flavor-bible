import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.3),
}));

const TagList = ({ tags, onClick, onDelete }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      mt: 1,
      p: 0,
    }}
    component="ul"
  >
    {tags.map((tag) => (
      <ListItem key={tag.id}>
        <Chip
          label={tag.name}
          onClick={() => onClick(tag)}
          onDelete={() => onDelete(tag)}
          />
      </ListItem>
    ))}
  </Box>
);

export default TagList;
