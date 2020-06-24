import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {StoreTeamCollaboratorDepartment, SubHeader} from './components'
import {StoreTeamDepartment} from '../../components'
import {MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamDetailActions from '../../../../services/Teams/TeamDetail/actions'

class TeamRewardStore extends MainLayoutComponent {
    state = {page: 0, period: null}

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id
        const {account} = this.props.accountDetail
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader page={this.state.page} onChange={this.handlePageChange.bind(this)} />)
        if (account.role.code === 'A') {
            this.props.activateReturn()
        }
        this.props.teamDetailActions.getTeamDetail(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const params = new URLSearchParams(window.location.search)
        const period = Number(params.get('period'))
        if (period !== this.state.period) {
            this.setState(({
                ...this.state,
                period: period
            }))
        }
    }

    handleAddClick(reward) {
        alert('Add')
    }

    render() {
        const id = this.props.match.params.id
        const {team, loading} = this.props.teamDetail

        return (
            <div>
                {!loading && team && this.state.page === 0 && <StoreTeamDepartment id={id} periodId={this.state.period} onAddClick={this.handleAddClick.bind(this)} />}
                {!loading && team && this.state.page === 1 && <StoreTeamCollaboratorDepartment id={id} periodId={this.state.period} />}
            </div>
        )
    }

}

const mapStateToProps = ({accountDetail, teamDetail}) => ({
    accountDetail,
    teamDetail,
})

const mapDispatchToProps = (dispatch) => ({
    teamDetailActions: bindActionCreators(teamDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamRewardStore)
