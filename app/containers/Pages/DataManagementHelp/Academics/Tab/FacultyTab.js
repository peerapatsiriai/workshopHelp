import React, { useEffect, useState } from 'react';
import { JoyModal, DeleteButton, ConfirmDelModal } from 'dan-components';
import { Box, Typography, useMediaQuery, Button } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { Select, selectClasses, Option, Input } from '@mui/joy';
import { DataGrid } from '@mui/x-data-grid';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function FacultyTab() {
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // initialState
  const initialState = {
    fi_name_th: '',
    fi_name_en: '',
    academics_fi_id: '',
  };
  const initialDeleteState = {
    table: 'tabfaculty_institutes',
    primary: '',
  };

  // ค่า modal state change
  const [openIns, setOpenIns] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpd, setOpenUpd] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDel, setOpenDel] = React.useState(false); // สำหรับใช้ควบคุม Modal Delete

  // สำหรับรับค่า
  const [Rows, setRows] = useState([]);
  const [selectDisabledCo, setSelectDisabledCo] = useState(false);
  const [state, setState] = useState(initialState);
  const [deleteState, setDeleteState] = useState(initialDeleteState);

  // set columns
  const columns = [
    { field: 'fi_name_th', headerName: 'Name(TH)', width: 300 },
    { field: 'fi_name_en', headerName: 'Name(EN)', width: 300 },
    { field: 'ac_name_th', headerName: 'Academic', width: 400 },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (cellValues) => (
        <Button
          variant='text'
          onClick={() => {
            setOpenUpd(true);
            setState(cellValues.row);
            setState((pre) => ({ ...pre, primarykey: cellValues.row.fi_id }));
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
            setOpenDel(true);
            setDeleteState((pre) => ({ ...pre, primary: cellValues.row.fi_id }));
          }}
        />
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];

  // set rows
  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllfacultys').then((response) => {
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
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>First Name(TH)</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.fi_fname_th || ''}
            onChange={(event) => setState((pre) => ({ ...pre, fi_fname_th: event.target.value }))}
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
            value={state.fi_lname_th || ''}
            onChange={(event) => setState((pre) => ({ ...pre, fi_lname_th: event.target.value }))}
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
            value={state.fi_fname_en}
            onChange={(event) => setState((pre) => ({ ...pre, fi_fname_en: event.target.value }))}
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
            value={state.fi_lname_en}
            onChange={(event) => setState((pre) => ({ ...pre, fi_lname_en: event.target.value }))}
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
            value={state.fi_code}
            onChange={(event) => setState((pre) => ({ ...pre, fi_code: event.target.value }))}
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
            value={state.fi_email}
            onChange={(event) => setState((pre) => ({ ...pre, fi_email: event.target.value }))}
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
            value={state.fi_tel}
            onChange={(event) => setState((pre) => ({ ...pre, fi_tel: event.target.value }))}
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

  // สำหรับกด Submit หน้าเพิ่มข้อมูล
  const handleInsertSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertfaculty', state)
      .then((response) => {
        console.log(response);
        setOpenIns(false);
        // console.log('t: ', response.data.message.Primarykey);
        const newState = { fi_id: response.data.message.Primarykey, ...state };
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
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.editfaculty', state)
      .then((response) => {
        console.log(response);
        setOpenUpd(false);
        const objectToUpdate = Rows.find((obj) => obj.fi_id === state.fi_id);

        // แก้ไขค่า ในออบเจ็กต์
        if (objectToUpdate) {
          objectToUpdate.fi_name_th = state.fi_name_th;
          objectToUpdate.fi_name_en = state.fi_name_en;
          objectToUpdate.academics_ac_id = state.academics_ac_id;
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
        const objectToDelete = Rows.filter((obj) => obj.fi_id !== idToDelete);
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
          rows={Rows}
          columns={columns}
          getRowId={(row) => row.fi_id}
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

export default FacultyTab;
