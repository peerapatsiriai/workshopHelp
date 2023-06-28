// =========================================== library ===============================================
import React, { useEffect, useState } from 'react';
import { JoyModal, DeleteButton, ConfirmDelModal } from 'dan-components';
import {
  Box,
  Typography,
  useMediaQuery,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { Select, selectClasses, Option, Input, Modal, Sheet } from '@mui/joy';
import { DataGrid } from '@mui/x-data-grid';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ExportExcel from '../../../../../components/ExportExcel';
// =========================================== library ===============================================

function FacultyTab() {
  // ======================================== Responsive =============================================
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  // ======================================== Responsive =============================================

  // ========================================= variable ==============================================
  const tableName = 'Faculty';
  // ========================================= variable ==============================================

  // ========================================= initial ===============================================
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
  // ========================================= initial ===============================================

  // ================================== ค่า modal state change ========================================
  const [openIns, setOpenIns] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpd, setOpenUpd] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDel, setOpenDel] = React.useState(false); // สำหรับใช้ควบคุม Modal Delete
  const [openPreview, setOpenPreview] = React.useState(false);
  // ================================== ค่า modal state change ========================================

  // ==================================== สำหรับ set ค่า State =========================================
  const [rows, setRows] = useState([]);
  const [dataAcademics, setDataAcademics] = useState([]);
  const [state, setState] = useState(initialState);
  const [selectState, setSelectState] = useState(initialState);
  const [deleteState, setDeleteState] = useState(initialDeleteState);
  // ==================================== สำหรับ set ค่า State =========================================

  // =================================== สำหรับ set ค่า State array =====================================
  const [validationFac, setValidationFac] = useState({
    fi_name_th: false,
    fi_name_en: false,
    academics_ac_id: false,
  });
  // =================================== สำหรับ set ค่า State array =====================================

  // ================================== set columns array object ========================================
  const columns = [
    { field: 'fi_name_th', headerName: 'Name(TH)', width: 200 },
    { field: 'fi_name_en', headerName: 'Name(EN)', width: 300 },
    { field: 'ac_name_th', headerName: 'Academic', width: 450 },
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
            // setSelectDisabled(true);
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
  // ================================== set columns array object ========================================

  // ========================================= handle =================================================
  const handleChange = (e, key, type) => {
    const getKey = key;
    const { value } = e.target;
    let updatedValue = value;
    if (type === 'th') {
      updatedValue = updatedValue.replace(/[^ก-๙เ\s]/g, '');
    } else if (type === 'en') {
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, '');
    }
    setState((pre) => ({ ...pre, [getKey]: updatedValue }));
  };

  // สำหรับกด Submit หน้าเพิ่มข้อมูล
  const handleInsertSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertfaculty', state)
      .then((res) => {
        console.log(res);
        setOpenIns(false);
        const newState1 = { ...selectState, ...state };
        const newState2 = {
          fi_id: res.data.message.Primarykey,
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
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.editfaculty', state)
      .then((response) => {
        console.log(response);
        setOpenUpd(false);
        setState(initialState);
        setSelectState(initialSelectState);
        const objectToUpdate = rows?.find((obj) => obj.fi_id === state.fi_id);

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
        const objectToDelete = rows.filter((obj) => obj.fi_id !== idToDelete);
        console.log('objectToDelete: ', objectToDelete);
        setRows(objectToDelete);
      });
  };
  // ========================================= handle =================================================

  // ======================================== useEffect ===============================================

  // get Data Academics for select
  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllAcademics').then((res) => {
      setDataAcademics(res.data.message.Data);
      res.data.message.Data;
      console.log('API Academics: ', res.data.message.Data);
    });
  }, []);

  // set rows Data Faculty
  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllfacultys').then((response) => {
      setRows(response.data.message.Data);
      console.log('API Faculty', response.data.message.Data);
    });
  }, []);
  // เช็คว่าช่องกรอก ว่างไหม
  useEffect(() => {
    if (state.fi_name_th !== '') {
      setValidationFac((pre) => ({ ...pre, fi_name_th: false }));
    } else {
      console.log('ช่อง NAME THAI: ว่าง');
    }
    if (state.fi_name_en !== '') {
      setValidationFac((pre) => ({ ...pre, fi_name_en: false }));
    } else {
      console.log('ช่อง NAME ENG: ว่าง');
    }
    if (state.academics_ac_id !== '') {
      setValidationFac((pre) => ({ ...pre, academics_ac_id: false }));
    } else {
      console.log('ช่อง NAME Aca: ว่าง ');
    }
  }, [state]);
  // เช็คว่า ข้อมูลในช่องมีอะไรเปลี่ยนบ้าง
  useEffect(() => {
    console.log('อะไรเปลี่ยนบ้างนะ', state);
  }, [state]);

  // ======================================== useEffect ===============================================

  // ========================================= function ===============================================

  const ContentModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
        <Box sx={{ flexDirection: 'column', width: '50%', ml: 2 }}>
          <Typography sx={{ fontSize: 12, mb: 0.5 }}>Academic Name(TH)</Typography>
          <Input
            label='Academic Name'
            placeholder={validationFac.fi_name_th ? 'Please Type Thai Name' : 'Thai Name'}
            type={'text'}
            size='sm'
            error={validationFac.fi_name_th || false}
            slotProps={{
              input: {
                // สำหรับกำหนดค่า min max ที่ inputจะสามารถรับได้
                minLength: 0,
                maxLength: 100,
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
          }}
        >
          <Input
            placeholder={validationFac.fi_name_en ? 'Please Type Engligsh Name' : 'Engligsh Name'}
            type={'text'}
            size='sm'
            error={validationFac.fi_name_en || false}
            slotProps={{
              input: {
                // สำหรับกำหนดค่า min max ที่ inputจะสามารถรับได้
                minLength: 0,
                maxLength: 100,
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
        }}
      >
        <Typography sx={{ fontSize: 12, mb: 0.5 }}>Academic</Typography>
        <Select
          indicator={<KeyboardArrowDown />}
          value={state.academics_ac_id}
          placeholder={
            validationFac.academics_ac_id || state.academics_ac_id === null
              ? 'Please Select Academic'
              : 'Select Academic'
          }
          onChange={(event, value) => {
            setState((pre) => ({ ...pre, academics_ac_id: value }));
            console.log('value: ', value);
          }}
          // disabled={selectDisabled}
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
          }}
        >
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
              }
            >
              {data.ac_name_th + ' ' + data.ac_id}
            </Option>
          ))}
        </Select>
      </Box>
    </Box>
  );

  const onSubmit = (e) => {
    if (
      // eslint-disable-next-line operator-linebreak
      state.fi_name_th !== '' &&
      // eslint-disable-next-line operator-linebreak
      state.fi_name_en !== '' &&
      state.academics_ac_id !== ''
    ) {
      handleInsertSubmit(e);
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
    if (state.academics_ac_id !== '') {
      console.log('NAME ENG NOT NULL');
    } else {
      setValidationFac((pre) => ({ ...pre, academics_ac_id: true }));
    }
  };

  const onUpdate = (e) => {
    if (
      // eslint-disable-next-line operator-linebreak
      state.fi_name_th !== '' &&
      // eslint-disable-next-line operator-linebreak
      state.fi_name_en !== '' &&
      state.academics_ac_id !== null
    ) {
      handleEditSubmit(e);
      console.log('Update');
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
  // ========================================= function ===============================================
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
              + Add Institute
            </Typography>
          </Button>
          <Button
            sx={{ ml: 2 }}
            onClick={() => setOpenPreview(true)}
          >
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
          rows={rows || []}
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
          handleSubmit={(e) => onUpdate(e)}
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
      <Modal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        sx={{
          minWidth: 800,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        }}
      >
        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ExportExcel <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
        <Sheet
          variant='outlined'
          sx={{
            flex: 'none',
            width: '100%',
            minWidth: 600,
            maxWidth: 1200,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            m: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', m: 4 }}>
            <Typography
              variant='h4'
              mb={2}
            >
              Export Excel File
            </Typography>
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: 200,
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{ mt: 1 }}
                    variant='body2'
                  >
                    Table :
                  </Typography>
                  <ExportExcel
                    isEmpty={rows?.length > 0 ? 0 : 1}
                    fileName={tableName + '_' + Date().toLocaleString()}
                    tableName={tableName}
                    excelData={rows?.map((val) => ({
                      AcademicNameTH: val.ac_name_th,
                      AcademicNameEN: val.ac_name_en,
                      Campus: val.ac_campus,
                      Address: val.ac_address,
                      Tel: val.ac_tel,
                      AcademicType: val.ac_type_name_th,
                    }))}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: 200,
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body2'>Total rows :</Typography>
                <Typography variant='body2'>{rows?.length}</Typography>
              </Box>
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            style={{ maxWidth: '100%', width: '100%' }}
          >
            <Table
              sx={{ overflowX: 'auto' }}
              aria-label='spanning table'
            >
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name(TH)</TableCell>
                  <TableCell>Name(EN)</TableCell>
                  <TableCell>Academic Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow
                    key={row.index}
                    sx={{ background: index % 2 === 0 ? '#f2f6fa' : '' }}
                  >
                    <TableCell sx={{ fontWeight: 200, width: 60 }}>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 200 }}>{row.fi_name_th}</TableCell>
                    <TableCell sx={{ fontWeight: 200 }}>{row.fi_name_en}</TableCell>
                    <TableCell sx={{ fontWeight: 200 }}>{row.ac_name_th}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Sheet>
        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ExportExcel <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
      </Modal>
    </div>
  );
}

export default FacultyTab;
