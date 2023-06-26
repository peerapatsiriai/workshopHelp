import React, { useEffect, useState } from 'react';
import { JoyModal, DeleteButton, ConfirmDelModal } from 'dan-components';
import { Box, Typography, useMediaQuery, Button } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { Select, selectClasses, Option, Input } from '@mui/joy';
import { DataGrid } from '@mui/x-data-grid';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function CollegianTab() {
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // initialState
  const initialState = {
    co_code: '',
    co_fname_th: '',
    co_lname_th: '',
    co_fname_en: '',
    co_lname_en: '',
    co_email: '',
    co_tel: '',
    faculty_institutes_fi_id: '',
  };
  const initialDeleteState = {
    table: 'tabcollegians',
    primary: '',
  };

  // ค่า modal state change
  const [openInsCo, setOpenInsCo] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpdCo, setOpenUpdCo] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDelCo, setOpenDelCo] = React.useState(false); // สำหรับใช้ควบคุม Modal Delete

  // สำหรับรับค่า
  const [collegianRows, setCollegianRows] = useState([]);
  const [selectDisabledCo, setSelectDisabledCo] = useState(false);
  const [state, setState] = useState(initialState);
  const [deleteState, setDeleteState] = useState(initialDeleteState);

  // set columns
  const collegianColumns = [
    { field: 'co_code', headerName: 'Code', width: 120 },
    { field: 'co_fname_th', headerName: 'First Name', width: 150 },
    { field: 'co_lname_th', headerName: 'Last Name', width: 150 },
    { field: 'co_email', headerName: 'Email', width: 300 },
    { field: 'co_tel', headerName: 'Tel', width: 120 },
    { field: 'cur_name_th', headerName: 'Curriculum', width: 300 },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (cellValues) => (
        <Button
          variant='text'
          onClick={() => {
            setOpenUpdCo(true);
            setState(cellValues.row);
            setState((pre) => ({ ...pre, primarykey: cellValues.row.co_id }));
            setSelectDisabledCo(true);
          }}
        >
          ...
        </Button>
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (cellValues) => (
        <DeleteButton
          handleClick={() => {
            setOpenDelCo(true);
            setDeleteState((pre) => ({ ...pre, primary: cellValues.row.co_id }));
          }}
        />
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];

  // set rows
  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllcollegians').then((response) => {
      setCollegianRows(response.data.message.Data);
      console.log(response.data.message.Data);
    });
  }, []);

  // content modal
  const ContentModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>First Name(TH)</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.co_fname_th || ''}
            onChange={(event) => setState((pre) => ({ ...pre, co_fname_th: event.target.value }))}
            sx={{ mx: 1 }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Last Name(TH)</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.co_lname_th || ''}
            onChange={(event) => setState((pre) => ({ ...pre, co_lname_th: event.target.value }))}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>First Name(EN)</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.co_fname_en}
            onChange={(event) => setState((pre) => ({ ...pre, co_fname_en: event.target.value }))}
            sx={{ mx: 1 }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Last Name(EN)</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.co_lname_en}
            onChange={(event) => setState((pre) => ({ ...pre, co_lname_en: event.target.value }))}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Collegian Code</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.co_code}
            onChange={(event) => setState((pre) => ({ ...pre, co_code: event.target.value }))}
            sx={{ mx: 1 }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Email</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.co_email}
            onChange={(event) => setState((pre) => ({ ...pre, co_email: event.target.value }))}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Telphone</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.co_tel}
            onChange={(event) => setState((pre) => ({ ...pre, co_tel: event.target.value }))}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Faculty Institutes</Typography>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            value={state.faculty_institutes_fi_id || ''}
            onChange={(event, value) => setState((pre) => ({ ...pre, faculty_institutes_fi_id: value }))}
            disabled={selectDisabledCo}
            sx={{
              mx: 1,
              size: 'sm',
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value='10'>คณะวิศวกรรมศาสตร์</Option>
            <Option value='11'>คณะบริหารธุรกิจและศิลปศาสตร์</Option>
            <Option value='12'>คณะวิทยาศาสตร์และเทคโนโลยีการเกษตร</Option>
          </Select>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Curriculum</Typography>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            value={state.curriculums_cur_id || ''}
            onChange={(event, value) => setState((pre) => ({ ...pre, curriculums_cur_id: value }))}
            disabled={selectDisabledCo}
            sx={{
              mx: 1,
              size: 'sm',
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value='1'>วิทยาลัยเทคโนโลยีและสหวิทยาการ</Option>
            <Option value='2'>คณะศิลปกรรมกรรมและสถาปัตยกรรมศาสตร์</Option>
            <Option value='3'>คณะวิศวกรรมศาสตร์</Option>
          </Select>
        </Box>
      </Box>
    </Box>
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  // สำหรับกด Submit หน้าเพิ่มข้อมูล Collegian
  const handleInsertSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertcollegian', state)
      .then((response) => {
        console.log(response);
        setOpenInsCo(false);
        // console.log('t: ', response.data.message.Primarykey);
        const newState = { co_id: response.data.message.Primarykey, ...state };
        setCollegianRows((pre) => [newState, ...pre]);
        setState(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // สำหรับกด Submit หน้าแก้ไขข้อมูล Collegian
  const handleEditSubmit = () => {
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.editcollegian', state)
      .then((response) => {
        console.log(response);
        setOpenUpdCo(false);
        const objectToUpdate = collegianRows.find((obj) => obj.co_id === state.co_id);

        // แก้ไขค่า ในออบเจ็กต์
        if (objectToUpdate) {
          objectToUpdate.co_code = state.co_code;
          objectToUpdate.co_fname_th = state.co_fname_th;
          objectToUpdate.co_lname_th = state.co_lname_th;
          objectToUpdate.co_fname_en = state.co_fname_en;
          objectToUpdate.co_lname_en = state.co_lname_en;
          objectToUpdate.co_email = state.co_email;
          objectToUpdate.co_tel = state.co_tel;
          objectToUpdate.faculty_institutes_fi_id = state.faculty_institutes_fi_id;
        }
        setState(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // สำหรับกด Submit หน้าลบข้อมูล Collegian
  const handleDeleteSubmit = () => {
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.delete', deleteState)
      .then((response) => {
        console.log(response);
        console.log('deleteState: ', deleteState);
        setOpenDelCo(false);

        // ลบค่า ในออบเจ็กต์
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        const idToDelete = deleteState.primary;
        console.log('idToDelete: ', idToDelete);
        const objectToDelete = collegianRows.filter((obj) => obj.co_id !== idToDelete);
        console.log('objectToDelete: ', objectToDelete);
        setCollegianRows(objectToDelete);
      });
  };

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
              setOpenInsCo(true);
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
          rows={collegianRows}
          columns={collegianColumns}
          getRowId={(row) => row.co_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
        <JoyModal
          open={openUpdCo}
          handleClose={() => {
            setOpenUpdCo(false);
            setState(initialState);
          }}
          content={ContentModal}
          header={'Update Collegian'}
          labelBtn={'Update'}
          subDetail={true}
          handleSubmit={handleEditSubmit}
        />
        <ConfirmDelModal
          open={openDelCo}
          handleClose={() => {
            setOpenDelCo(false);
          }}
          handleSubmit={handleDeleteSubmit}
        />
        {/* ทำแค่ตัวนี้ก่อน */}
      </Box>
      {/* สำหรับ insert */}
      <JoyModal
        open={openInsCo}
        handleClose={() => {
          setOpenInsCo(false);
          setState(initialState);
        }}
        content={ContentModal}
        header={'Add New Collegian'}
        labelBtn={'Submit'}
        handleSubmit={handleInsertSubmit}
        subDetail={false}
      />
    </div>
  );
}

export default CollegianTab;
