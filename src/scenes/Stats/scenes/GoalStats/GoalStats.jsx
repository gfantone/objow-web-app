import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {StatsFilter} from '../../components'
import {EmptyState, Loader, MainLayoutComponent} from '../../../../components'
import * as collaboratorGoalCategoryListActions from '../../../../services/CollaboratorGoalCategories/CollaboratorGoalCategoryList/actions'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions'
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions'
import * as teamGoalCategoryListActions from '../../../../services/TeamGoalCategories/TeamGoalCategoryList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as Resources from '../../../../Resources'

class GoalStats extends MainLayoutComponent {
    state = {categoryId: null, collaboratorId: null, definitionId: null, periodId: null, teamId: null}

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
        this.props.goalDefinitionListActions.getAllGoalDefinitionList()
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
            } else if (this.state.teamId) {
                this.props.teamGoalCategoryListActions.getTeamGoalCategoryList(this.state.teamId, this.state.periodId)
            }
        })
    }

    handleFilterChange(categoryId, collaboratorId, definitionId, periodId, teamId) {
        const {definitions} = this.props.goalDefinitionList
        const collaboratorChanged = this.state.collaboratorId !== collaboratorId
        const definitionChanged = this.state.definitionId !== definitionId
        const teamChanged = this.state.teamId !== teamId

        this.setState({
            ...this.state,
            categoryId: categoryId,
            collaboratorId: collaboratorId,
            definitionId: definitionId,
            periodId: periodId,
            teamId: teamId
        }, () => {
            if (collaboratorChanged || teamChanged) {
                if (this.state.collaboratorId) {
                    this.props.collaboratorGoalCategoryListActions.getCollaboratorGoalCategories(this.state.collaboratorId, this.state.periodId)
                } else if (this.state.teamId) {
                    this.props.teamGoalCategoryListActions.getTeamGoalCategoryList(this.state.teamId, this.state.periodId)
                }
            }

            if (collaboratorChanged || teamChanged || definitionChanged) {
                const definition = definitions.find(x => x.id === this.state.definitionId)
                if (definition.type.code === 'C') {
                    if (this.state.collaboratorId) {

                    } else if (this.state.teamId) {

                    }
                } else if (definition.type.code === 'T') {
                    if (this.state.collaboratorId) {

                    } else if (this.state.teamId) {

                    }
                }
            }
        })
    }

    renderData() {
        return (
            <div></div>
        )
    }

    renderEmptyState() {
        return <EmptyState title={Resources.STATS_GOALS_EMPTY_STATE_TITLE} message={Resources.STATS_GOALS_EMPTY_STATE_MESSAGE} />
    }

    renderFilter() {
        const {categories: collaboratorCategories, loading: collaboratorGoalCategoryListLoading} = this.props.collaboratorGoalCategoryList
        const {period: currentPeriod} = this.props.currentPeriodDetail
        const {definitions} = this.props.goalDefinitionList
        const {periods: previousPeriods} = this.props.previousPeriodList
        const {categories : teamCategories, loading: teamGoalCategoryListLoading} = this.props.teamGoalCategoryList
        const {teams} = this.props.teamList
        const categories = this.state.collaboratorId ? collaboratorCategories : this.state.teamId ? teamCategories : []
        const categoryLoading = collaboratorGoalCategoryListLoading || teamGoalCategoryListLoading
        const periods = [currentPeriod].concat(previousPeriods)

        return (
            <div>
                <StatsFilter
                    categories={categories}
                    categoryId={this.state.categoryId}
                    categoryLoading={categoryLoading}
                    collaboratorId={this.state.collaboratorId}
                    definitions={definitions}
                    periods={periods}
                    teamId={this.state.teamId}
                    teams={teams}
                    onChange={this.handleFilterChange.bind(this)}
                />
            </div>
        )
    }

    renderLoader() {
        return <Loader centered />
    }

    render() {
        const {period: currentPeriod, loading: currentPeriodDetailLoading} = this.props.currentPeriodDetail
        const {definitions, loading: goalDefinitionListLoading} = this.props.goalDefinitionList
        const {periods: previousPeriods, loading: previousPeriodListLoading} = this.props.previousPeriodList
        const {teams, loading: teamListLoading} = this.props.teamList
        const filterLoading = currentPeriodDetailLoading || goalDefinitionListLoading || previousPeriodListLoading || teamListLoading

        return (
            <div>
                {!filterLoading && currentPeriod && definitions && previousPeriods && teams && this.renderFilter()}
                {filterLoading && this.renderLoader()}
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, collaboratorGoalCategoryList, currentPeriodDetail, goalDefinitionList, previousPeriodList, teamGoalCategoryList, teamList}) => ({
    accountDetail,
    collaboratorGoalCategoryList,
    currentPeriodDetail,
    goalDefinitionList,
    previousPeriodList,
    teamGoalCategoryList,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorGoalCategoryListActions: bindActionCreators(collaboratorGoalCategoryListActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    goalDefinitionListActions: bindActionCreators(goalDefinitionListActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch),
    teamGoalCategoryListActions: bindActionCreators(teamGoalCategoryListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoalStats))
