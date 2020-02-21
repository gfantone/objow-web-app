import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { AdministratorCollaboratorSelector, MainLayoutComponent, ManagerCollaboratorSelector } from '../../../../components'

class RankingList extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle('Les classements')
    }

    handleClick(id) {
        this.props.history.push(`/rankings/collaborator/${id}`)
    }

    render() {
        const { account } = this.props.auth

        if (account.role.code == 'C') {
            return <Redirect to={`/rankings/collaborator/${account.id}`} />
        }

        return (
            <div>
                { account.role.code == 'M' && <ManagerCollaboratorSelector onClick={this.handleClick.bind(this)} /> }
                { account.role.code == 'A' && <AdministratorCollaboratorSelector onClick={this.handleClick.bind(this)} /> }
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    auth
})

export default connect(mapStateToProps)(withRouter(RankingList))