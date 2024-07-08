import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { SubHeader } from './components';
import '../../../../helpers/DateHelper';
import {
  ChallengeCondition,
  ChallengeConditionJti,
  TeamChallengeRankList,
  ChallengeCollaboratorFilter,
  ChallengeSearchBar,
  ChallengeDetailFilter,
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
  Loader,
  DefaultText,
} from '../../../../components';
import { ChallengeParticipantsEdit } from '../../components/ChallengeParticipantsEdit';
import {
  SubHeaderContainer,
  HeaderTitle,
  MainContainer,
} from '../../../../components/Common/components/MainLayout/components/MainLayout/components/';
import {
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Grid,
  CardMedia,
} from '@material-ui/core';
import { injectIntl } from 'react-intl';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import * as teamChallengeDetailActions from '../../../../services/TeamChallenges/TeamChallengeDetail/actions';
import * as teamChallengeGoalListActions from '../../../../services/TeamChallengeGoals/TeamChallengeGoalList/actions';
import * as teamChallengeRankListAction from '../../../../services/TeamChallengeRanks/TeamChallengeRankList/actions';
import * as challengeDeleteActions from '../../../../services/Challanges/ChallengeDelete/actions';
import * as challengeSummaryActions from '../../../../services/Challanges/ChallengeSummary/actions';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faEdit,
  faTrash,
  faChevronDown,
  faChevronUp,
  faShare,
  faLink,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const styles = (theme) => {
  return {
    iconMargin: {
      marginLeft: 16,
    },
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
      // marginTop: -30,
      marginBottom: 20,
      // position: 'absolute',
      // top: 43,
      // left: '50%'

      // background: 'transparent',
    },
    shareButton: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '15px 10px',
      cursor: 'pointer',
      transition: 'all ease-in 0.1s',
      '&:hover': {
        // border: "1px solid #00E58D"
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

class TeamChallengeDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    const { account } = this.props.accountDetail;
    const params = new URLSearchParams(window.location.search);
    const teamGroup = params.get('teamGroup');
    const name = params.get('name');
    this.initialized = false;
    this.observer = new IntersectionObserver(this.handleObserver);
    this.rankLoader = React.createRef();
    this.teamsShareButton = React.createRef();
    this.state = {
      page: account.hasChallengeRankAccess && account.hasTeamRankAccess ? 0 : 1,
      rankPage: 1,
      ranks: null,
      ranksLoaded: false,
      mobileMenuAnchor: null,
      name,
      teamGroup: teamGroup,
      filter: {},
    };
  }

  // infinite scroll
  handleObserver = () => {
    const { loading, ranks: fetchedRanks } = this.props.teamChallengeRankList;
    const hasNextRankPage =
      this.state.ranksLoaded && fetchedRanks && fetchedRanks.length > 0;
    if (hasNextRankPage) {
      this.loadNextRankPage();
    }
  };

  handleDuplicate() {
    const { challenge } = this.props.teamChallengeDetail;
    this.props.history.push(`/challenges/duplication/${challenge.sourceId}`);
  }

  handleEdit() {
    const { challenge } = this.props.teamChallengeDetail;
    this.props.history.push(`/challenges/modification/${challenge.sourceId}`);
  }

  handleEditParticipants = (value = true) => {
    this.setState({
      ...this.state,
      editParticipantsOpen: value,
    });
  };

  handleEditParticipantsSubmit = () => {
    this.setState(
      {
        ...this.state,
        editParticipantsOpen: false,
      },
      () => {
        this.applySearch();
      }
    );
  };

  async onDelete() {
    const { challenge } = this.props.teamChallengeDetail;
    const { intl } = this.props;

    await this.props.challengeDeleteActions.deleteChallenge(challenge);
    toast.success(intl.formatMessage({ id: 'challenge.delete_success' }));
    setTimeout(() => {
      this.props.history.goBack();
    }, 200);
  }
  setDeletePromptOpen(isOpen) {
    this.setState({
      ...this.state,
      deletePromptOpen: isOpen,
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

  handleFilterClose() {
    this.setState({
      ...this.state,
      filterOpen: false,
    });
  }

  refresh(teamGroup, search) {
    const id = this.props.match.params.id;
    var url = `/challenges/detail/team/${id}`;
    if (teamGroup) {
      url += `?teamGroup=${teamGroup}`;
    }
    if (search) {
      url += `${teamGroup ? '&' : '?'}name=${search}`;
    }
    this.props.history.replace(url);
  }

  handleFilterDetailChange(team, teamGroup) {
    this.props.teamChallengeRankListAction.getTeamChallengeRankListClear();
    this.setState(
      {
        ...this.state,
        rankPage: 1,
        ranks: null,
        ranksLoaded: false,
      },
      () => {
        this.refresh(teamGroup);
      }
    );
  }

  applySearch(search) {
    const params = new URLSearchParams(window.location.search);
    const teamGroup = params.get('teamGroup');
    if (search !== this.state.name) {
      this.props.teamChallengeRankListAction.getTeamChallengeRankListClear();
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
          this.refresh(teamGroup, search);
          this.loadNextRankPage();
        }
      );
      // const { summary } = this.props.challengeSummary;
      // const { collaborator, team, teamGroup, search } = this.state.filter
    }
  }

  setMobileMenuAnchor = (el) => {
    this.initialized = false;
    this.setState({
      ...this.state,
      mobileMenuAnchor: el,
    });
  };

  handleResize = () => {
    if (this.mobileScreen !== this.props.width) {
      this.initialized = false;
      this.mobileScreen = this.props.width;
    }
  };

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
    const { challenge } = this.props.teamChallengeDetail;
    // console.log(teamGroup, team, collaborator);
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

  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    const id = this.props.match.params.id;

    this.props.handleTitle(
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' })
    );
    // this.props.handleSubHeader(
    //   <div style={{height: 22}} />
    // );
    this.props.handleMaxWidth(false);
    this.props.activateReturn();

    const params = new URLSearchParams(window.location.search);
    const teamGroup = params.get('teamGroup');
    const name = params.get('name');

    this.props.teamChallengeDetailActions.getTeamChallengeDetail(id);
    this.props.teamChallengeGoalListActions.getTeamChallengeGoalList(id);
    this.props.teamChallengeRankListAction.getTeamChallengeRankList(
      id,
      teamGroup,
      name
    );
    window.addEventListener('resize', this.handleResize);
    this.mobileScreen = this.props.width;
  }

  applyFilter = () => {
    const { summary } = this.props.challengeSummary;
    const { collaborator, team, teamGroup } = this.state.filter;

    if (summary) {
      this.props.challengeSummaryActions.getChallengeSummaryClear();
      if (collaborator) {
        this.props.history.replace(`/challenges/detail/team/${summary.id}`);
      } else if (team) {
        this.props.history.replace(`/challenges/detail/team/${summary.id}`);
        window.location.reload();
      } else if (teamGroup) {
        this.props.history.replace(
          `/challenges/detail/team-group/${summary.id}`
        );
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { intl } = this.props;
    const { challenge } = this.props.teamChallengeDetail;
    const id = this.props.match.params.id;
    const { loading, ranks } = this.props.teamChallengeRankList;
    const mobileScreen = isWidthDown('xs', this.props.width);

    const params = new URLSearchParams(window.location.search);
    const currentTeamGroup = params.get('teamGroup');
    const name = params.get('name');

    this.applyFilter();

    if (this.rankLoader.current) this.observer.observe(this.rankLoader.current);
    if (ranks && !loading && !this.state.ranksLoaded) {
      this.setState({
        ...this.state,
        ranksLoaded: true,
        rankPage: this.state.rankPage + 1,
        ranks: [...(this.state.ranks ? this.state.ranks : []), ...ranks],
      });
    }

    if (currentTeamGroup !== this.state.teamGroup) {
      // const filteredRankList = this.state.allRanks.filter(rank =>
      //   (!currentTeam || _.get(rank, 'collaborator.team.id') === parseInt(currentTeam)) &&
      //   (!currentTeamGroup || _.get(rank, 'collaborator.team.parent.id') === parseInt(currentTeamGroup))
      // )
      this.setState(
        {
          ...this.state,
          teamGroup: currentTeamGroup,
          rankPage: 1,
          ranks: null,
          allRanks: null,
          ranksLoaded: false,
          name,
        },
        this.loadNextRankPage
      );
    }

    if (!this.initialized && challenge) {
      const { account } = this.props.accountDetail;
      const { classes } = this.props;
      const currentType = _.get(challenge, 'typeCode');
      this.initialized = true;

      const teamIds = _.get(account, 'team.id')
        ? [_.get(account, 'team.id')]
        : _.get(account, 'team_group.allTeamIds');

      const hasExclusiveManagerTeams =
        _.intersection(teamIds, challenge.participantTeamIds).length ===
        challenge.participantTeamIds.length;
      const hasPartialManagerTeams =
        _.intersection(teamIds, challenge.participantTeamIds).length > 0;

      const canEdit =
        (account.hasManagerChallengeEditAccess && hasExclusiveManagerTeams) ||
<<<<<<< HEAD
        account.role.code === 'A';
=======
        account.role.code === 'A' ||
        (challenge.typeCode === 'TP' && account.role.code === 'S');
>>>>>>> dev
      const canEditParticipants =
        (account.hasManagerChallengeParticipantEditAccess &&
          hasPartialManagerTeams) ||
        account.role.code === 'A';

      // && currentType !== 'TP'
      const desktopMenu = (
        <div>
          {canEdit && currentType !== 'TP' && (
            <Tooltip title={intl.formatMessage({ id: 'common.duplicate' })}>
              <IconButton
                size={'small'}
                onClick={this.handleDuplicate.bind(this)}
              >
                <FontAwesomeIcon icon={faCopy} />
              </IconButton>
            </Tooltip>
          )}
          {canEdit &&
            challenge.end.toDate2().getTime() > new Date().getTime() && (
              <React.Fragment>
                <Tooltip title={intl.formatMessage({ id: 'common.delete' })}>
                  <IconButton
                    size={'small'}
                    onClick={() => this.setDeletePromptOpen(true)}
                    className={classes.iconMargin}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={intl.formatMessage({ id: 'common.edit' })}>
                  <IconButton
                    size={'small'}
                    onClick={this.handleEdit.bind(this)}
                    className={classes.iconMargin}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </Tooltip>
              </React.Fragment>
            )}
<<<<<<< HEAD
          {canEditParticipants && currentType !== 'TP' &&
=======
          {canEditParticipants &&
            currentType !== 'TP' &&
>>>>>>> dev
            challenge.end.toDate2().getTime() > new Date().getTime() && (
              <Tooltip
                title={intl.formatMessage({ id: 'common.edit_participants' })}
              >
                <IconButton
                  size={'small'}
                  onClick={this.handleEditParticipants}
                  className={classes.iconMargin}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                </IconButton>
              </Tooltip>
            )}
          <Tooltip title={intl.formatMessage({ id: 'common.share' })}>
            <IconButton
              size={'small'}
              onClick={() => this.setShareDropdownOpen(true)}
              className={classes.iconMargin}
            >
              <FontAwesomeIcon icon={faShare} />
            </IconButton>
          </Tooltip>
        </div>
      );
      const open = Boolean(this.state.mobileMenuAnchor);
      const arrowIcon = open ? faChevronUp : faChevronDown;
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
            {canEdit && currentType !== 'TP' && (
              <MenuItem onClick={this.handleDuplicate.bind(this)}>
                <ListItemIcon
                  style={{ color: '#333', minWidth: 0, marginRight: 10 }}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </ListItemIcon>
                <ListItemText>
                  {intl.formatMessage({ id: 'common.duplicate' })}
                </ListItemText>
              </MenuItem>
            )}
            {canEdit &&
              challenge.end.toDate2().getTime() > new Date().getTime() && (
                <React.Fragment>
                  <MenuItem onClick={() => this.setDeletePromptOpen(true)}>
                    <ListItemIcon
                      style={{ color: '#333', minWidth: 0, marginRight: 10 }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </ListItemIcon>
                    <ListItemText>
                      {intl.formatMessage({ id: 'common.delete' })}
                    </ListItemText>
                  </MenuItem>
                  <MenuItem onClick={this.handleEdit.bind(this)}>
                    <ListItemIcon
                      style={{ color: '#333', minWidth: 0, marginRight: 10 }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </ListItemIcon>
                    <ListItemText>
                      {intl.formatMessage({ id: 'common.edit' })}
                    </ListItemText>
                  </MenuItem>
                </React.Fragment>
              )}
<<<<<<< HEAD
            {canEditParticipants && currentType !== 'TP' &&
=======
            {canEditParticipants &&
              currentType !== 'TP' &&
>>>>>>> dev
              challenge.end.toDate2().getTime() > new Date().getTime() && (
                <MenuItem onClick={this.handleEditParticipants}>
                  <ListItemIcon
                    style={{ color: '#333', minWidth: 0, marginRight: 10 }}
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                  </ListItemIcon>
                  <ListItemText>
                    {intl.formatMessage({ id: 'common.edit_participants' })}
                  </ListItemText>
                </MenuItem>
              )}
          </Menu>
        </div>
      );
      this.props.handleButtons(mobileScreen ? mobileMenu : desktopMenu);
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

    const params = new URLSearchParams(window.location.search);
    const teamGroup = params.get('teamGroup');
    const name = params.get('name');
    // Load next rank page
    this.props.teamChallengeRankListAction.getTeamChallengeRankList(
      id,
      this.state.rankPage,
      teamGroup,
      name
    );
    this.setState({
      ...this.state,
      ranksLoaded: false,
    });
  };

  getShareText = () => {
    const { challenge } = this.props.teamChallengeDetail;
    const today = new Date();
    let daysLeft = 0;
    if (challenge) {
      daysLeft = Math.floor(
        (challenge.end * 1000 - today.getTime()) / (1000 * 3600 * 24)
      );
    }
    return `N’oubliez pas de consulter le challenge « ${
      challenge && challenge.name
    } » dans Fire Tiger, J-${daysLeft} avant la fin !`;
  };
  getClipboardText = () => {
    const { challenge } = this.props.teamChallengeDetail;
    const { intl } = this.props;
    const { ranks } = this.state;
    const today = new Date();
    let daysLeft = 0;
    if (challenge) {
      daysLeft = Math.floor(
        (challenge.end * 1000 - today.getTime()) / (1000 * 3600 * 24)
      );
    }
    return (
      <div id='copy-clipboard'>
        <div>
          <b>
            N’oubliez pas de consulter le challenge «{' '}
            {challenge && challenge.name} » dans Fire Tiger
          </b>
          <br />
          <br />
        </div>

        {daysLeft > 0 && (
          <div>
            ⏱️<b> J-{daysLeft} </b>avant la fin !
          </div>
        )}
        <div>
          <b>🔥 TOP 3 ACTUEL : </b>
          {ranks &&
            ranks
              .slice(0, 3)
              .reduce(
                (acc, rank, index) =>
                  `${acc}${index > 0 ? ' / ' : ''}${rank.team.name}`,
                ''
              )}
          <br />
          <br />
        </div>

        <div>
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
    const { account } = this.props.accountDetail;
    const isJti = account.isJtiEnv;
    const { classes } = this.props;
    const { challenge } = this.props.teamChallengeDetail;
    const { goals } = this.props.teamChallengeGoalList;
    const currentType = _.get(challenge, 'typeCode');
    const { loading, ranks: fetchedRanks } = this.props.teamChallengeRankList;
    const { ranks } = this.state;
    const { configs, loading: configLoading } = this.props.configList;
    const { intl } = this.props;

    const hasNextRankPage =
      this.state.ranksLoaded && fetchedRanks && fetchedRanks.length > 0;

    const displayCollaboratorDepartment =
      configs &&
      _.get(
        configs.filter((c) => c.code === 'CTRD'),
        '[0].value'
      ).toBoolean();

    if (!account.hasChallengeAccess) {
      return <Redirect to={'/'} />;
    }

    // Filter by team
    const params = new URLSearchParams(window.location.search);

    const teamGroup = params.get('teamGroup');

    const filteredRanks =
      ranks &&
      ranks.filter(
        (rank) =>
          !teamGroup || _.get(rank, 'team.parent.id') === parseInt(teamGroup)
      );
    const isMobile = isWidthDown('xs', this.props.width);

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
        {this.initialized && (
          <Helmet>
            <script
              async
              defer
              src='https://teams.microsoft.com/share/launcher.js'
            ></script>
          </Helmet>
        )}
        {challenge && (
          <span
            class='teams-share-button'
            style={{ display: 'none' }}
            ref={this.teamsShareButton}
            data-href='https://app.firetiger.fr/challenges'
            data-msg-text={this.getShareText()}
          />
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
                activateRank={
                  account.hasChallengeRankAccess && account.hasTeamRankAccess
                }
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
<<<<<<< HEAD
              { currentType !== 'TP' && (
=======
              {currentType !== 'TP' && (
>>>>>>> dev
                <Grid item>
                  <ChallengeDetailFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterDetailChange.bind(this)}
                    teamGroup={teamGroup}
                    myTeam={account.team}
                    scopeTeams={_.get(challenge, 'participantTeamIds')}
                    hideTeams
                  />
                </Grid>
              )}
<<<<<<< HEAD
              { currentType !== 'TP' && (
                <Grid
                  item
                  style={{ position: 'absolute', left: 90, top: 0, zIndex: 100 }}
=======
              {currentType !== 'TP' && (
                <Grid
                  item
                  style={{
                    position: 'absolute',
                    left: 90,
                    top: 0,
                    zIndex: 100,
                  }}
>>>>>>> dev
                >
                  <ChallengeSearchBar
                    search={this.state.name}
                    onChange={(value) => this.applySearch(value)}
                  />
                </Grid>
              )}
              <Grid item style={{ position: 'absolute', right: 5, top: 5 }}>
                <DefaultText
                  lowercase
                  style={{ lineHeight: 2.5, fontSize: 12 }}
                >
                  {ranks &&
                    filteredRanks.length < challenge.totalParticipants &&
                    teamGroup && (
                      <React.Fragment>
                        {filteredRanks.length} / {challenge.totalParticipants}{' '}
                        participants
                      </React.Fragment>
                    )}
                  {ranks &&
                    filteredRanks.length === challenge.totalParticipants &&
                    !teamGroup && (
                      <React.Fragment>
                        {challenge.totalParticipants} participants
                      </React.Fragment>
                    )}
                </DefaultText>
              </Grid>
            </Grid>
          )}
          {account.hasChallengeRankAccess &&
            account.hasTeamRankAccess &&
            this.state.page == 0 &&
            challenge &&
            ranks && (
              <React.Fragment>
                <TeamChallengeRankList
                  ranks={ranks}
                  teamId={challenge.teamId}
<<<<<<< HEAD
                  displayCollaboratorDepartment={displayCollaboratorDepartment}
=======
                  displayCollaboratorDepartment={
                    displayCollaboratorDepartment && challenge.typeCode !== 'TP'
                  }
>>>>>>> dev
                />
                <div
                  ref={this.rankLoader}
                  style={{ width: '100%', height: 1, marginTop: 20 }}
                />
                {loading && (
                  <div style={{ marginTop: 10 }}>
                    <Loader centered />
                  </div>
                )}
              </React.Fragment>
            )}
          {loading && !ranks && (
            <div style={{ marginTop: 10 }}>
              <Loader centered />
            </div>
          )}
          {this.state.page == 1 && _.get(challenge, 'teamId') && (
            <div style={{ marginBottom: 10 }}>
              <ChallengeCollaboratorFilter
                open={this.state.filterOpen}
                team={_.get(challenge, 'teamId')}
                onClose={() => {}}
                onChange={this.handleFilterChange}
                disableCollaborators
                scopeTeams={_.get(challenge, 'participantTeamIds')}
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
            open={this.state.deletePromptOpen}
            onClose={() => this.setDeletePromptOpen(false)}
          >
            <DialogTitle>
              {intl.formatMessage({ id: 'challenge.delete_prompt' })}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => this.setDeletePromptOpen(false)}
                color='secondary'
              >
                {intl.formatMessage({ id: 'common.no' })}
              </Button>
              <ProgressButton
                type='button'
                text={intl.formatMessage({ id: 'common.yes' })}
                loading={loading}
                onClick={this.onDelete.bind(this)}
              />
            </DialogActions>
          </Dialog>
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
          {challenge && this.state.editParticipantsOpen && (
            <ChallengeParticipantsEdit
              challengeId={_.get(challenge, 'sourceId')}
              open={this.state.editParticipantsOpen}
              setOpen={this.handleEditParticipants}
              onSubmit={this.handleEditParticipantsSubmit}
            />
          )}
        </MainContainer>
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  teamChallengeDetail,
  teamChallengeGoalList,
  teamChallengeRankList,
  configList,
  challengeSummary,
}) => ({
  accountDetail,
  configList,
  teamChallengeDetail,
  teamChallengeGoalList,
  teamChallengeRankList,
  challengeSummary,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  teamChallengeDetailActions: bindActionCreators(
    teamChallengeDetailActions,
    dispatch
  ),
  teamChallengeGoalListActions: bindActionCreators(
    teamChallengeGoalListActions,
    dispatch
  ),
  teamChallengeRankListAction: bindActionCreators(
    teamChallengeRankListAction,
    dispatch
  ),
  challengeDeleteActions: bindActionCreators(challengeDeleteActions, dispatch),
  challengeSummaryActions: bindActionCreators(
    challengeSummaryActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withWidth()(injectIntl(TeamChallengeDetail))));
