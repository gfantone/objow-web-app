import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import {Card, EmptyState, GridLink, IconButton, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import {SubHeader} from './components'
import {BadgeFilter, BadgeCollaboratorFilter, BadgeLevel} from '../../components'
import * as collaboratorBadgeLevelListActions from '../../../../services/CollaboratorBadgeLevels/CollaboratorBadgeLevelList/actions'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSlidersH} from "@fortawesome/free-solid-svg-icons"

class BadgeList extends MainLayoutComponent {
    constructor(props) {
        super(props)
        this.id = null
        this.current = true
        this.year = null
        this.state = {
            filterOpen: false
        }
    }

    refresh(id, current, year) {
        var url = `/badges/collaborator/${id}?current=${current}`
        if (year) url += `&year=${year}`
        this.props.history.replace(url)
    }

    loadData() {
        const id = this.props.match.params.id
        const params = new URLSearchParams(window.location.search)
        const currentParam = params.get('current')
        const current = currentParam ? currentParam.toBoolean() : this.current
        const year = params.get('year')

        if (id != this.id || current != this.current || year != this.year) {
            this.current = current
            this.year = year

            if (id != this.id) {
                this.id = id
                this.props.collaboratorDetailActions.getCollaboratorDetail(this.id)
            }

            if (this.current) {
                this.props.collaboratorBadgeLevelListActions.getCollaboratorNextBadgeLevelList(this.id, this.year)
            } else {
                this.props.collaboratorBadgeLevelListActions.getCollaboratorBadgeLevelList(this.id, this.year)
            }
        }
    }

    handleChange(current) {
        this.refresh(this.id, current, this.year)
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

    componentDidMount() {
        const params = new URLSearchParams(window.location.search)
        const currentParam = params.get('current')
        const current = currentParam ? currentParam.toBoolean() : this.current
        this.props.handleTitle(Resources.BADGE_SHORT_TITLE)
        this.props.handleSubHeader(<SubHeader initial={current} onChange={this.handleChange.bind(this)} />)
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>)
        if (this.props.accountDetail.account.role.code != 'C') {
            this.props.activateReturn()
        }
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData()
    }

    componentWillReceiveProps(props) {
        this.loadData(props)
    }

    handleFilterChange(collaborator, year) {
        this.refresh(collaborator, this.current, year)
    }

    onCollaboratorFilterLoaded() {
      if(!this.state.collaboratorFilterLoaded) {
        this.setState({
          ...this.state,
          collaboratorFilterLoaded: true
        })
      }
    }

    renderLoader() {
        return (
            <Loader centered />
        )
    }

    renderEmptyState() {
        return (
            <EmptyState title={Resources.BADGE_LIST_EMPTY_STATE_TITLE} message='' />
        )
    }

    renderData() {
        const {levels} = this.props.collaboratorBadgeLevelList


        return (
            <Grid container spacing={2}>
                {levels.map(level => {
                    return (
                        <GridLink key={level.id} item xs={12} sm={6} md={4} component={Link} to={`/badges/detail/${level.id}`}>
                            <Card>
                                <BadgeLevel level={level} />
                            </Card>
                        </GridLink>
                    )
                })}
            </Grid>
        )
    }

    render() {
        const {levels, loading: collaboratorBadgeLevelListLoading} = this.props.collaboratorBadgeLevelList
        const {collaborator, loading: collaboratorDetailLoading} = this.props.collaboratorDetail
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null
        const collaboratorId = collaborator ? collaborator.id : null
        const loading = collaboratorBadgeLevelListLoading || collaboratorDetailLoading

        const { account } = this.props.accountDetail;

        if(!account.hasBadgeAccess) {
          return <Redirect to={'/'} />
        }

        return (
            <div>
                <BadgeCollaboratorFilter
                  open={this.state.filterOpen}
                  onClose={this.handleFilterClose.bind(this)}
                  onChange={this.handleFilterChange.bind(this)}
                  team={teamId}
                  collaborator={collaboratorId}
                  year={this.year}
                  onLoaded={this.onCollaboratorFilterLoaded.bind(this)}
                />
                {!collaboratorDetailLoading && collaboratorBadgeLevelListLoading && this.renderLoader()}
                {!loading && levels && levels.length > 0 && collaborator && this.renderData()}
                {!loading && levels && levels.length == 0 && this.renderEmptyState()}
                <BadgeFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    team={teamId}
                    collaborator={collaboratorId}
                    year={this.year}
                />
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, collaboratorBadgeLevelList, collaboratorDetail}) => ({
    accountDetail,
    collaboratorBadgeLevelList,
    collaboratorDetail
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorBadgeLevelListActions: bindActionCreators(collaboratorBadgeLevelListActions, dispatch),
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BadgeList))
