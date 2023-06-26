import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { Box, Hidden, Typography, useMediaQuery } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useTheme } from '@emotion/react';
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import CollegianTab from './Tabs/CollegianTab';
import InstructorTab from './Tabs/InstructorTab';

function PersonelsPage() {
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // สำหรับ Responsive
  const title = brand.name + ' - Blank Page';
  const description = brand.desc;

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
                  <CollegianTab />
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
      </PapperBlock>
    </div>
  );
}

export default PersonelsPage;
