import React, { useState, useEffect } from 'react';
import { JoyModal, ConfirmDelModal, DeleteButton } from 'dan-components';
import { Box, Typography, useMediaQuery, Button } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { Select, selectClasses, Option, Input } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { DataGrid } from '@mui/x-data-grid';

function InstructorTab() {
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // initialState
  const initialState = {
    ist_fname_th: '',
    ist_lname_th: '',
    ist_fname_en: '',
    ist_lname_en: '',
    ist_email: '',
    ist_tel: '',
    faculty_institutes_fi_id: '',
  };
  const initialSelectState = {
    fi_name_th: '',
  };
  const initialDeleteState = {
    table: 'tabinstrutors',
    primary: '',
  };
  const [selectState, setSelectState] = useState(initialSelectState);
  const [state, setState] = useState(initialState);
  const [deleteState, setDeleteState] = useState(initialDeleteState);
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [InstructorRows, setInstructorRows] = useState([]);

  const [openInsIns, setOpenInsIns] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpdIns, setOpenUpdIns] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDelIns, setOpenDelIns] = React.useState(false); // สำหรับใช้ควบคุม Modal Delete
  const [instructortypeRows, setInstructortypeRows] = useState([]);
  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllinstructors').then((response) => {
      setInstructorRows(response.data.message.Data);
      console.log(response.data.message.Data);
    });
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const columnsForInstructor = [
    { field: 'ist_fname_th', headerName: 'First Name', width: 150 },
    { field: 'ist_lname_th', headerName: 'Last Name', width: 150 },
    { field: 'ist_email', headerName: 'Email', width: 300 },
    { field: 'ist_tel', headerName: 'Tel', width: 120 },
    { field: 'fi_name_th', headerName: 'Faculty Institute', width: 300 },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (cellValues) => (
        <Button
          variant='text'
          onClick={() => {
            setOpenUpdIns(true);
            setState(cellValues.row);
            setState((pre) => ({ ...pre, primarykey: cellValues.row.ist_id }));
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
      width: 100,
      renderCell: (cellValues) => (
        <DeleteButton
          handleClick={() => {
            setOpenDelIns(true);
            setDeleteState((pre) => ({ ...pre, primary: cellValues.row.ist_id }));
          }}
        />
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];

  const handleDeleteSubmit = () => {
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.delete', deleteState)
      .then((response) => {
        console.log(response);
        console.log('deleteState: ', deleteState);
        setOpenDelIns(false);

        // ลบค่า ในออบเจ็กต์
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        const idToDelete = deleteState.primary;
        console.log('idToDelete: ', idToDelete);
        const objectToDelete = InstructorRows.filter((obj) => obj.ist_id !== idToDelete);
        console.log('objectToDelete: ', objectToDelete);
        setInstructorRows(objectToDelete);
      });
  };

  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllinstructors').then((response) => {
      setInstructortypeRows(response.data.message.Data);
      console.log(response.data.message.Data);
    });
  }, []);
  const handleEditSubmit = () => {
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.editinstructor', state)
      .then((response) => {
        console.log(response);
        setOpenUpdIns(false);
        const objectToUpdate = InstructorRows.find((obj) => obj.ist_id === state.ist_id);

        // แก้ไขค่า ในออบเจ็กต์
        if (objectToUpdate) {
          objectToUpdate.ist_fname_th = state.ist_fname_th;
          objectToUpdate.ist_lname_th = state.ist_lname_th;
          objectToUpdate.ist_fname_en = state.ist_fname_en;
          objectToUpdate.ist_lname_en = state.ist_lname_en;
          objectToUpdate.ist_email = state.ist_email;
          objectToUpdate.ist_tel = state.ist_email;
          objectToUpdate.faculty_institutes_fi_id = state.faculty_institutes_fi_id;
        }
        setState(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [validation, setValidation] = useState({
    // false คือปกติ true คือแสดงเป็นสีแดง
    ist_fname_th: false,
    ist_lname_th: false,
    ist_fname_en: false,
    ist_lname_en: false,
    ist_email: false,
    ist_tel: false,
  });

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
      updatedValue = updatedValue.replace(/[^A-Za-z0-9.@+-]/g, '');
    } else if (type === 'tel') {
      updatedValue = updatedValue.replace(/[^0-9]/g, '');
    } else if (type === 'code') {
      updatedValue = updatedValue.replace(/[^a-zA-Z0-9\s]/g, ' ');
    }
    setState((pre) => ({ ...pre, [getKey]: updatedValue }));
  };
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
            value={state.ist_fname_th || ''}
            error={validation.ist_fname_th || false}
            sx={{ mx: 1 }}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ist_fname_th: event.target.value }));
              handleChange(event, 'ist_fname_th', 'th');
            }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Last Name(TH)</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.ist_lname_th || ''}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ist_lname_th: event.target.value }));
              handleChange(event, 'ist_lname_th', 'th');
            }}
            error={validation.ist_lname_th || false}
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
            value={state.ist_fname_en}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ist_fname_en: event.target.value }));
              handleChange(event, 'ist_fname_en', 'en');
            }}
            error={validation.ist_fname_en || false}
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
            value={state.ist_lname_en}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ist_lname_en: event.target.value }));
              handleChange(event, 'ist_lname_en', 'en');
            }}
            error={validation.ist_lname_en || false}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Email</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.ist_email}
            onChange={(event) => {
              handleChange(event, 'ist_email', 'email');
            }}
            error={validation.ist_email || false}
            sx={{ mx: 1 }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Telephone</Typography>
          </Box>
          <Input
            placeholder='Type in here…'
            size='md'
            value={state.ist_tel}
            onChange={(event) => {
              setState((pre) => ({ ...pre, ist_tel: event.target.value }));
              handleChange(event, 'ist_tel', 'tel');
            }}
            error={validation.ist_tel || false}
            slotProps={{
              input: {
                minLength: 0,
                maxLength: 10,
              },
            }}
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
            value={state.faculty_institutes_fi_id || '0'}
            onChange={(event, value) => {
              setState((pre) => ({ ...pre, faculty_institutes_fi_id: value }));
            }}
            disabled={selectDisabled}
            color={validation.faculty_institutes_fi_id ? 'danger' : 'neutral'}
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
            {instructortypeRows?.map((contentIn, value) => (
              <Option
                key={value}
                value={contentIn.faculty_institutes_fi_id}
                onClick={() => setSelectState((pre) => ({ ...pre, fi_name_th: contentIn.fi_name_th }))}
              >
                {contentIn.fi_name_th}
              </Option>
            ))}
          </Select>
        </Box>
        <Box sx={{ width: '50%' }}></Box>
      </Box>
    </Box>
  );

  const handleInsertSubmit = () => {
    Object.keys(state).forEach((key) => {
      const value = state[key];
      if (value === '' || value === null) {
        setValidation((prevValidation) => ({ ...prevValidation, [key]: true }));
      }
    });

    if (Object.values(state).every((value) => value !== '')) {
      console.log('ok');
      axios
        .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertinstructors', state)
        .then((response) => {
          console.log(response);
          setOpenInsIns(false);
          // console.log('t: ', response.data.message.Primarykey);
          const newState1 = { ...selectState, ...state };
          const newState2 = { ist_id: response.data.message.Primarykey, ...newState1 };
          console.log(newState2);
          setInstructorRows((pre) => [newState2, ...pre]);
          setState(initialState);
          setSelectState(initialSelectState);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    console.log(state.ist_fname_th);
    if (state.ist_fname_th !== '') {
      setValidation((pre) => ({ ...pre, ist_fname_th: false }));
    } else {
      console.log('Still Null fname_th');
    }
  }, [state.ist_fname_th]);

  useEffect(() => {
    console.log(state.ist_lname_th);
    if (state.ist_lname_th !== '') {
      setValidation((pre) => ({ ...pre, ist_lname_th: false }));
    } else {
      console.log('Still Null lname_th');
    }
  }, [state.ist_lname_th]);

  useEffect(() => {
    console.log(state.ist_fname_en);
    if (state.ist_fname_en !== '') {
      setValidation((pre) => ({ ...pre, ist_fname_en: false }));
    } else {
      console.log('Still Null ist_fname_en');
    }
  }, [state.ist_fname_en]);

  useEffect(() => {
    console.log(state.ist_lname_en);
    if (state.ist_lname_en !== '') {
      setValidation((pre) => ({ ...pre, ist_lname_en: false }));
    } else {
      console.log('Still Null ist_lname_en');
    }
  }, [state.ist_lname_en]);

  useEffect(() => {
    console.log(state.ist_email);
    if (state.ist_email !== '') {
      setValidation((pre) => ({ ...pre, ist_email: false }));
    } else {
      console.log('Still Null ist_email');
    }
  }, [state.ist_email]);

  useEffect(() => {
    console.log(state.ist_tel);
    if (state.ist_tel !== '') {
      setValidation((pre) => ({ ...pre, ist_tel: false }));
    } else {
      console.log('Still Null ist_tel');
    }
  }, [state.ist_tel]);

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
              setOpenInsIns(true);
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
              + Add Instrutor
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
          rows={InstructorRows}
          columns={columnsForInstructor}
          getRowId={(row) => row.ist_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
        <JoyModal
          open={openUpdIns}
          handleClose={() => {
            setOpenUpdIns(false);
            setState(initialState);
          }}
          content={ContentModal}
          header={'Update Collegian'}
          labelBtn={'Update'}
          subDetail={true}
          handleSubmit={handleEditSubmit}
        />
        <ConfirmDelModal
          open={openDelIns}
          handleClose={() => {
            setOpenDelIns(false);
          }}
          handleSubmit={handleDeleteSubmit}
        />
        {/* ทำแค่ตัวนี้ก่อน */}
      </Box>
      <JoyModal
        open={openInsIns}
        handleClose={() => {
          setOpenInsIns(false);
          setState(initialState);
        }}
        content={ContentModal}
        header={'Add New Collegian'}
        labelBtn={'Submit'}
        handleSubmit={handleInsertSubmit}
        subDetail={true}
      />
    </div>
  );
}

export default InstructorTab;
