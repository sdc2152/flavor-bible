import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFlavorSuggestions } from './flavorSearchApi';

const initialState = {
  options: [],
  status: 'idle',
  error: null,
};

export const fetchOptions = createAsyncThunk(
  'flavorSearch/fetchOptions',
  async (searchString) => {
    const response = await fetchFlavorSuggestions(searchString);
    return response;
  }
);

export const flavorSearchSlice = createSlice({
  name: 'flavorSearch',
  initialState,
  reducers: {
    clearOptions: (state, action) => {
      state.options = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOptions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchOptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.options = action.payload;
      })
      .addCase(fetchOptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearOptions } = flavorSearchSlice.actions;

export const selectOptions = (state) => state.flavorSearch.options;

export default flavorSearchSlice.reducer;
