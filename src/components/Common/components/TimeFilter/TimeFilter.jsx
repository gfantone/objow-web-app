import React from 'react';
import { connect } from 'react-redux';
import { RoundedTabs, RoundedTab } from '..';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';

const TimeFilter = ({ initial = 0, ...props }) => {
  const intl = useIntl();
  const { handleTimeChange } = props;
  const [value, setValue] = React.useState(parseInt(initial));
  const { account } = props.accountDetail;
  function handleChange(e, value) {
    // let inProgress = value == 0
    setValue(value);
    handleTimeChange(value);
  }

  return (
    <div>
      <RoundedTabs value={value} onChange={handleChange} variant="fullWidth">
        <RoundedTab label={intl.formatMessage({ id: 'filter.time.current' })} />
        <RoundedTab
          label={intl.formatMessage({ id: 'filter.time.previous' })}
        />
        {account.hasNextGoalAccess && (
          <RoundedTab label={intl.formatMessage({ id: 'filter.time.next' })} />
        )}
      </RoundedTabs>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(TimeFilter);
