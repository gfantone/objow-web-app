import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {DefaultText, RoundedTabs, RoundedTab} from '../../../../components'
import * as Resources from '../../../../Resources'

const styles = {
    root: {
        padding: 16
    }
};

const TrackingSubHeader = ({onChange, ...props}) => {
    const { classes } = props
    const [value, setValue] = React.useState(0)

    const handleChange = (e, value) => {
        setValue(value);
        if (onChange) onChange(value)
    }

    return (
        <div>
            <div className={classes.root}>
                <DefaultText align={'center'}>{Resources.TRACKING_SUB_HEADER_VALIDATED_TITLE}</DefaultText>
            </div>
            <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label={Resources.TRACKING_SUB_HEADER_VALIDATED_TAB} />
                <RoundedTab label={Resources.TRACKING_SUB_HEADER_WAITING_TAB} />
            </RoundedTabs>
        </div>
    )
}

export default withStyles(styles)(TrackingSubHeader)
