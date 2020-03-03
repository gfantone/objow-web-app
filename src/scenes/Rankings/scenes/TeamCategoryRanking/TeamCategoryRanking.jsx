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
        const id = this.props.match.params.id;
        this.props.activateReturn();
        this.props.handleTitle('Classements');
        this.props.handleSubHeader(<SubHeader />);
        this.props.categoryDetailActions.getCategoryDetail(id);
        this.props.teamCategoryRankListActions.getTeamCategoryRankListByCategory(id, this.props.match.params.periodId)
    }

    renderEmptyState() {
        return <EmptyState title={'Aucun classement disponible'} />
    }

    renderData() {
        const { ranks } = this.props.teamCategoryRankList;
        return <TeamRanking ranking={ranks} />
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
