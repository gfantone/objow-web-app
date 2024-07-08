import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Grid } from '@material-ui/core';
import {
  AppBarSubTitle,
  BlueText,
  Card,
  DefaultText,
  BigText,
  InfoText,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  Select,
  Switch,
  TextField,
  Tooltip,
  Stepper,
  RichTextField,
  TransferList,
  GreenRadio,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DefaultTitle,
} from '../../../../../../../../components';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const KpiStep = ({ categories, kpis, initial }) => {
  const [kpiId, setKpiId] = useState(initial);
  const [category, setCategory] = useState();
  const intl = useIntl();
  const kpi = kpiId ? kpis.find((k) => k.id == kpiId) : null;
  const unit = kpi
    ? kpi.unit.name + (kpi.unit.symbol ? ` (${kpi.unit.symbol})` : '')
    : null;
  const format = kpi && kpi.manual ? 'Manuel' : 'Automatique';

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DefaultTitle isContrast>
            {intl.formatMessage({ id: 'challenge.form.info_area' })}
          </DefaultTitle>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Select
                      name='kpiCategory'
                      emptyText={intl.formatMessage({
                        id: 'filter.all_category_label',
                      })}
                      label={intl.formatMessage({
                        id: 'admin.goal.category_label',
                      })}
                      options={categories}
                      optionValueName='id'
                      optionTextName='name'
                      fullWidth
                      onChange={setCategory}
                    />
                  </Grid>
                  <Grid item>
                    <Select
                      name='kpi'
                      label={intl.formatMessage({ id: 'admin.goal.kpi_label' })}
                      initial={kpiId}
                      options={kpis.filter(
                        (kpi) =>
                          !category ||
                          _.get(kpi, 'category.id') === parseInt(category)
                      )}
                      optionValueName='id'
                      optionTextName='name'
                      onChange={setKpiId}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <InfoText>
                      {intl.formatMessage({ id: 'admin.goal.unit_label' })}
                    </InfoText>
                    <DefaultText lowercase style={{ minHeight: 19 }}>
                      {unit}
                    </DefaultText>
                  </Grid>
                  <Grid item>
                    <InfoText>
                      {intl.formatMessage({
                        id: 'admin.goal.periodicity_label',
                      })}
                    </InfoText>
                    <DefaultText lowercase style={{ minHeight: 19 }}>
                      {_.get(kpi, 'periodicity.description')}
                    </DefaultText>
                  </Grid>
                  <Grid item>
                    <InfoText>
                      {intl.formatMessage({
                        id: 'admin.goal.kpi_format_label',
                      })}
                    </InfoText>
                    {kpi && (
                      <DefaultText lowercase style={{ minHeight: 19 }}>
                        {format}
                      </DefaultText>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default KpiStep;
