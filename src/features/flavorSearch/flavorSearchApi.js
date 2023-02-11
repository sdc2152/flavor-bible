import { BACKEND_URL, parseJSON } from "../../common/api";

export const fetchFlavorSuggestions = (searchString) => (
  fetch(`${BACKEND_URL}/api/suggestion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search_string: searchString }),
    })
      .then(parseJSON)
);
