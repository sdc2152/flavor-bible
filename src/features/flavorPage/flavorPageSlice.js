import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFlavorListPaginated } from "./flavorPageApi";

const initialState = {
  flavors: {
    byId: {},
    allIds: [],
  },
  pagination: {
    current: null,
    total: null,
  },
  status: 'idle',
  error: null,
};

export const fetchFlavorsPaginated = createAsyncThunk(
  'flavorPage/fetchFlavorsPaginated',
  async (pageNumber) => {
    const response = await getFlavorListPaginated(pageNumber);
    return response;
  }
);

const flavorPageReducer = createSlice({
  name: 'flavorPage',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFlavorsPaginated.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFlavorsPaginated.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // update pagination information
        state.pagination.current = action.payload.page;
        state.pagination.total = action.payload.pages;
        // update flavor information
        const flavorsById = {};
        const flavorsAllIds = [];
        action.payload.items.forEach((flavor) => {
          flavorsById[flavor.id] = flavor;
          flavorsAllIds.push(flavor.id);
        });
        state.flavors.byId = flavorsById;
        state.flavors.allIds = flavorsAllIds;
      })
      .addCase(fetchFlavorsPaginated.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectFlavors = (state) => (
  state.flavorPage.flavors.allIds
    .map((id) => state.flavorPage.flavors.byId[id])
);

export const selectPagination = (state) => (
  state.flavorPage.pagination
);

export default flavorPageReducer.reducer;