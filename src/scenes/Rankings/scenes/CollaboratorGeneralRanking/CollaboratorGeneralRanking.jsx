import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PlayerRanking } from '../../components'
import {AppBarSubTitle, EmptyState, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorGeneralRankListActions from '../../../../services/CollaboratorGeneralRanks/CollaboratorGeneralRankList/actions'
import {Redirect} from "react-router";

class CollaboratorGeneralRanking extends MainLayoutComponent {
    componentDidMount() {
        this.props.activateReturn();
        this.props.handleTitle(Resources.RANKING_SHORT_TITLE);
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.COLLABORATOR_GENERAL_RANKING_TITLE} />);
        this.props.handleMaxWidth('md');
        this.props.collaboratorGeneralRankListActions.getCollaboratorGeneralRankList(this.props.match.params.period)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={Resources.COLLABORATOR_GENERAL_RANKING_EMPTY_STATE_TITLE} />
    }

    renderData() {
        const { ranks } = this.props.collaboratorGeneralRankList;
        return <PlayerRanking ranking={ranks} collaboratorId={this.props.match.params.collaborator} />
    }

    render() {
        const { account } = this.props.accountDetail;
        const { ranks, loading } = this.props.collaboratorGeneralRankList;

        if (!account.hasGeneralRankAccess) {
            return <Redirect to='/' />
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && ranks && ranks.length > 0 && this.renderData() }
                { !loading && ranks && ranks.length == 0 && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorGeneralRankList }) => ({
    accountDetail,
    collaboratorGeneralRankList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorGeneralRankListActions: bindActionCreators(collaboratorGeneralRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorGeneralRanking)
