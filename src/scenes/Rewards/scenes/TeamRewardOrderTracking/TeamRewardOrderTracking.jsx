import React from 'react'
import {ValidatedTeamRewardOrderList, WaitingTeamRewardOrderList} from './components'
import {TrackingSubHeader} from '../../components'
import {IconButton as AppBarIconButton, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

class TeamRewardOrderTracking extends MainLayoutComponent {
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
        this.props.handleSubHeader(<TrackingSubHeader onChange={this.handlePageChange.bind(this)} />)
        this.props.handleButtons(<AppBarIconButton size='small' onClick={this.handleAdd.bind(this)}><FontAwesomeIcon icon={faPlus} /></AppBarIconButton>);
        this.props.activateReturn()
    }

    render() {
        return (
            <div>
                {this.state.page === 0 && <WaitingTeamRewardOrderList />}
                {this.state.page === 1 && <ValidatedTeamRewardOrderList />}
            </div>
        )
    }
}

export default TeamRewardOrderTracking
