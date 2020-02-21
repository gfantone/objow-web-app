import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Grid} from '@material-ui/core'
import Formsy from 'formsy-react'
import {AndroidButton, IconButton, IosButton, Logo, TextField} from './components'
import {Card, DefaultText, ErrorText, ProgressButton, WhiteText} from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import * as authActions from '../../services/Auth/actions'
import * as authErrors from '../../services/Auth/errors'

class Login extends Component {
    constructor(props) {
        super(props);
        this.props.authActions.clearLogin()
    }

    handleSubmit(model) {
        this.props.authActions.login(model.code.toLowerCase(), model.email.toLowerCase(), model.password)
    }

    onLinkedInClick() {
        window.open("https://www.linkedin.com/company/fire-tiger/", "_blank")
    }

    render() {
        const { loading, error } = this.props.auth;
        const logoData = require('../../assets/logo.png');
        const iosData = require('../../assets/img/mobile/ios.png');
        const androidData = require('../../assets/img/mobile/android.png');
        const { detect } = require('detect-browser');
        const browser = detect();
        const isMobileApp = browser.name == 'ios-webview' || browser.name == 'chromium-webview';

        return (
            <div>
                <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Logo image={logoData} />
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField name='code' label='Code entreprise' fullWidth required
                                            validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name='email' label='Email' fullWidth required
                                            validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField type='password' name='password' label='Mot de passe' fullWidth required
                                            validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        { error == authErrors.LOGIN_ERROR && <Grid item xs={12}>
                            <ErrorText align='center'>Les identifiants sont incorrects</ErrorText>
                        </Grid> }
                        <Grid item xs={12}>
                            <ProgressButton type='submit' text='Se connecter' centered loading={loading} />
                        </Grid>
                        { !isMobileApp && <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <DefaultText>
                                            Votre application Fire Tiger est disponible pour Iphone et Android.
                                        </DefaultText>
                                        <DefaultText>
                                            Téléchargez-la dès maintenant :
                                        </DefaultText>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IosButton image={iosData} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AndroidButton image={androidData} />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid> }
                        { !isMobileApp && <Grid item xs={12}>
                            <div>
                                <Grid container justify='center'>
                                    <Grid item>
                                        <IconButton onClick={this.onLinkedInClick}>
                                            <FontAwesomeIcon icon={faLinkedinIn} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid> }
                    </Grid>
                </Formsy>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    auth
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
