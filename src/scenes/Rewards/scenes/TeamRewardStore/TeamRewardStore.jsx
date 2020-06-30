import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {StoreTeamCollaboratorDepartment, SubHeader} from './components'
import {StoreFilter, StoreTeamDepartment} from '../../components'
import {IconButton, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamDetailActions from '../../../../services/Teams/TeamDetail/actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlidersH} from "@fortawesome/free-solid-svg-icons";

class TeamRewardStore extends MainLayoutComponent {
    state = {categoryId: null, filterOpen: false, page: 0, periodId: null, teamId: null}

    handleFilterOpen() {
        this.setState({
            ...this.state,
            filterOpen: true
        })
    }

    handleFilterClose() {
        this.setState({
            ...this.state,
            filterOpen: false
        })
    }

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    loadData() {
        const teamId = Number(this.props.match.params.id)
        const teamHasChanged = teamId !== this.state.teamId
        const params = new URLSearchParams(window.location.search)
        const categoryParam = params.get('category')
        const categoryId = categoryParam ? Number(categoryParam) : null
        const periodParam = params.get('period')
        const periodId = periodParam ? Number(periodParam) : null

        if (categoryId !== this.state.categoryId || teamHasChanged || periodId !== this.state.periodId) {
            this.setState({
                ...this.state,
                categoryId: categoryId,
                teamId: teamId,
                periodId: periodId
            }, () => {
                if (teamHasChanged) this.props.teamDetailActions.getTeamDetail(teamId)
            })
        }
    }

    componentDidMount() {
        const {account} = this.props.accountDetail
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader page={this.state.page} onChange={this.handlePageChange.bind(this)} />)
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>);
        if (account.role.code === 'A') {
            this.props.activateReturn()
        }
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData()
    }

    handleAddClick(reward) {
        alert('Add')
    }

    goToCollaboratorView(categoryId, collaboratorId, periodId) {
        var url = `/rewards/collaborators/${collaboratorId}`
        if (categoryId || periodId) url += '?'
        if (categoryId) url += `category=${categoryId}`
        if (categoryId && periodId) url += '&'
        if (periodId) url += `period=${periodId}`
        this.props.history.push(url)
    }

    refresh(category, period, team) {
        const {account} = this.props.accountDetail
        const teamId = account.role.code === 'M' ? this.props.match.params.id : team
        var url = `/rewards/teams/${teamId}`
        var hasFirstParam = false
        if (category || period) url += '?'
        if (category) {
            url += `category=${category}`
            hasFirstParam = true
        }
        if (period) {
            if (hasFirstParam) url += '&'
            url += `period=${period}`
        }
        this.props.history.replace(url)
    }

    handleFilterChange(category, team, collaborator, period) {
        if (!collaborator) {
            this.refresh(category, period, team)
        } else {
            this.goToCollaboratorView(category, collaborator, period)
        }
    }

    render() {
        const {team, loading} = this.props.teamDetail

        return (
            <div>
                {!loading && team && this.state.page === 0 && <StoreTeamDepartment
                    categoryId={this.state.categoryId}
                    periodId={this.state.periodId}
                    teamId={team.id}
                    onAddClick={this.handleAddClick.bind(this)}
                />}
                {!loading && team && this.state.page === 1 && <StoreTeamCollaboratorDepartment
                    category={this.state.categoryId}
                    period={this.state.periodId}
                    team={team.id}
                />}
                {team && <StoreFilter
                    open={this.state.filterOpen}
                    initialCategory={this.state.categoryId}
                    initialTeam={team.id}
                    initialCollaborator={null}
                    initialPeriod={this.state.periodId}
                    onChange={this.handleFilterChange.bind(this)}
                    onClose={this.handleFilterClose.bind(this)}
                />}
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
