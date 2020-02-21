import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AnonymousLayout } from '../AnonymousLayout'

const AnonymousRoutes = ({ component: Component, ...props }) => {
    const { path } = props
    const { account } = props.auth

    if (account) {
        return <Redirect to='/' />
    }

    return <AnonymousLayout exact path={path} component={Component} />
}

const mapStateToProps = ({ auth }) => ({
    auth
})

export default connect(mapStateToProps)(AnonymousRoutes)