import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getFlavor } from './graphPageApi';
import { blendColor } from "../../common/colorBlender";

const COLORS = [
  '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4',
  '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8',
  '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#ffffff',
  '#000000',
];

const initialState = {
  flavors: {
    byId: {},
    parentIds: [],
    allIds: [],
  },
  links: {
    byId: {},
    allIds: [],
  },
  status: 'idle',
  error: null,
};

const addParentFlavor = (state, parent) => {
  const { id, name } = parent;
  const color = getNextColor(state);
  if (state.flavors.byId[id] === undefined) {
    state.flavors.allIds.push(id);
  }
  state.flavors.byId[id] = { id, name, color };
  state.flavors.parentIds.push(id);
  return state.flavors.byId[id];
}

const addChildFlavor = (state, child, parent) => {
  const color = parent.color;
  if (state.flavors.byId[child.id] === undefined) {
    state.flavors.byId[child.id] = { ...child, color };
    state.flavors.allIds.push(child.id);
  } else if (!isParent(state, child.id)) {
    state.flavors.byId[child.id].color = blendColor(
      state.flavors.byId[child.id].color,
      color
    );
  }
  return state.flavors.byId[child.id];
};

const addLink = (state, link) => {
  const lastIndex = state.links.allIds.length - 1;
  const id = state.links.allIds[lastIndex] === undefined
    ? 0
    : state.links.allIds[lastIndex] + 1;
  state.links.allIds.push(id);
  state.links.byId[id] = { id, ...link };
}

const getNextColor = (state) => {
  const colorHist = {};
  state.flavors.parentIds.forEach((id) => {
    const color = state.flavors.byId[id].color;
    colorHist[color] = colorHist[color] === undefined ? 1 : colorHist[color] + 1;
  });
  let currColor = null;
  let colorCount = null;
  for (let i = 0; i < COLORS.length; i++) {
    const color = COLORS[i];
    if (colorHist[color] === undefined) return color;
    if (colorCount && colorCount > colorHist[color]) return color;
    if (currColor === null) {
      currColor = color;
      colorCount = colorHist[color];
    }
  }
  return currColor;
}

const isParent = (state, flavorId) => state.flavors.parentIds.includes(flavorId);

export const fetchFlavor = createAsyncThunk(
  'graphPage/fetchFlavor',
  async (id, { getState }) => {
    const state = getState();
    if (isParent(state.graphPage, id)) return; // already parent no need to add
    const response = await getFlavor(id);
    return response;
  }
);

export const graphPageSlice = createSlice({
  name: 'graphPage',
  initialState,
  reducers: {
    removeParentFlavor: (state, action) => {
      const id = action.payload;
      const newFlavorsParentIds = state.flavors.parentIds.filter((fId) => fId !== id);
      const newFlavorsById = {};
      const newFlavorsAllIds = [];
      const newLinksById = {};
      const newLinksAllIds = [];

      state.links.allIds.forEach((linkId) => {
        const link = state.links.byId[linkId];
        const parent = state.flavors.byId[link.source];
        const child = state.flavors.byId[link.target];
        if (newFlavorsParentIds.includes(parent.id)) {
          // add link
          newLinksById[link.id] = link;
          newLinksAllIds.push(link.id);
          // add parent to flavors if it does not exist
          if (newFlavorsById[parent.id] === undefined) {
            newFlavorsAllIds.push(parent.id);
            newFlavorsById[parent.id] = parent;
          }
          // handle child flavors
          if (!newFlavorsParentIds.includes(child.id)) {
            // add child flavor and assign initial color
            if (newFlavorsById[child.id] === undefined) {
              const childFlavor = state.flavors.byId[child.id];
              newFlavorsAllIds.push(child.id);
              newFlavorsById[child.id] = { ...childFlavor, color: parent.color }
              // if child flavor has been added update child flavor color
            } else {
              newFlavorsById[child.id].color = blendColor(
                newFlavorsById[child.id].color,
                parent.color);
            }
          }
        }
      });
      state.flavors = {
        byId: newFlavorsById,
        parentIds: newFlavorsParentIds,
        allIds: newFlavorsAllIds,
      }
      state.links = {
        byId: newLinksById,
        allIds: newLinksAllIds,
      }
      console.log('state', current(state));
    },
    removeAllFlavors: (state, action) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFlavor.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFlavor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, adjacent } = action.payload;
        if (isParent(state, id)) return; // already parent no need to add
        const parent = addParentFlavor(state, action.payload);
        adjacent.forEach((child) => {
          addChildFlavor(state, child, parent);
          addLink(state, { source: parent.id, target: child.id });
        });
      })
      .addCase(fetchFlavor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  removeParentFlavor,
  removeAllFlavors,
} = graphPageSlice.actions;

export const selectFlavor = (state, id) => state.graphPage.flavors.byId[id];

export const selectLink = (state, id) => state.graphPage.links.byId[id];

export const selectParentFlavorIds = (state) => (
  state.graphPage.flavors.parentIds
);

export const selectParentFlavors = (state) => (
  state.graphPage.flavors.parentIds
    .map((id) => selectFlavor(state, id))
);

export const selectAllFlavors = (state) => (
  state.graphPage.flavors.allIds
    .map((id) => selectFlavor(state, id))
);

export const selectLinks = (state) => (
  state.graphPage.links.allIds
    .map((id) => selectLink(state, id))
);

export default graphPageSlice.reducer;
