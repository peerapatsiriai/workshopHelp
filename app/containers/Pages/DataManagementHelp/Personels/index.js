import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, InputJoy, JoyModal } from 'dan-components';
import { Box, Button, Hidden, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Input, Tab, TabList, TabPanel, Tabs, Select, selectClasses, Option, FormLabel } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

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
  const columnsForCollegians = [
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

  // Modal Content
  // สำหรับ ใส่ใน Edit Form Modal
  const CollegianContentEditModal = (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            color='neutral'
            variant='body2'
            sx={{
              ml: 2,
            }}
          >
            Created On March 10/2/2023 : 15:59:41
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            color='neutral'
            variant='body2'
            sx={{
              ml: 2,
            }}
          >
            Last updated On March 22/2/2023 : 21:32:51
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='First Name(TH)'
            placeholder='Type in here…'
            value={state.co_fname_th}
            onChange={(event) => setState({ co_fname_th: event.target.value })}
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Last Name(TH)'
            placeholder='Type in here…'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='First Name(ENG)'
            placeholder='Type in here…'
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Last Name(ENG)'
            placeholder='Type in here…'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Collegian Code'
            placeholder='Type in here…'
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Email'
            placeholder='Type in here…'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Telphone'
            placeholder='Type in here…'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <FormLabel
            sx={(themeFL) => ({
              '--FormLabel-color': themeFL.vars.palette.primary.plainColor,
              ml: 2,
            })}
          >
            Faculty Institutes
          </FormLabel>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            sx={{
              ml: 2,
              border: 1,
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
          <FormLabel
            sx={(themeFL) => ({
              '--FormLabel-color': themeFL.vars.palette.primary.plainColor,
              ml: 2,
            })}
          >
            Curriculum
          </FormLabel>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            sx={{
              ml: 2,
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

  // สำหรับ ใส่ใน Insert Form Modal
  const CollegianContentInsertModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='First Name(TH)'
            placeholder='Type in here…'
            value={state.co_fname_th}
            onChange={(event) => setState({ co_fname_th: event.target.value })}
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Last Name(TH)'
            placeholder='Type in here…'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='First Name(ENG)'
            placeholder='Type in here…'
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Last Name(ENG)'
            placeholder='Type in here…'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Collegian Code'
            placeholder='Type in here…'
          />
        </Box>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Email'
            placeholder='Type in here…'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <InputJoy
            label='Telphone'
            placeholder='Type in here…'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexDirection: 'column', width: '50%' }}>
          <FormLabel
            sx={(themeFL) => ({
              '--FormLabel-color': themeFL.vars.palette.primary.plainColor,
              ml: 2,
            })}
          >
            Faculty Institutes
          </FormLabel>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            sx={{
              ml: 2,
              border: 1,
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
          <FormLabel
            sx={(themeFL) => ({
              '--FormLabel-color': themeFL.vars.palette.primary.plainColor,
              ml: 2,
            })}
          >
            Curriculum
          </FormLabel>
          <Select
            placeholder='Type in here…'
            indicator={<KeyboardArrowDown />}
            sx={{
              ml: 2,
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
        {onlyLargeScreen ? 'LargeScreen ' : onlyMediumScreen ? 'MediumScreen ' : onlySmallScreen ? 'SmallScreen' : 'xs'}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: 'red',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: onlyLargeScreen ? 'row' : onlyMediumScreen ? 'row' : onlySmallScreen ? 'column' : 'column',
              width: '100%',
              background: 'blue',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: onlyLargeScreen ? '30%' : onlyMediumScreen ? '30%' : onlySmallScreen ? '100%' : '100%',
                background: 'black',
                textAlign: onlyLargeScreen ? 'left' : onlyMediumScreen ? 'left' : onlySmallScreen ? 'center' : 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '50%',
                  width: '100%',
                  background: 'red',
                  justifyContent: onlyLargeScreen
                    ? 'left'
                    : onlyMediumScreen
                    ? 'left'
                    : onlySmallScreen
                    ? 'center'
                    : 'center',
                  textAlign: onlyLargeScreen
                    ? 'left'
                    : onlyMediumScreen
                    ? 'left'
                    : onlySmallScreen
                    ? 'center'
                    : 'center',
                }}
              >
                <Typography sx={{ p: 4 }}>ICON</Typography>
                <Box sx={{ p: 1, m: 2 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>Table name</Typography>
                  <Typography
                    style={{ lineHeight: '10px' }}
                    sx={{ fontSize: 12 }}
                  >
                    last updated
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>on March 13th,2023</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '50%',
                  p: 2,
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 'bold' }}>COUNT TABLE</Typography>
                  <Typography sx={{ fontSize: '14px' }}>COUNT ALL RECORDS</Typography>
                </Box>
              </Box>
            </Box>
            <Hidden mdDown>
              <Box
                sx={{
                  display: 'flex',
                  width: onlyLargeScreen ? '70%' : onlyMediumScreen ? '70%' : onlySmallScreen ? '100%' : '100%',
                  background: 'green',
                  p: 2,
                  textAlign: 'left',
                }}
              >
                <Typography m={6}>ICON DATAMANAGEMENT</Typography>
              </Box>
            </Hidden>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              background: 'blue',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Tabs
                aria-label='Basic tabs'
                defaultValue={0}
                sx={{ borderRadius: 'lg' }}
              >
                <TabList
                  sx={{
                    pl: onlyLargeScreen ? '30%' : onlyMediumScreen ? '30%' : onlySmallScreen ? '0%' : '0%',
                  }}
                >
                  <Tab>Collegians</Tab>
                  <Tab>Instrutors</Tab>
                </TabList>
                <TabPanel
                  value={0}
                  sx={{ p: 2 }}
                >
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
                        onClick={() => setOpenIns(true)}
                        sx={{
                          px: 2,
                          background: 'black',
                          color: 'white',
                          borderRadius: 5,
                        }}
                      >
                        + ADD Collegians
                      </Button>
                      <Input
                        startDecorator={<SearchIcon sx={{ color: 'text.tertiary' }} />}
                        placeholder='Search'
                        size='sm'
                        sx={{
                          ml: 2,
                          border: 1,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    {/* ทำแค่ตัวนี้ก่อน */}
                    <DataGrid
                      rows={rows}
                      columns={columnsForCollegians}
                      getRowId={(row) => row.co_id}
                      initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                      }}
                      pageSizeOptions={[10, 25, 50]}
                    />
                    <JoyModal
                      open={openUpd}
                      handleClose={() => setOpenUpd(false)}
                      content={CollegianContentEditModal}
                      header={'Update Collegian'}
                      labelBtn={'Update'}
                    />
                    {/* ทำแค่ตัวนี้ก่อน */}
                  </Box>
                </TabPanel>
                <TabPanel
                  value={1}
                  sx={{ p: 2, height: 500 }}
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
