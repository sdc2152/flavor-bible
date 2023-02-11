import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { Link } from 'react-router-dom';

const DashboardListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to='/graph'>
      <ListItemIcon>
        <AccountTreeIcon />
      </ListItemIcon>
      <ListItemText primary="Graph" />
    </ListItemButton>
    <ListItemButton component={Link} to='/flavor'>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Flavors" />
    </ListItemButton>
  </React.Fragment>
);

export default DashboardListItems;
