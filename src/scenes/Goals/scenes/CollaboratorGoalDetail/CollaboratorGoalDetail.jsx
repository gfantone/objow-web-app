import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubHeader } from './components'
import { CollaboratorGoalRankList, GoalIndication } from '../../components'
import { MainLayoutComponent } from '../../../../components'
import * as collaboratorGoalDetailActions from '../../../../services/CollaboratorGoals/CollaboratorGoalDetail/actions'
import * as collaboratorGoalRankListActions from '../../../../services/CollaboratorGoalRanks/CollaboratorGoalRankList/actions'

class CollaboratorGoalDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        const { account } = this.props.accountDetail;
        this.state = {
            page: account.hasGoalRankAccess ? 0 : 1
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
        this.props.handleTitle('Objectifs');
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasGoalRankAccess} />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.collaboratorGoalDetailActions.getCollaboratorGoalDetail(id);
        this.props.collaboratorGoalRankListActions.getCollaboratorGoalRankListByCollaboratorGoal(id)
    }

    render() {
        const { account } = this.props.accountDetail;
        const { goal } = this.props.collaboratorGoalDetail;
        const { ranks } = this.props.collaboratorGoalRankList;

        return (
            <div>
                { account.hasGoalRankAccess && this.state.page == 0 && goal && ranks && <CollaboratorGoalRankList ranks={ranks} collaboratorId={goal.collaboratorId} /> }
                { this.state.page == 1 && goal && <GoalIndication goal={goal} type='C' /> }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorGoalDetail, collaboratorGoalRankList }) => ({
    accountDetail,
    collaboratorGoalDetail,
    collaboratorGoalRankList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorGoalDetailActions: bindActionCreators(collaboratorGoalDetailActions, dispatch),
    collaboratorGoalRankListActions: bindActionCreators(collaboratorGoalRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorGoalDetail)
