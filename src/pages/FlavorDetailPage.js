import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Input from '@mui/material/Input';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import ContainedElement from '../common/ContainedElement';
import defaultImage from '../common/images/default-image.png';
import FlavorAdjacent from '../features/flavor/FlavorAdjacent';
import FlavorTags from '../features/tag/FlavorTags';

import {
  selectFlavor,
  selectTags,
  fetchFlavorDetail,
  updateFlavor,
  deleteFlavor,
  init as flavorInit,
} from '../features/flavor/flavorSlice';

const FlavorDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const params = useParams();
  const flavorId = +params.id;

  const flavor = useSelector(selectFlavor(flavorId));

  const [edit, setEdit] = React.useState(false);
  const [nameValue, setNameValue] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchFlavorDetail(flavorId));
    return () => dispatch(flavorInit());
  }, [flavorId]);

  React.useEffect(() => {
    if (flavor) setNameValue(flavor.name);
  }, [flavor]);

  const item = { img: defaultImage, title: 'placeholder', } // XXX: placeholder
  const handleImageError = (event) => {
    const img = event.target;
    if (defaultImage !== img.src) {
      img.src = defaultImage;
      img.srcSet = defaultImage;
    }
  }

  const handleEditClick = () => {
    setEdit(true);
  }
  const handleSaveClick = () => {
    console.log('save click');
    // setEdit(false);
    // dispatch(updateFlavor({ flavorId, values: { name: nameValue } }));
  }
  const handleDeleteClick = () => {
    setEdit(false);
    dispatch(deleteFlavor(flavorId))
      .then(() => navigate('/flavor/page/1'));
  }
  const handleCancelClick = () => {
    setEdit(false);
    setNameValue(flavor.name);
  }
  const handleFlavorNameChange = (event) => {
    console.log('change');
    setNameValue(event.target.value);
  }

  return flavor
    ?
    <ContainedElement>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
          gap: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        { edit
          ?
          <>
            <Fab color="primary" aria-label="save" onClick={handleSaveClick}>
              <SaveIcon />
            </Fab>
            <Fab color="error" aria-label="delete" onClick={handleDeleteClick}>
              <DeleteIcon />
            </Fab>
            <Fab aria-label="cancel" onClick={handleCancelClick}>
              <CloseIcon />
            </Fab>
          </>
          :
          <Fab color="primary" aria-label="edit" onClick={handleEditClick}>
            <EditIcon />
          </Fab>
      }
      </Box>

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
                src={item.img}
                srcSet={item.img}
                style={{ width: '100%' }}
                onError={handleImageError}
                alt={item.title}
                loading="lazy"
                />
              <Box sx={{ display: 'flex', gap: 1 }}>
                {edit
                  ?
                  <Input
                    autoFocus
                    margin="dense"
                    sx={{ ...theme.typography.h4 }}
                    value={nameValue}
                    onChange={handleFlavorNameChange}
                    />
                  :
                  <Typography sx={{ flexGrow: 1, mt: 1, mb: 1 }} variant="h4">{flavor.name}</Typography>
              }
              </Box>
              <FlavorTags flavorId={flavorId} edit={edit} />
            </Box>
          </Grid>
          <Grid md={5} sm={12}>
            <FlavorAdjacent flavorId={flavorId} edit={edit} />
          </Grid>
        </Grid>
      </Container>
    </ContainedElement>
    : null;
}

export default FlavorDetailPage;
