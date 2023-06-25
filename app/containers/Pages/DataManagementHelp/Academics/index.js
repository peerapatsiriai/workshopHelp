import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { Box, Button, Hidden, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import {
  // Input,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  selectClasses,
  Select,
  Option,
  Input,
} from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import TableChartIcon from '@mui/icons-material/TableChart';
import SchoolIcon from '@mui/icons-material/School';
// import SearchIcon from '@mui/icons-material/Search';
// import DataTable from '../../../../components/Tables/DataTable';
// import InputJoy from '../../../../components/Input/InputJoy';
import JoyModal from '../../../../components/Modal/JoyModal';
import DeleteButton from '../../../../components/Button/DeleteButton';
import AcademicsTab from './Tabs/AcademicsTab';

function AcademicsPage() {
  const initialState = {
    ac_id: '',
    ac_name_th: '',
    ac_name_en: '',
    ac_campus: '',
    ac_address: '',
    ac_te: '',
    academic_type_ac_type_id: '',
  };
  const initialDeleteState = {
    table: 'tabacademics',
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
  const [openIns, setOpenIns] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpdAc, setOpenUpdAc] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDelAc, setOpenDelAc] = React.useState(false); // สำหรับใช้ควบคุม Modal Delete
  const [state, setState] = React.useState([]);
  // รับค่า delete state
  const [deleteState, setDeleteState] = useState(initialDeleteState);
  const Academiccolumns = [
    { field: 'ac_id', headerName: 'id', width: 90 },
    { field: 'ac_name_th', headerName: 'Name (Th)', width: 150 },
    { field: 'ac_name_en', headerName: 'Name (En)', width: 150 },
    { field: 'ac_campus', headerName: 'Campus', width: 150 },
    { field: 'ac_address', headerName: 'Address', width: 150 },
    { field: 'ac_tel', headerName: 'Tel', width: 150 },
    { field: 'academic_type_ac_type_id', headerName: 'Type', width: 150 },
    {
      field: 'col',
      headerName: 'Edit',
      width: 150,
      renderCell: (cellValues) => (
        <Button
          variant='text'
          onClick={() => {
            setOpenUpdAc(true);
            setState(cellValues.row);
            setState((pre) => ({ ...pre, primarykey: cellValues.row.ac_id }));
          }}
        >
          ...
        </Button>
      ),
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (cellValues) => (
        <DeleteButton
          handleClick={() => {
            setOpenDelAc(true);
            setDeleteState((pre) => ({
              ...pre,
              primary: cellValues.row.ac_id,
            }));
          }}
        />
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];
  // Academic Row
  const [Academicrows, setAcademicRows] = useState([]);
  // InsertAcademic
  const ContentInsertAcademic = (
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
  ); // dummy ลองเอาไปใส่ Modal
  // เชคค่าใน Input
  useEffect(() => {
    console.log(state);
  }, [state]);
  // ฟังชันเพิ่มค่าใน Academic Row
  const handleInsertAcdemicSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertacademic', state)
      .then((response) => {
        console.log(response);
        setOpenIns(false);
        const newState = { ac_id: response.data.message.Primarykey, ...state };
        setAcademicRows((pre) => [newState, ...pre]);
        setState(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // สำหรับกด Submit หน้าลบข้อมูล Academic
  const handleDeleteAcademicSubmit = () => {
    console.log(deleteState);
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.delete', deleteState)
      .then((response) => {
        console.log(response);
        console.log('deleteState: ', deleteState);
        setOpenDelAc(false);
        // ลบค่า ในออบเจ็กต์
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        const idToDelete = deleteState.primary;
        console.log('idToDelete: ', idToDelete);
        const objectToDelete = Academicrows.filter((obj) => obj.ac_id !== idToDelete);
        console.log('objectToDelete: ', objectToDelete);
        setAcademicRows(objectToDelete);
      });
  };

  // Academic Edit
  const handleEditAcademicSubmit = () => {
    axios;
    console.log(state);
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.editacademic', state)
      .then((response) => {
        console.log(response);
        setOpenUpdAc(false);
        const objectToUpdate = Academicrows.find((obj) => obj.ac_id === state.ac_id);

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
  // Model Edit
  const AcademicContentModal = (
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
  ); // dummy ลองเอาไปใส่ Modal
  // handle closs academic
  const handleClose = () => {
    setState(initialState);
  };

  // color
  const primaryColor = '#1c1c1c';
  useEffect(() => {
    // Academic API
    axios
      .get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllAcademics')
      .then((response) => {
        // handle success
        console.log('test: ', response.data.message.Data);
        setAcademicRows(response.data.message.Data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
    // Academic Type API
    axios
      .get('http://192.168.1.168:8000/api/method/frappe.help-api.getallacademictype')
      .then((response) => {
        // handle success
        console.log('test: ', response.data.message.Data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }, [state]);
  const getRowId = (row) => row.ac_id;
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
        {/* {onlyLargeScreen ? 'LargeScreen ' : onlyMediumScreen ? 'MediumScreen ' : onlySmallScreen ? 'SmallScreen' : 'xs'} */}
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
                  background: primaryColor,
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
                      background: 'gray',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <SchoolIcon
                      style={{ color: 'white' }}
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
                      color: 'white',
                    }}
                  >
                    Academics
                  </Typography>
                  <Typography
                    style={{
                      lineHeight: '11px',
                      color: 'white',
                      opacity: '60%',
                    }}
                    sx={{ fontSize: 12, mt: 0.5 }}
                  >
                    Last updated
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'white',
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
                    <Typography sx={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>4 Tables</Typography>
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
                    background: primaryColor,
                  }}
                >
                  <Box
                    sx={{
                      ml: 3,
                    }}
                  >
                    <Typography sx={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>4 Tables</Typography>
                    <Typography sx={{ fontSize: 14, color: 'white', opacity: '60%' }}>XX records</Typography>
                  </Box>
                </Box>
              </Hidden>
            </Box>
            <Hidden mdDown>
              <Box
                sx={{
                  display: 'flex',
                  width: onlyLargeScreen ? '75%' : onlyMediumScreen ? '75%' : onlySmallScreen ? '100%' : '100%',
                  background: primaryColor,
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
                  <TableChartIcon sx={{ fontSize: 42, color: 'white' }} />
                  <Typography
                    sx={{
                      // fontWeight: 'bold',
                      color: 'white',
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
                    background: primaryColor,
                    px: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'gray',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}
                  >
                    Academics
                  </Tab>
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'gray',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}
                  >
                    Academic Type
                  </Tab>
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'gray',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}
                  >
                    Faculty
                  </Tab>
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'gray',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}
                  >
                    Departments
                  </Tab>
                </TabList>
                <TabPanel
                  value={0}
                  sx={{ p: 2 }}
                >
                  <AcademicsTab
                    setState={setState}
                    ContentModal={AcademicContentModal}
                    setOpenUpd={setOpenUpdAc}
                    openUpd={openUpdAc}
                    setOpenIns={setOpenIns}
                    Academicrows={Academicrows}
                    Academiccolumns={Academiccolumns}
                    handleUpdate={handleEditAcademicSubmit}
                    handleClose={handleClose}
                    getRowId={getRowId}
                    openDelAc={openDelAc} // Delete
                    setOpenDelAc={setOpenDelAc} // Delete
                    handleDelete={handleDeleteAcademicSubmit} // Delete
                  />
                </TabPanel>
                <TabPanel
                  value={1}
                  sx={{ p: 2 }}
                >
                  <b>Academic Type</b> tab panel
                </TabPanel>
                <TabPanel
                  value={2}
                  sx={{ p: 2 }}
                >
                  <b>Faculty</b> tab panel
                </TabPanel>
                <TabPanel
                  value={3}
                  sx={{ p: 2 }}
                >
                  <b>Departments</b> tab panel
                </TabPanel>
              </Tabs>
            </Box>
          </Box>
        </Box>
        {/* สำหรับ insert */}
        <JoyModal
          open={openIns}
          handleClose={() => setOpenIns(false)}
          content={ContentInsertAcademic}
          header={'Add New Academic'}
          labelBtn={'Insert'}
          subDetail={false}
          handleSubmit={handleInsertAcdemicSubmit}
        />
      </PapperBlock>
    </div>
  );
}

export default AcademicsPage;
