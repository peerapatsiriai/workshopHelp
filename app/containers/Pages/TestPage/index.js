import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import DeleteButton from '../../../components/Button/DeleteButton';

// import ConfirmDelModal from '../../../components/Modal/ConfirmDelModal';

function TestPage() {
  const title = brand.name + ' - Shortcut Page';
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
        title='Shortcut Page'
        desc='Some text description'
      >
        {/* <ConfirmDelModal/> */}
        <DeleteButton />
      </PapperBlock>
    </div>
  );
}

export default TestPage;
