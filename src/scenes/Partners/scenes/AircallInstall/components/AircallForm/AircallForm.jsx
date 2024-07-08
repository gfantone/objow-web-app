import React, { Component, useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
import { CardMedia, Grid, isWidthUp, withWidth } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import {
  BigText,
  Card,
  DarkTextField,
  DarkTitle,
  ErrorText,
  LinkedInButton,
  Logo,
  ProgressButton,
  LanguageSelect,
  I18nWrapper,
  TextField,
  PasswordField,
  HiddenInput,
  Switch,
} from '../../../../../../components';
import { Button } from '../';
import { useIntl, injectIntl } from 'react-intl';
import * as authErrors from '../../../../../../services/Auth/errors';
import * as Resources from '../../../../../../Resources';
import * as errors from '../../../../../../services/Authentications/AircallAuthentication/errors';
import * as aircallAuthenticationActions from '../../../../../../services/Authentications/AircallAuthentication/actions';
import LogoBlack from '../../../../../../assets/logo_black.png';

const useStyles = makeStyles({
  form: {
    // backgroundColor: '#2B2E45'
  },
  noCustomer: {
    width: 100,
    height: 100,
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

const AircallForm = ({ customError, resetCustomError, ...props }) => {
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
    error === 'connection_attempts_exceeded',
  );
  const [captcha, setCaptcha] = useState();
  const noCustomer = require('../../../../../../assets/img/system/partners/nocustomer.png');

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
    setDisplayCaptcha(error === 'connection_attempts_exceeded');
  }, [error]);

  return (
    <Grid container spacing={isDesktop ? 3 : 2} justify="flex-end">
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
                !isDesktop ? classes.connexionTextMobile : classes.connexionText
              }
            >
              {intl.formatMessage({ id: 'aircall.install_title' })}
            </BigText>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: 10 }}>
          <Formsy>
            <LanguageSelect
              name="locale"
              initial={locale}
              onChange={onChangeLanguage}
            />
          </Formsy>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div>
                <Grid container spacing={2} className={classes.form}>
                  <Grid item xs={12}>
                    <TextField
                      name="code"
                      variant="outlined"
                      placeholder={intl.formatMessage({
                        id: 'aircall.install_code_label',
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

                  <React.Fragment>
                    <Grid item xs={12}>
                      <TextField
                        lowercase={true}
                        variant="outlined"
                        placeholder={intl.formatMessage({
                          id: 'login.email_placeholder',
                        })}
                        className={classes.inputs}
                        name="email"
                        label={intl.formatMessage({
                          id: 'aircall.install_email_label',
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
                        variant="outlined"
                        placeholder="●●●●●●●"
                        className={classes.inputs}
                        type="password"
                        name="password"
                        label={intl.formatMessage({
                          id: 'aircall.install_password_label',
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
                </Grid>
              </div>
            </Grid>
            {error === authErrors.LOGIN_ERROR ||
              (customError && (
                <Grid item xs={12}>
                  <ErrorText align="center">
                    {customError || intl.formatMessage({ id: 'login.error' })}
                  </ErrorText>
                </Grid>
              ))}
            {error === errors.AUTHORIZATION_ERROR && (
              <Grid item xs={12}>
                <ErrorText align="center">
                  {intl.formatMessage({
                    id: 'aircall.install_authorization_error',
                  })}
                </ErrorText>
              </Grid>
            )}
            {error === errors.UNKNOWN_ERROR && (
              <Grid item xs={12}>
                <ErrorText align="center">
                  {intl.formatMessage({ id: 'aircall.install_unknown_error' })}
                </ErrorText>
              </Grid>
            )}

            <Grid item xs={12} className={classes.submit_button}>
              <ProgressButton
                type="submit"
                text={intl.formatMessage({
                  id: 'aircall.install_submit_button',
                })}
                centered
                loading={loading}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item>
              <CardMedia image={noCustomer} className={classes.noCustomer} />
            </Grid>
            <Grid item>
              <BigText>
                {intl.formatMessage({
                  id: 'aircall.install_no_customer_button_1',
                })}
              </BigText>
              <BigText>
                {intl.formatMessage({
                  id: 'aircall.install_no_customer_button_2',
                })}
              </BigText>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="space-between">
                <Grid item>
                  <Button
                    onClick={() =>
                      window.open('http://firetiger.fr/', '_blank')
                    }
                  >
                    {intl.formatMessage({
                      id: 'aircall.install_website_button',
                    })}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    onClick={() =>
                      window.open(
                        'https://firetiger.fr/index.php/demonstration',
                        '_blank',
                      )
                    }
                  >
                    {intl.formatMessage({ id: 'aircall.install_demo_button' })}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {!isMobileApp && (
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <div style={{ marginTop: 10 }}>
            <Grid container justify="center">
              <Grid item>
                <LinkedInButton />
              </Grid>
            </Grid>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(injectIntl(AircallForm));
