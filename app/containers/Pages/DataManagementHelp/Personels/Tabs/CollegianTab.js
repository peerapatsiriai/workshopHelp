import React from 'react';
import PropTypes from 'prop-types';
import { JoyModal } from 'dan-components';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { DataGrid } from '@mui/x-data-grid';

function CollegianTab(props) {
  const {
    rows,
    columns,
    ContentModal,
    openUpd,
    setOpenUpd,
    setOpenIns,
    handleUpdate,
    handleDelete,
    handleClose,
    setSelectDisabledCo,
    openDelCo,
    setOpenDelCo,
  } = props;
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: onlyLargeScreen
            ? 'space-between'
            : onlyMediumScreen
            ? 'space-between'
            : onlySmallScreen
            ? 'center'
            : 'center',
          width: '100%',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            onClick={() => {
              setOpenIns(true);
              setSelectDisabledCo(false);
            }}
            sx={{
              px: 2,
              background: 'black',
              color: 'white',
              borderRadius: 5,
              '&:hover': {
                background: '#fff',
                color: 'black',
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}
            >
              + Add Colegian
            </Typography>
          </Button>
          <Button sx={{ ml: 2 }}>
            <Typography
              sx={{
                fontSize: 12,
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}
            >
              Export
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        {/* ทำแค่ตัวนี้ก่อน */}
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.co_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
        <JoyModal
          open={openUpd}
          handleClose={() => {
            setOpenUpd(false);
            handleClose();
          }}
          content={ContentModal}
          header={'Update Collegian'}
          labelBtn={'Update'}
          subDetail={true}
          handleSubmit={handleUpdate}
        />
        <JoyModal
          open={openDelCo}
          handleClose={() => {
            setOpenDelCo(false);
          }}
          content={'test'}
          header={'Delete Row Collegian'}
          labelBtn={'Delete'}
          handleSubmit={handleDelete}
          subDetail={false}
        />
        {/* ทำแค่ตัวนี้ก่อน */}
      </Box>
    </div>
  );
}

CollegianTab.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  ContentModal: PropTypes.any,
  setState: PropTypes.any,
  openUpd: PropTypes.any.isRequired,
  setOpenUpd: PropTypes.any.isRequired,
  setOpenIns: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  setSelectDisabledCo: PropTypes.bool.isRequired,
  openDelCo: PropTypes.bool.isRequired,
  setOpenDelCo: PropTypes.func.isRequired,
};

export default CollegianTab;
