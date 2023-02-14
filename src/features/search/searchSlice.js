import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchSuggestions } from './searchApi';

const initialState = {
  options: [],
  status: 'idle',
  error: null,
};

const name = 'search';

export const fetchOptions = createAsyncThunk(
  `${name}/fetchOptions`,
  async (searchString) => {
    const response = await fetchSearchSuggestions(searchString);
    return response;
  }
);

export const searchSlice = createSlice({
  name,
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

export const { clearOptions } = searchSlice.actions;

export const selectOptions = (state) => state[name].options;

export default searchSlice;
