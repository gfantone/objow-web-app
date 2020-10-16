import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Formsy from 'formsy-react'
import {AndroidButton, Card, DarkTextField, DefaultText, ErrorText, IosButton, LinkedInButton, Logo, ProgressButton} from '../../../../components'
import * as authActions from '../../../../services/Auth/actions'
import * as authErrors from '../../../../services/Auth/errors'
import * as Resources from "../../../../Resources"

const styles = {
    form: {
        backgroundColor: '#2B2E45'
    }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.props.authActions.clearLogin()
    }

    handleSubmit(model) {
        this.props.authActions.login(model.code.toLowerCase(), model.email.toLowerCase(), model.password)
    }

    render() {
        const {classes} = this.props
        const {loading, error} = this.props.auth
        const {detect} = require('detect-browser')
        const browser = detect()
        const isMobileApp = browser.name === 'ios-webview' || browser.name === 'chromium-webview'

        return (
            <div>
                <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Logo />
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <Grid container spacing={2} className={classes.form}>
                                    <Grid item xs={12}>
                                        <DarkTextField name='code' label={Resources.LOGIN_CODE_LABEL} fullWidth required
                                            validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DarkTextField name='email' label={Resources.LOGIN_EMAIL_LABEL} fullWidth required
                                            validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DarkTextField type='password' name='password' label={Resources.LOGIN_PASSWORD_LABEL} fullWidth required
                                            validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        {error === authErrors.LOGIN_ERROR && <Grid item xs={12}>
                            <ErrorText align='center'>{Resources.LOGIN_ERROR}</ErrorText>
                        </Grid>}
                        <Grid item xs={12}>
                            <ProgressButton type='submit' text={Resources.LOGIN_SUBMIT_BUTTON} centered loading={loading} />
                        </Grid>
                        {!isMobileApp && <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <DefaultText>{Resources.LOGIN_STORE_MESSAGE_1}</DefaultText>
                                        <DefaultText>{Resources.LOGIN_STORE_MESSAGE_2}</DefaultText>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IosButton />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AndroidButton />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>}
                        {!isMobileApp && <Grid item xs={12}>
                            <div>
                                <Grid container justify='center'>
                                    <Grid item>
                                        <LinkedInButton />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>}
                    </Grid>
                </Formsy>
            </div>
        )
    }
}

const mapStateToProps = ({auth}) => ({
    auth
})

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
