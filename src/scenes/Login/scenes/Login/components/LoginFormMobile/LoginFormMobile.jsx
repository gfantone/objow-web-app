import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, CardMedia, isWidthUp, withWidth } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';
import { withStyles } from '@material-ui/styles';
import { Logo, Title } from './components';
import {
  BoldSpan,
  ErrorText,
  ProgressButton,
  TextField,
  BigText,
  LanguageSelect,
  I18nWrapper,
  Card,
  HiddenInput,
  PasswordField,
  Switch,
} from '../../../../../../components';
import { useIntl } from 'react-intl';
import * as Resources from '../../../../../../Resources';
import * as authErrors from '../../../../../../services/Auth/errors';
import Formsy from 'formsy-react';
import KeyIcon from '../../../../../../assets/img/system/login/key.png';
import LogoBlack from '../../../../../../assets/logo_black.png';

const styles = {
  form: {
    // backgroundColor: '#2B2E45'
  },
  ssoSwitch: {
    position: 'absolute',
    right: '50%',
    marginRight: -50,
    // bottom: '10',
    marginTop: '-31px',
  },
  ssoSwitchMobile: {
    marginTop: 10,
    marginLeft: 'calc(50% - 50px)',
    width: 200,
  },
  ssoSwitchLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    fontFamily: 'Avenir',
  },
  card: {
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  inputs: {
    '& label, & label.Mui-focused, & input:not(.Mui-error), & textarea:not(.Mui-error)':
      {
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Avenir',
        color: '#555555',
      },
  },
  submit_button: {
    '& .MuiButton-root': {
      width: '100%',
      borderRadius: 5,
      textTransform: 'none',
      fontFamily: 'Avenir',
      fontSize: 18,
      height: 40,
      paddingTop: 4,
      paddingBottom: 4,
    },
  },
  logo: {
    width: 240,
    height: 90,
    margin: 'auto',
    marginTop: 50,
    marginBottom: 30,
  },
  connexionText: {
    textTransform: 'none',
    fontSize: 30,
    marginTop: -2,
    paddingTop: 5,
    // paddingBottom: 5,
    color: '#555',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
  },
};

const LoginFormMobile = ({
  onSubmit,
  onSubmitSSO,
  classes,
  customError,
  resetCustomError,
  ...props
}) => {
  const context = useContext(I18nWrapper.Context);
  const [locale, setLocale] = useState(context.locale);
  const intl = useIntl();
  const [isSSO, setIsSSO] = useState(false);
  const { loading, error } = props.auth;
  const [displayCaptcha, setDisplayCaptcha] = useState(
    error === 'connection_attempts_exceeded'
  );
  console.log('displayCaptcha', displayCaptcha);
  const [captcha, setCaptcha] = useState();
  const { detect } = require('detect-browser');
  const browser = detect();
  const isMobileApp =
    browser.name === 'ios-webview' || browser.name === 'chromium-webview';
  const isDesktop = isWidthUp('sm', props.width);
  const ssoSwitchClass = isDesktop
    ? classes.ssoSwitch
    : classes.ssoSwitchMobile;

  const onChangeLanguage = (value) => {
    setLocale(value);
  };

  const onCaptchaChange = (value) => {
    setCaptcha(value);
  };

  useEffect(() => {
    if (!displayCaptcha && error === 'connection_attempts_exceeded') {
      setDisplayCaptcha(true);
    }
  }, [error]);

  useEffect(() => {
    context.selectLanguage(locale);
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <div>
      <Grid container spacing={2} justify='flex-end'>
        <Grid item xs={12}>
          <CardMedia className={classes.logo} image={LogoBlack} />
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs container>
            <Grid item>
              <BigText className={classes.connexionText}>
                {intl.formatMessage({ id: 'login.title' })}
              </BigText>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 10 }}>
            <Formsy>
              <LanguageSelect
                name='locale'
                initial={locale}
                onChange={onChangeLanguage}
              />
            </Formsy>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.card}>
            <Formsy onValidSubmit={isSSO ? onSubmitSSO : onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div>
                    <Grid container spacing={2} className={classes.form}>
                      <Grid item xs={12}>
                        <TextField
                          name='code'
                          variant='outlined'
                          placeholder={intl.formatMessage({
                            id: 'login.code_placeholder',
                          })}
                          className={classes.inputs}
                          label={intl.formatMessage({ id: 'login.code_label' })}
                          fullWidth
                          required
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                          }}
                        />
                      </Grid>
                      {!isSSO && (
                        <React.Fragment>
                          <Grid item xs={12}>
                            <TextField
                              lowercase={true}
                              variant='outlined'
                              placeholder={intl.formatMessage({
                                id: 'login.email_placeholder',
                              })}
                              className={classes.inputs}
                              name='email'
                              label={intl.formatMessage({
                                id: 'login.email_label',
                              })}
                              fullWidth
                              required
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <PasswordField
                              lowercase={true}
                              variant='outlined'
                              placeholder='●●●●●●●'
                              className={classes.inputs}
                              type='password'
                              name='password'
                              label={intl.formatMessage({
                                id: 'login.password_label',
                              })}
                              fullWidth
                              required
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                              }}
                            />
                          </Grid>
                        </React.Fragment>
                      )}
                    </Grid>
                  </div>
                </Grid>
                {error === authErrors.LOGIN_ERROR && (
                  <Grid item xs={12}>
                    <ErrorText align='center'>
                      {intl.formatMessage({ id: 'login.error' })}
                    </ErrorText>
                  </Grid>
                )}
                {displayCaptcha && (
                  <Grid item xs={12}>
                    <ReCAPTCHA
                      sitekey='6LctniwfAAAAAE8bs1iQ-_Uuvkqya66J2qbvyg2H'
                      onChange={onCaptchaChange}
                    />
                    <HiddenInput name='captcha' value={captcha} />
                  </Grid>
                )}
                <Grid item xs={12} className={classes.submit_button}>
                  <ProgressButton
                    type='submit'
                    text={intl.formatMessage({ id: 'login.submit_button' })}
                    centered
                    loading={loading}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    position: 'relative',
                    paddingTop: isDesktop ? 30 : 0,
                  }}
                >
                  <div className={ssoSwitchClass}>
                    <Switch
                      name='isSSO'
                      initial={isSSO}
                      label={
                        <React.Fragment>
                          <img
                            src={KeyIcon}
                            style={{
                              height: '19px',
                              marginBottom: '-5px',
                              marginRight: '4px',
                            }}
                          />
                          SSO
                        </React.Fragment>
                      }
                      onChange={() => {
                        setIsSSO(!isSSO);
                        resetCustomError();
                      }}
                      labelClass={classes.ssoSwitchLabel}
                      lightTheme
                    />
                  </div>
                </Grid>
              </Grid>
            </Formsy>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(
  withWidth()(withStyles(styles)(LoginFormMobile))
);
