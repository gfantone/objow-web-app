import React from 'react';
import { CardMedia, Grid } from '@material-ui/core';
import { useIntl } from 'react-intl';
import {
  RefreshButton,
  Card,
  DefaultTitle,
  DefaultText,
  Dialog,
} from '../../../../../../../../components';

const UpdateAppModal = () => {
  const intl = useIntl();
  const image = require('../../../../../../../../assets/img/system/layout/update_prompt_image.png');
  return (
    <Dialog open={true} onClose={() => {}}>
      <Grid container spacing={3} style={{ textAlign: 'center' }}>
        <Grid item xs={12}>
          <Grid container justify="center" style={{ marginBottom: 10 }}>
            <CardMedia
              image={image}
              style={{
                width: 200,
                height: 160,
                backgroundPosition: '15px bottom',
              }}
            />
          </Grid>
          <div>
            <DefaultTitle
              style={{
                fontSize: 22,
                textTransform: 'none',
                fontFamily: 'Avenir',
                fontWeight: 'bold',
                lineHeight: 1,
              }}
            >
              {intl.formatMessage({ id: 'common.update_app_prompt_title' })}
            </DefaultTitle>
          </div>
        </Grid>
        <Grid item xs={12}>
          <DefaultText
            lowercase
            style={{
              lineHeight: 1,
            }}
          >
            {intl.formatMessage({ id: 'common.update_app_prompt_message' })}
          </DefaultText>
        </Grid>
        <Grid item xs={12}>
          <RefreshButton />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default UpdateAppModal;
