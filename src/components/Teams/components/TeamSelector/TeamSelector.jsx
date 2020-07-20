import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {Card, EmptyState, Loader} from '../../..'
import {Team} from '..'
import * as Resources from '../../../../Resources'
import * as teamListAction from '../../../../services/Teams/TeamList/actions'

const styles = {
    team: {
        cursor: 'pointer'
    }
}

class TeamSelector extends Component {
    componentDidMount() {
        this.props.teamListAction.getTeamList()
    }

    handleClick(id) {
        this.props.onClick(id)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={Resources.TEAM_SELECTOR_EMPTY_STATE_TITLE} message={Resources.TEAM_SELECTOR_EMPTY_STATE_MESSAGE} />
    }

    renderData() {
        const {classes} = this.props
        const {teams} = this.props.teamList

        return (
            <Grid container spacing={2}>
                { teams.map(team => {
                    const key = team.id
                    return (
                        <Grid key={key} item xs={12} sm={6} md={4} onClick={() => this.handleClick(team.id)} className={classes.team}>
                            <Card>
                                <Team team={team} />
                            </Card>
                        </Grid>
                    )
                }) }
            </Grid>
        )
    }

    render() {
        const {teams, loading} = this.props.teamList

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && teams && teams.length > 0 && this.renderData()}
                {!loading && teams && teams.length == 0 && this.renderEmptyState()}
            </div>
        )
    }
}

const mapStateToProps = ({teamList}) => ({
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    teamListAction: bindActionCreators(teamListAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamSelector))
