import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { ArrowDown2 } from 'iconsax-react';
import { useIntl } from 'react-intl';

const TableData = ({ data, loading, columns }) => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const intl = useIntl();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Paper>
      <Box display='flex' justifyContent='flex-end' alignItems='center'>
        <Typography>
          {intl.formatMessage({
            id: 'spider.data_table.number_of_lines_displayed',
          })}
        </Typography>
        <FormControl>
          <Select
            labelId='rows-per-page-label'
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            disableUnderline
            IconComponent={ArrowDown2}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex}>{row[column.field]}</TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align='center'>
                  {intl.formatMessage({
                    id: 'spider.data_table.no_data_available',
                  })}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(data.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        shape='rounded'
      />
    </Paper>
  );
};

export default TableData;
