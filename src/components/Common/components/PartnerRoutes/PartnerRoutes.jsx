import React from 'react'
import {AnonymousLayout} from '..'

const PartnerRoutes = ({ component: Component, ...rest }) => {
    const {path} = rest

    return <AnonymousLayout exact path={path} component={Component} />
}

export default PartnerRoutes
