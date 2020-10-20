import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Formsy from 'formsy-react'
import {AndroidButton, Card, DarkTextField, DarkTitle, DefaultText, ErrorText, IosButton, LinkedInButton, Logo, ProgressButton, WebsiteButton} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as errors from '../../../../services/Authentications/AircallAuthentication/errors'
import * as aircallAuthenticationActions from '../../../../services/Authentications/AircallAuthentication/actions'

const styles = {
    form: {
        backgroundColor: '#2B2E45'
    }
}

class AircallConnection extends Component {
    componentDidMount() {
        this.props.aircallAuthenticationActions.clearAircallConnect()
    }

    handleValidSubmit(model) {
        const params = new URLSearchParams(window.location.search)
        const oauthCode = params.get('code')
        this.props.aircallAuthenticationActions.connectAircall(model.code, model.email, model.password, oauthCode)
    }

    render() {
        const {classes} = this.props
        const {success, loading, error} = this.props.aircallAuthentication
        const {detect} = require('detect-browser')
        const browser = detect()
        const isMobileApp = browser.name === 'ios-webview' || browser.name === 'chromium-webview'

        if (success) {
            this.props.aircallAuthenticationActions.clearAircallConnect()
            window.location = "https://dashboard-v2.aircall.io/oauth/success"
        }

        return (
            <div>
                <Formsy onValidSubmit={this.handleValidSubmit.bind(this)}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <Logo />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <div>
                                        <Grid container spacing={2} className={classes.form}>
                                            <Grid item xs={12}>
                                                <DarkTitle align='center'>{Resources.AIRCALL_CONNECTION_TITLE}</DarkTitle>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DarkTextField name='code' label={Resources.AIRCALL_CONNECTION_CODE_LABEL} fullWidth required
                                                           validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DarkTextField name='email' label={Resources.AIRCALL_CONNECTION_EMAIL_LABEL} fullWidth required
                                                           validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DarkTextField type='password' name='password' label={Resources.AIRCALL_CONNECTION_PASSWORD_LABEL} fullWidth required
                                                           validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                {error === errors.AUTHORIZATION_ERROR && <Grid item xs={12}>
                                    <ErrorText align='center'>{Resources.AIRCALL_CONNECTION_AUTHORIZATION_ERROR}</ErrorText>
                                </Grid>}
                                {error === errors.EXPIRATION_ERROR && <Grid item xs={12}>
                                    <ErrorText align='center'>{Resources.AIRCALL_CONNECTION_EXPIRATION_ERROR}</ErrorText>
                                </Grid>}
                                {error === errors.LOGIN_ERROR && <Grid item xs={12}>
                                    <ErrorText align='center'>{Resources.AIRCALL_CONNECTION_LOGIN_ERROR}</ErrorText>
                                </Grid>}
                                {error === errors.UNKNOWN_ERROR && <Grid item xs={12}>
                                    <ErrorText align='center'>{Resources.AIRCALL_CONNECTION_UNKNOWN_ERROR}</ErrorText>
                                </Grid>}
                                <Grid item xs={12}>
                                    <ProgressButton type='submit' text={Resources.AIRCALL_CONNECTION_SUBMIT_BUTTON} centered loading={loading} />
                                </Grid>
                                {!isMobileApp && <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <DefaultText>{Resources.AIRCALL_CONNECTION_STORE_MESSAGE_1}</DefaultText>
                                                <DefaultText>{Resources.AIRCALL_CONNECTION_STORE_MESSAGE_2}</DefaultText>
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
                                        <Grid container justify='center' spacing={2}>
                                            <Grid item>
                                                <WebsiteButton />
                                            </Grid>
                                            <Grid item>
                                                <LinkedInButton />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Formsy>
            </div>
        )
    }
}

const mapStateToProps = ({aircallAuthentication}) => ({
    aircallAuthentication
})

const mapDispatchToProps = (dispatch) => ({
    aircallAuthenticationActions: bindActionCreators(aircallAuthenticationActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AircallConnection))
