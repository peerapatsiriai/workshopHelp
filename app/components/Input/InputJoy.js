import { FormLabel, Input } from '@mui/joy';
import PropTypes from 'prop-types';
import * as React from 'react';

function InputJoy(props) {
  const { label, placeholder } = props;
  return (
    <React.Fragment>
      <FormLabel
        sx={(theme) => ({
          '--FormLabel-color': theme.vars.palette.primary.plainColor, ml: 2
        })}
      >
        {label}
      </FormLabel>
      <Input
        placeholder={`${placeholder}`}
        size='sm'
        sx={{
          ml: 2,
          border: 1,
        }}
      />
    </React.Fragment>
  );
}
InputJoy.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

export default InputJoy;
