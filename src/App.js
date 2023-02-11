import * as React from 'react';
import { Outlet } from 'react-router-dom';

import '@fontsource/roboto/500.css';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Drawer from './features/drawer/Drawer';
import AppBar from './features/appBar/AppBar';
import DashboardListItems from './common/DashboardListItems';

const drawerWidth = 240;

const App = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open} drawerwidth={drawerWidth}>
        <Toolbar sx={{ pr: '24px' }} >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Flavor Bible
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} width={drawerWidth}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {DashboardListItems}
        </List>
        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => (
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900]
          ),
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',

          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        }}
      >
        <Toolbar />

        <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default App;