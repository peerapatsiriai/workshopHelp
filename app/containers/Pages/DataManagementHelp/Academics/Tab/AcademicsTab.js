import React, { useEffect, useState } from 'react';
import { JoyModal, DeleteButton, ConfirmDelModal } from 'dan-components';
import { Box, Typography, useMediaQuery, Button } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { Select, selectClasses, Option, Input } from '@mui/joy';
import { DataGrid } from '@mui/x-data-grid';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function AcademicsTab() {
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // initialState
  const initialState = {
    ac_name_th: '',
    ac_lname_th: '',
    ac_campus: '',
    ac_address: '',
    ac_tel: '',
    academic_type_ac_type_id: '',
  };
  const initialDeleteState = {
    table: 'tabacademics',
    primary: '',
  };

  // ค่า modal state change
  const [openIns, setOpenIns] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpd, setOpenUpd] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDel, setOpenDel] = React.useState(false); // สำหรับใช้ควบคุม Modal Delete

  // สำหรับรับค่า
  const [Rows, setRows] = useState([]);
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [state, setState] = useState(initialState);
  const [deleteState, setDeleteState] = useState(initialDeleteState);

  // set columns
  const columns = [
    { field: 'ac_name_th', headerName: 'Name(TH)', width: 300 },
    { field: 'ac_name_en', headerName: 'Name(EN)', width: 350 },
    { field: 'ac_address', headerName: 'Address', width: 350 },
    { field: 'ac_tel', headerName: 'Tel', width: 120 },
    { field: 'academic_type_ac_type_id', headerName: 'Type', width: 50 },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 80,
      renderCell: (cellValues) => (
        <Button
          variant='text'
          onClick={() => {
            setOpenUpd(true);
            setState(cellValues.row);
            setState((pre) => ({ ...pre, primarykey: cellValues.row.ac_id }));
            setSelectDisabled(true);
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
      width: 80,
      renderCell: (cellValues) => (
        <DeleteButton
          handleClick={() => {
            setOpenDel(true);
            setDeleteState((pre) => ({ ...pre, primary: cellValues.row.ac_id }));
          }}
        />
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];

  // set rows
  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllAcademics').then((response) => {
      setRows(response.data.message.Data);
      console.log(response.data.message.Data);
    });
  }, []);

  // content modal
  const ContentModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Academic Name(TH)</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.ac_name_th || ''}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ac_name_th: event.target.value }));
            }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Academic Name(EN)</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.ac_name_en || ''}
            onChange={(event) => {
              setState((pre) => ({
                ...pre,
                ac_name_en: event.target.value,
              }));
            }}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Campus*</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.ac_campus || ''}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ac_campus: event.target.value }));
            }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Tel*</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.ac_tel || ''}
            onChange={(event) => {
              setState((pre) => ({
                ...pre,
                ac_tel: event.target.value,
              }));
            }}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Academic Type*</Typography>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            disabled={selectDisabled}
            value={state.academic_type_ac_type_id || ''}
            onChange={(event, value) => {
              setState((pre) => ({
                ...pre,
                academic_type_ac_type_id: value,
              }));
            }}
            sx={{
              size: 'sm',
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value='1'>มหาวิทยาลัยของรัฐ</Option>
            <Option value='2'>โรงเรียนเอกชน</Option>
            <Option value='3'>วิทยาลัยชุมชน</Option>
          </Select>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '90%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Address*</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.ac_address || ''}
            onChange={(event) => {
              setState((pre) => ({
                ...pre,
                ac_address: event.target.value,
              }));
            }}
            sx={{ width: '100%', height: '10vh' }}
          />
        </Box>
      </Box>
    </Box>
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  // สำหรับกด Submit หน้าเพิ่มข้อมูล
  const handleInsertSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertacademic', state)
      .then((response) => {
        console.log(response);
        setOpenIns(false);
        // console.log('t: ', response.data.message.Primarykey);
        const newState = { ac_id: response.data.message.Primarykey, ...state };
        setRows((pre) => [newState, ...pre]);
        setState(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // สำหรับกด Submit หน้าแก้ไขข้อมูล
  const handleEditSubmit = () => {
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.editacademic', state)
      .then((response) => {
        console.log(response);
        setOpenUpd(false);
        const objectToUpdate = Rows.find((obj) => obj.ac_id === state.ac_id);

        // แก้ไขค่า ในออบเจ็กต์
        if (objectToUpdate) {
          objectToUpdate.ac_name_th = state.ac_name_th;
          objectToUpdate.ac_name_en = state.ac_name_en;
          objectToUpdate.ac_campus = state.ac_campus;
          objectToUpdate.ac_address = state.ac_address;
          objectToUpdate.ac_tel = state.ac_tel;
          objectToUpdate.academic_type_ac_type_id = state.academic_type_ac_type_id;
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
        setOpenDel(false);

        // ลบค่า ในออบเจ็กต์
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        const idToDelete = deleteState.primary;
        console.log('idToDelete: ', idToDelete);
        const objectToDelete = Rows.filter((obj) => obj.ac_id !== idToDelete);
        console.log('objectToDelete: ', objectToDelete);
        setRows(objectToDelete);
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
              setOpenIns(true);
              setSelectDisabled(false);
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
              + Add Academics
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
          rows={Rows}
          columns={columns}
          getRowId={(row) => row.ac_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
        <JoyModal
          open={openUpd}
          handleClose={() => {
            setOpenUpd(false);
            setState(initialState);
          }}
          content={ContentModal}
          header={'Update Collegian'}
          labelBtn={'Update'}
          subDetail={true}
          handleSubmit={handleEditSubmit}
        />
        <ConfirmDelModal
          open={openDel}
          handleClose={() => setOpenDel(false)}
          handleSubmit={handleDeleteSubmit}
        />
        {/* ทำแค่ตัวนี้ก่อน */}
      </Box>
      {/* สำหรับ insert */}
      <JoyModal
        open={openIns}
        handleClose={() => {
          setOpenIns(false);
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

export default AcademicsTab;
