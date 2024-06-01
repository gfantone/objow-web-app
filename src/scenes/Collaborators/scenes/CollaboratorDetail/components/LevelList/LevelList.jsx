import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DataTable,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 34,
    width: 34,
  },
}));

const LevelList = ({ open, setOpen, levels, ...props }) => {
  const intl = useIntl();
  const classes = useStyles();
  const [detailOpen, setDetailOpen] = React.useState(false);

  const columns = [
    { name: 'id', options: { display: false, filter: false } },

    {
      name: 'number',
      label: intl.formatMessage({ id: 'levels.columns.level' }),
      options: {
        customBodyRender: (value) => {
          return `${intl.formatMessage({
            id: 'levels.columns.level',
          })} ${value}`;
        },
      },
    },
    {
      name: 'icon',
      label: intl.formatMessage({ id: 'levels.columns.icon' }),
      options: {
        customBodyRender: (value) => {
          return (
            <CardMedia
              image={value ? value.path : ''}
              className={classes.icon}
            />
          );
        },
        filter: false,
      },
    },
    { name: 'title', label: intl.formatMessage({ id: 'levels.columns.name' }) },

    {
      name: 'points',
      label: intl.formatMessage({ id: 'levels.columns.points' }),
    },
  ];
  const options = {
    selectableRows: 'none',
    search: false,
    sort: false,
    filter: false,
    viewColumns: false,
  };
  // Circle is outside of Avatar to handle bug with bitmap images
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle onClose={() => setOpen(false)}>
          {intl.formatMessage({ id: 'levels.list_title' })}
        </DialogTitle>

        <DataTable data={levels} columns={columns} options={options} />
      </Dialog>
    </div>
  );
};

export default LevelList;
