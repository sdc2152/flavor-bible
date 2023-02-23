import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  setFilterMaxLink,
  setFilterMinLink,
  selectParentFlavorIds,
  selectFilterMinLink,
  selectFilterMaxLink,
} from '../graph/graphSlice';

const LinksMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const parentIds = useSelector(selectParentFlavorIds);
  const minOptions = parentIds.map((id, i) => `${i + 1}`);
  const maxOptions = parentIds.map((id, i) => `${i + 1}`);
  const minValue = useSelector(selectFilterMinLink);
  const maxValue = useSelector(selectFilterMaxLink);
  let title = 'Links';
  if (minValue && maxValue) {
    title = `${minValue} - ${maxValue}`;
  } else if (minValue) {
    title = `${minValue}+`;
  } else if (maxValue) {
    title = `Up to ${maxValue}`;
  }

  const handleMinChange = (event, value) => {
    dispatch(setFilterMinLink(value));
  }
  const handleMaxChange = (event, value) => {
    dispatch(setFilterMaxLink(value));
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <Button
      onClick={handleClick}
      variant="outlined"
      endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    >
      {title}
    </Button>
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box>
        <Typography>Links</Typography>
        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked />} label="Max" />
        </FormGroup>
        <Box sx={{ display: 'flex' }}>
          <Autocomplete
            disablePortal
            options={minOptions}
            value={minValue}
            sx={{ width: 200 }}
            onChange={handleMinChange}
            renderInput={(params) => <TextField {...params} label="Min" />}
            />
          <Autocomplete
            disablePortal
            options={maxOptions}
            value={maxValue}
            sx={{ width: 200 }}
            onChange={handleMaxChange}
            renderInput={(params) => <TextField {...params} label="Max" />}
            />
        </Box>
      </Box>
    </Menu>
    </>
}

export default LinksMenu;

