import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { StoreTeamCollaboratorDepartment, SubHeader } from './components';
import {
  ShoppingCartAddingConfirmation,
  ShoppingCartButton,
  StoreFilter,
  StoreTeamDepartment,
} from '../../components';
import {
  IconButton,
  MainLayoutComponent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  ProgressButton,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import * as rewardListActions from '../../../../services/Rewards/RewardList/actions';
import * as teamCollaboratorPointSummaryDetailActions from '../../../../services/TeamCollaboratorPointSummaries/TeamCollaboratorPointSummaryDetail/actions';
import * as teamDetailActions from '../../../../services/Teams/TeamDetail/actions';
import * as teamPointSummaryDetailActions from '../../../../services/TeamPointSummaries/TeamPointSummaryDetail/actions';
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions';

class TeamRewardStore extends MainLayoutComponent {
  state = {
    categoryId: null,
    filterOpen: false,
    name: null,
    page: 0,
    periodId: null,
    teamId: null,
  };

  handleFilterOpen() {
    this.setState({
      ...this.state,
      filterOpen: true,
    });
  }

  handleFilterClose() {
    this.setState({
      ...this.state,
      filterOpen: false,
    });
  }

  refresh(page, category, period, team, name) {
    const { account } = this.props.accountDetail;
    const teamId =
      account.role.code === 'M' ? this.props.match.params.id : team;
    var url = `/rewards/teams/${teamId}?page=${page}`;
    if (category) url += `&category=${category}`;
    if (period) url += `&period=${period}`;
    if (name) url += `&name=${name}`;
    this.props.history.replace(url);
  }

  handlePageChange(page) {
    this.refresh(
      page,
      this.state.categoryId,
      this.state.periodId,
      this.state.teamId,
      this.state.name
    );
  }

  loadData() {
    const teamId = Number(this.props.match.params.id);
    const teamHasChanged = teamId !== this.state.teamId;
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const newPage = pageParam ? Number(pageParam) : this.state.page;
    const categoryParam = params.get('category');
    const categoryId = categoryParam ? Number(categoryParam) : null;
    const periodParam = params.get('period');
    const periodId = periodParam ? Number(periodParam) : null;
    const nameParam = params.get('name');
    const name = nameParam ? decodeURIComponent(nameParam) : null;

    if (
      newPage !== this.state.page ||
      categoryId !== this.state.categoryId ||
      teamHasChanged ||
      periodId !== this.state.periodId ||
      name !== this.state.name
    ) {
      this.setState(
        {
          ...this.state,
          page: newPage,
          categoryId: categoryId,
          teamId: teamId,
          periodId: periodId,
          name: name,
        },
        () => {
          if (teamHasChanged) {
            this.props.teamDetailActions.getTeamDetail(teamId);
          }
          this.props.rewardListActions.getActiveRewardList(name, categoryId);
          this.props.teamCollaboratorPointSummaryDetailActions.getTeamCollaboratorPointSummary(
            teamId,
            periodId
          );
          this.props.teamPointSummaryDetailActions.getTeamPointSummaryByTeam(
            teamId,
            periodId
          );
        }
      );
    }
  }

  componentDidMount() {
    const { intl } = this.props;
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const initialPage = pageParam ? Number(pageParam) : this.state.page;
    const name = params.get('name');
    const { account } = this.props.accountDetail;
    this.props.handleTitle(intl.formatMessage({ id: 'reward.title' }));
    this.props.handleSubHeader(
      <SubHeader
        page={initialPage}
        onChange={this.handlePageChange.bind(this)}
      />
    );
    this.props.handleButtons(
      <div style={{ display: 'contents' }}>
        <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
          <FontAwesomeIcon icon={faSlidersH} />
        </IconButton>
        {account.role.code !== 'A' && (
          <ShoppingCartButton style={{ marginLeft: 8 }} />
        )}
      </div>
    );
    if (account.role.code === 'A') {
      this.props.activateReturn();
    }
    this.loadData();
  }

  applySearch(prevProps) {
    if (prevProps.search !== this.props.search) {
      const search = this.props.search
        ? encodeURIComponent(this.props.search)
        : null;
      this.refresh(
        this.state.page,
        this.state.categoryId,
        this.state.periodId,
        this.state.teamId,
        search
      );
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadData();
    this.applySearch(prevProps);
  }

  handleAddClick(reward, confirm) {
    const { team, loading: teamDetailLoading } = this.props.teamDetail;
    const { items } = this.props.shoppingCart;

    const removableItems = items.filter(
      (item) => item.collaborator !== undefined
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
        });
        return;
      }
    }

    const item = { reward: reward, team, quantity: 1 };
    this.props.shoppingCartActions.addItem(item);
    this.setState({
      ...this.state,
      confirmOpen: false,
    });
  }

  setConfirmOpen = (confirmOpen) => {
    this.setState({
      ...this.state,
      confirmOpen: confirmOpen,
    });
  };

  goToCollaboratorView(categoryId, collaboratorId, periodId, name) {
    var url = `/rewards/collaborators/${collaboratorId}`;
    if (categoryId || periodId) url += '?';
    if (categoryId) url += `category=${categoryId}`;
    if (categoryId && periodId) url += '&';
    if (periodId) url += `period=${periodId}`;
    if ((categoryId || periodId) && name) url += '&';
    if (name) url += `name=${name}`;
    this.props.history.push(url);
  }

  handleFilterChange(category, team, collaborator, period) {
    if (!collaborator) {
      this.refresh(this.state.page, category, period, team, this.state.name);
    } else {
      this.goToCollaboratorView(
        category,
        collaborator,
        period,
        this.state.name
      );
    }
  }

  render() {
    const { intl } = this.props;
    const { configs, loading: configListLoading } = this.props.configList;
    const { team, loading: teamDetailLoading } = this.props.teamDetail;
    const collaboratorRewardActivation = configs
      ? configs.find((x) => x.code === 'CRWA').value.toBoolean()
      : null;
    const teamRewardActivation = configs
      ? configs.find((x) => x.code === 'TRWA').value.toBoolean()
      : null;
    const loading = configListLoading || teamDetailLoading;

    return (
      <div>
        {!loading && team && this.state.page === 0 && teamRewardActivation && (
          <StoreTeamDepartment onAddClick={this.handleAddClick.bind(this)} />
        )}
        {!loading &&
          team &&
          (this.state.page === 1 ||
            (this.state.page === 0 && !teamRewardActivation)) &&
          collaboratorRewardActivation && (
            <StoreTeamCollaboratorDepartment
              name={this.state.name}
              category={this.state.categoryId}
              period={this.state.periodId}
              team={team.id}
            />
          )}
        {team && this.state.filterOpen && (
          <StoreFilter
            open={this.state.filterOpen}
            initialCategory={this.state.categoryId}
            initialTeam={team.id}
            initialCollaborator={null}
            initialPeriod={this.state.periodId}
            onChange={this.handleFilterChange.bind(this)}
            onClose={this.handleFilterClose.bind(this)}
          />
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
  configList,
  teamDetail,
  shoppingCart,
}) => ({
  accountDetail,
  configList,
  teamDetail,
  shoppingCart,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  rewardListActions: bindActionCreators(rewardListActions, dispatch),
  teamCollaboratorPointSummaryDetailActions: bindActionCreators(
    teamCollaboratorPointSummaryDetailActions,
    dispatch
  ),
  teamDetailActions: bindActionCreators(teamDetailActions, dispatch),
  teamPointSummaryDetailActions: bindActionCreators(
    teamPointSummaryDetailActions,
    dispatch
  ),
  shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TeamRewardStore));
