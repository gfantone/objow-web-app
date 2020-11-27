import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Grid, isWidthUp, withWidth} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSlidersH} from '@fortawesome/free-solid-svg-icons'
import {CategoryFilter} from '../../components'
import {AppBarSubTitle, Category, GridLink, IconButton, Loader, MainLayoutComponent} from '../../../../components'
import {bindActionCreators} from 'redux'
import * as teamGoalCategoryListActions from '../../../../services/TeamGoalCategories/TeamGoalCategoryList/actions'
import * as Resources from '../../../../Resources'

class TeamCollaboratorGoalCategoryStats extends MainLayoutComponent {
    constructor(props) {
        super(props)
        this.id = null
        this.year = null
        this.state = {
            filterOpen: false
        }
    }

    refresh(id, year) {
        var url = `/stats/teams/${id}/categories`
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
        const id = props.match.params.teamId
        const params = new URLSearchParams(window.location.search)
        const year = params.get('year')

        if (id != this.id || year != this.year) {
            this.id = id
            this.year = year
            this.props.teamGoalCategoryListActions.getTeamGoalCategoryList(id, this.year)
        }
    }

    componentDidMount() {
        if (this.props.accountDetail.account.role.code === 'A') this.props.activateReturn()
        this.props.handleTitle(Resources.STATS_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.TEAM_GOAL_CATEGORY_STATS_TITLE} />)
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
        if (!collaborator) {
            const teamId = this.props.accountDetail.account.role.code === 'M' ? this.id : team
            this.refresh(teamId, year)
        } else {
            var url = `/stats/collaborators/${collaborator}/categories`
            if (year) url += `?year=${year}`
            this.props.history.push(url)
        }
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {categories} = this.props.teamGoalCategoryList
        const spacing = isWidthUp('sm', this.props.width) ? 8 : 4

        return (
            <div>
                <Grid container spacing={spacing}>
                    {categories.map(category => {
                        return (
                            <GridLink key={category.id} item xs={12} sm={4} component={Link} to={`/stats/teams/${this.props.match.params.teamId}/categories/${category.categoryId}/goals?year=${category.periodId}`}>
                                <Category category={category} />
                            </GridLink>
                        )
                    })}
                </Grid>
            </div>
        )
    }

    render() {
        const {categories, loading} = this.props.teamGoalCategoryList
        const marginTop = isWidthUp('sm', this.props.width) ? 48 : 16

        return (
            <div style={{marginTop: marginTop}}>
                {loading && this.renderLoader()}
                {!loading && categories && this.renderData()}
                <CategoryFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    year={this.year}
                    team={this.props.match.params.teamId}
                />
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, teamGoalCategoryList}) => ({
    accountDetail,
    teamGoalCategoryList
})

const mapDispatchToProps = (dispatch) => ({
    teamGoalCategoryListActions: bindActionCreators(teamGoalCategoryListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(TeamCollaboratorGoalCategoryStats))
