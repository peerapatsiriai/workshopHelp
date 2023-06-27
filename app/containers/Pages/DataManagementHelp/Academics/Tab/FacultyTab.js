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
    academics_ac_id: '',
  };
  const initialSelectState = {
    ac_name_th: '',
  };
  const initialDeleteState = {
    table: 'tabfaculty_institutes',
    primary: '',
  };

  // ค่า modal state change
  const [openIns, setOpenIns] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpd, setOpenUpd] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDel, setOpenDel] = React.useState(false); // สำหรับใช้ควบคุม Modal Delete

  // สำหรับ set ค่า State
  const [Rows, setRows] = useState([]);
  const [dataAcademics, setDataAcademics] = useState([]);
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [state, setState] = useState(initialState);
  const [selectState, setSelectState] = useState(initialState);
  const [deleteState, setDeleteState] = useState(initialDeleteState);

  // by bill start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [validationFac, setValidationFac] = useState({
    fi_name_th: false,
    fi_name_en: false,
    academics_ac_id: false,
  });

  const handleChange = (e, key, type) => {
    const getKey = key;
    const { value } = e.target;
    // setState((pre) => ({ ...pre, [getKey]: value }));
    let updatedValue = value;
    if (type === 'th') {
      updatedValue = updatedValue.replace(/[^ก-๙เ\s]/g, '');
    } else if (type === 'en') {
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, '');
    }
    setState((pre) => ({ ...pre, [getKey]: updatedValue }));
  };

  useEffect(() => {
    console.log('del:', deleteState);
  }, [deleteState]);

  useEffect(() => {
    if (state.fi_name_th !== '') {
      setValidationFac((pre) => ({ ...pre, fi_name_th: false }));
    } else {
      console.log('NAME THAI Still Null');
    }
    if (state.fi_name_en !== '') {
      setValidationFac((pre) => ({ ...pre, fi_name_en: false }));
    } else {
      console.log('NAME ENG Still Null');
    }
    if (state.academics_ac_id !== null) {
      setValidationFac((pre) => ({ ...pre, academics_ac_id: false }));
    } else {
      console.log('NAME ENG Still Null');
    }
  }, [state]);
  // by bill spot >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // get Data Academics for select
  useEffect(() => {
    axios
      .get(
        'http://192.168.1.168:8000/api/method/frappe.help-api.getAllAcademics'
      )
      .then((res) => {
        setDataAcademics(res.data.message.Data);
        res.data.message.Data;
        console.log(res.data.message.Data);
      });
  }, []);

  // useEffect(() => {
  //   const min = Math.min(...dataAcademics.map((item) => item.ac_id));
  //   setState((pre) => ({ ...pre, academics_ac_id: String(min) }));
  // }, [dataAcademics]);

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
            setState((pre) => ({
              ...pre,
              primarykey: String(cellValues.row.fi_id),
            }));
            setSelectDisabled(true);
          }}>
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
            setDeleteState((pre) => ({
              ...pre,
              primary: cellValues.row.fi_id,
            }));
          }}
        />
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];

  // set rows
  useEffect(() => {
    axios
      .get(
        'http://192.168.1.168:8000/api/method/frappe.help-api.getAllfacultys'
      )
      .then((response) => {
        setRows(response.data.message.Data);
        console.log(response.data.message.Data);
      });
  }, []);

  // content modal
  const ContentModal = (
    <Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
        <Box sx={{ flexDirection: 'column', width: '50%', ml: 2 }}>
          <Typography sx={{ fontSize: 12, mb: 0.5 }}>
            Academic Name(TH)
          </Typography>
          <Input
            label='Academic Name'
            placeholder={
              validationFac.fi_name_th ? 'Please Type Thai Name' : 'Thai Name'
            }
            type={'text'}
            size='sm'
            error={validationFac.fi_name_th || false}
            slotProps={{
              input: {
                // สำหรับกำหนดค่า min max ที่ inputจะสามารถรับได้
                minLength: 0,
                maxLength: 10,
              },
            }}
            value={state.fi_name_th || ''}
            onChange={(event) => {
              setState((pre) => ({
                ...pre,
                fi_name_th: event.target.value,
              }));
              handleChange(event, 'fi_name_th', 'th');
            }}
            sx={{ mr: 1 }}
          />
        </Box>
        <Box
          sx={{
            flexDirection: 'column',
            width: '50%',
          }}>
          <Input
            placeholder={
              validationFac.fi_name_en
                ? 'Please Type Engligsh Name'
                : 'Engligsh Name'
            }
            type={'text'}
            size='sm'
            error={validationFac.fi_name_en || false}
            slotProps={{
              input: {
                // สำหรับกำหนดค่า min max ที่ inputจะสามารถรับได้
                minLength: 0,
                maxLength: 10,
              },
            }}
            value={state.fi_name_en || ''}
            onChange={(event) => {
              setState((pre) => ({
                ...pre,
                fi_name_en: event.target.value,
              }));
              handleChange(event, 'fi_name_en', 'en');
            }}
            sx={{ ml: 1 }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'flex-start',
          width: '45%',
          mt: 3,
          ml: 2,
        }}>
        <Typography sx={{ fontSize: 12, mb: 0.5 }}>Academic</Typography>
        <Select
          indicator={<KeyboardArrowDown />}
          value={state.academics_ac_id}
          placeholder={
            validationFac.academics_ac_id
              ? 'Please Select Academic'
              : 'Select Academic'
          }
          onChange={(event, value) => {
            setState((pre) => ({ ...pre, academics_ac_id: value }));
            console.log('value: ', value);
          }}
          disabled={selectDisabled}
          color={validationFac.academics_ac_id ? 'danger' : 'neutral'}
          size='sm'
          sx={{
            mt: 0.5,
            fontStyle: 'normal',
            [`& .${selectClasses.indicatorexpanded}`]: {
              transition: '0.2s',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
              },
            },
          }}>
          {dataAcademics?.map((data) => (
            <Option
              key={data.name}
              value={data.ac_id}
              onClick={() =>
                // eslint-disable-next-line implicit-arrow-linebreak
                setSelectState((pre) => ({
                  ...pre,
                  ac_name_th: data.ac_name_th,
                }))
              }>
              {data.ac_name_th}
            </Option>
          ))}
        </Select>
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
      .post(
        'http://192.168.1.168:8000/api/method/frappe.help-api.insertfaculty',
        state
      )
      .then((response) => {
        console.log(response);
        setOpenIns(false);
        const newState1 = { ...selectState, ...state };
        const newState2 = {
          fi_id: response.data.message.Primarykey,
          ...newState1,
        };
        setRows((pre) => [newState2, ...pre]);
        setState(initialState);
        setSelectState(initialSelectState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // สำหรับกด Submit หน้าแก้ไขข้อมูล
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://192.168.1.168:8000/api/method/frappe.help-api.editfaculty',
        state
      )
      .then((response) => {
        console.log(response);
        setOpenUpd(false);
        setState(initialState);
        setSelectState(initialSelectState);
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

  const onSubmit = (e) => {
    if (
      // eslint-disable-next-line operator-linebreak
      state.fi_name_th !== '' &&
      // eslint-disable-next-line operator-linebreak
      state.fi_name_en !== '' &&
      state.academics_ac_id !== null
    ) {
      handleInsertSubmit(e);
      handleEditSubmit(e);
      console.log('Submit');
    }
    if (state.fi_name_th !== '') {
      console.log('NAME THAI NOT NULL');
    } else {
      setValidationFac((pre) => ({ ...pre, fi_name_th: true }));
    }
    if (state.fi_name_en !== '') {
      console.log('NAME ENG NOT NULL');
    } else {
      setValidationFac((pre) => ({ ...pre, fi_name_en: true }));
    }
    if (state.academics_ac_id !== null) {
      console.log('NAME ENG NOT NULL');
    } else {
      setValidationFac((pre) => ({ ...pre, academics_ac_id: true }));
    }
  };

  // สำหรับกด Submit หน้าลบข้อมูล Collegian
  const handleDeleteSubmit = () => {
    axios
      .post(
        'http://192.168.1.168:8000/api/method/frappe.help-api.delete',
        deleteState
      )
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
        }}>
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
            }}>
            <Typography
              sx={{
                fontSize: 12,
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}>
              + Add Institute
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
          header={'Update Institute'}
          labelBtn={'Update'}
          subDetail={true}
          handleSubmit={(e) => onSubmit(e)}
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
          setValidationFac(initialState);
        }}
        content={ContentModal}
        header={'Add New Institute'}
        labelBtn={'Submit'}
        handleSubmit={(e) => onSubmit(e)}
        subDetail={false}
      />
    </div>
  );
}

export default FacultyTab;
