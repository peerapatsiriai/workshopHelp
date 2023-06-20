import React from 'react';
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
  Input,
  Tab,
  TabList,
  TabPanel,
  Tabs
} from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import DataTable from '../../../components/Tables/DataTable';
import InputJoy from '../../../components/Input/InputJoy';
import JoyModal from '../../../components/Modal/JoyModal';

function HelpHome() {
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
  // dummy
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
    {
      field: 'col3',
      headerName:
      'Edit',
      width: 150,
      renderCell: () => <Button variant="text" onClick={() => setOpenUpd(true)}>...</Button>
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];
  // dummy
  const testContentModal = (<InputJoy label={'test'} placeholder={'check'}/>); // dummy ลองเอาไปใส่ Modal

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
        {onlyLargeScreen ? 'LargeScreen ' : onlyMediumScreen ? 'MediumScreen ' : onlySmallScreen ? 'SmallScreen' : 'xs'}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: 'red'
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: onlyLargeScreen ? 'row' : onlyMediumScreen ? 'row' : onlySmallScreen ? 'column' : 'column',
              width: '100%',
              background: 'blue'
            }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: onlyLargeScreen ? '30%' : onlyMediumScreen ? '30%' : onlySmallScreen ? '100%' : '100%',
              background: 'black',
              textAlign: onlyLargeScreen ? 'left' : onlyMediumScreen ? 'left' : onlySmallScreen ? 'center' : 'center',
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '50%',
                width: '100%',
                background: 'red',
                justifyContent: onlyLargeScreen ? 'left' : onlyMediumScreen ? 'left' : onlySmallScreen ? 'center' : 'center',
                textAlign: onlyLargeScreen ? 'left' : onlyMediumScreen ? 'left' : onlySmallScreen ? 'center' : 'center'
              }}>
                <Typography sx={{ p: 4 }}>ICON</Typography>
                <Box sx={{ p: 1, m: 2 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>Table name</Typography>
                  <Typography style={{ lineHeight: '10px' }} sx={{ fontSize: 12 }}>last updated</Typography>
                  <Typography sx={{ fontSize: 12 }} >on March 13th,2023</Typography>
                </Box>
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '50%',
                p: 2,
              }}>
                <Box>
                  <Typography sx={{ fontWeight: 'bold' }}>COUNT TABLE</Typography>
                  <Typography sx={{ fontSize: '14px' }}>COUNT ALL RECORDS</Typography>
                </Box>
              </Box>
            </Box>
            <Hidden mdDown>
              <Box sx={{
                display: 'flex',
                width: onlyLargeScreen ? '70%' : onlyMediumScreen ? '70%' : onlySmallScreen ? '100%' : '100%',
                background: 'green',
                p: 2,
                textAlign: 'left'
              }}>
                <Typography m={6} >ICON DATAMANAGEMENT</Typography>
              </Box>
            </Hidden>
          </Box>
          <Box sx={{
            display: 'flex',
            width: '100%',
            background: 'blue',
          }}>
            <Box sx={{ width: '100%' }}>
              <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ borderRadius: 'lg' }}>
                <TabList sx={{
                  pl: onlyLargeScreen ? '30%' : onlyMediumScreen ? '30%' : onlySmallScreen ? '0%' : '0%',
                }}>
                  <Tab>Academics</Tab>
                  <Tab>Academic Type</Tab>
                  <Tab>Faculty</Tab>
                  <Tab>Departments</Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 2, height: 500 }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: onlyLargeScreen ? 'space-between' : onlyMediumScreen ? 'space-between' : onlySmallScreen ? 'center' : 'center',
                    width: '100%',
                    p: 2,
                  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Button onClick={() => setOpenIns(true)} sx={{
                        px: 2,
                        background: 'black',
                        color: 'white',
                        borderRadius: 5
                      }}>+ INSERT</Button>
                      <Input startDecorator={<SearchIcon sx={{ color: 'text.tertiary' }} />}
                        placeholder="Search"
                        size="sm"
                        sx={{
                          ml: 2,
                          border: 1,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    {/* ทำแค่ตัวนี้ก่อน */}
                    <DataTable
                      rows={rows}
                      columns={columns}
                      open={openUpd}
                      handleClose={() => setOpenUpd(false)}
                      modalContent={testContentModal} // สามารถใส่เข้ามาเป็น UI ได้เลย
                      modalHeader={'ทดสอบ Update Form'}
                    />
                    {/* ทำแค่ตัวนี้ก่อน */}
                  </Box>
                </TabPanel>
                <TabPanel value={1} sx={{ p: 2, height: 500 }}>
                  <b>Academic Type</b> tab panel
                </TabPanel>
                <TabPanel value={2} sx={{ p: 2, height: 500 }}>
                  <b>Faculty</b> tab panel
                </TabPanel>
                <TabPanel value={3} sx={{ p: 2, height: 500 }}>
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
        />
      </PapperBlock>
    </div>
  );
}

export default HelpHome;
