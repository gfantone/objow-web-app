import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ReactDataSheet from 'react-datasheet'
import Formsy from 'formsy-react'
import _ from 'lodash'
import { AppBarSubTitle, Card, DataTable, DefaultText, Loader, MainLayoutComponent, Select, ProgressButton } from '../../../../components'
import { ModeSelect, Filters, ParticipantTypeFilter } from './components'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import * as goalDefinitionLevelCollaboratorPointsActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelCollaoratorPoints/actions'
import * as goalDefinitionLevelTeamPointsActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelTeamPoints/actions'
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions'
import * as goalDefinitionPointRepartitionListActions from '../../../../services/GoalDefinitionPointRepartitions/GoalDefinitionPointRepartitionList/actions'
import * as goalDefinitionPointRepartitionListUpdateActions from '../../../../services/GoalDefinitionPointRepartitions/GoalDefinitionPointRepartitionListUpdate/actions'
import * as goalDefinitionPointRepartitionModeListActions from '../../../../services/GoalDefinitionPointRepartitionModes/GoalDefinitionPointRepartitionModeList/actions'

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
            this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPointsByCollaborator(periodId, collaborator);
            this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPointsByCollaborator(periodId, collaborator);
          } else if(team) {
            this.props.goalDefinitionListActions.getGoalDefinitionListByTeam(periodId, team, null, true)
            this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPointsByTeam(periodId, team);
            this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPointsByTeam(periodId, team);
          }
        } else {
          this.props.goalDefinitionListActions.getGoalDefinitionList(periodId, true, true, true);
          this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPoints(periodId);
          this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPoints(periodId);
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
        if(change.cell.type === 'repartitionPoints' || change.cell.type === 'repartitionPercent') {
          let newRepartition = {
            id: change.cell.id,
          }
          if(change.cell.type === 'repartitionPoints') {
            newRepartition.points = change.value
          }
          if(change.cell.type === 'repartitionPercent') {
            newRepartition.points = Number((totalPoints * change.value / 100).toFixed(2))
          }
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
        if(repartition.points) {
          result.points = repartition.points
        }
        return result
      }))
    }

    renderData() {
        const { configs } = this.props.configList;
        const { usedPoints: usedCollaboratorPoints, currentPoints: currentCollaboratorPoints } = this.props.goalDefinitionLevelCollaboratorPoints;
        const { usedPoints: usedTeamPoints, currentPoints: currentTeamPoints } = this.props.goalDefinitionLevelTeamPoints;

        const { definitions } = this.props.goalDefinitionList;
        const { teams } = this.props.teamList;

        const participantsNumber = teams.filter(team => this.team ? team.id === parseInt(this.team) : true).reduce((acc, team) => (
          team.collaborators.filter(collaborator => this.collaborator ? parseInt(this.collaborator) === collaborator.id : true).length + acc
        ), 0)
        const teamParticipantsNumber = teams.filter(team => this.team ? team.id === parseInt(this.team) : true).length
        const baseCollaboratorGoalPoints = parseInt(configs.find(x => x.code == 'CPG').value)
        const baseTeamGoalPoints = configs.find(x => x.code == 'TPG').value
        const collaboratorGoalPoints = baseCollaboratorGoalPoints * participantsNumber;
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


        var columns = [
            { name: 'id', label: 'Ref' },
            { name: 'name', label: 'Intitulé' },
            // { name: 'type.description', label: 'Objectif' },
            { name: 'usedPoints', label: 'Pts déjà mis en jeu' },
            { name: 'currentPoints', label: 'Pts en cours de jeu' },
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

              const mode = repartitionModes.find(mode => _.get(newRepartition, 'mode') ? mode.id === newRepartition.mode : mode.id === repartition.mode)

              if(this.team && mode.code === 'T') {
                url = url + `?team=${this.team}`
                this.props.history.push(url)
              }
              else if(this.collaborator && mode.code === 'I') {
                url = url + `?team=${this.team}&collaborator=${this.collaborator}`
                this.props.history.push(url)
              }
              else if(!this.collaborator && !this.team && mode.code === 'G') {
                this.props.history.push(url)
              }
            }
        };

        const displayRepartition = this.team || this.collaborator

        const percentByDefinition = definition => Number(((definition.usedPoints + definition.currentPoints) / maxPoints * 100).toFixed(2))
        const totalPointsPercent = Number(filteredDefinitions.reduce((acc, definition) => acc + percentByDefinition(definition), 0).toFixed(2))

        let totalImportancePercent = 0
        let totalAvailable = 0

        return (
            <Grid container spacing={4}>
                <Filters emptyTeam={ this.state.mode === 'global' } onChange={ this.onFilterChange } team={this.team} collaborator={this.collaborator}/>
                <Grid item xs={12}>
                  <Grid container direction="row" spacing={4}>
                    <Grid item sm={ displayRepartition ? 8 : 12}>
                      <Card>
                        <Grid container spacing={2}>
                          { this.state.type === 'C' && (
                            <React.Fragment>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={2}>
                                  <Grid item>
                                    <DefaultText>{usableCollaboratorGoalPoints}</DefaultText>
                                  </Grid>
                                  <Grid item>
                                    <DefaultText>pts joueur disponible</DefaultText>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={2}>
                                  <Grid item>
                                    <DefaultText>{usedCollaboratorPoints}</DefaultText>
                                  </Grid>
                                  <Grid item>
                                    <DefaultText>pts joueur déjà mis en jeu</DefaultText>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={2}>
                                  <Grid item>
                                    <DefaultText>{currentCollaboratorPoints}</DefaultText>
                                  </Grid>
                                  <Grid item>
                                    <DefaultText>pts joueur en cours de jeu</DefaultText>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </React.Fragment>
                          ) }
                          { this.state.type === 'T' && (
                            <React.Fragment>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={2}>
                                  <Grid item>
                                    <DefaultText>{usableTeamGoalPoints}</DefaultText>
                                  </Grid>
                                  <Grid item>
                                    <DefaultText>pts équipe disponible</DefaultText>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={2}>
                                  <Grid item>
                                    <DefaultText>{usedTeamPoints}</DefaultText>
                                  </Grid>
                                  <Grid item>
                                    <DefaultText>pts équipe déjà mis en jeu</DefaultText>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={2}>
                                  <Grid item>
                                    <DefaultText>{currentTeamPoints}</DefaultText>
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
                    { displayRepartition && (
                      <Grid item sm={4}>
                        <Card>
                          <ReactDataSheet
                            data={[
                              [
                                { value: this.state.type === 'T' ? 'Points équipe' : 'Points joueurs', readOnly: true },
                                { value: this.state.type === 'T' ? baseTeamGoalPoints : baseCollaboratorGoalPoints, readOnly: !this.team && this.collaborator }
                              ],
                              [
                                { value: this.state.type === 'T' ? `${ teams.length } équipes` : `${participantsNumber} joueurs`, readOnly: true },
                                { value: this.state.type === 'T' ? teamGoalPoints : collaboratorGoalPoints, readOnly: !this.team && this.collaborator, readOnly: true }
                              ]
                            ]}
                            valueRenderer={cell => cell.value}
                          />
                        </Card>
                      </Grid>
                    ) }
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={4}>
                    <Grid item sm={displayRepartition ? 8 : 12}>
                      <DataTable data={
                          filteredDefinitions
                        } columns={columns} options={options} />
                    </Grid>
                    { displayRepartition && (
                      <Grid item sm={4}>
                        <Card>
                          <Formsy onSubmit={this.onSubmitRepartitions} >
                            <ReactDataSheet
                              data={[
                                [ {value: 'Ref', readOnly: true},  {value: '% alloué', readOnly: true}, {value: 'Points alloués', readOnly: true}, {value: '% d\'importance', readOnly: true}, {value: 'Points Disponibles', readOnly: true}, {value: 'Mode de répartition', readOnly: true} ],
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

                                  let repartitionPoints = repartition && mode.code === 'G' ? '-' : newRepartition && newRepartition.points || repartition.points

                                  // Page filtered on team and current repartition is individual
                                  if(this.team && !this.collaborator && mode.code === 'I') {
                                    repartitionPoints = pointRepartitions
                                      .filter(pointRepartition => currentTeam && currentTeam.collaborators.map(c => c.id).indexOf(pointRepartition.collaborator) >= 0)
                                      .reduce((acc, pointRepartition) => acc + pointRepartition.points, 0)
                                  }
                                  // Page filtered on collaborator and current repartition is team
                                  if(this.collaborator && mode.code === 'T') {
                                    repartitionPoints = _.get(pointRepartitions
                                      .find(pointRepartition => currentCollaborator && currentCollaborator.team.id === pointRepartition.team), 'points', 0)
                                  }

                                  const repartitionReadonly = (
                                    mode.code === 'G' ||
                                    mode.code === 'T' && (!this.team || this.collaborator) ||
                                    mode.code === 'I' && !this.collaborator
                                  )

                                  const importance_percent = mode.code === 'G' ? '-' : Number((repartitionPoints / (maxPoints - totalPoints) * 100).toFixed(2))
                                  if(parseInt(importance_percent)) {
                                    totalImportancePercent += Number(importance_percent)
                                  }
                                  if(parseInt(repartitionPoints)) {
                                    totalAvailable += Number(repartitionPoints)
                                  }

                                  return (
                                    [
                                      {
                                        value: definition.id, readOnly: true
                                      },
                                      {
                                        value: percentByDefinition(definition), readOnly: true
                                      },
                                      {
                                        value: definition.usedPoints + definition.currentPoints, readOnly: true
                                      },
                                      {
                                        value: importance_percent,
                                        readOnly: repartitionReadonly,
                                        type: 'repartitionPercent',
                                        id: repartition.id,
                                      },
                                      {
                                        value: repartitionPoints,
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
                                  {value: totalPointsPercent , readOnly: true},
                                  {value: totalPoints, readOnly: true},
                                  {value: Number(totalImportancePercent.toFixed(2)), readOnly: true},
                                  {value: Number(totalAvailable.toFixed(2)), readOnly: true}

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
                          <ProgressButton type='submit' text={'Valider'} loading={false} centered />
                          </Formsy>
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
            </Grid>
        )
    }

    render() {
        const { configs, loading: configfListLoading } = this.props.configList;
        const { usedPoints: usedCollaboratorPoints, currentPoints: currentCollaboratorPoints, loading: goalDefinitionLevelCollaboratorPointsLoading } = this.props.goalDefinitionLevelCollaboratorPoints;

        const { usedPoints: usedTeamPoints, currentPoints: currentTeamPoints, loading: goalDefinitionLevelTeamPointsLoading } = this.props.goalDefinitionLevelTeamPoints;
        const { definitions, loading: goalDefinitionListLoading } = this.props.goalDefinitionList;
        const { pointRepartitions, loading: goalDefinitionPointRepartitionLoading  } = this.props.goalDefinitionPointRepartitionList
        const loading = configfListLoading || goalDefinitionLevelCollaboratorPointsLoading || goalDefinitionLevelTeamPointsLoading || goalDefinitionListLoading || goalDefinitionPointRepartitionLoading;

        return (
            <div>
                { !this.state.mode && <ModeSelect onChange={ this.onModeSelect } /> }
                { this.state.mode && (
                  <React.Fragment>
                    { loading && this.renderLoader() }
                    { !loading && configs && usedCollaboratorPoints != null && usedTeamPoints != null && pointRepartitions && definitions && this.renderData() }
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
