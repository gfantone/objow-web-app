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
  InfoText,
  PasswordField,
} from '../../../../components';
import * as userUpdatePasswordActions from '../../../../services/Users/UserUpdatePassword/actions';
import local from '../../../../data/local/local';

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

class ForceResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.props.userUpdatePasswordActions.updateUserPasswordClear();
  }
  onSubmit = (model) => {
    const reset_token = this.props.match.params.reset_token;
    const { account } = this.props.accountDetail;
    this.props.userUpdatePasswordActions.updateUserPassword(
      account.id,
      model.password,
      true,
    );
  };

  handleValueChange = (name) => (value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  logout = () => {
    local.removeAccessToken();
    local.removeRefreshToken();
    local.removeStore();
    window.location = '/';
  };
  render() {
    const { intl, classes } = this.props;
    const { loading, success, hasError: error } = this.props.userUpdatePassword;

    if (success) {
      this.logout();
    }
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <DefaultTitle style={{}}>
              {intl.formatMessage({ id: 'login.force_reset_password_title' })}
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
                          <InfoText lowercase>
                            {intl.formatMessage({
                              id: 'login.force_reset_password_message',
                            })}
                          </InfoText>
                        </Grid>
                        <Grid item xs={12}>
                          <PasswordField
                            lowercase
                            required
                            type="password"
                            variant="outlined"
                            placeholder="●●●●●●●"
                            onChange={this.handleValueChange('password').bind(
                              this,
                            )}
                            name="password"
                            label={intl.formatMessage({
                              id: 'account.password_label',
                            })}
                            fullWidth
                            validations={{
                              hasUppercaseCharacter: true,
                              hasLowercaseCharacter: true,
                              hasSpecialCharacter: true,
                              hasMoreCharactersThan: 8,
                              hasDigitCharacter: true,
                            }}
                            validationErrors={{
                              hasUppercaseCharacter: intl.formatMessage({
                                id: 'common.form.has_uppercase_character',
                              }),
                              hasLowercaseCharacter: intl.formatMessage({
                                id: 'common.form.has_lowercase_character',
                              }),
                              hasSpecialCharacter: intl.formatMessage({
                                id: 'common.form.has_special_character',
                              }),
                              hasMoreCharactersThan: intl
                                .formatMessage({
                                  id: 'common.form.has_more_characters_than',
                                })
                                .format(8),
                              hasDigitCharacter: intl.formatMessage({
                                id: 'common.form.has_digit_character',
                              }),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <PasswordField
                            lowercase
                            type="password"
                            variant="outlined"
                            placeholder="●●●●●●●"
                            name="paswwordConfirm"
                            label={intl.formatMessage({
                              id: 'account.confirm_password_label',
                            })}
                            fullWidth
                            validations={
                              this.state.password
                                ? 'equalsField:password'
                                : null
                            }
                            validationErrors={{
                              isDefaultRequiredValue: intl.formatMessage({
                                id: 'common.form.required_error',
                              }),
                              equalsField: intl.formatMessage({
                                id: 'common.form.password_not_match_error',
                              }),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <InfoText lowercase>
                      {intl.formatMessage({ id: 'admin.user.password_info' })}
                    </InfoText>
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
                </Grid>
              </Formsy>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ accountDetail, userUpdatePassword }) => ({
  accountDetail,
  userUpdatePassword,
});

const mapDispatchToProps = (dispatch) => ({
  userUpdatePasswordActions: bindActionCreators(
    userUpdatePasswordActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(injectIntl(ForceResetPassword)));
