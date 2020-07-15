import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Loader, RoundedTab, RoundedTabs, Team} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const style = {
    root: {
        padding: 16
    }
}

const SubHeader = ({ page, onChange, ...props }) => {
    const {classes} = props
    const {configs, loading: configListLoading} = props.configList
    const {team, loading: teamDetailLoading} = props.teamDetail
    const [value, setValue] = React.useState(page)
    const collaboratorRewardActivation = configs ? configs.find(x => x.code === 'CRWA').value.toBoolean() : null
    const teamRewardActivation = configs ? configs.find(x => x.code === 'TRWA').value.toBoolean() : null
    const loading = configListLoading || teamDetailLoading

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
                <div className={classes.root}>
                    <Team team={team} />
                </div>
                {(collaboratorRewardActivation || teamRewardActivation) && <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                    {teamRewardActivation && <RoundedTab label={Resources.TEAM_REWARD_LIST_TEAM_TAB} />}
                    {collaboratorRewardActivation && <RoundedTab label={Resources.TEAM_REWARD_LIST_COLLABORATOR_TAB} />}
                </RoundedTabs>}
            </div>
        )
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && team && renderData()}
        </div>
    )
}

const mapStateToProps = ({configList, teamDetail}) => ({
    configList,
    teamDetail
})

export default connect(mapStateToProps)(withStyles(style)(SubHeader))
