import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { RewardOrderItemList, RewardOrderSummary } from '../../components';
import {
  DefaultTitle,
  InfoText,
  MainLayoutComponent,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as collaboratorRewardOrderCreationActions from '../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderCreation/actions';
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions';
import * as teamRewardOrderCreationActions from '../../../../services/TeamRewardOrders/TeamRewardOrderCreation/actions';
import { toast } from 'react-toastify';
import _ from 'lodash';

class ShoppingCart extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'reward.title' }));
    this.props.activateReturn();
    this.props.collaboratorRewardOrderCreationActions.clearCollaboratorRewardOrderCreation();
    this.props.teamRewardOrderCreationActions.clearTeamRewardOrderCreation();
  }
  calculateRecipientPoints() {
    const { account } = this.props.accountDetail;
    const { items } = this.props.shoppingCart;
    const itemsWithCollaborators = items.filter(
      (item) => item.collaborator !== undefined
    );

    const user =
      itemsWithCollaborators.length > 0
        ? itemsWithCollaborators[0].collaborator
        : account;
    if (user.role.code === 'C') {
      const { summary: collaboratorPointSummary } =
        this.props.collaboratorPointSummaryDetail;
      return (
        collaboratorPointSummary.points -
        collaboratorPointSummary.usedPoints -
        collaboratorPointSummary.waitingPoints
      );
    } else if (user.role.code === 'M') {
      const { summary: teamPointSummary } = this.props.teamPointSummaryDetail;
      return (
        _.get(teamPointSummary, 'points', 0) -
        _.get(teamPointSummary, 'usedPoints', 0) -
        _.get(teamPointSummary, 'waitingPoints', 0)
      );
    } else return 0;
  }

  getCounterId() {
    const { account } = this.props.accountDetail;
    const { items } = this.props.shoppingCart;
    const itemsWithCollaborators = items.filter(
      (item) => item.collaborator !== undefined
    );
    const itemsWithTeams = items.filter((item) => item.team !== undefined);
    var summary = null;
    if (account.role.code === 'C' || itemsWithCollaborators.length > 0) {
      summary = this.props.collaboratorPointSummaryDetail.summary;
    } else if (account.role.code === 'M' || itemsWithTeams.length > 0) {
      summary = this.props.teamPointSummaryDetail.summary;
    }
    return summary ? summary.counterId : null;
  }

  handleItemsChange(reward, quantity) {
    this.props.shoppingCartActions.changeItem(reward, quantity);
  }

  handleOrderClick() {
    const { account } = this.props.accountDetail;
    const { items } = this.props.shoppingCart;
    const counterId = this.getCounterId();
    const order = { counter: counterId };
    const orderItems = items.map((x) => ({
      reward: x.reward.id,
      quantity: x.quantity,
      collaborator_id: x.collaborator ? x.collaborator.id : null,
    }));
    const itemsWithCollaborators = items.filter(
      (item) => item.collaborator !== undefined
    );
    if (account.role.code === 'C' || itemsWithCollaborators.length > 0) {
      this.props.collaboratorRewardOrderCreationActions.createCollaboratorRewardOrder(
        order,
        orderItems
      );
    } else {
      this.props.teamRewardOrderCreationActions.createTeamRewardOrder(
        order,
        orderItems
      );
    }
  }

  render() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    const { items } = this.props.shoppingCart;
    const { summary: collaboratorPointSummary } =
      this.props.collaboratorPointSummaryDetail;
    const { summary: teamPointSummary } = this.props.teamPointSummaryDetail;
    const {
      success: collaboratorRewardOrderCreationSuccess,
      loading: collaboratorRewardOrderCreationLoading,
    } = this.props.collaboratorRewardOrderCreation;
    const {
      success: teamRewardOrderCreationSuccess,
      loading: teamRewardOrderCreationLoading,
    } = this.props.teamRewardOrderCreation;
    const recipientPoints = this.calculateRecipientPoints();
    const hasItems = items.length > 0;
    const orderPoints = hasItems
      ? items.map((x) => x.quantity * x.reward.points).reduce((a, b) => a + b)
      : 0;
    const orderValue = hasItems
      ? items.map((x) => x.quantity * x.reward.value).reduce((a, b) => a + b)
      : 0;
    const periodName =
      account.role.code === 'C'
        ? _.get(collaboratorPointSummary, 'period.name')
        : account.role.code === 'M'
        ? _.get(teamPointSummary, 'period.name')
        : '';
    const success =
      collaboratorRewardOrderCreationSuccess || teamRewardOrderCreationSuccess;
    const loading =
      collaboratorRewardOrderCreationLoading || teamRewardOrderCreationLoading;

    // if (account.role.code === 'A') {
    //   return <Redirect to="/" />;
    // }

    if (success) {
      this.props.collaboratorRewardOrderCreationActions.clearCollaboratorRewardOrderCreation();
      this.props.teamRewardOrderCreationActions.clearTeamRewardOrderCreation();
      this.props.shoppingCartActions.clearShoppingCart();
      this.props.history.push('/rewards');
      toast.success(intl.formatMessage({ id: 'reward.shopping_cart.success' }));
    }
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InfoText style={{ visibility: 'hidden' }}>Fake</InfoText>
                <DefaultTitle>
                  {intl.formatMessage({
                    id: 'reward.shopping_cart.rewards_area',
                  })}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12}>
                <RewardOrderItemList
                  items={items}
                  onItemChange={this.handleItemsChange.bind(this)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <DefaultTitle>
                  {intl.formatMessage({
                    id: 'reward.shopping_cart.points_area',
                  })}
                </DefaultTitle>
                <InfoText>
                  {intl
                    .formatMessage({
                      id: 'reward.shopping_cart.points_area_year',
                    })
                    .format(periodName)}
                </InfoText>
              </Grid>
              <Grid item xs={12}>
                <RewardOrderSummary
                  recipientPoints={recipientPoints}
                  orderPoints={orderPoints}
                  orderValue={orderValue}
                  orderLoading={loading}
                  onOrderClick={
                    hasItems ? this.handleOrderClick.bind(this) : null
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  collaboratorPointSummaryDetail,
  collaboratorRewardOrderCreation,
  shoppingCart,
  teamPointSummaryDetail,
  teamRewardOrderCreation,
}) => ({
  accountDetail,
  collaboratorPointSummaryDetail,
  collaboratorRewardOrderCreation,
  shoppingCart,
  teamPointSummaryDetail,
  teamRewardOrderCreation,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorRewardOrderCreationActions: bindActionCreators(
    collaboratorRewardOrderCreationActions,
    dispatch
  ),
  shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch),
  teamRewardOrderCreationActions: bindActionCreators(
    teamRewardOrderCreationActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ShoppingCart));
