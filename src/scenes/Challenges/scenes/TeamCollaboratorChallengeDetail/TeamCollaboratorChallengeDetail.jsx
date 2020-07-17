import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faEdit } from '@fortawesome/free-solid-svg-icons'
import { SubHeader } from './components'
import '../../../../helpers/DateHelper'
import { ChallengeCondition, CollaboratorChallengeRankList } from '../../components'
import { IconButton, MainLayoutComponent } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorChallengeRankListActions from '../../../../services/CollaboratorChallengeRanks/CollaboratorChallengeRankList/actions'
import * as teamCollaboratorChallengeDetailActions from '../../../../services/TeamCollaboratorChallenges/TeamCollaboratorChallengeDetail/actions'
import * as teamCollaboratorChallengeGoalListActions from '../../../../services/TeamCollaboratorChallengeGoals/TeamCollaboratorChallengeGoalList/actions'
import {Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    iconMargin: {
        marginLeft: 16
    }
};

class TeamCollaboratorChallengeDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        const { account } = this.props.accountDetail;
        this.initialized = false;
        this.state = {
            page: account.hasChallengeRankAccess ? 0 : 1
        }
    }

    handleDuplicate() {
        const { challenge } = this.props.teamCollaboratorChallengeDetail;
        var url = `/challenges/duplication/${challenge.sourceId}`;
        if (challenge.teamId) url += `?team=${challenge.teamId}`;
        this.props.history.push(url)
    }

    handleEdit() {
        const { challenge } = this.props.teamCollaboratorChallengeDetail;
        this.props.history.push(`/challenges/modification/${challenge.sourceId}`)
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
        this.props.collaboratorChallengeRankListActions.getCollaboratorChallengeRankListByTeamCollaboratorChallenge(id);
        this.props.teamCollaboratorChallengeDetailActions.getTeamCollaboratorChallengeDetail(id);
        this.props.teamCollaboratorChallengeGoalListActions.getTeamCollaboratorChallengeGoalList(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { challenge } = this.props.teamCollaboratorChallengeDetail;
        if (!this.initialized && challenge) {
            const { classes } = this.props;
            this.initialized = true;
            this.props.handleButtons(<div>
                <Tooltip title={Resources.TEAM_COLLABORATOR_CHALLENGE_DETAIL_DUPLICATE_BUTTON}>
                    <IconButton size={'small'} onClick={this.handleDuplicate.bind(this)}><FontAwesomeIcon icon={faCopy}/></IconButton>
                </Tooltip>
                { challenge.end.toDate2().getTime() > new Date().getTime() && <Tooltip title={Resources.TEAM_COLLABORATOR_CHALLENGE_DETAIL_UPDATE_BUTTON}>
                    <IconButton size={'small'} onClick={this.handleEdit.bind(this)} className={classes.iconMargin}><FontAwesomeIcon icon={faEdit}/></IconButton>
                </Tooltip> }
            </div>);
        }
    }

    render() {
        const { account } = this.props.accountDetail;
        const { ranks } = this.props.collaboratorChallengeRankList;
        const { challenge } = this.props.teamCollaboratorChallengeDetail;
        const { goals } = this.props.teamCollaboratorChallengeGoalList;

        return (
            <div>
                { account.hasChallengeRankAccess && this.state.page == 0 && ranks && <CollaboratorChallengeRankList ranks={ranks} /> }
                { this.state.page == 1 && challenge && goals && <ChallengeCondition challenge={challenge} goals={goals} /> }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorChallengeRankList, teamCollaboratorChallengeDetail, teamCollaboratorChallengeGoalList }) => ({
    accountDetail,
    collaboratorChallengeRankList,
    teamCollaboratorChallengeDetail,
    teamCollaboratorChallengeGoalList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorChallengeRankListActions: bindActionCreators(collaboratorChallengeRankListActions, dispatch),
    teamCollaboratorChallengeDetailActions: bindActionCreators(teamCollaboratorChallengeDetailActions, dispatch),
    teamCollaboratorChallengeGoalListActions: bindActionCreators(teamCollaboratorChallengeGoalListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamCollaboratorChallengeDetail))
