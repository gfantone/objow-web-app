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
import { CategoryIconInput } from '../../../../../../components';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const InfoStep = ({ categories, kpis, badge, icons }) => {
  const intl = useIntl();

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DefaultTitle>
            {intl.formatMessage({ id: 'badge.creation.info_title' })}
          </DefaultTitle>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  lowercase
                  name='publicTitle'
                  label='Titre'
                  fullWidth
                  initial={_.get(badge, 'publicTitle')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  lowercase
                  name='privateTitle'
                  label='Sous-titre'
                  fullWidth
                  initial={_.get(badge, 'privateTitle')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  lowercase
                  name='description'
                  label='Description'
                  fullWidth
                  initial={_.get(badge, 'description')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  name='category'
                  initial={badge.category}
                  label={intl.formatMessage({
                    id: 'admin.goal.category_label',
                  })}
                  options={categories}
                  optionValueName='id'
                  optionTextName='name'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <CategoryIconInput
                  name='icon'
                  label='Icône'
                  icons={[icons]}
                  initial={_.get(badge, 'icon')}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default InfoStep;
