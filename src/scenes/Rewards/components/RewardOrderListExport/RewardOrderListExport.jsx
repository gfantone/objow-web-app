import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import Formsy from 'formsy-react';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import {
  Button,
  DatePicker,
  ProgressButton,
  Select,
} from '../../../../components';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions';
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions';
import * as rewardOrderListExportActions from '../../../../services/Rewards/RewardOrderListExport/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';

const RewardOrderListExport = ({ onClose, open, ...props }) => {
  const intl = useIntl();
  const { categories, loading: rewardCategoryListLoading } =
    props.rewardCategoryList;
  const { file, loading: exportLoading } = props.rewardOrderListExport;
  const { period: currentPeriod, loading: currentPeriodDetailLoading } =
    props.currentPeriodDetail;
  const { periods: previousPeriods, loading: previousPeriodListLoading } =
    props.previousPeriodList;
  const { teams, loading: teamListLoading } = props.teamList;
  const [category, setCategory] = React.useState(null);
  const [collaborator, setCollaborator] = React.useState(null);
  const [period, setPeriod] = React.useState(null);
  const [team, setTeam] = React.useState(null);
  const [validationEnd, setValidationEnd] = React.useState(null);
  const [validationStart, setValidationStart] = React.useState(null);
  const periods =
    currentPeriod && previousPeriods
      ? [currentPeriod].concat(previousPeriods)
      : null;
  const selectedTeam = teams ? teams.filter((x) => x.id === team)[0] : null;
  const collaborators = selectedTeam ? selectedTeam.collaborators : null;
  const dataLoading =
    rewardCategoryListLoading ||
    currentPeriodDetailLoading ||
    previousPeriodListLoading ||
    teamListLoading;

  useEffect(() => {
    props.rewardOrderListExportActions.clearRewardOrderListExport();
    props.rewardCategoryListActions.getActiveRewardCategoryList();
    props.currentPeriodDetailActions.getCurrentPeriodDetail();
    props.previousPeriodListActions.getPreviousPeriodList();
    props.teamListActions.getTeamList({ nestedCollaborators: true });
  }, []);

  function handleCategoryChange(newCategory) {
    if (newCategory !== category) setCategory(Number(newCategory));
  }

  function handleCollaboratorChange(newCollaborator) {
    if (newCollaborator !== collaborator)
      setCollaborator(Number(newCollaborator));
  }

  function handlePeriodChange(newPeriod) {
    if (newPeriod !== period) setPeriod(Number(newPeriod));
  }

  function handleSubmit(model) {
    props.rewardOrderListExportActions.exportRewardOrderList(
      category,
      team,
      collaborator,
      period,
      validationStart,
      validationEnd
    );
  }

  function handleTeamChange(newTeam) {
    if (newTeam !== team) {
      setTeam(Number(newTeam));
      setCollaborator(null);
    }
  }

  function handleValidationEndChange(newDate) {
    newDate.setHours(23, 59, 59);
    if (newDate !== validationEnd) setValidationEnd(newDate);
  }

  function handleValidationStartChange(newDate) {
    newDate.setHours(0, 0, 0, 0);
    if (newDate !== validationStart) setValidationStart(newDate);
  }

  if (file) {
    window.open(file.path);
    props.rewardOrderListExportActions.clearRewardOrderListExport();
    onClose();
  }

  return (
    <div>
      <Dialog open={open && !dataLoading} onClose={onClose}>
        <Formsy onSubmit={handleSubmit}>
          <DialogTitle>
            {intl.formatMessage({ id: 'reward.order_list_export.title' })}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  name='category'
                  label={intl.formatMessage({
                    id: 'reward.form.category_label',
                  })}
                  options={categories}
                  emptyText={intl.formatMessage({
                    id: 'filter.category_all_option',
                  })}
                  optionValueName='id'
                  optionTextName='name'
                  fullWidth
                  initial={category}
                  onChange={handleCategoryChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  name='team'
                  label={intl.formatMessage({ id: 'filter.team_label' })}
                  options={teams}
                  emptyText={intl.formatMessage({
                    id: 'filter.all_team_label',
                  })}
                  optionValueName='id'
                  optionTextName='name'
                  fullWidth
                  initial={team}
                  onChange={handleTeamChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  name='collaborator'
                  label={intl.formatMessage({
                    id: 'filter.collaborator_label',
                  })}
                  options={collaborators}
                  emptyText={intl.formatMessage({
                    id: 'filter.collaborator_all_option',
                  })}
                  optionValueName='id'
                  optionTextName='fullname'
                  fullWidth
                  initial={collaborator}
                  onChange={handleCollaboratorChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  name={'year'}
                  label={intl.formatMessage({ id: 'filter.period_label' })}
                  options={periods}
                  emptyText={intl.formatMessage({
                    id: 'filter.period_all_option',
                  })}
                  optionValueName={'id'}
                  optionTextName={'name'}
                  fullWidth
                  initial={period}
                  onChange={handlePeriodChange}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  name='start'
                  label={intl.formatMessage({ id: 'filter.start_label' })}
                  initial={validationStart}
                  format='dd/MM/yyyy'
                  fullWidth
                  clearable
                  onChange={handleValidationStartChange}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  name='end'
                  label={intl.formatMessage({ id: 'filter.end_label' })}
                  initial={validationEnd}
                  format='dd/MM/yyyy'
                  fullWidth
                  clearable
                  onChange={handleValidationEndChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color='secondary'>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
            <ProgressButton
              type='submit'
              text={intl.formatMessage({ id: 'common.export' })}
              loading={exportLoading}
            />
          </DialogActions>
        </Formsy>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({
  currentPeriodDetail,
  previousPeriodList,
  rewardCategoryList,
  rewardOrderListExport,
  teamList,
}) => ({
  currentPeriodDetail,
  previousPeriodList,
  rewardCategoryList,
  rewardOrderListExport,
  teamList,
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
  rewardCategoryListActions: bindActionCreators(
    rewardCategoryListActions,
    dispatch
  ),
  rewardOrderListExportActions: bindActionCreators(
    rewardOrderListExportActions,
    dispatch
  ),
  teamListActions: bindActionCreators(teamListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RewardOrderListExport);
