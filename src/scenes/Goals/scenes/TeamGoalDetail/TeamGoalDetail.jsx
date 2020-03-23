import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubHeader } from './components'
import { GoalIndication, TeamGoalRankList } from '../../components'
import { MainLayoutComponent } from '../../../../components'
import * as teamGoalDetailActions from '../../../../services/TeamGoals/TeamGoalDetail/actions'
import * as teamGoalRankListActions from '../../../../services/TeamGoalRanks/TeamGoalRankList/actions'

class TeamGoalDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        const { account } = this.props.accountDetail;
        this.state = {
            page: account.hasGoalRankAccess && account.hasTeamRankAccess ? 0 : 1
        }
    }

    handlePageChange = (page) => {
        this.setState({
            ...this.state,
            page: page
        })
    };

    componentDidMount() {
        const { account } = this.props.accountDetail;
        const id = this.props.match.params.id;
        this.props.handleTitle('Objectifs');
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasGoalRankAccess && account.hasTeamRankAccess} />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.teamGoalDetailActions.getTeamGoalDetail(id);
        this.props.teamGoalRankListActions.getTeamGoalRankList(id)
    }

    render() {
        const { account } = this.props.accountDetail;
        const { goal } = this.props.teamGoalDetail;
        const { ranks } = this.props.teamGoalRankList;

        return (
            <div>
                { account.hasGoalRankAccess && account.hasTeamRankAccess && this.state.page == 0 && ranks && <TeamGoalRankList ranks={ranks} /> }
                { this.state.page == 1 && goal && <GoalIndication goal={goal} type='T' /> }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, teamGoalDetail, teamGoalRankList }) => ({
    accountDetail,
    teamGoalDetail,
    teamGoalRankList
});

const mapDispatchToProps = (dispatch) => ({
    teamGoalDetailActions: bindActionCreators(teamGoalDetailActions, dispatch),
    teamGoalRankListActions: bindActionCreators(teamGoalRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamGoalDetail)
