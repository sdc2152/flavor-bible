import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import '@fontsource/roboto/500.css';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import AppBar from './features/appBar/AppBar';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{ boxShadow: 0, bgcolor: 'background.paper', color: 'primary.main' }}
      >
        <Toolbar>
          <Button component={Link} to={'/'}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              Flavor Bible
            </Typography>
          </Button>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button component={Link} to={'/graph'}>Graph</Button>
            <Button component={Link} to={'/flavor/page/1'}>Flavors</Button>
          </Box>

        </Toolbar>
        <Divider />
      </AppBar>
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
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
