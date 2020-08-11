import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {CollaboratorRewardManagement, Filter, SubHeader, TeamRewardManagement} from './components'
import {IconButton as AppBarIconButton, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'

class RewardManagement extends MainLayoutComponent {
    state = {open: false, page: 0, period: null}

    handleAdd() {
        this.props.history.push('/rewards/creation')
    }

    handleFilterChange(period) {
        this.setState({
            ...this.state,
            period: period,
            open: false
        })
    }

    handleStateChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader onChange={this.handleStateChange('page').bind(this)} />)
        this.props.handleButtons(<div>
            <AppBarIconButton size='small' onClick={() => this.handleStateChange('open')(true)} style={{marginRight: 8}}><FontAwesomeIcon icon={faSlidersH} /></AppBarIconButton>
            <AppBarIconButton size='small' onClick={this.handleAdd.bind(this)}><FontAwesomeIcon icon={faPlus} /></AppBarIconButton>
        </div>);
    }

    render() {
        return (
            <div>
                {this.state.page === 0 && <CollaboratorRewardManagement periodId={this.state.period} />}
                {this.state.page === 1 && <TeamRewardManagement periodId={this.state.period} />}
                <Filter
                    periodId={this.state.period}
                    open={this.state.open}
                    onChange={this.handleFilterChange.bind(this)}
                    onClose={() => this.handleStateChange('open')(false)}
                />
            </div>
        )
    }
}

export default RewardManagement
