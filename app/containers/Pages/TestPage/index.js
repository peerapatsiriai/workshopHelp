import React from 'react';
import { Helmet } from 'react-helmet';
import { useTheme } from '@emotion/react';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { Box, useMediaQuery } from '@mui/material';

// import ConfirmDelModal from '../../../components/Modal/ConfirmDelModal';

function TestPage() {
  const title = brand.name + ' - Shortcut Page';
  const description = brand.desc;
  // สำหรับ Responsive
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  // สำหรับ Responsive
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
      <PapperBlock title='Shortcut Page' desc='Some text description'>
        {/* <ConfirmDelModal/> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            px: onlyLargeScreen ? 8 : onlyMediumScreen ? 8 : onlySmallScreen ? 2 : 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              background: 'red',
              height: 40,
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                background: 'blue',
                height: 40,
                width: '100%',
                flexWrap: 'wrap',
              }}
            >
              <Box
                sx={{
                  width: onlyLargeScreen ? '33.33%' : onlyMediumScreen ? '33.33%' : onlySmallScreen ? '50%' : '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'green',
                }}
              >
                s
              </Box>
              <Box
                sx={{
                  width: onlyLargeScreen ? '33.33%' : onlyMediumScreen ? '33.33%' : onlySmallScreen ? '50%' : '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'blue',
                }}
              >
                s
              </Box>
              <Box
                sx={{
                  width: onlyLargeScreen ? '33.33%' : onlyMediumScreen ? '33.33%' : onlySmallScreen ? '50%' : '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'red',
                }}
              >
                s
              </Box>
              <Box
                sx={{
                  width: onlyLargeScreen ? '33.33%' : onlyMediumScreen ? '33.33%' : onlySmallScreen ? '50%' : '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'green',
                }}
              >
                s
              </Box>
              <Box
                sx={{
                  width: onlyLargeScreen ? '33.33%' : onlyMediumScreen ? '33.33%' : onlySmallScreen ? '50%' : '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'blue',
                }}
              >
                s
              </Box>
              <Box
                sx={{
                  width: onlyLargeScreen ? '33.33%' : onlyMediumScreen ? '33.33%' : onlySmallScreen ? '50%' : '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'red',
                }}
              >
                s
              </Box>
            </Box>
          </Box>
        </Box>
      </PapperBlock>
    </div>
  );
}

export default TestPage;
