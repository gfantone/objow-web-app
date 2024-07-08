import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Grid,
  isWidthUp,
  withWidth,
  FormControl,
  InputLabel,
  CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  AndroidButton,
  Card,
  TextField,
  DefaultText,
  BigText,
  ErrorText,
  IosButton,
  LinkedInButton,
  Logo,
  ProgressButton,
  Switch,
  LanguageSelect,
  I18nWrapper,
  HiddenInput,
  PasswordField,
} from '../../../../../../components';
import { FormattedMessage, useIntl } from 'react-intl';
import * as authErrors from '../../../../../../services/Auth/errors';
import Formsy from 'formsy-react';
import KeyIcon from '../../../../../../assets/img/system/login/key.png';
import LogoBlack from '../../../../../../assets/logo_black.png';
import router from '../../../../../../data/router/router';

const useStyles = makeStyles({
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
      height: 40,
      borderRadius: 5,
      textTransform: 'none',
      fontFamily: 'Avenir',
      fontSize: 18,
      paddingTop: 4,
      paddingBottom: 4,
    },
  },
  logo: {
    width: 129,
    height: 53,
  },
  logoMobile: {
    width: 150,
    height: 60,
    margin: 'auto',
    marginBottom: 20,
  },
  connexionText: {
    textTransform: 'none',
    fontSize: 30,
    marginTop: -2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    borderLeft: '2px solid #555',
    color: '#555',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
  },
  connexionTextMobile: {
    textTransform: 'none',
    fontSize: 30,
    marginTop: -2,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#555',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
  },
});

const LoginForm = ({
  onSubmit,
  onSubmitSSO,
  customError,
  resetCustomError,
  ...props
}) => {
  const context = useContext(I18nWrapper.Context);
  const { loading, error } = props.auth;

  const [locale, setLocale] = useState(context.locale);
  const { detect } = require('detect-browser');
  const [isSSO, setIsSSO] = useState(false);
  const browser = detect();
  const isMobileApp =
    browser.name === 'ios-webview' || browser.name === 'chromium-webview';
  const classes = useStyles();
  const isDesktop = isWidthUp('sm', props.width);
  const ssoSwitchClass = isDesktop
    ? classes.ssoSwitch
    : classes.ssoSwitchMobile;
  const intl = useIntl();
  const [displayCaptcha, setDisplayCaptcha] = useState(
    error === 'connection_attempts_exceeded'
  );
  console.log(error);
  const [captcha, setCaptcha] = useState();

  const onChangeLanguage = (value) => {
    setLocale(value);
  };
  const onCaptchaChange = (value) => {
    setCaptcha(value);
  };

  useEffect(() => {
    context.selectLanguage(locale);
    localStorage.setItem('locale', locale);
  }, [locale]);

  useEffect(() => {
    if (!displayCaptcha && error === 'connection_attempts_exceeded') {
      setDisplayCaptcha(true);
    }
  }, [error]);
  return (
    <div>
      <Grid container spacing={isDesktop ? 3 : 2} justify='flex-end'>
        <Grid item container xs={12}>
          {!isDesktop && (
            <Grid item xs={12}>
              <CardMedia
                className={!isDesktop ? classes.logoMobile : classes.logo}
                image={LogoBlack}
              />
            </Grid>
          )}
          <Grid item xs container>
            {isDesktop && (
              <Grid item>
                <CardMedia
                  className={!isDesktop ? classes.logoMobile : classes.logo}
                  image={LogoBlack}
                />
              </Grid>
            )}
            <Grid item>
              <BigText
                className={
                  !isDesktop
                    ? classes.connexionTextMobile
                    : classes.connexionText
                }
              >
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
                {error === authErrors.LOGIN_ERROR ||
                  (customError && (
                    <Grid item xs={12}>
                      <ErrorText align='center'>
                        {customError ||
                          intl.formatMessage({ id: 'login.error' })}
                      </ErrorText>
                    </Grid>
                  ))}
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
                {!isSSO && (
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Link
                      to='/reset-password'
                      style={{
                        textDecoration: 'none',
                        color: 'rgb(15,111,222)',
                        fontSize: 16,
                      }}
                    >
                      {intl.formatMessage({ id: 'login.reset_password' })}
                    </Link>
                  </Grid>
                )}
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
        {!isMobileApp && (
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <Grid container justify='center' spacing={2}>
              <Grid item xs={4}>
                <IosButton />
              </Grid>
              <Grid item xs={4}>
                <AndroidButton />
              </Grid>
            </Grid>

            <div style={{ marginTop: 10 }}>
              <Grid container justify='center'>
                <Grid item>
                  <LinkedInButton />
                </Grid>
              </Grid>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(withWidth()(LoginForm));
