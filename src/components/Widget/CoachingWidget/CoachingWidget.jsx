import React, { useState } from 'react';
import { connect } from 'react-redux';
import { WrapperWidget } from '../WrapperWidget';
import { useIntl } from 'react-intl';
import CoachingTabs from './components/CoachingTabs/CoachingTabs';

const CoachingWidget = ({ ...props }) => {
  const { account } = props.accountDetail;
  const [url, setUrl] = useState(
    account.role.code === 'C' ? `/coaching/${account.id}` : '/coaching'
  );
  const intl = useIntl();

  return (
    <WrapperWidget
      title={intl.formatMessage({ id: 'coaching_list.title' })}
      url={url}
    >
      <div style={{ padding: 10 }}>{<CoachingTabs setUrl={setUrl} />}</div>
    </WrapperWidget>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(CoachingWidget);
