import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import ContainedElement from "../../common/ContainedElement";
import {
  selectGroup,
  selectSort,
  updateGroup,
  updateSort,
} from './graphDetailSlice';

const GraphDetail = ({ parents, nodes, links }) => {
  const dispatch = useDispatch();
  const sortValue = useSelector(selectSort);
  const groupValue = useSelector(selectGroup);

  const handleSortChange = (event) => dispatch(updateSort(event.target.value));
  const handleGroupChange = (event) => dispatch(updateGroup(event.target.value));

  // group by parents
  // sort by links high low
  
  return (
    <ContainedElement>
      <div style={{
        height: '100%',
        display: 'grid',
      }}>
        <div>
          <FormControl sx={{ m: 1 }} size="small">
            <InputLabel id="sort-select-label">Sort</InputLabel>
            <Select
              labelId="sort-select-label"
              label="Sort"
              value={sortValue}
              onChange={handleSortChange}
            >
              <MenuItem value={'linksHighLow'}>Links (High to Low)</MenuItem>
              <MenuItem value={'linksLowHigh'}>Links (Low to High)</MenuItem>
              <MenuItem value={'nameAZ'}>Name (A to Z)</MenuItem>
              <MenuItem value={'nameZA'}>Name (Z to A)</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1 }} size="small">
            <InputLabel id="group-select-label">Group</InputLabel>
            <Select
              label="Group"
              labelId="group-select-label"
              value={groupValue}
              onChange={handleGroupChange}
            >
              <MenuItem value={'link'}>Links</MenuItem>
              <MenuItem value={'flavor'}>Flavor</MenuItem>
              <MenuItem value={''}><em>None</em></MenuItem>
            </Select>
          </FormControl>
        </div>

        <List></List>

      </div>
    </ContainedElement>
  );
};

export default GraphDetail;
