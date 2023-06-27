import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { Box } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import Menulight from './MenuShortcut/Menulight';
import Menudark from './MenuShortcut/Menudark';

function MasterDataPage() {
  const title = brand.name + ' - MasterData Page';
  const description = brand.desc;
  const AcademicIcon = <SchoolRoundedIcon sx={{ fontSize: 24 }} />;
  const CurriculumIcon = <AccountBalanceRoundedIcon sx={{ fontSize: 24 }} />;
  const PersonnelIcon = <PeopleOutlineRoundedIcon sx={{ fontSize: 24 }} />;
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
        title='MasterData Page'
        desc='Some text description'
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Menudark
            linkPath={'/back-office/masterdata/academics'}
            menuIcon={AcademicIcon}
            name={'Academics'}
            countTable={4}
            countRecord={295}
          />
          <Menulight
            linkPath={'/back-office/masterdata/curriculums'}
            menuIcon={CurriculumIcon}
            name={'Curriculums'}
            countTable={5}
            countRecord={5821}
          />
          <Menulight
            linkPath={'/back-office/masterdata/personels'}
            menuIcon={PersonnelIcon}
            name={'Personnels'}
            countTable={2}
            countRecord={12842}
          />
        </Box>
      </PapperBlock>
    </div>
  );
}

export default MasterDataPage;
