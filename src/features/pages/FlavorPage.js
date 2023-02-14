import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import {
  fetchFlavorsPaginated,
  selectFlavors,
  selectPagination,
} from '../flavor/flavorSlice';

const FlavorPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const flavors = useSelector(selectFlavors);
  const pagination = useSelector(selectPagination);

  React.useEffect(() => {
    dispatch(fetchFlavorsPaginated(params.pageNumber));
  }, [params.pageNumber]);

  const handlePaginationChange = (event, value) => {
    navigate(`/flavor/page/${value}`);
  }

  return pagination.total && pagination.current ? (
    <>
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
  ) : null;
}

export default FlavorPage;
