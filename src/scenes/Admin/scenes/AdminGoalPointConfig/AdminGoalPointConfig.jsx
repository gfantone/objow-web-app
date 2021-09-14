import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { SubHeader, Filters } from './components'
import ReactDataSheet from 'react-datasheet'
import { Card, DefaultText, DefaultTitle, EmptyState, HiddenInput, IconButton, MainLayoutComponent, ProgressButton, TextField } from '../../../../components'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import * as goalDefinitionDetailActions from '../../../../services/GoalDefinitions/GoalDefinitionDetail/actions'
import * as goalDefinitionLevelListActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelList/actions'
import * as goalDefinitionLevelListUpdateActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelListUpdate/actions'
import * as goalDefinitionPointRepartitionListActions from '../../../../services/GoalDefinitionPointRepartitions/GoalDefinitionPointRepartitionList/actions'
import * as goalDefinitionPointRepartitionModeListActions from '../../../../services/GoalDefinitionPointRepartitionModes/GoalDefinitionPointRepartitionModeList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import { withStyles } from '@material-ui/core/styles'
import './helpers/GoalDefinitionLevelFormsyHelper'
import '../../../../helpers/FormsyHelper'
import '../../../../helpers/NumberHelper'
import * as Resources from "../../../../Resources";

const styles = {
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

    }
};


class AdminGoalPointConfig extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.new = 0;
        this.initialized = false;
        this.removedLevels = [];
        this.state = {
            levels: [],
            maxPoints: 0,
            usedPoints: 0
        };
        this.props.goalDefinitionLevelListUpdateActions.clearGoalDefinitionLevelListUpdate()
    }


    loadData = () => {
      const periodId = this.props.match.params.periodId;
      const params = new URLSearchParams(window.location.search);
      const collaborator = params.get('collaborator');
      const team = params.get('team');
      this.props.teamListActions.getTeamList();
      this.props.goalDefinitionPointRepartitionListActions.getGoalDefinitionPointRepartitionList()
      this.props.goalDefinitionPointRepartitionModeListActions.getGoalDefinitionPointRepartitionModeList()
      if(team !== this.team || collaborator !== this.collaborator) {
        this.team = team
        this.collaborator = collaborator
        this.props.goalDefinitionDetailActions.getGoalDefinition(this.id, this.team, this.collaborator);
        this.props.goalDefinitionLevelListActions.getGoalDefinitionLevelList(this.id, this.team, this.collaborator);
      } else {
        this.props.goalDefinitionDetailActions.getGoalDefinition(this.id);
      }
    }

    handleAdd() {
        var levels = this.state.levels;
        this.new++;
        const id = `new${this.new}`;
        levels.push({ id: id, percentage: 0, points: 0, definition: this.id, isNew: true });
        this.setState({
            ...this.state,
            levels: levels
        })
    }

    handleRemove = index => () => {
        var levels = this.state.levels;
        var removedLevels = levels.splice(index, 1);
        removedLevels = removedLevels.filter(level => !level.isNew);
        this.removedLevels = removedLevels.concat(this.removedLevels);
        this.setState({
            ...this.state,
            levels: levels
        })
    };

    handleSubmit() {
        const model = this.refs.form.getModel();
        var levels = this.state.levels;
        levels.map(level => {
            const index = levels.indexOf(level);
            level.percentage = Number(model.percentage[index]) / 100;
            level.points = model.points[index]
        });
        const oldLevels = levels.filter(level => !level.isNew);
        const newLevels = levels.filter(level => level.isNew);

        this.props.goalDefinitionLevelListUpdateActions.updateGoalDefinitionLevelList(this.id, oldLevels, newLevels, this.removedLevels, this.team, this.collaborator)
    }

    componentDidMount() {
        this.id = this.props.match.params.id;
        this.props.activateReturn();
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<SubHeader />);
        this.props.handleButtons(<IconButton onClick={this.handleAdd.bind(this)} size='small'><FontAwesomeIcon icon={faPlus} /></IconButton>);
        this.props.configListActions.getConfigList(this.props.match.params.periodId)
        this.loadData()
    }

      componentWillReceiveProps(props) {
        const { levels } = props.goalDefinitionLevelList;
        if (!this.initialized && levels) {
            this.initialized = true;
            this.setState({
                ...this.state,
                levels: levels
            })
        }
    }

    renderEmptyState() {
        return (
            <div>
                <EmptyState title='Aucun palier trouvé' message='Commencez par ajouter un nouveau palier' />
            </div>
        )
    }

    periodsByDefinition = (definition) => {
      const now = new Date()
      const endOfYear = new Date(now.getFullYear(), 11, 31);
      if(definition.periodicity.code === 'Y'){
        return {
          total: 1,
          remaining: 1
        }
      } else if(definition.periodicity.code === 'S') {
        return {
          total: endOfYear.getSemesterNumber(),
          remaining: endOfYear.getSemesterNumber() - now.getSemesterNumber()
        }
      } else if(definition.periodicity.code === 'Q') {
        return {
          total: endOfYear.getQuarterNumber(),
          remaining: endOfYear.getQuarterNumber() - now.getQuarterNumber()
        }
      } else if(definition.periodicity.code === 'M') {
        return {
          total: endOfYear.getMonth() + 1,
          remaining: endOfYear.getMonth() - now.getMonth() + 1
        }
      } else if(definition.periodicity.code === 'W') {
        return {
          total: endOfYear.getWeekNumber(),
          remaining: endOfYear.getWeekNumber() - now.getWeekNumber()
        }
      }
    }

    renderData() {
        const { classes } = this.props
        const { configs } = this.props.configList;
        const { definition } = this.props.goalDefinitionDetail;
        const { teams } = this.props.teamList;
        const { loading } = this.props.goalDefinitionLevelListUpdate;
        // const usedPoints = this.state.levels && this.state.levels.length > 0 ? Math.max(...this.state.levels.map(x => x.points)) : 0;
        // const usablePoints = (definition.type.code == 'C' ? configs.find(x => x.code == 'CPG').value : definition.type.code == 'T' ? configs.find(x => x.code == 'TPG').value : 0) - definition.points + usedPoints;
        const { pointRepartitions, loading: goalDefinitionPointRepartitionLoading  } = this.props.goalDefinitionPointRepartitionList
        const repartition = pointRepartitions.filter(pointRepartition => (
          pointRepartition.definition === definition.id && (
            this.team && !this.collaborator && pointRepartition.team === parseInt(this.team) || this.collaborator && pointRepartition.collaborator === parseInt(this.collaborator)
          )
        ))[0]
        const periods = this.periodsByDefinition(definition);
        const usedPoints = repartition ? definition.usedPoints : (
          this.state.levels && this.state.levels.length > 0 ? Math.max(...this.state.levels.map(x => x.points)) : 0
        )
        const usablePoints = repartition ? repartition.points - definition.usedPoints : (
          (definition.type.code == 'C' ? configs.find(x => x.code == 'CPG').value : definition.type.code == 'T' ? configs.find(x => x.code == 'TPG').value : 0) - definition.points + usedPoints
        )

        const playersNumber = teams.length && this.team && !this.collaborator ? teams.find(team => team.id === parseInt(this.team)).collaborators.length : null
        return (
            <Formsy ref='form' onValidSubmit={this.handleSubmit.bind(this)}>
                <HiddenInput name='usablePoints' value={usablePoints} />
                <Filters onChange={() => {}} team={this.team} collaborator={this.collaborator}/>
                <Grid container direction="row" spacing={4}>
                  <Grid item xs={8}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Card>
                          <Grid container direction="row" spacing={2}>
                            <Grid item>
                              <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item className={`${classes.headerPoints} ${classes.usablePoints}`}>
                                  <DefaultText>{usablePoints}</DefaultText>
                                </Grid>
                                <Grid item>
                                  <DefaultText>pts joueur disponible</DefaultText>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item className={`${classes.headerPoints} ${classes.usedPoints}`}>
                                  <DefaultText>{usedPoints}</DefaultText>
                                </Grid>
                                <Grid item>
                                  <DefaultText>pts joueur déjà mis en jeu</DefaultText>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item className={`${classes.headerPoints} ${classes.currentPoints}`}>
                                  <DefaultText>{definition.currentPoints}</DefaultText>
                                </Grid>
                                <Grid item>
                                  <DefaultText>pts joueur en cours de jeu</DefaultText>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                        </Card>
                      </Grid>
                      { this.state.levels.map((level, index) => {
                        const number = index + 1;
                        const percentageValidations = index > 0 ? { isMoreThanOrEquals: 0, isMoreThan: `percentage[${index-1}]` } : { isMoreThanOrEquals: 0 };
                        const pointValidations = index > 0 ? { isMoreThanOrEquals: 0, isMoreThan: `points[${index-1}]`, isGoalDefinitionLevelValid: true } : { isMoreThanOrEquals: 0, isGoalDefinitionLevelValid: true };

                        return (
                          <Grid key={level.id} item xs={6} container spacing={1}>
                            <Grid item xs={12}>
                              <DefaultTitle>Palier {number}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                              <Card>
                                <Grid container spacing={2} alignItems='flex-end'>
                                  <Grid item xs>
                                    <TextField type='number' name={`percentage[${index}]`} label="% d'atteinte de l'objectif" initial={level.percentage.toFullPercentage()} fullWidth required
                                      validations={percentageValidations}
                                      validationErrors={{
                                        isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                        isMoreThanOrEquals: 'Le pourcentage doit être supérieur ou égal 0',
                                        isMoreThan: 'Le pourcentage doit être supérieur à celui du palier précédent'
                                      }}
                                      />
                                  </Grid>
                                  <Grid item xs>
                                    <TextField type='number' name={`points[${index}]`} label='Points' initial={level.points} fullWidth required
                                      validations={pointValidations}
                                      validationErrors={{
                                        isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                        isMoreThanOrEquals: 'Le nombre de points doit être supérieur ou égal à 0',
                                        isMoreThan: 'Le nombre de points doit être supérieur à celui du palier précédent',
                                        isGoalDefinitionLevelValid: 'Le nombre de points restant est insuffisant'
                                      }}
                                      />
                                  </Grid>
                                  <Grid item xs='auto'>
                                    <IconButton color='secondary' size='small' onClick={this.handleRemove(index).bind(this)}>
                                      <FontAwesomeIcon icon={faTrashAlt} />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Card>
                            </Grid>
                          </Grid>
                        )
                      }) }
                      { this.state.levels.length == 0 && <Grid item xs={12}>
                        <div>
                          <EmptyState title='Aucun palier trouvé' message='Créz un premier palier' />
                        </div>
                      </Grid> }
                      <Grid item xs={12}>
                        <ProgressButton type='submit' text='Valider' loading={loading} centered />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                  <Card>
                    <Grid container spacing={2} direction="column">
                      <Grid item>
                        <ReactDataSheet
                          data={[
                            [{value: 'Points joueurs', readOnly: true}, {value: 0, readOnly: true}]
                          ]}
                          valueRenderer={cell => cell.value}
                          />
                      </Grid>
                      {playersNumber && (
                        <Grid item>
                          <ReactDataSheet
                            data={[
                              [{value: 'Nombre de joueurs', readOnly: true}, {value: playersNumber, readOnly: true}],
                            ]}
                            valueRenderer={cell => cell.value}
                            />
                        </Grid>
                      )}
                      <Grid item>
                        <ReactDataSheet
                          data={[
                            [{value: 'Nombre de périodes totales', readOnly: true}, {value: periods.total, readOnly: true}],
                            [{value: 'Nombre de périodes restantes', readOnly: true}, {value: periods.remaining, readOnly: true}]
                          ]}
                          valueRenderer={cell => cell.value}
                          />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { configs, loading: configListLoading } = this.props.configList;
        const { definition, loading: goalDefinitionDetailLoading } = this.props.goalDefinitionDetail;
        const { levels, loading: goalDefinitionLevelListLoading } = this.props.goalDefinitionLevelList;
        const { teams, loading: teamsLoading } = this.props.teamList;
        const { pointRepartitions, loading: goalDefinitionPointRepartitionLoading  } = this.props.goalDefinitionPointRepartitionList
        const loading = configListLoading || goalDefinitionDetailLoading || goalDefinitionLevelListLoading || goalDefinitionPointRepartitionLoading ;

        const { success } = this.props.goalDefinitionLevelListUpdate;

        if (success) {
            this.props.goalDefinitionLevelListUpdateActions.clearGoalDefinitionLevelListUpdate();
            this.props.history.goBack()
        }

        return (
            <div>
                { !loading && configs && definition && levels && teams && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ configList, goalDefinitionDetail, goalDefinitionLevelList, goalDefinitionLevelListUpdate, goalDefinitionPointRepartitionList, goalDefinitionPointRepartitionModeList, teamList}) => ({
    configList,
    goalDefinitionDetail,
    goalDefinitionLevelList,
    goalDefinitionLevelListUpdate,
    goalDefinitionPointRepartitionList,
    goalDefinitionPointRepartitionModeList,
    teamList
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch),
    goalDefinitionDetailActions: bindActionCreators(goalDefinitionDetailActions, dispatch),
    goalDefinitionLevelListActions: bindActionCreators(goalDefinitionLevelListActions, dispatch),
    goalDefinitionLevelListUpdateActions: bindActionCreators(goalDefinitionLevelListUpdateActions, dispatch),
    goalDefinitionPointRepartitionListActions: bindActionCreators(goalDefinitionPointRepartitionListActions, dispatch),
    goalDefinitionPointRepartitionModeListActions: bindActionCreators(goalDefinitionPointRepartitionModeListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminGoalPointConfig))
