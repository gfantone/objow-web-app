import React from 'react'
import {RoundedTabs, RoundedTab} from '..'
import * as Resources from '../../../../Resources'

const TimeFilter = ({ initial = true, ...props }) => {
    const { handleTimeChange } = props
    const [value, setValue] = React.useState(initial ? 0 : 1);

    function handleChange(e, value) {
        let inProgress = value == 0
        setValue(value)
        handleTimeChange(inProgress)
    }

    return (
        <div>
            <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label={Resources.TIME_FILTER_CURRENT_TAB} />
                <RoundedTab label={Resources.TIME_FILTER_PAST_TAB} />
            </RoundedTabs>
        </div>
    )
}

export default TimeFilter
