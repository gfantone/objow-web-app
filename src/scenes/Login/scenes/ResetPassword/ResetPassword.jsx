import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import Formsy from 'formsy-react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
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
  DefaultTitle,
  AccentText,
} from '../../../../components';
import * as userResetPasswordActions from '../../../../services/Users/UserResetPassword/actions';
import { toast } from 'react-toastify';

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
};

class ResetPassword extends Component {
  onSubmit = (model) => {
    this.props.userResetPasswordActions.resetUserPassword(
      model.code,
      model.email,
    );
  };
  render() {
    const { intl, classes } = this.props;
    const { loading, success, hasError: error } = this.props.userResetPassword;

    if (success) {
      toast.success(intl.formatMessage({ id: 'login.reset_password_success' }));
      this.props.history.push('/');
    }
    if (error) {
      toast.error(intl.formatMessage({ id: 'login.reset_password_error' }));
    }

    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <DefaultTitle style={{}}>
              {intl.formatMessage({ id: 'login.reset_password_title' })}
            </DefaultTitle>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <Formsy onValidSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div>
                      <Grid container spacing={2} className={classes.form}>
                        <Grid item xs={12}>
                          <TextField
                            name="code"
                            variant="outlined"
                            placeholder={intl.formatMessage({
                              id: 'login.code_placeholder',
                            })}
                            className={classes.inputs}
                            label={intl.formatMessage({
                              id: 'login.code_label',
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
                          <TextField
                            lowercase={true}
                            variant="outlined"
                            placeholder={intl.formatMessage({
                              id: 'login.email_placeholder',
                            })}
                            className={classes.inputs}
                            name="email"
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
                      </Grid>
                    </div>
                  </Grid>

                  <Grid item xs={12} className={classes.submit_button}>
                    <ProgressButton
                      type="submit"
                      text={intl.formatMessage({
                        id: 'login.reset_password_submit',
                      })}
                      centered
                      loading={loading}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Link
                      to="/"
                      style={{
                        textDecoration: 'none',
                        color: 'rgb(15,111,222)',
                        fontSize: 16,
                      }}
                    >
                      {intl.formatMessage({
                        id: 'login.reset_password_cancel',
                      })}
                    </Link>
                  </Grid>
                </Grid>
              </Formsy>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ userResetPassword }) => ({
  userResetPassword,
});

const mapDispatchToProps = (dispatch) => ({
  userResetPasswordActions: bindActionCreators(
    userResetPasswordActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(injectIntl(ResetPassword)));
