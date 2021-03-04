import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { RefreshButton, BigText, EmptyState } from '../../../../../../';

import * as Resources from '../../../../../../../../Resources'

const styles = {
  wrapper: {
    textAlign: 'center'
  },
  refreshButton: {
    marginTop: 20
  }
}

const ErrorHandler = ({...props}) => {
    const { classes } = props;
    return(
      <div className={ classes.wrapper } >
        <EmptyState title={Resources.ERROR_PAGE_TITLE} message={Resources.ERROR_PAGE_MESSAGE} />
        <Grid className={ classes.refreshButton }>
          <RefreshButton/>
        </Grid>
      </div>
    )
};

export default withStyles(styles)(ErrorHandler)
