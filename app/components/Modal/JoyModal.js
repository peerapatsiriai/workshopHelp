import {
  Button,
  Modal,
  ModalClose,
  Sheet,
  //   Typography
} from '@mui/joy';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';

function JoyModal(props) {
  const {
    open,
    handleClose,
    content,
    header,
    labelBtn,
  } = props;
  return (
    <React.Fragment>
      <Modal
        aria-labelledby='modal-title'
        aria-describedby='modal-desc'
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant='outlined'
          sx={{
            width: '100%',
            maxWidth: 900,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant='outlined'
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Typography sx={{ p: 2 }}>{header}</Typography>
          <Box sx={{ p: 2 }}>
            {content}
          </Box>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            p: 2,
          }}>
            <Button variant="solid">{labelBtn}</Button>
            <Button variant="outlined" sx={{ ml: 1 }} onClick={handleClose}>Cancel</Button>
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
JoyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.any.isRequired,
  content: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  labelBtn: PropTypes.string.isRequired,
};

export default JoyModal;
