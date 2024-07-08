import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
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
} from '../../../../../components';
import * as Resources from '../../../../../Resources';
import { injectIntl } from 'react-intl';
import '../../../../../helpers/StringHelper';
import api from '../../../../../data/api/api';
import * as configListActions from '../../../../../services/Configs/ConfigList/actions';
import * as currentPeriodDetailActions from '../../../../../services/Periods/CurrentPeriodDetail/actions';
import * as levelListActions from '../../../../../services/Levels/LevelList/actions';
import * as currentCollaboratorBadgeSummaryListActions from '../../../../../services/CollaboratorBadges/CurrentCollaboratorBadgeSummaryList/actions';
import * as collaboratorDetailActions from '../../../../../services/Collaborators/CollaboratorDetail/actions';
import * as userIdentifierDefinitionListActions from '../../../../../services/Users/UserIdentifierDefinitionList/actions';
import * as collaboratorGoalSummaryListActions from '../../../../../services/CollaboratorGoalSummaries/CollaboratorGoalSummaryList/actions';
import * as collaboratorChallengeListActions from '../../../../../services/CollaboratorChallenges/CollaboratorChallengeList/actions';
import * as collaboratorDataListActions from '../../../../../services/CollaboratorData/CollaboratorDataList/actions';

import { ChallengeCardInfos, GoalCardInfos, SubHeader } from './components';

const styles = {};

class CollaboratorDetailJti extends MainLayoutComponent {
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
    const { account } = this.props.accountDetail;
    const { period } = props.currentPeriodDetail;

    const isTrade = account.isJtiTradeEnv;

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
      this.props.collaboratorGoalSummaryListActions.getCollaboratorGoalSummaryList(
        id,
        3
      );
      this.props.collaboratorChallengeListActions.getCollaboratorChallengeList(
        id
      );
      this.setState({ ...this.state, generalRankInitialized: true }, () => {
        api.collaborators.generalRank(id, year).then((response) => {
          this.setState({ ...this.state, generalRank: response.data });
        });
      });
    }
    if (period && !this.state.levelsInitialized) {
      this.props.levelListActions.getLevelList(period.id);
      this.props.collaboratorDataListActions.getCollaboratorDataList(
        null,
        true,
        null,
        null,
        { kpiCode: isTrade ? 'DC-RANK' : 'K-RANK' }
      );

      this.setState({ ...this.state, levelsInitialized: true });
    }
  }

  handleButtons() {
    return <></>;
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
    this.props.handleTitle(
      intl.formatMessage({ id: 'collaborator.dashboard' })
    );
    // this.props.handleSubHeader(<SubHeader />);
    this.props.handleMaxWidth(false);
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

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SubHeader />
          </Grid>
          <Grid item xs={12}>
            <GoalCardInfos />
          </Grid>
          <Grid item xs={12}>
            <ChallengeCardInfos />
          </Grid>
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
    const { loading: goalsLoading, goals } =
      this.props.collaboratorGoalSummaryList;
    const { loading: challengesLoading, challenges } =
      this.props.collaboratorChallengeList;
    const { data, loading: dataLoading } = this.props.collaboratorDataList;

    const { definitions, loading: userIdentifierListLoading } =
      this.props.userIdentifierList;

    const loading =
      currentCollaboratorBadgeSummaryListLoading ||
      collaboratorDetailLoading ||
      configLoading ||
      userIdentifierListLoading ||
      goalsLoading ||
      challengesLoading ||
      dataLoading ||
      hasError;

    const teamId =
      collaborator && collaborator.team ? collaborator.team.id : null;
    const collaboratorId = collaborator ? collaborator.id : null;

    return (
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          height: '100vh',
          position: 'relative',
        }}
      >
        {!loading &&
          badges &&
          collaborator &&
          goals &&
          challenges &&
          definitions &&
          data &&
          this.renderData()}
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            marginTop: '-70px',
            left: '50%',
            marginLeft: '-20px',
          }}
        >
          {loading && <Loader centered />}
        </div>
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
  collaboratorGoalSummaryList,
  collaboratorChallengeList,
  collaboratorDataList,
}) => ({
  accountDetail,
  configList,
  currentPeriodDetail,
  levelList,
  currentCollaboratorBadgeSummaryList,
  collaboratorDetail,
  userIdentifierList,
  collaboratorGoalSummaryList,
  collaboratorChallengeList,
  collaboratorDataList,
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
  collaboratorGoalSummaryListActions: bindActionCreators(
    collaboratorGoalSummaryListActions,
    dispatch
  ),
  collaboratorChallengeListActions: bindActionCreators(
    collaboratorChallengeListActions,
    dispatch
  ),
  collaboratorDataListActions: bindActionCreators(
    collaboratorDataListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(CollaboratorDetailJti)));
