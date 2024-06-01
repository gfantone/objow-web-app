import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as authActions from '../../../../services/Auth/actions';
import api from '../../../../data/api/api';
import local from '../../../../data/local/local';
import { Loader } from '../../../../components';
import { isMobile, isAndroid } from 'react-device-detect';
import { toast } from 'react-toastify';

const WorkosCallback = (props) => {
  const [redirect, setRedirect] = useState();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  const { detect } = require('detect-browser');
  const browser = detect();
  const isWebview =
    browser.name === 'ios-webview' || browser.name === 'chromium-webview';

  // Redirect to custom scheme if mobile browser
  if (isMobile && !isWebview) {
    window.location = window.location.href.replace('https://', 'objow://');

    // return <Redirect to={window.location.href.replace('http://', 'objow://')} />;
  }

  useEffect(() => {
    if (!isMobile || isWebview) {
      api.partners.workosToken(code).then((response) => {
        if (_.get(response, 'data.access') && _.get(response, 'data.refresh')) {
          setRedirect(false);
          props.authActions.login({ token: _.get(response, 'data') });
        } else {
          toast.error(`Error with response : ${JSON.stringify(response)}`);
          setRedirect(true);
        }
      });
    }
  }, []);

  if (redirect) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <Loader centered />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(null, mapDispatchToProps)(WorkosCallback);
