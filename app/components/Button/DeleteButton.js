import * as React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';

function DeleteButton(props) {
  const { handleClick } = props;
  return (
    <IconButton
      onClick={handleClick}
      sx={{
        borderRadius: 2,
        background: '#cf291d',
        color: 'white',
        '&:hover': { background: '#b32217' },
      }}
      variant='contained'>
      <DeleteForeverIcon />
    </IconButton>
  );
}
DeleteButton.propTypes = {
  handleClick: PropTypes.func,
};
export default DeleteButton;
