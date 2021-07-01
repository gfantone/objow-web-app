import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { SubHeader } from './components'
import { CollaboratorGoalRankList, GoalIndication } from '../../components'
import { MainLayoutComponent } from '../../../../components'
import * as Resources from '../../../../Resources'
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
        const id = this.props.match.params.id;
        this.props.handleTitle(Resources.GOAL_SHORT_TITLE);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.collaboratorGoalDetailActions.getCollaboratorGoalDetail(id);
        this.props.collaboratorGoalRankListActions.getCollaboratorGoalRankListByCollaboratorGoal(id)
    }

    componentDidUpdate() {
      const { account } = this.props.accountDetail;
      const { goal } = this.props.collaboratorGoalDetail;

      if(!this.state.initialized && goal && account) {
        this.setState({
          ...this.state,
          initialized: true
        }, () => {
          this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasGoalRankAccess && goal.allow_ranking} />);
        })
      }
    }

    render() {
        const { account } = this.props.accountDetail;
        const { goal } = this.props.collaboratorGoalDetail;
        const { ranks } = this.props.collaboratorGoalRankList;

        if(!account.hasGoalAccess) {
          return <Redirect to={'/challenges'} />
        }
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
