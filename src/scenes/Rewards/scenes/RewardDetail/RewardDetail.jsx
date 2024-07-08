import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Hidden,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faEdit,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import {
  HorizontalExplanation,
  RewardDetailImage,
  SubHeader,
  VerticalExplanation,
} from './components';
import {
  ShoppingCartAddingConfirmation,
  ShoppingCartButton,
} from '../../components';
import {
  AccentText,
  BoldSpan,
  Card,
  DefaultText,
  DefaultTitle,
  IconButton,
  InfoText,
  Linkify,
  MainLayoutComponent,
  Quantity,
  RichText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ProgressButton,
  Button,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import '../../../../helpers/StringHelper';
import * as rewardDetailActions from '../../../../services/Rewards/RewardDetail/actions';
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions';
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const DEFAULT_QUANTITY = 1;

const styles = (theme) => {
  return {
    panel: {
      backgroundColor: 'initial',
      borderRadius: 'initial',
      boxShadow: 'none',
    },
    panelSummary: {
      margin: 'none',
      padding: 'initial',
    },
    panelSummaryIcon: {
      color: theme.palette.primary.main,
    },
    panelDetails: {
      padding: 'initial',
    },
  };
};

class RewardDetail extends MainLayoutComponent {
  state = { expanded: false, quantity: DEFAULT_QUANTITY };

  constructor(props) {
    super(props);
    this.id = null;
  }

  handleAddClick = (reward, confirm) => {
    const params = new URLSearchParams(window.location.search);
    const collaboratorId = params.get('collaborator_id');

    const { collaborator } = this.props.collaboratorDetail;

    const { items } = this.props.shoppingCart;
    const removableItems = items.filter((item) =>
      collaboratorId
        ? !item.collaborator || item.collaborator.id !== collaborator.id
        : item.collaborator
    );

    if (removableItems.length > 0) {
      if (confirm) {
        removableItems.forEach((item) =>
          this.props.shoppingCartActions.removeItem(item)
        );
      } else {
        this.setState({
          ...this.state,
          confirmOpen: true,
          reward: reward,
          collaborator: collaborator,
        });
        return;
      }
    }

    const item = {
      reward: reward,
      quantity: this.state.quantity,
      collaborator: collaboratorId ? collaborator : null,
    };
    this.props.shoppingCartActions.addItem(item);
    this.setState({
      ...this.state,
      confirmOpen: false,
    });
  };

  setConfirmOpen = (confirmOpen) => {
    this.setState({
      ...this.state,
      confirmOpen: confirmOpen,
    });
  };

  loadData() {
    const params = new URLSearchParams(window.location.search);
    const collaboratorId = params.get('collaborator_id');
    const id = this.props.match.params.id;
    if (this.id !== id) {
      const { account } = this.props.accountDetail;
      this.id = id;
      this.props.handleButtons(
        <div style={{ display: 'contents' }}>
          {account.role.code === 'A' && (
            <IconButton
              size='small'
              onClick={() =>
                this.props.history.push(`/rewards/duplication/${id}`)
              }
              style={{ marginRight: 8 }}
            >
              <FontAwesomeIcon icon={faCopy} />
            </IconButton>
          )}
          {account.role.code === 'A' && (
            <IconButton
              size='small'
              onClick={() =>
                this.props.history.push(`/rewards/modification/${id}`)
              }
            >
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
          )}
          {account.role.code !== 'A' && <ShoppingCartButton />}
        </div>
      );
      this.props.rewardDetailActions.getReward(id);
      if (collaboratorId) {
        this.props.collaboratorDetailActions.getCollaboratorDetail(
          collaboratorId
        );
      }
    }
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const collaboratorId = params.get('collaborator_id');

    const { intl } = this.props;
    const { collaborator } = this.props.collaboratorDetail;

    this.props.handleTitle(intl.formatMessage({ id: 'reward.title' }));
    this.props.handleSubHeader(
      <SubHeader
        onAddClick={this.handleAddClick.bind(this)}
        disableButton={collaboratorId && !collaborator}
      />
    );
    this.props.activateReturn();
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const params = new URLSearchParams(window.location.search);
    const collaboratorId = params.get('collaborator_id');
    const { collaborator } = this.props.collaboratorDetail;

    this.loadData();
    if (prevProps.collaboratorDetail.collaborator !== collaborator) {
      this.props.handleSubHeader(
        <SubHeader
          onAddClick={this.handleAddClick.bind(this)}
          disableButton={collaboratorId && !collaborator}
        />
      );
    }
  }

  getLastReward(reward) {
    var lastReward = reward;
    while (lastReward.new) {
      lastReward = lastReward.new;
    }
    return lastReward;
  }

  handleExpansionChange(event, expanded) {
    this.setState({
      ...this.state,
      expanded: expanded,
    });
  }

  handleQuantityChange(quantity) {
    this.setState({
      ...this.state,
      quantity: quantity,
    });
  }

  render() {
    const { intl } = this.props;
    const { classes } = this.props;
    const { account } = this.props.accountDetail;
    const { reward, loading } = this.props.rewardDetail;
    const image = reward
      ? reward.image
        ? reward.image.path
        : reward.customImage
      : null;

    if (reward && !reward.isActive && reward.new) {
      const lastReward = this.getLastReward(reward);
      this.props.history.replace(`/rewards/detail/${lastReward.id}`);
    } else if (reward && !reward.isActive && !reward.new) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        {!loading && reward && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DefaultTitle isContrast>
                {intl.formatMessage({ id: 'reward.detail.description_area' })}
              </DefaultTitle>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <DefaultText lowercase>
                              <BoldSpan>{reward.name}</BoldSpan>
                            </DefaultText>
                          </Grid>
                          <Grid item>
                            <DefaultText>
                              <BoldSpan>
                                <FontAwesomeIcon icon={faFolderOpen} />{' '}
                                {reward.category.name}
                              </BoldSpan>
                            </DefaultText>
                          </Grid>
                          <Grid item>
                            <DefaultText>
                              <BoldSpan>
                                {intl
                                  .formatMessage({
                                    id: 'reward.detail.value_text',
                                  })
                                  .format(reward.value)}
                              </BoldSpan>
                            </DefaultText>
                          </Grid>
                        </Grid>
                      </Grid>
                      {((account.role.code === 'C' &&
                        reward.type.code === 'P') ||
                        (account.role.code === 'M' &&
                          reward.type.code === 'T')) && (
                        <Grid item>
                          <Grid
                            container
                            spacing={1}
                            direction='column'
                            alignItems='center'
                          >
                            <Grid item>
                              <DefaultText>
                                {intl.formatMessage({
                                  id: 'reward.order_item_list.quantity_label',
                                })}
                              </DefaultText>
                            </Grid>
                            <Grid item>
                              <Quantity
                                initial={DEFAULT_QUANTITY}
                                minimum={1}
                                onChange={this.handleQuantityChange.bind(this)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Linkify>
                          <RichText
                            initial={JSON.parse(reward.description)}
                            readOnly={true}
                            onChange={() => {}}
                          />
                        </Linkify>
                      </Grid>
                      <Grid item xs={12}>
                        <DefaultText>
                          <BoldSpan>
                            {intl.formatMessage({
                              id: 'reward.form.delivery_area',
                            })}
                          </BoldSpan>
                        </DefaultText>
                        <DefaultText lowercase>
                          <BoldSpan>
                            {intl
                              .formatMessage({
                                id: 'reward.detail.delivery_place_text',
                              })
                              .format('')}
                          </BoldSpan>
                          {reward.deliveryPlace}
                        </DefaultText>
                        <DefaultText lowercase>
                          <BoldSpan>
                            {intl
                              .formatMessage({
                                id: 'reward.detail.delivery_mode_text',
                              })
                              .format('')}
                          </BoldSpan>
                          {reward.deliveryMode}
                        </DefaultText>
                        {reward.deliveryTime && reward.deliveryTime !== '' && (
                          <DefaultText lowercase>
                            <BoldSpan>
                              {intl
                                .formatMessage({
                                  id: 'reward.detail.delivery_time_text',
                                })
                                .format('')}
                            </BoldSpan>
                            {reward.deliveryTime}
                          </DefaultText>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md='auto'>
                    <RewardDetailImage image={image} />
                  </Grid>
                  <Grid item xs={12}>
                    <ExpansionPanel
                      expanded={this.state.expanded}
                      onChange={this.handleExpansionChange.bind(this)}
                      className={classes.panel}
                    >
                      <ExpansionPanelSummary
                        expandIcon={
                          <ExpandMoreIcon
                            className={classes.panelSummaryIcon}
                          />
                        }
                        className={classes.panelSummary}
                      >
                        <AccentText>
                          <BoldSpan>
                            {intl.formatMessage({
                              id: 'reward.detail.operation_title',
                            })}
                          </BoldSpan>
                        </AccentText>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.panelDetails}>
                        <Hidden smDown>
                          <HorizontalExplanation />
                        </Hidden>
                        <Hidden mdUp>
                          <VerticalExplanation />
                        </Hidden>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        )}
        {!this.state.confirmOpen && <ShoppingCartAddingConfirmation />}

        <Dialog
          open={this.state.confirmOpen}
          onClose={() => this.setConfirmOpen(false)}
        >
          <DialogTitle>
            {intl.formatMessage({
              id: 'collaborator.reward_order.erase_cart_warning',
            })}
          </DialogTitle>
          <DialogContent>
            {intl.formatMessage({
              id: 'collaborator.reward_order.erase_cart_warning2',
            })}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setConfirmOpen(false)}
              color='secondary'
            >
              {intl.formatMessage({ id: 'common.no' })}
            </Button>
            <ProgressButton
              type='button'
              text={intl.formatMessage({ id: 'common.yes' })}
              onClick={() => this.handleAddClick(this.state.reward, true)}
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  rewardDetail,
  shoppingCart,
  collaboratorDetail,
}) => ({
  accountDetail,
  rewardDetail,
  shoppingCart,
  collaboratorDetail,
});

const mapDispatchToProps = (dispatch) => ({
  rewardDetailActions: bindActionCreators(rewardDetailActions, dispatch),
  collaboratorDetailActions: bindActionCreators(
    collaboratorDetailActions,
    dispatch
  ),
  shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(RewardDetail)));
