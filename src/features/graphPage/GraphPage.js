import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';

import FlavorSearch from '../flavorSearch/FlavorSearch';
import Graph from '../graph/Graph'
import PageGrid from '../../common/PageGrid';
import {
  fetchFlavor,
  removeParentFlavor,
  removeAllFlavors,
  selectParentFlavorIds,
  selectParentFlavors,
  selectAllFlavors,
  selectLinks,
} from './graphPageSlice';

const GraphPage = () => {
  const dispatch = useDispatch();
  const parentFlavorIds = useSelector(selectParentFlavorIds);
  const parentFlavors = useSelector(selectParentFlavors, shallowEqual);
  const nodes = useSelector(selectAllFlavors, shallowEqual);
  const links = useSelector(selectLinks, shallowEqual);

  const handleSearchChange = (event, values, reason) => {
    console.log('handle search change', values, reason);
    const newValue = values.find((value) => !parentFlavorIds.includes(value.id));
    if (newValue) {
      dispatch(fetchFlavor(newValue.id));
    } else {
      dispatch(removeAllFlavors());
    }
  }

  const handleChipDelete = (id) => {
    console.log('handle chip delete', id);
    dispatch(removeParentFlavor(id));
  }

  const handleNodeClick = (node) => {
    console.log('handle node click', node);
    if (parentFlavorIds.includes(node.id)) {
      dispatch(removeParentFlavor(node.id));
    } else {
      dispatch(fetchFlavor(node.id));
    }
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
      <FlavorSearch
        freeSolo
        multiple
        sx={{ mt: 1 }}
        value={parentFlavors}
        onChange={handleSearchChange}
        renderInput={handleRenderInput}
        renderTags={handleRenderTags}
      />
      <Grid container spacing={2}>
        <Grid md={6}>
          <Graph
            nodes={nodes}
            links={links}
            warmupTicks={20}
            onNodeClick={handleNodeClick}
          />
        </Grid>
        <Grid md={6}>
        </Grid>
      </Grid>
    </PageGrid>
  );
}

export default GraphPage;