import React, { Component, useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
import { CardMedia, Grid, isWidthUp, withWidth } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import { Button, AircallForm } from './components';
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
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as authErrors from '../../../../services/Auth/errors';
import * as Resources from '../../../../Resources';
import * as errors from '../../../../services/Authentications/AircallAuthentication/errors';
import * as aircallAuthenticationActions from '../../../../services/Authentications/AircallAuthentication/actions';
import LogoBlack from '../../../../assets/logo_black.png';

const styles = {
  form: {
    backgroundColor: '#2B2E45',
  },
  noCustomer: {
    width: 100,
    height: 100,
  },
};

class AircallInstall extends Component {
  componentDidMount() {
    this.props.aircallAuthenticationActions.clearAircallConnect();
  }

  handleValidSubmit(model) {
    this.props.aircallAuthenticationActions.connectAircall(
      model.code,
      model.email,
      model.password,
    );
  }

  render() {
    const { intl } = this.props;
    const { classes } = this.props;
    const { redirectUri, loading, error } = this.props.aircallAuthentication;
    const noCustomer = require('../../../../assets/img/system/partners/nocustomer.png');
    const Form = withStyles(styles)(withWidth()(AircallForm));
    if (redirectUri) {
      this.props.aircallAuthenticationActions.clearAircallConnect();
      window.location = redirectUri;
    }

    return (
      <div>
        <Formsy onValidSubmit={this.handleValidSubmit.bind(this)}>
          <AircallForm />
        </Formsy>
      </div>
    );
  }
}

const mapStateToProps = ({ aircallAuthentication }) => ({
  aircallAuthentication,
});

const mapDispatchToProps = (dispatch) => ({
  aircallAuthenticationActions: bindActionCreators(
    aircallAuthenticationActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(injectIntl(AircallInstall)));
