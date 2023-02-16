import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import AddIcon from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Check from '@mui/icons-material/Check';
import Addchart from '@mui/icons-material/Addchart';

import {
  selectFlavor,
  selectAdjacentFlavors,
  fetchFlavorDetail,
  init as flavorInit,
} from '../features/flavor/flavorSlice';
import ContainedElement from '../common/ContainedElement';
import defaultImage from '../common/images/default-image.png';
import { init as graphInit , fetchFlavors } from '../features/graph/graphSlice';
import Search from '../features/search/Search';

const AddFlavorModal = ({ open, handleClose }) => {
  const [flavors, setFlavors] = React.useState([]);

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

  const handleRenderInput = (params) => (
    <TextField {...params} variant="outlined" label="Search flavors" />
  );

  const handleRenderTags = (value, getTagProps) => {
    return value.map((option, index) => {
      return <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
    }
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const DeleteFlavorModal = ({ open, handleClose }) => {
  const handleCancel = () => handleClose(false);
  const handleDelete = () => handleClose(true);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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

const FlavorDisplay = ({ flavor }) => {
  const item = { img: defaultImage, title: 'placeholder', } // XXX: placeholder
  const handleImageError = (event) => {
    const img = event.target;
    if (defaultImage !== img.src) {
      img.src = defaultImage;
      img.srcSet = defaultImage;
    }
  }
  return (
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
  );
}

const FlavorLinkListItem = ({ flavor }) => (
  <ListItemButton
    key={flavor.id}
    component={Link}
    to={`/flavor/${flavor.id}`}
    dense
  >
    <ListItemText primary={flavor.name} />
  </ListItemButton>
);

const FlavorCheckListItem = ({ flavor, handleCheckToggle, checked }) => (
  <ListItemButton
    key={flavor.id}
    onClick={handleCheckToggle}
    dense
  >
    <ListItemIcon>
      <Checkbox
        edge="start"
        size="small"
        checked={checked}
        tabIndex={-1}
        disableRipple
        sx={{ p: 0, pl: 1 }}
        />
    </ListItemIcon>
    <ListItemText primary={flavor.name} />
  </ListItemButton>
);

const MemoFlavorListItem = React.memo(
  ({ flavor, handleCheckToggle, checked, select }) => (
    select
      ? <FlavorCheckListItem 
        flavor={flavor}
        handleCheckToggle={handleCheckToggle}
        checked={checked.indexOf(flavor.id) !== -1}
        />
      : <FlavorLinkListItem flavor={flavor} />
  ),
  (prevProps, newProps) => (
    (prevProps.checked.indexOf(prevProps.flavor.id) === -1) === (newProps.checked.indexOf(newProps.flavor.id) === -1)
      && prevProps.select === newProps.select
  ));

const AdjacentDisplay = ({ flavor, adjacent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [select, setSelect] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const checkedRef = useRef();
  checkedRef.current = checked;

  const handleAddClick = () => setOpenAdd(true);
  const handleAddClose = () => setOpenAdd(false);

  const handleSelectToggle = () => {
    setChecked([]);
    setSelect(!select);
  }

  const handleDeleteClick = () => setOpenDelete(true);
  const handleDeleteClose = (isDelete) => {
    // get selected and make unlink call
    setOpenDelete(false);
  }

  const handleAddToChartClick = () => {
    dispatch(graphInit());
    dispatch(fetchFlavors([flavor.id, ...checked]));
    navigate('/graph');
  };

  const handleCheckToggle = (flavor) => () => {
    const index = checkedRef.current.indexOf(flavor.id);
    const newChecked = [...checkedRef.current];
    if (index === -1) {
      newChecked.push(flavor.id);
    } else {
      newChecked.splice(index, 1);
    }
    setChecked(newChecked);
  }

  return (
    <Box sx={{ height: '100%', p: 2, display: 'grid', gridTemplateRows: 'auto auto 1fr' }}>
      <Box>
        <AddFlavorModal open={openAdd} handleClose={handleAddClose} />
        <DeleteFlavorModal open={openDelete} handleClose={handleDeleteClose} />
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>Adjacent</Typography>
          <Box>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              disabled={select}
            >
              Add
            </Button>
            <Button
              startIcon={<Check />}
              onClick={handleSelectToggle}
            >
              Select
            </Button>
          </Box>
        </Box>

        {select
          ? (
            <Box>
              <Button 
                startIcon={<Delete />}
                onClick={handleDeleteClick}
                disabled={checked.length === 0}
              >
                Delete
              </Button>
              <Button 
                startIcon={<Addchart />}
                onClick={handleAddToChartClick}
                disabled={checked.length === 0}
              >
                Graph
              </Button>
            </Box>
          )
          : null}
      </Box>

      <Divider />

      <ContainedElement style={{ overflowX: 'auto' }}>
        <List>
          {adjacent.map((adj) => (
            <MemoFlavorListItem
              key={adj.id}
              flavor={adj}
              select={select}
              checked={checked}
              handleCheckToggle={handleCheckToggle(adj)}
              />
          ))}
        </List>
      </ContainedElement>
    </Box>
  );
}

const FlavorDetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const flavorId = +params.id;
  const flavor = useSelector((state) => selectFlavor(state, flavorId));
  const adjacent = useSelector((state) => selectAdjacentFlavors(state, flavorId));

  React.useEffect(() => {
    dispatch(fetchFlavorDetail(flavorId));
    return () => dispatch(flavorInit());
  }, [flavorId]);

  return flavor && adjacent
    ? (<ContainedElement>
      <Container
        disableGutters
        sx={{ height: '100%', bgcolor: 'background.paper' }}
      >
        <Grid container sx={{ height: '100%' }}>
          <Grid md={7} sm={12}
            sx={{ borderRight: '1px solid', borderColor: 'divider' }}
          >
            <FlavorDisplay flavor={flavor} />
          </Grid>
          <Grid md={5} sm={12}>
            <AdjacentDisplay flavor={flavor} adjacent={adjacent} />
          </Grid>
        </Grid>
      </Container>
    </ContainedElement>)
    : null;
}

export default FlavorDetailPage;
