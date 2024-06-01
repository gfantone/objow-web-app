import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, isWidthUp, withWidth } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { CategoryFilter } from '../../components';
import {
  AppBarSubTitle,
  Category,
  GridLink,
  IconButton,
  Loader,
  MainLayoutComponent,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as teamGoalCategoryListActions from '../../../../services/TeamGoalCategories/TeamGoalCategoryList/actions';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import _ from 'lodash';

class TeamGoalCategoryList extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.id = null;
    this.year = null;
    this.state = {
      filterOpen: false,
    };
  }

  refresh(id, year) {
    var url = `/goals/teams/${id}/categories`;
    if (year) url += `?year=${year}`;
    this.props.history.replace(url);
  }

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

  loadData(props) {
    const id = props.match.params.id;
    const params = new URLSearchParams(window.location.search);
    const year = params.get('year');

    if (id != this.id || year != this.year) {
      this.id = id;
      this.year = year;
      this.props.teamGoalCategoryListActions.getTeamGoalCategoryList(
        id,
        this.year
      );
    }
  }

  componentDidMount() {
    const { intl } = this.props;
    if (
      this.props.accountDetail.account.role.code === 'A' ||
      this.props.accountDetail.account.role.code === 'S'
    )
      this.props.activateReturn();
    this.props.handleTitle(
      _.get(this.props.accountDetail.account, 'goalWording') ||
        intl.formatMessage({ id: 'admin.goal.title' })
    );
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'challenge.category_list_title' })}
      />
    );
    this.props.handleMaxWidth('sm');
    this.props.handleButtons(
      <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
        <FontAwesomeIcon icon={faSlidersH} />
      </IconButton>
    );
    this.loadData(this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadData(this.props);
  }

  handleFilterChange(team, collaborator, year) {
    if (!collaborator) {
      const teamId =
        this.props.accountDetail.account.role.code === 'M' ? this.id : team;
      this.refresh(teamId, year);
    } else {
      var url = `/goals/collaborators/${collaborator}/categories`;
      if (year) url += `?year=${year}`;
      this.props.history.push(url);
    }
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;
    const { categories } = this.props.teamGoalCategoryList;
    const { account } = this.props.accountDetail;

    const all_icon = require(`../../../../assets/img/system/categories/all.svg`);
    const all_icon_jti = require(`../../../../assets/img/system/categories/all_jti.png`);

    const isJti = account.isJtiEnv;
    const all_category = isJti
      ? {
          name: intl.formatMessage({ id: 'filter.category_all_option' }),
          icon: all_icon_jti,
        }
      : {
          name: intl.formatMessage({ id: 'filter.category_all_option' }),
          icon: all_icon,
        };
    const { configs } = this.props.configList;
    const currentTime = _.get(
      configs.find((c) => c.code === 'GDTF'),
      'value',
      '0'
    );

    const allUrl = this.year
      ? `/goals/teams/${this.props.match.params.id}/list?year=${this.year}&current=${currentTime}`
      : `/goals/teams/${this.props.match.params.id}/list?current=${currentTime}`;
    const spacing = isWidthUp('sm', this.props.width) ? 8 : 4;

    return (
      <div>
        <Grid container spacing={spacing}>
          <GridLink item xs={12} sm={4} component={Link} to={allUrl}>
            <Category category={all_category} />
          </GridLink>
          {categories.map((category) => {
            return (
              <GridLink
                key={category.id}
                item
                xs={12}
                sm={4}
                component={Link}
                to={`/goals/teams/${this.props.match.params.id}/list?category=${category.categoryId}&year=${category.periodId}&current=${currentTime}`}
              >
                <Category category={category} />
              </GridLink>
            );
          })}
        </Grid>
      </div>
    );
  }

  render() {
    const { categories, loading } = this.props.teamGoalCategoryList;
    const marginTop = isWidthUp('sm', this.props.width) ? 48 : 16;
    const { configs, loading: configListLoading } = this.props.configList;
    const { account } = this.props.accountDetail;

    if (!account.hasGoalAccess) {
      return <Redirect to={'/challenges'} />;
    }

    return (
      <div style={{ marginTop: marginTop }}>
        {loading && configListLoading && this.renderLoader()}
        {!loading &&
          !configListLoading &&
          configs &&
          categories &&
          this.renderData()}
        {this.state.filterOpen && (
          <CategoryFilter
            open={this.state.filterOpen}
            onClose={this.handleFilterClose.bind(this)}
            onChange={this.handleFilterChange.bind(this)}
            year={this.year}
            team={this.props.match.params.id}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  teamGoalCategoryList,
  configList,
}) => ({
  accountDetail,
  teamGoalCategoryList,
  configList,
});

const mapDispatchToProps = (dispatch) => ({
  teamGoalCategoryListActions: bindActionCreators(
    teamGoalCategoryListActions,
    dispatch
  ),
  configListActions: bindActionCreators(configListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(injectIntl(TeamGoalCategoryList)));
