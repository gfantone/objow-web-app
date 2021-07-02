import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Goal } from '../../../../components'
import { Loader, RoundedTab, RoundedTabs } from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const styles = {
    root: {
        padding: 16
    }
}

const SubHeader = ({ activateRank, onChange, ...props }) => {
    const { classes } = props
    const { goal, loading: collaboratorGoalDetailLoading } = props.collaboratorGoalDetail
    const { loading: collaboratorGoalRankListLoading } = props.collaboratorGoalRankList
    const loading = collaboratorGoalDetailLoading || collaboratorGoalRankListLoading
    const [value, setValue] = React.useState(0)

    const handleChange = (e, value) => {
        setValue(value)
        if (onChange) onChange(value)
    }

    const renderLoader = () => {
        return <Loader centered />
    }

    const renderData = () => {
        return <Goal goal={goal} />
    }

    return (
        <div>
            <div className={classes.root}>
                { loading && renderLoader() }
                { !loading && goal && renderData() }
            </div>
             <RoundedTabs value={!activateRank && value === 0 ? 1 : value} onChange={handleChange} variant='fullWidth'>
                { activateRank && <RoundedTab value={0} label={Resources.COLLABORATOR_GOAL_DETAIL_RANK_TAB} /> }
                <RoundedTab value={1} label={Resources.COLLABORATOR_GOAL_DETAIL_INDICATION_TAB} />
            </RoundedTabs>
        </div>
    )
}

const mapStateToProps = ({ collaboratorGoalDetail, collaboratorGoalRankList }) => ({
    collaboratorGoalDetail,
    collaboratorGoalRankList
})

export default connect(mapStateToProps)(withStyles(styles)(SubHeader))
