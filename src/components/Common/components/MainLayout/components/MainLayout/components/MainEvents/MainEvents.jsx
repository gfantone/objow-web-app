import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import local from '../../../../../../../../data/local/local';
import tokens from '../../../../../../../../data/api/endpoints/tokens';
import { toast } from 'react-toastify';
import _, { set } from 'lodash';

const MainEvents = ({ goBack, children, ...props }) => {
  useEffect(() => {
    // reset update required when initializing app
    local.setUpdateRequired(false);
    // Listen to postmessages
    const eventListener = (event) => {
      if (!event.data || typeof event.data !== 'string') {
        return;
      }
      const result = JSON.parse(event.data);
      const event_type = result.type;

      switch (event_type) {
        case 'app_version':
          // Set to local storage
          local.setAppVersion(result.version);
          local.setAppBundleId(result.bundle_id);
          break;
        default:
          break;
      }
    };
    window.addEventListener('message', eventListener);

    return () => window.removeEventListener('message', eventListener);
  }, []);

  return <>{children}</>;
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(MainEvents);
