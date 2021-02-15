import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { RefreshButton, BigText } from '../../../../../../';
import { Grid } from '@material-ui/core'

const styles = {
  wrapper: {
    textAlign: 'center'
  },
  refreshButton: {
    marginTop: 200
  }
}

const ErrorHandler = ({...props}) => {
    const { classes } = props;
    return(
      <div className={ classes.wrapper } >
        <Grid>
          <BigText>
            Oops, il semblerait qu'un problème soit survenu. L'application n'est peut-être pas à jour. Vous pouvez rafraichir la version avec ce bouton.
          </BigText>
        </Grid>
        <Grid>
          <RefreshButton className={ classes.refreshButton }/>
        </Grid>
      </div>
    )
};

export default withStyles(styles)(ErrorHandler)
