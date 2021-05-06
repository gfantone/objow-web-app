import React from 'react'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {Card, DefaultTitle, InfoText, Avatar} from '../../../../../../../../components'

const useStyles = makeStyles({
    avatar: {
        width: 41,
        height: 41
    }
})

const Collaborator = ({collaborator, ...props}) => {
    const classes = useStyles()

    return (
        <div>
            <Card>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar src={collaborator.photo} className={classes.avatar} entityId={ collaborator.id } fallbackName={ collaborator.fullname } />
                    </Grid>
                    <Grid item xs>
                        <DefaultTitle>{collaborator.fullname}</DefaultTitle>
                        {collaborator.team && <InfoText>{collaborator.team.name}</InfoText>}
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default Collaborator
