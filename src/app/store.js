import { configureStore } from '@reduxjs/toolkit';
import flavorSearchReducer from '../features/flavorSearch/flavorSearchSlice';
import graphPageReducer from '../features/graphPage/graphPageSlice';
import flavorPageReducer from '../features/flavorPage/flavorPageSlice';
import flavorDetailPageReducer from '../features/flavorDetailPage/flavorDetailPageSlice';
import graphDetailSlice from '../features/graphDetail/graphDetailSlice';

export const store = configureStore({
  reducer: {
    flavorSearch: flavorSearchReducer,
    graphPage: graphPageReducer,
    flavorPage: flavorPageReducer,
    flavorDetailPage: flavorDetailPageReducer,
    [graphDetailSlice.name]: graphDetailSlice.reducer,
  },
});
