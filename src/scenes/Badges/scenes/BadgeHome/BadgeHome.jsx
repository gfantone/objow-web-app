import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AdministratorCollaboratorSelector, MainLayoutComponent, ManagerCollaboratorSelector } from '../../../../components'
import * as Resources from '../../../../Resources'

class BadgeHome extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.BADGE_LONG_TITLE)
    }

    handleClick(id) {
        this.props.history.push(`/badges/collaborator/${id}`)
    }

    render() {
        const { account } = this.props.accountDetail;

        return (
            <div>
                { account.role.code == 'C' && <Redirect to={`/badges/collaborator/${account.id}`} /> }
                { account.role.code == 'M' && <ManagerCollaboratorSelector onClick={this.handleClick.bind(this)} /> }
                { account.role.code == 'A' && <AdministratorCollaboratorSelector onClick={this.handleClick.bind(this)} /> }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

export default connect(mapStateToProps)(BadgeHome)
