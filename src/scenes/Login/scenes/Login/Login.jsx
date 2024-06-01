import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoginForm, LoginFormMobile, SSOPopup } from './components';
import * as authActions from '../../../../services/Auth/actions';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import api from '../../../../data/api/api';
import router from '../../../../data/router/router';
import local from '../../../../data/local/local';
import _ from 'lodash';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.authActions.clearLogin();
    this.state = {
      customError: null,
    };
  }
  resetCustomError = () => {
    this.setState({
      ...this.state,
      customError: null,
    });
  };

  handleSubmit(model) {
    this.props.authActions.login({
      code: model.code.toLowerCase(),
      login: model.email.toLowerCase(),
      password: model.password,
      captcha: model.captcha,
    });
  }

  async handleSubmitSSO(model) {
    const { detect } = require('detect-browser');
    const browser = detect();
    const isMobileApp =
      browser.name === 'ios-webview' || browser.name === 'chromium-webview';

    const { intl } = this.props;
    const clientEnvironment = _.replace(_.lowerCase(model.code), ' ', '');
    local.setClientEnvironment(clientEnvironment);
    const subdomain =
      clientEnvironment && clientEnvironment !== 'dev'
        ? `${clientEnvironment}.`
        : '';

    const baseUrlProtocol = process.env.REACT_APP_API_PROTOCOL;
    var baseUrl = process.env.REACT_APP_API_URL;

    try {
      if (isMobileApp) {
        window.location.href = `${baseUrlProtocol}${subdomain}${baseUrl}workos/authorize/?base_url=${window.location.origin}`;
      } else {
        this.setState({
          ...this.state,
          SsoUrl: `${baseUrlProtocol}${subdomain}${baseUrl}workos/authorize/?base_url=${window.location.origin}`,
          SsoOpen: true,
        });
      }

      // const oauthUrlResponse = await api.partners.oauthAutorizeUrl()
      // if(oauthUrlResponse.data.authorizeUrl) {
      //   window.location.href = oauthUrlResponse.data.authorizeUrl
      // }
    } catch {
      this.setState({
        ...this.state,
        customError: intl.formatMessage({ id: 'login.sso_error_message' }),
      });
    }
  }

  ssoCallback = (tokens) => {
    if (_.get(tokens, 'access') && _.get(tokens, 'refresh')) {
      this.props.authActions.login({ token: tokens });
    } else {
      console.log('failed to log in');
    }
  };

  render() {
    const { detect } = require('detect-browser');
    const browser = detect();
    const isMobileApp =
      browser.name === 'ios-webview' || browser.name === 'chromium-webview';
    console.log(this.state.SsoUrl, this.state.SsoOpen);
    return (
      <div>
        {!isMobileApp && (
          <LoginForm
            onSubmit={this.handleSubmit.bind(this)}
            onSubmitSSO={this.handleSubmitSSO.bind(this)}
            customError={this.state.customError}
            resetCustomError={this.resetCustomError}
          />
        )}
        {isMobileApp && (
          <LoginFormMobile
            onSubmit={this.handleSubmit.bind(this)}
            onSubmitSSO={this.handleSubmitSSO.bind(this)}
            customError={this.state.customError}
            resetCustomError={this.resetCustomError}
          />
        )}
        {this.state.SsoUrl && this.state.SsoOpen && (
          <SSOPopup
            open={this.state.SsoOpen}
            url={this.state.SsoUrl}
            onCallback={this.ssoCallback}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(null, mapDispatchToProps)(injectIntl(Login));
