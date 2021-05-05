import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {LoginForm, LoginFormMobile} from './components'
import * as authActions from '../../../../services/Auth/actions'
import * as Resources from "../../../../Resources";
import api from '../../../../data/api/api';
import router from '../../../../data/router/router';
import local from '../../../../data/local/local';

class Login extends Component {
    constructor(props) {
        super(props)
        this.props.authActions.clearLogin()
        this.state = {
          customError: null
        }
    }
    resetCustomError = () => {
      this.setState({
        ...this.state,
        customError: null
      })
    }

    handleSubmit(model) {
        this.props.authActions.login({code: model.code.toLowerCase(), login: model.email.toLowerCase(), password: model.password})
    }

    async handleSubmitSSO(model) {
      const apiUrlResponse = await router.apiUrl.get(model.code.toLowerCase())
      local.setApiUrl(apiUrlResponse.data)
      try {
        const oauthUrlResponse = await api.partners.oauthAutorizeUrl()
        if(oauthUrlResponse.data.authorizeUrl) {
          window.location.href = oauthUrlResponse.data.authorizeUrl
        }
      } catch {
        this.setState({
          ...this.state,
          customError: Resources.LOGIN_SSO_ERROR_MESSAGE
        })
      }
    }


    render() {
        const {detect} = require('detect-browser')
        const browser = detect()
        const isMobileApp = browser.name === 'ios-webview' || browser.name === 'chromium-webview'

        return (
            <div>
                {!isMobileApp && <LoginForm onSubmit={this.handleSubmit.bind(this)} onSubmitSSO={this.handleSubmitSSO.bind(this)} customError={this.state.customError} resetCustomError={this.resetCustomError} />}
                {isMobileApp && <LoginFormMobile onSubmit={this.handleSubmit.bind(this)} />}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Login)
