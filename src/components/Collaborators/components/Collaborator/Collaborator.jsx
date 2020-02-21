import React from 'react'
import { Avatar, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Card, DefaultText } from '../../../../components'

const styles = {
    root: {
        cursor: 'pointer'
    },
    avatar: {
        height: 34,
        width: 34
    },
    cardContent: {
        margin: 16
    }
}

const Collaborator = ({ collaborator, ...props }) => {
    const { classes } = props
    const photo = collaborator.photo ? collaborator.photo : '/assets/img/user/avatar.svg'

    return (
        <div className={classes.root}>
            <Card>
                <div className={classes.cardContent}>
                    <Grid container alignItems='center' spacing={1}>
                        <Grid item>
                            <Avatar src={photo} className={classes.avatar} />
                        </Grid>
                        <Grid item xs>
                            <DefaultText>
                                { collaborator.firstname } { collaborator.lastname }
                            </DefaultText>
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </div>
    )
}

export default withStyles(styles)(Collaborator)