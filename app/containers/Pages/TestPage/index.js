import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { Box, Button, Typography } from '@mui/material';
import { Input } from '@mui/joy';

// ก่อนจะใช้หน้านี้ให้ไปทำ pagelistasync กับไฟล์  route (containers->App->Application) ของไฟล์นี้ก่อน

function TestPage() {
  const title = brand.name + ' - Test Page';
  const description = brand.desc;
  // สำหรับใช้เก็บค่า Validation
  const [validation, setValidation] = useState({
    input1: false, // false คือปกติ true คือแสดงเป็นสีแดง
  });

  // สำหรับใช้เก็บค่า input
  const [state, setState] = useState({
    input1: '',
  });

  const onSubmit = () => {
    if (state.input1 !== '') {
      // ถ้ากรอกถูกต้องครบหมดจะทำอะไรให้ทำตรงนี้
      console.log('Submit!');
    } else {
      // ทำให้แสดงสีแดงตรงที่ไม่ได้กรอกข้อความ
      setValidation((pre) => ({ ...pre, input1: true }));
    }
  };

  useEffect(() => {
    console.log(state.input1);
  }, [state.input1]);

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
        <Box>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5 }}>{'First Name**'}</Typography>
          </Box>
          <Input
            // false คือปกติ true คือแสดงสีแดง
            error={validation.input1 || false}
            onChange={(event) => setState((pre) => ({ ...pre, input1: event.target.value }))}
            value={state.input1}
            // ถ้าไม่ได้กรอกจะแสดงคำว่า กรุณากรอกชื่อ ถ้ากรอกจะไม่แสดงอะไร
            placeholder={validation.input1 ? 'กรุณากรอกชื่อ' : ''}
            type={'text'}
            size='sm'
            slotProps={{
              input: {
                // สำหรับกำหนดค่า min max ที่ inputจะสามารถรับได้
                minLength: 0,
                maxLength: 10,
              },
            }}
            sx={{
              ml: 2,
              border: 1,
              width: 350,
            }}
          />
          <Button onClick={onSubmit}>Click</Button>
        </Box>
      </PapperBlock>
    </div>
  );
}

export default TestPage;
