import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import {
  Box,
  Button,
  Hidden,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@emotion/react';
import {
  // Input,
  Tab,
  TabList,
  TabPanel,
  Tabs
} from '@mui/joy';
import TableChartIcon from '@mui/icons-material/TableChart';
import SchoolIcon from '@mui/icons-material/School';
// import SearchIcon from '@mui/icons-material/Search';
import DataTable from '../../../../components/Tables/DataTable';
import InputJoy from '../../../../components/Input/InputJoy';
import JoyModal from '../../../../components/Modal/JoyModal';

function AcademicsPage() {
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
  const [state, setState] = React.useState([]);
  // dummy
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'Hello', col2: 'World' },
    { id: 5, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 6, col1: 'MUI', col2: 'is Amazing' },
    { id: 7, col1: 'Hello', col2: 'World' },
    { id: 8, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 9, col1: 'MUI', col2: 'is Amazing' },
    { id: 10, col1: 'Hello', col2: 'World' },
    { id: 11, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 12, col1: 'MUI', col2: 'is Amazing' },
    { id: 13, col1: 'Hello', col2: 'World' },
    { id: 14, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 15, col1: 'MUI', col2: 'is Amazing' },
  ];
  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
    {
      field: 'col3',
      headerName:
      'Edit',
      width: 150,
      // renderCell: (cellValues) => <Button variant="text" onClick={() => setOpenUpd(true)}>...</Button>
      renderCell: (cellValues) => <Button variant="text" onClick={() => console.log(cellValues.row)}>...</Button>
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];
  // dummy
  const testContentModal = (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <InputJoy label={'test1'} placeholder={'test1'} type={'text'} size={'sm'}/>
        <InputJoy label={''} placeholder={'test1'} type={'text'} size={'sm'}/>
      </Box>
      <InputJoy label={'test2'} placeholder={'test2'} type={'number'} size={'md'}/>
      <InputJoy label={'test3'} placeholder={'test3'} type={'password'} size={'lg'}/>

    </Box>

  ); // dummy ลองเอาไปใส่ Modal
  // color
  const primaryColor = '#1c1c1c';

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Table Group" desc='' >
        {/* {onlyLargeScreen ? 'LargeScreen ' : onlyMediumScreen ? 'MediumScreen ' : onlySmallScreen ? 'SmallScreen' : 'xs'} */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: onlyLargeScreen ? 'row' : onlyMediumScreen ? 'row' : onlySmallScreen ? 'column' : 'column',
              width: '100%',
            }}>
            <Box sx={{
              display: 'flex',
              flexDirection: onlyLargeScreen ? 'column' : onlyMediumScreen ? 'column' : onlySmallScreen ? 'row' : 'row',
              width: onlyLargeScreen ? '25%' : onlyMediumScreen ? '25%' : onlySmallScreen ? '100%' : '100%',
              textAlign: onlyLargeScreen ? 'left' : onlyMediumScreen ? 'left' : onlySmallScreen ? 'center' : 'center',
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '50%',
                width: '100%',
                background: primaryColor,
                borderTopLeftRadius: 20,
                justifyContent: onlyLargeScreen ? 'left' : onlyMediumScreen ? 'left' : onlySmallScreen ? 'left' : 'left',
                textAlign: onlyLargeScreen ? 'left' : onlyMediumScreen ? 'left' : onlySmallScreen ? 'left' : 'left'
              }}>
                <Box sx={{
                  ml: onlyLargeScreen ? 0 : onlyMediumScreen ? 0 : onlySmallScreen ? 2 : 2,
                  display: 'flex',
                  justifyContent: 'right',
                  width: onlyLargeScreen ? '30%' : onlyMediumScreen ? '30%' : onlySmallScreen ? '10%' : '10%',
                }}>
                  <Box sx={{
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
                  }}>
                    <SchoolIcon style={{ color: 'white' }} fontSize={'large'}/>
                  </Box>
                </Box>
                <Box sx={{
                  p: 1,
                  m: 2,
                  mt: 2,
                }}>
                  <Typography sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    Academics
                  </Typography>
                  <Typography style={{
                    lineHeight: '11px',
                    color: 'white',
                    opacity: '60%',
                  }} sx={{ fontSize: 12, mt: 0.5 }}>
                    Last updated
                  </Typography>
                  <Typography sx={{
                    fontSize: 12,
                    color: 'white',
                    opacity: '60%',
                    mt: 0.5,
                  }} >on March 13th,2023</Typography>
                </Box>
                <Hidden mdUp>
                  <Box sx={{
                    ml: 3,
                    mt: 1,
                    mb: onlyLargeScreen ? 3 : onlyMediumScreen ? 3 : onlySmallScreen ? 0 : 0,
                    p: 2.5,
                    pl: 0,
                  }}>
                    <Typography sx={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>4 Tables</Typography>
                  </Box>
                </Hidden>
              </Box>
              <Hidden mdDown>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '50%',
                  p: 2,
                  background: primaryColor
                }}>
                  <Box sx={{
                    ml: 3,
                  }}>
                    <Typography sx={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>4 Tables</Typography>
                    <Typography sx={{ fontSize: 14, color: 'white', opacity: '60%' }}>XX records</Typography>
                  </Box>
                </Box>
              </Hidden>
            </Box>
            <Hidden mdDown>
              <Box sx={{
                display: 'flex',
                width: onlyLargeScreen ? '75%' : onlyMediumScreen ? '75%' : onlySmallScreen ? '100%' : '100%',
                background: primaryColor,
                p: 2,
                textAlign: 'left',
                borderTopRightRadius: 20,
              }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  mt: 12,
                  pl: 4
                }}>
                  <TableChartIcon sx={{ fontSize: 42, color: 'white' }}/>
                  <Typography sx={{
                    // fontWeight: 'bold',
                    color: 'white',
                    fontSize: 28,
                    m: 0.5,
                    ml: 1.5
                  }}>
                    Data Management
                  </Typography>
                </Box>
              </Box>
            </Hidden>
          </Box>
          <Box sx={{
            display: 'flex',
            width: '100%',
          }}>
            <Box sx={{ width: '100%' }}>
              <Tabs aria-label="Basic tabs" defaultValue={0}>
                <TabList sx={{
                  pl: onlyLargeScreen ? '30%' : onlyMediumScreen ? '30%' : onlySmallScreen ? '0%' : '0%',
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  background: primaryColor,
                  px: 2,
                  display: 'flex',
                  flexWrap: 'wrap'
                }}>
                  <Tab sx={{
                    borderRadius: 0,
                    borderStartStartRadius: 20,
                    color: 'gray',
                    borderBottom: 2,
                    borderColor: 'gray'
                  }}>
                    Academics
                  </Tab>
                  <Tab sx={{
                    borderRadius: 0,
                    borderStartStartRadius: 20,
                    color: 'gray',
                    borderBottom: 2,
                    borderColor: 'gray'
                  }}>
                  Academic Type</Tab>
                  <Tab sx={{
                    borderRadius: 0,
                    borderStartStartRadius: 20,
                    color: 'gray',
                    borderBottom: 2,
                    borderColor: 'gray'
                  }}>
                    Faculty</Tab>
                  <Tab sx={{
                    borderRadius: 0,
                    borderStartStartRadius: 20,
                    color: 'gray',
                    borderBottom: 2,
                    borderColor: 'gray'
                  }}>
                    Departments</Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: onlyLargeScreen ? 'space-between' : onlyMediumScreen ? 'space-between' : onlySmallScreen ? 'center' : 'center',
                    width: '100%',
                    p: 2,
                  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Button
                        onClick={() => setOpenIns(true)}
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
                        <Typography sx={{
                          fontSize: 12,
                          textTransform: 'capitalize',
                          fontWeight: 'bold',
                        }}>
                            + Add Academic
                        </Typography>
                      </Button>
                      <Button sx={{ ml: 2 }}>
                        <Typography sx={{
                          fontSize: 12,
                          textTransform: 'capitalize',
                          fontWeight: 'bold',
                        }}>
                            Export
                        </Typography></Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    {/* ทำแค่ตัวนี้ก่อน */}
                    <DataTable
                      rows={rows}
                      columns={columns}
                      open={openUpd}
                      handleClose={() => setOpenUpd(false)}
                      modalContent={testContentModal} // สามารถใส่เข้ามาเป็น UI ได้เลย
                      modalHeader={'ทดสอบ Update Form'}
                      stateUpdate={setState}
                    />
                    {/* ทำแค่ตัวนี้ก่อน */}
                  </Box>
                </TabPanel>
                <TabPanel value={1} sx={{ p: 2 }}>
                  <b>Academic Type</b> tab panel
                </TabPanel>
                <TabPanel value={2} sx={{ p: 2 }}>
                  <b>Faculty</b> tab panel
                </TabPanel>
                <TabPanel value={3} sx={{ p: 2 }}>
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
          content={'testinsert'}
          header={'ทดสอบ Insert Form'}
          labelBtn={'Insert'}
          subDetail={false}
        />
      </PapperBlock>
    </div>
  );
}

export default AcademicsPage;
