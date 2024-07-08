import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBarSubTitle,
  Card,
  DataTable,
  DefaultText,
  InfoText,
  Loader,
  MainLayoutComponent,
  IconButton,
} from '../../../../components';
import * as badgeListActions from '../../../../services/Badges/BadgeList/actions';
import * as badgeLevelRemainingPointsActions from '../../../../services/BadgeLevels/BadgeLevelRemainingPoints/actions';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { injectIntl } from 'react-intl';

const styles = {
  icon: {
    height: 34,
    width: 34,
    overflow: 'hidden',
    borderRadius: 20,
  },
};

class AdminBadgeList extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    const periodId = this.props.match.params.periodId;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'admin.badge_config.title' })}
      />
    );
    this.props.handleButtons(
      <IconButton size='small' onClick={this.onAdd.bind(this)}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.badgeListActions.getBadgeList(periodId);
    this.props.badgeLevelRemainingPointsActions.getBadgeLevelRemainingPoints(
      periodId
    );
  }

  onAdd() {
    const periodId = this.props.match.params.periodId;

    this.props.history.push(`/admin/periods/${periodId}/badges/creation`);
  }

  handleClick(id) {
    this.props.history.push(`/admin/badges/${id}`);
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;

    const { classes } = this.props;
    const { badges } = this.props.badgeList;
    const { points: remainingPoints } = this.props.badgeLevelRemainingPoints;
    var columns = [
      { name: 'id', options: { display: false, filter: false } },
      {
        name: 'id',
        label: 'Icône',
        options: {
          customBodyRender: (id) => {
            const badge = badges.find((b) => b.id === id);
            const value = badge.code;
            if (value) {
              const iconData = require(`../../../../assets/img/system/badge/icons/${value}.svg`);
              return <CardMedia image={iconData} className={classes.icon} />;
            } else if (badge.icon) {
              return (
                <CardMedia image={badge.icon.path} className={classes.icon} />
              );
            } else {
              return <div />;
            }
          },
          filter: false,
        },
      },
      { name: 'privateTitle', label: 'Badges' },
      { name: 'levels', label: 'Nombre de rang' },
      { name: 'points', label: 'Pts/joueur mis en jeu' },
    ];
    const options = {
      selectableRows: 'none',
      onRowClick: (colData, cellMeta) => {
        this.props.history.push(
          `/admin/periods/${this.props.match.params.periodId}/badges/${colData[0]}`
        );
      },
    };

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <Grid container>
              <Grid item>
                <InfoText lowercase>
                  {intl.formatMessage({
                    id: 'admin.badge_config.remaining_points_to_award',
                  })}
                </InfoText>
                <DefaultText>
                  {intl
                    .formatMessage({ id: 'reward.point_tag' })
                    .format(remainingPoints)}
                </DefaultText>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <DataTable data={badges} columns={columns} options={options} />
        </Grid>
      </Grid>
    );
  }

  render() {
    const { badges, loading: badgeListLoading } = this.props.badgeList;
    const { points, loading: badgeLevelRemainingPointsLoading } =
      this.props.badgeLevelRemainingPoints;
    const loading = badgeListLoading || badgeLevelRemainingPointsLoading;

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && badges && points != null && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ badgeList, badgeLevelRemainingPoints }) => ({
  badgeList,
  badgeLevelRemainingPoints,
});

const mapDispatchToProps = (dispatch) => ({
  badgeListActions: bindActionCreators(badgeListActions, dispatch),
  badgeLevelRemainingPointsActions: bindActionCreators(
    badgeLevelRemainingPointsActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(withRouter(AdminBadgeList))));
