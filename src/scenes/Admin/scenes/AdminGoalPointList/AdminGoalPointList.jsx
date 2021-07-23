import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AppBarSubTitle, Card, DataTable, DefaultText, Loader, MainLayoutComponent } from '../../../../components'
import { ModeSelect, Filters } from './components'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import * as goalDefinitionLevelCollaboratorPointsActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelCollaoratorPoints/actions'
import * as goalDefinitionLevelTeamPointsActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelTeamPoints/actions'
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions'

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

        if(collaborator) {
          this.props.goalDefinitionListActions.getGoalDefinitionListByCollaborator(collaborator, periodId, null, true)
        } else if(team) {
          this.props.goalDefinitionListActions.getGoalDefinitionListByTeam(periodId, team, null, true)
        } else if(mode === 'global') {
          this.props.goalDefinitionListActions.getGoalDefinitionList(periodId, true, true, true);
        }
        this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPoints(periodId);
        this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPoints(periodId);
      }
    }

    componentDidUpdate() {

      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      if(!this.state.mode && mode) {
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
      this.loadData()
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

    renderData() {
        const { configs } = this.props.configList;
        const { points: collaboratorPoints } = this.props.goalDefinitionLevelCollaboratorPoints;
        const { points: teamPoints } = this.props.goalDefinitionLevelTeamPoints;
        const { definitions } = this.props.goalDefinitionList;
        const collaboratorGoalPoints = configs.find(x => x.code == 'CPG');
        const teamGoalPoints = configs.find(x => x.code == 'TPG');
        const usableCollaboratorGoalPoints = collaboratorGoalPoints ? collaboratorGoalPoints.value - collaboratorPoints : 0;
        const usableTeamGoalPoints = teamGoalPoints ? teamGoalPoints.value - teamPoints : 0;
        
        var columns = [
            { name: 'id', label: 'Ref' },
            { name: 'name', label: 'Intitulé' },
            { name: 'type.description', label: 'Objectif' },
            { name: 'points', label: 'Total pts mis en jeu' },
            { name: 'obtainedPoints', label: 'Total pts gagnés en moyenne' },
            { name: 'levels', label: 'Nbre de paliers' },
            { name: 'category.name', label: 'Catégorie' }
        ];
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => { this.props.history.push(`/admin/periods/${this.props.match.params.periodId}/goal-levels/${colData[0]}`) }
        };

        return (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item>
                                <DefaultText>{usableCollaboratorGoalPoints} pts joueur disponible</DefaultText>
                            </Grid>
                            <Grid item>
                                <DefaultText>{usableTeamGoalPoints} pts équipe disponible</DefaultText>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Filters emptyTeam={ this.state.mode === 'global' } onChange={ this.onFilterChange } team={this.team} collaborator={this.collaborator}/>
                <Grid item xs={12}>
                    <DataTable data={definitions} columns={columns} options={options} />
                </Grid>
            </Grid>
        )
    }

    render() {
        const { configs, loading: configfListLoading } = this.props.configList;
        const { points: collaboratorPoints, loading: goalDefinitionLevelCollaboratorPointsLoading } = this.props.goalDefinitionLevelCollaboratorPoints;
        const { points: teamPoints, loading: goalDefinitionLevelTeamPointsLoading } = this.props.goalDefinitionLevelTeamPoints;
        const { definitions, loading: goalDefinitionListLoading } = this.props.goalDefinitionList;
        const loading = configfListLoading || goalDefinitionLevelCollaboratorPointsLoading || goalDefinitionLevelTeamPointsLoading || goalDefinitionListLoading;

        return (
            <div>
                { !this.state.mode && <ModeSelect onChange={ this.onModeSelect } /> }
                { this.state.mode && (
                  <React.Fragment>
                    { loading && this.renderLoader() }
                    { !loading && configs && collaboratorPoints != null && teamPoints != null && definitions && this.renderData() }
                  </React.Fragment>
                ) }
            </div>
        )
    }
}

const mapStateToProps = ({ configList, goalDefinitionLevelCollaboratorPoints, goalDefinitionLevelTeamPoints, goalDefinitionList }) => ({
    configList,
    goalDefinitionLevelCollaboratorPoints,
    goalDefinitionLevelTeamPoints,
    goalDefinitionList
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    goalDefinitionLevelCollaboratorPointsActions: bindActionCreators(goalDefinitionLevelCollaboratorPointsActions, dispatch),
    goalDefinitionLevelTeamPointsActions: bindActionCreators(goalDefinitionLevelTeamPointsActions, dispatch),
    goalDefinitionListActions: bindActionCreators(goalDefinitionListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(AdminGoalPointList)))
