import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { JoyModal, ConfirmDelModal } from 'dan-components';
// import DataTable from '../../../../../components/Tables/DataTable';

function FacultyTab(props) {
  const {
    getRowDataFacultyr,
    ColumnsDataFaculty,
    ContentModal,
    setOpenUpdFac,
    setOpenInsFac,
    handleUpdate,
    handleDelete,
    handleCloseUpd,
    setSelectDisabledFac,
    openDelFac,
    setOpenDelFac,
  } = props;
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
              setOpenInsFac(true);
              setSelectDisabledFac(false);
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
              + Add Faculty
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
          rows={getRowDataFacultyr}
          columns={ColumnsDataFaculty}
          getRowId={(row) => row.fi_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
        <JoyModal
          open={setOpenUpdFac}
          handleClose={() => {
            setOpenUpdFac(false);
            handleCloseUpd();
          }}
          content={ContentModal}
          header={'Update Collegian'}
          labelBtn={'Update'}
          subDetail={true}
          handleSubmit={handleUpdate}
        />
        <ConfirmDelModal
          open={openDelFac}
          handleClose={() => {
            setOpenDelFac(false);
          }}
          handleSubmit={handleDelete}
        />
        {/* ทำแค่ตัวนี้ก่อน */}
      </Box>
    </div>
  );
}
FacultyTab.propTypes = {
  getRowDataFacultyr: PropTypes.array.isRequired,
  ColumnsDataFaculty: PropTypes.array.isRequired,
  ContentModal: PropTypes.any,
  setStartFaculty: PropTypes.any,
  openUpdFac: PropTypes.any.isRequired,
  setOpenUpdFac: PropTypes.any.isRequired,
  setOpenInsFac: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCloseUpd: PropTypes.func.isRequired,
  setSelectDisabledFac: PropTypes.func.isRequired,
  openDelFac: PropTypes.bool.isRequired,
  setOpenDelFac: PropTypes.func.isRequired,
};
export default FacultyTab;
