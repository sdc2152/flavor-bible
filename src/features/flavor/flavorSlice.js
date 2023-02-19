import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import FlavorAPI from "./flavorApi";
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

export const postFlavorAdjacent = createAsyncThunk(
  `${name}/postFlavorAdjacent`,
  async ({ flavorId, adjacentIds }) => {
    const response = await FlavorAPI.postFlavorAdjacent(flavorId, adjacentIds);
    return {flavorId, adjacentIds};
  }
);

export const deleteFlavorAdjacent = createAsyncThunk(
  `${name}/deleteFlavorAdjacent`,
  async ({ flavorId, adjacentIds }) => {
    const response = await FlavorAPI.deleteFlavorAdjacent(flavorId, adjacentIds);
    return {flavorId, adjacentIds};
  }
);

export const fetchFlavorDetail = createAsyncThunk(
  `${name}/fetchFlavorDetail`,
  async (id) => {
    const response = await FlavorAPI.getFlavor(id)
    return response;
  }
);

export const fetchFlavorsPaginated = createAsyncThunk(
  `${name}/fetchFlavorsPaginated`,
  async (pageNumber) => {
    const response = await FlavorAPI.getFlavorListPaginated(pageNumber);
    return response;
  }
);

const flavorSlice = createSlice({
  name,
  initialState,
  reducers: {
    init: (state, action) => {
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
        // WARN: fetchFlavorDetail overwrites all flavor and link information
        // TODO: I should change this
        //       1) add flavor IF it does not exist
        //       2) add adjacent flavors IF they do not exist
        //       3) add links for { source: flavor.id, target: adj.id }
        //          IF they do not exist
        state.status = 'succeeded';
        const { id, name, adjacent } = action.payload;
        state.flavors.byId = adjacent.reduce(
          (a, flavor) => ({ ...a, [flavor.id]: flavor })
          , { [id]: { id, name } });
        state.flavors.allIds = [ id, ...adjacent.map((adj) => adj.id) ];
        state.links.byId = {};
        state.links.allIds = [];
        adjacent.forEach((adj) => addLink(state, { source: id, target: adj.id }));
      })

      // post flavor adjacent
      .addCase(postFlavorAdjacent.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(postFlavorAdjacent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postFlavorAdjacent.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })

      // delete flavor adjacent
      .addCase(deleteFlavorAdjacent.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteFlavorAdjacent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteFlavorAdjacent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log('delete success payload', action.payload);
        // const { flavorId, adjacentIds } = action.payload;
        // const newLinkById = {};
        // const newLinkAllIds = [];
        // state.links.allIds.forEach((id) => {
        //   const link = state.links.byId[id];
        //   // TODO: need to make this go both ways?
        //   if (!adjacentIds.includes(link.target)) {
        //     newLinkById[id] = link;
        //     newLinkAllIds.push(id);
        //   }
        // })
        // state.links.byId = newLinkById;
        // state.links.allIds = newLinkAllIds;
      })
  },
});

export const { init } = flavorSlice.actions;

export const selectFlavor = (id) => (state) => state[name].flavors.byId[id];

export const selectAdjacentFlavors = (id) => (state) => {
  return state[name].links.allIds.reduce((a, lId) => {
    const link = state[name].links.byId[lId];
    if (link.source === id) {
      return [ ...a, state[name].flavors.byId[link.target] ];
    } else {
      return a;
    }
  }, []);
}

export const selectFlavors = (state) => (
  state[name].flavors.allIds.map((id) => state[name].flavors.byId[id])
);

export const selectPagination = (state) => (
  state[name].pagination
);

export default flavorSlice;
