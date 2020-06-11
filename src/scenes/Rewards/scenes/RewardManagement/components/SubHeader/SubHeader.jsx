import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {DefaultText, RoundedTabs, RoundedTab} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const styles = {
    root: {
        padding: 16
    }
};

const SubHeader = ({onChange, ...props}) => {
    const { classes } = props
    const [value, setValue] = React.useState(0)

    const handleChange = (e, value) => {
        setValue(value);
        if (onChange) onChange(value)
    }

    return (
        <div>
            <div className={classes.root}>
                <DefaultText align={'center'}>{Resources.REWARD_MANAGEMENT_SUBTITLE}</DefaultText>
            </div>
            <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label={Resources.REWARD_MANAGEMENT_COLLABORATOR_TAB} />
                <RoundedTab label={Resources.REWARD_MANAGEMENT_TEAM_TAB} />
            </RoundedTabs>
        </div>
    )
}

export default withStyles(styles)(SubHeader)
