import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AdministratorCollaboratorSelector, MainLayoutComponent, ManagerCollaboratorSelector } from '../../../../components'
import * as Resources from '../../../../Resources'

class CoachingHome extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.COACHING_LIST_LONG_TITLE)
    }

    handleClick(id) {
        this.props.history.push(`/coaching/${id}`)
    }

    render() {
        const { account } = this.props.accountDetail;

        if (!account.hasCoachingAccess) {
            return <Redirect to={'/'} />
        }

        if (account.role.code == 'C') {
            return <Redirect to={`/coaching/${account.id}`} />
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

export default connect(mapStateToProps)(CoachingHome)
