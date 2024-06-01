import React from 'react';
import { Grid, withWidth, isWidthDown } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { ActivityWidget, MainLayoutComponent } from '../../components';

import { ChallengeWidget } from '../../components/Widget/ChallengeWidget';
import { BadgeWidget } from '../../components/Widget/BadgeWidget';
import { NewsFeedWidget } from '../../components/Widget/NewsFeedWidget';
import CoachingWidget from '../../components/Widget/CoachingWidget/CoachingWidget';
import { GoalWidget } from '../../components/Widget/GoalWidget';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

class Home extends MainLayoutComponent {
  componentDidMount() {
    const { intl, width } = this.props;
    const { account } = this.props.accountDetail;

    const isMobile = isWidthDown('xs', width);
    this.props.handleMaxWidth('lg');

    this.props.handleTitle(
      account.dashboardWording || intl.formatMessage({ id: 'common.home' })
    );
  }

  render() {
    const { width } = this.props;
    const { account } = this.props.accountDetail;

    const isMobile = isWidthDown('xs', width);
    const isCollaborator = account.role.code === 'C';
    const isAdministrator = account.role.code === 'A';
    const isSuperManager = account.role.code === 'S';
    const isManager = account.role.code === 'M';

    if (!account.hasDashboardAccess) {
      return <Redirect to={'/goals'} />;
    }

    return (
      <Grid container spacing={2}>
        {isMobile ? (
          <>
            <Grid item xs={12}>
              <GoalWidget />
            </Grid>
            <Grid item xs={12}>
              <ChallengeWidget />
            </Grid>
            <Grid item xs={12}>
              {(isAdministrator || isSuperManager || isManager) && (
                <BadgeWidget />
              )}
            </Grid>
            <Grid item xs={12}>
              <NewsFeedWidget />
            </Grid>
            <Grid item xs={12}>
              <CoachingWidget />
            </Grid>
            <Grid item xs={12}>
              {isAdministrator || isSuperManager || isManager ? (
                <ActivityWidget />
              ) : (
                <BadgeWidget />
              )}
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6} lg={4}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs={12}>
                  <GoalWidget />
                </Grid>
                <Grid item xs={12}>
                  {isAdministrator || isSuperManager || isManager ? (
                    <ActivityWidget />
                  ) : (
                    <BadgeWidget />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs={12}>
                  <ChallengeWidget />
                </Grid>
                <Grid item xs={12}>
                  <CoachingWidget />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Grid container spacing={2} direction='column'>
                {(isAdministrator || isSuperManager || isManager) && (
                  <Grid item xs={12}>
                    <BadgeWidget />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <NewsFeedWidget />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = ({ accountDetail }) => ({ accountDetail });

export default connect(mapStateToProps)(withWidth()(injectIntl(Home)));
