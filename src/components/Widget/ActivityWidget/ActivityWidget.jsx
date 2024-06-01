import React from 'react';
import { useIntl } from 'react-intl';
import { WrapperWidget } from '../WrapperWidget';
import { connect } from 'react-redux';
import ActivityListAdmin from './components/ActivityListAdmin/ActivityListAdmin';

const ActivityWidget = ({ account }) => {
  const intl = useIntl();

  const isAdministrator = account.role.code === 'A';
  const isSuperManager = account.role.code === 'S';
  const isManager = account.role.code === 'M';

  return (
    <WrapperWidget
      title={intl.formatMessage({ id: 'widget.activity.inactive_profiles' })}
      url={`/admin/users`}
      infoIcon={intl.formatMessage({
        id: 'widget.activity.info_text',
      })}
    >
      <div
        style={{
          padding: 10,
        }}
      >
        {(isAdministrator || isSuperManager || isManager) && (
          <ActivityListAdmin />
        )}
      </div>
    </WrapperWidget>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  account: accountDetail.account,
});

export default connect(mapStateToProps)(ActivityWidget);
