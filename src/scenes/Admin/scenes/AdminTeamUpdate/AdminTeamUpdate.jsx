import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid, IconButton, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { AppBarSubTitle, Card, ColorInput, DefaultTitle, Loader, MainLayoutComponent, Select, TextField, ProgressButton } from '../../../../components'
import * as collaboratorListActions from '../../../../services/Collaborators/CollaboratorList/actions'
import * as colorListActions from '../../../../services/Colors/ColorList/actions'
import * as managerListActions from '../../../../services/Managers/ManagerList/actions'
import * as teamDetailActions from '../../../../services/Teams/TeamDetail/actions'
import * as teamUpdateActions from '../../../../services/Teams/TeamUpdate/actions'
import * as teamRemovingActions from '../../../../services/Teams/TeamRemoving/actions'
import * as Resources from "../../../../Resources";

const styles = {
    photo: {
        width: 48,
        height: 48
    }
};

class AdminTeamUpdate extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.initialized = false;
        this.collaborators = [];
        this.state = {
            color: null,
            collaborators: []
        };
        this.props.teamUpdateActions.clearTeamUpdate();
        this.props.teamRemovingActions.clearTeamRemoving()
    }

    getManagers() {
        var { managers } = this.props.managerList;
        const { team } = this.props.teamDetail;
        if (team && team.manager) {
            managers.splice(0, 0, team.manager)
        }
        return managers
    }

    handleCollaboratorChange = index => value => {
        var collaborators = this.refs.form.getModel().collaborators;
        collaborators[index] = Number(value);
        collaborators = collaborators.filter(x => x != -1);
        this.setState({
            ...this.state,
            collaborators: collaborators
        })
    };

    handleRemoveCollaborator = index => () => {
        var collaborators = this.state.collaborators;
        collaborators.splice(index, 1);
        this.setState({
            ...this.state,
            collaborators: collaborators
        })
    };

    handleRemoveTeam = () => {
        this.props.teamRemovingActions.removeTeam(this.props.match.params.id)
    };

    handleSubmit(m) {
        const managers = this.getManagers();
        const model = this.refs.form.getModel();
        const team = { id: this.id, name: model.name, color: model.color, manager: model.manager };
        const newCollaborators = this.collaborators.filter(c => model.collaborators.includes(c.id));
        const oldCollaborators = this.id ? this.collaborators.filter(c => c.team && c.team.id == this.id && !model.collaborators.includes(c.id)) : [];
        this.props.teamUpdateActions.updateTeam(team, newCollaborators, oldCollaborators)
    }

    componentDidMount() {
        this.id = this.props.match.params.id;
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Modification d'une équipe" />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.collaboratorListActions.getFreeCollaboratorList();
        this.props.colorListActions.getFreeColorList();
        this.props.managerListActions.getFreeManagerList();
        this.props.teamDetailActions.getTeamDetail(this.id)
    }

    componentWillReceiveProps(props) {
        const { collaborators } = props.collaboratorList;
        const { team } = props.teamDetail;
        if (this.id && !this.initialized && collaborators && team) {
            const collaboratorIds = team.collaborators.map(c => c.id);
            this.initialized = true;
            this.collaborators = collaborators.concat(team.collaborators);
            this.state.color = team.color.id;
            this.state.collaborators = collaboratorIds
        }
    }

    renderLoader() {
        return <Loader centered />
    }

    renderCollaboratorSelector(index, id = null) {
        const { classes } = this.props;
        var collaborators = this.collaborators;
        const ids = this.state.collaborators.filter(x => x != id);
        var photo = id ? collaborators.filter(c => c.id == id)[0].photo : null;
        collaborators = collaborators.filter(collaborator => !ids.includes(collaborator.id));
        photo = photo ? photo : '/assets/img/user/avatar.svg';

        return (
            <Grid key={id ? id : 'new'} item xs={6}>
                <Card>
                    <Grid container spacing={2} alignItems='flex-end'>
                        <Grid item>
                            <Avatar className={classes.photo} src={photo} />
                        </Grid>
                        <Grid item xs>
                        <Select name={`collaborators[${index}]`} label={`Collaborateur ${index + 1}`} options={collaborators} initial={id ? id : null} onChange={this.handleCollaboratorChange(index)} optionValueName='id' optionTextName='fullname' fullWidth />
                        </Grid>
                        { id && <Grid item>
                            <IconButton size='small' onClick={this.handleRemoveCollaborator(index).bind(this)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </IconButton>
                        </Grid> }
                    </Grid>
                </Card>
            </Grid>
        )
    }

    renderData() {
        const { loading } = this.props.teamUpdate;
        const { teamRemovingLoading } = this.props.teamRemoving;
        var { colors } = this.props.colorList;
        const managers = this.getManagers();
        const { team } = this.props.teamDetail;
        const collaboratorCount = this.state.collaborators.length;
        const hasCollaborators = collaboratorCount > 0;
        if (team && !colors.includes(team.color)) {
            colors.splice(0, 0, team.color)
        }

        return (
            <Formsy ref='form' onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <DefaultTitle>Informations générales</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField name='name' label='Nom' initial={team.name} fullWidth required
                                                    validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Select name='manager' label='Manager' initial={team.manager ? team.manager.id : null} options={managers} optionValueName='id' optionTextName='fullname' fullWidth required
                                                    validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ColorInput name='color' label='Couleur' initial={team.color.id} colors={colors} required
                                                    validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <DefaultTitle>Collaborateurs</DefaultTitle>
                                </Grid>
                                { this.state.collaborators.map((collaborator, index) => {
                                    return this.renderCollaboratorSelector(index, collaborator)
                                }) }
                                { this.renderCollaboratorSelector(collaboratorCount) }
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Grid container justify={'space-between'}>
                                <Grid item>
                                    { !hasCollaborators && <ProgressButton type={'button'} color='secondary' text={'Supprimer'} loading={teamRemovingLoading} centered onClick={this.handleRemoveTeam.bind(this)} /> }
                                </Grid>
                                <Grid item>
                                    <ProgressButton type='submit' text='Valider' loading={loading} centered />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { collaborators, loading: collaboratorListLoading } = this.props.collaboratorList;
        const { colors, loading: colorListLoading } = this.props.colorList;
        const { managers, loading: managerListLoading } = this.props.managerList;
        const { team, loading: teamDetailLoading } = this.props.teamDetail;
        const { success: teamUpdateSuccess } = this.props.teamUpdate;
        const { success: teamRemovingSuccess } = this.props.teamRemoving;
        const loading = collaboratorListLoading || colorListLoading || managerListLoading || teamDetailLoading;
        const success = teamUpdateSuccess || teamRemovingSuccess;

        if (success) {
            this.props.teamUpdateActions.clearTeamUpdate();
            this.props.teamRemovingActions.clearTeamRemoving();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && collaborators && colors && managers && team && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ collaboratorList, colorList, managerList, teamDetail, teamUpdate, teamRemoving }) => ({
    collaboratorList,
    colorList,
    managerList,
    teamDetail,
    teamUpdate,
    teamRemoving
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorListActions: bindActionCreators(collaboratorListActions, dispatch),
    colorListActions: bindActionCreators(colorListActions, dispatch),
    managerListActions: bindActionCreators(managerListActions, dispatch),
    teamDetailActions: bindActionCreators(teamDetailActions, dispatch),
    teamUpdateActions: bindActionCreators(teamUpdateActions, dispatch),
    teamRemovingActions: bindActionCreators(teamRemovingActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminTeamUpdate))
