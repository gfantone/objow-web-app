import React from 'react'
import {Avatar} from '@material-ui/core'
import {AvatarGroup} from '@material-ui/lab'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
    avatar: {
        border: '2px solid #ffffff'
    }
})

const CollaboratorList = ({collaborators, ...props}) => {
    const classes = useStyles()

    return (
        <div>
            <AvatarGroup max={4} classes={{avatar: classes.avatar}}>
                {collaborators.map(collaborator => {
                    return <Avatar key={collaborator.id} src={collaborator.photo} />
                })}
            </AvatarGroup>
        </div>
    )
}

export default CollaboratorList
