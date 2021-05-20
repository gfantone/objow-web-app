import React, { useState } from 'react'
import { Grid, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Collaborator, Team, DefaultTitle, Button } from '../../..'

import _ from 'lodash'

const styles = {
  item: {
    marginBottom: 10,
    position: 'relative'
  },
  itemIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: '-10px',
  },
  teamItemIcon: {
    right: 30,
    top: 22,
    zIndex: 10
  },
  addIcon: {
    color: '#00E58D'
  },
  deleteIcon: {
    color: '#E50000'
  },
  panelWrapper: {
    position: 'relative'
  },
  panel: {
      backgroundColor: 'initial',
      borderRadius: 'initial',
      boxShadow: 'none',
      position: 'relative'
  },
  panelSummary: {
      padding: 'initial',
      position: 'relative'
  },
  panelSummaryContent: {

  },
  panelDetails: {
      padding: 'initial',
      paddingBottom: 24
  }
}

const TransferList = ({ listIn, selected, onChange, mode, ...props }) => {
    const { classes } = props
    const [selectedList, setSelectedList] = useState(selected || [])
    console.log(listIn);
    const selectItem = (item) => {
      if(_.indexOf(selectedList, item) < 0) {
        setSelectedList([item, ...selectedList])
      }
    }

    const removeItem = (item) => {
      if(_.indexOf(selectedList, item) >= 0) {
        setSelectedList(selectedList.filter(selectedItem => selectedItem !== item))
      }
    }

    const removeList = (items) => {
      setSelectedList(selectedList.filter(selectedItem => items.indexOf(selectedItem) < 0))
    }

    const addList = (items) => {
      setSelectedList([...items, ...selectedList])
    }

    const emptySelected = () => {
      setSelectedList([])
    }

    const getListByTeam = (collaborators) => {
      return collaborators.reduce((acc, collaborator) => {
        let team = acc.find(team => team.id === _.get(collaborator, 'team.id'))
        if(!team) {
          team = _.get(collaborator, 'team')
          acc = [...acc, team]
        }
        if(!acc[acc.indexOf(team)].collaborators) {
          acc[acc.indexOf(team)].collaborators = []
        }
        if(acc[acc.indexOf(team)].collaborators.indexOf(collaborator) < 0) {
          acc[acc.indexOf(team)].collaborators = [...acc[acc.indexOf(team)].collaborators, collaborator]
        }
        return acc
      }, [])
    }

    React.useEffect(() => {
      onChange(selectedList)
    }, [selectedList])

    const choices = mode === 'team' ?
      listIn.filter(team => _.intersection(selectedList, team.collaborators).length < team.collaborators.length) :
      _.differenceWith(listIn, selectedList, _.isEqual)

    // console.log(getListByTeam(selectedList));
    return (
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={5}>
              <DefaultTitle>
                Selection
              </DefaultTitle>
            </Grid>
            <Grid item xs={5}>
              <DefaultTitle>
                Participants
              </DefaultTitle>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={5}>
              { choices.map((choice, choiceKey) => (
                <div className={ classes.item }>
                  { mode === 'team' ? (
                    <DefaultTitle style={{height:'30px', lineHeight: '2.5'}}>
                      {choice.name} ({ choice.collaborators.length })
                    </DefaultTitle>
                  ) : (
                    <Collaborator key={choiceKey} collaborator={choice} />
                  )  }
                  <IconButton size='small' onClick={() => mode === 'team' ? addList(choice.collaborators) : selectItem(choice)} className={ classes.itemIcon } >
                    <FontAwesomeIcon icon={faPlus} className={ classes.addIcon } />
                  </IconButton>
                </div>
              )) }
            </Grid>
            <Grid item xs={5}>
              { getListByTeam(selectedList).map((team, teamKey) => (
                <React.Fragment>
                  <div className={ classes.panelWrapper }>
                    <IconButton size='small' onClick={() => removeList(team.collaborators)} className={ `${classes.itemIcon} ${classes.teamItemIcon}` } >
                      <FontAwesomeIcon icon={faMinus} className={ classes.deleteIcon } />
                    </IconButton>
                    <div style={{position: 'static'}}>
                      <ExpansionPanel className={classes.panel} defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panelSummary}>
                          <DefaultTitle key={teamKey}>
                            {team.name} ({team.collaborators.length})
                          </DefaultTitle>
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
