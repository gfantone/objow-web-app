import React from 'react'
import {ValidatedCollaboratorRewardOrderList, WaitingCollaboratorRewardOrderList} from './components'
import {TrackingSubHeader} from '../../components'
import {MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'

class CollaboratorRewardOrderTracking extends MainLayoutComponent {
    state = {page: 0}

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<TrackingSubHeader onChange={this.handlePageChange.bind(this)} />)
        this.props.activateReturn()
    }

    render() {
        return (
            <div>
                {this.state.page === 0 && <WaitingCollaboratorRewardOrderList />}
                {this.state.page === 1 && <ValidatedCollaboratorRewardOrderList />}
            </div>
        )
    }
}

export default CollaboratorRewardOrderTracking
