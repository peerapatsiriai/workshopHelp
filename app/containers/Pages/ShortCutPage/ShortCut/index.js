import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Shortcut(props) {
  const { icon, header, paragraph, linkPath } = props;
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <>
      <Box
        sx={{
          width: onlyLargeScreen ? '30%' : onlyMediumScreen ? '30%' : onlySmallScreen ? '45%' : '45%',
          m: 1,
          mt: 0,
          background: 'white',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 6,
          //   border: '1px solid rgba(0, 0, 0, 0)',
          '&:hover': {
            // border: '1px solid rgba(0, 0, 0, 0.3)',
            boxShadow: '3px 6px 10px rgba(0, 0, 0, 0.1)',
          },
          pt: 2,
          pl: 1,
          pr: 1,
          pb: 4,
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              p: 1.2,
              borderRadius: 4,
              background: 'lightgray',
              m: 2,
            }}
          >
            {icon}
          </Box>
        </Box>
        <Link
          to={linkPath}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: 18, mb: 2 }}>{header}</Typography>
            <Box>
              <Typography sx={{ fontSize: 12 }}>{paragraph}</Typography>
            </Box>
          </Box>
        </Link>
      </Box>
    </>
  );
}
Shortcut.propTypes = {
  icon: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
};
export default Shortcut;
