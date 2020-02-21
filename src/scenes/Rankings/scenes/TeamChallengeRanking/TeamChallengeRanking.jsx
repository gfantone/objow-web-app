import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TeamRanking } from '../../components'
import {AppBarSubTitle, EmptyState, Loader, MainLayoutComponent} from '../../../../components'
import * as teamChallengeGeneralRankListActions from '../../../../services/TeamChallengeGeneralRanks/TeamChallengeGeneralRankList/actions'
import {Redirect} from "react-router";

class TeamChallengeRanking extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle('Classements');
        this.props.handleSubHeader(<AppBarSubTitle title="Classement des challenges d'équipe" />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.teamChallengeGeneralRankListActions.getTeamChallengeGeneralRankList(this.props.match.params.period)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={'Aucun classement disponible'} />
    }

    renderData() {
        const { ranks } = this.props.teamChallengeGeneralRankList;
        return <TeamRanking ranking={ranks} />
    }

    render() {
        const { account } = this.props.auth;
        const { ranks, loading } = this.props.teamChallengeGeneralRankList;

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

const mapStateToProps = ({ auth, teamChallengeGeneralRankList }) => ({
    auth,
    teamChallengeGeneralRankList
});

const mapDispatchToProps = (dispatch) => ({
    teamChallengeGeneralRankListActions: bindActionCreators(teamChallengeGeneralRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamChallengeRanking)
