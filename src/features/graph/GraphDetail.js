import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import ContainedElement from "../../common/ContainedElement";
import {
  selectParentFlavors,
  selectLinks,
  selectFlavorsById,
  selectFilterMaxLink,
  selectFilterMinLink,
  fetchFlavor,
} from './graphSlice';

const GraphDetail = () => {
  const dispatch = useDispatch();
  const maxLinks = useSelector(selectFilterMaxLink);
  const minLinks = useSelector(selectFilterMinLink);
  const parents = useSelector(selectParentFlavors, shallowEqual);
  const links = useSelector(selectLinks, shallowEqual);
  const flavorsById = useSelector(selectFlavorsById);

  const handleClick = (id) => () => dispatch(fetchFlavor(id));

  const childToParents = {};
  links.forEach((link) => {
    if (!parents.find((parent) => parent.id === link.target)) {
      childToParents[link.target] = childToParents[link.target]
        ? [...childToParents[link.target], link.source]
        : [link.source];
    }
  });

  const countIds = Array.from(parents, (_, i) => parents.length - i);
  const count = countIds.reduce((a, id) => ({ ...a, [id]: (new Set()) }), {});

  const groupIds = [];
  const group = {};
  Object.entries(childToParents).forEach(([childId, parentIds]) => {
    const key = parentIds
    .sort((id1, id2) => flavorsById[id1].name.localeCompare(flavorsById[id2].name))
    .join('-');
    if (key in group) {
      group[key].childIds.push(childId);
    } else {
      groupIds.push(key);
      group[key] = {
        parentIds,
        color: flavorsById[childId].color,
        title: parentIds.map((id) => flavorsById[id].name).join(' - '),
        childIds: [childId],
      }
    }
    count[parentIds.length].add(key);
  });
  groupIds.sort((a, b) => {
    if (group[a].parentIds.length === group[b].parentIds.length) {
      return group[a].title.localeCompare(group[b].title);
    } else {
      return -(group[a].parentIds.length - group[b].parentIds.length);
    }
  });
  groupIds.forEach((id) => {
    group[id].childIds
      .sort((id1, id2) => (
        flavorsById[id1].name.localeCompare(flavorsById[id2].name)
      ));
  });
  countIds.forEach((id) => {
    count[id] = Array.from(count[id])
      .sort((k1, k2) => group[k1].title.localeCompare(group[k2].title));
  })

  const totalChildren = groupIds.reduce((a, id) => a + group[id].childIds.length, 0);

  const isFiltered = (countId) => (minLinks != null && countId < minLinks)
    || (maxLinks != null && countId > maxLinks)

  return (
    <ContainedElement>
      <Box
        sx={{
          p: 2,
          height: '100%',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        }}>

        <Box>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>Links</Typography>
          <Box>
            <Typography>{totalChildren} Results</Typography>
          </Box>
        </Box>

        <ContainedElement style={{ overflowX: 'auto' }}>
          <List sx={{ pt: 0 }}>
            {countIds.map((countId) => isFiltered(countId) ? null : (
              count[countId].map((id) => (
                <li key={id}>
                  <ul style={{ padding: '0' }}>
                    <ListSubheader sx={{ backgroundColor: group[id].color }}>
                      <Typography>{group[id].title}</Typography>
                      <Typography>Links: {countId}</Typography>
                      <Typography>Results: {group[id].childIds.length}</Typography>
                    </ListSubheader>
                    {group[id].childIds.map((childId) => (
                      <ListItemButton key={childId} onClick={handleClick(childId)} dense>
                        <ListItemText primary={flavorsById[childId].name} />
                      </ListItemButton>
                    ))}
                  </ul>
                </li>
              ))
            ))}
          </List>
        </ContainedElement>

      </Box>
    </ContainedElement>
  );
};

export default GraphDetail;
