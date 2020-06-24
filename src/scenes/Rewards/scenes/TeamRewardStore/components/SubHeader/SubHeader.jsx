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
    const {team, loading} = props.teamDetail
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
                <div className={classes.root}>
                    <Team team={team} />
                </div>
                <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                    <RoundedTab label={Resources.TEAM_REWARD_LIST_COLLABORATOR_TAB} />
                    <RoundedTab label={Resources.TEAM_REWARD_LIST_TEAM_TAB} />
                </RoundedTabs>
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

const mapStateToProps = ({teamDetail}) => ({
    teamDetail
})

export default connect(mapStateToProps)(withStyles(style)(SubHeader))
