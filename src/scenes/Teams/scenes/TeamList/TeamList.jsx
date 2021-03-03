import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { Team } from './components'
import { EmptyState, Loader, MainLayoutComponent } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'

class TeamList extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.TEAM_TITLE)
        this.props.teamListActions.getTeamList()
    }

    handleClick(id) {
        this.props.history.push(`/teams/${id}`)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={Resources.TEAM_LIST_EMPTY_STATE_TITLE} message={Resources.TEAM_LIST_EMPTY_STATE_MESSAGE} />
    }

    renderData() {
        const { teams } = this.props.teamList

        return (
            <div>
                <Grid container spacing={2}>
                    { teams.map(team => {
                        return (
                            <Grid key={team.id} item xs={12} sm={6} md={4}>
                                <Team team={team} />
                            </Grid>
                        )
                    }) }
                </Grid>
            </div>
        )
    }

    render() {
        const { teams, loading } = this.props.teamList
        const { account } = this.props.accountDetail;

        if(!account.hasTeamsAccess) {
          return <Redirect to={'/'} />
        }
        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && teams && teams.length > 0 && this.renderData() }
                { !loading && teams && teams.length == 0 && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ teamList, accountDetail }) => ({
    teamList,
    accountDetail
})

const mapsDispatchToProps = (dispatch) => ({
    teamListActions: bindActionCreators(teamListActions, dispatch)
})

export default connect(mapStateToProps, mapsDispatchToProps)(TeamList)
