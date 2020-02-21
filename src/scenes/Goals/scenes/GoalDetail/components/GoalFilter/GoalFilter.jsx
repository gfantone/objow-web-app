import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Loader, RoundedTab, RoundedTabs} from '../../../../../../components'
import {Goal} from '../../../../components'

const styles = {
    goalContainer: {
        padding: 16,
        height: 155
    },
    loaderContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const GoalFilter = (props) => {
    const { classes, handleFilterChange } = props
    const { account } = props.auth
    const { goal, loading } = props.userGoalDetail
    const [value, setValue] = React.useState(0)

    function handleChange(e, value) {
        let inProgress = value == 0
        setValue(value)
        handleFilterChange(value)
    }

    function _renderLoader() {
        return (
            <div className={classes.loaderContainer}>
                <Loader />
            </div>
        )
    }

    function _renderData() {
        return <Goal goal={goal} />
    }

    return (
        <div>
            <div className={classes.goalContainer}>
                {loading == true && _renderLoader()}
                {goal != null && _renderData()}
            </div>
            <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label="Classement" />
                <RoundedTab label="Indications" />
                { account.role.code != 'C' && <RoundedTab label="Édition" /> }
            </RoundedTabs>
        </div>
    )
}

const mapStateToProps = ({auth, userGoalDetail}) => ({
    auth,
    userGoalDetail
})

export default connect(mapStateToProps)(withStyles(styles)(GoalFilter))