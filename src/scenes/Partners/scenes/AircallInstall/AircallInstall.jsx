import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CardMedia, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Formsy from 'formsy-react'
import {Button} from './components'
import {Card, DarkTextField, DarkTitle, DefaultText, ErrorText, LinkedInButton, Logo, ProgressButton} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as errors from '../../../../services/Authentications/AircallAuthentication/errors'
import * as aircallAuthenticationActions from '../../../../services/Authentications/AircallAuthentication/actions'

const styles = {
    form: {
        backgroundColor: '#2B2E45'
    },
    noCustomer: {
        width: 100,
        height: 100
    }
}

class AircallInstall extends Component {
    componentDidMount() {
        this.props.aircallAuthenticationActions.clearAircallConnect()
    }

    handleValidSubmit(model) {
        this.props.aircallAuthenticationActions.connectAircall(model.code, model.email, model.password)
    }

    render() {
        const {classes} = this.props
        const {redirectUri, loading, error} = this.props.aircallAuthentication
        const noCustomer = require('../../../../assets/img/system/partners/nocustomer.png')

        if (redirectUri) {
            this.props.aircallAuthenticationActions.clearAircallConnect()
            window.location = redirectUri
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
                                                <DarkTitle align='center'>{Resources.AIRCALL_INSTALL_TITLE}</DarkTitle>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DarkTextField name='code' label={Resources.AIRCALL_INSTALL_CODE_LABEL} fullWidth required
                                                           validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DarkTextField name='email' label={Resources.AIRCALL_INSTALL_EMAIL_LABEL} fullWidth required
                                                           validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DarkTextField type='password' name='password' label={Resources.AIRCALL_INSTALL_PASSWORD_LABEL} fullWidth required
                                                           validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                {error === errors.AUTHORIZATION_ERROR && <Grid item xs={12}>
                                    <ErrorText align='center'>{Resources.AIRCALL_INSTALL_AUTHORIZATION_ERROR}</ErrorText>
                                </Grid>}
                                {error === errors.LOGIN_ERROR && <Grid item xs={12}>
                                    <ErrorText align='center'>{Resources.AIRCALL_INSTALL_LOGIN_ERROR}</ErrorText>
                                </Grid>}
                                {error === errors.UNKNOWN_ERROR && <Grid item xs={12}>
                                    <ErrorText align='center'>{Resources.AIRCALL_INSTALL_UNKNOWN_ERROR}</ErrorText>
                                </Grid>}
                                <Grid item xs={12}>
                                    <ProgressButton type='submit' text={Resources.AIRCALL_INSTALL_SUBMIT_BUTTON} centered loading={loading} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2} justify='center' alignItems='center'>
                                            <Grid item>
                                                <CardMedia image={noCustomer} className={classes.noCustomer} />
                                            </Grid>
                                            <Grid item>
                                                <DefaultText>{Resources.AIRCALL_INSTALL_NO_CUSTOMER_BUTTON_1}</DefaultText>
                                                <DefaultText>{Resources.AIRCALL_INSTALL_NO_CUSTOMER_BUTTON_2}</DefaultText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={2} justify='space-between'>
                                                    <Grid item>
                                                        <Button onClick={() => window.open('http://firetiger.fr/', '_blank')}>{Resources.AIRCALL_INSTALL_WEBSITE_BUTTON}</Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button color='secondary' onClick={() => window.open('https://firetiger.fr/index.php/demonstration', '_blank')}>{Resources.AIRCALL_INSTALL_DEMO_BUTTON}</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Grid container justify='center'>
                                            <Grid item>
                                                <LinkedInButton />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AircallInstall))
