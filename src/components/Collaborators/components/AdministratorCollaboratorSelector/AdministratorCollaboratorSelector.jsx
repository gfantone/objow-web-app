import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Collaborator, DefaultTitle, EmptyState, Loader } from '../../../../components'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'

const styles = {
    panel: {
        backgroundColor: 'initial',
        borderRadius: 'initial',
        boxShadow: 'none'
    }
};

class AdministratorCollaboratorSelector extends Component {
    componentDidMount() {
        this.props.teamListActions.getTeamList()
    }

    handleClick(id) {
        this.props.onClick(id)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title='Aucune équipe trouvée' message="Les équipes n'ont pas encore été créées" />
    }

    renderData() {
        const { classes } = this.props;
        const { teams } = this.props.teamList;

        return (
            <div>
                { teams.map((team, index) => {
                    const teamKey = `T${team.id}`;
                    return (
                        <div key={teamKey}>
                            { team.collaborators.length > 0 && <ExpansionPanel className={classes.panel}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <DefaultTitle key={teamKey}>
                                        { team.name }
                                    </DefaultTitle>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.details}>
                                    <Grid container key={teamKey} spacing={2}>
                                        { team.collaborators.map(collaborator => {
                                            const collaboratorKey = `C${collaborator.id}`;
                                            return (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={collaboratorKey} onClick={() => this.handleClick(collaborator.id)}>
                                                    <Collaborator key={collaboratorKey} collaborator={collaborator} />
                                                </Grid>
                                            )
                                        }) }
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel> }
                        </div>
                    )
                }) }
            </div>
        )
    }

    render() {
        const { teams, loading } = this.props.teamList;
        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && teams && teams.length > 0 && this.renderData() }
                { !loading && teams && teams.length == 0 && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ teamList }) => ({
    teamList
});

const mapDispatchToProps = (dispatch) => ({
    teamListActions: bindActionCreators(teamListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdministratorCollaboratorSelector))