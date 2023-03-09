import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import AddIcon from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Check from '@mui/icons-material/Check';
import Addchart from '@mui/icons-material/Addchart';

import ContainedElement from '../../common/ContainedElement';
import AddFlavorsModal from './AddAdjacentFlavorsModal';
import UnlinkFlavorsModal from './UnlinkFlavorsModal';
import { init as graphInit , fetchFlavors } from '../graph/graphSlice';
import {
  selectAdjacentFlavors,
  deleteFlavorAdjacent,
  fetchFlavorDetail,
  postFlavorAdjacent,
} from '../flavor/flavorSlice';

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

const FlavorAdjacent = ({ flavorId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adjacent = useSelector(selectAdjacentFlavors(flavorId));
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [select, setSelect] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const checkedRef = React.useRef();
  checkedRef.current = checked;

  const handleAddClick = () => setOpenAdd(true);
  const handleAddClose = (values) => {
    // TODO: exclude flavors already adjacent from add search
    if (values) {
      const adjacentIds = values.map((adj) => adj.id);
      dispatch(postFlavorAdjacent({ flavorId, adjacentIds }))
        .then(() => dispatch(fetchFlavorDetail(flavorId)));
    }
    setOpenAdd(false);
  }

  const handleSelectToggle = () => {
    setChecked([]);
    setSelect(!select);
  }

  const handleDeleteClick = () => setOpenDelete(true);
  const handleDeleteClose = (isDelete) => {
    if (isDelete) {
      dispatch(deleteFlavorAdjacent({ flavorId , adjacentIds: checked }))
        .then(() => dispatch(fetchFlavorDetail(flavorId)));
    }
    setOpenDelete(false);
  }

  const handleAddToChartClick = () => {
    dispatch(graphInit());
    dispatch(fetchFlavors([flavorId, ...checked]));
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

  return adjacent
    ? (
      <Box sx={{ height: '100%', p: 2, display: 'grid', gridTemplateRows: 'auto auto 1fr' }}>
        <Box>
          <AddFlavorsModal open={openAdd} handleClose={handleAddClose} />
          <UnlinkFlavorsModal open={openDelete} handleClose={handleDeleteClose} />
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
    ) : null;
}

export default FlavorAdjacent;

