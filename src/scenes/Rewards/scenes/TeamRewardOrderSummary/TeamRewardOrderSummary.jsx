import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { RewardOrderItemList, RewardOrderSummary } from '../../components';
import {
  AppBarSubTitle,
  DefaultTitle,
  InfoText,
  Loader,
  MainLayoutComponent,
} from '../../../../components';
import { injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as teamRewardOrderDetailActions from '../../../../services/TeamRewardOrders/TeamRewardOrderDetail/actions';

class TeamRewardOrderSummary extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'reward.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({
          id: 'collaborator.reward_order.summary_title',
        })}
      />,
    );
    this.props.teamRewardOrderDetailActions.getTeamRewardOrder(
      this.props.match.params.id,
    );
    this.props.activateReturn();
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;
    const { order } = this.props.teamRewardOrderDetail;
    const name = order.counter.team.name;
    const orderPoints = order.items
      .map((x) => x.quantity * x.reward.points)
      .reduce((a, b) => a + b);
    const orderValue = order.items
      .map((x) => x.quantity * x.reward.value)
      .reduce((a, b) => a + b);

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InfoText style={{ visibility: 'hidden' }}>Fake</InfoText>
                <DefaultTitle>
                  {intl
                    .formatMessage({
                      id: 'collaborator.reward_order.summary_rewards_area',
                    })
                    .format(order.id, name)}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12}>
                <RewardOrderItemList items={order.items} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <DefaultTitle>
                  {intl.formatMessage({
                    id: 'collaborator.reward_order.summary_points_area',
                  })}
                </DefaultTitle>
                <InfoText>
                  {intl
                    .formatMessage({
                      id: 'collaborator.reward_order.summary_points_area_year',
                    })
                    .format(order.counter.period.name)}
                </InfoText>
              </Grid>
              <Grid item xs={12}>
                <RewardOrderSummary
                  recipientPoints={order.oldPointBalance}
                  orderPoints={orderPoints}
                  orderValue={orderValue}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    const { order, loading } = this.props.teamRewardOrderDetail;

    if (order && (order.isValid == null || order.isValid === false)) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && order && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ teamRewardOrderDetail }) => ({
  teamRewardOrderDetail,
});

const mapDispatchToProps = (dispatch) => ({
  teamRewardOrderDetailActions: bindActionCreators(
    teamRewardOrderDetailActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(TeamRewardOrderSummary));
