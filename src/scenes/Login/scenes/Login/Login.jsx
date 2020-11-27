import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {LoginForm, LoginFormMobile} from './components'
import * as authActions from '../../../../services/Auth/actions'

class Login extends Component {
    constructor(props) {
        super(props)
        this.props.authActions.clearLogin()
    }

    handleSubmit(model) {
        this.props.authActions.login(model.code.toLowerCase(), model.email.toLowerCase(), model.password)
    }

    render() {
        const {detect} = require('detect-browser')
        const browser = detect()
        const isMobileApp = browser.name === 'ios-webview' || browser.name === 'chromium-webview'

        return (
            <div>
                {!isMobileApp && <LoginForm onSubmit={this.handleSubmit.bind(this)} />}
                {isMobileApp && <LoginFormMobile onSubmit={this.handleSubmit.bind(this)} />}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Login)
