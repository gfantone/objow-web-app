import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubHeader } from './components'
import { PlayerRanking } from '../../components'
import {EmptyState, MainLayoutComponent} from '../../../../components'
import * as categoryDetailActions from '../../../../services/Categories/CategoryDetail/actions'
import * as collaboratorCategoryRankListActions from '../../../../services/CollaboratorCategoryRanks/CollaboratorCategoryRankList/actions'
import {Redirect} from "react-router";

class PlayerCategoryRanking extends MainLayoutComponent {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.activateReturn();
        this.props.handleTitle('Classements');
        this.props.handleSubHeader(<SubHeader />);
        this.props.handleMaxWidth('md');
        this.props.categoryDetailActions.getCategoryDetail(id);
        this.props.collaboratorCategoryRankListActions.getCollaboratorCategoryRankListByCategory(id, this.props.match.params.periodId)
    }

    renderEmptyState() {
        return <EmptyState title={'Aucun classement disponible'} />
    }

    renderData() {
        const { ranks } = this.props.collaboratorCategoryRankList;
        return <PlayerRanking ranking={ranks} />
    }

    render() {
        const { account } = this.props.auth;
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

const mapStateToProps = ({ auth, categoryDetail, collaboratorCategoryRankList }) => ({
    auth,
    categoryDetail,
    collaboratorCategoryRankList
});

const mapDispatchToProps = (dispatch) => ({
    categoryDetailActions: bindActionCreators(categoryDetailActions, dispatch),
    collaboratorCategoryRankListActions: bindActionCreators(collaboratorCategoryRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCategoryRanking)
