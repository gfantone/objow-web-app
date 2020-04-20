import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubHeader } from './components'
import { TeamRanking } from '../../components'
import {EmptyState, MainLayoutComponent} from '../../../../components'
import * as categoryDetailActions from '../../../../services/Categories/CategoryDetail/actions'
import * as teamCategoryRankListActions from '../../../../services/TeamCategoryRanks/TeamCategoryRankList/actions'
import {Redirect} from "react-router";

class TeamCategoryRanking extends MainLayoutComponent {
    componentDidMount() {
        const categoryId = this.props.match.params.category;
        this.props.activateReturn();
        this.props.handleTitle('Classements');
        this.props.handleSubHeader(<SubHeader />);
        this.props.categoryDetailActions.getCategoryDetail(categoryId);
        this.props.teamCategoryRankListActions.getTeamCategoryRankListByCategory(categoryId, this.props.match.params.period)
    }

    renderEmptyState() {
        return <EmptyState title={'Aucun classement disponible'} />
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
