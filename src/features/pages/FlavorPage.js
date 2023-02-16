import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import {
  fetchFlavorsPaginated,
  selectFlavors,
  selectPagination,
} from '../flavor/flavorSlice';
import ContainedElement from '../../common/ContainedElement';

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
    <ContainedElement>
      <div style={{
        display: 'grid',
        gridTemplateRows: '1fr auto',
        height: '100%',
      }} >
        <Box sx={{ bgcolor: 'background.paper', overflow: 'auto' }}>
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
        </Box>
        <Paper sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          boxShadow: 4,
        }} >
          <Pagination
            count={pagination.total}
            page={pagination.current}
            onChange={handlePaginationChange}
            />
        </Paper>
      </div>
    </ContainedElement>
  ) : null;
}

export default FlavorPage;
