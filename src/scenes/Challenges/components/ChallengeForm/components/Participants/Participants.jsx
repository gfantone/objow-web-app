import React from 'react'
import {DefaultTitle, TeamThumb, Collaborator, IconButton as MenuIconButton} from '../../../../../../components'
import {Card, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import _ from 'lodash'


const styles = {
    panel: {
        backgroundColor: 'initial',
        borderRadius: 'initial',
        boxShadow: 'none'
    },
    panelSummary: {
        padding: 'initial'
    },
    panelDetails: {
        padding: 'initial',
        paddingBottom: 24
    }
}

const Participants = ({participants, teams, setParticipantsEditOpen, classes, ...props}) => {

    const participantsByTeam = participants && _.get(participants, '[0].fullname') ?
      participants.reduce(
        (acc, participant) => {
          if(!acc[participant.team.id]) {
            acc[participant.team.id] = {participants: [], team: participant.team}
          }
          acc[participant.team.id].participants = [...acc[participant.team.id].participants, participant]
          return acc
        }
      , {}) : {}

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
                        { participants && (
                          <React.Fragment>
                            {_.get(participants, '[0].fullname') ? (
                              <React.Fragment>
                                {
                                  Object.keys(participantsByTeam).map(teamKey => (
                                    <Grid item xs={12}>
                                      <ExpansionPanel className={classes.panel}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panelSummary}>
                                          <DefaultTitle key={participantsByTeam[teamKey].team.id}>
                                            {participantsByTeam[teamKey].team.name}
                                          </DefaultTitle>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={classes.panelDetails}>
                                          <Grid container key={participantsByTeam[teamKey].team.id} spacing={2}>
                                            {participantsByTeam[teamKey].participants.map(collaborator => {
                                              const collaboratorKey = `C${collaborator.id}`
                                              return (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={collaboratorKey}>
                                                  <Collaborator key={collaboratorKey} collaborator={collaborator} />
                                                </Grid>
                                              )
                                            })}
                                          </Grid>
                                        </ExpansionPanelDetails>

                                      </ExpansionPanel>
                                    </Grid>
                                  ))
                                }
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                {participants.map(participant => (
                                  <Grid item xs={12} sm={4}>
                                    <TeamThumb team={teams.find(team => team.id === participant.id)}/>
                                  </Grid>
                                ))}
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        )}
                      </Grid>

                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Participants)
