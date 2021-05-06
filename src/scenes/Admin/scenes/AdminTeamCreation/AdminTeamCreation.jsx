import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { AppBarSubTitle, Card, ColorInput, DefaultTitle, Loader, MainLayoutComponent, Select, TextField, ProgressButton, Avatar } from '../../../../components'
import * as collaboratorListActions from '../../../../services/Collaborators/CollaboratorList/actions'
import * as colorListActions from '../../../../services/Colors/ColorList/actions'
import * as managerListActions from '../../../../services/Managers/ManagerList/actions'
import * as teamCreationActions from '../../../../services/Teams/TeamCreation/actions'
import * as Resources from "../../../../Resources";
import _ from 'lodash'

const styles = {
    photo: {
        width: 48,
        height: 48
    }
};

class AdminTeamCreation extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            color: null,
            collaborators: []
        };
        this.props.teamCreationActions.clearTeamCreation()
    }

    handleColorClick = id => () => {
        this.setState({
            ...this.state,
            color: id
        })
    };

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

    handleSubmit(m) {
        const { collaborators } = this.props.collaboratorList;
        const model = this.refs.form.getModel();
        const team = { name: model.name, color: model.color, manager: model.manager };
        const newCollaborators = collaborators.filter(c => model.collaborators.includes(c.id));
        this.props.teamCreationActions.createTeam(team, newCollaborators)
    }

    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Création d'une équipe" />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.collaboratorListActions.getFreeCollaboratorList();
        this.props.colorListActions.getFreeColorList();
        this.props.managerListActions.getFreeManagerList()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderCollaboratorSelector(index, id = null) {
        const { classes } = this.props;
        var { collaborators } = this.props.collaboratorList;
        const ids = this.state.collaborators.filter(x => x != id);
        const collaborator = _.get(collaborators.filter(c => c.id == id), '[0]')
        var photo = id ? collaborator.photo : null;
        collaborators = collaborators.filter(collaborator => !ids.includes(collaborator.id));
        photo = photo ? photo : '/assets/img/user/avatar.svg';

        return (
            <Grid key={id ? id : 'new'} item xs={6}>
                <Card>
                    <Grid container spacing={2} alignItems='flex-end'>
                        <Grid item>
                            <Avatar className={classes.photo} src={photo} entityId={ _.get(collaborator, 'id') } fallbackName={ _.get(collaborator, 'fullname')} />
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
        const { loading } = this.props.teamCreation;
        var { colors } = this.props.colorList;
        const { managers } = this.props.managerList;
        const collaboratorCount = this.state.collaborators.length;

        return (
            <Formsy ref='form' onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={12}>
                            <DefaultTitle>Informations générales</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField name='name' label='Nom' fullWidth required
                                            validationErrors={{ isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Select name='manager' label='Manager' options={managers} optionValueName='id' optionTextName='fullname' fullWidth required
                                            validationErrors={{ isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ColorInput name='color' label='Couleur' colors={colors} required
                                            validationErrors={{ isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR }}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={12}>
                            <DefaultTitle>Collaborateurs</DefaultTitle>
                        </Grid>
                        { this.state.collaborators.map((collaborator, index) => {
                            return this.renderCollaboratorSelector(index, collaborator)
                        }) }
                        { this.renderCollaboratorSelector(collaboratorCount) }
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text='Valider' loading={loading} centered />
                    </Grid>
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { collaborators, loading: collaboratorListLoading } = this.props.collaboratorList;
        const { colors, loading: colorListLoading } = this.props.colorList;
        const { managers, loading: managerListLoading } = this.props.managerList;
        const { success } = this.props.teamCreation;
        const loading = collaboratorListLoading || colorListLoading || managerListLoading;

        if (success) {
            this.props.teamCreationActions.clearTeamCreation();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && collaborators && colors && managers && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ collaboratorList, colorList, managerList, teamCreation }) => ({
    collaboratorList,
    colorList,
    managerList,
    teamCreation
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorListActions: bindActionCreators(collaboratorListActions, dispatch),
    colorListActions: bindActionCreators(colorListActions, dispatch),
    managerListActions: bindActionCreators(managerListActions, dispatch),
    teamCreationActions: bindActionCreators(teamCreationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminTeamCreation))
