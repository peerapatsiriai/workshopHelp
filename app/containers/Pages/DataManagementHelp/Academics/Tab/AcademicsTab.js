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
    ac_name_en: '',
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
  const [academictypeRows, setacademictypeRows] = useState([]);
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [state, setState] = useState(initialState);
  const [deleteState, setDeleteState] = useState(initialDeleteState);

  // สำหรับใช้เก็บค่า Validation Insert
  const [validation, setValidation] = useState({
    ac_name_th: false, // false คือปกติ true คือแสดงเป็นสีแดง
    ac_name_en: false,
    ac_campus: false,
    ac_address: false,
    ac_tel: false,
    academic_type_ac_type_id: false,
  });
  useEffect(() => {
    // console.log(state.input1);
    if (state.ac_name_th !== '') {
      setValidation((pre) => ({ ...pre, ac_name_th: false }));
    } else {
      console.log('Still Null');
    }
    if (state.ac_name_en !== '') {
      setValidation((pre) => ({ ...pre, ac_name_en: false }));
    } else {
      console.log('Still Null');
    }
    if (state.ac_address !== '') {
      setValidation((pre) => ({ ...pre, ac_address: false }));
    } else {
      console.log('Still Null');
    }
    if (state.ac_tel !== '') {
      setValidation((pre) => ({ ...pre, ac_tel: false }));
    } else {
      console.log('Still Null');
    }
    if (state.ac_campus !== '') {
      setValidation((pre) => ({ ...pre, ac_campus: false }));
    } else {
      console.log('Still Null');
    }
    if (state.academic_type_ac_type_id !== '') {
      setValidation((pre) => ({ ...pre, academic_type_ac_type_id: false }));
    } else {
      console.log('Still Null');
    }
  }, [state]);
  // set columns
  const columns = [
    { field: 'ac_name_th', headerName: 'Name(TH)', width: 300 },
    { field: 'ac_name_en', headerName: 'Name(EN)', width: 350 },
    { field: 'ac_campus', headerName: 'campus', width: 350 },
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

  // set Api
  useEffect(() => {
    // ดึงข้อมูล Academic เพื่อ set rows
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllAcademics').then((response) => {
      setRows(response.data.message.Data);
      console.log(response.data.message.Data);
    });
    // ดึงข้อมูล Academic Type
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getallacademictype').then((response) => {
      setacademictypeRows(response.data.message.Data);
      console.log(response.data.message.Data);
      console.log(academictypeRows);
    });
  }, []);
  // เช็คการรับค่าใน input
  const handleChange = (e, key, type) => {
    const { value } = e.target;
    const getKey = key;
    let updatedValue = value;
    if (type === 'th') {
      updatedValue = updatedValue.replace(/[^ก-๙เ\s]/g, '');
    } else if (type === 'en') {
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, '');
    } else if (type === 'email') {
      // ถ้ารูปแบบไม่ถูกต้อง แทนที่อักขระที่ไม่ถูกต้องด้วยช่องว่าง
      updatedValue = updatedValue.replace(/[^0-9]/g, '');
    } else if (type === 'tel') {
      updatedValue = updatedValue.replace(/\D/g, '');
    } else if (type === 'code') {
      updatedValue = updatedValue.replace(/[^a-zA-Z0-9\s]/g, ' ');
    }
    setState((pre) => ({ ...pre, [getKey]: updatedValue }));
  };
  // content modal
  const ContentModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Academic Name(TH)</Typography>
          </Box>
          <Input
            // false คือปกติ true คือแสดงสีแดง
            error={validation.ac_name_th || false}
            placeholder='กรุณากรอกข้อมูลภาษาไทย'
            size='md'
            value={state.ac_name_th || ''}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ac_name_th: event.target.value }));
              handleChange(event, 'ac_name_th', 'th');
            }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Academic Name(EN)</Typography>
          </Box>
          <Input
            // false คือปกติ true คือแสดงสีแดง
            error={validation.ac_name_en || false}
            placeholder='กรุณากรอกข้อมูลภาษาอังกฤษ'
            size='md'
            value={state.ac_name_en || ''}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ac_name_en: event.target.value }));
              handleChange(event, 'ac_name_en', 'en');
            }}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Campus(TH)*</Typography>
          </Box>
          <Input
            // false คือปกติ true คือแสดงสีแดง
            error={validation.ac_campus || false}
            placeholder='กรุณากรอกข้อมูลภาษาไทย'
            size='md'
            value={state.ac_campus || ''}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ac_campus: event.target.value }));
              handleChange(event, 'ac_campus', 'th');
            }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Tel*</Typography>
          </Box>
          <Input
            // false คือปกติ true คือแสดงสีแดง
            type='tel'
            error={validation.ac_tel || false}
            placeholder='กรุณากรอกแค่ตัวเลขเท่านั้น'
            size='md'
            value={state.ac_tel || ''}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ac_tel: event.target.value }));
              handleChange(event, 'ac_tel', 'tel');
            }}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Academic Type*</Typography>
          <Select
            // false คือปกติ true คือแสดงสีแดง
            error={validation.academic_type_ac_type_id || false}
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
            {academictypeRows?.map((contentAc, value) => (
              <Option
                key={value}
                value={contentAc.ac_type_id}
              >
                {contentAc.ac_type_name_th}
              </Option>
            ))}
          </Select>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '90%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Address*</Typography>
          </Box>
          <Input
            // false คือปกติ true คือแสดงสีแดง
            error={validation.ac_address || false}
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
    console.log(state);
    const stateWithoutId = { ...state }; // เก็บทุกค่าที่จะส่งไปที่ stateWithoutId
    // delete stateWithoutId.academic_type_ac_type_id; //คำสั่งยกเว้นค่าว่างใน State(ลบค่าใน values Select ใน Select)

    const isStateValid = Object.values(stateWithoutId).every((value) => value && value.trim() !== '');

    if (isStateValid) {
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
      console.log('State is valid');
    } else {
      alert('แตกใน');
      if (state.ac_name_th === '') {
        // ทำให้แสดงสีแดงตรงที่ไม่ได้กรอกข้อความ
        setValidation((pre) => ({ ...pre, ac_name_th: true }));
      }
      if (state.ac_name_en === '') {
        // ทำให้แสดงสีแดงตรงที่ไม่ได้กรอกข้อความ
        setValidation((pre) => ({ ...pre, ac_name_en: true }));
      }
      if (state.ac_address === '') {
        // ทำให้แสดงสีแดงตรงที่ไม่ได้กรอกข้อความ
        setValidation((pre) => ({ ...pre, ac_address: true }));
      }
      if (state.ac_tel === '') {
        // ทำให้แสดงสีแดงตรงที่ไม่ได้กรอกข้อความ
        setValidation((pre) => ({ ...pre, ac_tel: true }));
      }
      if (state.ac_campus === '') {
        // ทำให้แสดงสีแดงตรงที่ไม่ได้กรอกข้อความ
        setValidation((pre) => ({ ...pre, ac_campus: true }));
      }
      if (state.academic_type_ac_type_id === '') {
        // ทำให้แสดงสีแดงตรงที่ไม่ได้กรอกข้อความ
        setValidation((pre) => ({ ...pre, academic_type_ac_type_id: true }));
      }
    }
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

  // สำหรับกด Submit หน้าลบข้อมูล
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
          header={'Update Academic'}
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
        header={'Add New Academic'}
        labelBtn={'Submit'}
        handleSubmit={handleInsertSubmit}
        subDetail={false}
      />
    </div>
  );
}

export default AcademicsTab;
