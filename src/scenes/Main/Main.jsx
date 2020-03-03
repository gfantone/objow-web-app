import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Main = (props) => {
    const { account } = props.accountDetail;
    if (account.role != 'A') {
        return <Redirect to='/goals' />
    } else {
        return <Redirect to='/admin' />
    }
};

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

export default connect(mapStateToProps)(Main)
