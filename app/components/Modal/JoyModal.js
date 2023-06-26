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
    handleSubmit,
    content,
    header,
    labelBtn,
    subDetail, // สำหรับแสดง mockup วันที่เวลาที่อัพเดทล่าสุด (true = แสดง, false = ไม่แสดง)
  } = props;
  return (
    <React.Fragment>
      <Modal
        aria-labelledby='modal-title'
        aria-describedby='modal-desc'
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Sheet
          variant='outlined'
          sx={{
            width: '100%',
            maxWidth: 900,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}>
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
          {subDetail && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  color='neutral'
                  variant='body2'
                  sx={{
                    ml: 2,
                    opacity: '60%',
                  }}>
                  Created On March 10/2/2023 : 15:59:41
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  color='neutral'
                  variant='body2'
                  sx={{
                    ml: 2,
                    opacity: '60%',
                  }}>
                  Last updated On March 22/2/2023 : 21:32:51
                </Typography>
              </Box>
            </Box>
          )}
          <Box sx={{ p: 2, width: '100%' }}>{content}</Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'end',
              p: 2,
            }}>
            <Button variant='solid' onClick={handleSubmit}>
              {labelBtn}
            </Button>
            <Button variant='outlined' sx={{ ml: 1 }} onClick={handleClose}>
              Cancel
            </Button>
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
  handleSubmit: PropTypes.any,
  subDetail: PropTypes.bool.isRequired,
};

export default JoyModal;
