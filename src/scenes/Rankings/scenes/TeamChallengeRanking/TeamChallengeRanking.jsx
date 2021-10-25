import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TeamRanking } from '../../components'
import {AppBarSubTitle, EmptyState, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamChallengeGeneralRankListActions from '../../../../services/TeamChallengeGeneralRanks/TeamChallengeGeneralRankList/actions'
import {Redirect} from "react-router";

class TeamChallengeRanking extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.RANKING_SHORT_TITLE);
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.TEAM_CHALLENGE_RANKING_TITLE} />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.teamChallengeGeneralRankListActions.getTeamChallengeGeneralRankList(this.props.match.params.period)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={Resources.TEAM_CHALLENGE_RANKING_EMPTY_STATE_TITLE} />
    }

    renderData() {
        const { ranks } = this.props.teamChallengeGeneralRankList;
        return <TeamRanking ranking={ranks} teamId={this.props.match.params.team} pointsLabel={Resources.TEAM_CHALLENGE_RANKING_POINTS_COLUMN} />
    }

    render() {
        const { account } = this.props.accountDetail;
        const { ranks, loading } = this.props.teamChallengeGeneralRankList;

        if (!account.hasRankingAccess) {
            return <Redirect to={`/`} />
        }

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

const mapStateToProps = ({ accountDetail, teamChallengeGeneralRankList }) => ({
    accountDetail,
    teamChallengeGeneralRankList
});

const mapDispatchToProps = (dispatch) => ({
    teamChallengeGeneralRankListActions: bindActionCreators(teamChallengeGeneralRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamChallengeRanking)
