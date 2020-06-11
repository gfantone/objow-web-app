import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Collaborator, DefaultTitle, EmptyState, Loader} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'

const styles = {
    panel: {
        backgroundColor: 'initial',
        borderRadius: 'initial',
        boxShadow: 'none'
    },
    panelSummary: {
        padding: 'initial'
    },
    panelDetails: {
        padding: 'initial',
        paddingBottom: 24
    }
}

const AdministratorCollaboratorSelector = ({onClick, ...props}) => {
    const {classes} = props
    const {teams, loading} = props.teamList

    useEffect(() => {
        props.teamListActions.getTeamList()
    }, [])

    function renderLoader() {
        return <Loader centered />
    }

    function renderEmptyState() {
        return <EmptyState title={Resources.ADMINISTRATOR_COLLABORATOR_SELECTOR_EMPTY_STATE_TITLE} message={Resources.ADMINISTRATOR_COLLABORATOR_SELECTOR_EMPTY_STATE_MESSAGE} />
    }

    function renderData() {
        return (
            <div>
                {teams.map((team, index) => {
                    const teamKey = `T${team.id}`
                    return (
                        <div key={teamKey}>
                            {team.collaborators.length > 0 && <ExpansionPanel className={classes.panel}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panelSummary}>
                                    <DefaultTitle key={teamKey}>
                                        {team.name}
                                    </DefaultTitle>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.panelDetails}>
                                    <Grid container key={teamKey} spacing={2}>
                                        {team.collaborators.map(collaborator => {
                                            const collaboratorKey = `C${collaborator.id}`
                                            return (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={collaboratorKey} onClick={() => onClick(collaborator.id)}>
                                                    <Collaborator key={collaboratorKey} collaborator={collaborator} />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && teams && teams.length > 0 && renderData()}
            {!loading && teams && teams.length === 0 && renderEmptyState()}
        </div>
    )
}

const mapStateToProps = ({teamList}) => ({
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    teamListActions: bindActionCreators(teamListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdministratorCollaboratorSelector))
