import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSlidersH} from '@fortawesome/free-solid-svg-icons'
import { PlayerRanking, RankingFilter } from '../../components'
import {AppBarSubTitle, EmptyState, Loader, MainLayoutComponent, IconButton} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorListActions from '../../../../services/Collaborators/CollaboratorList/actions'
import * as collaboratorChallengeGeneralRankListActions from '../../../../services/CollaboratorChallengeGeneralRanks/CollaboratorChallengeGeneralRankList/actions'

class CollaboratorChallengeRanking extends MainLayoutComponent {

    constructor(props) {
        super(props);

        this.state = {
        }
    }
    componentDidMount() {
        const isCollaborator = this.props.accountDetail.account.role.code == 'C';
        const title = isCollaborator ? Resources.RANKING_OWNER_TITLE : Resources.RANKING_LONG_TITLE;
        this.props.handleTitle(title);
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.COLLABORATOR_CHALLENGE_RANKING_TITLE} />);
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.collaboratorChallengeGeneralRankListActions.getCollaboratorChallengeGeneralRankList(this.props.match.params.period)
        this.props.collaboratorListActions.getCollaboratorList();
    }

    handleFilterOpen() {
        this.setState({
            ...this.state,
            filterOpen: true
        })
    }

    handleFilterClose() {
        this.setState({
            ...this.state,
            filterOpen: false
        })
    }

    refresh(team) {
        const { collaborator, period } = this.props.match.params

        var url = `/rankings/collaborators/${collaborator}/challenges/${period}`;
        if(team) url += `?team=${team}`;
        this.props.history.replace(url)
    }

    handleFilterChange(team) {
        this.refresh(team)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={Resources.COLLABORATOR_CHALLENGE_RANKING_EMPTY_STATE_TITLE} />
    }

    addColorToRanks(ranks, collaborators) {
      return collaborators ? ranks.map(rank => (
        Object.assign({}, rank, {color: _.get(
          collaborators.find(collaborator => collaborator.id === rank.collaboratorId)
          , 'team.color.hex')})
      )) : ranks
    }

    renderData() {
        const { ranks } = this.props.collaboratorChallengeGeneralRankList;
        const { collaborators } = this.props.collaboratorList;

        // Filter by team
        const params = new URLSearchParams(window.location.search);
        const team = params.get('team');

        return <PlayerRanking ranking={
          team ? this.addColorToRanks(ranks, collaborators).filter(rank =>
            _.get(collaborators.find(c => c.id === _.get(rank, 'collaboratorId')), 'team.id') === parseInt(team)
          ) : this.addColorToRanks(ranks, collaborators)
        } collaboratorId={this.props.match.params.collaborator} />
    }

    render() {
        const { account } = this.props.accountDetail;
        const { ranks, loading } = this.props.collaboratorChallengeGeneralRankList;
        const { collaborators, loading: collaboratorLoading } = this.props.collaboratorList;

        if (!account.hasChallengeRankAccess) {
            return <Redirect to='/' />
        }
        const params = new URLSearchParams(window.location.search);
        const team = params.get('team');

        return (
            <div>
                { loading && collaboratorLoading && this.renderLoader() }
                { !loading && ranks && ranks.length > 0 && this.renderData() }
                { !loading && ranks && ranks.length == 0 && this.renderEmptyState() }
                <RankingFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    team={team}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorList, collaboratorChallengeGeneralRankList }) => ({
    accountDetail,
    collaboratorList,
    collaboratorChallengeGeneralRankList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorListActions: bindActionCreators(collaboratorListActions, dispatch),
    collaboratorChallengeGeneralRankListActions: bindActionCreators(collaboratorChallengeGeneralRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorChallengeRanking)
