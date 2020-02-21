import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubHeader } from './components'
import '../../../../helpers/DateHelper'
import { ChallengeCondition, TeamChallengeRankList } from '../../components'
import {IconButton, MainLayoutComponent} from '../../../../components'
import * as teamChallengeDetailActions from '../../../../services/TeamChallenges/TeamChallengeDetail/actions'
import * as teamChallengeGoalListActions from '../../../../services/TeamChallengeGoals/TeamChallengeGoalList/actions'
import * as teamChallengeRankListAction from '../../../../services/TeamChallengeRanks/TeamChallengeRankList/actions'
import {Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faEdit} from "@fortawesome/free-solid-svg-icons";

const styles = {
    iconMargin: {
        marginLeft: 16
    }
};

class TeamChallengeDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        const { account } = this.props.auth;
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

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    componentDidMount() {
        const { account } = this.props.auth;
        const id = this.props.match.params.id;
        this.props.handleTitle('Challenges');
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
            const { account } = this.props.auth;
            const { classes } = this.props;
            this.initialized = true;
            if (account.role.code == 'A') {
                this.props.handleButtons(<div>
                    <Tooltip title={'Dupliquer'}>
                        <IconButton size={'small'} onClick={this.handleDuplicate.bind(this)}><FontAwesomeIcon icon={faCopy}/></IconButton>
                    </Tooltip>
                    {challenge.end.toDate2().getTime() > new Date().getTime() && <Tooltip title={'Éditer'}>
                        <IconButton size={'small'} onClick={this.handleEdit.bind(this)} className={classes.iconMargin}><FontAwesomeIcon icon={faEdit}/></IconButton>
                    </Tooltip>}
                </div>);
            }
        }
    }

    render() {
        const { account } = this.props.auth;
        const { challenge } = this.props.teamChallengeDetail;
        const { goals } = this.props.teamChallengeGoalList;
        const { ranks } = this.props.teamChallengeRankList;

        return (
            <div>
                { account.hasChallengeRankAccess && account.hasTeamRankAccess && this.state.page == 0 && ranks && <TeamChallengeRankList ranks={ranks} /> }
                { this.state.page == 1 && challenge && goals && <ChallengeCondition challenge={challenge} goals={goals} /> }
            </div>
        )
    }
}

const mapStateToProps = ({ auth, teamChallengeDetail, teamChallengeGoalList, teamChallengeRankList }) => ({
    auth,
    teamChallengeDetail,
    teamChallengeGoalList,
    teamChallengeRankList
});

const mapDispatchToProps = (dispatch) => ({
    teamChallengeDetailActions: bindActionCreators(teamChallengeDetailActions, dispatch),
    teamChallengeGoalListActions: bindActionCreators(teamChallengeGoalListActions, dispatch),
    teamChallengeRankListAction: bindActionCreators(teamChallengeRankListAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamChallengeDetail))