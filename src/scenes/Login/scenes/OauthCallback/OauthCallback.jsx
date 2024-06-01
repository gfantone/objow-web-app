import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as authActions from '../../../../services/Auth/actions';
import api from '../../../../data/api/api';
import local from '../../../../data/local/local';

const OauthCallback = (props) => {
  const [redirect, setRedirect] = useState();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  api.partners.oauthToken(code).then((response) => {
    if (_.get(response, 'data.access') && _.get(response, 'data.refresh')) {
      setRedirect(false);
      props.authActions.login({ token: _.get(response, 'data') });
    } else {
      setRedirect(true);
    }
  });

  if (redirect) {
    return <Redirect to="/" />;
  }
  return <div></div>;
};

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(null, mapDispatchToProps)(OauthCallback);
