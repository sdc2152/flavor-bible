import { BACKEND_URL, parseJSON } from "../../common/api";

export const getFlavor = (id) => (
  fetch(`${BACKEND_URL}/api/flavor/${id}`)
    .then(parseJSON)
);
