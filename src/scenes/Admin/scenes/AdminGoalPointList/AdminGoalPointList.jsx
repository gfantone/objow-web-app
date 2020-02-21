import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AppBarSubTitle, Card, DataTable, DefaultText, Loader, MainLayoutComponent } from '../../../../components'
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
    }

    componentDidMount() {
        const periodId = this.props.match.params.periodId;
        this.props.activateReturn();
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title='Configuration des points des objectifs' />);
        this.props.handleMaxWidth('lg');
        this.props.configListActions.getConfigList(periodId);
        this.props.goalDefinitionListActions.getGoalDefinitionList(periodId, true);
        this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPoints(periodId);
        this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPoints(periodId)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { configs } = this.props.configList;
        const { points: collaboratorPoints } = this.props.goalDefinitionLevelCollaboratorPoints;
        const { points: teamPoints } = this.props.goalDefinitionLevelTeamPoints;
        const { definitions } = this.props.goalDefinitionList;
        const collaboratorGoalPoints = configs.find(x => x.code == 'CPG');
        const teamGoalPoints = configs.find(x => x.code == 'TPG');
        const usableCollaboratorGoalPoints = collaboratorGoalPoints.value - collaboratorPoints;
        const usableTeamGoalPoints = teamGoalPoints.value - teamPoints;
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
                { loading && this.renderLoader() }
                { !loading && configs && collaboratorPoints != null && teamPoints != null && definitions && this.renderData() }
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