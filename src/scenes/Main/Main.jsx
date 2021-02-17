import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

const Main = (props) => {
    const { account } = props.accountDetail;
    if(account.homePage) {
      return <Redirect to={ `/${ account.homePage }` } />
    }

    if (_.get(account, 'role.code') !== 'A') {
        return <Redirect to='/goals' />
    } else {
        return <Redirect to='/admin' />
    }
};

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

export default connect(mapStateToProps)(Main)
