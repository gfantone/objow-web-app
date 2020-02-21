import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TeamRanking } from '../../components'
import {AppBarSubTitle, EmptyState, Loader, MainLayoutComponent} from '../../../../components'
import * as teamGeneralRankListActions from '../../../../services/TeamGeneralRanks/TeamGeneralRankList/actions'
import {Redirect} from "react-router";

class TeamGeneralRanking extends MainLayoutComponent {
    componentDidMount() {
        this.props.activateReturn();
        this.props.handleTitle('Classements');
        this.props.handleSubHeader(<AppBarSubTitle title="Classement général d'équipe" />);
        this.props.handleMaxWidth('md');
        this.props.teamGeneralRankListActions.getTeamGeneralRankList(this.props.match.params.period)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={'Aucun classement disponible'} />
    }

    renderData() {
        const { ranking } = this.props.teamGeneralRankList;
        return <TeamRanking ranking={ranking} />
    }

    render() {
        const { account } = this.props.auth;
        const { ranking, loading } = this.props.teamGeneralRankList;

        if (!account.hasGeneralRankAccess) {
            return <Redirect to='/' />
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && ranking && ranking.length > 0 && this.renderData() }
                { !loading && ranking && ranking.length == 0 && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ auth, teamGeneralRankList }) => ({
    auth,
    teamGeneralRankList
});

const mapDispatchToProps = (dispatch) => ({
    teamGeneralRankListActions: bindActionCreators(teamGeneralRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamGeneralRanking)
