import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, JoyModal, DeleteButton } from 'dan-components';
import { Box, Hidden, Typography, useMediaQuery, Button } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { Tab, TabList, TabPanel, Tabs, Select, selectClasses, Option, Input } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CollegianTab from './Tabs/CollegianTab';
import InstructorTab from './Tabs/InstructorTab';

function PersonelsPage() {
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
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // สำหรับ Responsive
  const title = brand.name + ' - Blank Page';
  const description = brand.desc;
  const [openInsCo, setOpenInsCo] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpdCo, setOpenUpdCo] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDelCo, setOpenDelCo] = React.useState(false); // สำหรับใช้ควบคุม Modal Delete

  // สำหรับรับค่า
  const [CollegianRows, setCollegianRows] = useState([]);
  // const [InstructorRows, setInstructorRows] = useState([]);
  const [selectDisabledCo, setSelectDisabledCo] = useState(false);
  const [state, setState] = useState(initialState);

  const [deleteState, setDeleteState] = useState(initialDeleteState);

  // dummy
  const columnsForCollegians = [
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

  // const columnsForInstructor = [
  //   { field: 'co_fname_th', headerName: 'First Name', width: 150 },
  //   { field: 'co_lname_th', headerName: 'Last Name', width: 150 },
  //   { field: 'co_email', headerName: 'Email', width: 300 },
  //   { field: 'co_tel', headerName: 'Tel', width: 120 },
  //   { field: 'cur_name_th', headerName: 'Faculty Institute', width: 300 },
  //   {
  //     field: 'Edit',
  //     headerName: 'Edit',
  //     width: 100,
  //     renderCell: (cellValues) => (
  //       <Button
  //         variant='text'
  //         onClick={() => {
  //           setOpenUpdCo(true);
  //           setState(cellValues.row);
  //           setState((pre) => ({ ...pre, primarykey: cellValues.row.co_id }));
  //           setSelectDisabledCo(true);
  //         }}
  //       >
  //         ...
  //       </Button>
  //     ),
  //     // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
  //   },
  //   {
  //     field: 'Delete',
  //     headerName: 'Delete',
  //     width: 100,
  //     renderCell: (cellValues) => (
  //       <DeleteButton
  //         handleClick={() => {
  //           setOpenDelCo(true);
  //           setDeleteState((pre) => ({ ...pre, primary: cellValues.row.co_id }));
  //         }}
  //       />
  //     ),
  //     // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
  //   },
  // ];

  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllcollegians').then((response) => {
      setCollegianRows(response.data.message.Data);
      console.log(response.data.message.Data);
    });
  }, []);

  // useEffect(() => {
  //   axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllinstructors').then((response) => {
  //     setInstructorRows(response.data.message.Data);
  //     console.log(response.data.message.Data);
  //   });
  // }, []);

  // modal
  // สำหรับ ใส่ใน Insert Form Modal
  const CollegianContentModal = (
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
  const handleInsertCollegianSubmit = (e) => {
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
  const handleEditCollegianSubmit = () => {
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.editcollegian', state)
      .then((response) => {
        console.log(response);
        setOpenUpdCo(false);
        const objectToUpdate = CollegianRows.find((obj) => obj.co_id === state.co_id);

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
  const handleDeleteCollegianSubmit = () => {
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
        const objectToDelete = CollegianRows.filter((obj) => obj.co_id !== idToDelete);
        console.log('objectToDelete: ', objectToDelete);
        setCollegianRows(objectToDelete);
      });
  };

  const handleClose = () => {
    setState(initialState);
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta
          name='description'
          content={description}
        />
        <meta
          property='og:title'
          content={title}
        />
        <meta
          property='og:description'
          content={description}
        />
        <meta
          property='twitter:title'
          content={title}
        />
        <meta
          property='twitter:description'
          content={description}
        />
      </Helmet>
      <PapperBlock
        title='Table Group'
        desc=''
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: onlyLargeScreen ? 'row' : onlyMediumScreen ? 'row' : onlySmallScreen ? 'column' : 'column',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: onlyLargeScreen
                  ? 'column'
                  : onlyMediumScreen
                  ? 'column'
                  : onlySmallScreen
                  ? 'row'
                  : 'row',
                width: onlyLargeScreen ? '25%' : onlyMediumScreen ? '25%' : onlySmallScreen ? '100%' : '100%',
                textAlign: onlyLargeScreen ? 'left' : onlyMediumScreen ? 'left' : onlySmallScreen ? 'center' : 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '50%',
                  width: '100%',
                  background: '#FAFAFA',
                  borderTopLeftRadius: 20,
                  justifyContent: onlyLargeScreen
                    ? 'left'
                    : onlyMediumScreen
                    ? 'left'
                    : onlySmallScreen
                    ? 'left'
                    : 'left',
                  textAlign: onlyLargeScreen ? 'left' : onlyMediumScreen ? 'left' : onlySmallScreen ? 'left' : 'left',
                }}
              >
                <Box
                  sx={{
                    ml: onlyLargeScreen ? 0 : onlyMediumScreen ? 0 : onlySmallScreen ? 2 : 2,
                    display: 'flex',
                    justifyContent: 'right',
                    width: onlyLargeScreen ? '30%' : onlyMediumScreen ? '30%' : onlySmallScreen ? '10%' : '10%',
                  }}
                >
                  <Box
                    sx={{
                      ml: 3,
                      mt: 3.5,
                      mb: onlyLargeScreen ? 3 : onlyMediumScreen ? 3 : onlySmallScreen ? 0 : 0,
                      p: 1.5,
                      width: 45,
                      height: 45,
                      borderRadius: 4,
                      background: 'lightgray',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <AccountBalanceIcon
                      style={{ color: 'black' }}
                      fontSize={'large'}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    m: 2,
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    Personels
                  </Typography>
                  <Typography
                    style={{
                      lineHeight: '11px',
                      color: 'black',
                      opacity: '60%',
                    }}
                    sx={{ fontSize: 12, mt: 0.5 }}
                  >
                    Last updated
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'black',
                      opacity: '60%',
                      mt: 0.5,
                    }}
                  >
                    on March 13th,2023
                  </Typography>
                </Box>
                <Hidden mdUp>
                  <Box
                    sx={{
                      ml: 3,
                      mt: 1,
                      mb: onlyLargeScreen ? 3 : onlyMediumScreen ? 3 : onlySmallScreen ? 0 : 0,
                      p: 2.5,
                      pl: 0,
                    }}
                  >
                    <Typography sx={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>2 Tables</Typography>
                  </Box>
                </Hidden>
              </Box>
              <Hidden mdDown>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50%',
                    p: 2,
                    background: '#FAFAFA',
                  }}
                >
                  <Box
                    sx={{
                      ml: 3,
                    }}
                  >
                    <Typography sx={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>2 Tables</Typography>
                    <Typography sx={{ fontSize: 14, color: 'black', opacity: '60%' }}>XX records</Typography>
                  </Box>
                </Box>
              </Hidden>
            </Box>
            <Hidden mdDown>
              <Box
                sx={{
                  display: 'flex',
                  width: onlyLargeScreen ? '75%' : onlyMediumScreen ? '75%' : onlySmallScreen ? '100%' : '100%',
                  background: '#FAFAFA',
                  p: 2,
                  textAlign: 'left',
                  borderTopRightRadius: 20,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    mt: 12,
                    pl: 4,
                  }}
                >
                  <TableChartIcon sx={{ fontSize: 42, color: 'black' }} />
                  <Typography
                    sx={{
                      // fontWeight: 'bold',
                      color: 'black',
                      fontSize: 28,
                      m: 0.5,
                      ml: 1.5,
                    }}
                  >
                    Data Management
                  </Typography>
                </Box>
              </Box>
            </Hidden>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Tabs
                aria-label='Basic tabs'
                defaultValue={0}
              >
                <TabList
                  sx={{
                    pl: onlyLargeScreen ? '30%' : onlyMediumScreen ? '30%' : onlySmallScreen ? '0%' : '0%',
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    background: '#FAFAFA',
                    px: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'black',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}
                  >
                    Colegians
                  </Tab>
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'black',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}
                  >
                    Instrutors
                  </Tab>
                </TabList>
                <TabPanel
                  value={0}
                  sx={{ p: 2 }}
                >
                  <CollegianTab
                    setState={setState}
                    ContentModal={CollegianContentModal}
                    setOpenUpd={setOpenUpdCo}
                    openUpd={openUpdCo}
                    setOpenIns={setOpenInsCo}
                    rows={CollegianRows}
                    columns={columnsForCollegians}
                    handleUpdate={handleEditCollegianSubmit}
                    handleCloseUpd={handleClose}
                    setSelectDisabledCo={setSelectDisabledCo}
                    openDelCo={openDelCo}
                    setOpenDelCo={setOpenDelCo}
                    handleDelete={handleDeleteCollegianSubmit}
                  />
                </TabPanel>
                <TabPanel
                  value={1}
                  sx={{ p: 2 }}
                >
                  <InstructorTab />
                </TabPanel>
              </Tabs>
            </Box>
          </Box>
        </Box>
        {/* สำหรับ insert */}
        <JoyModal
          open={openInsCo}
          handleClose={() => {
            setOpenInsCo(false);
            setState(initialState);
          }}
          content={CollegianContentModal}
          header={'Add New Collegian'}
          labelBtn={'Submit'}
          handleSubmit={handleInsertCollegianSubmit}
          subDetail={true}
        />
      </PapperBlock>
    </div>
  );
}

export default PersonelsPage;
