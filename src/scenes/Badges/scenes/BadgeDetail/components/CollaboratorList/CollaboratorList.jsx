import React from 'react'
import {Link} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import {Collaborator} from './components'
import {GridLink} from '../../../../../../components'

const CollaboratorList = ({colaborators, ...props}) => {
    return (
        <div>
            <Grid container spacing={2}>
                {colaborators.map(collaborator => {
                    return (
                        <GridLink key={collaborator.id} item xs={12} sm={4} component={Link} to={`/collaborators/${collaborator.id}/detail`}>
                            <Collaborator collaborator={collaborator} />
                        </GridLink>
                    )
                })}
            </Grid>
        </div>
    )
}

export default CollaboratorList
