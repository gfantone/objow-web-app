import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {AndroidButton, Card, DarkTextField, DefaultText, ErrorText, IosButton, LinkedInButton, Logo, ProgressButton, Switch} from "../../../../../../components";
import * as Resources from "../../../../../../Resources";
import * as authErrors from "../../../../../../services/Auth/errors";
import Formsy from "formsy-react";
import KeyIcon from "../../../../../../assets/img/system/login/key.png"

const useStyles = makeStyles({
    form: {
        backgroundColor: '#2B2E45'
    },
    ssoSwitch: {

      position: 'absolute',
      right: 0,
      top: '50%',
      marginTop: '-21px',
    },
    ssoSwitchLabel: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.875rem',

    }
})

const LoginForm = ({onSubmit, onSubmitSSO, customError, resetCustomError, ...props}) => {
    const {loading, error} = props.auth
    const {detect} = require('detect-browser')
    const [isSSO, setIsSSO] = useState(false)
    const browser = detect()
    const isMobileApp = browser.name === 'ios-webview' || browser.name === 'chromium-webview'
    const classes = useStyles()

    return (
        <div>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Logo />
                </Grid>
                <Grid item xs={12}>
                  <Formsy onValidSubmit={isSSO ? onSubmitSSO : onSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <div>
                                <Grid container spacing={2} className={classes.form}>
                                    <Grid item xs={12}>
                                        <DarkTextField name='code' label={Resources.LOGIN_CODE_LABEL} fullWidth required
                                                       validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                    { !isSSO && (
                                      <React.Fragment>
                                        <Grid item xs={12}>
                                          <DarkTextField lowercase={true} name='email' label={Resources.LOGIN_EMAIL_LABEL} fullWidth required
                                            validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <DarkTextField lowercase={true} type='password' name='password' label={Resources.LOGIN_PASSWORD_LABEL} fullWidth required
                                            validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                            />
                                        </Grid>
                                      </React.Fragment>
                                    )}
                                </Grid>
                            </div>
                        </Grid>
                        {error === authErrors.LOGIN_ERROR || customError && <Grid item xs={12}>
                            <ErrorText align='center'>{customError || Resources.LOGIN_ERROR}</ErrorText>
                        </Grid>}

                        <Grid item xs={12} style={{position: 'relative'}}>
                            <ProgressButton type='submit' text={Resources.LOGIN_SUBMIT_BUTTON} centered loading={loading} />
                            <div className={ classes.ssoSwitch }>
                              <Switch
                                name='isSSO'
                                initial={ isSSO }
                                label={
                                  <React.Fragment>
                                    <img src={ KeyIcon } style={{
                                      height: '19px',
                                      marginBottom: '-5px',
                                      marginRight: '4px'
                                    }}/>
                                    SSO
                                  </React.Fragment>
                                }
                                onChange={() => {
                                  setIsSSO(!isSSO)
                                  resetCustomError()
                                }}
                                labelClass={classes.ssoSwitchLabel}
                                lightTheme
                              />
                            </div>
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
              </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = ({auth}) => ({
    auth
})

export default connect(mapStateToProps)(LoginForm)
