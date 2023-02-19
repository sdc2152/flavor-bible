import { BACKEND_URL, parseJSON } from "../../common/api";

const FlavorAPI = {
  getFlavorList: () => (
    fetch(`${BACKEND_URL}/api/flavor`)
    .then(parseJSON)
  ),
  getFlavorListPaginated: (page) => (
    fetch(`${BACKEND_URL}/api/flavor/page/${page}`)
    .then(parseJSON)
  ),
  getFlavor: (id) => (
    fetch(`${BACKEND_URL}/api/flavor/${id}`)
    .then(parseJSON)
  ),
  postFlavorAdjacent: (flavorId, adjacentIds) => (
    fetch(`${BACKEND_URL}/api/flavor/${flavorId}/adjacent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ ids: adjacentIds })
    })
  ),
  deleteFlavorAdjacent: (flavorId, adjacentIds) => (
    fetch(`${BACKEND_URL}/api/flavor/${flavorId}/adjacent`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ ids: adjacentIds })
    })
  ),
};

export default FlavorAPI;

