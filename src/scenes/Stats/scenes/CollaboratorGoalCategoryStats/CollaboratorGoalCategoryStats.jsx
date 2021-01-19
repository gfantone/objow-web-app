import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid, isWidthUp, withWidth} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSlidersH} from '@fortawesome/free-solid-svg-icons'
import {Redirect} from 'react-router-dom'
import {CategoryFilter} from '../../components'
import {AppBarSubTitle, Category, GridLink, IconButton, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import * as collaboratorGoalCategoryListActions from '../../../../services/CollaboratorGoalCategories/CollaboratorGoalCategoryList/actions'

class CollaboratorGoalCategoryStats extends MainLayoutComponent {
    constructor(props) {
        super(props)
        this.id = null
        this.year = null
        this.state = {
            filterOpen: false
        }
    }

    refresh(id, year) {
        var url = `/stats/collaborators/${id}/categories`
        if (year) url += `?year=${year}`
        this.props.history.replace(url)
    }

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

    loadData(props) {
        const id = props.match.params.collaboratorId
        const params = new URLSearchParams(window.location.search)
        const year = params.get('year')

        if (id != this.id || year != this.year) {
            this.id = id
            this.year = year
            this.props.collaboratorDetailActions.getCollaboratorDetail(id)
            this.props.collaboratorGoalCategoryListActions.getCollaboratorGoalCategories(id, this.year)
        }
    }

    componentDidMount() {
        if (this.props.accountDetail.account.role.code === 'A') this.props.activateReturn()
        this.props.handleTitle('Objectifs')
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.COLLABORATOR_GOAL_CATEGORY_LIST_TITLE} />)
        this.props.handleMaxWidth('sm')
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
            <FontAwesomeIcon icon={faSlidersH} />
        </IconButton>)
        this.loadData(this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData(this.props)
    }

    handleFilterChange(team, collaborator, year) {
        const collaboratorId = this.props.accountDetail.account.role.code === 'C' ? this.id : collaborator
        if (collaboratorId) {
            this.refresh(collaboratorId, year)
        } else {
            const teamId = this.props.accountDetail.account.role.code === 'M' ? this.props.collaboratorDetail.collaborator.team.id : team
            var url = `/stats/teams/${teamId}/categories`
            if (year) url += `?year=${year}`
            this.props.history.push(url)
        }
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {categories} = this.props.collaboratorGoalCategoryList
        const {collaborator} = this.props.collaboratorDetail
        const spacing = isWidthUp('sm', this.props.width) ? 8 : 4

        return (
            <div>
                <Grid container spacing={spacing}>
                    {categories.map(category => {
                        var url = `/stats/goals?collaborator=${this.props.match.params.collaboratorId}&category=${category.categoryId}&period=${category.periodId}`
                        if (collaborator && collaborator.team) url += `&team=${collaborator.team.id}`

                        return (
                            <GridLink key={category.id} item xs={12} sm={4} component={Link} to={url}>
                                <Category category={category} />
                            </GridLink>
                        )
                    })}
                </Grid>
            </div>
        )
    }

    render() {
        const {collaborator} = this.props.collaboratorDetail
        const {categories, loading} = this.props.collaboratorGoalCategoryList
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null
        const collaboratorId = collaborator ? collaborator.id : null
        const marginTop = isWidthUp('sm', this.props.width) ? 48 : 16

        const { account } = this.props.accountDetail;

        if(!account.hasStatisticsAccess) {
          return <Redirect to={'/'} />
        }

        return (
            <div style={{marginTop: marginTop}}>
                {loading && this.renderLoader()}
                {!loading && categories && this.renderData()}
                <CategoryFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    year={this.year}
                    team={teamId}
                    collaborator={collaboratorId}
                />
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, collaboratorDetail, collaboratorGoalCategoryList}) => ({
    accountDetail,
    collaboratorDetail,
    collaboratorGoalCategoryList
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch),
    collaboratorGoalCategoryListActions: bindActionCreators(collaboratorGoalCategoryListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(CollaboratorGoalCategoryStats))
