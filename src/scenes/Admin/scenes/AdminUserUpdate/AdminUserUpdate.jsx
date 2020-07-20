import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { AppBarSubTitle, Card, Loader, MainLayoutComponent, ProgressButton, Select, TextField } from '../../../../components'
import * as roleListActions from '../../../../services/Roles/RoleList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as userDetailActions from '../../../../services/Users/UserDetail/actions'
import * as userUpdateActions from '../../../../services/Users/UserUpdate/actions'
import * as userUpdateActivationActions from '../../../../services/Users/UserUpdateActivation/actions'
import * as userUpdatePasswordActions from '../../../../services/Users/UserUpdatePassword/actions'
import '../../../../helpers/FormsyHelper'
import * as Resources from "../../../../Resources";

class AdminUserUpdate extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.initialized = false;
        this.state = {
            role: null
        };
        this.props.userUpdateActions.clearUserUpdate();
        this.props.userUpdateActivationActions.clearUserActivationUpdate()
    }

    componentDidMount() {
        this.id = this.props.match.params.id;
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Modification d'un utilisateur" />);
        this.props.handleMaxWidth('sm');
        this.props.activateReturn();
        this.props.roleListActions.getRoleList();
        this.props.teamListActions.getTeamList();
        this.props.userDetailActions.getUserDetail(this.id)
    }

    componentWillReceiveProps(props) {
        const { user } = props.userDetail;
        if (!this.initialized && user) {
            this.state.role = user.role.id
        }
    }

    handleValueChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        })
    };

    handleChangeActivationClick = () => {
        const { user } = this.props.userDetail;
        this.props.userUpdateActivationActions.updateUserActivation(user)
    };

    handleValidSubmit(model) {
        model.id = this.id;
        this.props.userUpdateActions.updateUser(model);
        if (model.password && model.password != '') {
            this.props.userUpdatePasswordActions.updateUserPassword(this.id, model.password)
        }
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { loading: userUpdateLoading } = this.props.userUpdate;
        const { roles } = this.props.roleList;
        const { teams } = this.props.teamList;
        const { user } = this.props.userDetail;
        const collaboratorRole = roles.find(r => r.code == 'C');
        const managerRole = roles.find(r => r.code == 'M');
        const selectableTeams = this.state.role == collaboratorRole.id ? teams : this.state.role == managerRole.id ? teams.filter(t => t.manager && t.manager.id == user.id || !t.manager) : null;
        const initialTeam = selectableTeams && user.team && selectableTeams.find(x => x.id == user.team.id) != null ? user.team.id : null;
        const { loading: userUpdateActivationLoading } = this.props.userUpdateActivation;
        const activationButtonText = user.isActive ? 'Résilier le compte' : 'Réactiver le compte';

        return (
            <div>
            <Formsy onValidSubmit={this.handleValidSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField name='firstname' label='Prénom' initial={user.firstname} fullWidth required
                                        validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name='lastname' label='Nom' initial={user.lastname} fullWidth required
                                        validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name='email' label='Email' validations="isEmail" initial={user.email} fullWidth required
                                        validationErrors={{
                                            isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                            isEmail: "L'email n'est pas valide."
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Select name='role' label='Type' options={roles} optionValueName='id' optionTextName='name' initial={user.role ? user.role.id : null} fullWidth required
                                        onChange={this.handleValueChange('role').bind(this)}
                                        validationErrors={{
                                            isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Select name='team' label='Équipe' options={selectableTeams} optionValueName='id' optionTextName='name' initial={initialTeam} fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type='password' name='password' label='Nouveau mot de passe' fullWidth
                                        validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type='password' name='paswwordConfirm' label='Confirmation du mot de passe' fullWidth
                                        validations='equalsField:password'
                                        validationErrors={{
                                            isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                            equalsField: 'Les mots de passe ne correspondent pas'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <ProgressButton type='button' text={activationButtonText} color='secondary' centered loading={userUpdateActivationLoading} onClick={this.handleChangeActivationClick.bind(this)} />
                                </Grid>
                                <Grid item>
                                    <ProgressButton type='submit' text='Valider' centered loading={userUpdateLoading} />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Formsy>
            </div>
        )
    }

    render() {
        const { roles, loading: roleListLoading } = this.props.roleList;
        const { teams, loading: teamListLoading } = this.props.teamList;
        const { user, loading: userDetail } = this.props.userDetail;
        const { success: userUpdateSuccess } = this.props.userUpdate;
        const { success: userUpdateActivationSuccess } = this.props.userUpdateActivation;
        const loading = roleListLoading || teamListLoading || userDetail;

        if (userUpdateSuccess || userUpdateActivationSuccess) {
            this.props.userUpdateActions.clearUserUpdate();
            this.props.userUpdateActivationActions.clearUserActivationUpdate();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && roles && teams && user && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ roleList, teamList, userDetail, userUpdate, userUpdateActivation }) => ({
    roleList,
    teamList,
    userDetail,
    userUpdate,
    userUpdateActivation
});

const mapDispatchToProps = (dispatch) => ({
    roleListActions: bindActionCreators(roleListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch),
    userDetailActions: bindActionCreators(userDetailActions, dispatch),
    userUpdateActions: bindActionCreators(userUpdateActions, dispatch),
    userUpdateActivationActions: bindActionCreators(userUpdateActivationActions, dispatch),
    userUpdatePasswordActions: bindActionCreators(userUpdatePasswordActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserUpdate)
