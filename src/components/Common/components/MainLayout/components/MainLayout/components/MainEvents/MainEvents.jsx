import React, { useEffect, useState } from 'react';
import { UpdateMobileAppModal } from '../';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import local from '../../../../../../../../data/local/local';
import tokens from '../../../../../../../../data/api/endpoints/tokens';
import { toast } from 'react-toastify';
import _, { set } from 'lodash';

const MainEvents = ({ goBack, children, ...props }) => {
  const { account } = props.accountDetail;

  const [updateRequired, setUpdateRequired] = useState(
    local.getUpdateRequired() === 'true'
  );
  useEffect(() => {
    // reset update required when initializing app
    // local.setUpdateRequired('false');
    // Listen to postmessages
    window.addEventListener('storage', () => {
      setUpdateRequired(local.getUpdateRequired() === 'true');
    });
    const eventListener = (event) => {
      if (!event.data || typeof event.data !== 'string') {
        return;
      }
      const result = JSON.parse(event.data);
      const event_type = result.type;

      switch (event_type) {
        case 'app_version':
          // Set to local storage
          if (
            account &&
            (account.email === 'd.corticchiato@firetiger.fr' ||
              account.email === 'a3@firetiger.fr')
          ) {
            toast.success(
              `App version: ${result.version} - Bundle ID: ${result.bundle_id}`
            );
          }
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

  return (
    <>
      {updateRequired && <UpdateMobileAppModal />}
      {children}
    </>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(MainEvents);
