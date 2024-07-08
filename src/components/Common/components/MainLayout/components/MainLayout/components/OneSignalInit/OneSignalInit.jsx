import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

const OneSignalInit = ({ goBack, children, ...props }) => {
  const [oneSignalInitialized, setOneSignalInitialized] = useState(false);

  const initOneSignal = () => {
    const { account } = props.accountDetail;

    if (window.ReactNativeWebView && account && account.identifier) {
      setTimeout(function () {
        const message = {
          source: 'firetiger',
          action: 'setExternalUserId',
          id: account.identifier,
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
        setOneSignalInitialized(true);
      }, 1);
    }
  };

  useEffect(() => {
    if (!oneSignalInitialized) {
      initOneSignal();
    }
  }, []);

  return <></>;
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(OneSignalInit);
