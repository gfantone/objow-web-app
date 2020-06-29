import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {StoreCollaboratorDepartment, SubHeader} from './components'
import {StoreFilter} from '../../components'
import {IconButton, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import {StoreTeamDepartment} from "../../components/StoreTeamDepartment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlidersH} from "@fortawesome/free-solid-svg-icons";

class CollaboratorRewardStore extends MainLayoutComponent {
    state = {categoryId: null, collaboratorId: null, filterOpen: false, page: 0, periodId: null}

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
        const collaboratorId = Number(this.props.match.params.id)
        const collaboratorHasChanged = collaboratorId !== this.state.collaboratorId
        const params = new URLSearchParams(window.location.search)
        const categoryParam = params.get('category')
        const categoryId = categoryParam ? Number(categoryParam) : null
        const periodParam = params.get('period')
        const periodId = periodParam ? Number(periodParam) : null

        if (categoryId !== this.state.categoryId || collaboratorHasChanged || periodId !== this.state.periodId) {
            this.setState({
                ...this.state,
                categoryId: categoryId,
                collaboratorId: collaboratorId,
                periodId: periodId
            }, () => {
                if (collaboratorHasChanged) this.props.collaboratorDetailActions.getCollaboratorDetail(collaboratorId)
            })
        }
    }

    componentDidMount() {
        const {account} = this.props.accountDetail
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader page={this.state.page} onChange={this.handlePageChange.bind(this)} />)
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>);
        if (account.role.code !== 'C') {
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

    goToTeamView(categoryId, teamId, periodId) {
        const {account} = this.props.accountDetail
        const {collaborator: currentCollaborator} = this.props.collaboratorDetail
        const finalTeamId = account.role.code === 'M' ? currentCollaborator.team.id : teamId;
        var url = `/rewards/teams/${finalTeamId}`
        if (categoryId || periodId) url += '?'
        if (categoryId) url += `category=${categoryId}`
        if (categoryId && periodId) url += '?'
        if (periodId) url += `period=${periodId}`
        this.props.history.push(url)
    }

    refresh(category, team, collaborator, period) {
        var url = `/rewards/collaborators/${collaborator}`
        var hasFirstParam = false
        if (category || team || period) url += '?'
        if (category) {
            url += `category=${category}`
            hasFirstParam = true
        }
        if (team) {
            if (hasFirstParam) url += '&'
            url += `team=${team}`
            hasFirstParam = true
        }
        if (period) {
            if (hasFirstParam) url += '&'
            url += `period=${period}`
        }
        this.props.history.replace(url)
    }

    handleFilterChange(category, team, collaborator, period) {
        const {account} = this.props.accountDetail
        const collaboratorId = account.role.code === 'C' ? this.id : collaborator;
        if (collaboratorId) {
            this.refresh(category, team, collaboratorId, period)
        } else {
            this.goToTeamView(category, team, period)
        }
    }

    render() {
        const {collaborator, loading} = this.props.collaboratorDetail
        const collaboratorId = collaborator ? collaborator.id : null
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null

        return (
            <div>
                {!loading && collaborator && this.state.page === 0 && <StoreCollaboratorDepartment categoryId={this.state.categoryId} collaboratorId={collaborator.id} periodId={this.state.periodId} onAddClick={this.handleAddClick.bind(this)} />}
                {!loading && collaborator && collaborator.team && this.state.page === 1 && <StoreTeamDepartment categoryId={this.state.categoryId} periodId={this.state.periodId} teamId={collaborator.team.id} onAddClick={this.handleAddClick.bind(this)} />}
                <StoreFilter
                    open={this.state.filterOpen}
                    categoryId={this.state.categoryId}
                    teamId={teamId}
                    collaboratorId={collaboratorId}
                    periodId={this.state.periodId}
                    onChange={this.handleFilterChange.bind(this)}
                    onClose={this.handleFilterClose.bind(this)}
                />
            </div>
        )
    }

}

const mapStateToProps = ({accountDetail, collaboratorDetail}) => ({
    accountDetail,
    collaboratorDetail
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRewardStore)
