import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { RankList } from '..'
import {EmptyState, Loader} from '../../../../../../components'
import * as collaboratorCategoryRankListActions from '../../../../../../services/CollaboratorCategoryRanks/CollaboratorCategoryRankList/actions'
import * as collaboratorChallengeGeneralRankDetailActions from '../../../../../../services/CollaboratorChallengeGeneralRanks/CollaboratorChallengeGeneralRankDetail/actions'
import * as collaboratorGeneralRankDetailActions from '../../../../../../services/CollaboratorGeneralRanks/CollaboratorGeneralRankDetail/actions'

class PlayerRankList extends Component {
    constructor(props) {
        super(props);
        this.id = null;
        this.year = null
    }

    loadData(props) {
        const id = props.id;
        const year = props.year;
        if (id != this.id || year != this.year) {
            this.id = id;
            this.year = year;
            this.props.collaboratorCategoryRankListActions.getCollaboratorCategoryRankListByCollaborator(id, year);
            this.props.collaboratorChallengeGeneralRankDetailActions.getCollaboratorChallengeGeneralRankDetail(id, year);
            this.props.collaboratorGeneralRankDetailActions.getCollaboratorGeneralRankDetail(id, year)
        }
    }

    componentDidMount() {
        this.loadData(this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData(this.props)
    }

    handleGeneralClick = periodId => () => {
        this.props.history.push(`/rankings/general/collaborator/${periodId}`)
    };

    handleCategoryClick(id, periodId) {
        this.props.history.push(`/rankings/collaborator/category/${id}/${periodId}`)
    }

    handleChallengeClick = periodId => () => {
        this.props.history.push(`/rankings/challenge/collaborator/${periodId}`)
    };

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={'Aucun classement trouvé'} />
    }

    renderData() {
        const { ranks} = this.props.collaboratorCategoryRankList;
        const { rank: challengeRank} = this.props.collaboratorChallengeGeneralRankDetail;
        const { rank: generalRank} = this.props.collaboratorGeneralRankDetail;

        return <RankList
            challengeRank={challengeRank}
            generalRank={generalRank}
            generalRankIcon={faUser}
            categoryRanks={ranks}
            onGeneralClick={this.handleGeneralClick(generalRank.periodId).bind(this)}
            onCategoryClick={this.handleCategoryClick.bind(this)}
            onChallengeClick={this.handleChallengeClick(challengeRank.periodId).bind(this)}
        />
    }

    render() {
        const { ranks, loading: collaboratorCategoryRankListLoading } = this.props.collaboratorCategoryRankList;
        const { rank: challengeRank, loading: collaboratorChallengeGeneralRankDetailLoading } = this.props.collaboratorChallengeGeneralRankDetail;
        const { rank: generalRank, loading: collaboratorGeneralRankDetailLoading } = this.props.collaboratorGeneralRankDetail;
        const loading = collaboratorCategoryRankListLoading || collaboratorChallengeGeneralRankDetailLoading || collaboratorGeneralRankDetailLoading;
        
        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && ranks && (ranks.length > 0 || challengeRank || generalRank) && this.renderData() }
                { !loading && ranks && ranks.length == 0 && !challengeRank && !generalRank && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ collaboratorCategoryRankList, collaboratorChallengeGeneralRankDetail, collaboratorGeneralRankDetail }) => ({
    collaboratorCategoryRankList,
    collaboratorChallengeGeneralRankDetail,
    collaboratorGeneralRankDetail
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorCategoryRankListActions: bindActionCreators(collaboratorCategoryRankListActions, dispatch),
    collaboratorChallengeGeneralRankDetailActions: bindActionCreators(collaboratorChallengeGeneralRankDetailActions, dispatch),
    collaboratorGeneralRankDetailActions: bindActionCreators(collaboratorGeneralRankDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayerRankList))