import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSlidersH} from "@fortawesome/free-solid-svg-icons"
import {StoreCollaboratorDepartment, SubHeader} from './components'
import {ShoppingCartAddingConfirmation, ShoppingCartButton, StoreFilter, StoreTeamDepartment} from '../../components'
import {IconButton, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions'

class CollaboratorRewardStore extends MainLayoutComponent {
    state = {categoryId: null, collaboratorId: null, filterOpen: false, name: null, page: 0, periodId: null}

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

    refresh(page, category, collaborator, period, name) {
        var url = `/rewards/collaborators/${collaborator}?page=${page}`
        if (category) url += `&category=${category}`
        if (period) url += `&period=${period}`
        if (name) url += `&name=${name}`
        this.props.history.replace(url)
    }

    handlePageChange(page) {
        this.refresh(page, this.state.categoryId, this.state.collaboratorId, this.state.periodId, this.state.name)
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
        const nameParam = params.get('name')
        const name = nameParam ? decodeURIComponent(nameParam) : null

        if (newPage !== this.state.page || categoryId !== this.state.categoryId || collaboratorHasChanged || periodId !== this.state.periodId || name !== this.state.name) {
            this.setState({
                ...this.state,
                page: newPage,
                categoryId: categoryId,
                collaboratorId: collaboratorId,
                periodId: periodId,
                name: name
            }, () => {
                if (collaboratorHasChanged) this.props.collaboratorDetailActions.getCollaboratorDetail(collaboratorId)
            })
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search)
        const pageParam = params.get('page')
        const initialPage = pageParam ? Number(pageParam) : this.state.page
        const name = params.get('name')
        const {account} = this.props.accountDetail
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader page={initialPage} onChange={this.handlePageChange.bind(this)} />)
        this.props.handleButtons(<div style={{display: 'contents'}}>
            <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>
            {account.role.code !== 'A' && <ShoppingCartButton style={{marginLeft: 8}} />}
        </div>)
        this.props.activateSearch(name)
        if (account.role.code !== 'C') {
            this.props.activateReturn()
        }
        this.loadData()
    }

    applySearch(prevProps) {
        if (prevProps.search !== this.props.search) {
            const search = this.props.search ? encodeURIComponent(this.props.search) : null
            this.refresh(this.state.page, this.state.categoryId, this.state.collaboratorId, this.state.periodId, search)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData()
        this.applySearch(prevProps)
    }

    handleAddClick(reward) {
        const item = {reward: reward, quantity: 1}
        this.props.shoppingCartActions.addToShoppingCart(item)
    }

    goToTeamView(categoryId, teamId, periodId, name) {
        const {account} = this.props.accountDetail
        const {collaborator: currentCollaborator} = this.props.collaboratorDetail
        const finalTeamId = account.role.code === 'M' ? currentCollaborator.team.id : teamId
        var url = `/rewards/teams/${finalTeamId}`
        if (categoryId || periodId) url += '?'
        if (categoryId) url += `category=${categoryId}`
        if (categoryId && periodId) url += '&'
        if (periodId) url += `period=${periodId}`
        if ((categoryId || periodId) && name) url += '&'
        if (name) url += `name=${name}`
        this.props.history.push(url)
    }

    handleFilterChange(category, team, collaborator, period) {
        const {account} = this.props.accountDetail
        const collaboratorId = account.role.code === 'C' ? this.props.match.params.id : collaborator
        if (collaboratorId) {
            this.refresh(this.state.page, category, collaboratorId, period, this.state.name)
        } else {
            this.goToTeamView(category, team, period, this.state.name)
        }
    }

    render() {
        const {collaborator, loading} = this.props.collaboratorDetail

        return (
            <div>
                {!loading && collaborator && this.state.page === 0 && <StoreCollaboratorDepartment
                    name={this.state.name}
                    categoryId={this.state.categoryId}
                    collaboratorId={collaborator.id}
                    periodId={this.state.periodId}
                    onAddClick={this.handleAddClick.bind(this)}
                />}
                {!loading && collaborator && collaborator.team && this.state.page === 1 && <StoreTeamDepartment
                    name={this.state.name}
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
                <ShoppingCartAddingConfirmation />
            </div>
        )
    }

}

const mapStateToProps = ({accountDetail, collaboratorDetail}) => ({
    accountDetail,
    collaboratorDetail
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch),
    shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRewardStore)
