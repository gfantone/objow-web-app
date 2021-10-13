import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { AdministratorCollaboratorSelector, MainLayoutComponent, ManagerCollaboratorSelector } from '../../../../components'
import * as Resources from '../../../../Resources'

class RankingList extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.RANKING_LONG_TITLE)
    }

    handleClick(id) {
        this.props.history.push(`/rankings/collaborators/${id}/list`)
    }

    render() {
        const { account } = this.props.accountDetail;

        if (!account.hasRankingAccess) {
            return <Redirect to={`/`} />
        }

        if (account.role.code == 'C') {
            return <Redirect to={`/rankings/collaborators/${account.id}/list`} />
        }

        return (
            <div>
                { account.role.code == 'M' && <ManagerCollaboratorSelector onClick={this.handleClick.bind(this)} /> }
                { account.role.code == 'A' && <AdministratorCollaboratorSelector onClick={this.handleClick.bind(this)} /> }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

export default connect(mapStateToProps)(withRouter(RankingList))
