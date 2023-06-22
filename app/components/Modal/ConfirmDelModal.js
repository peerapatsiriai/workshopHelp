import {
  Button,
  Modal,
  ModalClose,
  Sheet,
  //   Typography
} from '@mui/joy';
import { Box, Typography } from '@mui/material';
// import PropTypes from 'prop-types';
import * as React from 'react';

function ConfirmDelModal() {
//   const {
//     open,
//     handleClose,
//     handleSubmit,
//     content,
//     header,
//     labelBtn,
//     subDetail, // สำหรับแสดง mockup วันที่เวลาที่อัพเดทล่าสุด (true = แสดง, false = ไม่แสดง)
//   } = props;
  const [open, setOpen] = React.useState(true);
  return (
    <React.Fragment>
      <Modal
        aria-labelledby='modal-title'
        aria-describedby='modal-desc'
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant='outlined'
          sx={{
            width: 600,
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
          <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            mt: 4,
          }}>
            <Typography sx={{ p: 2, fontWeight: 'bold', fontSize: 18 }}>Confirm Delete</Typography>
          </Box>
          <Box sx={{ mb: 4, width: '100%', textAlign: 'center' }}>Are you sure? you want to delete $values</Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              p: 2,
              mt: 2,
              mb: 4,
            }}
          >
            <Button color='danger' variant='outlined'>
              Cancel
            </Button>
            <Button color='danger' variant='solid' sx={{ ml: 2 }} >
               Delete
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
// ConfirmDelModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.any.isRequired,
//   content: PropTypes.node.isRequired,
//   header: PropTypes.string.isRequired,
//   labelBtn: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.any,
//   subDetail: PropTypes.bool.isRequired,
// };

export default ConfirmDelModal;
