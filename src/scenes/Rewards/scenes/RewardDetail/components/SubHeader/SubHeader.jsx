import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Reward} from '../../../../components'
import {Loader, Button} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const styles = {
    button: {
        margin: 4
    },
    buttonContainer: {
        textAlign: 'right'
    },
    root: {
        padding: 16
    }
}
const SubHeader = ({onAddClick, ...props}) => {
    const {classes} = props
    const {reward, loading} = props.rewardDetail

    function renderLoader() {
        return (
            <div className={classes.root}>
                <Loader centered />
            </div>
        )
    }

    function renderData() {
        return (
            <div>
                <div className={classes.root}>
                    <Reward reward={reward} />
                </div>
                <div className={classes.buttonContainer}>
                    <Button className={classes.button} onClick={onAddClick}>{Resources.REWARD_DETAIL_ADD_BUTTON}</Button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && reward && renderData()}
        </div>
    )
}

const mapStateToProps = ({rewardDetail}) => ({
    rewardDetail
})

export default connect(mapStateToProps)(withStyles(styles)(SubHeader))
