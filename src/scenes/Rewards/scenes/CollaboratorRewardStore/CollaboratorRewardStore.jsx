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

    refresh(page, category, collaborator, period) {
        var url = `/rewards/collaborators/${collaborator}?page=${page}`
        if (category) url += `&category=${category}`
        if (period) url += `&period=${period}`
        this.props.history.replace(url)
    }

    handlePageChange(page) {
        this.refresh(page, this.state.categoryId, this.state.collaboratorId, this.state.periodId)
    }

    loadData() {
        const collaboratorId = Number(this.props.match.params.id)
        const collaboratorHasChanged = collaboratorId !== this.state.collaboratorId
        const params = new URLSearchParams(window.location.search)
        const pageParam = params.get('page')
        const newPage = pageParam ? Number(pageParam) : this.state.page
        const categoryParam = params.get('category')
        const categoryId = categoryParam ? Number(categoryParam) : null
        const periodParam = params.get('period')
        const periodId = periodParam ? Number(periodParam) : null

        if (newPage !== this.state.page || categoryId !== this.state.categoryId || collaboratorHasChanged || periodId !== this.state.periodId) {
            this.setState({
                ...this.state,
                page: newPage,
                categoryId: categoryId,
                collaboratorId: collaboratorId,
                periodId: periodId
            }, () => {
                if (collaboratorHasChanged) this.props.collaboratorDetailActions.getCollaboratorDetail(collaboratorId)
            })
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search)
        const pageParam = params.get('page')
        const initialPage = pageParam ? Number(pageParam) : this.state.page
        const {account} = this.props.accountDetail
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader page={initialPage} onChange={this.handlePageChange.bind(this)} />)
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
        if (categoryId && periodId) url += '&'
        if (periodId) url += `period=${periodId}`
        this.props.history.push(url)
    }

    handleFilterChange(category, team, collaborator, period) {
        const {account} = this.props.accountDetail
        const collaboratorId = account.role.code === 'C' ? this.props.match.params.id : collaborator;
        if (collaboratorId) {
            this.refresh(this.state.page, category, collaboratorId, period)
        } else {
            this.goToTeamView(category, team, period)
        }
    }

    render() {
        const {collaborator, loading} = this.props.collaboratorDetail

        return (
            <div>
                {!loading && collaborator && this.state.page === 0 && <StoreCollaboratorDepartment
                    categoryId={this.state.categoryId}
                    collaboratorId={collaborator.id}
                    periodId={this.state.periodId}
                    onAddClick={this.handleAddClick.bind(this)}
                />}
                {!loading && collaborator && collaborator.team && this.state.page === 1 && <StoreTeamDepartment
                    categoryId={this.state.categoryId}
                    periodId={this.state.periodId}
                    teamId={collaborator.team.id}
                    onAddClick={this.handleAddClick.bind(this)}
                />}
                {collaborator && <StoreFilter
                    open={this.state.filterOpen}
                    initialCategory={this.state.categoryId}
                    initialTeam={collaborator.team ? collaborator.team.id : null}
                    initialCollaborator={collaborator.id}
                    initialPeriod={this.state.periodId}
                    onChange={this.handleFilterChange.bind(this)}
                    onClose={this.handleFilterClose.bind(this)}
                />}
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
