import React from 'react'
import { Avatar, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { TextField } from '../../..'

const styles = {
    avatar: {
        width: 48,
        height: 48
    }
}

const GenericPlayerGoal = ({ goal, ...props }) => {
    const { classes } = props
    const photoSrc = goal.photo != null ? goal.photo : '/assets/img/user/avatar.svg'

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item>
                    <Avatar src={photoSrc} className={classes.avatar} />
                </Grid>
                <Grid item xs>
                    <TextField name={goal.id} label={`${goal.firstname} ${goal.lastname}`} initial={goal.target} type='number' />
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(GenericPlayerGoal)