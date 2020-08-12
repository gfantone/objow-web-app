import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {DefaultText, Loader, RoundedTab, RoundedTabs} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import '../../../../../../helpers/StringHelper'

const styles = {
    root: {
        padding: 16
    }
}

const SubHeader = ({ onChange, readonly, ...props }) => {
    const {classes} = props
    const {definition, loading} = props.goalDefinitionDetail
    const [value, setValue] = React.useState(0)

    function handlePageChange(e, value) {
        setValue(value)
        if (onChange) onChange(value)
    }

    function renderLoader() {
        return <div className={classes.root}>
            <Loader centered />
        </div>
    }

    function renderData() {
        return (
            <div>
                <div className={classes.root}>
                    {!readonly && <DefaultText align='center'>{Resources.ADMIN_GOAL_UPDATE_BASE_TITLE.format(definition.name)}</DefaultText>}
                    {readonly && <DefaultText align='center'>{Resources.ADMIN_GOAL_UPDATE_READONLY_TITLE.format(definition.name)}</DefaultText>}
                </div>
                <RoundedTabs value={value} onChange={handlePageChange} variant='fullWidth'>
                    <RoundedTab label={Resources.ADMIN_GOAL_UPDATE_BASE_TAB} />
                    <RoundedTab label={Resources.ADMIN_GOAL_UPDATE_CUSTOM_TAB} />
                </RoundedTabs>
            </div>
        )
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && definition && renderData()}
        </div>
    )
}

const mapStateToProps = ({goalDefinitionDetail}) => ({
    goalDefinitionDetail
})

export default withStyles(styles)(connect(mapStateToProps)(SubHeader))
