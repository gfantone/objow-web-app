import React from 'react'
import {DefaultTitle, TeamThumb, Collaborator, IconButton as MenuIconButton} from '../../../../../../components'
import {Card, Grid} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {makeStyles} from '@material-ui/core/styles'



const Participants = ({participants, teams, setParticipantsEditOpen, ...props}) => {

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <DefaultTitle>Participants</DefaultTitle>
                    </Grid>
                    <Grid item>
                      <DefaultTitle>
                        <MenuIconButton size={'small'} onClick={setParticipantsEditOpen} style={{marginTop: '-4px', color: '#00E58D', fontSize: '18px' }}>
                          <FontAwesomeIcon icon={faEdit} />
                        </MenuIconButton>
                      </DefaultTitle>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>

                      <Grid container spacing={2}>
                        { participants && participants.map(participant => (
                          <Grid item xs={12} sm={4}>
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
