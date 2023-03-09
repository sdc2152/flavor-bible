import React from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import defaultImage from '../../common/images/default-image.png';

const FlavorForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState(defaultImage);

  const handleFlavorNameChange = (event) => setName(event.target.value);

  return (
    <Container disableGutters sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid md={7} sm={12} sx={{ borderRight: '1px solid', borderColor: 'divider' }}>
          <Box
            sx={{
              height: '100%',
              p: 2,
              display: 'grid',
              gridTemplateRows: 'auto auto 1fr',
            }}>
            <img
              src={image}
              srcSet={image}
              style={{ width: '100%' }}
              alt="flavor-image"
              loading="lazy"
              />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Input
                autoFocus
                margin="dense"
                sx={{ ...theme.typography.h4 }}
                value={name}
                onChange={handleFlavorNameChange}
                placeholder="Flavor name"
                />
            </Box>
            {/* <FlavorTags flavorId={flavorId} /> */}
          </Box>
        </Grid>
        <Grid md={5} sm={12}>
          {/* <FlavorAdjacent flavorId={flavorId} /> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default FlavorForm;
