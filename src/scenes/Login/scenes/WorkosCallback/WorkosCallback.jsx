import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as authActions from '../../../../services/Auth/actions';
import api from '../../../../data/api/api';
import { Loader } from '../../../../components';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import {isMobileApp} from "../../../../helpers/MobileApp";

const WorkosCallback = (props) => {
  const [redirect, setRedirect] = useState();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  const isWebview = isMobileApp();

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
  }, [code, isWebview, props.authActions]);

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
