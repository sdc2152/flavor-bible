import { formatMuiErrorMessage } from "@mui/utils";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getFlavorListPaginated, getFlavor, } from "./flavorApi";

const name = 'flavor';

const initialState = {
  flavors: {
    byId: {},
    allIds: [],
  },
  links: {
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

const addLink = (state, link) => {
  const lastIndex = state.links.allIds.length - 1;
  const id = state.links.allIds[lastIndex] === undefined
    ? 0
    : state.links.allIds[lastIndex] + 1;
  state.links.allIds.push(id);
  state.links.byId[id] = { id, ...link };
}

export const fetchFlavorDetail = createAsyncThunk(
  `${name}/fetchFlavorDetail`,
  async (id) => {
    const response = await getFlavor(id)
    return response;
  }
);

export const fetchFlavorsPaginated = createAsyncThunk(
  `${name}/fetchFlavorsPaginated`,
  async (pageNumber) => {
    const response = await getFlavorListPaginated(pageNumber);
    return response;
  }
);

const flavorSlice = createSlice({
  name,
  initialState,
  reducers: {
    init: (state, action) => {
      console.log('init');
      return initialState;
    },
  },
  extraReducers(builder) {
    builder

      // flavorList
      .addCase(fetchFlavorsPaginated.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFlavorsPaginated.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFlavorsPaginated.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const flavorsById = {};
        const flavorsAllIds = [];
        action.payload.items.forEach((flavor) => {
          flavorsById[flavor.id] = flavor;
          flavorsAllIds.push(flavor.id);
        });
        state.flavors.byId = flavorsById;
        state.flavors.allIds = flavorsAllIds;
        state.pagination.current = action.payload.page;
        state.pagination.total = action.payload.pages;
      })

      // flavor detail
      .addCase(fetchFlavorDetail.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFlavorDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFlavorDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, name, adjacent } = action.payload;
        state.flavors.byId = adjacent.reduce(
          (a, flavor) => ({ ...a, [flavor.id]: flavor })
          , { [id]: { id, name } });
        state.flavors.allIds = [ id, ...adjacent.map((adj) => adj.id) ];
        adjacent.forEach((adj) => addLink(state, { source: id, target: adj.id }));
      })
  },
});

export const { init } = flavorSlice.actions;

export const selectAdjacentFlavors = (state, id) => {
  console.log(state[name]);
  return state[name].links.allIds.reduce((a, lId) => {
    const link = state[name].links.byId[lId];
    if (link.source === id) {
      return [ ...a, state[name].flavors.byId[link.target] ];
    } else {
      return a;
    }
  }, []);
}

export const selectFlavor = (state, id) => state[name].flavors.byId[id];

export const selectFlavors = (state) => (
  state[name].flavors.allIds.map((id) => selectFlavor(state, id))
);

export const selectPagination = (state) => (
  state[name].pagination
);

export default flavorSlice;
