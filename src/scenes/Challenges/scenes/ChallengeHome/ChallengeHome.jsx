import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { IconButton, MainLayoutComponent, TeamSelector } from '../../../../components'
import * as Resources from '../../../../Resources'

class ChallengeHome extends MainLayoutComponent {
    handleAdd() {
        this.props.history.push('/challenges/creation')
    }

    handleClick(id) {
        this.props.history.push(`/challenges/team/${id}`)
    }

    componentDidMount() {
        const { account } = this.props.accountDetail;
        this.props.handleTitle(Resources.CHALLENGE_LONG_TITLE);
        if (account.role.code == 'A') {
            this.props.handleButtons(<IconButton size='small' onClick={this.handleAdd.bind(this)}><FontAwesomeIcon icon={faPlus}/></IconButton>)
        }
    }

    render() {
        const { account } = this.props.accountDetail;

        if (account.role.code == 'C') {
            return <Redirect to={`/challenges/collaborator/${account.id}`} />
        } else if (account.role.code == 'M' && account.team) {
            return <Redirect to={`/challenges/team/${account.team.id}`} />
        } else if (account.role.code == 'A') {
            return (
                <div>
                    <TeamSelector onClick={this.handleClick.bind(this)} />
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

export default connect(mapStateToProps)(withRouter(ChallengeHome))
