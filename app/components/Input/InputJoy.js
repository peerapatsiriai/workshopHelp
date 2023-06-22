import { Input } from '@mui/joy';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';

function InputJoy(props) {
  const {
    label,
    placeholder,
    size,
    type,
    setState,
  } = props;
  return (
    <Box>
      <Box sx={{ ml: 2 }}>
        {label !== '' ? (
          <Typography sx={{ fontSize: 12, mb: 0.5 }}>
            {label}
          </Typography>
        ) : <Box sx={{ m: 2.75 }}></Box>
        }
      </Box>
      <Input
        onChange={(event) => setState(event.target.value)}
        type={type || 'text'}
        placeholder={`${placeholder}`}
        size='sm'
        sx={{
          ml: 2,
          border: 1,
          width: size === 'sm' ? 225 : size === 'md' ? 350 : size === 'lg' ? 450 : size === 'full' ? '100%' : 350,
        }}
      />
    </Box>
  );
}
InputJoy.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  setState: PropTypes.func,
};

export default InputJoy;
