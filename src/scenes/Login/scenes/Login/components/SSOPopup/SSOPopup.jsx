import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../../../../../data/api/api';

const SSOPopup = ({ open, url, onCallback, ...props }) => {
  const [externalPopup, setExternalPopup] = useState(null);
  const [requested, setRequested] = useState(false);
  if (url) {
    window.location.replace(url);
  }
  // useEffect(() => {
  //   if (open) {
  //     const width = 500;
  //     const height = 400;
  //     const left = window.screenX + (window.outerWidth - width) / 2;
  //     const top = window.screenY + (window.outerHeight - height) / 2.5;
  //     const popup = window.open(
  //       url,
  //       '',
  //       `width=${width},height=${height},left=${left},top=${top}`
  //     );
  //     setExternalPopup(popup);
  //   }
  // }, [open]);

  // useEffect(() => {
  //   if (!externalPopup) {
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     if (!externalPopup) {
  //       timer && clearInterval(timer);
  //       return;
  //     }
  //     const currentUrl = externalPopup.location.href;
  //     if (!currentUrl) {
  //       return;
  //     }
  //     const searchParams = new URL(currentUrl).searchParams;
  //     const code = searchParams.get('code');
  //     if (code && !requested) {
  //       externalPopup.close();
  //       setRequested(true);
  //       api.partners
  //         .workosToken(code)
  //         .then((response) => {
  //           if (onCallback) {
  //             onCallback(response.data);
  //           }
  //         })
  //         .catch(() => {
  //           // API error
  //         })
  //         .finally(() => {
  //           // clear timer at the end
  //           setExternalPopup(null);
  //           timer && clearInterval(timer);
  //         });
  //     }
  //   }, 2000);
  // }, [externalPopup]);

  return <div></div>;
};

export default withRouter(SSOPopup);
