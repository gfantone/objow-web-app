import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {StoreTeamCollaboratorDepartment, SubHeader} from './components'
import {ShoppingCartAddingConfirmation, ShoppingCartButton, StoreFilter, StoreTeamDepartment} from '../../components'
import {IconButton, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import * as rewardListActions from '../../../../services/Rewards/RewardList/actions'
import * as teamCollaboratorPointSummaryDetailActions from '../../../../services/TeamCollaboratorPointSummaries/TeamCollaboratorPointSummaryDetail/actions'
import * as teamDetailActions from '../../../../services/Teams/TeamDetail/actions'
import * as teamPointSummaryDetailActions from '../../../../services/TeamPointSummaries/TeamPointSummaryDetail/actions'
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions'

class TeamRewardStore extends MainLayoutComponent {
    state = {categoryId: null, filterOpen: false, name: null, page: 0, periodId: null, teamId: null}

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

    refresh(page, category, period, team, name) {
        const {account} = this.props.accountDetail
        const teamId = account.role.code === 'M' ? this.props.match.params.id : team
        var url = `/rewards/teams/${teamId}?page=${page}`
        if (category) url += `&category=${category}`
        if (period) url += `&period=${period}`
        if (name) url += `&name=${name}`
        this.props.history.replace(url)
    }

    handlePageChange(page) {
        this.refresh(page, this.state.categoryId, this.state.periodId, this.state.teamId, this.state.name)
    }

    loadData() {
        const teamId = Number(this.props.match.params.id)
        const teamHasChanged = teamId !== this.state.teamId
        const params = new URLSearchParams(window.location.search)
        const pageParam = params.get('page')
        const newPage = pageParam ? Number(pageParam) : this.state.page
        const categoryParam = params.get('category')
        const categoryId = categoryParam ? Number(categoryParam) : null
        const periodParam = params.get('period')
        const periodId = periodParam ? Number(periodParam) : null
        const nameParam = params.get('name');
        const name = nameParam ? decodeURIComponent(nameParam) : null;

        if (newPage !== this.state.page || categoryId !== this.state.categoryId || teamHasChanged || periodId !== this.state.periodId || name !== this.state.name) {
            this.setState({
                ...this.state,
                page: newPage,
                categoryId: categoryId,
                teamId: teamId,
                periodId: periodId,
                name: name
            }, () => {
                if (teamHasChanged) {
                    this.props.configListActions.getPermanentConfigList()
                    this.props.teamDetailActions.getTeamDetail(teamId)
                }
                this.props.rewardListActions.getActiveRewardList(name, categoryId)
                this.props.teamCollaboratorPointSummaryDetailActions.getTeamCollaboratorPointSummary(teamId, periodId)
                this.props.teamPointSummaryDetailActions.getTeamPointSummaryByTeam(teamId, periodId)
            })
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search)
        const pageParam = params.get('page')
        const initialPage = pageParam ? Number(pageParam) : this.state.page
        const name = params.get('name');
        const {account} = this.props.accountDetail
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader page={initialPage} onChange={this.handlePageChange.bind(this)} />)
        this.props.handleButtons(<div style={{display: 'contents'}}>
            <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>
            {account.role.code !== 'A' && <ShoppingCartButton style={{marginLeft: 8}} />}
        </div>)
        this.props.activateSearch(name)
        if (account.role.code === 'A') {
            this.props.activateReturn()
        }
        this.loadData()
    }

    applySearch(prevProps) {
        if (prevProps.search !== this.props.search) {
            const search = this.props.search ? encodeURIComponent(this.props.search) : null;
            this.refresh(this.state.page, this.state.categoryId, this.state.periodId, this.state.teamId, search)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData()
        this.applySearch(prevProps)
    }

    handleAddClick(reward) {
        const item = {reward: reward, quantity: 1}
        this.props.shoppingCartActions.addItem(item)
    }

    goToCollaboratorView(categoryId, collaboratorId, periodId, name) {
        var url = `/rewards/collaborators/${collaboratorId}`
        if (categoryId || periodId) url += '?'
        if (categoryId) url += `category=${categoryId}`
        if (categoryId && periodId) url += '&'
        if (periodId) url += `period=${periodId}`
        if ((categoryId || periodId) && name) url += '&'
        if (name) url += `name=${name}`
        this.props.history.push(url)
    }

    handleFilterChange(category, team, collaborator, period) {
        if (!collaborator) {
            this.refresh(this.state.page, category, period, team, this.state.name)
        } else {
            this.goToCollaboratorView(category, collaborator, period, this.state.name)
        }
    }

    render() {
        const {configs, loading: configListLoading} = this.props.configList
        const {team, loading: teamDetailLoading} = this.props.teamDetail
        const collaboratorRewardActivation = configs ? configs.find(x => x.code === 'CRWA').value.toBoolean() : null
        const teamRewardActivation = configs ? configs.find(x => x.code === 'TRWA').value.toBoolean() : null
        const loading = configListLoading || teamDetailLoading

        return (
            <div>
                {!loading && team && this.state.page === 0 && teamRewardActivation && <StoreTeamDepartment onAddClick={this.handleAddClick.bind(this)} />}
                {!loading && team && (this.state.page === 1 || this.state.page === 0 && !teamRewardActivation) && collaboratorRewardActivation && <StoreTeamCollaboratorDepartment
                    name={this.state.name}
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
                <ShoppingCartAddingConfirmation />
            </div>
        )
    }

}

const mapStateToProps = ({accountDetail, configList, teamDetail}) => ({
    accountDetail,
    configList,
    teamDetail,
})

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    rewardListActions: bindActionCreators(rewardListActions, dispatch),
    teamCollaboratorPointSummaryDetailActions: bindActionCreators(teamCollaboratorPointSummaryDetailActions, dispatch),
    teamDetailActions: bindActionCreators(teamDetailActions, dispatch),
    teamPointSummaryDetailActions: bindActionCreators(teamPointSummaryDetailActions, dispatch),
    shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamRewardStore)
