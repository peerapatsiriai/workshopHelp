import * as React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import JoyModal from '../Modal/JoyModal';

function DataTable(props) {
  const {
    rows,
    columns,
    open,
    handleClose,
    modalContent,
    modalHeader,
  } = props;

  // const [open, setOpen] = React.useState(false);
  // sample rows
  // const rows = [
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  //   { id: 3, col1: 'MUI', col2: 'is Amazing' },
  // ];
  // sample columns
  // const columns = [
  //   { field: 'col1', headerName: 'Column 1', width: 150 },
  //   { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
      <JoyModal
        open={open}
        handleClose={handleClose}
        content={modalContent}
        header={modalHeader}
        labelBtn={'Update'}
        subDetail={true}
      />
    </Box>
  );
}
DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.any.isRequired,
  modalContent: PropTypes.node.isRequired,
  modalHeader: PropTypes.string.isRequired,
};

export default DataTable;
