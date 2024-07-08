import React from 'react';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { useIntl } from 'react-intl';
import {
  ProgressButton,
  Switch,
  TextField,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';

const AircallForm = ({ kpis, onUpdate, updating, ...props }) => {
  const intl = useIntl();
  const acGetCallsKpi = kpis.find((x) => x.code === 'AC-GET-CALLS');
  const [acGetCallsActivation, setAcGetCallsActivation] = React.useState(
    acGetCallsKpi.isActive,
  );

  function handleValidSubmit(model) {
    const duration = Number(model.acGetCallsDuration);
    const params = duration ? { duration } : null;
    const kpis = [
      {
        id: acGetCallsKpi.id,
        isActive: model.acGetCallsActivation,
        params: params,
      },
    ];
    if (onUpdate) onUpdate(kpis);
  }

  return (
    <div>
      <Formsy onValidSubmit={handleValidSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Switch
              initial={acGetCallsActivation}
              label={intl.formatMessage({
                id: 'admin.aircall.form_ac_get_calls_activation',
              })}
              name="acGetCallsActivation"
              onChange={setAcGetCallsActivation}
            />
          </Grid>
          {acGetCallsActivation && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                initial={acGetCallsKpi.params.duration}
                label={intl.formatMessage({
                  id: 'admin.aircall.form_ac_get_calls_duration',
                })}
                name="acGetCallsDuration"
                required
                type="number"
                validationErrors={{
                  isDefaultRequiredValue: intl.formatMessage({
                    id: 'common.form.required_error',
                  }),
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <ProgressButton
              text={intl.formatMessage({ id: 'common.submit' })}
              loading={updating}
            />
          </Grid>
        </Grid>
      </Formsy>
    </div>
  );
};

export default AircallForm;
