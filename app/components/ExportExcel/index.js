import { Tooltip, Typography, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';

import React from 'react';

function ExportExcel({ excelData, fileName, tableName }) {
  // เอา excelData และ fileName เป็นพารามิตเตอร์
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'; // ระบุประเภทของไฟล์
  const fileExtension = '.xlsx'; // กำหนดนามสกุลไฟล์

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData); // ใช้สร้างตัว Sheet ในไฟล์ Excel จากข้อมูลมี่ได้รับมา
    const wb = XLSX.utils.book_new(); // ทำการสร้าง Workbook
    // workbook คือ คอนเทนเนอร์ที่ใช้สร้างสำหรับ Excel จะประกอบไปด้วย Sheet เรียงกันเป็นตาราง
    XLSX.utils.book_append_sheet(wb, ws, 'data'); // ทำการสร้าง Sheet ใว้ใน workbook
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }); // ทำการแปลงไฟล์ workbook เป็นไฟล์ Excel
    const data = new Blob([excelBuffer], { type: fileType }); // ทำการสร้าง Blob object เพื่อเก็บเป็นไฟล์ Excel
    // Blob object คือ เป็นออบเจ็กต์ที่ใช้สำหรับเก็บข้อมูล ในการสร้างไฟล์หรือบันทึกข้อมูลที่มีรูปแบบเฉพาะ เช่น ไฟล์รูปภาพ ไฟล์เสียง หรือไฟล์เอกสารเป็นต้น
    // โดยกำหนดให้ไฟล์เป็น fileType
    FileSaver.saveAs(data, fileName + fileExtension); // ทำการ Dowlond ไฟล์ Excel โดยใช้ชื่อที่กำหนด
  };

  return (
    <Tooltip title='Excel Export'>
      <Typography
        variant='body2'
        color={'blue'}
        sx={{ mr: -1 }}
      >
        {tableName}{' '}
        <IconButton onClick={exportToExcel}>
          <DownloadIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Typography>
    </Tooltip>
  );
}
ExportExcel.propTypes = {
  excelData: PropTypes.any,
  fileName: PropTypes.string,
  tableName: PropTypes.string,
};

export default ExportExcel;
