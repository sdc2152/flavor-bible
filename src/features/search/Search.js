import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import {
  fetchOptions,
  clearOptions,
  selectOptions,
} from './searchSlice';

const Search = ({ search = 'flavor', ...props }) => {
  const dispatch = useDispatch();
  const options = useSelector(selectOptions);

  React.useEffect(() => {
    dispatch(clearOptions());
    return () => dispatch(clearOptions());
  }, [dispatch]);

  const handleInputChange = (event, value) => {
    if (value) {
      dispatch(fetchOptions({ search, value }));
    } else {
      dispatch(clearOptions());
    }
  }

  // TODO: implement filter options to exlude stuff
  return (
    <Autocomplete
      {...props}
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      filterOptions={(options, state) => {
        return options;
      }}
    />
  );
}

export default Search;
