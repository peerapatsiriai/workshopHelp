import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { Box, Button, Hidden, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import {
  Input,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  FormLabel,
  selectClasses,
  Option,
  Select,
} from '@mui/joy';
import TableChartIcon from '@mui/icons-material/TableChart';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import DeleteButton from '../../../../components/Button/DeleteButton';
import JoyModal from '../../../../components/Modal/JoyModal';
import FacultyTab from './Tab/FacultyTab';

function AcademicsPage() {
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  // สำหรับ Responsive
  const title = brand.name + ' - Blank Page';
  const description = brand.desc;
  // color
  const primaryColor = '#1c1c1c';

  // FacultyTab Start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const initialStateFaculty = {
    fi_name_th: '',
    fi_name_en: '',
    ac_name_th: '',
  };
  const initialDeleteFaculty = {
    table: 'tabfaculty_institutes',
    primary: '',
  };
  const [openInsFac, setOpenInsFac] = useState(false); // สำหรับใช้ควบคุม Modal insert
  const [openUpdFac, setOpenUpdFac] = useState(false); // สำหรับใช้ควบคุม Modal update
  const [openDelFac, setOpenDelFac] = useState(false); // สำหรับใช้ควบคุม Modal Delets

  const [getRowDataFaculty, setGetRowDataFaculty] = useState([]);
  const [selectDisabledFac, setSelectDisabledFac] = useState(false);
  const [startFaculty, setStartFaculty] = useState(initialStateFaculty);
  const [deleteFaculty, setDeleteFaculty] = useState(initialDeleteFaculty);
  const ColumnsDataFaculty = [
    { field: 'fi_name_th', headerName: 'Name(TH)', width: 150 },
    { field: 'fi_name_en', headerName: 'Name(EN)', width: 150 },
    { field: 'ac_name_th', headerName: 'Academic', width: 150 },
    {
      field: 'col',
      headerName: 'Edit',
      width: 150,
      renderCell: (cellValues) => (
        <Button
          variant='text'
          onClick={() => {
            setOpenUpdFac(true);
            setStartFaculty(cellValues.row);
            setStartFaculty((per) => ({
              ...per,
              primarykey: cellValues.row.fi_id,
            }));
            setSelectDisabledFac(true);
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
            setOpenDelFac(true);
            setDeleteFaculty((per) => ({
              ...per,
              primary: cellValues.row.fi_id,
            }));
          }}
        />
      ),
      // renderCell ใช้สำหรับสร้างปุ่มภายในตาราง
    },
  ];

  useEffect(() => {
    axios
      .get(
        'http://192.168.1.168:8000/api/method/frappe.help-api.getAllfacultys'
      )
      .then((res) => {
        setGetRowDataFaculty(res.data.message.Data);
        console.log(res.data.message.Data);
      });
  }, []);

  useEffect(() => {
    console.log(startFaculty);
  }, [startFaculty]);

  const ContentInsertFaculty = (
    <Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
        <Box sx={{ flexDirection: 'column', width: '50%', ml: 2 }}>
          <FormLabel
            sx={(themes) => ({
              '--FormLabel-color': themes.vars.palette.primary.plainColor,
              mb: 0.5,
            })}>
            Academic Name
          </FormLabel>
          <Input
            label='Academic Name'
            placeholder='Thai Name'
            size='sm'
            value={startFaculty.fi_name_th || ''}
            onChange={(event) => {
              setStartFaculty((pre) => ({
                ...pre,
                fi_name_th: event.target.value,
              }));
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
            placeholder='Engligsh Name'
            size='sm'
            value={startFaculty.fi_name_en || ''}
            onChange={(event) => {
              setStartFaculty((pre) => ({
                ...pre,
                fi_name_en: event.target.value,
              }));
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
        <FormLabel
          sx={(themes) => ({
            '--FormLabel-color': themes.vars.palette.primary.plainColor,
            mb: 0.5,
          })}>
          Academic
        </FormLabel>
        <Select
          placeholder='เทคโนโลยีราชมงคลล้านนา'
          indicator={<KeyboardArrowDown />}
          value={startFaculty.academics_ac_id || ''}
          onChange={(event, value) => {
            setStartFaculty((pre) => ({ ...pre, academics_ac_id: value }));
          }}
          disabled={selectDisabledFac}
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
          {getRowDataFaculty?.map((contentFac, value) => (
            <Option key={value} value={contentFac.academics_ac_id}>
              {contentFac.ac_name_th}
            </Option>
          ))}
        </Select>
      </Box>
    </Box>
  );

  const handleInsertFacultySubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://192.168.1.168:8000/api/method/frappe.help-api.insertfaculty',
        startFaculty
      )
      .then((res) => {
        console.log(res);
        setOpenInsFac(false);
        const newStateFaculty = {
          academics_ac_id: res.data.message.Primarykey,
          ...startFaculty,
        };
        setGetRowDataFaculty((pre) => [newStateFaculty, ...pre]);
        setStartFaculty(initialStateFaculty);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hendleEditFacultySubmit = () => {
    axios
      .post(
        'http://192.168.1.168:8000/api/method/frappe.help-api.editfaculty',
        startFaculty
      )
      .then((res) => {
        console.log(res);
        setOpenUpdFac(false);
        const ObjectToUpDateFaculty = getRowDataFaculty.find(
          (obj) => obj.fi_id === startFaculty.fi_id
        );

        // แก้ไขค่า ในออบเจ็กต์
        if (ObjectToUpDateFaculty) {
          ObjectToUpDateFaculty.fi_name_th = startFaculty.fi_name_th;
          ObjectToUpDateFaculty.fi_name_en = startFaculty.fi_name_en;
          ObjectToUpDateFaculty.ac_name_th = startFaculty.ac_name_th;
        }
        setStartFaculty(initialStateFaculty);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteFacultySubmit = () => {
    axios
      .post(
        'http://192.168.1.168:8000/api/method/frappe.help-api.delete',
        deleteFaculty
      )
      .then((res) => {
        console.log(res);
        console.log('DeleteFaculty: ', deleteFaculty);
        setOpenDelFac(false);
        // ลบค่า ในออบเจ็กต์
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        const idToDeleteFac = deleteFaculty.primary;
        console.log('idToDelete: ', idToDeleteFac);
        const ObjectToDelte = getRowDataFaculty.filter(
          (obj) => obj.fi_id !== idToDeleteFac
        );
        console.log('ObjectToDelte: ', ObjectToDelte);
        setGetRowDataFaculty(ObjectToDelte);
      });
  };

  const handleClose = () => {
    setStartFaculty(initialStateFaculty);
  };

  // FacultyTab end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
      </Helmet>
      <PapperBlock title='Table Group' desc=''>
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
              flexDirection: onlyLargeScreen
                ? 'row'
                : onlyMediumScreen
                ? 'row'
                : onlySmallScreen
                ? 'column'
                : 'column',
              width: '100%',
            }}>
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
                width: onlyLargeScreen
                  ? '25%'
                  : onlyMediumScreen
                  ? '25%'
                  : onlySmallScreen
                  ? '100%'
                  : '100%',
                textAlign: onlyLargeScreen
                  ? 'left'
                  : onlyMediumScreen
                  ? 'left'
                  : onlySmallScreen
                  ? 'center'
                  : 'center',
              }}>
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
                  textAlign: onlyLargeScreen
                    ? 'left'
                    : onlyMediumScreen
                    ? 'left'
                    : onlySmallScreen
                    ? 'left'
                    : 'left',
                }}>
                <Box
                  sx={{
                    ml: onlyLargeScreen
                      ? 0
                      : onlyMediumScreen
                      ? 0
                      : onlySmallScreen
                      ? 2
                      : 2,
                    display: 'flex',
                    justifyContent: 'right',
                    width: onlyLargeScreen
                      ? '30%'
                      : onlyMediumScreen
                      ? '30%'
                      : onlySmallScreen
                      ? '10%'
                      : '10%',
                  }}>
                  <Box
                    sx={{
                      ml: 3,
                      mt: 3.5,
                      mb: onlyLargeScreen
                        ? 3
                        : onlyMediumScreen
                        ? 3
                        : onlySmallScreen
                        ? 0
                        : 0,
                      p: 1.5,
                      width: 45,
                      height: 45,
                      borderRadius: 4,
                      background: 'gray',
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <SchoolIcon style={{ color: 'white' }} fontSize={'large'} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    m: 2,
                    mt: 2,
                  }}>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Academics
                  </Typography>
                  <Typography
                    style={{
                      lineHeight: '11px',
                      color: 'white',
                      opacity: '60%',
                    }}
                    sx={{ fontSize: 12, mt: 0.5 }}>
                    Last updated
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'white',
                      opacity: '60%',
                      mt: 0.5,
                    }}>
                    on March 13th,2023
                  </Typography>
                </Box>
                <Hidden mdUp>
                  <Box
                    sx={{
                      ml: 3,
                      mt: 1,
                      mb: onlyLargeScreen
                        ? 3
                        : onlyMediumScreen
                        ? 3
                        : onlySmallScreen
                        ? 0
                        : 0,
                      p: 2.5,
                      pl: 0,
                    }}>
                    <Typography
                      sx={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>
                      4 Tables
                    </Typography>
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
                  }}>
                  <Box
                    sx={{
                      ml: 3,
                    }}>
                    <Typography
                      sx={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>
                      4 Tables
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, color: 'white', opacity: '60%' }}>
                      XX records
                    </Typography>
                  </Box>
                </Box>
              </Hidden>
            </Box>
            <Hidden mdDown>
              <Box
                sx={{
                  display: 'flex',
                  width: onlyLargeScreen
                    ? '75%'
                    : onlyMediumScreen
                    ? '75%'
                    : onlySmallScreen
                    ? '100%'
                    : '100%',
                  background: primaryColor,
                  p: 2,
                  textAlign: 'left',
                  borderTopRightRadius: 20,
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    mt: 12,
                    pl: 4,
                  }}>
                  <TableChartIcon sx={{ fontSize: 42, color: 'white' }} />
                  <Typography
                    sx={{
                      // fontWeight: 'bold',
                      color: 'white',
                      fontSize: 28,
                      m: 0.5,
                      ml: 1.5,
                    }}>
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
            }}>
            <Box sx={{ width: '100%' }}>
              <Tabs aria-label='Basic tabs' defaultValue={0}>
                <TabList
                  sx={{
                    pl: onlyLargeScreen
                      ? '30%'
                      : onlyMediumScreen
                      ? '30%'
                      : onlySmallScreen
                      ? '0%'
                      : '0%',
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    background: primaryColor,
                    px: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}>
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'gray',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}>
                    Academics
                  </Tab>
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'gray',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}>
                    Academic Type
                  </Tab>
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'gray',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}>
                    Faculty
                  </Tab>
                  <Tab
                    sx={{
                      borderRadius: 0,
                      borderStartStartRadius: 20,
                      color: 'gray',
                      borderBottom: 2,
                      borderColor: 'gray',
                    }}>
                    Departments
                  </Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 2 }}>
                  AcademicsTab
                </TabPanel>
                <TabPanel value={1} sx={{ p: 2 }}>
                  <b>Academic Type</b> tab panel
                </TabPanel>
                <TabPanel value={2} sx={{ p: 2 }}>
                  <FacultyTab
                    setStart={setStartFaculty}
                    ContentModal={ContentInsertFaculty}
                    setOpenUpd={setOpenUpdFac}
                    openUpd={openUpdFac}
                    setOpenIns={setOpenInsFac}
                    rows={getRowDataFaculty}
                    columns={ColumnsDataFaculty}
                    handleUpdate={hendleEditFacultySubmit}
                    handleCloseUpd={handleClose}
                    setSelectDisabledFac={setSelectDisabledFac}
                    openDelFac={openDelFac}
                    setOpenDelFac={setOpenDelFac}
                    handleDelete={handleDeleteFacultySubmit}
                  />
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
          open={openInsFac}
          handleClose={() => {
            setOpenInsFac(false);
            setStartFaculty(initialStateFaculty);
          }}
          content={ContentInsertFaculty}
          header={'Add New Institute'}
          labelBtn={'Insert'}
          handleSubmit={handleInsertFacultySubmit}
          subDetail={true}
        />
      </PapperBlock>
    </div>
  );
}

export default AcademicsPage;
