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
    }).then(parseJSON)
  ),
  deleteFlavorAdjacent: (flavorId, adjacentIds) => (
    fetch(`${BACKEND_URL}/api/flavor/${flavorId}/adjacent`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ ids: adjacentIds })
    }).then(parseJSON)
  ),
  postTags: (flavorId, names) => (
    fetch(`${BACKEND_URL}/api/flavor/${flavorId}/tag`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ names })
    }).then(parseJSON)
  ),
  unlinkTags: (flavorId, ids) => (
    fetch(`${BACKEND_URL}/api/flavor/${flavorId}/tag`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ ids })
    }).then(parseJSON)
  ),
};

export default FlavorAPI;

