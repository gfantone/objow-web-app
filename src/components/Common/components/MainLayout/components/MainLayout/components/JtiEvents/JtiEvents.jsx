import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import local from '../../../../../../../../data/local/local';
import tokens from '../../../../../../../../data/api/endpoints/tokens';
import { toast } from 'react-toastify';
import _ from 'lodash';

const JtiEvents = ({ goBack, children, ...props }) => {
  const { account } = props.accountDetail;

  const refreshToken = () => {
    let refreshToken = local.getTemporaryRefreshToken();
    let isTempToken = true;

    if (!refreshToken) {
      refreshToken = local.getRefreshToken();
      isTempToken = false;
    }

    tokens.refresh(refreshToken).then((response) => {
      const token = response.data.access;
      if (!isTempToken) {
        local.setAccessToken(token);
      } else {
        local.setTemporaryAccessToken(token);
      }
      window.postMessage({ type: 'objow_jti_token_response', token });
    });
  };

  useEffect(() => {
    // main events
    if (!account.isJtiEnv) {
      return;
    }

    // JTI IFrame communication test
    const eventListener = (event) => {
      const event_type = event.data.type;

      switch (event_type) {
        case 'objow_jti_back':
          // goBack();
          props.history.push(`/collaborators/jti/${account.id}/detail`);
          window.location.reload();
          break;
        case 'objow_jti_refresh_token':
          refreshToken();
          break;
        case 'objow_jti_test':
          toast.success(`Message "${event.data.message}" from ${event.origin}`);
          break;
        case 'objow_jti_token_response':
          console.log('Token response : ', event.data.token);
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

export default connect(mapStateToProps)(withRouter(JtiEvents));
