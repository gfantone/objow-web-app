import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ChallengeForm, ChallengeRewardForm } from '../../components';
import {
  AppBarSubTitle,
  Loader,
  MainLayoutComponent,
  Dialog,
  DialogTitle,
  DialogActions,
  ProgressButton,
  Button,
  TransferList,
  Select,
  TextField, Card,
} from '../../../../components';
import { injectIntl } from 'react-intl';
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions';
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions';
import * as challengeAwardTypeListActions from '../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions';
import * as challengeRewardTypeListActions from '../../../../services/ChallengeRewardTypes/ChallengeRewardTypeList/actions';
import * as rewardTypeListActions from '../../../../services/RewardTypes/RewardTypeList/actions';
import * as challengeDetailActions from '../../../../services/Challanges/ChallengeDetail/actions';
import * as challengeImageListActions from '../../../../services/ChallengeImages/ChallengeImageList/actions';
import * as challengeTypeListActions from '../../../../services/ChallengeTypes/ChallengeTypeList/actions';
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions';
import * as challengeUpdateActions from '../../../../services/Challanges/ChallengeUpdate/actions';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions';
import * as unitListActions from '../../../../services/Units/UnitList/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as teamGroupTreeAction from '../../../../services/TeamGroups/TeamGroupTree/actions';
import * as kpiCreationActions from '../../../../services/Kpis/KpiCreation/actions';
import _ from 'lodash';
import { toast } from 'react-toastify';

const styles = {
  kpiDialog: {
    width: 900,
    maxWidth: 900,
  },
};

class ChallengeUpdate extends MainLayoutComponent {
  state = { goalAdding: false };

  constructor(props) {
    super(props);
    this.props.challengeUpdateActions.clearChallengeUpdate();
    this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints();
  }

  handleAddGoal() {
    this.setState({
      ...this.state,
      goalAdding: 1,
      configRewardOpen: false,
    });
  }

  componentDidMount() {
    const { intl } = this.props;
    const id = this.props.match.params.id;
    const { account } = this.props.accountDetail;

    this.props.handleTitle(
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' })
    );
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'challenge.update.title' })}
      />
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.categoryListActions.getActiveCategoryList();
    this.props.challengeAwardTypeListActions.getChallengeAwardTypeList();
    this.props.challengeRewardTypeListActions.getChallengeRewardTypeList();
    this.props.challengeDetailActions.getChallengeDetail(id, { edit: true });
    this.props.challengeImageListActions.getChallengeImageList();
    this.props.challengeTypeListActions.getUsableChallengeTypeList();
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.kpiListActions.getKpiList();
    this.props.unitListActions.getUnitList();
    this.props.rewardTypeListActions.getRewardTypeList();
    this.props.rewardCategoryListActions.getActiveRewardCategoryList();
  }

  componentDidUpdate() {
    const { challenge } = this.props.challengeDetail;
    if (challenge && challenge.id !== this.state.challengeId) {
      if (!this.state.initialized) {
        this.props.teamListActions.getTeamList({ nestedCollaborators: true });
        this.props.teamGroupTreeAction.getTeamGroupTree();
      }
      this.setState({
        ...this.state,
        initialized: true,
        challengeId: challenge.id,
        currentAwards: challenge.awards,
        participantsPersonalized: null,
        personalizedTeamOpen: false,
        teamPersonalizedSelect: -1,
        teamPersonalized: {
          name: '',
          lookup_id: '',
          collaborators: []
        },
      });
    }
  }
  renderLoader() {
    return <Loader centered />;
  }

  handleGoalAdded() {
    this.setState({
      ...this.props.state,
      goalAdding: false,
    });
  }

  onPersonalizedTeamOpen = () => {
    this.setState({
      ...this.state,
      teamPersonalized: {
        name: '',
        lookup_id: '',
        collaborators: []
      },
      personalizedTeamOpen: true
    })
  }

  onPersonalizedTeamClose = () => {
    this.setState({
      ...this.state,
      teamPersonalizedSelect: -1,
      teamPersonalized: {
        name: '',
        lookup_id: '',
        collaborators: []
      },
      personalizedTeamOpen: false
    })
  }

  handleValidSubmit(model) {
    const { types } = this.props.challengeTypeList;
    const { types: rewardTypes } = this.props.challengeRewardTypeList;
    const { types: awardTypes } = this.props.challengeAwardTypeList;
    const { challenge: baseChallenge } = this.props.challengeDetail;
    const currentType = _.get(baseChallenge, 'type');

    model.start.setHours(0, 0, 0, 0);
    model.end.setHours(23, 59, 59, 0);
    const start = model.start.toUTCJSON();
    const end = model.end.toUTCJSON();

    let participants = [];
    if (currentType.code === 'TP') {
      participants = JSON.stringify(this.state.participantsPersonalized)
    } else {
      participants = this.state.newParticipants
        ? JSON.stringify(this.state.newParticipants.map((p) => ({ id: p.id })))
        : null;
    }

    const challengeFormData = new FormData();
    challengeFormData.append('id', this.props.match.params.id);
    challengeFormData.append('name', model.name);
    challengeFormData.append('description', JSON.stringify(model.description));
    challengeFormData.append('start', start);
    challengeFormData.append('end', end);
    challengeFormData.append('type', model.type);
    challengeFormData.append('award_type', model.awardType);
    challengeFormData.append('reward_type', model.rewardType);
    challengeFormData.append('live', model.live ? model.live : false);
    challengeFormData.append(
      'enable_manager_score',
      model.enable_manager_score ? model.enable_manager_score : false
    );
    challengeFormData.append(
      'notify_updated',
      model.notify_updated ? model.notify_updated : false
    );

    challengeFormData.append(
      'player_visible_ranks',
      model.player_visible_ranks ? parseInt(model.player_visible_ranks) : null
    );
    if (participants) {
      challengeFormData.append('participants', participants);
    }

    if (Number.isInteger(model.image)) {
      challengeFormData.append('image', model.image);
      // challengeFormData.append('customImage', null)
    }
    if (model.image instanceof Blob) {
      // challengeFormData.append('image', null)
      challengeFormData.append('customImage', model.image);
    }

    // Set custom image if exists
    const image = model.image.id
      ? {
          image: model.image,
        }
      : {
          customImage: model.image,
        };

    const participantsObject = participants
      ? {
          participants: participants,
        }
      : {};
    const challenge = Object.assign(
      {
        id: this.props.match.params.id,
        name: model.name,
        description: JSON.stringify(model.description),
        start: model.start,
        end: model.end,
        type: model.type,
        reward_type: model.rewardType,
        award_type: model.awardType,
        live: model.live ? model.live : false,
        enable_manager_score: model.enableManagerScore
          ? model.enableManagerScore
          : false,
        notify_updated: model.notify_updated ? model.notify_updated : false,
        players_visible_ranks: model.playersVisibleRanks
          ? model.playersVisibleRanks
          : null,
      },
      image,
      participantsObject
    );

    let goals = [];
    if (model.kpi || model.kpiUnit) {
      for (
        var i = 0;
        i < (model.kpi ? model.kpi.length : model.kpiUnit.length);
        i++
      ) {
        const points = model.points[i]
          ? parseFloat(_.toString(model.points[i]).replace(',', '.'))
          : 0;
        const target = model.target[i]
          ? parseFloat(_.toString(model.target[i]).replace(',', '.'))
          : 0;
        if (_.get(model, `kpi[${i}]`)) {
          goals.push({
            number: model.number[i],
            name: model.goalName[i],
            description: model.goalDescription[i],
            kpi: model.kpi[i],
            target,
            points,
            challenge: challenge.id,
          });
        } else if (_.get(model, `kpiUnit[${i}]`)) {
          goals.push({
            number: model.number[i],
            name: model.goalName[i],
            description: model.goalDescription[i],
            customKpi: {
              unit: model.kpiUnit[i],
              name: model.goalName[i],
              custom: true,
              start: model.start,
              end: model.end,
              collaboratorEditable:
                model.kpiCollaboratorEditable[i] === 'collaborator',
            },
            target,
            points,
            challenge: challenge.id,
          });
        }
      }
    }
    const currentRewardType = rewardTypes.find(
      (rewardType) => rewardType.id === parseInt(challenge.reward_type)
    );
    const currentAwardType = awardTypes.find(
      (awardType) => awardType.id === parseInt(challenge.award_type)
    );
    let awards = [];
    if (_.get(currentRewardType, 'code') === 'G') {
      awards = this.state.currentAwards
        .filter((award) => {
          return !!award.reward;
        })
        .map((award, index) => {
          if (model.awardTarget) {
            return Object.assign({}, award, {
              target: model.awardTarget[index],
            });
          }
          return award;
        });
    } else {
      for (var i = 0; i < model.award.length; i++) {
        const rank = i + 1;
        let award = {
          rank: rank,
          points: model.award[i],
          challenge: challenge.id,
        };
        if (model.awardTarget) {
          award = Object.assign({}, award, {
            target: model.awardTarget[i],
          });
        }
        awards.push(award);
      }
    }

    const teamId =
      types.find((x) => x.id == model.type && x.code == 'CM') != null &&
      this.props.match.params.id
        ? this.props.match.params.id
        : null;

    if (awards.length > 0) {
      const awardsEqual = this.checkAwardsEqual(baseChallenge.awards, awards);
      const goalsEqual = this.checkGoalsEqual(baseChallenge.goals, goals);
      this.props.challengeUpdateActions.updateChallenge(
        challenge,
        challengeFormData,
        awards,
        goals,
        awardsEqual,
        goalsEqual
      );
    } else {
      this.setState({
        ...this.state,
        awardError: true,
      });
    }
  }
  // if no diff, return false
  checkAwardsEqual = (previousAwards, nextAwards) => {
    if (previousAwards.length !== nextAwards.length) {
      return false;
    }
    return previousAwards.reduce((acc, previousAward, index) => {
      const nextAward = nextAwards[index];

      if (!nextAward) {
        return false;
      }
      const isEqual =
        previousAward.points === nextAward.points &&
        previousAward.target === nextAward.target &&
        _.isEqual(previousAward.reward, nextAward.reward);

      return acc && isEqual;
    }, true);
  };

  // if no diff, return false
  checkGoalsEqual = (previousGoals, nextGoals) => {
    if (previousGoals.length !== nextGoals.length) {
      return false;
    }

    return previousGoals.reduce((acc, previousGoal, index) => {
      const nextGoal = nextGoals[index];

      if (!nextGoal) {
        return false;
      }
      const isEqual =
        previousGoal.points === nextGoal.points &&
        previousGoal.target === nextGoal.target &&
        previousGoal.name === nextGoal.name &&
        previousGoal.description === nextGoal.description &&
        _.isEqual(_.get(previousGoal.kpi, 'id'), nextGoal.kpi);

      return acc && isEqual;
    }, true);
  };

  handleSubmitReward = (model) => {
    const newAward = Object.assign({}, this.state.currentAward, {
      reward: Object.assign(
        {},
        _.get(this.state.currentAward, 'reward'),
        model
      ),
    });
    const newAwards = [
      ..._.slice(this.state.currentAwards, 0, this.state.currentAwardIndex),
      newAward,
      ..._.slice(this.state.currentAwards, this.state.currentAwardIndex + 1),
    ];
    this.state.setAwards(newAwards);
    this.setState({
      ...this.state,
      currentAwards: newAwards,
      configRewardOpen: false,
    });
  };

  setParticipantsPerso = (participants, callback) => {
    this.setState(
      {
        ...this.state,
        participantsPersonalized: participants,
      },
      callback
    );
  };

  setConfigRewardOpen = (
    value,
    awards,
    currentAward,
    currentAwardIndex,
    setAwards
  ) => {
    const { types: rewardTypes } = this.props.rewardTypeList;

    const { challenge } = this.props.challengeDetail;
    if (rewardTypes && challenge) {
      const defaultReward = {
        type:
          _.get(challenge, 'type.code') === 'CC'
            ? rewardTypes.find((t) => t.code === 'P').id
            : rewardTypes.find((t) => t.code === 'T').id,
      };
      // console.log(currentAward ? Object.assign({}, currentAward, { reward: currentAward.reward || defaultReward }) : this.state.currentAward);
      this.setState({
        ...this.state,
        currentAwards: awards || this.state.currentAwards,
        currentAward: currentAward
          ? Object.assign({}, currentAward, {
              reward: currentAward.reward
                ? Object.assign({}, currentAward.reward, defaultReward)
                : defaultReward,
            })
          : this.state.currentAward,
        // currentAward: currentAward || this.state.currentAward,
        currentAwardIndex:
          currentAwardIndex !== undefined
            ? currentAwardIndex
            : this.state.currentAwardIndex,
        setAwards: setAwards || this.state.setAwards,
        configRewardOpen: value,
      });
    }
  };

  setParticipantsEditOpen = (value) => {
    this.setState({
      participantsEditOpen: value,
    });
  };
  handleChangeParticipants = (participants) => {
    this.setState({
      ...this.state,
      newTempParticipants: participants,
    });
  };

  handleSubmitParticipants = () => {
    this.setState({
      ...this.state,
      newParticipants: this.state.newTempParticipants,
      participantsEditOpen: false,
    });
  };

  setNewKpiOpen = (value) => {
    this.setState({
      ...this.state,
      newKpiOpen: value,
    });
  };

  handleSubmitKpi = (model) => {
    this.props.kpiCreationActions.createKpi(model);
    this.setNewKpiOpen(false);
  };

  getTeamPersonalizedByCollaboratorList = (allTeamsChallenge) => {
    const { teams } = this.props.teamList;
    let teamsPerso = [];
    allTeamsChallenge.forEach((teamPerso) => {
      let collaborators = [];
      teams.forEach((team) => {
        team.collaborators.forEach((c) => {
          if (teamPerso.collaborator_ids.indexOf(c.id) >= 0) {
            collaborators.push(c);
          }
        })
      })
      teamPerso.collaborators = collaborators;
      teamsPerso.push(teamPerso);
    })

    return teamsPerso;
  };

  onUpdateTeam = (teamId) => {
    if (!this.state.participantsPersonalized) return
    const { challenge } = this.props.challengeDetail;
    const teams = this.state.participantsPersonalized
      || this.getTeamPersonalizedByCollaboratorList(challenge.participants);
    if (!teams || !teams[teamId]) return
    this.setState({
      ...this.state,
      teamPersonalizedSelect: teamId,
      teamPersonalized: {
        name: teams[teamId].name || '',
        lookup_id: teams[teamId].lookup_id || '',
        collaborators: teams[teamId].collaborators || []
      },
      personalizedTeamOpen: true
    })
  };

  setTeamPersonalized = (teamPersonalized, callback) => {
    this.setState({
      ...this.state,
      teamPersonalized: (teamPersonalized) ? teamPersonalized : {
        name: '',
        lookup_id: '',
        collaborators: []
      }
    }, callback)
  }

  selectedPersonalizedIds = (currentType) => {
    if (!currentType || currentType.code !== 'TP') return []
    let collaborator_ids = []
    if (!this.state.participantsPersonalized) return []
    this.state.participantsPersonalized.forEach((team) => {
      team.collaborators.forEach((c) => {
        collaborator_ids.push(c.id)
      })
    })
    return collaborator_ids
  }

  updateTeamPersonalized = (collabs) => {
    let collaborators = [];
    collabs.forEach((c) => {
      if (c.id) collaborators.push(c);
    })
    const team = this.state.teamPersonalized
    team.collaborators = collaborators;

    this.setTeamPersonalized(team, () => {});
  }

  onTeamPersonalizedUpdated = (team) => {
    if (this.state.teamPersonalizedSelect !== -1 && this.state.participantsPersonalized[this.state.teamPersonalizedSelect]) {
      let newTeams = [...this.state.participantsPersonalized]
      let id = newTeams[this.state.teamPersonalizedSelect].id || null
      newTeams[this.state.teamPersonalizedSelect] = team
      if (id) {
        newTeams[this.state.teamPersonalizedSelect].id = id
      }
      this.setParticipantsPerso(newTeams, () => {
        this.onPersonalizedTeamClose();
      });
    }
  }

  onTeamPersonalizedAdded = (team) => {
    let newTeams = [...this.state.participantsPersonalized]
    newTeams.push(team);
    this.setParticipantsPerso(newTeams, () => {
      this.onPersonalizedTeamClose();
    });
  }

  onSubmitTeamPersonalized = (model) => {
    const team = this.state.teamPersonalized
    if (!team.collaborators || team.collaborators.length === 0) {
      return
    }
    team.name = model.name
    team.lookup_id = model.lookup_id

    if (this.state.teamPersonalizedSelect !== -1) {
      this.onTeamPersonalizedUpdated(team)
    } else {
      this.onTeamPersonalizedAdded(team)
    }
  }

  onDeleteTeam = (teamId) => {
    if (this.state.participantsPersonalized && this.state.participantsPersonalized[teamId]) {
      let newTeams = [...this.state.participantsPersonalized]
      newTeams.splice(teamId, 1);
      this.setParticipantsPerso(newTeams, () => {
        this.onPersonalizedTeamClose()
      });
    }
  };

  renderData() {
    const { intl } = this.props;
    const { categories } = this.props.categoryList;
    const { types: awardTypes } = this.props.challengeAwardTypeList;
    const { types: rewardTypes } = this.props.challengeRewardTypeList;
    const { challenge } = this.props.challengeDetail;
    const { images: rewardImages } = this.props.rewardImageList;
    const { categories: rewardCategories } = this.props.rewardCategoryList;
    const { images } = this.props.challengeImageList;
    const { period } = this.props.currentPeriodDetail;
    const { types } = this.props.challengeTypeList;
    const { loading } = this.props.challengeUpdate;
    const { kpis } = this.props.kpiList;
    const { units } = this.props.unitList;
    const { teams } = this.props.teamList;
    const { teamGroup } = this.props.teamGroupTree;
    const { classes } = this.props;

    const currentType = _.get(challenge, 'type');

    const getTeamByCollaboratorList = (collaborator_ids) => {
      return teams.filter((team) => collaborator_ids.indexOf(team.id) >= 0);
    };

    let participants =
      _.get(this.state, 'newTempParticipants') ||
      _.get(challenge, 'participants');

    let newParticipants = _.get(this.state, 'newParticipants');

    if (currentType.code !== 'TG') {
      participants =
        currentType.code === 'CC'
          ? _.get(this.state, 'newTempParticipants') ||
            _.get(challenge, 'participants')
          : _.get(this.state, 'newTempParticipants')
          ? _.get(this.state, 'newTempParticipants')
          : _.flatten(
              getTeamByCollaboratorList(
                _.get(challenge, 'participants', []).map((p) => p.id)
              ).map((team) => team.collaborators)
            );

      newParticipants =
        _.get(this.state, 'newParticipants') &&
        (currentType.code === 'CC'
          ? _.get(this.state, 'newParticipants')
          : _.flatten(
              getTeamByCollaboratorList(
                _.get(this.state, 'newParticipants').map((p) => p.team)
              )
            ));
    }

    const criticities = [
      { order: 1, name: intl.formatMessage({ id: 'kpi.criticity.low' }) },
      { order: 2, name: intl.formatMessage({ id: 'kpi.criticity.medium' }) },
      { order: 3, name: intl.formatMessage({ id: 'kpi.criticity.high' }) },
    ];

    // const currentReward = _.isString(_.get(this.state, 'currentAward.reward.description')) ?
    //   _.get(this.state, 'currentAward.reward') :
    //   Object.assign({}, _.get(this.state, 'currentAward.reward'), {
    //     description: JSON.parse(_.get(this.state, 'currentAward.reward.description'))
    //   })

    return (
      <div>
        <Formsy ref='form' onValidSubmit={this.handleValidSubmit.bind(this)}>
          <ChallengeForm
            actionLoading={loading}
            awardTypes={awardTypes}
            rewardTypes={rewardTypes}
            categories={categories}
            challenge={challenge}
            goalAdding={this.state.goalAdding}
            images={images}
            isUpdate
            kpis={kpis}
            units={units}
            period={period}
            types={types}
            onGoalAdded={this.handleGoalAdded.bind(this)}
            addGoal={this.handleAddGoal.bind(this)}
            teams={teams}
            teamGroup={teamGroup}
            onUpdateTeamPerso={this.onUpdateTeam}
            onPersonalizedTeamOpen={this.onPersonalizedTeamOpen}
            setParticipantsPerso={this.setParticipantsPerso}
            setConfigRewardOpen={this.setConfigRewardOpen}
            setParticipantsEditOpen={this.setParticipantsEditOpen}
            handleChangeParticipants={this.handleChangeParticipants}
            rewardImages={rewardImages}
            rewardCategories={rewardCategories}
            newParticipants={newParticipants}
            participantsPersonalized={this.state.participantsPersonalized}
            awardError={this.state.awardError}
            setNewKpiOpen={this.setNewKpiOpen}
          />
        </Formsy>

        {currentType && currentType.code === 'TP' && (
          <Dialog
            open={this.state.personalizedTeamOpen}
            onClose={this.onPersonalizedTeamClose}
            classes={{paper: this.props.classes.teamDialog}}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            maxWidth="md"
          >
            <DialogTitle>
              {intl.formatMessage({id: "team.perso.creation_title"})}
            </DialogTitle>
            <Formsy onValidSubmit={this.onSubmitTeamPersonalized}>
              <Grid container spacing={4}>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={12}>
                    <Card>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            name='name'
                            initial={_.get(this.state.teamPersonalized, 'name')}
                            label={intl.formatMessage({ id: 'team.form.name' })}
                            fullWidth
                            required
                            lowercase
                            validations={{
                              isAlreadyUsedIn: this.state.participantsPersonalized || getTeamByCollaboratorList(challenge.participants)
                                .filter((teamItem, index) => this.state.teamPersonalizedSelect !== -1 ? index !== this.state.teamPersonalizedSelect : true)
                                .map((teamItem) => teamItem.name)
                            }}
                            validationErrors={{
                              isDefaultRequiredValue: intl.formatMessage({
                                id: 'common.form.required_error',
                              }),
                              isAlreadyUsedIn: `Ce nom d'équipe est déjà utilisé`,
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            name='lookup_id'
                            initial={_.get(this.state.teamPersonalized, 'lookup_id')}
                            label={intl.formatMessage({ id: 'team.form.id' })}
                            fullWidth
                            lowercase
                            validations={{
                              isAlreadyUsedIn: this.state.participantsPersonalized || getTeamByCollaboratorList(challenge.participants)
                                .filter((teamItem, index) => this.state.teamPersonalizedSelect !== -1 ? index !== this.state.teamPersonalizedSelect : true)
                                .map((teamItem) => teamItem.lookup_id)
                            }}
                            validationErrors={{
                              isAlreadyUsedIn: `Cet identifiant d'équipe est déjà utilisé`,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  {(!this.state.teamPersonalized || !this.state.teamPersonalized.collaborators) && (
                    <Grid item xs={12}>
                      <Loader centered/>
                    </Grid>
                  )}
                  {this.state.teamPersonalized && this.state.teamPersonalized.collaborators && (
                    <Grid item xs={12}>
                      <TransferList
                        listIn={teamGroup}
                        teamGroupMode={currentType && currentType.code === 'TG'}
                        teamPersonalizedMode={currentType && currentType.code === 'TP'}
                        enableCollaboratorSelect={
                          currentType && (currentType.code === 'CC' || currentType.code === 'TP')
                        }
                        enableTeamSelect={(currentType) ? _.includes(
                          ['CC', 'CT', 'TP'],
                          currentType.code
                        ) : false}
                        noSelection={false}
                        onChange={this.updateTeamPersonalized}
                        selectedPersonalizedIds={this.selectedPersonalizedIds(currentType) || []}
                        selected={this.state.teamPersonalized.collaborators}
                        defaultChoicesExpanded={false}
                        onUpdateTeam={this.onUpdateTeam}
                        enableSearch
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <DialogActions>
                <ProgressButton
                  type="submit"
                  text={intl.formatMessage({id: "common.submit"})}
                  centered
                />
                <Button onClick={this.onPersonalizedTeamClose} color="secondary">
                  {intl.formatMessage({id: "common.cancel"})}
                </Button>
                { this.state.teamPersonalizedSelect !== -1 && (
                  <Button onClick={() => this.onDeleteTeam(this.state.teamPersonalizedSelect)} color="secondary">
                    <span style={{ color: '#E50000', marginLeft: '5px' }}>{intl.formatMessage({id: "common.delete"})}</span>
                  </Button>
                )}
              </DialogActions>
            </Formsy>
          </Dialog>
        )}

        <Dialog
          open={this.state.newKpiOpen}
          onClose={() => this.setNewKpiOpen(false)}
          classes={{ paper: this.props.classes.kpiDialog }}
        >
          <DialogTitle>Demande de création de KPI</DialogTitle>
          <Formsy onValidSubmit={this.handleSubmitKpi}>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Grid container direction='row' spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Select
                      name='criticity'
                      label={intl.formatMessage({
                        id: 'admin.goal.criticity_label',
                      })}
                      options={criticities}
                      optionValueName='order'
                      optionTextName='name'
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                      name='category'
                      label={intl.formatMessage({
                        id: 'admin.goal.category_label',
                      })}
                      options={categories}
                      optionValueName='id'
                      optionTextName='name'
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name='name'
                  label={intl.formatMessage({
                    id: 'admin.goal.kpi_name_label',
                  })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name='description'
                  label={intl.formatMessage({
                    id: 'admin.goal.description_label',
                  })}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Grid item>
              <DialogActions>
                <ProgressButton
                  type='submit'
                  text={intl.formatMessage({ id: 'common.submit' })}
                  centered
                />
                <Button
                  onClick={() => this.setNewKpiOpen(false)}
                  color='secondary'
                >
                  {intl.formatMessage({ id: 'common.cancel' })}
                </Button>
              </DialogActions>
            </Grid>
          </Formsy>
        </Dialog>
        <Dialog
          open={this.state.configRewardOpen}
          onClose={() => this.setConfigRewardOpen(false)}
          classes={{ paper: this.props.classes.kpiDialog }}
        >
          <Formsy onValidSubmit={this.handleSubmitReward}>
            <Grid container spacing={1} direction='column'>
              <Grid item style={{ paddingTop: 0 }}>
                <DialogTitle>
                  {intl.formatMessage({ id: 'challenge.update.create_reward' })}
                </DialogTitle>
              </Grid>
              <Grid item>
                <ChallengeRewardForm
                  reward={_.get(this.state, 'currentAward.reward')}
                />
              </Grid>
              <Grid item>
                <DialogActions>
                  <ProgressButton
                    type='submit'
                    text={intl.formatMessage({ id: 'common.submit' })}
                    centered
                  />
                  <Button
                    onClick={() => this.setConfigRewardOpen(false)}
                    color='secondary'
                  >
                    {intl.formatMessage({ id: 'common.cancel' })}
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </Formsy>
        </Dialog>
        <Dialog
          open={this.state.participantsEditOpen}
          onClose={() => this.setParticipantsEditOpen(false)}
          classes={{ paper: this.props.classes.kpiDialog }}
        >
          <Formsy onValidSubmit={this.handleSubmitParticipants}>
            <Grid container spacing={1} direction='column'>
              <Grid item style={{ paddingTop: 0 }}>
                <DialogTitle>
                  {intl.formatMessage({
                    id: 'challenge.update.edit_participants',
                  })}
                </DialogTitle>
              </Grid>

              <Grid item>
                {teams && teams.length > 0 && (
                  <TransferList
                    listIn={teamGroup}
                    teamGroupMode={_.get(currentType, 'code') === 'TG'}
                    teamPersonalizedMode={_.get(currentType, 'code') === 'TP'}
                    enableCollaboratorSelect={
                      _.get(currentType, 'code') === 'CC' || _.get(currentType, 'code') === 'TP'
                    }
                    enableTeamSelect={_.includes(
                      ['CC', 'CT', 'TP'],
                      _.get(currentType, 'code')
                    )}
                    onChange={this.handleChangeParticipants}
                    selected={participants}
                  />
                )}
                {!(teams && teams.length > 0) && <Loader centered />}
              </Grid>
              <Grid item>
                <DialogActions>
                  <ProgressButton
                    type='submit'
                    text={intl.formatMessage({ id: 'common.submit' })}
                    centered
                  />
                  <Button
                    onClick={() => this.setParticipantsEditOpen(false)}
                    color='secondary'
                  >
                    {intl.formatMessage({ id: 'common.cancel' })}
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </Formsy>
        </Dialog>
      </div>
    );
  }

  render() {
    const { intl } = this.props;
    const { categories, loading: categoryListLoading } =
      this.props.categoryList;
    const { types: awardTypes, loading: challengeAwardTypeListLoading } =
      this.props.challengeAwardTypeList;
    const { types: rewardTypes, loading: challengeRewardTypeListLoading } =
      this.props.challengeRewardTypeList;
    const { challenge, loading: challengeDetailLoading } =
      this.props.challengeDetail;
    const { images, loading: challengeImageListLoading } =
      this.props.challengeImageList;
    const { types, loading: challengeTypeListLoading } =
      this.props.challengeTypeList;
    const { success, error } = this.props.challengeUpdate;
    const { period, loading: currentPeriodDetailLoading } =
      this.props.currentPeriodDetail;
    const { kpis, loading: kpiListLoading } = this.props.kpiList;
    const { units, loading: unitListLoading } = this.props.unitList;
    const { teams, loading: teamListLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupsLoading } = this.props.teamGroupTree;
    const loading =
      categoryListLoading ||
      challengeAwardTypeListLoading ||
      challengeRewardTypeListLoading ||
      challengeDetailLoading ||
      challengeImageListLoading ||
      challengeTypeListLoading ||
      currentPeriodDetailLoading ||
      kpiListLoading ||
      unitListLoading;

    const { account } = this.props.accountDetail;
    if (!account.hasChallengeAccess) {
      return <Redirect to={'/'} />;
    }

    if (success) {
      this.props.challengeUpdateActions.clearChallengeUpdate();
      this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints();
      this.props.history.goBack();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' })
      );
    }
    if (error) {
      this.props.challengeUpdateActions.clearChallengeUpdate();
      toast.error(intl.formatMessage({ id: 'common.update_error_message' }));
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading &&
          awardTypes &&
          rewardTypes &&
          categories &&
          challenge &&
          period &&
          images &&
          types &&
          kpis &&
          units &&
          this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  categoryList,
  challengeAwardTypeList,
  challengeRewardTypeList,
  rewardTypeList,
  challengeDetail,
  challengeImageList,
  challengeTypeList,
  challengeUpdate,
  currentPeriodDetail,
  kpiList,
  unitList,
  accountDetail,
  teamList,
  teamGroupTree,
  rewardImageList,
  rewardCategoryList,
}) => ({
  categoryList,
  accountDetail,
  challengeAwardTypeList,
  challengeRewardTypeList,
  rewardTypeList,
  challengeDetail,
  challengeImageList,
  challengeTypeList,
  challengeUpdate,
  currentPeriodDetail,
  kpiList,
  unitList,
  rewardImageList,
  rewardCategoryList,
  teamGroupTree,
  teamList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
  challengeAwardTypeListActions: bindActionCreators(
    challengeAwardTypeListActions,
    dispatch
  ),
  challengeRewardTypeListActions: bindActionCreators(
    challengeRewardTypeListActions,
    dispatch
  ),
  challengeDetailActions: bindActionCreators(challengeDetailActions, dispatch),
  challengeImageListActions: bindActionCreators(
    challengeImageListActions,
    dispatch
  ),
  challengeTypeListActions: bindActionCreators(
    challengeTypeListActions,
    dispatch
  ),
  challengeTypeUsablePointsActions: bindActionCreators(
    challengeTypeUsablePointsActions,
    dispatch
  ),
  challengeUpdateActions: bindActionCreators(challengeUpdateActions, dispatch),
  currentPeriodDetailActions: bindActionCreators(
    currentPeriodDetailActions,
    dispatch
  ),
  kpiListActions: bindActionCreators(kpiListActions, dispatch),
  unitListActions: bindActionCreators(unitListActions, dispatch),
  teamListActions: bindActionCreators(teamListActions, dispatch),
  rewardImageListActions: bindActionCreators(rewardImageListActions, dispatch),
  rewardCategoryListActions: bindActionCreators(
    rewardCategoryListActions,
    dispatch
  ),
  rewardTypeListActions: bindActionCreators(rewardTypeListActions, dispatch),
  kpiCreationActions: bindActionCreators(kpiCreationActions, dispatch),
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(ChallengeUpdate)));
