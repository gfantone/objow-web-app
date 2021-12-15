import React from 'react'
import {DefaultTitle, Team, Collaborator, IconButton as MenuIconButton, Card} from '../../../../../../components'
import {Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import _ from 'lodash'


const styles = {
    panel: {
        backgroundColor: 'initial',
        borderRadius: 'initial',
        boxShadow: 'none',
        marginTop: 10,
        '& .MuiExpansionPanelSummary-content': {
          margin: 0,
          '&.Mui-expanded': {

            margin: '0 0 12px 0'
          }
        }
    },
    panelSummary: {
        padding: 'initial',
        position: 'relative',
        '& .MuiButtonBase-root': {
          position: 'absolute',
          right: 10,
          top: '50%',
          marginTop: -15
        }
    },
    panelDetails: {
        padding: 'initial',
        paddingLeft: 20,
        // paddingBottom: 24,

    }
}

const Participants = ({participants, teams, setParticipantsEditOpen, classes, ...props}) => {

    const participantsByTeam = participants && _.get(participants, '[0].fullname') ?
      participants.reduce(
        (acc, participant) => {
          if(!acc[participant.team.id]) {
            acc[participant.team.id] = {collaborators: [], team: participant.team}
          }
          acc[participant.team.id].collaborators = [...acc[participant.team.id].collaborators, participant]
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
                              <Grid container spacing={2}>
                                {
                                  Object.keys(participantsByTeam).map(teamKey => (
                                    <Grid item xs={12} sm={6}>
                                      <ExpansionPanel className={classes.panel}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panelSummary}>
                                          <Grid container>
                                            <Grid item xs={12}>
                                              <Card>
                                                <Team
                                                  team={Object.assign({}, participantsByTeam[teamKey].team, {collaborators: participantsByTeam[teamKey].collaborators})}
                                                />
                                              </Card>
                                            </Grid>
                                          </Grid>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={classes.panelDetails}>
                                          <Grid container key={participantsByTeam[teamKey].team.id} spacing={2}>
                                            {participantsByTeam[teamKey].collaborators.map(collaborator => {
                                              const collaboratorKey = `C${collaborator.id}`
                                              return (
                                                <Grid item xs={12} key={collaboratorKey}>
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
                              </Grid>
                            ) : (
                              <React.Fragment>
                                {participants.map(participant => (
                                  <Grid item xs={12} sm={6}>
                                    <Card>
                                      <Team team={teams.find(team => team.id === participant.id)}/>
                                    </Card>
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
