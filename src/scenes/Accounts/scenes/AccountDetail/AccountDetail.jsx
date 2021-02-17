import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Avatar, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {AccentText, Card, FileInput, InfoText, MainLayoutComponent, ProgressButton, TextField} from '../../../../components'
import * as Resources from '../../../../Resources'
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
        this.props.accountUpdateActions.clearAccountUpdate()
    }

    componentDidMount() {
        this.props.handleTitle(Resources.ACCOUNT_TITLE);
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
        const newAccountPhoto = new FormData();
        if (model.photo) {
            newAccountPhoto.append('photo', model.photo, model.photo.name)
        }
        const newAccount = {firstname: model.firstname, lastname: model.lastname, email: model.email, citation: oldAccount.role.code != 'A' ? model.citation : null}
        this.props.accountUpdateActions.updateAccount(newAccount, newAccountPhoto);
        if (model.password && model.password != '') {
            this.props.userUpdatePasswordActions.updateUserPassword(this.props.accountDetail.account.id, model.password)
        }
    }

    render() {
        const { classes } = this.props;
        const { account } = this.props.accountDetail;
        const { loading, success } = this.props.accountUpdate;
        const photo = account.photo ? account.photo : '/assets/img/user/avatar.svg';

        const {detect} = require('detect-browser')
        const browser = detect()
        const isIos = browser.name === 'ios-webview'

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
                                            <InfoText>{account.role.name}</InfoText>
                                        </Grid>
                                    </Grid>  
                                    <Grid item xs={12} container justify='center'>
                                      <Grid item>
                                        <FileInput name='photo' accept='image/*' />
                                      </Grid>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField name='firstname' label={Resources.ACCOUNT_FIRST_NAME_LABEL} initial={account.firstname} fullWidth required
                                            validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField name='lastname' label={Resources.ACCOUNT_LAST_NAME_LABEL} initial={account.lastname} fullWidth required
                                            validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name='email' label={Resources.ACCOUNT_EMAIL_LABEL} validations="isEmail" initial={account.email} fullWidth required
                                            validationErrors={{
                                                isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                isEmail: Resources.COMMON_EMAIL_ERROR
                                            }}
                                        />
                                    </Grid>
                                    { account.role.code != 'A' && <Grid item xs={12}>
                                        <TextField name='citation' label={Resources.ACCOUNT_CITATION_LABEL} initial={account.citation} fullWidth multiline />
                                    </Grid> }
                                    <Grid item xs={6}>
                                        <TextField type='password' name='password' label={Resources.ACCOUNT_PASSWORD_LABEL} fullWidth
                                            onChange={this.handleValueChange('password').bind(this)}
                                            validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField type='password' name='paswwordConfirm' label={Resources.ACCOUNT_CONFIRM_PASSWORD_LABEL} fullWidth
                                            validations='equalsField:password'
                                            validationErrors={{
                                                isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                equalsField: Resources.COMMON_PASSWORD_NOT_MATCH_ERROR
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <ProgressButton type='submit' text={Resources.ACCOUNT_SUBMIT_BUTTON} centered loading={loading} />
                        </Grid>
                        {success && <Grid item xs={12}>
                            <AccentText align='center'>{Resources.ACCOUNT_SUCCESS_MESSAGE}</AccentText>
                        </Grid>}
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
