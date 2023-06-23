import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import JoyModal from '../../../../../components/Modal/JoyModal';
// import DataTable from '../../../../../components/Tables/DataTable';

function FacultyTab(props) {
  const {
    setState,
    ContentModal,
    setOpenUpd,
    openUpd,
    setOpenIns,
    facultyData, // ใช้สำหรับรับเอาข้อมูลเนื้อหาในตาราง จากด้านนอกมาแสดงภายใน Modal
    columnsFaculty, // ใช้สำหรับรับเอาหัวตารางหรือ columns จากด้านนอกมาแสดงภายใน Modal
    getRowId,
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
        }}>
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
            }}>
            <Typography
              sx={{
                fontSize: 12,
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}>
              + Add Faculty
            </Typography>
          </Button>
          <Button sx={{ ml: 2 }}>
            <Typography
              sx={{
                fontSize: 12,
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}>
              Export
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        {/* ทำแค่ตัวนี้ก่อน */}
        <DataGrid
          rows={facultyData}
          columns={columnsFaculty}
          open={openUpd}
          handleClose={() => setOpenUpd(false)}
          modalContent={ContentModal} // สามารถใส่เข้ามาเป็น UI ได้เลย
          modalHeader={'ทดสอบ Update Form'}
          stateUpdate={setState}
          getRowId={getRowId}
        />
        <JoyModal
          open={openUpd}
          handleClose={() => setOpenUpd(false)}
          content={ContentModal}
          header={'Update Collegian'}
          labelBtn={'Update'}
          subDetail={true}
        />
        {/* ทำแค่ตัวนี้ก่อน */}
      </Box>
    </div>
  );
}
FacultyTab.propTypes = {
  setOpenIns: PropTypes.func.isRequired,
  facultyData: PropTypes.array.isRequired,
  columnsFaculty: PropTypes.array.isRequired,
  openUpd: PropTypes.bool.isRequired,
  setState: PropTypes.any,
  ContentModal: PropTypes.any,
  setOpenUpd: PropTypes.func.isRequired,
  getRowId: PropTypes.func.isRequired,
};
export default FacultyTab;
