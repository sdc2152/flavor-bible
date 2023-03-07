import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import foodImage from '../common/images/food.jpg';
import ingredientImage from '../common/images/ingredients.png';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

import ActionAreaCard from '../common/ActionAreaCard';
import Search from '../features/search/Search';

import {
  fetchFlavors,
  init as graphInit,
}from '../features/graph/graphSlice';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRenderInput = (params) => (
    <TextField {...params} variant="outlined" placeholder="Enter an ingredient, flavor, or cuisine." />
  );

  const handleSearchChange = (event, value, reason) => {
    dispatch(graphInit());
    dispatch(fetchFlavors([value.id]));
    navigate('/graph');
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px',
          width: '100%',
          backgroundImage: `url(${foodImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <Box
          sx={{
            maxWidth: { xs: '100%', sm: '600px' },
          }} >
          <Typography
            variant="h4"
            sx={{
              pb: 2,
              color: 'white',
              filter: 'drop-shadow(0px 0px 5px #000)',
            }}
          >Select a flavor. Start a map.</Typography>
          <Paper>
            <Search
              freeSolo
              renderInput={handleRenderInput}
              onChange={handleSearchChange}
              />
          </Paper>
        </Box>
      </Box>
      <Container>
        <Box
          sx={{
            bgcolor: 'grey.200',
            height: 280,
            mt: 4,
            p: 4,
            pl: 15,
            pr: 15,
            borderRadius: 4,
          }}
        >
          <Grid container>
            <Grid md={5} xs={12} pr={2}>
              <Typography variant="h4">Take the first step</Typography>
              <Typography>Select your goal and we'll quide your journey.</Typography>
            </Grid>
            <Grid md={7} xs={12}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <ActionAreaCard icon={ <FastfoodIcon sx={{ fontSize: 50 }}/> } label="Food" />
                <ActionAreaCard icon={ <LocalDiningIcon sx={{ fontSize: 50 }}/> } label="Food" />
                <ActionAreaCard icon={ <SoupKitchenIcon sx={{ fontSize: 50 }}/> } label="Food" />
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid>
              <Box
                sx={{
                  height: 190,
                  width: 400,
                  marginTop: -2,
                  marginLeft: -5,
                  backgroundImage: `url(${ingredientImage})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );

};

export default HomePage;
