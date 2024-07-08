import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import {
  Card,
  DefaultTitle,
  Switch,
  TextField,
} from '../../../../../../components';
import { useIntl } from 'react-intl';

const Options = ({
  enable_manager_score,
  player_visible_ranks,
  notify_updated,
}) => {
  const intl = useIntl();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DefaultTitle isContrast>
          {intl.formatMessage({ id: 'admin.goal.creation.options_title' })}
        </DefaultTitle>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Switch
                name='enable_manager_score'
                label={intl.formatMessage({
                  id: 'challenge.form.enable_manager_score_label',
                })}
                initial={enable_manager_score}
                checked={true}
                onChange={() => {}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type={'number'}
                name='player_visible_ranks'
                initial={player_visible_ranks}
                label={intl.formatMessage({
                  id: 'admin.access_rights.general_rankings_limit',
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Switch
                name='notify_updated'
                initial={notify_updated}
                label={intl.formatMessage({
                  id: 'challenge.form.notify_updated_label',
                })}
                fullWidth
                onChange={() => {}}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Options;
