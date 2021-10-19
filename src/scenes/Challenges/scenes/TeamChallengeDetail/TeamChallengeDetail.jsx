import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { SubHeader } from './components'
import '../../../../helpers/DateHelper'
import { ChallengeCondition, TeamChallengeRankList } from '../../components'
import {IconButton, MainLayoutComponent, Dialog, DialogActions, DialogContent, DialogTitle, Button, ProgressButton} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamChallengeDetailActions from '../../../../services/TeamChallenges/TeamChallengeDetail/actions'
import * as teamChallengeGoalListActions from '../../../../services/TeamChallengeGoals/TeamChallengeGoalList/actions'
import * as teamChallengeRankListAction from '../../../../services/TeamChallengeRanks/TeamChallengeRankList/actions'
import * as challengeDeleteActions from '../../../../services/Challanges/ChallengeDelete/actions'
import {Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

const styles = {
    iconMargin: {
        marginLeft: 16
    }
};

class TeamChallengeDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        const { account } = this.props.accountDetail;
        this.initialized = false;
        this.state = {
            page: account.hasChallengeRankAccess && account.hasTeamRankAccess ? 0 : 1
        }
    }

    handleDuplicate() {
        const { challenge } = this.props.teamChallengeDetail;
        this.props.history.push(`/challenges/duplication/${challenge.sourceId}`)
    }

    handleEdit() {
        const { challenge } = this.props.teamChallengeDetail;
        this.props.history.push(`/challenges/modification/${challenge.sourceId}`)
    }

    async onDelete() {
        const { challenge } = this.props.teamChallengeDetail;

        await this.props.challengeDeleteActions.deleteChallenge(challenge);
        this.props.history.goBack();
    }
    setDeletePromptOpen(isOpen) {
      this.setState({
        ...this.state,
        deletePromptOpen: isOpen
      })
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

        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_SHORT_TITLE);
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasChallengeRankAccess && account.hasTeamRankAccess} />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.teamChallengeDetailActions.getTeamChallengeDetail(id);
        this.props.teamChallengeGoalListActions.getTeamChallengeGoalList(id);
        this.props.teamChallengeRankListAction.getTeamChallengeRankList(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { challenge } = this.props.teamChallengeDetail;
        if (!this.initialized && challenge) {
            const { account } = this.props.accountDetail;
            const { classes } = this.props;
            this.initialized = true;

            const includesManagerTeam = account.team && challenge.participantTeamIds.length === 1 && challenge.participantTeamIds.indexOf(account.team.id) >= 0
            const canEdit = account.hasManagerChallengeEditAccess && includesManagerTeam || account.role.code === 'A'
            if (canEdit) {
                this.props.handleButtons(<div>
                    <Tooltip title={Resources.TEAM_CHALLENGE_DETAIL_DUPLICATE_BUTTON}>
                        <IconButton size={'small'} onClick={this.handleDuplicate.bind(this)}><FontAwesomeIcon icon={faCopy}/></IconButton>
                    </Tooltip>

                    {challenge.end.toDate2().getTime() > new Date().getTime() && <Tooltip title={Resources.TEAM_COLLABORATOR_CHALLENGE_DETAIL_DELETE_BUTTON}>
                      <IconButton size={'small'} onClick={() => this.setDeletePromptOpen(true)} className={classes.iconMargin}><FontAwesomeIcon icon={faTrash}/></IconButton>
                    </Tooltip>}

                    {challenge.end.toDate2().getTime() > new Date().getTime() && <Tooltip title={Resources.TEAM_CHALLENGE_DETAIL_UPDATE_BUTTON}>
                        <IconButton size={'small'} onClick={this.handleEdit.bind(this)} className={classes.iconMargin}><FontAwesomeIcon icon={faEdit}/></IconButton>
                    </Tooltip>}
                </div>);
            }
        }
    }

    render() {
        const { account } = this.props.accountDetail;
        const { challenge } = this.props.teamChallengeDetail;
        const { goals } = this.props.teamChallengeGoalList;
        const { ranks, loading } = this.props.teamChallengeRankList;

        if(!account.hasChallengeAccess) {
          return <Redirect to={'/'} />
        }

        return (
            <div>
                { account.hasChallengeRankAccess && account.hasTeamRankAccess && this.state.page == 0 && challenge && ranks && <TeamChallengeRankList ranks={ranks} teamId={challenge.teamId} /> }
                { this.state.page == 1 && challenge && goals && <ChallengeCondition challenge={challenge} goals={goals} /> }
                <Dialog open={this.state.deletePromptOpen} onClose={() => this.setDeletePromptOpen(false)}>
                    <DialogTitle>Êtes-vous sûr de vouloir supprimer ce challenge ?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.setDeletePromptOpen(false)} color='secondary'>Non</Button>
                        <ProgressButton type='button' text='Oui' loading={loading} onClick={this.onDelete.bind(this)}/>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, teamChallengeDetail, teamChallengeGoalList, teamChallengeRankList }) => ({
    accountDetail,
    teamChallengeDetail,
    teamChallengeGoalList,
    teamChallengeRankList
});

const mapDispatchToProps = (dispatch) => ({
    teamChallengeDetailActions: bindActionCreators(teamChallengeDetailActions, dispatch),
    teamChallengeGoalListActions: bindActionCreators(teamChallengeGoalListActions, dispatch),
    teamChallengeRankListAction: bindActionCreators(teamChallengeRankListAction, dispatch),
    challengeDeleteActions: bindActionCreators(challengeDeleteActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamChallengeDetail))
