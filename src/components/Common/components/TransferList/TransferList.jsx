import React, { useState } from 'react'
import { Grid, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Card } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Collaborator, Team, DefaultTitle, Button, TeamThumb } from '../../..'

import _ from 'lodash'

const styles = {
  title: {
    fontSize: 17,
    textAlign: 'center',
    margin: '5px 0'
  },
  boxWrapper: {
    padding: '15px',
    borderRadius: '6px',
    background: "#f7f8fc"
  },
  item: {
    marginBottom: 10,
    position: 'relative',
    zIndex: 10,
    "&:last-of-type": {
      marginBottom: '0'
    }
  },
  itemIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: '-10px',
    zIndex: 40
  },
  teamItemIcon: {
    // right: 30,
    // top: 22,
    // zIndex: 10
  },
  addIcon: {
    color: '#00E58D'
  },
  deleteIcon: {
    color: '#E50000'
  },
  panelWrapper: {
    position: 'relative',
    marginBottom: '18px',
    "&:last-of-type": {
      marginBottom: '0'
    }
  },
  panel: {
      backgroundColor: 'initial',
      borderRadius: 'initial',
      boxShadow: 'none',
      position: 'relative',
      '&.MuiExpansionPanel-root:before': {
        display: 'none'
      },
      '& .MuiExpansionPanelSummary-expandIcon': {
        position: 'absolute',
        left: '135px',
        top: '20px',
      },
      '& .MuiExpansionPanelSummary-expandIcon.MUI-expanded': {
        top: '16px',
      },
      '& .MuiExpansionPanelSummary-root': {
        zIndex: 20,
        height: '64px',
        marginRight: '42px',
      }
  },
  panelSummary: {
      marginTop: "-80px",
      padding: 'initial',
      position: 'relative'
  },
  panelSummaryContent: {
    position: 'absolute',

  },
  panelDetails: {
      padding: "10px 0 0 15px",
      zIndex: 5
  }
}

const TransferList = ({ listIn, selected, onChange, enableCollaboratorSelect, ...props }) => {
    const { classes } = props
    const [selectedList, setSelectedList] = useState(selected || [])
    const defaultChoices = () => {
      const result = _.compact(listIn.map(team => {
          const collaborators = team.collaborators.filter(c => selectedList.filter(c2 => c.id === c2.id) <= 0)

          if(collaborators.length > 0) {
            return Object.assign(
              {},
              team,
              { collaborators: collaborators }
            )
          }
        }
      ))
      return result
    }

    const [choices, setChoices] = useState(defaultChoices() || [])


    const selectItem = (item) => {
      if(_.indexOf(selectedList, item) < 0) {
        setSelectedList([item, ...selectedList])
      }
    }

    const removeItem = (item) => {
      if(_.indexOf(selectedList.map(i => i.id), item.id) >= 0) {
        setSelectedList(selectedList.filter(selectedItem => selectedItem.id !== item.id))
      }
    }

    const removeList = (items) => {
      setSelectedList(selectedList.filter(selectedItem => items.map(item => item.id).indexOf(selectedItem.id) < 0))
    }

    const addList = (items) => {
      setSelectedList([...items, ...selectedList])
    }

    const emptySelected = () => {
      setSelectedList([])
    }

    const getListByTeam = (collaborators) => {
      return _.compact(listIn.map(team => {
        const selectedCollaborators = team.collaborators.filter(team_collaborator => _.intersection(team.collaborators.map(c => c.id), collaborators.map(c => c.id)).indexOf(team_collaborator.id) >= 0)

        if(selectedCollaborators.length > 0) {
          return Object.assign(
            {},
            team,
            { collaborators: selectedCollaborators }
          )
        }
      }))
    }

    React.useEffect(() => {
      onChange(selectedList)
      setChoices(defaultChoices())
    }, [selectedList])
    // console.log(selectedList);
    return (
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={5}>
              <DefaultTitle className={ classes.title }>
                Selection
              </DefaultTitle>
            </Grid>
            <Grid item xs={5}>
              <DefaultTitle className={ classes.title }>
                Participants
              </DefaultTitle>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={5} className={ classes.boxWrapper }>
              { choices.map((choice, choiceKey) => (

                <div className={ classes.panelWrapper }>
                  <div style={{position: 'static'}}>
                    <div className={ classes.item }>
                      <TeamThumb team={ choice } />
                      <IconButton size='small' onClick={() => addList(choice.collaborators)} className={ classes.itemIcon } >
                        <FontAwesomeIcon icon={faPlus} className={ classes.addIcon } />
                      </IconButton>
                    </div>
                    { enableCollaboratorSelect && (

                      <ExpansionPanel className={classes.panel}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panelSummary}>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.panelDetails}>
                          <Grid container key={choiceKey}>
                            { choice.collaborators.map((collaborator, collaboratorKey) => (
                              <Grid item className={ classes.item } style={{ width: '100%' }}>
                                <Collaborator key={collaboratorKey} collaborator={collaborator} />
                                <IconButton size='small' onClick={() => selectItem(collaborator)} className={ classes.itemIcon } >
                                  <FontAwesomeIcon icon={faPlus} className={ classes.addIcon } />
                                </IconButton>
                              </Grid>
                            )) }
                          </Grid>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    )}
                  </div>
                </div>
              )) }
            </Grid>
            <Grid item xs={5} className={ classes.boxWrapper }>
              { getListByTeam(selectedList).map((team, teamKey) => (
                <React.Fragment>
                  <div className={ classes.panelWrapper }>
                    <div style={{position: 'static'}}>
                      <div className={ classes.item }>
                        <TeamThumb team={ team }/>
                        <IconButton size='small' onClick={() => removeList(team.collaborators)} className={ `${classes.itemIcon} ${classes.teamItemIcon}` } >
                          <FontAwesomeIcon icon={faMinus} className={ classes.deleteIcon } />
                        </IconButton>
                      </div>
                      { enableCollaboratorSelect && (
                        <ExpansionPanel className={classes.panel}>
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panelSummary}>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails className={classes.panelDetails}>
                            <Grid container key={teamKey}>
                              { team.collaborators.map((collaborator, collaboratorKey) => (
                                <Grid item className={ classes.item } style={{ width: '100%' }}>
                                  <Collaborator key={collaboratorKey} collaborator={collaborator} />
                                  <IconButton size='small' onClick={() => removeItem(collaborator)} className={ classes.itemIcon } >
                                    <FontAwesomeIcon icon={faMinus} className={ classes.deleteIcon } />
                                  </IconButton>
                                </Grid>
                              )) }
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      )}
                    </div>
                  </div>


                </React.Fragment>
              )) }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
}

export default withStyles(styles)(TransferList)
