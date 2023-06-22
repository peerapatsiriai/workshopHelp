import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, InputJoy, JoyModal } from 'dan-components';
import { Box, Hidden, Typography, useMediaQuery, Button } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { Tab, TabList, TabPanel, Tabs, Select, selectClasses, Option } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CollegianTab from './Tabs/CollegianTab';

function PersonelsPage() {
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  // สำหรับ Responsive
  const title = brand.name + ' - Blank Page';
  const description = brand.desc;
  const [openIns, setOpenIns] = React.useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpd, setOpenUpd] = React.useState(false); // สำหรับใช้ควบคุม Modal update
  // สำหรับรับค่า
  // สำหรับรับค่า
  const [rows, setRows] = useState([]);
  const [state, setState] = useState({
    co_fname_th: '',
    co_lname_th: '',
    co_fname_en: '',
    co_lname_en: '',
    co_code: '',
    co_email: '',
    co_tel: '',
    faculty_institutes_fi_id: '',
    curriculums_cur_id: '',
  });

  // dummy
  const columnsFCollegians = [
    { field: 'co_code', headerName: 'Code', width: 150 },
    { field: 'co_fname_th', headerName: 'First Name', width: 200 },
    { field: 'co_lname_th', headerName: 'Last Name', width: 200 },
    { field: 'co_email', headerName: 'Email', width: 300 },
    { field: 'co_tel', headerName: 'Tel', width: 150 },
    { field: 'curriculums_cur_id', headerName: 'Curriculum', width: 200 },
    {
      field: 'col3',
      headerName: 'Edit',
      width: 150,
      renderCell: () => (
        <Button
          variant='text'
          onClick={() => setOpenUpd(true)}
        >
          ...
        </Button>
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];

  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllcollegians').then((response) => {
      setRows(response.data.message.Data);
      console.log(response.data.message.Data);
    });
  }, []);

  // modal
  // สำหรับ ใส่ใน Insert Form Modal
  const CollegianContentInsertModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <InputJoy
            label='First Name(TH)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
            value={state.co_fname_th}
            onChange={(event) => setState({ co_fname_th: event.target.value })}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <InputJoy
            label='Last Name(TH)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <InputJoy
            label='First Name(ENG)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <InputJoy
            label='Last Name(ENG)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <InputJoy
            label='Collegian Code'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <InputJoy
            label='Email'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ width: '50%' }}>
          <InputJoy
            label='Telphone'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1, ml: 2 }}>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5 }}>Faculty Institutes</Typography>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            sx={{
              mr: 5,
              border: 1,
              size: 'sm',
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value='1'>คณะวิศวกรรมศาสตร์</Option>
            <Option value='2'>คณะบริหารธุรกิจและศิลปศาสตร์</Option>
            <Option value='3'>คณะวิทยาศาสตร์และเทคโนโลยีการเกษตร</Option>
          </Select>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Curriculum</Typography>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            sx={{
              ml: 2,
              mr: 5,
              border: 1,
              size: 'sm',
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value='1'>วิศวกรรมอุตสาหการ</Option>
            <Option value='2'>วิศวกรรมแม่พิมพ์</Option>
            <Option value='3'>วิศวกรรมโยธา</Option>
          </Select>
        </Box>
      </Box>
    </Box>
  );

  // Modal Content
  // สำหรับ ใส่ใน Edit Form Modal
  const CollegianContentEditModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='First Name(TH)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
            value={state.co_fname_th}
            onChange={(event) => setState({ co_fname_th: event.target.value })}
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%', mb: 1 }}>
          <InputJoy
            label='Last Name(TH)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='First Name(ENG)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%', mb: 1 }}>
          <InputJoy
            label='Last Name(ENG)'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Collegian Code'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%', mb: 1 }}>
          <InputJoy
            label='Email'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Telphone'
            placeholder='Type in here…'
            type={'text'}
            size={'md'}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Faculty Institutes</Typography>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            size='sm'
            sx={{
              ml: 2,
              border: 1,
              mr: 5,
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value='1'>คณะวิศวกรรมศาสตร์</Option>
            <Option value='2'>คณะบริหารธุรกิจและศิลปศาสตร์</Option>
            <Option value='3'>คณะวิทยาศาสตร์และเทคโนโลยีการเกษตร</Option>
          </Select>
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <Typography sx={{ fontSize: 12, mb: 0.5, ml: 2 }}>Curriculum</Typography>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            size='sm'
            sx={{
              ml: 2,
              mr: 5,
              border: 1,
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value='1'>วิศวกรรมอุตสาหการ</Option>
            <Option value='2'>วิศวกรรมแม่พิมพ์</Option>
            <Option value='3'>วิศวกรรมโยธา</Option>
          </Select>
        </Box>
      </Box>
    </Box>
  );

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
                    ContentModal={CollegianContentEditModal}
                    setOpenUpd={setOpenUpd}
                    openUpd={openUpd}
                    setOpenIns={setOpenIns}
                    rows={rows}
                    columns={columnsFCollegians}
                  />
                </TabPanel>
                <TabPanel
                  value={1}
                  sx={{ p: 2 }}
                >
                  <b>Academic Type</b> tab panel
                </TabPanel>
              </Tabs>
            </Box>
          </Box>
        </Box>
        {/* สำหรับ insert */}
        <JoyModal
          open={openIns}
          handleClose={() => setOpenIns(false)}
          content={CollegianContentInsertModal}
          header={'Add New Collegian'}
          labelBtn={'Submit'}
        />
      </PapperBlock>
    </div>
  );
}

export default PersonelsPage;
