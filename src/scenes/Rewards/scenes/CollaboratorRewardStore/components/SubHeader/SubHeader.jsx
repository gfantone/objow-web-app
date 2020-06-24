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
    const {collaborator, loading} = props.collaboratorDetail
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

const mapStateToProps = ({collaboratorDetail}) => ({
    collaboratorDetail
})

export default connect(mapStateToProps)(withStyles(style)(SubHeader))
