import React from 'react';
import TextField from '@mui/material/TextField';

const FocusTextField = (params) => {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.getElementsByTagName('input')[0].focus();
  }, []);

  return (
    <TextField {...params} ref={inputRef} />
  );
}

export default FocusTextField;
