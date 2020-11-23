import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubHeader } from './components'
import { TeamRanking } from '../../components'
import {EmptyState, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryDetailActions from '../../../../services/Categories/CategoryDetail/actions'
import * as teamCategoryRankListActions from '../../../../services/TeamCategoryRanks/TeamCategoryRankList/actions'
import {Redirect} from "react-router";

class TeamCategoryRanking extends MainLayoutComponent {
    componentDidMount() {
        this.categoryId = this.props.match.params.category;
        this.periodId = this.props.match.params.period
        this.props.activateReturn();
        this.props.handleTitle(Resources.RANKING_SHORT_TITLE);
        this.props.handleSubHeader(<SubHeader />);
        this.props.categoryDetailActions.getCategoryDetail(this.categoryId);
        this.props.teamCategoryRankListActions.getTeamCategoryRankListByCategory(this.categoryId, this.periodId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const categoryId = this.props.match.params.category
        const periodId = this.props.match.params.period
        if (this.categoryId != categoryId || this.periodId != periodId) {
            this.categoryId = categoryId
            this.periodId = periodId
            this.props.categoryDetailActions.getCategoryDetail(this.categoryId);
            this.props.teamCategoryRankListActions.getTeamCategoryRankListByCategory(this.categoryId, this.periodId)
        }
    }

    renderEmptyState() {
        return <EmptyState title={Resources.TEAM_CATEGORY_RANKING_EMPTY_STATE_TITLE} />
    }

    renderData() {
        const { ranks } = this.props.teamCategoryRankList;
        return <TeamRanking ranking={ranks} teamId={this.props.match.params.team} />
    }

    render() {
        const { account } = this.props.accountDetail;
        const { ranks, loading } = this.props.teamCategoryRankList;

        if (!account.hasCategoryRankAccess) {
            return <Redirect to='/' />
        }

        return (
            <div>
                { !loading && ranks && ranks.length > 0 && this.renderData() }
                { !loading && ranks && ranks.length == 0 && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, categoryDetail, teamCategoryRankList }) => ({
    accountDetail,
    categoryDetail,
    teamCategoryRankList
});

const mapDispatchTopProps = (dispatch) => ({
    categoryDetailActions: bindActionCreators(categoryDetailActions, dispatch),
    teamCategoryRankListActions: bindActionCreators(teamCategoryRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchTopProps)(TeamCategoryRanking)
