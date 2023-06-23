import React from 'react';
import { Box, Hidden, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Link } from 'react-router-dom';

function Menulight(props) {
  const { menuIcon, name, countTable, countRecord, linkPath } = props;
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const headerFontSize = onlyLargeScreen ? 18 : onlyMediumScreen ? 16 : onlySmallScreen ? 14 : 14;
  const bodyFontSize = onlyLargeScreen ? 12 : onlyMediumScreen ? 10 : onlySmallScreen ? 10 : 10;
  const countTableFontSize = onlyLargeScreen ? 22 : onlyMediumScreen ? 20 : onlySmallScreen ? 26 : 26;
  const countRecordFontSize = onlyLargeScreen ? 16 : onlyMediumScreen ? 14 : onlySmallScreen ? 18 : 18;

  return (
    <Box
      sx={{
        m: 2,
        width: onlyLargeScreen ? '26%' : onlyMediumScreen ? '26%' : onlySmallScreen ? '50%' : '100%',
        height: 180,
        background: '#1c1c1c',
        borderRadius: 8,
        px: onlyLargeScreen ? 0 : onlyMediumScreen ? 0 : onlySmallScreen ? 2 : 6,
        mx: onlyLargeScreen ? 4 : onlyMediumScreen ? 4 : onlySmallScreen ? 4 : 4,
        '&:hover': {
          // border: '1px solid rgba(0, 0, 0, 0.3)',
          boxShadow: '3px 6px 10px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Link
        to={linkPath}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <Box sx={{ width: '100%', height: '50%' }}>
          <Box sx={{ m: 2, ml: 0.5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box sx={{ mt: 0.5, ml: 2, mr: 1, width: 50, background: 'gray', borderRadius: 2.5 }}>
                <Box sx={{ m: 1.5 }}>{menuIcon}</Box>
              </Box>
              <Box sx={{ ml: 1, textAlign: 'start', mx: 1 }}>
                <Typography
                  sx={{
                    fontSize: headerFontSize,
                    color: 'white',
                  }}
                >
                  {name}
                </Typography>
                <Typography sx={{ fontSize: bodyFontSize, lineHeight: 1, color: 'gray' }}>Last updated</Typography>
                <Typography sx={{ fontSize: bodyFontSize, lineHeight: 1.5, color: 'gray' }}>
                  on March 13th, 2023
                </Typography>
              </Box>
            </Box>
            <Hidden mdDown>
              <Box sx={{ mt: 1 }}>
                <ArrowForwardIosRoundedIcon sx={{ color: 'white' }} />
              </Box>
            </Hidden>
          </Box>
        </Box>
        <Box sx={{ width: '100%', height: '50%' }}>
          <Box
            sx={{
              m: 4,
              mt: -1,
              display: 'flex',
              flexDirection: 'column',
              textAlign: onlyLargeScreen ? 'start' : onlyMediumScreen ? 'start' : onlySmallScreen ? 'center' : 'center',
            }}
          >
            <Typography sx={{ fontSize: countTableFontSize, fontWeight: 'bold', color: 'white' }}>
              {countTable} Tables
            </Typography>
            <Typography sx={{ fontSize: countRecordFontSize, lineHeight: 1.5, color: 'gray' }}>
              {countRecord} record
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}
Menulight.propTypes = {
  menuIcon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  countTable: PropTypes.number.isRequired,
  countRecord: PropTypes.number.isRequired,
  linkPath: PropTypes.string.isRequired,
};

export default Menulight;
