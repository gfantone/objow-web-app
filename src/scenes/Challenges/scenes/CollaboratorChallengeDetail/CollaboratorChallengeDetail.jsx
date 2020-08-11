import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubHeader } from './components'
import { ChallengeCondition, CollaboratorChallengeRankList } from '../../components'
import {MainLayoutComponent} from '../../../../components'
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

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    componentDidMount() {
        const { account } = this.props.accountDetail;
        const id = this.props.match.params.id;
        this.props.handleTitle(Resources.CHALLENGE_SHORT_TITLE);
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasChallengeRankAccess} />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.collaboratorChallengeDetailActions.getCollaboratorChallengeDetail(id);
        this.props.collaboratorChallengeGoalListActions.getCollaboratorChallengeGoalList(id);
        this.props.collaboratorChallengeRankListActions.getCollaboratorChallengeRankListByCollaboratorChallenge(id)
    }

    render() {
        const { account } = this.props.accountDetail;
        const { challenge } = this.props.collaboratorChallengeDetail;
        const { goals } = this.props.collaboratorChallengeGoalList;
        const { ranks } = this.props.collaboratorChallengeRankList;

        return (
            <div>
                { account.hasChallengeRankAccess && this.state.page == 0 && challenge && ranks && <CollaboratorChallengeRankList ranks={ranks} collaboratorId={challenge.collaboratorId} /> }
                { this.state.page == 1 && challenge && goals && <ChallengeCondition challenge={challenge} goals={goals} /> }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorChallengeDetail, collaboratorChallengeGoalList, collaboratorChallengeRankList }) => ({
    accountDetail,
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
