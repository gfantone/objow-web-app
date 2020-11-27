import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {StatsFilter} from '../../components'
import {Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions'
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions'
import * as teamGoalCategoryListActions from '../../../../services/TeamGoalCategories/TeamGoalCategoryList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'

class TeamCollaboratorGoalStats extends MainLayoutComponent {
    constructor(props) {
        super(props)
        this.categoryId = null
        this.periodId = null
        this.teamId = null
    }

    componentDidMount() {
        this.categoryId = Number(this.props.match.params.categoryId)
        this.periodId = null
        this.teamId = Number(this.props.match.params.teamId)
        this.props.handleTitle(Resources.STATS_TITLE)
        this.props.activateReturn()
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail()
        this.props.previousPeriodListActions.getPreviousPeriodList()
        this.props.goalDefinitionListActions.getAllGoalDefinitionList()
        this.props.teamGoalCategoryListActions.getTeamGoalCategoryList(this.teamId, this.periodId)
        this.props.teamListActions.getTeamList()
    }

    renderData() {
        const {period: currentPeriod} = this.props.currentPeriodDetail
        const {definitions} = this.props.goalDefinitionList
        const {periods: previousPeriods} = this.props.previousPeriodList
        const {categories} = this.props.teamGoalCategoryList
        const {teams} = this.props.teamList
        const periods = [currentPeriod].concat(previousPeriods)

        return (
            <div>
                <StatsFilter
                    categoryId={this.categoryId}
                    categories={categories}
                    definitions={definitions}
                    periods={periods}
                    teamId={this.teamId}
                    teams={teams}
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
        const {categories, loading: teamGoalCategoryListLoading} = this.props.teamGoalCategoryList
        const {teams, loading: teamListLoading} = this.props.teamList
        const loading = currentPeriodDetailLoading || goalDefinitionListLoading || previousPeriodListLoading || teamGoalCategoryListLoading || teamListLoading

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && currentPeriod && definitions && previousPeriods && categories && teams && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, currentPeriodDetail, goalDefinitionList, previousPeriodList, teamGoalCategoryList, teamList}) => ({
    accountDetail,
    currentPeriodDetail,
    goalDefinitionList,
    previousPeriodList,
    teamGoalCategoryList,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    goalDefinitionListActions: bindActionCreators(goalDefinitionListActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch),
    teamGoalCategoryListActions: bindActionCreators(teamGoalCategoryListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamCollaboratorGoalStats)
