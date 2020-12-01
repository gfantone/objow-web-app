import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {Chart, StatsFilter} from './components'
import {Card, DefaultTitle, EmptyState, Loader, MainLayoutComponent} from '../../../../components'
import * as collaboratorGoalCategoryListActions from '../../../../services/CollaboratorGoalCategories/CollaboratorGoalCategoryList/actions'
import * as collaboratorGoalSummaryListActions from '../../../../services/CollaboratorGoalSummaries/CollaboratorGoalSummaryList/actions'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions'
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions'
import * as teamCollaboratorGoalListActions from '../../../../services/TeamCollaboratorGoals/TeamCollaboratorGoalList/actions'
import * as teamGoalCategoryListActions from '../../../../services/TeamGoalCategories/TeamGoalCategoryList/actions'
import * as teamGoalSummaryListActions from '../../../../services/TeamGoalSummaries/TeamGoalSummaryList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as Resources from '../../../../Resources'

class GoalStats extends MainLayoutComponent {
    state = {categoryId: null, collaboratorId: null, definitionId: null, periodId: null, teamId: null}

    constructor(props) {
        super(props)
        this.props.collaboratorGoalSummaryListActions.clearCollaboratorGoalSummaryList()
        this.props.teamCollaboratorGoalListActions.clearTeamCollaboratorGoalList()
        this.props.teamGoalSummaryListActions.clearTeamGoalSummaryList()
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search)
        const categoryIdParam = params.get('category')
        const collaboratorIdParam = params.get('collaborator')
        const periodIdParam = params.get('period')
        const teamIdParam = params.get('team')
        const categoryId = categoryIdParam ? Number(categoryIdParam) : null
        const collaboratorId = collaboratorIdParam ? Number(collaboratorIdParam) : null
        const periodId = periodIdParam ? Number(periodIdParam) : null
        const teamId = teamIdParam ? Number(teamIdParam) : null
        this.props.handleTitle(Resources.STATS_TITLE)
        this.props.activateReturn()
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail()
        this.props.previousPeriodListActions.getPreviousPeriodList()
        this.props.teamListActions.getTeamList()
        this.setState({
            ...this.state,
            categoryId: categoryId,
            collaboratorId: collaboratorId,
            periodId: periodId,
            teamId: teamId
        }, () => {
            if (this.state.collaboratorId) {
                this.props.collaboratorGoalCategoryListActions.getCollaboratorGoalCategories(this.state.collaboratorId, this.state.periodId)
                this.props.goalDefinitionListActions.getGoalDefinitionListByCollaborator(this.state.collaboratorId, this.state.periodId)
            } else if (this.state.teamId) {
                this.props.teamGoalCategoryListActions.getTeamGoalCategoryList(this.state.teamId, this.state.periodId)
                this.props.goalDefinitionListActions.getGoalDefinitionListByTeam(this.state.periodId, this.state.teamId)
            }
        })
    }

    handleFilterChange(categoryId, collaboratorId, definitionId, periodId, teamId) {
        const {definitions} = this.props.goalDefinitionList
        const collaboratorChanged = this.state.collaboratorId !== collaboratorId
        const definitionChanged = this.state.definitionId !== definitionId
        const periodChanged = this.state.periodId !== periodId
        const teamChanged = this.state.teamId !== teamId

        this.setState({
            ...this.state,
            categoryId: categoryId,
            collaboratorId: collaboratorId,
            definitionId: definitionId,
            periodId: periodId,
            teamId: teamId
        }, () => {
            if (collaboratorChanged || periodChanged || teamChanged) {
                if (this.state.collaboratorId) {
                    this.props.collaboratorGoalCategoryListActions.getCollaboratorGoalCategories(this.state.collaboratorId, this.state.periodId)
                    this.props.goalDefinitionListActions.getGoalDefinitionListByCollaborator(this.state.collaboratorId, this.state.periodId)
                } else if (this.state.teamId) {
                    this.props.teamGoalCategoryListActions.getTeamGoalCategoryList(this.state.teamId, this.state.periodId)
                    this.props.goalDefinitionListActions.getGoalDefinitionListByTeam(this.state.periodId, this.state.teamId)
                }
            }

            if ((collaboratorChanged || teamChanged || definitionChanged) && this.state.definitionId) {
                const definition = definitions.find(x => x.id === this.state.definitionId)
                if (definition) {
                    if (definition.typeCode === 'C') {
                        if (this.state.collaboratorId) {
                            this.props.teamCollaboratorGoalListActions.clearTeamCollaboratorGoalList()
                            this.props.teamGoalSummaryListActions.clearTeamGoalSummaryList()
                            this.props.collaboratorGoalSummaryListActions.getCollaboratorGoalSummaryListByDefinitionAndCollaborator(definition.id, this.state.collaboratorId)
                        } else if (this.state.teamId) {
                            this.props.collaboratorGoalSummaryListActions.clearCollaboratorGoalSummaryList()
                            this.props.teamGoalSummaryListActions.clearTeamGoalSummaryList()
                            this.props.teamCollaboratorGoalListActions.getTeamCollaboratorGoalListByDefinitionAndTeam(definition.id, this.state.teamId)
                        }
                    } else if (definition.typeCode === 'T') {
                        if (this.state.collaboratorId) {
                            this.props.collaboratorGoalSummaryListActions.clearCollaboratorGoalSummaryList()
                            this.props.teamCollaboratorGoalListActions.clearTeamCollaboratorGoalList()
                            this.props.teamGoalSummaryListActions.getTeamGoalSummaryListByDefinitionAndCollaborator(definition.id, this.state.collaboratorId)
                        } else if (this.state.teamId) {
                            this.props.collaboratorGoalSummaryListActions.clearCollaboratorGoalSummaryList()
                            this.props.teamCollaboratorGoalListActions.clearTeamCollaboratorGoalList()
                            this.props.teamGoalSummaryListActions.getTeamGoalSummaryListByDefinitionAndTeam(definition.id, this.state.teamId)
                        }
                    }
                }
            }
        })
    }

    renderData() {
        const {goals: collaboratorGoalSummaryListGoals} = this.props.collaboratorGoalSummaryList
        const {period: currentPeriod} = this.props.currentPeriodDetail
        const {periods: previousPeriods} = this.props.previousPeriodList
        const {goals: teamCollaboratorGoalListGoals} = this.props.teamCollaboratorGoalList
        const {goals: teamGoalSummaryListGoals} = this.props.teamGoalSummaryList
        const periods = [currentPeriod].concat(previousPeriods)
        const period = periods.find(x => x.id === this.state.periodId)
        const periodStart = '{0}-{1}-{2}'.format(period.start.toDate2().getFullYear(), period.start.toDate2().getMonth() + 1, period.start.toDate2().getDate())
        const periodEnd = '{0}-{1}-{2}'.format(period.end.toDate2().getFullYear(), period.end.toDate2().getMonth() + 1, period.end.toDate2().getDate())
        const goals = collaboratorGoalSummaryListGoals ? collaboratorGoalSummaryListGoals : teamCollaboratorGoalListGoals ? teamCollaboratorGoalListGoals : teamGoalSummaryListGoals ? teamGoalSummaryListGoals : []
        const pointData = goals.map(x => ({
            color: x.color,
            counter: x.counter,
            maxPoints: x.maxPoints,
            points: x.points,
            target: x.target,
            typeCode: x.type,
            x: '{0}-{1}-{2}'.format(x.end.toDate2().getFullYear(), x.end.toDate2().getMonth() + 1, x.end.toDate2().getUTCDate()),
            y: Math.round((x.counter / x.target) * 100)
        }))
        const data = [
            {
                id: 'japan',
                color: '#00E58D',
                data: pointData
            }
        ]

        return (
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <DefaultTitle>Performances</DefaultTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <div style={{height: 600}}>
                                <Chart data={data} end={periodEnd} start={periodStart} />
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    renderEmptyState() {
        return (
            <Grid item xs={12}>
                <EmptyState title={Resources.STATS_GOALS_EMPTY_STATE_TITLE} message={Resources.STATS_GOALS_EMPTY_STATE_MESSAGE} />
            </Grid>
        )
    }

    renderFilter() {
        const {categories: collaboratorCategories, loading: collaboratorGoalCategoryListLoading} = this.props.collaboratorGoalCategoryList
        const {period: currentPeriod} = this.props.currentPeriodDetail
        const {definitions, loading: definitionLoading} = this.props.goalDefinitionList
        const {periods: previousPeriods} = this.props.previousPeriodList
        const {categories : teamCategories, loading: teamGoalCategoryListLoading} = this.props.teamGoalCategoryList
        const {teams} = this.props.teamList
        const categories = this.state.collaboratorId ? collaboratorCategories : this.state.teamId ? teamCategories : []
        const categoryLoading = collaboratorGoalCategoryListLoading || teamGoalCategoryListLoading
        const periods = [currentPeriod].concat(previousPeriods)

        return (
            <Grid item xs={12}>
                <StatsFilter
                    categories={categories}
                    categoryId={this.state.categoryId}
                    categoryLoading={categoryLoading}
                    collaboratorId={this.state.collaboratorId}
                    definitionLoading={definitionLoading}
                    definitions={definitions}
                    periods={periods}
                    teamId={this.state.teamId}
                    teams={teams}
                    onChange={this.handleFilterChange.bind(this)}
                />
            </Grid>
        )
    }

    renderLoader() {
        return (
            <Grid item xs={12}>
                <Loader centered />
            </Grid>
        )
    }

    render() {
        const {period: currentPeriod, loading: currentPeriodDetailLoading} = this.props.currentPeriodDetail
        const {periods: previousPeriods, loading: previousPeriodListLoading} = this.props.previousPeriodList
        const {teams, loading: teamListLoading} = this.props.teamList
        const filterLoading = currentPeriodDetailLoading || previousPeriodListLoading || teamListLoading
        const canDisplayFilter = !filterLoading && currentPeriod && previousPeriods && teams && this.state.periodId
        const {goals: collaboratorGoalSummaryListGoals, loading: collaboratorGoalSummaryListLoading} = this.props.collaboratorGoalSummaryList
        const {goals: teamCollaboratorGoalListGoals, loading: teamCollaboratorGoalListLoading} = this.props.teamCollaboratorGoalList
        const {goals: teamGoalSummaryListGoals, loading: teamGoalSummaryListLoading} = this.props.teamGoalSummaryList
        const goals = collaboratorGoalSummaryListGoals ? collaboratorGoalSummaryListGoals : teamCollaboratorGoalListGoals ? teamCollaboratorGoalListGoals : teamGoalSummaryListGoals ? teamGoalSummaryListGoals : null
        const dataLoading = collaboratorGoalSummaryListLoading || teamCollaboratorGoalListLoading || teamGoalSummaryListLoading

        return (
            <Grid container spacing={4}>
                {canDisplayFilter && this.renderFilter()}
                {(dataLoading || filterLoading) && this.renderLoader()}
                {canDisplayFilter && this.state.definitionId && !dataLoading && goals && goals.length > 0 && this.renderData()}
                {canDisplayFilter && (!this.state.definitionId || (!dataLoading && goals && goals.length === 0)) && this.renderEmptyState()}
            </Grid>
        )
    }
}

const mapStateToProps = ({accountDetail, collaboratorGoalCategoryList, collaboratorGoalSummaryList, currentPeriodDetail, goalDefinitionList, previousPeriodList, teamCollaboratorGoalList, teamGoalCategoryList, teamGoalSummaryList, teamList}) => ({
    accountDetail,
    collaboratorGoalCategoryList,
    collaboratorGoalSummaryList,
    currentPeriodDetail,
    goalDefinitionList,
    previousPeriodList,
    teamCollaboratorGoalList,
    teamGoalCategoryList,
    teamGoalSummaryList,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorGoalCategoryListActions: bindActionCreators(collaboratorGoalCategoryListActions, dispatch),
    collaboratorGoalSummaryListActions: bindActionCreators(collaboratorGoalSummaryListActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    goalDefinitionListActions: bindActionCreators(goalDefinitionListActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch),
    teamCollaboratorGoalListActions: bindActionCreators(teamCollaboratorGoalListActions, dispatch),
    teamGoalCategoryListActions: bindActionCreators(teamGoalCategoryListActions, dispatch),
    teamGoalSummaryListActions: bindActionCreators(teamGoalSummaryListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoalStats))
