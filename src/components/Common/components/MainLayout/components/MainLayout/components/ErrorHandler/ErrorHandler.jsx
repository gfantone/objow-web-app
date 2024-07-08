import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { RefreshButton, BigText, EmptyState } from '../../../../../../';
import { useIntl } from 'react-intl';
import * as Resources from '../../../../../../../../Resources';

const styles = {
  wrapper: {
    textAlign: 'center',
  },
  refreshButton: {
    marginTop: 20,
  },
};

const ErrorHandler = ({ ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <EmptyState
        title={intl.formatMessage({ id: 'common.error_page_title' })}
        message={intl.formatMessage({ id: 'common.error_page_message' })}
      />
      <Grid className={classes.refreshButton}>
        <RefreshButton />
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ErrorHandler);
