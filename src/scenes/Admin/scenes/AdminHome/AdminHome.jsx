import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import {
  Card,
  DefaultText,
  DefaultTitle,
  GridLink,
  Loader,
  MainLayoutComponent,
  Select,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as nextPeriodListActions from '../../../../services/Periods/NextPeriodList/actions';

class AdminHome extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.period = null;
  }

  refresh(period) {
    var url = `/admin?period=${period}`;
    this.props.history.replace(url);
  }

  loadData() {
    const params = new URLSearchParams(window.location.search);
    const period = params.get('period');
    if (period != this.period) {
      this.period = period;
      this.setState({
        ...this.state,
      });
    }
  }

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.nextPeriodListActions.getNextPeriodList();
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadData();
  }

  renderLoader() {
    return <Loader centered />;
  }

  handleYearChange(value) {
    this.refresh(value);
  }

  renderData() {
    const { intl } = this.props;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: nextPeriods } = this.props.nextPeriodList;
    const periods = [currentPeriod].concat(nextPeriods);
    const periodId = this.period ? this.period : currentPeriod.id;
    const { account } = this.props.accountDetail;

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} container spacing={4}>
            <Grid item xs={12} container spacing={1}>
              <Grid item xs={12}>
                <DefaultTitle isContrast>
                  <FontAwesomeIcon icon={faUsers} />{' '}
                  {intl.formatMessage({ id: 'admin.home.user_area' })}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={2}>
                    <GridLink item xs={12} component={Link} to='/admin/users'>
                      <DefaultText lowercase style={{ fontSize: 15 }}>
                        {intl.formatMessage({ id: 'admin.home.user_link' })}
                      </DefaultText>
                    </GridLink>

                    <GridLink
                      item
                      xs={12}
                      component={Link}
                      to='/admin/organization'
                    >
                      <DefaultText lowercase style={{ fontSize: 15 }}>
                        {intl.formatMessage({
                          id: 'admin.home.organization_link',
                        })}
                      </DefaultText>
                    </GridLink>
                    <GridLink item xs={12} component={Link} to='/admin/access'>
                      <DefaultText lowercase style={{ fontSize: 15 }}>
                        {intl.formatMessage({
                          id: 'admin.home.permission_link',
                        })}
                      </DefaultText>
                    </GridLink>
                    <GridLink
                      item
                      xs={12}
                      component={Link}
                      to='/admin/notifications'
                    >
                      <DefaultText lowercase style={{ fontSize: 15 }}>
                        {intl.formatMessage({
                          id: 'admin.home.notification_link',
                        })}
                      </DefaultText>
                    </GridLink>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={1} alignItems='flex-start'>
              <Grid item xs={12}>
                <DefaultTitle isContrast>
                  <FontAwesomeIcon icon={faDatabase} />{' '}
                  {intl.formatMessage({ id: 'admin.home.data_area' })}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={2}>
                    <GridLink
                      item
                      xs={12}
                      component={Link}
                      to='/admin/partners'
                    >
                      <DefaultText lowercase style={{ fontSize: 15 }}>
                        {intl.formatMessage({ id: 'admin.home.partner_link' })}
                      </DefaultText>
                    </GridLink>
                    <GridLink item xs={12} component={Link} to='/admin/reports'>
                      <DefaultText lowercase style={{ fontSize: 15 }}>
                        {intl.formatMessage({ id: 'admin.home.report_link' })}
                      </DefaultText>
                    </GridLink>
                    <GridLink
                      item
                      xs={12}
                      component={Link}
                      to='/admin/imports/logs'
                    >
                      <DefaultText lowercase style={{ fontSize: 15 }}>
                        {intl.formatMessage({ id: 'admin.home.import_link' })}
                      </DefaultText>
                    </GridLink>
                    <GridLink item xs={12} component={Link} to='/admin/logo'>
                      <DefaultText lowercase style={{ fontSize: 15 }}>
                        {intl.formatMessage({
                          id: 'admin.logo_and_colors.title',
                        })}
                      </DefaultText>
                    </GridLink>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle isContrast>
                    <FontAwesomeIcon icon={faStar} />{' '}
                    {intl.formatMessage({ id: 'admin.home.indicator_area' })}
                  </DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Formsy>
                          <Select
                            name={'year'}
                            label={intl.formatMessage({
                              id: 'admin.home.year_label',
                            })}
                            options={periods}
                            emptyDisabled
                            initial={periodId}
                            optionValueName={'id'}
                            optionTextName={'name'}
                            fullWidth
                            onChange={this.handleYearChange.bind(this)}
                          />
                        </Formsy>
                      </Grid>
                      <GridLink
                        item
                        xs={12}
                        component={Link}
                        to={`/admin/periods/${periodId}/points`}
                      >
                        <DefaultText lowercase style={{ fontSize: 15 }}>
                          {intl.formatMessage({ id: 'admin.home.point_link' })}
                        </DefaultText>
                      </GridLink>
                      <GridLink
                        item
                        xs={12}
                        component={Link}
                        to={`/admin/categories`}
                      >
                        <DefaultText lowercase style={{ fontSize: 15 }}>
                          {intl.formatMessage({
                            id: 'admin.home.category_link',
                          })}
                        </DefaultText>
                      </GridLink>
                      <GridLink
                        item
                        xs={12}
                        component={Link}
                        to={`/admin/periods/${periodId}/goals`}
                      >
                        <DefaultText lowercase style={{ fontSize: 15 }}>
                          {intl.formatMessage({ id: 'admin.goal.title' })}
                        </DefaultText>
                      </GridLink>
                      <GridLink
                        item
                        xs={12}
                        component={Link}
                        to={`/admin/periods/${periodId}/goal-levels/mode-select`}
                      >
                        <DefaultText lowercase style={{ fontSize: 15 }}>
                          {intl.formatMessage({
                            id: 'admin.home.goal_level_link',
                          })}
                        </DefaultText>
                      </GridLink>
                      <GridLink
                        item
                        xs={12}
                        component={Link}
                        to={`/admin/periods/${periodId}/challenges`}
                      >
                        <DefaultText lowercase style={{ fontSize: 15 }}>
                          {account.challengeWording ||
                            intl.formatMessage({
                              id: 'challenge.title_plural',
                            })}
                        </DefaultText>
                      </GridLink>
                      <GridLink
                        item
                        xs={12}
                        component={Link}
                        to={`/admin/periods/${periodId}/badges`}
                      >
                        <DefaultText lowercase style={{ fontSize: 15 }}>
                          {intl.formatMessage({ id: 'admin.home.badge_link' })}
                        </DefaultText>
                      </GridLink>
                      <GridLink
                        item
                        xs={12}
                        component={Link}
                        to={`/admin/periods/${periodId}/levels`}
                      >
                        <DefaultText lowercase style={{ fontSize: 15 }}>
                          {intl.formatMessage({ id: 'admin.home.level_link' })}
                        </DefaultText>
                      </GridLink>
                      <GridLink
                        item
                        xs={12}
                        component={Link}
                        to={`/admin/reward-categories`}
                      >
                        <DefaultText lowercase style={{ fontSize: 15 }}>
                          {intl.formatMessage({ id: 'admin.home.reward_link' })}
                        </DefaultText>
                      </GridLink>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    const { period: currentPeriod, loading: currentPeriodDetailLoading } =
      this.props.currentPeriodDetail;
    const { periods: nextPeriods, loading: nextPeriodListLoading } =
      this.props.nextPeriodList;
    const loading = currentPeriodDetailLoading || nextPeriodListLoading;

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && currentPeriod && nextPeriods && this.renderData()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currentPeriodDetailActions: bindActionCreators(
    currentPeriodDetailActions,
    dispatch
  ),
  nextPeriodListActions: bindActionCreators(nextPeriodListActions, dispatch),
});

const mapStateToProps = ({
  currentPeriodDetail,
  nextPeriodList,
  accountDetail,
}) => ({
  currentPeriodDetail,
  nextPeriodList,
  accountDetail,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AdminHome));
