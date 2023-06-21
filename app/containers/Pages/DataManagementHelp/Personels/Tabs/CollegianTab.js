import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { JoyModal, InputJoy } from 'dan-components';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { Select, selectClasses, Option } from '@mui/joy';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { DataGrid } from '@mui/x-data-grid';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function CollegianTab(props) {
  const { openUpd, setOpenUpd, setOpenIns } = props;
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // สำหรับรับค่า
  const [rows, setRows] = useState([]);
  const [state, setState] = useState({
    co_fname_th: '',
    co_lname_th: '',
    co_fname_en: '',
    co_lname_en: '',
    co_code: '',
    co_email: '',
    co_tel: '',
    faculty_institutes_fi_id: '',
    curriculums_cur_id: '',
  });

  // dummy
  const columnsForCollegians = [
    { field: 'co_code', headerName: 'Code', width: 150 },
    { field: 'co_fname_th', headerName: 'First Name', width: 200 },
    { field: 'co_lname_th', headerName: 'Last Name', width: 200 },
    { field: 'co_email', headerName: 'Email', width: 300 },
    { field: 'co_tel', headerName: 'Tel', width: 150 },
    { field: 'curriculums_cur_id', headerName: 'Curriculum', width: 200 },
    {
      field: 'col3',
      headerName: 'Edit',
      width: 150,
      renderCell: () => (
        <Button
          variant='text'
          onClick={() => setOpenUpd(true)}
        >
          ...
        </Button>
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];

  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllcollegians').then((response) => {
      setRows(response.data.message.Data);
      console.log(response.data.message.Data);
    });
  }, []);

  // Modal Content
  // สำหรับ ใส่ใน Edit Form Modal
  const CollegianContentEditModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='First Name(TH)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
            value={state.co_fname_th}
            onChange={(event) => setState({ co_fname_th: event.target.value })}
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%', mb: 1 }}>
          <InputJoy
            label='Last Name(TH)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='First Name(ENG)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%', mb: 1 }}>
          <InputJoy
            label='Last Name(ENG)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Collegian Code'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%', mb: 1 }}>
          <InputJoy
            label='Email'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Telphone'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Faculty Institutes</Typography>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            size='sm'
            sx={{
              ml: 2,
              border: 1,
              mr: 5,
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value='1'>คณะวิศวกรรมศาสตร์</Option>
            <Option value='2'>คณะบริหารธุรกิจและศิลปศาสตร์</Option>
            <Option value='3'>คณะวิทยาศาสตร์และเทคโนโลยีการเกษตร</Option>
          </Select>
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Curriculum</Typography>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            size='sm'
            sx={{
              ml: 2,
              mr: 5,
              border: 1,
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value='1'>วิศวกรรมอุตสาหการ</Option>
            <Option value='2'>วิศวกรรมแม่พิมพ์</Option>
            <Option value='3'>วิศวกรรมโยธา</Option>
          </Select>
        </Box>
      </Box>
    </Box>
  );

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
          columns={columnsForCollegians}
          getRowId={(row) => row.co_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
        <JoyModal
          open={openUpd}
          handleClose={() => setOpenUpd(false)}
          content={CollegianContentEditModal}
          header={'Update Collegian'}
          labelBtn={'Update'}
          subDetail={true}
        />
        {/* ทำแค่ตัวนี้ก่อน */}
      </Box>
    </div>
  );
}

CollegianTab.propTypes = {
  openUpd: PropTypes.any.isRequired,
  setOpenUpd: PropTypes.any.isRequired,
  setOpenIns: PropTypes.any.isRequired,
};

export default CollegianTab;
