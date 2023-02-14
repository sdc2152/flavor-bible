import { BACKEND_URL, parseJSON } from "../../common/api";

export const getFlavorList = async () => {
  return fetch(`${BACKEND_URL}/api/flavor`)
    .then(parseJSON);
}
export const getFlavorListPaginated = async (page) => {
  return fetch(`${BACKEND_URL}/api/flavor/page/${page}`)
    .then(parseJSON);
}

export const getFlavor = (id) => (
  fetch(`${BACKEND_URL}/api/flavor/${id}`)
    .then(parseJSON)
);
