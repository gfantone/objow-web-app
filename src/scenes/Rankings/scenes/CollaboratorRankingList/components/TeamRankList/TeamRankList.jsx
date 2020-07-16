import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { RankList } from '..'
import {EmptyState, Loader} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as teamCategoryRankListActions from '../../../../../../services/TeamCategoryRanks/TeamCategoryRankList/actions'
import * as teamChallengeGeneralRankDetailActions from '../../../../../../services/TeamChallengeGeneralRanks/TeamChallengeGeneralRankDetail/actions'
import * as teamGeneralRankDetailActions from '../../../../../../services/TeamGeneralRanks/TeamGeneralRankDetail/actions'

class TeamRankList extends Component {
    constructor(props) {
        super(props);
        this.id = null;
        this.year = null
    }

    loadData(props) {
        const id = this.props.id;
        const year = this.props.year;
        if (id != this.id || year != this.year) {
            this.id = id;
            this.year = year;
            props.teamCategoryRankListActions.getTeamCategoryRankListByTeam(id, year);
            props.teamChallengeGeneralRankDetailActions.getTeamChallengeGeneralRankDetail(id, year);
            props.teamGeneralRankDetailActions.getTeamGeneralRankDetail(id, year)
        }

    }
    componentDidMount() {
        this.loadData(this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData(this.props)
    }

    handleGeneralClick = periodId => () => {
        const {collaborator} = this.props.collaboratorDetail
        const teamId = collaborator.team ? collaborator.team.id : null
        this.props.history.push(`/rankings/teams/${teamId}/general/${periodId}`)
    };

    handleCategoryClick(id, periodId) {
        const {collaborator} = this.props.collaboratorDetail
        const teamId = collaborator.team ? collaborator.team.id : null
        this.props.history.push(`/rankings/teams/${teamId}/categories/${id}/years/${periodId}`)
    }

    handleChallengeClick = periodId => () => {
        const {collaborator} = this.props.collaboratorDetail
        const teamId = collaborator.team ? collaborator.team.id : null
        this.props.history.push(`/rankings/teams/${teamId}/challenges/${periodId}`)
    };

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={Resources.TEAM_RANK_LIST_EMPTY_STATE_TITLE} />
    }

    renderData() {
        const { ranks} = this.props.teamCategoryRankList;
        const { rank: generalRank} = this.props.teamGeneralRankDetail;
        const { rank: challengeRank} = this.props.teamChallengeGeneralRankDetail;

        return <RankList
            generalRank={generalRank}
            generalRankIcon={faUsers}
            challengeRank={challengeRank}
            categoryRanks={ranks}
            onGeneralClick={this.handleGeneralClick(generalRank.periodId).bind(this)}
            onCategoryClick={this.handleCategoryClick.bind(this)}
            onChallengeClick={this.handleChallengeClick(challengeRank.periodId).bind(this)}
        />
    }

    render() {
        const { ranks, loading: teamCategoryRankListLoading } = this.props.teamCategoryRankList;
        const { rank: generalRank, loading: teamGeneralRankDetailLoading } = this.props.teamGeneralRankDetail;
        const { rank: challengeRank, loading: teamChallengeGeneralRankDetailLoading } = this.props.teamChallengeGeneralRankDetail;
        const loading = teamCategoryRankListLoading || teamGeneralRankDetailLoading || teamChallengeGeneralRankDetailLoading;

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && ranks && (ranks.length > 0 || generalRank || challengeRank) && this.renderData()}
                { !loading && (!ranks || ranks.length == 0) && !generalRank && !challengeRank && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({collaboratorDetail, teamCategoryRankList, teamChallengeGeneralRankDetail, teamGeneralRankDetail}) => ({
    collaboratorDetail,
    teamCategoryRankList,
    teamChallengeGeneralRankDetail,
    teamGeneralRankDetail
});

const mapDispatchToProps = (dispatch) => ({
    teamCategoryRankListActions: bindActionCreators(teamCategoryRankListActions, dispatch),
    teamChallengeGeneralRankDetailActions: bindActionCreators(teamChallengeGeneralRankDetailActions, dispatch),
    teamGeneralRankDetailActions: bindActionCreators(teamGeneralRankDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TeamRankList))
