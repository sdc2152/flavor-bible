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
    console.log('handle input', value);
    if (value) {
      console.log('handle input fetch');
      dispatch(fetchOptions(value));
    } else {
      console.log('handle input clear');
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
