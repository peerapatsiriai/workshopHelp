import React from 'react';
import { Helmet } from 'react-helmet';
import { useTheme } from '@emotion/react';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import Shortcut from './ShortCut';

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
  const icon1 = (
    <PieChartIcon
      sx={{
        fontSize: 28,
        color: 'black',
        opacity: '60%',
      }}
    />
  );
  const icon2 = (
    <EventNoteIcon
      sx={{
        fontSize: 28,
        color: 'black',
        opacity: '60%',
      }}
    />
  );
  const icon3 = (
    <PeopleAltOutlinedIcon
      sx={{
        fontSize: 28,
        color: 'black',
        opacity: '60%',
      }}
    />
  );
  const icon4 = (
    <BusinessOutlinedIcon
      sx={{
        fontSize: 28,
        color: 'black',
        opacity: '60%',
      }}
    />
  );
  const icon5 = (
    <DescriptionOutlinedIcon
      sx={{
        fontSize: 28,
        color: 'black',
        opacity: '60%',
      }}
    />
  );
  const icon6 = (
    <MoreHorizOutlinedIcon
      sx={{
        fontSize: 28,
        color: 'black',
        opacity: '60%',
      }}
    />
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
        title='Shortcut Page'
        desc='Some text description'
      >
        {/* <ConfirmDelModal/> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '150vh',
            px: onlyLargeScreen ? 3 : onlyMediumScreen ? 3 : onlySmallScreen ? 0 : 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: 50,
              justifyContent: 'space-between',
              flexDirection: 'row',
              mb: 1,
            }}
          >
            <Box
              sx={{
                width: '100%',
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  width: 120,
                  position: 'absolute',
                  top: 0,
                  left: '55%',
                  right: '50%',
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Main menu
              </Typography>
            </Box>
            <Box
              sx={{
                width: '30%',
                display: 'flex',
                height: 50,
                justifyContent: 'end',
                flexDirection: 'row',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 40,
                  background: 'lightgray',
                  borderRadius: 2,
                  m: 0.5,
                  textAlign: 'center',
                }}
              >
                {' '}
                <IconButton>
                  <ViewModuleRoundedIcon sx={{ color: 'black', fontSize: 22 }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  width: 50,
                  height: 40,
                  background: 'lightgray',
                  borderRadius: 2,
                  m: 0.5,
                  textAlign: 'center',
                }}
              >
                <IconButton>
                  <ViewListRoundedIcon sx={{ color: 'black', fontSize: 22 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: 40,
                width: '100%',
                flexWrap: 'wrap',
              }}
            >
              <Shortcut
                linkPath='/back-office/academics'
                icon={icon1}
                header={'Master Data'}
                paragraph={'Describe what this feature does, and how it benefits your customers.'}
              />
              <Shortcut
                linkPath='/back-office'
                icon={icon2}
                header={'Study Plan'}
                paragraph={'Describe what this feature does, and how it benefits your customers.'}
              />
              <Shortcut
                linkPath='/back-office'
                icon={icon3}
                header={'Users'}
                paragraph={'Describe what this feature does, and how it benefits your customers.'}
              />
              <Shortcut
                linkPath='/back-office'
                icon={icon4}
                header={'Co-operation'}
                paragraph={'Describe what this feature does, and how it benefits your customers.'}
              />
              <Shortcut
                linkPath='/back-office'
                icon={icon5}
                header={'Overview'}
                paragraph={'Describe what this feature does, and how it benefits your customers.'}
              />
              <Shortcut
                linkPath='/back-office'
                icon={icon6}
                header={'Etc'}
                paragraph={'Describe what this feature does, and how it benefits your customers.'}
              />
            </Box>
          </Box>
        </Box>
      </PapperBlock>
    </div>
  );
}

export default TestPage;
