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

const SubHeader = ({page, onChange, ...props}) => {
    const {classes} = props
    const {collaborator, loading: collaboratorDetailLoading} = props.collaboratorDetail
    const {configs, loading: configListLoading} = props.configList
    const [value, setValue] = React.useState(page)
    const collaboratorRewardActivation = configs ? configs.find(x => x.code === 'CRWA').value.toBoolean() : null
    const teamRewardActivation = configs ? configs.find(x => x.code === 'TRWA').value.toBoolean() : null
    const loading = collaboratorDetailLoading || configListLoading

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
                {(teamRewardActivation) && <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                    {collaboratorRewardActivation && <RoundedTab label={Resources.COLLABORATOR_REWARD_LIST_COLLABORATOR_TAB} />}
                    {teamRewardActivation && <RoundedTab label={Resources.COLLABORATOR_REWARD_LIST_TEAM_TAB} />}
                </RoundedTabs>}
            </div>
        )
    }

    return (
        <div>
            { loading && renderLoader() }
            { !loading && collaborator && configs && renderData() }
        </div>
    )
}

const mapStateToProps = ({collaboratorDetail, configList}) => ({
    collaboratorDetail,
    configList
})

export default connect(mapStateToProps)(withStyles(style)(SubHeader))
