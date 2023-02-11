import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFlavor } from "./flavorDetailApi";

const name = 'flavorDetailPage';

const initialState = {
  flavor: null,
  status: 'idle',
  error: null,
}

export const fetchFlavorDetail = createAsyncThunk(
  `${name}/fetchFlavorDetail`,
  async (id) => await getFlavor(id),
);

const flavorDetailPageSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFlavorDetail.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFlavorDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flavor = action.payload;
      })
      .addCase(fetchFlavorDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectFlavor = (state) => state[name].flavor;

export default flavorDetailPageSlice.reducer;