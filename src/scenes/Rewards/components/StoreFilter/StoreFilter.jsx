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
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions';
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';

const StoreFilter = ({
  initialCategory,
  initialCollaborator,
  initialPeriod,
  initialTeam,
  onChange,
  onClose,
  open,
  ...props
}) => {
  const intl = useIntl();
  const { account } = props.accountDetail;
  const { categories, loading: rewardCategoryListLoading } =
    props.rewardCategoryList;
  const { period: currentPeriod, loading: currentPeriodDetailLoading } =
    props.currentPeriodDetail;
  const { periods: previousPeriods, loading: previousPeriodListLoading } =
    props.previousPeriodList;
  const { teams, loading: teamListLoading } = props.teamList;
  const [category, setCategory] = React.useState(initialCategory);
  const [collaborator, setCollaborator] = React.useState(initialCollaborator);
  const [period, setPeriod] = React.useState(
    initialPeriod ? initialPeriod : currentPeriod ? currentPeriod.id : null
  );
  const [team, setTeam] = React.useState(initialTeam);
  const periods =
    currentPeriod && previousPeriods
      ? [currentPeriod].concat(previousPeriods)
      : null;
  const selectedTeam = teams ? teams.filter((x) => x.id === team)[0] : null;
  const collaborators = selectedTeam ? selectedTeam.collaborators : null;
  const hasAdministrator = account.role.code === 'A';
  const hasManager = account.role.code === 'M';
  const loading =
    rewardCategoryListLoading ||
    currentPeriodDetailLoading ||
    previousPeriodListLoading ||
    teamListLoading;

  useEffect(() => {
    props.rewardCategoryListActions.getActiveRewardCategoryList();
    props.currentPeriodDetailActions.getCurrentPeriodDetail();
    props.previousPeriodListActions.getPreviousPeriodList();
    props.teamListActions.getTeamList({ nestedCollaborators: true });
  }, []);

  function handleSubmit(model) {
    onChange(model.category, model.team, model.collaborator, model.period);
    onClose();
  }

  function handleCategoryChange(newCategory) {
    if (newCategory !== category) {
      setCategory(Number(newCategory));
    }
  }

  function handleCollaboratorChange(newCollaborator) {
    if (newCollaborator !== collaborator) {
      setCollaborator(Number(newCollaborator));
    }
  }

  function handlePeriodChange(newPeriod) {
    if (newPeriod !== period) {
      setPeriod(Number(newPeriod));
    }
  }

  function handleTeamChange(newTeam) {
    if (newTeam !== team) {
      setTeam(Number(newTeam));
      setCollaborator(null);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth>
        <Formsy onSubmit={handleSubmit}>
          <DialogTitle>
            {intl.formatMessage({ id: 'filter.title' })}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {loading && (
                <Grid item xs={12}>
                  <Loader centered />
                </Grid>
              )}
              {!loading && (
                <>
                  <Grid item xs={12}>
                    <Select
                      name='category'
                      label={intl.formatMessage({
                        id: 'filter.category_label',
                      })}
                      options={categories ? categories : []}
                      optionValueName='id'
                      optionTextName='name'
                      emptyText={intl.formatMessage({
                        id: 'filter.category_all_option',
                      })}
                      fullWidth
                      initial={category}
                      onChange={handleCategoryChange}
                    />
                  </Grid>
                  {hasAdministrator && (
                    <Grid item xs={12}>
                      <Select
                        name='team'
                        label={intl.formatMessage({ id: 'filter.team_label' })}
                        options={teams ? teams : []}
                        optionValueName='id'
                        optionTextName='name'
                        emptyDisabled
                        fullWidth
                        initial={team}
                        onChange={handleTeamChange}
                      />
                    </Grid>
                  )}
                  {(hasAdministrator || hasManager) && (
                    <Grid item xs={12}>
                      <Select
                        name='collaborator'
                        label={intl.formatMessage({
                          id: 'filter.collaborator_label',
                        })}
                        options={collaborators ? collaborators : []}
                        optionValueName='id'
                        optionTextName='fullname'
                        emptyText={intl.formatMessage({
                          id: 'filter.collaborator_all_option',
                        })}
                        fullWidth
                        initial={collaborator}
                        onChange={handleCollaboratorChange}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Select
                      name='period'
                      label={intl.formatMessage({ id: 'filter.period_label' })}
                      options={periods ? periods : []}
                      optionValueName='id'
                      optionTextName='name'
                      emptyDisabled
                      fullWidth
                      initial={period}
                      onChange={handlePeriodChange}
                    />
                  </Grid>
                </>
              )}
            </Grid>
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
  rewardCategoryList,
  teamList,
}) => ({
  accountDetail,
  currentPeriodDetail,
  previousPeriodList,
  rewardCategoryList,
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
  teamListActions: bindActionCreators(teamListActions, dispatch),
  rewardCategoryListActions: bindActionCreators(
    rewardCategoryListActions,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreFilter);
