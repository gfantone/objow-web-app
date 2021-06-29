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
    const { account } = props.accountDetail;
    const { goal, loading: teamGoalDetailLoading } = props.teamGoalDetail
    const { loading: teamGoalRankListLoading } = props.teamGoalRankList
    const loading = teamGoalDetailLoading || teamGoalRankListLoading
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

    const editable = goal && (
      (
        // Admin and manager on solo goals
        goal.editable && account.role.code !== 'C'
      ) || (
        // Admin on team goals
        goal && account.role.code === 'A'
      )
    )
    return (
        <div>
            <div className={classes.root}>
                { loading && renderLoader() }
                { !loading && goal && renderData() }
            </div>
            { activateRank && <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label={Resources.TEAM_GOAL_DETAIL_RANK_TAB} />
                <RoundedTab label={Resources.TEAM_GOAL_DETAIL_INDICATION_TAB} />
                { editable && <RoundedTab label={Resources.TEAM_COLLABORATOR_GOAL_DETAIL_EDIT_TAB} /> }
            </RoundedTabs> }
        </div>
    )
}

const mapStateToProps = ({ teamGoalDetail, teamGoalRankList, accountDetail }) => ({
    accountDetail,
    teamGoalDetail,
    teamGoalRankList
})

export default connect(mapStateToProps)(withStyles(styles)(SubHeader))
