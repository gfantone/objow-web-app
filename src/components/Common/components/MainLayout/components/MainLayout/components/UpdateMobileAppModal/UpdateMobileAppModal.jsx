import React from 'react';
import { Card, DefaultText } from '../../../../../../components';
import { Grid } from '@material-ui/core';

const UpdateMobileAppModal = () => {
  const { detect } = require('detect-browser');
  const browser = detect();
  const isIos = browser.name === 'ios-webview';
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9000,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          zIndex: 10000,
        }}
      >
        <Card>
          <div>
            <Grid container>
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={12}>
                    <DefaultText lowercase style={{ fontWeight: 'bold' }}>
                      Mettre à jour l'application
                    </DefaultText>
                  </Grid>
                  <Grid item xs={12}>
                    <DefaultText lowercase>
                      Cette version n'est plus prise en charge. Veuillez mettre
                      à jour votre application.
                    </DefaultText>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                container
                alignItems='center'
                style={{ paddingLeft: 10 }}
              >
                <Grid item>
                  <a
                    href={
                      isIos
                        ? process.env.REACT_APP_MOBILE_APP_STORE_URL
                        : process.env.REACT_APP_MOBILE_PLAY_STORE_URL
                    }
                    target='_blank'
                    style={{ textDecoration: 'none' }}
                  >
                    Mettre à jour
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UpdateMobileAppModal;
