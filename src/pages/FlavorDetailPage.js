import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import ContainedElement from '../common/ContainedElement';
import defaultImage from '../common/images/default-image.png';
import AdjacentFlavors from '../features/adjacentFlavors/AdjacentFlavors';
import {
  selectFlavor,
  selectAdjacentFlavors,
  fetchFlavorDetail,
  init as flavorInit,
} from '../features/flavor/flavorSlice';

const FlavorDetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const flavorId = +params.id;
  const flavor = useSelector(selectFlavor(flavorId));
  const adjacent = useSelector(selectAdjacentFlavors(flavorId));

  React.useEffect(() => {
    dispatch(fetchFlavorDetail(flavorId));
    return () => dispatch(flavorInit());
  }, [flavorId]);

  const item = { img: defaultImage, title: 'placeholder', } // XXX: placeholder
  const handleImageError = (event) => {
    const img = event.target;
    if (defaultImage !== img.src) {
      img.src = defaultImage;
      img.srcSet = defaultImage;
    }
  }

  return flavor && adjacent
    ?
    <ContainedElement>
      <Container disableGutters sx={{ height: '100%', bgcolor: 'background.paper' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid md={7} sm={12} sx={{ borderRight: '1px solid', borderColor: 'divider' }}>
            <Box>
              <img
                src={item.img}
                srcSet={item.img}
                style={{ width: '100%' }}
                onError={handleImageError}
                alt={item.title}
                loading="lazy"
                />
              <Typography variant="h4">{flavor.name}</Typography>
              <Box sx={{ p: 2, display: 'grid', gridTemplateRows: 'auto auto 1fr' }}>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="h5" sx={{ flexGrow: 1 }}>Tags</Typography>
                  <Button startIcon={<AddIcon />}>Add</Button>
                </Box>
                <Divider />
                <Box></Box>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={12}>
            <AdjacentFlavors flavor={flavor} adjacent={adjacent} />
          </Grid>
        </Grid>
      </Container>
    </ContainedElement>
    : null;
}

export default FlavorDetailPage;
