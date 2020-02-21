import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { AppBarSubTitle, Card, Loader, MainLayoutComponent, ProgressButton, Select, TextField } from '../../../../components'
import * as roleListActions from '../../../../services/Roles/RoleList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as userCreationActions from '../../../../services/Users/UserCreation/actions'
import '../../../../helpers/FormsyHelper'

class AdminUserCreation extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            display: true,
            role: null
        };
        this.props.userCreationActions.clearUserCreation()
    }

    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Création d'un utilisateur" />);
        this.props.handleMaxWidth('sm');
        this.props.activateReturn();
        this.props.roleListActions.getRoleList();
        this.props.teamListActions.getTeamList()
    }

    handleValueChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value,
            display: false
        }, () => {
            this.setState({
                ...this.state,
                display: true
            })
        })
    };

    handleSubmit(model) {
        this.props.userCreationActions.createUser(model)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { loading } = this.props.userCreation;
        const { roles } = this.props.roleList;
        const { teams } = this.props.teamList;
        const collaboratorRole = roles.find(r => r.code == 'C');
        const managerRole = roles.find(r => r.code == 'M');
        const selectableTeams = this.state.role == collaboratorRole.id ? teams : this.state.role == managerRole.id ? teams.filter(t => !t.manager) : null;

        return (
            <div>
            <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField name='firstname' label='Prénom' fullWidth required
                                        validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name='lastname' label='Nom' fullWidth required
                                        validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name='email' label='Email' validations="isEmail" fullWidth required
                                        validationErrors={{
                                            isDefaultRequiredValue: 'Ce champ est requis.',
                                            isEmail: "L'email n'est pas valide."
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Select name='role' label='Type' options={roles} optionValueName='id' optionTextName='name' fullWidth required
                                        onChange={this.handleValueChange('role').bind(this)}
                                        validationErrors={{
                                            isDefaultRequiredValue: 'Ce champ est requis.'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    { this.state.display && <Select name='team' label='Équipe' options={selectableTeams} optionValueName='id' optionTextName='name' fullWidth /> }
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type='password' name='password' label='Mot de passe' fullWidth required
                                        validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type='password' name='paswwordConfirm' label='Confirmation du mot de passe' fullWidth
                                        validations='equalsField:password'
                                        validationErrors={{
                                            isDefaultRequiredValue: 'Ce champ est requis.',
                                            equalsField: 'Les mots de passe ne correspondent pas'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text='Valider' centered loading={loading} />
                    </Grid>
                </Grid>
            </Formsy>
            </div>
        )
    }

    render() {
        const { roles, loading: roleListLoading } = this.props.roleList;
        const { teams, loading: teamListLoading } = this.props.teamList;
        const { success } = this.props.userCreation;
        const loading = roleListLoading || teamListLoading;

        if (success) {
            this.props.userCreationActions.clearUserCreation();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && roles && teams && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ roleList, teamList, userCreation }) => ({
    roleList,
    teamList,
    userCreation
});

const mapDispatchToProps = (dispatch) => ({
    roleListActions: bindActionCreators(roleListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch),
    userCreationActions: bindActionCreators(userCreationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserCreation)