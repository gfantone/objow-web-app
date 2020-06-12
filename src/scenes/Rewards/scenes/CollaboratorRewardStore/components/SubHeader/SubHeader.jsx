import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Loader, RoundedTab, RoundedTabs, UserProfile} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const style = {
    root: {
        padding: 16
    }
}

const SubHeader = ({ page, onChange, ...props }) => {
    const {classes} = props
    const {collaborator, loading: collaboratorDetailLoading} = props.collaboratorDetail
    const {loading: collaboratorPointSummaryDetailLoading} = props.collaboratorPointSummaryDetail
    const {loading: rewardListLoading} = props.rewardList
    const {loading: teamPointSummaryDetailLoading} = props.teamPointSummaryDetail
    const loading = collaboratorDetailLoading || collaboratorPointSummaryDetailLoading || rewardListLoading || teamPointSummaryDetailLoading
    const [value, setValue] = React.useState(page)

    function handleChange(e, value) {
        setValue(value)
        onChange(value)
    }

    const renderLoader = () => {
        return (
            <div className={classes.root}>
                <Loader centered />
            </div>
        )
    }

    const renderData = () => {
        return (
            <div>
                <UserProfile user={collaborator} />
                <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                    <RoundedTab label={Resources.COLLABORATOR_REWARD_LIST_COLLABORATOR_TAB} />
                    <RoundedTab label={Resources.COLLABORATOR_REWARD_LIST_TEAM_TAB} />
                </RoundedTabs>
            </div>
        )
    }

    return (
        <div>
            { loading && renderLoader() }
            { !loading && collaborator && renderData() }
        </div>
    )
}

const mapStateToProps = ({collaboratorDetail, collaboratorPointSummaryDetail, rewardList, teamPointSummaryDetail}) => ({
    collaboratorDetail,
    collaboratorPointSummaryDetail,
    rewardList,
    teamPointSummaryDetail
})

export default connect(mapStateToProps)(withStyles(style)(SubHeader))
