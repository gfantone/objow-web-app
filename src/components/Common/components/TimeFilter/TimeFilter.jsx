import React from 'react'
import {connect} from 'react-redux'
import {RoundedTabs, RoundedTab} from '..'
import * as Resources from '../../../../Resources'

const TimeFilter = ({ initial = 0, ...props }) => {
    const { handleTimeChange } = props
    const [value, setValue] = React.useState(parseInt(initial));
    const {account} = props.accountDetail;
    function handleChange(e, value) {
        // let inProgress = value == 0
        setValue(value)
        handleTimeChange(value)
    }

    return (
        <div>
            <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label={Resources.TIME_FILTER_CURRENT_TAB} />
                <RoundedTab label={Resources.TIME_FILTER_PAST_TAB} />
                {(account.role.code != 'C' || account.hasNextChallengeAccess) && <RoundedTab label={Resources.CHALLENGE_TIME_FILTER_NEXT_TAB} />}
            </RoundedTabs>
        </div>
    )
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
});

export default connect(mapStateToProps)(TimeFilter)
