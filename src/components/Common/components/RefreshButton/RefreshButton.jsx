import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import { useClearCache } from 'react-clear-cache'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../../../components'
import configureStore from "../../../../store/configureStore";

const styles = {
  reloadIcon: {
    cursor: 'pointer'
  }
}

const RefreshButton = ({...props}) => {
  const { emptyCacheStorage } = useClearCache();
  const { classes } = props;
  const { store, persistor } = configureStore();
  return(
    <Button className={classes.reloadIcon} onClick={ () => {
        persistor.purge().then(() => {
          localStorage.clear();
          emptyCacheStorage()
        })
      } } >
      <FontAwesomeIcon icon={ faSyncAlt } />
      &nbsp;
      Mettre à jour l'application
    </Button>
  )
}

export default withStyles(styles)(RefreshButton)
