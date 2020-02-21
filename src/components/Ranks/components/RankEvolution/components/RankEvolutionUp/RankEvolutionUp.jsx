import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        color: '#00E58D'
    }
}

const RankEvolutionUp = (props) => {
    const { classes } = props
    return <FontAwesomeIcon icon={faAngleUp} className={classes.root} />
}

export default withStyles(styles)(RankEvolutionUp)