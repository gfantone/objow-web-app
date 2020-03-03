import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userGoalDetailActions from '../../../../services/UserGoals/UserGoalDetail/actions'
import { MainLayoutComponent } from '../../../../components'
import { GoalFilter, GoalIndications, PlayerGoalList, PlayerGoalRanking, TeamGoalRanking } from './components'

class GoalDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }

    componentDidMount() {
        this.props.activateReturn();
        this.props.handleTitle('Objectifs');
        this.props.handleSubHeader(<GoalFilter handleFilterChange={this._handleFilterChanger} />);
        this.props.handleMaxWidth('md');
        this.props.actions.getUserGoalDetail(this.props.match.params.id)
    }

    _handleFilterChanger = (page) => {
        this.setState({page: page})
    };

    _renderLoader() {
        return(
            <div></div>
        )
    }

    _renderData(goal, ranking, indications, playerGoals) {
        return(
            <div>
                { this.state.page == 0 && goal.type == 'I' && <PlayerGoalRanking ranking={ranking} /> }
                { this.state.page == 0 && goal.type == 'T' && <TeamGoalRanking ranking={ranking} /> }
                { this.state.page == 1 && <GoalIndications indications={indications} /> }
                { this.state.page == 2 && <PlayerGoalList goals={playerGoals} /> }
            </div>
        )
    }

    render() {
        const {loading, goal, ranking, indications, playerGoals} = this.props.userGoalDetail;

        if (loading) {
            return this._renderLoader()
        }

        if (goal != null) {
            return this._renderData(goal, ranking, indications, playerGoals)
        }

        return <div></div>
    }
}

const mapStateToProps = ({ accountDetail, userGoalDetail }) => ({
    accountDetail,
    userGoalDetail
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(userGoalDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalDetail)
