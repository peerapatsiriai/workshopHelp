import React, { useEffect, useState } from 'react';
import { JoyModal, DeleteButton, ConfirmDelModal } from 'dan-components';
import {
  Box,
  Typography,
  useMediaQuery,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
} from '@mui/material';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { Select, selectClasses, Option, Input, Modal, Sheet } from '@mui/joy';
import { DataGrid } from '@mui/x-data-grid';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ExportExcel from '../../../../../components/ExportExcel';

function CollegianTab() {
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // initialState ค่า state เริ่ม
  const initialState = {
    co_code: '',
    co_fname_th: '',
    co_lname_th: '',
    co_fname_en: '',
    co_lname_en: '',
    co_email: '',
    co_tel: '',
    ac_id: '',
    fi_id: '',
    cur_id: '',
  };
  const initialDeleteState = {
    table: 'tabcollegians',
    primary: '',
  };
  const initialValidation = {
    co_code: false,
    co_fname_th: false,
    co_lname_th: false,
    co_fname_en: false,
    co_lname_en: false,
    co_email: false,
    co_tel: false,
    ac_id: false,
    fi_id: false,
    cur_id: false,
  };
  const initialSelectState = {
    cur_name_th: '',
  };

  const tableName = 'Collegian';
  // ค่า modal state change
  const [openInsCo, setOpenInsCo] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpdCo, setOpenUpdCo] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDelCo, setOpenDelCo] = React.useState(false); // สำหรับใช้ควบคุม Modal Delete
  const [openPreview, setOpenPreview] = React.useState(false);
  const [dropdownState, setDropdownState] = useState(true);

  // สำหรับ set state เริ่มต้น
  const [rows, setRows] = useState([]);
  const [academicLists, setAcademicLists] = useState([]);
  const [state, setState] = useState(initialState);
  const [deleteState, setDeleteState] = useState(initialDeleteState);
  const [validation, setValidation] = useState(initialValidation);
  const [selectState, setSelectState] = useState([initialSelectState]);

  // สำหรับ dropdown
  const [curriculumsListIns, setCurriculumsListIns] = useState([]);
  const [facultyListIns, setFacultyListIns] = useState([]);
  const [curriculumsList, setCurriculumsList] = useState(curriculumsListIns);
  const [facultyList, setFacultyList] = useState(facultyListIns);

  useEffect(() => {
    console.log(
      'ข้าแต่พระเจ้าพระเยชูคริสตเจ้าสมควรให้นมัสการพระผู้ไถ่ ซึ่งได้ถวายชีวิตบนไม้กางเขนช่วยลูกทั้งหลายให้รอดพ้นจากความตาย '
    );
    console.log('โอ้พระเยซูนาซาเรท ที่ต้องตรึงบนไม้กางเขน โปรดรักษาความคิดของลูกด้วยเถิด');
    console.log('โอ้พระเยซูนาซาเรท ที่ต้องตรึงบนไม้กางเขน โปรดป้องกันความชั่วร้ายต่างๆแก่ลูกด้วยเถิด');
    console.log('โอ้พระเยซูนาซาเรท ที่ต้องตรึงบนไม้กางเขน โปรดป้องกันลูกให้พ้นทุกข์อุกฉกรรจ์ต่างๆ ด้วยเถิด');
    console.log('โอ้พระเยซูนาซาเรท ที่ต้องตรึงบนไม้กางเขน โปรดช่วยบำรุงรักษาลูก (ตามที่ลูกประสงค์)');
    console.log('โอ้พระเยซูนาซาเรท ที่ต้องตรึงบนไม้กางเขน โปรดช่วยพิทักษ์รักษาลูกให้พ้นศัตรูของลูกด้วยเถิด');
    console.log(
      'โอ้พระเยซูนาซาเรท ที่ต้องตรึงบนไม้กางเขน โปรดป้องกันอันตรายต่างๆ ให้พ้นจากตัวลูกและประทานชีวิตให้แก่ลูกด้วยเถิด'
    );
    console.log('โอ้พระเยซูนาซาเรท ที่ต้องตรึงบนไม้กางเขน โปรดทรงพระกรุณาแก่ลูก ณ กาลบัดนี้ และเสมอไปด้วยเถิด');
    console.log(
      'ข้าแต่พระจิตผู้ประทานให้ลูกมองเห็นและแสดงให้ลูกได้พบหนทางที่จะบรรลุถึงความปรารถนาของลูก ผู้ประทานพระหรรษทานสำหรับการยกโทษและลืมความผิดบกพร่องต่าง ๆ และผู้เป็นแบบอย่างสำหรับชีวิตของลูก ในบทภาวนาสั้นๆ นี้ ลูกขอขอบพระคุณพระองค์สำหรับทุกสิ่งทุกอย่าง และลูกขอกล่าวย้ำอีกว่า ลูกไม่ต้องการที่จะแยกจากพระองค์ ไม่มีอะไรสำคัญกว่าความปรารถนานี้ ลูกต้องการเป็นหนึ่งเดียวกับพระองค์และความรักของลูกเพื่อพระองค์เท่านั้น'
    );
  }, []);

  useEffect(() => {
    // set rows Data
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllcollegians').then((response) => {
      setRows(response.data.message.Data);
      console.log(response.data.message.Data);
    });
    // set rows academic list for dropdown
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllAcademics').then((response) => {
      setAcademicLists(response.data.message.Data);
      console.log(response.data.message.Data);
    });
  }, []);

  useEffect(() => {
    axios
      .get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllCurriculumandFaculty')
      .then((response) => {
        console.log(response);
        setCurriculumsListIns(response.data.message.CurriculumList);
        setFacultyListIns(response.data.message.FacultyList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }, []);

  const dropdown = (id) => {
    const strId = id.toString();
    console.log(strId);
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.getAllCurriculumandFacultyinoneacademic', {
        primarykey: strId,
      })
      .then((response) => {
        console.log(response);
        setCurriculumsList(response.data.message.CurriculumsList);
        setFacultyList(response.data.message.FacultyList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  };

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
            dropdown(cellValues.row.co_id);
            setState(cellValues.row);
            setState((pre) => ({ ...pre, primarykey: cellValues.row.co_id }));

            setDropdownState(false);
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

  const handleChange = (e, key, type) => {
    const { value } = e.target;
    const getKey = key;
    let updatedValue = value;
    if (type === 'th') {
      updatedValue = updatedValue.replace(/[^ก-๙เ\s]/g, '');
    } else if (type === 'en') {
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, '');
    } else if (type === 'email') {
      updatedValue = updatedValue.replace(/[^A-Za-z0-9.@+-]|[@][^A-Za-z0-9.@+-\u0E01-\u0E5B]/g, '');
    } else if (type === 'tel') {
      updatedValue = updatedValue.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (type === 'code') {
      updatedValue = updatedValue.replace(/[^a-zA-Z0-9\s]/g, '');
    }
    setState((pre) => ({ ...pre, [getKey]: updatedValue }));
  };

  // content modal
  const ContentModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Academic</Typography>
          <Select
            id='Academic'
            placeholder='กรุณาเลือกคณะ'
            indicator={<KeyboardArrowDown />}
            value={state.ac_id || ''}
            onChange={(event, value) => {
              setState((pre) => ({ ...pre, ac_id: value }));
            }}
            color={validation.ac_id ? 'danger' : 'neutral'}
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
            {academicLists?.map((acadamicList) => (
              <Option
                key={acadamicList.ac_id}
                value={acadamicList.ac_id}
                onClick={() => {
                  dropdown(acadamicList.ac_id);
                  setDropdownState(false);
                }}
              >
                {acadamicList.ac_name_th}
              </Option>
            ))}
          </Select>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Curriculum</Typography>
          <Select
            id='curriculums_cur_id'
            placeholder='กรุณาเลือกหลักสูตร'
            indicator={<KeyboardArrowDown />}
            value={state.cur_id || ''}
            onChange={(event, value) => {
              setState((pre) => ({ ...pre, cur_id: value, curriculums_cur_id: value }));
            }}
            color={validation.curriculums_cur_id ? 'danger' : 'neutral'}
            disabled={dropdownState}
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
            {curriculumsList?.map((curriculum) => (
              <Option
                key={curriculum.cur_id}
                value={curriculum.cur_id}
                onClick={() => setSelectState((pre) => ({ ...pre, cur_name_th: curriculum.cur_name_th }))}
              >
                {curriculum.cur_name_th}
              </Option>
            ))}
          </Select>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Faculty Institutes</Typography>
          <Select
            id='fi_id'
            placeholder='กรุณาเลือกคณะ'
            indicator={<KeyboardArrowDown />}
            value={state.fi_id || ''}
            onChange={(event, value) => {
              setState((pre) => ({ ...pre, fi_id: value, faculty_institutes_fi_id: value }));
            }}
            color={validation.fi_id ? 'danger' : 'neutral'}
            disabled={dropdownState}
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
            {facultyList?.map((faculty) => (
              <Option
                key={faculty.fi_id}
                value={faculty.fi_id}
              >
                {faculty.fi_name_th}
              </Option>
            ))}
          </Select>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>First Name(TH)</Typography>
          </Box>
          <Input
            error={validation.co_fname_th || false}
            placeholder={validation.co_fname_th ? 'กรุณากรอกชื่อ ภาษาไทย' : ''}
            size='md'
            type='text'
            slotProps={{
              input: {
                maxLength: 33,
              },
            }}
            value={state.co_fname_th || ''}
            onChange={(event) => handleChange(event, 'co_fname_th', 'th')}
            sx={{ mx: 1 }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Last Name(TH)</Typography>
          </Box>
          <Input
            error={validation.co_lname_th || false}
            placeholder={validation.co_lname_th ? 'กรุณากรอกนามสกุล ภาษาไทย' : ''}
            size='md'
            type='text'
            slotProps={{
              input: {
                maxLength: 33,
              },
            }}
            value={state.co_lname_th || ''}
            onChange={(event) => handleChange(event, 'co_lname_th', 'th')}
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
            error={validation.co_fname_en || false}
            placeholder={validation.co_fname_en ? 'กรุณากรอกชื่อ อังกฤษ' : ''}
            size='md'
            type='text'
            slotProps={{
              input: {
                maxLength: 33,
              },
            }}
            value={state.co_fname_en}
            onChange={(event) => handleChange(event, 'co_fname_en', 'en')}
            sx={{ mx: 1 }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Last Name(EN)</Typography>
          </Box>
          <Input
            error={validation.co_lname_en || false}
            placeholder={validation.co_lname_en ? 'กรุณากรอกนามสกุล อังกฤษ' : ''}
            size='md'
            type='text'
            slotProps={{
              input: {
                maxLength: 33,
              },
            }}
            value={state.co_lname_en}
            onChange={(event) => handleChange(event, 'co_lname_en', 'en')}
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
            error={validation.co_code || false}
            placeholder={validation.co_code ? 'กรุณากรอกรหัสนักศึกษา' : ''}
            size='md'
            type='text'
            slotProps={{
              input: {
                maxLength: 30,
              },
            }}
            value={state.co_code}
            onChange={(event) => handleChange(event, 'co_code', 'code')}
            sx={{ mx: 1 }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>Email</Typography>
          </Box>
          <Input
            error={validation.co_email || false}
            placeholder={validation.co_email ? 'กรุณากรอก Email' : ''}
            size='md'
            slotProps={{
              input: {
                maxLength: 100,
                type: 'email',
                pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}',
                title: 'กรุณากรอกอีเมลให้ถูกต้อง',
              },
            }}
            value={state.co_email}
            onChange={(event) => handleChange(event, 'co_email', 'email')}
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
            error={validation.co_tel || false}
            placeholder={validation.co_tel ? 'กรุณากรอกเบอร์โทรศัพท์ ' : ''}
            size='md'
            type='tel'
            slotProps={{
              input: {
                minLength: 10,
                maxLength: 10,
              },
            }}
            value={state.co_tel}
            onChange={(event) => handleChange(event, 'co_tel', 'tel')}
            sx={{ mx: 1 }}
          />
        </Box>
      </Box>
    </Box>
  );

  // เช็คค่าใน state
  useEffect(() => {
    console.log('state: ', state);
  }, [state]);

  // สำหรับกด Submit หน้าเพิ่มข้อมูล Collegian
  const handleInsertSubmit = () => {
    Object.keys(state).forEach((key) => {
      const value = state[key];
      if (value === '' || value === null) {
        setValidation((prevValidation) => ({ ...prevValidation, [key]: true }));
      }
    });

    console.log(validation);

    if (Object.values(state).every((value) => value !== '')) {
      console.log('ok');
      axios
        .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertcollegian', state)
        .then((response) => {
          console.log('res: ', response);
          setOpenInsCo(false);
          // console.log('t: ', response.data.message.Primarykey);
          const newState1 = { ...selectState, ...state };
          const newState2 = { co_id: response.data.message.Primarykey, ...newState1 };
          console.log(newState2);
          setRows((pre) => [newState2, ...pre]);
          setState(initialState);
          setSelectState(initialSelectState);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // สำหรับกด Submit หน้าแก้ไขข้อมูล Collegian
  const handleEditSubmit = () => {
    Object.keys(state).forEach((key) => {
      const value = state[key];
      if (value === '' || value === null) {
        setValidation((prevValidation) => ({ ...prevValidation, [key]: true }));
      }
    });

    console.log(validation);

    if (Object.values(state).every((value) => value !== '')) {
      axios
        .post('http://192.168.1.168:8000/api/method/frappe.help-api.editcollegian', state)
        .then((response) => {
          console.log('res: ', response);
          setOpenUpdCo(false);
          const objectToUpdate = rows?.find((obj) => obj.co_id === state.co_id);

          // แก้ไขค่า ในออบเจ็กต์
          if (objectToUpdate) {
            objectToUpdate.co_code = state.co_code;
            objectToUpdate.co_fname_th = state.co_fname_th;
            objectToUpdate.co_lname_th = state.co_lname_th;
            objectToUpdate.co_fname_en = state.co_fname_en;
            objectToUpdate.co_lname_en = state.co_lname_en;
            objectToUpdate.co_email = state.co_email;
            objectToUpdate.co_tel = state.co_tel;
            objectToUpdate.fi_id = state.fi_id;
          }
          setState(initialState);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // สำหรับกด Submit หน้าลบข้อมูล Collegian
  const handleDeleteSubmit = () => {
    setOpenDelCo(false);
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.delete', deleteState)
      .then((response) => {
        console.log('res: ', response);
        console.log('deleteState: ', deleteState);

        // ลบค่า ในออบเจ็กต์
      })
      .catch((error) => {
        console.log('err: ', error);
      })
      .finally(() => {
        const idToDelete = deleteState.primary;
        console.log('idToDelete: ', idToDelete);
        const objectToDelete = rows?.filter((obj) => obj.co_id !== idToDelete);
        console.log('objectToDelete: ', objectToDelete);
        setRows(objectToDelete);
      });
  };

  // Update ค่า Validation ที่แสดงเตือนสีแดง แล้วมีเพิ่มข้อมูลให้ปิดสีแดง
  useEffect(() => {
    const updatedValidation = {};
    Object.keys(state).forEach((key) => {
      const value = state[key];
      if (value !== '' && value !== null) {
        updatedValidation[key] = false;
      }
    });
    setValidation((prevValidation) => ({ ...prevValidation, ...updatedValidation }));
  }, [state]);

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
              setCurriculumsList(curriculumsListIns);
              setFacultyList(facultyListIns);
              setDropdownState(true);
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
              + Add Collegian
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
          columns={collegianColumns}
          getRowId={(row) => row.co_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
        {/* สำหรับ edit */}
        <JoyModal
          open={openUpdCo}
          handleClose={() => {
            setOpenUpdCo(false);
            setState(initialState);
            setValidation(initialValidation);
          }}
          content={ContentModal}
          header={'Update Collegian'}
          labelBtn={'Update'}
          subDetail={true}
          handleSubmit={handleEditSubmit}
        />
        <ConfirmDelModal
          open={openDelCo}
          handleClose={() => setOpenDelCo(false)}
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
          setValidation(initialValidation);
        }}
        content={ContentModal}
        header={'Add New Collegian'}
        labelBtn={'Submit'}
        handleSubmit={handleInsertSubmit}
        subDetail={false}
      />
      <Modal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        sx={{ minWidth: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}
      >
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
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', width: 200, justifyContent: 'space-between' }}>
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
                    excelData={
                      // eslint-disable-next-line operator-linebreak
                      rows?.map((val) => ({
                        Code: val.co_code,
                        FirstNameTH: val.co_fname_th,
                        LastNameTH: val.co_lname_th,
                        FirstNameEN: val.co_fname_en,
                        LastNameEN: val.co_lname_en,
                        Email: val.co_email,
                        Tel: val.co_tel,
                        Faculty: val.fi_name_th,
                      }))
                    }
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', width: 200, justifyContent: 'space-between' }}>
                <Typography variant='body2'>Total rows :</Typography>
                <Typography variant='body2'>{rows !== undefined ? rows?.length : ''}</Typography>
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
                  <TableCell>Code</TableCell>
                  <TableCell>First Name(TH)</TableCell>
                  <TableCell>Last Name(TH)</TableCell>
                  <TableCell>First Name(EN)</TableCell>
                  <TableCell>Last Name(EN)</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Tel</TableCell>
                  <TableCell>Faculty</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow
                    key={row.co_id}
                    sx={{ background: index % 2 === 0 ? '#f2f6fa' : '' }}
                  >
                    <TableCell sx={{ fontWeight: 200, width: 60 }}>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 200, maxWidth: 160 }}>{row.co_code}</TableCell>
                    <TableCell sx={{ fontWeight: 200, maxWidth: 160 }}>{row.co_fname_th}</TableCell>
                    <TableCell sx={{ fontWeight: 200, maxWidth: 140 }}>{row.co_lname_th}</TableCell>
                    <TableCell sx={{ fontWeight: 200, maxWidth: 160 }}>{row.co_fname_en}</TableCell>
                    <TableCell sx={{ fontWeight: 200, maxWidth: 160 }}>{row.co_lname_en}</TableCell>
                    <TableCell sx={{ fontWeight: 200, maxWidth: 140 }}>{row.co_email}</TableCell>
                    <TableCell sx={{ fontWeight: 200, maxWidth: 160 }}>{row.co_tel}</TableCell>
                    <TableCell sx={{ fontWeight: 200, maxWidth: 140 }}>{row.fi_name_th}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Sheet>
      </Modal>
    </div>
  );
}

export default CollegianTab;
