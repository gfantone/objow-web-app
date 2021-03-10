import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSlidersH} from '@fortawesome/free-solid-svg-icons'
import { SubHeader } from './components'
import { ChallengeCondition, CollaboratorChallengeRankList, ChallengeDetailFilter } from '../../components'
import { MainLayoutComponent, IconButton } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorChallengeDetailActions from '../../../../services/CollaboratorChallenges/CollaboratorChallengeDetail/actions'
import * as collaboratorChallengeGoalListActions from '../../../../services/CollaboratorChallengeGoals/CollaboratorChallengeGoalList/actions'
import * as collaboratorChallengeRankListActions from '../../../../services/CollaboratorChallengeRanks/CollaboratorChallengeRankList/actions'

class CollaboratorChallengeDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        const { account } = this.props.accountDetail;
        this.state = {
            page: account.hasChallengeRankAccess ? 0 : 1
        }
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

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }
    refresh(team) {
        const id = this.props.match.params.id
        var url = `/challenges/detail/collaborator/${id}`;
        if(team) url += `?team=${team}`;
        this.props.history.replace(url)
    }

    handleFilterChange(team) {
        this.refresh(team)
    }

    componentDidMount() {
        const { account } = this.props.accountDetail;
        const id = this.props.match.params.id;

        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_SHORT_TITLE);
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasChallengeRankAccess} />);
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.collaboratorChallengeDetailActions.getCollaboratorChallengeDetail(id);
        this.props.collaboratorChallengeGoalListActions.getCollaboratorChallengeGoalList(id);
        this.props.collaboratorChallengeRankListActions.getCollaboratorChallengeRankListByCollaboratorChallenge(id)
    }

    render() {
        const { account } = this.props.accountDetail;
        const { challenge } = this.props.collaboratorChallengeDetail;
        const { collaborator, loading: collaboratorDetailLoading } = this.props.collaboratorDetail;
        const { goals } = this.props.collaboratorChallengeGoalList;
        const { ranks } = this.props.collaboratorChallengeRankList;
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null;
        const collaboratorId = collaborator ? collaborator.id : null;
        if(!account.hasChallengeAccess) {
          return <Redirect to={'/'} />
        }
        // Filter by team
        const params = new URLSearchParams(window.location.search);
        const team = params.get('team');

        return (
            <div>
                { account.hasChallengeRankAccess && this.state.page == 0 && challenge && ranks &&
                  <CollaboratorChallengeRankList
                    ranks={ team ? ranks.filter(rank => rank.collaborator.team.id === parseInt(team)) : ranks}
                    collaboratorId={challenge.collaboratorId}
                  />
                }
                { this.state.page == 1 && challenge && goals && <ChallengeCondition challenge={challenge} goals={goals} /> }
                <ChallengeDetailFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    team={team}
                    myTeam={ account.team }
                />
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorDetail, collaboratorChallengeDetail, collaboratorChallengeGoalList, collaboratorChallengeRankList }) => ({
    accountDetail,
    collaboratorDetail,
    collaboratorChallengeDetail,
    collaboratorChallengeGoalList,
    collaboratorChallengeRankList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorChallengeDetailActions: bindActionCreators(collaboratorChallengeDetailActions, dispatch),
    collaboratorChallengeGoalListActions: bindActionCreators(collaboratorChallengeGoalListActions, dispatch),
    collaboratorChallengeRankListActions: bindActionCreators(collaboratorChallengeRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorChallengeDetail)
