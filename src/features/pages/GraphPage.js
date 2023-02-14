import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';

import Search from '../search/Search';
import Graph from '../graph/Graph'
import GraphDetail from '../graphDetail/GraphDetail';
import PageGrid from '../../common/PageGrid';
import {
  fetchFlavor,
  removeParentFlavor,
  removeAllFlavors,
  selectParentFlavorIds,
  selectParentFlavors,
  selectAllFlavors,
  selectLinks,
  selectFlavorsById,
} from '../graph/graphSlice';

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

  const paperStyle = { height: '100%', width: '100%' };

  return (
    <PageGrid>
        <Search
          freeSolo
          multiple
          value={parentFlavors}
          onChange={handleSearchChange}
          renderInput={handleRenderInput}
          renderTags={handleRenderTags}
        />
      <Grid container spacing={2}>
        <Grid sm={6}>
          <Paper sx={paperStyle}>
            <Graph />
          </Paper>
        </Grid>
        <Grid sm={6}>
          <Paper sx={paperStyle}>
            <GraphDetail
              parents={parentFlavors}
              flavorsById={flavorsById}
              links={links}
            />
          </Paper>
        </Grid>
      </Grid>
    </PageGrid>
  );
}

export default GraphPage;
