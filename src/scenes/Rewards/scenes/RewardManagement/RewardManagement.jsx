import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {CollaboratorRewardManagement, SubHeader, TeamRewardManagement} from './components'
import {IconButton as AppBarIconButton, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'

class RewardManagement extends MainLayoutComponent {
    state = {page: 0}

    handleAdd() {
        this.props.history.push('/rewards/creation')
    }

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} />)
        this.props.handleButtons(<AppBarIconButton size='small' onClick={this.handleAdd.bind(this)}><FontAwesomeIcon icon={faPlus} /></AppBarIconButton>);
    }

    render() {
        return (
            <div>
                {this.state.page === 0 && <CollaboratorRewardManagement />}
                {this.state.page === 1 && <TeamRewardManagement />}
            </div>
        )
    }
}

export default RewardManagement
