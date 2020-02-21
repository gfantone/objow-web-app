import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { AppBarSubTitle, IconButton, MainLayoutComponent, TeamSelector } from '../../../../components'

class AdminTeamList extends MainLayoutComponent {
    handleAddClick() {
        this.props.history.push('/admin/teams/creation')
    }

    handleUpdateClick(id) {
        this.props.history.push(`/admin/teams/modification/${id}`)
    }

    componentDidMount() {
        this.props.handleTitle('Administration')
        this.props.handleSubHeader(<AppBarSubTitle title='Gestion des équipes' />)
        this.props.activateReturn()
        this.props.handleButtons(<IconButton size='small' onClick={this.handleAddClick.bind(this)}><FontAwesomeIcon icon={faPlus} /></IconButton>)
    }

    render() {
        return (
            <div>
                <TeamSelector onClick={this.handleUpdateClick.bind(this)} />
            </div>
        )
    }
}

export default AdminTeamList