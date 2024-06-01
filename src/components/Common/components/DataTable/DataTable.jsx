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
      MUITableCell: {
        body: {
          color: 'red',
        },
      },
    },
  });

const DataTable = (props) => {
  const { data, columns, options } = props;
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
        displayRows: intl.formatMessage({
          id: 'data_tables.pagination.pageOf',
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
    rowsPerPage: 25,
    rowsPerPageOptions: [25, 50, 100],
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable data={data} columns={columns} options={fullOptions} />
    </MuiThemeProvider>
  );
};

export default DataTable;
