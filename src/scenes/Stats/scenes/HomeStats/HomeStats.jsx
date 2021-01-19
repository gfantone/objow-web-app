import React from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {MainLayoutComponent, TeamSelector} from '../../../../components'
import * as Resources from '../../../../Resources'

class HomeStats extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.STATS_TITLE)
    }

    handleClick(id) {
        this.props.history.push(`/stats/teams/${id}/categories`)
    }

    render() {
        const { account } = this.props.accountDetail;
        
        if(!account.hasStatisticsAccess) {
          return <Redirect to={'/'} />
        }

        if (account.role.code === 'C') {
            return <Redirect to={`/stats/collaborators/${account.id}/categories`} />
        }

        if (account.role.code === 'M' && account.team) {
            return <Redirect to={`/stats/teams/${account.team.id}/categories`} />
        }

        if (account.role.code === 'A') {
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
})

export default connect(mapStateToProps)(withRouter(HomeStats))
