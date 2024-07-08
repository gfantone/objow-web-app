import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  Loader,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import * as currentPeriodDetailActions from '../../../../../../services/Periods/CurrentPeriodDetail/actions';
import * as previousPeriodListActions from '../../../../../../services/Periods/PreviousPeriodList/actions';
import _ from 'lodash';

const Filter = ({ onChange, onClose, open, periodId, ...props }) => {
  const intl = useIntl();
  const { period: currentPeriod } = props.currentPeriodDetail;
  const { periods: previousPeriods, loading } = props.previousPeriodList;
  const periods = _.compact([currentPeriod].concat(previousPeriods));

  useEffect(() => {
    props.currentPeriodDetailActions.getCurrentPeriodDetail();
    props.previousPeriodListActions.getPreviousPeriodList();
  }, []);

  function handleSubmit(model) {
    onChange(model.period);
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <Formsy onSubmit={handleSubmit}>
          <DialogTitle>
            {intl.formatMessage({ id: 'filter.title' })}
          </DialogTitle>
          <DialogContent>
            {loading && <Loader centered />}
            {!loading && periods && periods.length > 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select
                    name='period'
                    label={intl.formatMessage({ id: 'filter.period_label' })}
                    options={periods}
                    optionValueName={'id'}
                    optionTextName={'name'}
                    emptyDisabled
                    fullWidth
                    initial={periodId}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color='secondary'>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
            <Button type='submit'>
              {intl.formatMessage({ id: 'filter.submit_button' })}
            </Button>
          </DialogActions>
        </Formsy>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({
  accountDetail,
  currentPeriodDetail,
  previousPeriodList,
}) => ({
  accountDetail,
  currentPeriodDetail,
  previousPeriodList,
});

const mapDispatchToProps = (dispatch) => ({
  currentPeriodDetailActions: bindActionCreators(
    currentPeriodDetailActions,
    dispatch
  ),
  previousPeriodListActions: bindActionCreators(
    previousPeriodListActions,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
