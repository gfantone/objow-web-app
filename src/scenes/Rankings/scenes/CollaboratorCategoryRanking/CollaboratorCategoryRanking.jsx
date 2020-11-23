import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubHeader } from './components'
import { PlayerRanking } from '../../components'
import {EmptyState, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryDetailActions from '../../../../services/Categories/CategoryDetail/actions'
import * as collaboratorCategoryRankListActions from '../../../../services/CollaboratorCategoryRanks/CollaboratorCategoryRankList/actions'
import {Redirect} from "react-router";

class PlayerCategoryRanking extends MainLayoutComponent {
    componentDidMount() {
        this.categoryId = this.props.match.params.category;
        this.periodId = this.props.match.params.period
        this.props.activateReturn();
        this.props.handleTitle(Resources.RANKING_SHORT_TITLE);
        this.props.handleSubHeader(<SubHeader />);
        this.props.handleMaxWidth('md');
        this.props.categoryDetailActions.getCategoryDetail(this.categoryId);
        this.props.collaboratorCategoryRankListActions.getCollaboratorCategoryRankListByCategory(this.categoryId, this.periodId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const categoryId = this.props.match.params.category
        const periodId = this.props.match.params.period
        if (this.categoryId != categoryId || this.periodId != periodId) {
            this.categoryId = categoryId
            this.periodId = periodId
            this.props.categoryDetailActions.getCategoryDetail(this.categoryId);
            this.props.collaboratorCategoryRankListActions.getCollaboratorCategoryRankListByCategory(this.categoryId, this.periodId)
        }
    }

    renderEmptyState() {
        return <EmptyState title={Resources.COLLABORATOR_CATEGORY_RANKING_EMPTY_STATE_TITLE} />
    }

    renderData() {
        const { ranks } = this.props.collaboratorCategoryRankList;
        return <PlayerRanking ranking={ranks} collaboratorId={this.props.match.params.collaborator} />
    }

    render() {
        const { account } = this.props.accountDetail;
        const { ranks, loading } = this.props.collaboratorCategoryRankList;

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

const mapStateToProps = ({ accountDetail, categoryDetail, collaboratorCategoryRankList }) => ({
    accountDetail,
    categoryDetail,
    collaboratorCategoryRankList
});

const mapDispatchToProps = (dispatch) => ({
    categoryDetailActions: bindActionCreators(categoryDetailActions, dispatch),
    collaboratorCategoryRankListActions: bindActionCreators(collaboratorCategoryRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCategoryRanking)
