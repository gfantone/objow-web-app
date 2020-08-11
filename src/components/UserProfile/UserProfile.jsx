import React from 'react'
import { Avatar, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { DarkTag, DefaultTitle, InfoText } from '..'
import * as Resources from '../../Resources'

const styles = {
    root: {
        padding: 16
    },
    avatar: {
        width: 41,
        height: 41
    },
    citation: {
        marginTop: 16
    }
}

const Collaborator = ({ user, ...props }) => {
    const { classes } = props
    const photoSrc = user.photo ? user.photo : '/assets/img/user/avatar.svg'

    return (
        <div className={classes.root}>
            <Grid container spacing={2} alignItems='center'>
                <Grid item>
                    <Avatar src={photoSrc} className={classes.avatar} />
                </Grid>
                <Grid item container xs>
                    <Grid item container xs={12}>
                        <Grid item xs>
                            <DefaultTitle>{user.firstname} {user.lastname}</DefaultTitle>
                        </Grid>
                        <Grid item>
                            <DarkTag>{user.role.name}</DarkTag>
                        </Grid>
                    </Grid>
                    <Grid xs={12}>
                        <InfoText>{user.team ? user.team.name : Resources.USER_PROFILE_NO_TEAM}</InfoText>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Collaborator)
