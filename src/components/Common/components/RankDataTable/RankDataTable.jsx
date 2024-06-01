import React from 'react';
import MUIDataTable from 'mui-datatables';
import { useIntl } from 'react-intl';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        paper: {
          borderRadius: 3,
          boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)',
        },
        responsiveScroll: {
          maxHeight: 'none !important',
        },
      },
      MUIDataTableHeadCell: {
        fixedHeader: {
          fontSize: 13,
          textTransform: 'uppercase',
          backgroundColor: '#103D5C',
          paddingTop: 5,
          paddingBottom: 5,
        },
        toolButton: {
          color: 'white',
        },
      },
      MuiToolbar: {
        regular: {
          // display: 'none',
          minHeight: '0 !important',
          background: '#103D5C',
          color: 'white',
        },
      },
    },
  });

const DataTable = (props) => {
  const { data, columns, options, onFilterConfirm } = props;
  const intl = useIntl();
  const fullOptions = {
    ...options,
    download: false,
    print: false,
    responsive: 'scroll',
    textLabels: {
      body: {
        noMatch: intl.formatMessage({ id: 'data_tables.body.noMatch' }),
        toolTip: intl.formatMessage({ id: 'data_tables.body.toolTip' }),
      },
      filter: {
        all: intl.formatMessage({ id: 'data_tables.filter.all' }),
        title: intl.formatMessage({ id: 'data_tables.filter.title' }),
        reset: intl.formatMessage({ id: 'data_tables.filter.reset' }),
      },
      pagination: {
        rowsPerPage: intl.formatMessage({
          id: 'data_tables.pagination.rowsPerPage',
        }),
      },
      toolbar: {
        search: intl.formatMessage({ id: 'data_tables.toolbar.search' }),
        downloadCsv: intl.formatMessage({
          id: 'data_tables.toolbar.downloadCsv',
        }),
        print: intl.formatMessage({ id: 'data_tables.toolbar.print' }),
        viewColumns: intl.formatMessage({
          id: 'data_tables.toolbar.viewColumns',
        }),
        filterTable: intl.formatMessage({
          id: 'data_tables.toolbar.filterTable',
        }),
      },
      viewColumns: {
        title: intl.formatMessage({ id: 'data_tables.viewColumns.title' }),
      },
    },
    rowsPerPage: 100000000000,
    rowsPerPageOptions: [],
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={fullOptions}
        onFilterConfirm={onFilterConfirm}
      />
    </MuiThemeProvider>
  );
};

export default DataTable;
