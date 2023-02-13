import { useSelector, useDispatch } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';

import {
  fetchOptions,
  clearOptions,
  selectOptions,
} from './flavorSearchSlice';

const FlavorSearch = (props) => {
  const dispatch = useDispatch();
  const options = useSelector(selectOptions);

  const handleInputChange = (event, value) => {
    if (value) {
      dispatch(fetchOptions(value));
    } else {
      dispatch(clearOptions());
    }
  }

  return (
    <Autocomplete
      {...props}
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) => option.name}
    />
  );
}

export default FlavorSearch;
