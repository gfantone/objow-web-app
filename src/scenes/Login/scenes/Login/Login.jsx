import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {LoginForm, LoginFormMobile} from './components'
import * as authActions from '../../../../services/Auth/actions'
import api from '../../../../data/api/api';
import router from '../../../../data/router/router';
import local from '../../../../data/local/local'

class Login extends Component {
    constructor(props) {
        super(props)
        this.props.authActions.clearLogin()
    }

    handleSubmit(model) {
        this.props.authActions.login(model.code.toLowerCase(), model.email.toLowerCase(), model.password)
    }

    async handleSubmitSSO(model) {
      const apiUrlResponse = await router.apiUrl.get(model.code.toLowerCase())
      local.setApiUrl(apiUrlResponse.data)
      const oauthUrlResponse = await api.partners.oauthAutorizeUrl()
      window.location.href = oauthUrlResponse.data.authorizeUrl
    }


    render() {
        const {detect} = require('detect-browser')
        const browser = detect()
        const isMobileApp = browser.name === 'ios-webview' || browser.name === 'chromium-webview'

        return (
            <div>
                {!isMobileApp && <LoginForm onSubmit={this.handleSubmit.bind(this)} onSubmitSSO={this.handleSubmitSSO.bind(this)} />}
                {isMobileApp && <LoginFormMobile onSubmit={this.handleSubmit.bind(this)} />}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Login)
