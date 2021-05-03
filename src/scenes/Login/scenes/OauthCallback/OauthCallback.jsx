import React from 'react'
import api from '../../../../data/api/api';

const OauthCallback = props => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    api.partners.oauthToken(code)

    return (
      <div>

      </div>
    )
};


export default OauthCallback;
