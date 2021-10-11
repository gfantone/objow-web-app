import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainLayoutComponent, TeamSelector } from '../../../../components'
import * as Resources from '../../../../Resources'
import _ from 'lodash'

class GoalListHome extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.GOAL_LONG_TITLE)
    }

    handleClick(id) {
        this.props.history.push(`/goals/teams/${id}/categories`)
    }

    render() {
        const { account } = this.props.accountDetail;

        if(!account.hasGoalAccess) {
          return <Redirect to={'/challenges'} />
        }



        if (account.role.code == 'C') {
            return <Redirect to={`/goals/collaborators/${account.id}/categories`} />
        }

        if (account.role.code == 'M' && account.team) {
            return <Redirect to={`/goals/teams/${account.team.id}/categories`} />
        }

        if (account.role.code == 'A') {
            return (
                <div>
                    <TeamSelector onClick={this.handleClick.bind(this)} />
                </div>
            )
        }

        return <div></div>
    }
}

const mapStateToProps = ({ accountDetail, configList }) => ({
    accountDetail,
    configList
});

export default connect(mapStateToProps)(withRouter(GoalListHome))
