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
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as collaboratorRewardOrderDetailActions from '../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderDetail/actions';
import * as collaboratorRewardOrderUpdateActions from '../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderUpdate/actions';
import { toast } from 'react-toastify';

class CollaboratorRewardOrderValidation extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'reward.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({
          id: 'collaborator.reward_order.validation.title',
        })}
      />,
    );
    this.props.activateReturn();
    this.props.collaboratorRewardOrderDetailActions.getCollaboratorRewardOrder(
      this.props.match.params.id,
      true,
    );
    this.props.collaboratorRewardOrderUpdateActions.clearCollaboratorRewardOrderUpdate();
  }

  handleRefuseClick() {
    const { order } = this.props.collaboratorRewardOrderDetail;
    const oldPointBalance = order.pointSummary
      ? order.pointSummary.points - order.pointSummary.usedPoints
      : 0;
    this.props.collaboratorRewardOrderUpdateActions.updateCollaboratorRewardOrder(
      this.props.match.params.id,
      oldPointBalance,
      false,
    );
  }

  handleValidateClick() {
    const { order } = this.props.collaboratorRewardOrderDetail;
    const oldPointBalance = order.pointSummary
      ? order.pointSummary.points - order.pointSummary.usedPoints
      : 0;
    this.props.collaboratorRewardOrderUpdateActions.updateCollaboratorRewardOrder(
      this.props.match.params.id,
      oldPointBalance,
      true,
    );
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;
    const { order } = this.props.collaboratorRewardOrderDetail;
    const { loading } = this.props.collaboratorRewardOrderUpdate;
    const name = `${order.counter.collaborator.firstname} ${order.counter.collaborator.lastname}`;
    const recipientPoints = order.pointSummary
      ? order.pointSummary.points - order.pointSummary.usedPoints
      : 0;
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
                      id: 'collaborator.reward_order.validation.rewards_area',
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
                    id: 'collaborator.reward_order.validation.points_area',
                  })}
                </DefaultTitle>
                <InfoText>
                  {intl
                    .formatMessage({
                      id: 'collaborator.reward_order.validation.points_area_year',
                    })
                    .format(order.counter.period.name)}
                </InfoText>
              </Grid>
              <Grid item xs={12}>
                <RewardOrderSummary
                  recipientPoints={recipientPoints}
                  orderId={order.id}
                  orderPoints={orderPoints}
                  orderValue={orderValue}
                  onRefuseClick={this.handleRefuseClick.bind(this)}
                  onValidateClick={this.handleValidateClick.bind(this)}
                  updateLoading={loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    const { intl } = this.props;
    const { order, loading } = this.props.collaboratorRewardOrderDetail;
    const { success, error } = this.props.collaboratorRewardOrderUpdate;

    if (
      !loading &&
      order &&
      order.id == this.props.match.params.id &&
      (order.isValid === true || order.isValid === false)
    ) {
      return <Redirect to="/" />;
    }

    if (success) {
      this.props.collaboratorRewardOrderUpdateActions.clearCollaboratorRewardOrderUpdate();
      this.props.history.goBack();
      toast.success(
        intl.formatMessage({
          id: 'collaborator.reward_order.validation.success',
        }),
      );
    }

    if (error) {
      toast.error(
        intl.formatMessage({
          id: 'collaborator.reward_order.validation.success',
        }),
      );
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && order && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  collaboratorRewardOrderDetail,
  collaboratorRewardOrderUpdate,
}) => ({
  collaboratorRewardOrderDetail,
  collaboratorRewardOrderUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorRewardOrderDetailActions: bindActionCreators(
    collaboratorRewardOrderDetailActions,
    dispatch,
  ),
  collaboratorRewardOrderUpdateActions: bindActionCreators(
    collaboratorRewardOrderUpdateActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(CollaboratorRewardOrderValidation));
