import { configureStore } from '@reduxjs/toolkit';
import flavorSearchReducer from '../features/flavorSearch/flavorSearchSlice';
import graphPageReducer from '../features/graphPage/graphPageSlice';
import flavorPageReducer from '../features/flavorPage/flavorPageSlice';
import flavorDetailPageReducer from '../features/flavorDetailPage/flavorDetailPageSlice';

export const store = configureStore({
  reducer: {
    flavorSearch: flavorSearchReducer,
    graphPage: graphPageReducer,
    flavorPage: flavorPageReducer,
    flavorDetailPage: flavorDetailPageReducer,
  },
});
