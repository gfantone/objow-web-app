import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainLayoutComponent, TeamSelector } from '../../../../components'

class GoalListHome extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle('Les objectifs')
    }

    handleClick(id) {
        this.props.history.push(`/goals/team/${id}`)
    }

    render() {
        const { account } = this.props.auth

        if (account.role.code == 'C') {
            return <Redirect to={`/goals/collaborator/${account.id}`} />
        }

        if (account.role.code == 'M' && account.team) {
            return <Redirect to={`/goals/team/${account.team.id}`} />
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

const mapStateToProps = ({ auth }) => ({
    auth
})

export default connect(mapStateToProps)(withRouter(GoalListHome))