import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Avatar, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Card, FileInput, MainLayoutComponent, ProgressButton, TextField } from '../../../../components'
import * as accountUpdateActions from '../../../../services/Account/AccountUpdate/actions'
import * as userUpdatePasswordActions from '../../../../services/Users/UserUpdatePassword/actions'
import '../../../../helpers/FormsyHelper'

const styles = {
    photo: {
        height: 100,
        width: 100
    }
};

class AccountDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    componentDidMount() {
        this.props.handleTitle('Mon profil');
        this.props.handleMaxWidth('sm');
        this.props.activateReturn()
    }

    handleValueChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        })
    };

    handleValidSubmit(model) {
        const { account: oldAccount } = this.props.accountDetail;
        const newAccount = new FormData();
        if (model.photo) {
            newAccount.append('photo', model.photo, model.photo.name)
        }
        newAccount.append('firstname', model.firstname);
        newAccount.append('lastname', model.lastname);
        newAccount.append('email', model.email);
        if (oldAccount.role.code != 'A') {
            newAccount.append('citation', model.citation);
        }
        this.props.accountUpdateActions.updateAccount(newAccount);
        if (model.password && model.password != '') {
            this.props.userUpdatePasswordActions.updateUserPassword(this.props.accountDetail.account.id, model.password)
        }
    }

    render() {
        const { classes } = this.props;
        const { account } = this.props.accountDetail;
        const { loading } = this.props.accountUpdate;
        const photo = account.photo ? account.photo : '/assets/img/user/avatar.svg';

        return (
            <div>
                <Formsy onValidSubmit={this.handleValidSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} container justify='center'>
                                        <Grid item>
                                            <Avatar src={photo} className={classes.photo} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container justify='center'>
                                        <Grid item>
                                            <FileInput name='photo' accept='image/*' />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField name='firstname' label='Prénom' initial={account.firstname} fullWidth required
                                            validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField name='lastname' label='Nom' initial={account.lastname} fullWidth required
                                            validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name='email' label='Email' validations="isEmail" initial={account.email} fullWidth required
                                            validationErrors={{
                                                isDefaultRequiredValue: 'Ce champ est requis.',
                                                isEmail: "L'email n'est pas valide."
                                            }}
                                        />
                                    </Grid>
                                    { account.role.code != 'A' && <Grid item xs={12}>
                                        <TextField name='citation' label='Citation' initial={account.citation} fullWidth multiline />
                                    </Grid> }
                                    <Grid item xs={6}>
                                        <TextField type='password' name='password' label='Nouveau mot de passe' fullWidth
                                            onChange={this.handleValueChange('password').bind(this)}
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
}

const mapStateToProps = ({ accountDetail, accountUpdate }) => ({
    accountDetail,
    accountUpdate
});

const mapDispatchToProps = (dispatch) => ({
    accountUpdateActions: bindActionCreators(accountUpdateActions, dispatch),
    userUpdatePasswordActions: bindActionCreators(userUpdatePasswordActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountDetail))
