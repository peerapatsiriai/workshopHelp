import {
  Box,
  Button,
  Typography,
  useMediaQuery
} from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import DataTable from '../../../../../components/Tables/DataTable';

function ColligianTab(props) {
  const {
    setState,
    ContentModal,
    setOpenUpd,
    openUpd,
    setOpenIns,
    rows, // ใช้สำหรับรับเอาข้อมูลเนื้อหาในตาราง จากด้านนอกมาแสดงภายใน Modal
    columns, // ใช้สำหรับรับเอาหัวตารางหรือ columns จากด้านนอกมาแสดงภายใน Modal
  } = props;
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <div>
      <Box sx={{
        display: 'flex',
        justifyContent: onlyLargeScreen ? 'space-between' : onlyMediumScreen ? 'space-between' : onlySmallScreen ? 'center' : 'center',
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
            <Typography sx={{
              fontSize: 12,
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}>
                + Add Colligain
            </Typography>
          </Button>
          <Button sx={{ ml: 2 }}>
            <Typography sx={{
              fontSize: 12,
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}>
                Export
            </Typography></Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        {/* ทำแค่ตัวนี้ก่อน */}
        <DataTable
          rows={rows}
          columns={columns}
          open={openUpd}
          handleClose={() => setOpenUpd(false)}
          modalContent={ContentModal} // สามารถใส่เข้ามาเป็น UI ได้เลย
          modalHeader={'ทดสอบ Update Form'}
          stateUpdate={setState}
        />
        {/* ทำแค่ตัวนี้ก่อน */}
      </Box>
    </div>
  );
}
ColligianTab.propTypes = {
  setOpenIns: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  openUpd: PropTypes.bool.isRequired,
  setState: PropTypes.any,
  ContentModal: PropTypes.any,
  setOpenUpd: PropTypes.func.isRequired,
};
export default ColligianTab;
