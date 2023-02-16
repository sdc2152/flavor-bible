import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Check from '@mui/icons-material/Check';
import Addchart from '@mui/icons-material/Addchart';

import Modal from '@mui/material/Modal';

import {
  selectFlavor,
  selectAdjacentFlavors,
  fetchFlavorDetail,
  init as flavorInit,
} from '../flavor/flavorSlice';
import ContainedElement from '../../common/ContainedElement';
import defaultImage from '../../common/images/default-image.png';
import { init as graphInit , fetchFlavors } from '../graph/graphSlice';

const AddFlavorModal = ({ open, handleClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
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

      <Box sx={{ p: 2, display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <Box>
          <Typography variant="h5">Tags</Typography>
          <Button startIcon={<AddIcon />}>Add</Button>
        </Box>
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
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const checkedRef = useRef();
  checkedRef.current = checked;

  const handleAddClick = () => setOpen(true);
  const handleAddClose = () => setOpen(false);

  const handleSelectToggle = () => {
    setChecked([]);
    setSelect(!select);
  }

  const handleDeleteClick = () => console.log('delete');

  const handleAddToChartClick = async () => {
    dispatch(graphInit());
    dispatch(fetchFlavors([flavor.id, ...checked]));
    navigate('/graph');
  };

  const handleCheckToggle = (flavor) => () => {
    console.log(flavor.name);
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
    <Box sx={{ height: '100%', p: 2, display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      <Box>
        <Typography variant="h5">Adjacent Flavors</Typography>
        <AddFlavorModal open={open} handleClose={handleAddClose} />
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
                Create Graph
              </Button>
            </Box>
          )
          : null}
      </Box>
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
