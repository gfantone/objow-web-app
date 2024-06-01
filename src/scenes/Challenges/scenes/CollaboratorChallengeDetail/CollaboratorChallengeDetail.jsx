import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Grid,
  CardMedia,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSlidersH,
  faShare,
  faLink,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { SubHeader } from './components';
import {
  ChallengeCondition,
  ChallengeConditionJti,
  CollaboratorChallengeRankList,
  ChallengeDetailFilter,
  ChallengeCollaboratorFilter,
  CollaboratorChallengeCurrentRank,
  ChallengeSearchBar,
} from '../../components';
import {
  SubHeaderContainer,
  HeaderTitle,
  MainContainer,
} from '../../../../components/Common/components/MainLayout/components/MainLayout/components/';
import {
  MainLayoutComponent,
  IconButton,
  Loader,
  DefaultText,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CollaboratorFilterAndSearchBar,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import * as collaboratorChallengeDetailActions from '../../../../services/CollaboratorChallenges/CollaboratorChallengeDetail/actions';
import * as collaboratorChallengeGoalListActions from '../../../../services/CollaboratorChallengeGoals/CollaboratorChallengeGoalList/actions';
import * as collaboratorChallengeRankListActions from '../../../../services/CollaboratorChallengeRanks/CollaboratorChallengeRankList/actions';
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions';
import * as challengeSummaryActions from '../../../../services/Challanges/ChallengeSummary/actions';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const styles = (theme) => {
  return {
    wrapper: {
      height: 'calc(100vh - 65px)',
      marginTop: 0,
      overflowY: 'overlay',

      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(199, 199, 199, 0)',
        borderRadius: 5,
      },

      '&::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0)',
      },
      '&::-webkit-scrollbar': {
        '-webkit-appearance': 'none',
        '&:vertical': {
          width: 10,
        },
      },
    },
    activeScroll: {
      '&:hover': {
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(199, 199, 199, 1)',
          borderRadius: 5,
        },
      },
    },
    subheaderRoot: {
      background: 'transparent',
    },
    subheaderContainer: {
      zIndex: 500,
      paddingTop: 0,
    },
    subheaderContainerMobile: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    subheaderContainerChild: {
      marginBottom: 20,
    },
    shareButton: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '15px 10px',
      cursor: 'pointer',
      transition: 'all ease-in 0.1s',
      '&:hover': {
        background: '#efefef',
        border: '1px solid #333',
      },
    },
    shareDialog: {
      width: 600,
    },
    activeColorSecondary: {
      background: theme.palette.secondary.main,
      boxShadow: `0 2px 16px 0 ${theme.palette.secondary.main}`,
    },
  };
};

class CollaboratorChallengeDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    const { account } = this.props.accountDetail;
    this.initialized = false;
    this.observer = new IntersectionObserver(this.handleObserver);
    this.rankLoader = React.createRef();
    const params = new URLSearchParams(window.location.search);
    const teamGroup = params.get('teamGroup');
    const team = params.get('team');
    const name = params.get('name');
    this.tableRef = React.createRef();
    this.teamsShareButton = React.createRef();
    this.state = {
      page: account.hasChallengeRankAccess ? 0 : 1,
      rankPage: 1,
      ranks: null,
      ranksLoaded: false,
      filter: {},
      teamGroup,
      team,
      name,
    };
  }

  // infinite scroll
  handleObserver = () => {
    const { loading, ranks: fetchedRanks } =
      this.props.collaboratorChallengeRankList;
    const hasNextRankPage =
      this.state.ranksLoaded && fetchedRanks && fetchedRanks.results.length > 0;
    if (hasNextRankPage) {
      this.loadNextRankPage();
    }
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

  handlePageChange(page) {
    this.setState(
      {
        ...this.state,
        page: page,
      },
      () => {
        const scrollContainer = document.getElementById('challenge-scroll');
        window.scrollTo(0, 0);
        if (scrollContainer) {
          scrollContainer.scrollTo(0, 0);
        }
      }
    );
  }

  // challenge collaborator filter
  handleFilterChange = (
    team,
    collaborator,
    year,
    start,
    end,
    type,
    teamGroup
  ) => {
    const { challenge } = this.props.collaboratorChallengeDetail;
    this.setState(
      {
        ...this.state,
        filter: {
          collaborator,
          team,
          teamGroup,
        },
      },
      () => {
        this.props.challengeSummaryActions.getChallengeSummary(
          challenge.sourceId,
          collaborator,
          team,
          teamGroup
        );
      }
    );
  };

  refresh(team, teamGroup, search) {
    const id = this.props.match.params.id;
    var url = `/challenges/detail/collaborator/${id}`;
    if (team) {
      url += `?team=${team}`;
    } else if (teamGroup) {
      url += `?teamGroup=${teamGroup}`;
    }
    if (search) {
      url += `${team || teamGroup ? '&' : '?'}name=${search}`;
    }
    this.props.history.replace(url);
  }

  handleFilterDetailChange(team, teamGroup) {
    const params = new URLSearchParams(window.location.search);

    const name = params.get('name');
    this.props.collaboratorChallengeRankListActions.getCollaboratorChallengeRankListClear();
    this.setState(
      {
        ...this.state,
        rankPage: 1,
        ranks: null,
        ranksLoaded: false,
      },
      () => {
        this.refresh(team, teamGroup, name);
      }
    );
  }

  applySearch = (search) => {
    const params = new URLSearchParams(window.location.search);
    const team = params.get('team');
    const teamGroup = params.get('teamGroup');
    if (search !== this.state.name) {
      this.props.collaboratorChallengeRankListActions.getCollaboratorChallengeRankListClear();
      this.setState(
        {
          ...this.state,
          rankPage: 1,
          ranks: null,
          allRanks: null,
          ranksLoaded: false,
          name: search,
        },
        () => {
          this.refresh(team, teamGroup, search);
          this.loadNextRankPage();
        }
      );
    }
  };

  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    const id = this.props.match.params.id;

    this.props.handleTitle(
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' })
    );

    this.props.handleMaxWidth(false);
    this.props.activateReturn();

    const params = new URLSearchParams(window.location.search);
    const team = params.get('team');
    const teamGroup = params.get('teamGroup');
    const name = params.get('name');

    this.props.collaboratorChallengeDetailActions.getCollaboratorChallengeDetail(
      id
    );
    this.props.collaboratorChallengeGoalListActions.getCollaboratorChallengeGoalList(
      id
    );

    this.props.collaboratorChallengeRankListActions.getCollaboratorChallengeRankListByCollaboratorChallenge(
      id,
      null,
      team,
      teamGroup,
      name
    );
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (this.tableRef.current) {
      this.setState({
        ...this.state,
        tableRect: this.tableRef.current.getBoundingClientRect(),
      });
    }
  };

  applyFilter = () => {
    const { summary } = this.props.challengeSummary;
    const { collaborator, team, teamGroup } = this.state.filter;

    if (summary) {
      this.props.challengeSummaryActions.getChallengeSummaryClear();
      if (collaborator) {
        this.props.history.replace(
          `/challenges/detail/collaborator/${summary.id}`
        );
        window.location.reload();
      } else if (team) {
        if (summary.typeCode == 'CT') {
          this.props.history.replace(`/challenges/detail/team/${summary.id}`);
        } else {
          this.props.history.replace(
            `/challenges/detail/team-collaborator/${summary.id}`
          );
        }
      } else if (teamGroup) {
        if (summary.typeCode == 'CT') {
          this.props.history.replace(
            `/challenges/detail/team-group/${summary.id}`
          );
        } else {
          this.props.history.replace(
            `/challenges/detail/team-group-collaborator/${summary.id}`
          );
        }
      }
    }
  };

  setShareDropdownOpen = (value) => {
    this.setState({
      ...this.state,
      shareDropdownOpen: value,
      copiedToClipboard: false,
    });
  };

  setMobileMenuAnchor = (el) => {
    this.initialized = false;
    this.setState({
      ...this.state,
      mobileMenuAnchor: el,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.tableRect) {
      this.handleResize();
    }
    const id = this.props.match.params.id;
    const { classes, intl } = this.props;
    const { loading, ranks } = this.props.collaboratorChallengeRankList;
    const { challenge } = this.props.collaboratorChallengeDetail;
    const { collaborator, loading: collaboratorDetailLoading } =
      this.props.collaboratorDetail;
    const { account } = this.props.accountDetail;

    this.applyFilter();

    const params = new URLSearchParams(window.location.search);
    const currentTeam = params.get('team');
    const currentTeamGroup = params.get('teamGroup');
    const name = params.get('name');
    if (this.rankLoader.current) this.observer.observe(this.rankLoader.current);
    const mobileScreen = isWidthDown('xs', this.props.width);

    if (
      currentTeam !== this.state.team ||
      currentTeamGroup !== this.state.teamGroup
    ) {
      this.setState(
        {
          ...this.state,
          team: currentTeam,
          teamGroup: currentTeamGroup,
          rankPage: 1,
          ranks: null,
          allRanks: null,
          ranksLoaded: false,
          name,
        },
        () => {
          this.loadNextRankPage();
        }
      );
    } else {
      const team = currentTeam;
      if (ranks && !loading && !this.state.ranksLoaded) {
        const rankList = [
          ...(this.state.allRanks ? this.state.allRanks : []),
          ...ranks.results,
        ];
        const filteredRankList = rankList;
        const rankingIsFilled = filteredRankList.length >= 20;
        this.setState(
          {
            ...this.state,
            ranksLoaded: rankingIsFilled,
            rankPage: this.state.rankPage + 1,
            ranks: _.uniqBy(filteredRankList, (r) => r.id),
            currentRank: ranks.current_rank,
            allRanks: rankList,
          },
          () => {
            if (!rankingIsFilled) {
              this.loadNextRankPage();
            }
          }
        );
      }
    }

    if (
      challenge &&
      (!collaborator || collaborator.id !== challenge.collaboratorId) &&
      !collaboratorDetailLoading
    ) {
      this.props.collaboratorDetailActions.getCollaboratorDetail(
        challenge.collaboratorId
      );
    }

    if (!this.initialized && challenge) {
      this.initialized = true;
      const desktopMenu = (
        <Tooltip title={intl.formatMessage({ id: 'common.share' })}>
          <IconButton
            size={'small'}
            onClick={() => this.setShareDropdownOpen(true)}
            className={classes.iconMargin}
          >
            <FontAwesomeIcon icon={faShare} />
          </IconButton>
        </Tooltip>
      );
      const open = Boolean(this.state.mobileMenuAnchor);
      const arrowIcon = faCog;
      const mobileMenu = (
        <div>
          <IconButton
            aria-controls='basic-menu'
            aria-haspopup='true'
            size={'small'}
            onClick={(event) =>
              this.setMobileMenuAnchor(open ? null : event.currentTarget)
            }
            className={classes.iconMargin}
          >
            <FontAwesomeIcon icon={arrowIcon} />
          </IconButton>
          <Menu
            id='basic-menu'
            anchorEl={this.state.mobileMenuAnchor}
            open={open}
            onClose={() => this.setMobileMenuAnchor()}
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            style={{ marginTop: 30 }}
          >
            <MenuItem onClick={() => this.setShareDropdownOpen(true)}>
              <ListItemIcon
                style={{ color: '#333', minWidth: 0, marginRight: 10 }}
              >
                <FontAwesomeIcon icon={faShare} />
              </ListItemIcon>
              <ListItemText>
                {intl.formatMessage({ id: 'common.share' })}
              </ListItemText>
            </MenuItem>
          </Menu>
        </div>
      );
      if (!account.isJtiEnv) {
        this.props.handleButtons(mobileScreen ? mobileMenu : desktopMenu);
      }
    }

    if (document.getElementById('challenge-scroll')) {
      document
        .getElementById('challenge-scroll')
        .addEventListener('scroll', this.handleScroll);
    }
  }
  handleScroll = () => {
    const scroll =
      _.get(document.getElementById('challenge-scroll'), 'scrollTop') || 0;
    const scrollLimit = 45;
    if (scroll && scroll > scrollLimit && !this.state.displayScroll) {
      this.setState({
        ...this.state,
        displayScroll: true,
      });
    } else if (scroll <= scrollLimit && this.state.displayScroll) {
      this.setState({
        ...this.state,
        displayScroll: false,
      });
    }
  };
  loadNextRankPage = () => {
    const id = this.props.match.params.id;
    // load next rank page
    const params = new URLSearchParams(window.location.search);
    const team = params.get('team');
    const teamGroup = params.get('teamGroup');
    const name = params.get('name');
    this.props.collaboratorChallengeRankListActions.getCollaboratorChallengeRankListByCollaboratorChallenge(
      id,
      this.state.rankPage,
      team,
      teamGroup,
      name
    );
    this.setState({
      ...this.state,
      ranksLoaded: false,
    });
  };

  getShareText = () => {
    const { challenge } = this.props.collaboratorChallengeDetail;
    const today = new Date();
    let daysLeft = 0;
    if (challenge) {
      daysLeft = Math.floor(
        (challenge.end * 1000 - today.getTime()) / (1000 * 3600 * 24)
      );
    }
    return ``;
  };

  getClipboardText = () => {
    const { challenge } = this.props.collaboratorChallengeDetail;
    const { ranks } = this.state;
    const { intl } = this.props;

    const today = new Date();
    let daysLeft = 0;
    if (challenge) {
      daysLeft = Math.floor(
        (challenge.end * 1000 - today.getTime()) / (1000 * 3600 * 24)
      );
    }
    return (
      <div id='copy-clipboard'>
        <div style={{ backgroundColor: 'transparent' }}>
          <a href={`${window.location.origin}/challenges`}>
            {intl.formatMessage({ id: 'challenge.click_to_view_challenge' })}
          </a>
        </div>
      </div>
    );
  };

  copyWithStyle = (element) => {
    const doc = document;
    const text = doc.getElementById(element);
    let range;
    let selection;

    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElement(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();

      range = doc.createRange();
      range.selectNodeContents(text);

      selection.removeAllRanges();
      selection.addRange(range);
    }

    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  };

  copyToClipboard = () => {
    const { intl } = this.props;
    this.setState({
      ...this.state,
      copiedToClipboard: true,
    });
    this.copyWithStyle('copy-clipboard');
    toast.success(intl.formatMessage({ id: 'challenge.share.copy_success' }));
  };

  render() {
    const { classes, intl } = this.props;
    const { account } = this.props.accountDetail;
    const isJti = account.isJtiEnv;
    const { challenge } = this.props.collaboratorChallengeDetail;
    const { collaborator, loading: collaboratorDetailLoading } =
      this.props.collaboratorDetail;
    const { goals } = this.props.collaboratorChallengeGoalList;
    const { loading, ranks: fetchedRanks } =
      this.props.collaboratorChallengeRankList;
    const { configs, loading: configLoading } = this.props.configList;
    const { ranks } = this.state;
    const teamId =
      collaborator && collaborator.team ? collaborator.team.id : null;
    const collaboratorId = collaborator ? collaborator.id : null;
    if (!account.hasChallengeAccess) {
      return <Redirect to={'/'} />;
    }
    // Filter by team
    const params = new URLSearchParams(window.location.search);
    const team = params.get('team');
    const teamGroup = params.get('teamGroup');

    const hasNextRankPage =
      this.state.ranksLoaded && fetchedRanks && fetchedRanks.length > 0;

    const displayCollaboratorLevel =
      configs &&
      _.get(
        configs.filter((c) => c.code === 'CCL'),
        '[0].value'
      ).toBoolean();
    const displayCollaboratorDepartment =
      configs &&
      _.get(
        configs.filter((c) => c.code === 'CRLD'),
        '[0].value'
      ).toBoolean();
    const displayCollaboratorTeam =
      configs &&
      _.get(
        configs.filter((c) => c.code === 'CRLT'),
        '[0].value'
      ).toBoolean();

    const isMobile = isWidthDown('xs', this.props.width);
    const filteredRanks = ranks;

    const teams_icon = require('../../../../assets/img/system/layout/teams_icon.png');

    return (
      <div
        className={`${classes.wrapper} ${
          this.state.displayScroll ? classes.activeScroll : ''
        }`}
        id='challenge-scroll'
      >
        <div style={{ position: 'absolute', top: -500 }}>
          {this.getClipboardText()}
        </div>
        {challenge && (
          <span
            class='teams-share-button'
            style={{ display: 'none' }}
            ref={this.teamsShareButton}
            data-href={`${window.location.origin}/challenges`}
            data-msg-text={this.getShareText()}
          />
        )}
        {this.initialized && (
          <Helmet>
            <script
              async
              defer
              src='https://teams.microsoft.com/share/launcher.js'
            ></script>
          </Helmet>
        )}
        <div
          style={{
            height: 20,
            width: '100%',
            position: 'fixed',
            left: 0,
            top: 62,
            zIndex: 102,
          }}
          className={classes.activeColorSecondary}
        />
        <MainContainer maxWidth='md' style={{ paddingTop: 0 }}>
          <div style={{ zIndex: 100 }}>
            <SubHeaderContainer
              hideHeader
              childrenContainerClass={classes.subheaderContainerChild}
              containerClass={`${classes.subheaderContainer} ${
                isMobile ? classes.subheaderContainerMobile : ''
              }`}
              rootClass={classes.subheaderRoot}
            >
              <SubHeader
                onChange={this.handlePageChange.bind(this)}
                activateRank={account.hasChallengeRankAccess}
              />
            </SubHeaderContainer>
          </div>
          {challenge && this.state.page == 0 && (
            <Grid
              container
              spacing={1}
              justify='flex-start'
              style={{ marginBottom: 5, position: 'relative' }}
            >
              <Grid item>
                <ChallengeDetailFilter
                  open={this.state.filterOpen}
                  onClose={this.handleFilterClose.bind(this)}
                  onChange={this.handleFilterDetailChange.bind(this)}
                  team={team}
                  teamGroup={teamGroup}
                  myTeam={account.team}
                  scopeTeams={_.get(challenge, 'participantTeamIds')}
                />
              </Grid>
              <Grid
                item
                style={{ position: 'absolute', left: 90, top: 0, zIndex: 100 }}
              >
                <ChallengeSearchBar
                  search={this.state.name}
                  onChange={(value) => this.applySearch(value)}
                />
              </Grid>
              <Grid item style={{ position: 'absolute', right: 5, top: 5 }}>
                <DefaultText
                  isContrast
                  lowercase
                  style={{ lineHeight: 2.5, fontSize: 12 }}
                >
                  {ranks &&
                    filteredRanks.length < challenge.participants &&
                    (team || teamGroup) && (
                      <React.Fragment>
                        {filteredRanks.length} / {challenge.participants}{' '}
                        {intl.formatMessage({
                          id: 'transfer_list.participants',
                        })}
                      </React.Fragment>
                    )}
                  {ranks &&
                    filteredRanks.length === challenge.participants &&
                    !team &&
                    !teamGroup && (
                      <React.Fragment>
                        {challenge.participants}{' '}
                        {intl.formatMessage({
                          id: 'transfer_list.participants',
                        })}
                      </React.Fragment>
                    )}
                </DefaultText>
              </Grid>
            </Grid>
          )}
          {account.hasChallengeRankAccess &&
            this.state.page == 0 &&
            challenge &&
            ranks && (
              <React.Fragment>
                <div ref={this.tableRef}>
                  <CollaboratorChallengeRankList
                    displayCollaboratorLevel={displayCollaboratorLevel}
                    displayCollaboratorDepartment={
                      displayCollaboratorDepartment
                    }
                    displayCollaboratorTeam={displayCollaboratorTeam}
                    ranks={ranks}
                    collaboratorId={challenge.collaboratorId}
                  />
                </div>
                {this.state.currentRank && this.state.tableRect && (
                  <div
                    style={{
                      zIndex: 100,
                      position: 'fixed',
                      bottom: 0,
                      left: isMobile
                        ? 25
                        : `calc(${this.state.tableRect.left}px + ${
                            this.state.tableRect.width / 2
                          }px - 200px)`,
                      width: isMobile ? 'calc(100% - 50px)' : 350,
                      overflow: 'visible',
                    }}
                  >
                    <CollaboratorChallengeCurrentRank
                      rank={this.state.currentRank}
                      challenge={challenge}
                    />
                  </div>
                )}

                <div
                  ref={this.rankLoader}
                  style={{ width: '100%', height: 1, marginTop: 0 }}
                />
                {loading && (
                  <div style={{ marginTop: 10, marginBottom: 40, zIndex: 1 }}>
                    <Loader centered />
                  </div>
                )}
              </React.Fragment>
            )}
          {loading && !ranks && (
            <div style={{ marginTop: 10, marginBottom: 40, zIndex: 1 }}>
              <Loader centered />
            </div>
          )}
          {collaboratorId &&
            teamId &&
            challenge &&
            _.get(account, 'role.code') !== 'C' &&
            this.state.page == 1 && (
              <div style={{ marginBottom: 10 }}>
                <CollaboratorFilterAndSearchBar
                  open={this.state.filterOpen}
                  collaborator={collaboratorId}
                  team={teamId}
                  onClose={() => {}}
                  onChange={this.handleFilterChange}
                  scopeTeams={_.get(challenge, 'participantTeamIds')}
                  scopeCollaborators={_.get(challenge, 'participantIds')}
                />
              </div>
            )}
          {this.state.page == 1 && challenge && goals && !isJti && (
            <ChallengeCondition challenge={challenge} goals={goals} />
          )}
          {this.state.page == 1 && challenge && goals && isJti && (
            <ChallengeConditionJti challenge={challenge} goals={goals} />
          )}
          <Dialog
            classes={{ paper: classes.shareDialog }}
            open={this.state.shareDropdownOpen}
            onClose={() => this.setShareDropdownOpen(false)}
          >
            <DialogTitle>
              {intl.formatMessage({ id: 'challenge.share.title' })}
            </DialogTitle>
            <DialogContent>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <div
                    className={classes.shareButton}
                    onClick={() => this.teamsShareButton.current.click()}
                  >
                    <Grid container spacing={1}>
                      <Grid item>
                        <CardMedia
                          image={teams_icon}
                          style={{ width: 22, height: 20 }}
                        />
                      </Grid>
                      <Grid item>
                        <DefaultText lowercase>
                          {intl.formatMessage({
                            id: 'challenge.share.teams_share',
                          })}
                        </DefaultText>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item>
                  <div
                    className={classes.shareButton}
                    onClick={this.copyToClipboard}
                  >
                    <Grid
                      container
                      spacing={1}
                      style={{
                        color: this.state.copiedToClipboard
                          ? '#00E58D'
                          : '#333',
                      }}
                    >
                      <Grid item style={{ marginLeft: 4, marginRight: 4 }}>
                        <FontAwesomeIcon icon={faLink} />
                      </Grid>
                      <Grid item>
                        <DefaultText
                          style={{
                            color: this.state.copiedToClipboard
                              ? '#00E58D'
                              : '#333',
                          }}
                          lowercase
                        >
                          {intl.formatMessage({
                            id: 'challenge.share.copy_link',
                          })}
                        </DefaultText>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </MainContainer>
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  configList,
  collaboratorDetail,
  collaboratorChallengeDetail,
  collaboratorChallengeGoalList,
  collaboratorChallengeRankList,
  challengeSummary,
}) => ({
  accountDetail,
  configList,
  collaboratorDetail,
  collaboratorChallengeDetail,
  collaboratorChallengeGoalList,
  collaboratorChallengeRankList,
  challengeSummary,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  collaboratorDetailActions: bindActionCreators(
    collaboratorDetailActions,
    dispatch
  ),
  collaboratorChallengeDetailActions: bindActionCreators(
    collaboratorChallengeDetailActions,
    dispatch
  ),
  collaboratorChallengeGoalListActions: bindActionCreators(
    collaboratorChallengeGoalListActions,
    dispatch
  ),
  collaboratorChallengeRankListActions: bindActionCreators(
    collaboratorChallengeRankListActions,
    dispatch
  ),
  challengeSummaryActions: bindActionCreators(
    challengeSummaryActions,
    dispatch
  ),
});

export default withWidth()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(withStyles(styles)(CollaboratorChallengeDetail)))
);
