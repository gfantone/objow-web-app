import React from 'react'
import {DefaultTitle, TeamThumb, Collaborator} from '../../../../../../components'
import {Card, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'



const Participants = ({participants, teams, ...props}) => {

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>Participants</DefaultTitle>
                </Grid>
                <Grid item xs={12}>

                      <Grid container spacing={2}>
                        { participants && participants.map(participant => (
                          <Grid item>
                            {
                              participant.fullname ? (
                                <Collaborator collaborator={participant}/>
                              ) : (
                                <TeamThumb team={teams.find(team => team.id === participant.id)}/>
                              )
                            }
                          </Grid>
                        ))}
                      </Grid>

                </Grid>
            </Grid>
        </div>
    )
}

export default Participants
