import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ReactDataSheet from 'react-datasheet'
import Formsy from 'formsy-react'
import _ from 'lodash'
import { AppBarSubTitle, Card, DataTable, DefaultText, Loader, MainLayoutComponent, Select, ProgressButton, ErrorText, BoldSpan } from '../../../../components'
import { Tag } from '../../../../components/Teams/components/Team/components'
import { ModeSelect, Filters, ParticipantTypeFilter } from './components'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import * as goalDefinitionLevelCollaboratorPointsActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelCollaoratorPoints/actions'
import * as goalDefinitionLevelTeamPointsActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelTeamPoints/actions'
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions'
import * as goalDefinitionPointRepartitionListActions from '../../../../services/GoalDefinitionPointRepartitions/GoalDefinitionPointRepartitionList/actions'
import * as goalDefinitionPointRepartitionListUpdateActions from '../../../../services/GoalDefinitionPointRepartitions/GoalDefinitionPointRepartitionListUpdate/actions'
import * as goalDefinitionPointRepartitionModeListActions from '../../../../services/GoalDefinitionPointRepartitionModes/GoalDefinitionPointRepartitionModeList/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


const styles = {
    root: {
        position: 'relative'
    },
    loader: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerPointsLabel: {
      '& p': {
        fontSize: 14,
      }
    },
    headerPoints: {
      '& p': {
        fontSize: 22,
        fontWeight: 'bold'
      }
    },
    usablePoints: {
      '& p': {
        color: '#00E58D'
      }
    },
    usedPoints: {
      '& p': {
        color: '#f2b666'
      }
    },
    currentPoints: {

    },
    error: {

    }
};

class AdminGoalPointList extends MainLayoutComponent {
    constructor(props) {
        super(props)
        this.mode = null
        this.team = null
        this.collaborator = null
        this.state = {
          mode: null,
          type: 'C',
          newRepartitions: []
          // team: null,
          // collaborator: null,
        }
    }

    refresh(team, collaborator) {
        const periodId = this.props.match.params.periodId;
        var url = `/admin/periods/${periodId}/goal-levels`;
        if (this.state.mode) url += `?mode=${this.state.mode}`;
        if (collaborator) url += `&collaborator=${collaborator}`;
        if (team) url += `&team=${team}`;
        this.props.history.replace(url)
    }

    loadData = () => {
      const periodId = this.props.match.params.periodId;
      const params = new URLSearchParams(window.location.search);
      const collaborator = params.get('collaborator');
      const team = params.get('team');
      const mode = params.get('mode');
      if(team !== this.team || collaborator !== this.collaborator || mode !== this.mode) {
        this.team = team
        this.collaborator = collaborator
        this.mode = mode

        this.props.goalDefinitionPointRepartitionListActions.getGoalDefinitionPointRepartitionList()
        this.props.goalDefinitionPointRepartitionModeListActions.getGoalDefinitionPointRepartitionModeList()
        if(mode === 'team') {
          if(collaborator) {
            this.props.goalDefinitionListActions.getGoalDefinitionListByCollaborator(collaborator, periodId, null, true)
            // this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPointsByCollaborator(periodId, collaborator);
            // this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPointsByCollaborator(periodId, collaborator);
          } else if(team) {
            this.props.goalDefinitionListActions.getGoalDefinitionListByTeam(periodId, team, null, true)
            // this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPointsByTeam(periodId, team);
            // this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPointsByTeam(periodId, team);
          }
        } else {
          this.props.goalDefinitionListActions.getGoalDefinitionList(periodId, true, true, true);
          // this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPoints(periodId);
          // this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPoints(periodId);
        }
      }
    }

    componentDidUpdate() {
      const { teams } = this.props.teamList;
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const team = params.get('team');
      if(!this.state.mode && mode) {
        this.props.handleSubHeader(<ParticipantTypeFilter handleTypeChange={this.handleTypeChange} />)
        this.setState({
          ...this.state,
          mode
        })
      }
      if(this.state.mode && !mode) {
        this.setState({
          ...this.state,
          mode: null
        })
      }
      if(teams && teams.length > 0 && this.state.mode === 'team' && !team) {
        this.refresh(teams[0].id)
      }

      this.loadData()
    }

    handleTypeChange = (type) => {
        this.setState({
            ...this.state,
            type: type
        })
    }

    componentDidMount() {
        const periodId = this.props.match.params.periodId;
        this.props.activateReturn();
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title='Configuration des points des objectifs' />);
        this.props.handleMaxWidth('lg');
        this.props.configListActions.getConfigList(periodId);
        this.loadData();
    }

    renderLoader() {
        return <Loader centered />
    }

    onModeSelect = (mode) => {
      if(mode) {
        this.props.history.push(`/admin/periods/${this.props.match.params.periodId}/goal-levels?mode=${mode}`)
      }
    }

    onFilterChange = (team, collaborator) => {
      this.refresh(team, collaborator)
    }

    onSelectRepartitionMode = (repartitionId, mode) => {
      const newRepartition = {
        id: repartitionId,
        mode: parseInt(mode)
      }
      const newRepartitions = this.state.newRepartitions.find(repartition => repartition.id === repartitionId) ?
        this.state.newRepartitions.map(repartition => repartition.id === repartitionId ? Object.assign({}, repartition, newRepartition) : repartition) :
        [...this.state.newRepartitions, newRepartition]
      this.setState({
        ...this.state,
        newRepartitions
      })
    }

    onRepartitionChange = (changes, totalPoints) => {
      let newRepartitions = [...this.state.newRepartitions]
      changes.forEach(change => {
        if(change.cell.type === 'repartitionPoints' || change.cell.type === 'importance_percent') {
          let newRepartition = {
            id: change.cell.id,
          }
          if(change.cell.type === 'repartitionPoints') {
            newRepartition.points = change.value
            newRepartition.importance_percent = Number((change.value / totalPoints * 100).toFixed(2))
          }
          if(change.cell.type === 'importance_percent') {
            newRepartition.points = Number((totalPoints * change.value / 100).toFixed(2))
            newRepartition.importance_percent = change.value
          }
          // console.log(newRepartition);
          newRepartitions = newRepartitions.find(repartition => repartition.id === newRepartition.id) ?
            this.state.newRepartitions.map(repartition => repartition.id === newRepartition.id ? Object.assign({}, repartition, newRepartition) : repartition) :
            [...this.state.newRepartitions, newRepartition]
        }
      })
      this.setState({
        ...this.state,
        newRepartitions
      })
    }

    onSubmitRepartitions = () => {
      this.props.goalDefinitionPointRepartitionListUpdateActions.updateGoalDefinitionPointRepartitionList(this.state.newRepartitions.map(repartition => {

        let result = {}
        result.id = repartition.id
        if(repartition.mode) {
          result.mode_id = repartition.mode
        }


        if(repartition.importance_percent) {
          result.points = repartition.importance_percent
        }
        return result
      }))
    }

    getDisabledLinesFromDefinitions = (definitions, pointRepartitions, repartitionModes) => {

      let disabledLines = {}
      definitions.forEach(definition => {

        // get currentRepartition by definition
        const repartition = pointRepartitions.filter(pointRepartition => (
          pointRepartition.definition === definition.id && (
            this.team && !this.collaborator && pointRepartition.team === parseInt(this.team) || this.collaborator && pointRepartition.collaborator === parseInt(this.collaborator)
          )
        ))[0]

        const newRepartition = this.state.newRepartitions.find(newRepartition => newRepartition.id === repartition.id)

        const mode = repartition ?
          repartitionModes.find(mode => _.get(newRepartition, 'mode') ? mode.id === newRepartition.mode : mode.id === repartition.mode) :
          { code: 'G' }

        disabledLines[definition.id] = !(this.team && !this.collaborator && mode.code === 'T' || this.collaborator && mode.code === 'I' || !this.collaborator && !this.team && mode.code === 'G')
      })
      return disabledLines
    }

    addRepartitionPointsToDefinitions = (definitions) => {
      // const { teams } = this.props.teamList;
      // const participantsNumber = teams.filter(team => this.team ? team.id === parseInt(this.team) : true).reduce((acc, team) => (
      //   team.collaborators.filter(collaborator => this.collaborator ? parseInt(this.collaborator) === collaborator.id : true).length + acc
      // ), 0)
      // const baseGoalPoints = this.getBaseGoalPoints() * participantsNumber
      return definitions.map(definition => {
        // const { pointRepartitions } = this.props.goalDefinitionPointRepartitionList
        // const repartition = pointRepartitions.filter(pointRepartition => (
        //   pointRepartition.definition === definition.id && (
        //     this.team && !this.collaborator && pointRepartition.team === parseInt(this.team) || this.collaborator && pointRepartition.collaborator === parseInt(this.collaborator)
        //   )
        // ))[0]
        //
        // const newRepartition = this.state.newRepartitions.find(newRepartition => newRepartition.id === repartition.id)
        // const repartitionPoints = _.get(newRepartition, 'points') * baseGoalPoints / 100 || _.get(repartition, 'points')  * baseGoalPoints / 100 || definition.usedPoints + definition.currentPoints
        return Object.assign({}, definition, {
          usedPoints: definition.usedPoints.toLocaleString(),
          currentPoints: definition.currentPoints.toLocaleString(),
          // repartitionPoints: Number(repartitionPoints.toFixed(2)).toLocaleString()
        })
      })


    }

    getBaseGoalPoints = () => {
      const { configs } = this.props.configList;
      const baseCollaboratorGoalPoints = parseInt(configs.find(x => x.code == 'CPG').value)
      const baseTeamGoalPoints = configs.find(x => x.code == 'TPG').value
      return this.state.type === 'T' ? baseTeamGoalPoints : baseCollaboratorGoalPoints
    }

    renderData() {
        const { classes } = this.props;
        const { configs } = this.props.configList;
        // const { usedPoints: usedCollaboratorPoints, currentPoints: currentCollaboratorPoints } = this.props.goalDefinitionLevelCollaboratorPoints;
        // const { usedPoints: usedTeamPoints, currentPoints: currentTeamPoints } = this.props.goalDefinitionLevelTeamPoints;

        const { definitions } = this.props.goalDefinitionList;
        const { teams } = this.props.teamList;

        const {usedCollaboratorPoints, currentCollaboratorPoints, usedTeamPoints, currentTeamPoints} = definitions.reduce((acc, definition) => {
          acc.usedCollaboratorPoints += definition.usedPoints
          acc.usedTeamPoints += definition.usedPoints

          acc.currentCollaboratorPoints += definition.currentPoints
          acc.currentTeamPoints += definition.currentPoints
          return acc
        }, {usedCollaboratorPoints: 0, currentCollaboratorPoints: 0, usedTeamPoints: 0, currentTeamPoints: 0})

        const participantsNumber = teams.filter(team => this.team ? team.id === parseInt(this.team) : true).reduce((acc, team) => (
          team.collaborators.filter(collaborator => this.collaborator ? parseInt(this.collaborator) === collaborator.id : true).length + acc
        ), 0)
        const teamParticipantsNumber = teams.filter(team => this.team ? team.id === parseInt(this.team) : true).length
        const baseCollaboratorGoalPoints = parseInt(configs.find(x => x.code == 'CPG').value)
        const baseTeamGoalPoints = configs.find(x => x.code == 'TPG').value
        const collaboratorGoalPoints = baseCollaboratorGoalPoints * participantsNumber;
        const baseGoalPoints = this.getBaseGoalPoints()
        const teamGoalPoints = baseTeamGoalPoints * teamParticipantsNumber;
        const usableCollaboratorGoalPoints = collaboratorGoalPoints ? collaboratorGoalPoints - usedCollaboratorPoints - currentCollaboratorPoints : 0;
        const usableTeamGoalPoints = teamGoalPoints ? teamGoalPoints - usedTeamPoints - currentTeamPoints : 0;
        const { pointRepartitions } = this.props.goalDefinitionPointRepartitionList
        const { modes: repartitionModes } = this.props.goalDefinitionPointRepartitionModeList
        const filteredDefinitions = definitions.filter(definition => definition.type.code === this.state.type)
        const totalPoints = parseFloat(filteredDefinitions.reduce((acc, definition) => acc + definition.usedPoints + definition.currentPoints, 0).toFixed(2))
        const maxPoints = this.state.type === 'T' ? teamGoalPoints : collaboratorGoalPoints

        const currentTeam = teams.find(team => this.team && team.id === parseInt(this.team))
        const currentCollaborator = currentTeam && this.collaborator && currentTeam.collaborators.find(collaborator => collaborator.id === parseInt(this.collaborator))

        const disabledLines = this.getDisabledLinesFromDefinitions(definitions, pointRepartitions, repartitionModes)

        var columns = [
            { name: 'id', label: 'Ref' },
            { name: 'isActive', label: 'Actif', options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                if(value) {
                  return <FontAwesomeIcon icon={faCheckCircle} style={{fontSize: 20, color: '#00E58D'}}/>
                } else {
                  return <FontAwesomeIcon icon={faTimesCircle} style={{fontSize: 20, color: '#E50000'}}/>
                }

              }
            } },
            { name: 'name', label: 'Intitulé' },
            // { name: 'type.description', label: 'Objectif' },
            { name: 'usedPoints', label: 'Pts déjà mis en jeu' },
            { name: 'currentPoints', label: 'Pts en cours de jeu' },
            // { name: 'repartitionPoints', label: 'Pts alloués' },
            // { name: 'obtainedPoints', label: 'Total pts gagnés en moyenne' },
            // { name: 'levels', label: 'Nbre de paliers' },
            { name: 'category.name', label: 'Catégorie' }
        ];
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => {
              let url = `/admin/periods/${this.props.match.params.periodId}/goal-levels/${colData[0]}`

              if(this.mode === 'global') {
                return this.props.history.push(url)
              }

              const definitionId = parseInt(colData[0])
              // get currentRepartition by definition
              const repartition = pointRepartitions.filter(pointRepartition => (
                pointRepartition.definition === definitionId && (
                  this.team && !this.collaborator && pointRepartition.team === parseInt(this.team) || this.collaborator && pointRepartition.collaborator === parseInt(this.collaborator)
                )
              ))[0]

              const newRepartition = this.state.newRepartitions.find(newRepartition => newRepartition.id === repartition.id)

              const mode = repartitionModes.find(mode => newRepartition && _.get(newRepartition, 'mode') ? mode.id === newRepartition.mode : mode.id === repartition.mode)

              if(this.team && !this.collaborator && mode.code === 'T') {
                url = url + `?team=${this.team}`
                this.props.history.push(url)
              } else if(this.collaborator && mode.code === 'I') {
                url = url + `?team=${this.team}&collaborator=${this.collaborator}`
                this.props.history.push(url)
              } else if(!this.collaborator && !this.team && mode.code === 'G') {
                this.props.history.push(url)
              }
            },
            setRowProps: (row) => {
              // console.log(parseInt(row[0]) === 171);
              if(disabledLines && disabledLines[parseInt(row[0])] === true) {
                return {
                  style: {
                    background: '#ededed',
                    opacity: 0.6
                  }
                }

              }
            }
        };

        const displayRepartition = this.team || this.collaborator

        const percentByDefinition = definition => Number(((definition.usedPoints + definition.currentPoints) / maxPoints * 100).toFixed(2))
        const totalPointsPercent = Number(filteredDefinitions.reduce((acc, definition) => acc + percentByDefinition(definition), 0).toFixed(2))

        let totalImportancePercent = 0
        let totalAvailable = 0
        let allRepartitionsValid = true
        return (
          <React.Fragment>

            <Grid container direction="row" spacing={4}>

              <Grid item sm={ displayRepartition ? 8 : 12}>
                <Grid container spacing={4}>
                  <Grid item sm={12}>
                    <Card>
                      <Grid container spacing={2} justify='space-around'>
                        { this.state.type === 'C' && (
                          <React.Fragment>
                            <Grid item>
                              <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item className={`${classes.headerPoints} ${classes.usablePoints}`}>
                                  <DefaultText>{usableCollaboratorGoalPoints.toLocaleString()}</DefaultText>
                                </Grid>
                                <Grid item className={ classes.headerPointsLabel }>
                                  <DefaultText>points joueur disponibles</DefaultText>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item className={`${classes.headerPoints} ${classes.usedPoints}`}>
                                  <DefaultText>{usedCollaboratorPoints.toLocaleString()}</DefaultText>
                                </Grid>
                                <Grid item className={ classes.headerPointsLabel }>
                                  <DefaultText>points joueur déjà mis en jeu</DefaultText>

                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item className={`${classes.headerPoints} ${classes.currentPoints}`}>
                                  <DefaultText>{currentCollaboratorPoints.toLocaleString()}</DefaultText>
                                </Grid>
                                <Grid item className={ classes.headerPointsLabel }>
                                  <DefaultText>points joueur en cours de jeu</DefaultText>

                                </Grid>
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        ) }
                        { this.state.type === 'T' && (
                          <React.Fragment>
                            <Grid item>
                              <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item className={`${classes.headerPoints} ${classes.usablePoints}`}>
                                  <DefaultText>{usableTeamGoalPoints.toLocaleString()}</DefaultText>
                                </Grid>
                                <Grid item>
                                  <DefaultText>pts équipe disponible</DefaultText>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item className={`${classes.headerPoints} ${classes.usedPoints}`}>
                                  <DefaultText>{usedTeamPoints.toLocaleString()}</DefaultText>
                                </Grid>
                                <Grid item>
                                  <DefaultText>pts équipe déjà mis en jeu</DefaultText>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item className={`${classes.headerPoints} ${classes.currentPoints}`}>
                                  <DefaultText>{currentTeamPoints.toLocaleString()}</DefaultText>
                                </Grid>
                                <Grid item>
                                  <DefaultText>pts équipe en cours de jeu</DefaultText>
                                </Grid>
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        ) }
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item sm={12}>
                    <DataTable data={
                        this.addRepartitionPointsToDefinitions(filteredDefinitions)
                      } columns={columns} options={options} />
                    </Grid>

                </Grid>
              </Grid>
              { displayRepartition && (
                <Grid item sm={4}>
                  <Card>
                    <Grid container spacing={8}>
                        <Grid item>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <DefaultText>Points par joueur : <BoldSpan component='span'>{baseGoalPoints.toLocaleString()}</BoldSpan></DefaultText>
                                </Grid>
                                <Grid item xs={12}>
                                  <DefaultText>Total points alloués : <BoldSpan component='span'>{this.state.type === 'T' ? teamGoalPoints.toLocaleString() : collaboratorGoalPoints.toLocaleString()}</BoldSpan></DefaultText>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm='auto'>
                              <Grid container direction='column' >
                                <Grid item>
                                  { this.state.type === 'T' ? (
                                    <Tag color='#333'>
                                      {teams.length} équipes
                                    </Tag>

                                  ) : (
                                    <Tag color={_.get(currentTeam, 'color.hex')}>
                                      {participantsNumber} joueurs
                                    </Tag>
                                  )
                                }

                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                        <Grid item>

                        <Formsy onSubmit={this.onSubmitRepartitions} >
                          <Grid container spacing={2}>
                            <Grid item>
                              <ReactDataSheet
                                data={[
                                  [ {value: 'Ref', readOnly: true}, {value: '% d\'importance', readOnly: true}, {value: 'Points Alloués', readOnly: true}, {value: 'Mode de répartition', readOnly: true} ],
                                  ...filteredDefinitions.map(definition => {
                                    // If repartition is changed by select

                                    // get currentRepartition by definition
                                    const repartition = pointRepartitions.filter(pointRepartition => (
                                      pointRepartition.definition === definition.id && (
                                        this.team && !this.collaborator && pointRepartition.team === parseInt(this.team) || this.collaborator && pointRepartition.collaborator === parseInt(this.collaborator)
                                      )
                                    ))[0]

                                    const newRepartition = this.state.newRepartitions.find(newRepartition => newRepartition.id === repartition.id)

                                    const mode = repartitionModes.find(mode => _.get(newRepartition, 'mode') ? mode.id === newRepartition.mode : mode.id === repartition.mode)


                                    let repartitionPoints = definition.currentPoints
                                    let importance_percent = definition.currentPoints / (maxPoints) * 100

                                    if(mode.code !== 'G') {
                                      importance_percent = repartition && repartition.points
                                      // console.log(definition.id, importance_percent);
                                      // Page filtered on team and current repartition is individual
                                      if(this.team && !this.collaborator && mode.code === 'I') {
                                        const individualPoints = pointRepartitions
                                        .filter(pointRepartition => pointRepartition.definition === definition.id && currentTeam && currentTeam.collaborators.map(c => c.id).indexOf(pointRepartition.collaborator) >= 0)
                                        .reduce((acc, pointRepartition) => {
                                          return acc + pointRepartition.points * baseGoalPoints / 100
                                          // return acc + pointRepartition.points
                                        }, 0)
                                        // console.log(definition.id, individualPoints);
                                        importance_percent = individualPoints / (maxPoints) * 100
                                      }
                                      // Page filtered on collaborator and current repartition is team
                                      if(this.collaborator && mode.code === 'T') {
                                        importance_percent = _.get(pointRepartitions
                                          .find(pointRepartition => pointRepartition.definition === definition.id && currentCollaborator && currentCollaborator.team.id === pointRepartition.team), 'points', 0)
                                        }

                                        importance_percent = newRepartition && newRepartition.importance_percent || importance_percent

                                        repartitionPoints = Number((maxPoints * importance_percent / 100).toFixed(2))

                                        // repartition points should not be under used points
                                        if(mode.code === 'T' && repartitionPoints < definition.usedPoints) {
                                          allRepartitionsValid = false
                                        }
                                      }



                                      const repartitionReadonly =
                                      mode.code === 'G' ||
                                      // definition.currentPoints > repartitionPoints ||
                                      mode.code === 'T' && (!this.team || this.collaborator) ||
                                      mode.code === 'I' && !this.collaborator

                                      if(Number(importance_percent)) {
                                        totalImportancePercent += Number(importance_percent)
                                      }
                                      if(Number(repartitionPoints)) {
                                        totalAvailable += Number(repartitionPoints)
                                      }

                                      return (
                                        [
                                          {
                                            value: definition.id, readOnly: true
                                          },

                                          {
                                            value: Number(Number(importance_percent).toFixed(2)).toLocaleString(),
                                            readOnly: repartitionReadonly,
                                            type: 'importance_percent',
                                            id: repartition.id,
                                          },
                                          {
                                            value: repartitionPoints.toLocaleString(),
                                            readOnly: repartitionReadonly,
                                            type: 'repartitionPoints',
                                            id: repartition.id
                                          },
                                          {
                                            value: (mode ? mode : ''), type: 'select', choices: repartitionModes, id: repartition.id
                                          }
                                        ]
                                      )
                                    }),
                                    [
                                      {value: 'Total', readOnly: true},
                                      {value: Number(totalImportancePercent.toFixed(2)).toLocaleString(), readOnly: true},
                                      {value: Number(totalAvailable.toFixed(2)).toLocaleString(), readOnly: true}

                                    ]
                                    // [
                                    //   {value: 'Total alloué', readOnly: true},
                                    //   // {value: '100', readOnly: true},
                                    // ],
                                    // [
                                    //   {value: 'Total restant', readOnly: true},
                                    //   // {value: 100 - totalPointsPercent, readOnly: true},
                                    //   {value: maxPoints - totalPoints, readOnly: true}
                                    // ]
                                  ]}
                                  cellRenderer={(cell) => {
                                    if(cell.cell.type === 'select') {
                                      return (
                                        <td {...cell}>
                                          <Select
                                            onChange={ (value) => this.onSelectRepartitionMode(cell.cell.id, value) }
                                            name={`repartitionMode${cell.cell.key}`}
                                            emptyDisabled
                                            initial={cell.cell.value.id}
                                            updateInitial
                                            optionValueName='id'
                                            optionTextName='description'
                                            options={repartitionModes}
                                            disabled={ !this.team || this.collaborator }
                                            />
                                        </td>
                                      )
                                    }
                                    return <td {...cell}>{cell.children}</td>
                                  }}
                                  onCellsChanged={ changes => this.onRepartitionChange(changes, maxPoints) }
                                  valueRenderer={cell => cell.value}
                                  />
                              </Grid>
                              {(Number(totalImportancePercent) && totalImportancePercent > 100 || !allRepartitionsValid) && (
                                <Grid item justify='center'>
                                  <ErrorText className={classes.error} align='center'>{`Le total de points ne peut pas dépasser le total alloué pour les objectifs (${
                                      this.state.type === 'T' ? teamGoalPoints.toLocaleString() : collaboratorGoalPoints.toLocaleString() } points)`}</ErrorText>
                                  </Grid>
                                )}
                                <Grid item xs={12} alignItems='center'>

                                  <ProgressButton type='submit' text={'Valider'} disabled={ totalImportancePercent > 100 } loading={false} centered />

                                </Grid>
                              </Grid>

                            </Formsy>
                          </Grid>
                    </Grid>
                  </Card>
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        )
    }

    render() {
        const { configs, loading: configfListLoading } = this.props.configList;
        // const { usedPoints: usedCollaboratorPoints, currentPoints: currentCollaboratorPoints, loading: goalDefinitionLevelCollaboratorPointsLoading } = this.props.goalDefinitionLevelCollaboratorPoints;

        // const { usedPoints: usedTeamPoints, currentPoints: currentTeamPoints, loading: goalDefinitionLevelTeamPointsLoading } = this.props.goalDefinitionLevelTeamPoints;
        const { definitions, loading: goalDefinitionListLoading } = this.props.goalDefinitionList;
        const { pointRepartitions, loading: goalDefinitionPointRepartitionLoading  } = this.props.goalDefinitionPointRepartitionList
        const loading = configfListLoading  || goalDefinitionListLoading || goalDefinitionPointRepartitionLoading;

        return (
            <div>
                { !this.state.mode && <ModeSelect onChange={ this.onModeSelect } /> }
                { this.state.mode && (
                  <React.Fragment>
                    { loading && this.renderLoader() }
                    { !loading && configs && pointRepartitions && definitions && this.renderData() }
                  </React.Fragment>
                ) }
            </div>
        )
    }
}

const mapStateToProps = ({ configList, goalDefinitionLevelCollaboratorPoints, goalDefinitionLevelTeamPoints, goalDefinitionList, teamList, goalDefinitionPointRepartitionList, goalDefinitionPointRepartitionModeList }) => ({
    configList,
    goalDefinitionLevelCollaboratorPoints,
    goalDefinitionLevelTeamPoints,
    goalDefinitionList,
    goalDefinitionPointRepartitionList,
    goalDefinitionPointRepartitionModeList,
    teamList
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    goalDefinitionLevelCollaboratorPointsActions: bindActionCreators(goalDefinitionLevelCollaboratorPointsActions, dispatch),
    goalDefinitionLevelTeamPointsActions: bindActionCreators(goalDefinitionLevelTeamPointsActions, dispatch),
    goalDefinitionListActions: bindActionCreators(goalDefinitionListActions, dispatch),
    goalDefinitionPointRepartitionListActions: bindActionCreators(goalDefinitionPointRepartitionListActions, dispatch),
    goalDefinitionPointRepartitionListUpdateActions: bindActionCreators(goalDefinitionPointRepartitionListUpdateActions, dispatch),
    goalDefinitionPointRepartitionModeListActions: bindActionCreators(goalDefinitionPointRepartitionModeListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(AdminGoalPointList)))
