import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {
  fetchFlavorsPaginated,
  selectFlavors,
  selectPagination,
} from './flavorPageSlice';

import { Pagination } from '@mui/material';

const FlavorPage = () => {
  const dispatch = useDispatch();
  const flavors = useSelector(selectFlavors);
  const pagination = useSelector(selectPagination);

  React.useEffect(() => {
    dispatch(fetchFlavorsPaginated(pagination.current || 1));
  }, [dispatch, pagination]);

  const handlePaginationChange = (event, value) => {
    dispatch(fetchFlavorsPaginated(value));
  }

  return <>
    <Pagination
      count={pagination.total}
      page={pagination.current}
      onChange={handlePaginationChange}
    />
    <List>
      {flavors.map((flavor) => (
        <ListItemButton
          key={flavor.id}
          component={Link}
          to={`/flavor/${flavor.id}`}
          dense
        >
          <ListItemText primary={flavor.name} />
        </ListItemButton>
      ))}
    </List>
  </>
}

export default FlavorPage;
