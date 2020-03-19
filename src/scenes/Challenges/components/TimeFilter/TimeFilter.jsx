import React from 'react'
import {connect} from 'react-redux'
import {RoundedTabs, RoundedTab} from '../../../../components'

const TimeFilter = ({ initial = 0, ...props }) => {
    const { handleTimeChange } = props;
    const [value, setValue] = React.useState(initial);
    const {account} = props.accountDetail;

    function handleChange(e, value) {
        setValue(value);
        handleTimeChange(value)
    }

    return (
        <div>
            <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label="En cours" />
                <RoundedTab label="Passés" />
                {(account.role.code != 'C' || account.hasNextChallengeAccess) && <RoundedTab label="Futurs" />}
            </RoundedTabs>
        </div>
    )
};

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
});

export default connect(mapStateToProps)(TimeFilter)
