import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { SubHeader } from './components';
import '../../../../helpers/DateHelper';
import {
  ChallengeCondition,
  TeamGroupChallengeRankList,
  ChallengeCollaboratorFilter,
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
  CollaboratorFilterAndSearchBar,
} from '../../../../components';
import {
  SubHeaderContainer,
  HeaderTitle,
  MainContainer,
} from '../../../../components/Common/components/MainLayout/components/MainLayout/components/';
import { ChallengeParticipantsEdit } from '../../components/ChallengeParticipantsEdit';
import {
  Grid,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  CardMedia,
} from '@material-ui/core';
import { useIntl, injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import * as teamGroupBasedChallengeDetailActions from '../../../../services/TeamGroupBasedChallenges/TeamGroupBasedChallengeDetail/actions';
import * as teamGroupBasedChallengeGoalListActions from '../../../../services/TeamGroupBasedChallengeGoals/TeamGroupBasedChallengeGoalList/actions';
import * as teamGroupBasedChallengeRankListAction from '../../../../services/TeamGroupBasedChallengeRanks/TeamGroupBasedChallengeRankList/actions';
import * as challengeDeleteActions from '../../../../services/Challanges/ChallengeDelete/actions';
import * as challengeSummaryActions from '../../../../services/Challanges/ChallengeSummary/actions';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faEdit,
  faSlidersH,
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

class TeamGroupBasedChallengeDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    const { account } = this.props.accountDetail;
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
      filter: {},
    };
  }

  // infinite scroll
  handleObserver = () => {
    const { loading, ranks: fetchedRanks } =
      this.props.teamGroupBasedChallengeRankList;
    const hasNextRankPage =
      this.state.ranksLoaded && fetchedRanks && fetchedRanks.length > 0;
    if (hasNextRankPage) {
      this.loadNextRankPage();
    }
  };

  handleDuplicate() {
    const { challenge } = this.props.teamGroupBasedChallengeDetail;
    this.props.history.push(`/challenges/duplication/${challenge.sourceId}`);
  }

  handleEdit() {
    const { challenge } = this.props.teamGroupBasedChallengeDetail;
    this.props.history.push(`/challenges/modification/${challenge.sourceId}`);
  }

  handleEditParticipants = (value = true) => {
    this.setState({
      ...this.state,
      editParticipantsOpen: value,
    });
  };

  handleEditParticipantsSubmit = () => {
    // window.location.reload();

    const id = this.props.match.params.id;
    this.props.teamGroupBasedChallengeRankListAction.getTeamGroupBasedChallengeRankListByTeamGroup(
      id
    );

    this.setState(
      {
        ...this.state,
        editParticipantsOpen: false,
        rankPage: 1,
        ranks: null,
        ranksLoaded: false,
        mobileMenuAnchor: null,
        filter: {},
      },
      () => {}
    );
  };

  async onDelete() {
    const { challenge } = this.props.teamGroupBasedChallengeDetail;
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
    const { challenge } = this.props.teamGroupBasedChallengeDetail;
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
    const { intl, classes } = this.props;
    const { account } = this.props.accountDetail;
    const id = this.props.match.params.id;

    this.props.handleTitle(
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' })
    );
    // this.props.handleSubHeader(
    //   <MainContainer maxWidth='xs'>
    //     <SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasChallengeRankAccess && account.hasTeamRankAccess} />
    //   </MainContainer>
    // );
    this.props.handleMaxWidth(false);
    this.props.activateReturn();
    this.props.teamGroupBasedChallengeDetailActions.getTeamGroupBasedChallengeDetail(
      id
    );
    this.props.teamGroupBasedChallengeGoalListActions.getTeamGroupBasedChallengeGoalListByTeamGroup(
      id
    );
    this.props.teamGroupBasedChallengeRankListAction.getTeamGroupBasedChallengeRankListByTeamGroup(
      id
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
        this.props.history.replace(
          `/challenges/detail/team-group-based/${summary.id}`
        );
      } else if (team) {
        this.props.history.replace(
          `/challenges/detail/team-group-based/${summary.id}`
        );
      } else if (teamGroup) {
        this.props.history.replace(
          `/challenges/detail/team-group-based/${summary.id}`
        );
        window.location.reload();
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
    const { challenge } = this.props.teamGroupBasedChallengeDetail;
    const id = this.props.match.params.id;
    const { loading, ranks } = this.props.teamGroupBasedChallengeRankList;
    const mobileScreen = isWidthDown('xs', this.props.width);

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

    if (!this.initialized && challenge) {
      const { account } = this.props.accountDetail;
      const { classes } = this.props;
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
        account.role.code === 'A';
      const canEditParticipants =
        (account.hasManagerChallengeParticipantEditAccess &&
          hasPartialManagerTeams) ||
        account.role.code === 'A';

      const desktopMenu = (
        <div>
          {canEdit && (
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
          {canEditParticipants &&
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
            {canEdit && (
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
            {canEditParticipants &&
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
    const { loading, ranks } = this.props.teamGroupBasedChallengeRankList;

    // Load next rank page
    if (ranks && ranks.length > 20) {
      this.props.teamGroupBasedChallengeRankListAction.getTeamGroupBasedChallengeRankListByTeamGroup(
        id,
        this.state.rankPage
      );
      this.setState({
        ...this.state,
        ranksLoaded: false,
      });
    }
  };

  getShareText = () => {
    const { challenge } = this.props.teamGroupBasedChallengeDetail;
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
    const { challenge } = this.props.teamGroupBasedChallengeDetail;
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
                  `${acc}${index > 0 ? ' / ' : ''}${rank.team_group.name}`,
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
    const { classes } = this.props;
    const { challenge } = this.props.teamGroupBasedChallengeDetail;
    const { goals } = this.props.teamGroupBasedChallengeGoalList;
    const { loading, ranks: fetchedRanks } =
      this.props.teamGroupBasedChallengeRankList;
    const { ranks } = this.state;
    const { configs, loading: configLoading } = this.props.configList;
    const hasNextRankPage =
      this.state.ranksLoaded && fetchedRanks && fetchedRanks.length > 0;
    const displayCollaboratorDepartment =
      configs &&
      _.get(
        configs.filter((c) => c.code === 'CTRD'),
        '[0].value'
      ).toBoolean();
    const { intl } = this.props;

    if (!account.hasChallengeAccess) {
      return <Redirect to={'/'} />;
    }
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
          {_.get(challenge, 'teamGroupId') && (
            <ChallengeCollaboratorFilter
              open={this.state.filterOpen}
              teamGroup={_.get(challenge, 'teamGroupId')}
              onClose={() => {}}
              onChange={this.handleFilterChange}
              disableCollaborators
              disableTeams
            />
          )}
          {account.hasChallengeRankAccess &&
            account.hasTeamRankAccess &&
            this.state.page == 0 &&
            challenge &&
            ranks && (
              <React.Fragment>
                <TeamGroupChallengeRankList
                  ranks={ranks}
                  teamId={challenge.teamId}
                  displayCollaboratorDepartment={displayCollaboratorDepartment}
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
          {this.state.page == 1 && challenge && goals && (
            <ChallengeCondition challenge={challenge} goals={goals} />
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
  teamGroupBasedChallengeDetail,
  teamGroupBasedChallengeGoalList,
  teamGroupBasedChallengeRankList,
  configList,
  challengeSummary,
}) => ({
  accountDetail,
  configList,
  teamGroupBasedChallengeDetail,
  teamGroupBasedChallengeGoalList,
  teamGroupBasedChallengeRankList,
  challengeSummary,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  teamGroupBasedChallengeDetailActions: bindActionCreators(
    teamGroupBasedChallengeDetailActions,
    dispatch
  ),
  teamGroupBasedChallengeGoalListActions: bindActionCreators(
    teamGroupBasedChallengeGoalListActions,
    dispatch
  ),
  teamGroupBasedChallengeRankListAction: bindActionCreators(
    teamGroupBasedChallengeRankListAction,
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
)(withStyles(styles)(withWidth()(injectIntl(TeamGroupBasedChallengeDetail))));
