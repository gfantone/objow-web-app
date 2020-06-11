import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const RewardHome = ({...props}) => {
    const {account} = props.accountDetail
    const role = account.role.code

    if (role == 'A') {
        return <Redirect to='/rewards/management' />
    } else if (role == 'M') {
        return <Redirect to='/rewards/management' />
    } else {
        return <Redirect to='/rewards/management' />
    }
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default connect(mapStateToProps)(RewardHome)
