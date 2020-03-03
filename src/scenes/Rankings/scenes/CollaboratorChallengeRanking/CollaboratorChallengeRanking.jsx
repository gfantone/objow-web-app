import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PlayerRanking } from '../../components'
import {AppBarSubTitle, EmptyState, Loader, MainLayoutComponent} from '../../../../components'
import * as collaboratorChallengeGeneralRankListActions from '../../../../services/CollaboratorChallengeGeneralRanks/CollaboratorChallengeGeneralRankList/actions'

class CollaboratorChallengeRanking extends MainLayoutComponent {
    componentDidMount() {
        const isCollaborator = this.props.accountDetail.account.role.code == 'C';
        const title = isCollaborator ? 'Mes classemenst' : 'Les classements';
        this.props.handleTitle(title);
        this.props.handleSubHeader(<AppBarSubTitle title='Classement des challenges individuels' />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.collaboratorChallengeGeneralRankListActions.getCollaboratorChallengeGeneralRankList(this.props.match.params.period)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={'Aucun classement disponible'} />
    }

    renderData() {
        const { ranks } = this.props.collaboratorChallengeGeneralRankList;
        return <PlayerRanking ranking={ranks} />
    }

    render() {
        const { account } = this.props.accountDetail;
        const { ranks, loading } = this.props.collaboratorChallengeGeneralRankList;

        if (!account.hasChallengeRankAccess) {
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

const mapStateToProps = ({ accountDetail, collaboratorChallengeGeneralRankList }) => ({
    accountDetail,
    collaboratorChallengeGeneralRankList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorChallengeGeneralRankListActions: bindActionCreators(collaboratorChallengeGeneralRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorChallengeRanking)
