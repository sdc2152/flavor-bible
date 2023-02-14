import { configureStore } from '@reduxjs/toolkit';
import graphSlice from '../features/graph/graphSlice';
import flavorSlice from '../features/flavor/flavorSlice';
import searchSlice from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    [graphSlice.name]: graphSlice.reducer,
    [flavorSlice.name]: flavorSlice.reducer,
    [searchSlice.name]: searchSlice.reducer,
  },
});
