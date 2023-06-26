import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
// import DataTable from '../../../../../components/Tables/DataTable';
import { DataGrid } from '@mui/x-data-grid';
import JoyModal from '../../../../../components/Modal/JoyModal';
import ConfirmDelModal from '../../../../../components/Modal/ConfirmDelModal';

function AcademicsTab(props) {
  const {
    setState,
    ContentModal,
    setOpenUpd,
    openUpd,
    setOpenIns,
    Academicrows, // ใช้สำหรับรับเอาข้อมูลเนื้อหาในตาราง จากด้านนอกมาแสดงภายใน Modal
    Academiccolumns, // ใช้สำหรับรับเอาหัวตารางหรือ columns จากด้านนอกมาแสดงภายใน Modal
    getRowId,
    handleUpdate,
    handleClose,
    openDelAc, // delete
    setOpenDelAc, // delete
    handleDelete, // delete
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
            onClick={() => setOpenIns(true)}
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
              + Add Academic
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
          rows={Academicrows}
          columns={Academiccolumns}
          getRowId={getRowId}
          open={openUpd}
          handleClose={() => setOpenUpd(false)}
          modalContent={ContentModal} // สามารถใส่เข้ามาเป็น UI ได้เลย
          modalHeader={'ทดสอบ Update Form'}
          stateUpdate={setState}
        />
        <JoyModal
          open={openUpd}
          handleClose={() => {
            setOpenUpd(false);
            handleClose();
          }}
          content={ContentModal}
          header={'Update Academic'}
          labelBtn={'Update'}
          subDetail={true}
          handleSubmit={handleUpdate}
        />
        <ConfirmDelModal
          open={openDelAc}
          handleClose={() => {
            setOpenDelAc(false);
          }}
          handleSubmit={handleDelete}
        />
        {/* ทำแค่ตัวนี้ก่อน */}
      </Box>
    </div>
  );
}
AcademicsTab.propTypes = {
  setOpenIns: PropTypes.func.isRequired,
  Academicrows: PropTypes.array.isRequired,
  Academiccolumns: PropTypes.array.isRequired,
  openUpd: PropTypes.bool.isRequired,
  setState: PropTypes.any,
  ContentModal: PropTypes.any,
  setOpenUpd: PropTypes.func.isRequired,
  getRowId: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired, // delete
  openDelAc: PropTypes.bool.isRequired, // delete
  setOpenDelAc: PropTypes.func.isRequired, // delete
};

export default AcademicsTab;
AcademicsTab.js;
