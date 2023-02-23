import { BACKEND_URL, parseJSON } from "../../common/api";

export const fetchSearchSuggestions = ({value, search}) => {
  const url = search === 'flavor'
    ? `${BACKEND_URL}/api/flavor/suggestion`
    : `${BACKEND_URL}/api/tag/suggestion`;
  return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search_string: value }),
    }).then(parseJSON)
}
