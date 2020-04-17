import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainLayoutComponent, TeamSelector } from '../../../../components'

class GoalListHome extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle('Les objectifs')
    }

    handleClick(id) {
        this.props.history.push(`/goals/teams/${id}/categories`)
    }

    render() {
        const { account } = this.props.accountDetail;

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

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

export default connect(mapStateToProps)(withRouter(GoalListHome))
