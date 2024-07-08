import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { SubHeader } from './components';
import { Grid, Tooltip, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFireAlt,
  faEdit,
  faFlagCheckered,
  faSlidersH,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Badge, CollaboratorFilter, LevelIcon, LevelList } from './components';
import {
  AccentText,
  BoldTitle,
  Card,
  DefaultText,
  DefaultTitle,
  EmptyState,
  GridLink,
  IconButton,
  InfoText,
  MainLayoutComponent,
  ProgressBar,
  AnimatedCounter,
  CollaboratorEdit,
  Loader,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import '../../../../helpers/StringHelper';
import api from '../../../../data/api/api';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as levelListActions from '../../../../services/Levels/LevelList/actions';
import * as currentCollaboratorBadgeSummaryListActions from '../../../../services/CollaboratorBadges/CurrentCollaboratorBadgeSummaryList/actions';
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions';
import * as userIdentifierDefinitionListActions from '../../../../services/Users/UserIdentifierDefinitionList/actions';

const styles = {
  iconMargin: {
    marginRight: 16,
  },
  levelTitle: {
    fontSize: 20,
    marginTop: 8,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  levelNumber: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
    lineHeight: 1,
  },
  levelPoints: {
    fontSize: 15,
    // fontWeight: 'bold',
    marginTop: 8,
    lineHeight: 1,
  },
  progressInfo: {
    fontSize: 15,
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'rgb(15,111,222)',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

class CollaboratorDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.id = null;
    this.year = null;
    this.buttonInitialized = false;
    this.state = {
      filterOpen: false,
      generalRank: {},
    };
  }

  refresh(id, year) {
    const teamId = this.props.match.params.teamId;
    var url = teamId
      ? `/teams/${teamId}/collaborators/${id}/detail`
      : `/collaborators/${id}/detail`;
    if (year) url += `?year=${year}`;
    this.props.history.replace(url);
  }

  loadData(props) {
    const id = props.match.params.id;
    const params = new URLSearchParams(window.location.search);
    const year = params.get('year');
    const { period } = props.currentPeriodDetail;
    if (id != this.id || year != this.year) {
      this.id = id;
      this.year = year;
      this.props.collaboratorDetailActions.getCollaboratorDetail(id, year, {
        noGeneralRank: true,
      });
      this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
      this.props.currentCollaboratorBadgeSummaryListActions.getCurrentCollaboratorBadgeSummaryList(
        id,
        year
      );
      this.setState({ ...this.state, generalRankInitialized: true }, () => {
        api.collaborators.generalRank(id, year).then((response) => {
          this.setState({ ...this.state, generalRank: response.data });
        });
      });
    }
    if (period && !this.state.levelsInitialized) {
      this.props.levelListActions.getLevelList(period.id);
      this.setState({ ...this.state, levelsInitialized: true });
    }
  }

  handleButtons() {
    const { intl } = this.props;
    const { collaborator } = this.props.collaboratorDetail;
    if (!this.buttonInitialized && collaborator) {
      const { account } = this.props.accountDetail;
      this.buttonInitialized = true;
      const teamIds = _.get(account, 'team.id')
        ? [_.get(account, 'team.id')]
        : _.get(account, 'team_group.allTeamIds');

      if (
        account.canUpdateCollaboratorPassword &&
        (account.role.code == 'A' ||
          ((account.role.code == 'M' || account.role.code == 'S') &&
            teamIds.indexOf(collaborator.team.id) >= 0))
      ) {
        const { classes } = this.props;
        this.props.handleButtons(
          <div>
            <Tooltip
              title={intl.formatMessage({
                id: 'collaborator.detail.password_button',
              })}
            >
              <IconButton
                size='small'
                onClick={this.handleEditCollaborator.bind(this)}
                classes={{ root: classes.iconMargin }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </IconButton>
            </Tooltip>
            <Tooltip title={intl.formatMessage({ id: 'filter.submit_button' })}>
              <IconButton
                size='small'
                onClick={this.handleFilterOpen.bind(this)}
              >
                <FontAwesomeIcon icon={faSlidersH} />
              </IconButton>
            </Tooltip>
          </div>
        );
      } else {
        this.props.handleButtons(
          <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
            <FontAwesomeIcon icon={faSlidersH} />
          </IconButton>
        );
      }
    } else {
      this.props.handleButtons(
        <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
          <FontAwesomeIcon icon={faSlidersH} />
        </IconButton>
      );
    }
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

  handleLevelListOpen = (value) => {
    this.setState({
      ...this.state,
      levelListOpen: value,
    });
  };

  handleFilterChange(collaborator, year) {
    const collaboratorId =
      this.props.accountDetail.account.role.code == 'C'
        ? this.id
        : collaborator;
    this.refresh(collaboratorId, year);
  }

  handleEditCollaborator = () => {
    this.props.history.push(`/collaborators/${this.id}/edit`);
  };

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'collaborator.title' }));
    this.props.handleSubHeader(<SubHeader />);
    this.props.handleMaxWidth('md');
    if (_.get(this.props, 'match.params.teamId')) {
      this.props.activateReturn();
    }
    this.handleButtons();
    this.props.userIdentifierDefinitionListActions.getUserIdentifierDefinitionList();
    this.loadData(this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { collaborator } = this.props.collaboratorDetail;
    this.loadData(this.props);
    if (!this.buttonInitialized && collaborator) {
      this.handleButtons();
    }
  }

  renderEmptyState() {
    const { intl } = this.props;
    return (
      <EmptyState
        title={intl.formatMessage({
          id: 'collaborator.detail.empty_state_title',
        })}
      />
    );
  }

  renderData() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    const { configs } = this.props.configList;
    const { badges } = this.props.currentCollaboratorBadgeSummaryList;
    const { collaborator } = this.props.collaboratorDetail;
    const { levels } = this.props.levelList;
    const { definitions } = this.props.userIdentifierList;

    const generalRankLoaded = !_.isEmpty(this.state.generalRank);

    const levelPoints =
      this.state.generalRank.points - collaborator.level.points;
    const levelProgression = collaborator.nextLevel
      ? Math.round(
          (levelPoints /
            (collaborator.nextLevel.points - collaborator.level.points)) *
            100
        )
      : 100;
    const nextLevelInfo = collaborator.nextLevel
      ? intl
          .formatMessage({ id: 'collaborator.detail.info_next_level' })
          .format(collaborator.nextLevel.number, collaborator.nextLevel.points)
      : intl.formatMessage({ id: 'collaborator.detail.info_max_level' });
    const { classes } = this.props;

    // Badge activated for collaborators or not

    const CBAR = configs.filter((c) => c.code === 'CBAR')[0];
    const readableIdentifierDefinition = definitions.filter(
      (definition) => definition.player_readable
    )[0];

    const readableIdentifier = _.get(collaborator, 'identifiers', []).filter(
      (identifier) =>
        readableIdentifierDefinition &&
        _.get(identifier, 'definition.id') === readableIdentifierDefinition.id
    )[0];

    const currentLevel = levels?.find(
      (level) => level.number === this.state.generalRank.level
    );

    return (
      <div>
        <Grid container spacing={2} style={{ marginTop: 8 }}>
          {readableIdentifier && (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <BoldTitle align='center'>
                    {readableIdentifier.definition.name}
                  </BoldTitle>
                </Grid>
                <Grid item xs={12}>
                  <BoldTitle align='center'>
                    {readableIdentifier.value}
                  </BoldTitle>
                </Grid>
              </Grid>
            </Grid>
          )}
          {collaborator.citation && (
            <Grid item xs={12}>
              <InfoText isContrast align='center'>
                « {collaborator.citation} »
              </InfoText>
            </Grid>
          )}
          <Grid item container spacing={1} xs={12}>
            <Grid item align='center' xs={12}>
              {currentLevel?.icon?.path && (
                <LevelIcon
                  image={currentLevel?.icon?.path}
                  collaborator={collaborator}
                />
              )}

              {currentLevel?.title && (
                <Grid item>
                  <InfoText isContrast className={classes.levelTitle}>
                    {currentLevel?.title}
                  </InfoText>
                </Grid>
              )}
              {_.get(collaborator, 'level.citation') && (
                <Grid item>
                  <InfoText align='center'>
                    « {collaborator.level.citation} »
                  </InfoText>
                </Grid>
              )}
              {!generalRankLoaded && <Loader />}
              {_.get(this.state, 'generalRank.level') && (
                <Grid item container justifyContent='center'>
                  <Grid
                    item
                    style={{ position: 'relative', overflow: 'visible' }}
                  >
                    <AccentText className={classes.levelNumber}>
                      {intl
                        .formatMessage({ id: 'menu.level_label' })
                        .format(this.state.generalRank.level)}
                    </AccentText>
                  </Grid>
                </Grid>
              )}

              {generalRankLoaded && (
                <Grid item>
                  <DefaultText
                    isContrast
                    className={classes.levelPoints.toLocaleString()}
                  >
                    <FontAwesomeIcon icon={faFireAlt} />{' '}
                    {intl
                      .formatMessage({
                        id: 'collaborator.detail.info_total_points',
                      })
                      .format(this.state.generalRank.points.toLocaleString())}
                  </DefaultText>
                </Grid>
              )}
            </Grid>

            <Grid item xs={12}>
              <Card>
                {!generalRankLoaded && <Loader centered />}
                {generalRankLoaded && (
                  <Grid container spacing={1}>
                    <Grid container item spacing={1} xs={12}>
                      <Grid item container xs={12}>
                        <Grid item xs>
                          <DefaultText className={classes.progressInfo}>
                            {collaborator.nextLevel && (
                              <React.Fragment>
                                <AnimatedCounter
                                  counter={levelPoints}
                                  timer={750}
                                  resource={intl.formatMessage({
                                    id: 'collaborator.detail.info_current_level',
                                  })}
                                />
                                <InfoText
                                  className={classes.progressInfo}
                                  component='span'
                                >
                                  {intl
                                    .formatMessage({
                                      id: 'collaborator.detail.info_current_level_max',
                                    })
                                    .format(
                                      (
                                        collaborator.nextLevel.points -
                                        collaborator.level.points
                                      ).toLocaleString()
                                    )}
                                </InfoText>
                              </React.Fragment>
                            )}
                          </DefaultText>
                        </Grid>
                        <Grid item>
                          <AccentText className={classes.progressInfo}>
                            {nextLevelInfo}
                          </AccentText>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <ProgressBar value={levelProgression} animate />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      spacing={1}
                      xs={12}
                      className={classes.progressWrapper}
                    >
                      {generalRankLoaded && (
                        <>
                          {account.hasGeneralRankAccess &&
                            this.state.generalRank.rank && (
                              <Grid item>
                                <DefaultText>
                                  <FontAwesomeIcon icon={faFlagCheckered} />{' '}
                                  {this.state.generalRank.rank == 1
                                    ? intl
                                        .formatMessage({
                                          id: 'collaborator.detail.info_first_rank_text',
                                        })
                                        .format(this.state.generalRank.rank)
                                    : intl
                                        .formatMessage({
                                          id: 'collaborator.detail.info_other_rank_text',
                                        })
                                        .format(
                                          this.state.generalRank.rank
                                        )}{' '}
                                  <InfoText component='span'>
                                    / {collaborator.collaborators}
                                  </InfoText>
                                </DefaultText>
                              </Grid>
                            )}
                          <Grid item xs>
                            <DefaultText>
                              <FontAwesomeIcon icon={faStar} />{' '}
                              {intl
                                .formatMessage({
                                  id: 'collaborator.detail.info_victories',
                                })
                                .format(this.state.generalRank.victories)}
                            </DefaultText>
                          </Grid>
                        </>
                      )}
                      <Grid item>
                        <span onClick={() => this.handleLevelListOpen(true)}>
                          <DefaultText lowercase className={classes.link}>
                            {intl.formatMessage({ id: 'levels.list_title' })}
                          </DefaultText>
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Card>
            </Grid>
          </Grid>
          {_.get(CBAR, 'value', 'true') === 'true' && (
            <Grid item container spacing={1} xs={12}>
              <Grid spacing={1} item xs={12}>
                <DefaultTitle isContrast>
                  {account.badgeWording ||
                    intl.formatMessage({
                      id: 'collaborator.detail.badge_area',
                    })}
                </DefaultTitle>
              </Grid>
              <Grid spacing={1} item xs={12}>
                <Card>
                  {badges.length > 0 && (
                    <Grid container spacing={2}>
                      {badges.map((badge) => {
                        return (
                          <GridLink
                            key={badge.id}
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            component={Link}
                            to={`/badges/detail/${badge.levelId}`}
                          >
                            <Badge badge={badge} />
                          </GridLink>
                        );
                      })}
                    </Grid>
                  )}
                  {badges.length == 0 && (
                    <DefaultText lowercase>
                      {intl.formatMessage({
                        id: 'collaborator.badge_empty_title',
                      })}
                    </DefaultText>
                  )}
                </Card>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }

  render() {
    const { badges, loading: currentCollaboratorBadgeSummaryListLoading } =
      this.props.currentCollaboratorBadgeSummaryList;
    const { collaborator, loading: collaboratorDetailLoading } =
      this.props.collaboratorDetail;
    const { configs, loading: configLoading, hasError } = this.props.configList;
    const { levels } = this.props.levelList;
    const { definitions, loading: userIdentifierListLoading } =
      this.props.userIdentifierList;

    const loading =
      currentCollaboratorBadgeSummaryListLoading ||
      collaboratorDetailLoading ||
      configLoading ||
      userIdentifierListLoading ||
      hasError;
    const teamId =
      collaborator && collaborator.team ? collaborator.team.id : null;
    const collaboratorId = collaborator ? collaborator.id : null;

    return (
      <div>
        {!loading &&
          badges &&
          collaborator &&
          definitions &&
          this.state.generalRank &&
          this.renderData()}
        {!loading &&
          badges &&
          collaborator &&
          !this.state.generalRank &&
          this.renderEmptyState()}
        {this.state.filterOpen && (
          <CollaboratorFilter
            open={this.state.filterOpen}
            onClose={this.handleFilterClose.bind(this)}
            onChange={this.handleFilterChange.bind(this)}
            team={teamId}
            collaborator={collaboratorId}
            year={this.year}
          />
        )}
        {levels && (
          <LevelList
            open={this.state.levelListOpen}
            setOpen={this.handleLevelListOpen}
            levels={levels}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  configList,
  currentCollaboratorBadgeSummaryList,
  collaboratorDetail,
  levelList,
  currentPeriodDetail,
  userIdentifierList,
}) => ({
  accountDetail,
  configList,
  currentPeriodDetail,
  levelList,
  currentCollaboratorBadgeSummaryList,
  collaboratorDetail,
  userIdentifierList,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  levelListActions: bindActionCreators(levelListActions, dispatch),
  currentPeriodDetailActions: bindActionCreators(
    currentPeriodDetailActions,
    dispatch
  ),
  currentCollaboratorBadgeSummaryListActions: bindActionCreators(
    currentCollaboratorBadgeSummaryListActions,
    dispatch
  ),
  collaboratorDetailActions: bindActionCreators(
    collaboratorDetailActions,
    dispatch
  ),
  userIdentifierDefinitionListActions: bindActionCreators(
    userIdentifierDefinitionListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(CollaboratorDetail)));
