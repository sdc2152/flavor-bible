import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Search from '../features/search/Search';
import Graph from '../features/graph/Graph'
import GraphDetail from '../features/graph/GraphDetail';
import PageGrid from '../common/PageGrid';
import LinksMenu from '../features/flavor/LinksMenu';
import {
  fetchFlavor,
  removeParentFlavor,
  removeAllFlavors,
  selectParentFlavorIds,
  selectParentFlavors,
  selectLinks,
  selectFlavorsById,
} from '../features/graph/graphSlice';

const GraphPage = () => {
  const dispatch = useDispatch();

  const parentFlavorIds = useSelector(selectParentFlavorIds);
  const parentFlavors = useSelector(selectParentFlavors, shallowEqual);
  const links = useSelector(selectLinks, shallowEqual);
  const flavorsById = useSelector(selectFlavorsById);

  const handleSearchChange = (event, values, reason) => {
    const newValue = values.find((value) => !parentFlavorIds.includes(value.id));
    if (newValue) {
      dispatch(fetchFlavor(newValue.id));
    } else {
      dispatch(removeAllFlavors());
    }
  }

  const handleChipDelete = (id) => {
    dispatch(removeParentFlavor(id));
  }

  const handleRenderInput = (params) => (
    <TextField {...params} variant="outlined" label="Search flavors" />
  );

  const handleRenderTags = (tagValue, getTagProps) => (
    tagValue.map((option, index) => (
      <Chip
        avatar={
        <div style={{
          minWidth: '20px',
          borderRadius: '100%',
          backgroundColor: option.color,
        }}></div>}
        label={option.name}
        {...getTagProps({ index })}
        onDelete={() => handleChipDelete(option.id)}
        />
    )));

  return (
    <PageGrid>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Box sx={{ p: 2, display: 'flex' }}>
          <Search
            sx={{ flexGrow: 1 }}
            freeSolo
            multiple
            filterSelectedOptions
            search={'flavor'}
            value={parentFlavors}
            onChange={handleSearchChange}
            renderInput={handleRenderInput}
            renderTags={handleRenderTags}
            />
          <Box
            sx={{
              p: 0.5,
              pl: 1,
              pr: 1,
              gap: 1,
              display: 'flex'
            }}
          >
            <LinksMenu />
          </Box>
        </Box>
        <Divider />
      </Box>
      <Grid container>
        <Grid sm={8}>
          <Graph />
        </Grid>
        <Grid sm={4}>
          <Box sx={{
            bgcolor: 'background.paper',
            height: '100%',
            width: '100%',
            boxShadow: '0 10px 10px 0 rgb(0 0 0 / 20%)',
          }} >
            <GraphDetail
              parents={parentFlavors}
              flavorsById={flavorsById}
              links={links}
              />
          </Box>
        </Grid>
      </Grid>
    </PageGrid>
  );
}

export default GraphPage;
