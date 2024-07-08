import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import {
  AppBarSubTitle,
  IconButton as MenuIconButton,
  Loader,
  MainLayoutComponent,
  Stepper,
  Dialog,
  DialogTitle,
  DialogActions,
  ProgressButton,
  TextField,
  Button,
  Select,
} from '../../../../components';
import * as challengeCreationActions from '../../../../services/Challanges/ChallangeCreaton/actions';
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions';
import { useIntl, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ChallengeFormStepper, ChallengeRewardForm } from '../../components';
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import * as challengeAwardTypeListActions from '../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions';
import * as challengeRewardTypeListActions from '../../../../services/ChallengeRewardTypes/ChallengeRewardTypeList/actions';
import * as challengeDetailActions from '../../../../services/Challanges/ChallengeDetail/actions';
import * as challengeImageListActions from '../../../../services/ChallengeImages/ChallengeImageList/actions';
import * as challengeTypeListActions from '../../../../services/ChallengeTypes/ChallengeTypeList/actions';
import * as rewardTypeListActions from '../../../../services/RewardTypes/RewardTypeList/actions';
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions';
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions';
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

class ChallengeDuplication extends MainLayoutComponent {
  state = {
    goalAdding: false,
    steps: [
      { order: 1, name: 'challenge.form.steps.participants', active: true },
      { order: 2, name: 'challenge.form.steps.mode' },
      { order: 3, name: 'challenge.form.steps.infos' },
      { order: 4, name: 'challenge.form.steps.indicators' },
      { order: 5, name: 'challenge.form.steps.rewards' },
      // { order: 6, name: 'Options'},
      { order: 6, name: 'challenge.form.steps.validation' },
    ],
    initialized: false,
    finalModel: {},
    participants: [],
  };

  constructor(props) {
    super(props);
    this.props.challengeCreationActions.clearChallengeCreation();
    this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints();
    this.form = React.createRef();
  }

  handleAddGoal = () => {
    this.setState({
      ...this.state,
      goalAdding: 1,
    });
  };

  componentDidMount() {
    const { intl } = this.props;
    const id = this.props.match.params.id;
    const { account } = this.props.accountDetail;

    this.props.handleTitle(
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' })
    );
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'challenge.duplication.title' })}
      />
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.categoryListActions.getActiveCategoryList();
    this.props.challengeAwardTypeListActions.getChallengeAwardTypeList();
    this.props.challengeRewardTypeListActions.getChallengeRewardTypeList();
    this.props.challengeDetailActions.getChallengeDetail(id);
    this.props.challengeImageListActions.getChallengeImageList();
    this.props.challengeTypeListActions.getUsableChallengeTypeList();
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.kpiListActions.getKpiList();
    this.props.unitListActions.getUnitList();
    this.props.teamListActions.getTeamList({
      simpleCollaborators: true,
      nestedCollaborators: true,
    });
    this.props.teamGroupTreeAction.getTeamGroupTree();
    this.props.rewardTypeListActions.getRewardTypeList();
    this.props.rewardCategoryListActions.getActiveRewardCategoryList();
    this.props.rewardImageListActions.getRewardImageList();

    const params = new URLSearchParams(window.location.search);
    const teamParam = params.get('team');
    this.teamId = teamParam ? Number(teamParam) : null;
  }

  componentWillReceiveProps(props) {
    const { challenge } = props.challengeDetail;
    const { teams } = props.teamList;

    if (
      challenge &&
      challenge.participants &&
      teams &&
      teams.length > 0 &&
      (!this.state.initialized ||
        (_.get(this.state.finalModel, 'id') &&
          _.get(this.state.finalModel, 'id') !== _.get(challenge, 'id')))
    ) {
      const finalModel = this.challengeToModel(challenge, teams);
      this.setState({
        ...this.state,
        initialized: true,
        baseChallenge: finalModel,
        finalModel: finalModel,
        participants: finalModel.participants,
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

  getCurrentStep = () => {
    return this.state.steps.find((step) => step.active === true);
  };

  setActiveStep = (newActiveStep) => {
    this.setState({
      ...this.state,
      steps: this.state.steps.map((step) =>
        step.order === newActiveStep.order
          ? Object.assign(step, { active: true })
          : Object.assign(step, { active: false })
      ),
    });
  };

  changeStep(model) {
    const currentStep = this.getCurrentStep();
    // Reset participants if we change goal type (team or individual)
    let awards = [];
    if (model.award) {
      for (var i = 0; i < model.award.length; i++) {
        const rank = i + 1;
        let award = { rank: rank, points: model.award[i] };
        if (model.awardTarget) {
          award = Object.assign({}, award, {
            target: model.awardTarget[i],
          });
        }
        awards.push(award);
      }
    }
    const validAwards =
      currentStep.order !== 5 ||
      model.award ||
      (this.state.currentAwards &&
        this.state.currentAwards.length > 0 &&
        this.state.currentAwards[0].reward);

    const apply = () => {
      let goals = [];
      // if(model.kpi) {
      //   for (var i = 0; i < model.kpi.length; i++) {
      //     goals.push({ number: model.number[i], name: model.goalName[i], kpi: model.kpi[i], target: model.target[i], points: model.points[i] })
      //   }
      // }

      if (model.kpi || model.kpiUnit) {
        const lengthKpi = _.get(model, 'kpi.length', 0);
        const lengthKpiUnit = _.get(model, 'kpiUnit.length', 0);
        for (
          var i = 0;
          i < (lengthKpi > lengthKpiUnit ? lengthKpi : lengthKpiUnit);
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
              kpi: model.kpi[i],
              target,
              points,
            });
          } else if (_.get(model, `kpiUnit[${i}]`)) {
            goals.push({
              number: model.number[i],
              name: model.goalName[i],
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
              custom: true,
              unit: model.kpiUnit[i],
            });
          }
        }
      }

      // Set award target for mode palier
      let currentAwards = this.state.currentAwards;
      if (model.awardTarget && this.state.currentAwards) {
        currentAwards = this.state.currentAwards.map((award, index) => {
          return Object.assign({}, award, {
            target: model.awardTarget[index],
          });
        });
      }

      this.setState({
        ...this.state,
        steps: this.state.steps.map((step) => {
          if (step.order === currentStep.order) {
            return Object.assign(step, { active: false, completed: true });
          }
          if (step.order === currentStep.order + 1) {
            return Object.assign(step, { active: true });
          }
          return step;
        }),
        currentAwards: currentAwards,
        awardError: !validAwards,
        finalModel: Object.assign(this.state.finalModel, model, {
          participants: this.state.participants,
          goals:
            model.kpi || model.kpiUnit ? goals : this.state.finalModel.goals,
          awards: model.award ? awards : this.state.finalModel.awards,
        }),
      });
    };
    const checkValidation =
      (currentStep.order !== 1 ||
        _.get(this.state.participants, 'length', 0) > 0) &&
      (currentStep.order !== 2 || this.state.finalModel.awardType) &&
      (currentStep.order !== 5 || validAwards);
    if (checkValidation) {
      // if(model.type && this.state.finalModel.type !== model.type) {
      //   this.setParticipants([], apply)
      // } else {
      apply();
      // }
    } else {
      this.setState({
        ...this.state,
        awardError: !validAwards,
      });
    }
  }

  setParticipants = (participants, callback) => {
    this.setState(
      {
        ...this.state,
        participants: participants,
        finalModel: Object.assign({}, this.state.finalModel, { participants }),
      },
      callback
    );
  };

  setAwardType = (awardType) => {
    this.setState({
      ...this.state,
      finalModel: Object.assign(this.state.finalModel, { awardType }),
    });
  };

  setStart = (start) => {
    this.setState({
      ...this.state,
      finalModel: Object.assign(this.state.finalModel, { start }),
    });
  };

  setEnd = (end) => {
    this.setState({
      ...this.state,
      finalModel: Object.assign(this.state.finalModel, { end }),
    });
  };
  setType = (type) => {
    this.setState({
      ...this.state,
      finalModel: Object.assign(this.state.finalModel, { type }),
    });
  };

  handleNextStep = () => {
    this.form.current.submit();
  };
  handlePreviousStep = () => {
    const currentStep = this.getCurrentStep();
    const previousStep = this.state.steps.find(
      (step) => step.order === currentStep.order - 1
    );
    if (previousStep) {
      this.setState({
        ...this.state,
        steps: this.state.steps.map((step) => {
          if (step.order === currentStep.order) {
            return Object.assign(step, { active: false, completed: false });
          }
          if (step.order === currentStep.order - 1) {
            return Object.assign(step, { active: true, completed: false });
          }
          return step;
        }),
      });
    }
  };

  isLastStep = () => {
    const currentStep = this.getCurrentStep();
    return currentStep.order >= this.state.steps.length;
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

  async handleValidSubmit(model) {
    const currentStep = this.getCurrentStep();
    const nextStep = this.state.steps.find(
      (step) => step.order === currentStep.order + 1
    );

    const { types: rewardTypes } = this.props.challengeRewardTypeList;

    if (nextStep) {
      this.changeStep(model);
    } else {
      const { types } = this.props.challengeTypeList;
      const finalModel = this.state.finalModel;
      finalModel.start.setHours(0, 0, 0, 0);
      finalModel.end.setHours(23, 59, 59, 0);
      const start = finalModel.start.toUTCJSON();
      const end = finalModel.end.toUTCJSON();

      const participants = JSON.stringify(
        finalModel.participants.map((p) => ({ id: p.id }))
      );

      const challengeFormData = new FormData();
      challengeFormData.append('name', finalModel.name);
      challengeFormData.append(
        'description',
        JSON.stringify(finalModel.description)
      );
      challengeFormData.append('start', start);
      challengeFormData.append('end', end);
      challengeFormData.append('type', finalModel.type);
      challengeFormData.append('award_type', finalModel.awardType);
      challengeFormData.append('reward_type', finalModel.rewardType);
      challengeFormData.append(
        'live',
        finalModel.live ? finalModel.live : false
      );
      challengeFormData.append('participants', participants);

      if (Number.isInteger(finalModel.image)) {
        challengeFormData.append('image', finalModel.image);
      }

      if (finalModel.image instanceof Blob) {
        challengeFormData.append('customImage', finalModel.image);
      }

      const image = finalModel.image.id
        ? {
            image: finalModel.image,
          }
        : {
            customImage: finalModel.image,
          };

      let challenge = Object.assign(
        {
          name: finalModel.name,
          description: JSON.stringify(finalModel.description),
          start: start,
          end: end,
          type: finalModel.type,
          award_type: finalModel.awardType,
          award_type: finalModel.rewardType,
          live: finalModel.live ? finalModel.live : false,
          participants: participants,
        },
        image
      );

      const currentRewardType = rewardTypes.find(
        (rewardType) => rewardType.id === parseInt(finalModel.rewardType)
      );
      const awards =
        _.get(currentRewardType, 'code') === 'G'
          ? // gift awards should have reward
            this.state.currentAwards.filter((award) => !!award.reward)
          : finalModel.awards;

      const teamId =
        types.find((x) => x.id == finalModel.type && x.code == 'CM') != null &&
        this.props.match.params.id
          ? this.props.match.params.id
          : null;

      this.props.challengeCreationActions.createChallenge(
        challenge,
        challengeFormData,
        awards,
        finalModel.goals,
        teamId
      );
    }
  }

  challengeToModel = (challenge, teams) => {
    const participantIds = challenge.participants.map((p) => p.id);

    const participants =
      challenge.type.code === 'CT'
        ? _.flatten(
            teams
              .filter(
                (team) =>
                  challenge.participants.map((p) => p.id).indexOf(team.id) >= 0
              )
              .map((team) => team.collaborators)
          )
        : challenge.participants;

    return {
      name: challenge.name,
      description: JSON.parse(challenge.description),
      image: _.get(challenge, 'image.id'),
      customImage: challenge.customImage,
      customImagePath: challenge.custom_image_path,
      awardType: _.get(challenge, 'award_type'),
      rewardType: _.get(challenge, 'reward_type'),
      type: _.get(challenge, 'type.id'),
      typeCode: _.get(challenge, 'type.code'),
      live: _.get(challenge, 'live'),
      // start: _.get(challenge, 'start').toDate2(),
      // end: _.get(challenge, 'end').toDate2(),
      participants: participants,
      awards: _.get(challenge, 'awards'),
      goals: _.get(challenge, 'goals').map((goal) =>
        Object.assign(goal, {
          kpi: _.get(goal, 'kpi.id'),
          kpiObject: goal.kpi,
          unit: _.get(goal, 'kpi.unit.id'),
          custom: _.get(goal, 'kpi.custom'),
          collaboratorEditable: _.get(goal, 'kpi.collaborator_editable'),
        })
      ),
    };
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

  setConfigRewardOpen = (
    value,
    awards,
    currentAward,
    currentAwardIndex,
    setAwards
  ) => {
    const { types: rewardTypes } = this.props.rewardTypeList;
    const { types } = this.props.challengeTypeList;
    const currentType = types.find(
      (t) => t.id === parseInt(_.get(this.state, 'finalModel.type'))
    );

    const defaultReward = {
      type:
        currentType.code === 'CC'
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
  };

  renderData() {
    const { intl } = this.props;
    const { categories } = this.props.categoryList;
    const { types: awardTypes } = this.props.challengeAwardTypeList;
    const { types: rewardTypes } = this.props.challengeRewardTypeList;
    const { images: rewardImages } = this.props.rewardImageList;
    const { categories: rewardCategories } = this.props.rewardCategoryList;
    const { challenge } = this.props.challengeDetail;
    const { images } = this.props.challengeImageList;
    const { period } = this.props.currentPeriodDetail;
    const { types } = this.props.challengeTypeList;
    const { loading } = this.props.challengeCreation;
    const { kpis } = this.props.kpiList;
    const { units } = this.props.unitList;
    const { teams } = this.props.teamList;
    const { teamGroup } = this.props.teamGroupTree;
    const { account } = this.props.accountDetail;

    const currentRewardType =
      _.get(this.state, 'finalModel.rewardType') &&
      rewardTypes.find(
        (rewardType) =>
          rewardType.id === parseInt(this.state.finalModel.rewardType)
      );

    const currentAwards =
      _.get(currentRewardType, 'code') === 'G'
        ? this.state.currentAwards || this.state.finalModel.awards
        : this.state.finalModel.awards;

    const awards =
      _.get(currentRewardType, 'code') === 'G'
        ? // gift awards should have reward
          currentAwards.filter((award) => !!award.reward)
        : currentAwards;

    const criticities = [
      { order: 1, name: intl.formatMessage({ id: 'kpi.criticity.low' }) },
      { order: 2, name: intl.formatMessage({ id: 'kpi.criticity.medium' }) },
      { order: 3, name: intl.formatMessage({ id: 'kpi.criticity.high' }) },
    ];

    const currentChallenge = Object.assign({}, this.state.finalModel, {
      awards,
    });

    return (
      <div>
        <Formsy ref='form' onValidSubmit={this.handleValidSubmit.bind(this)}>
          <Stepper
            steps={this.state.steps.map((step) =>
              Object.assign({}, step, {
                name: intl.formatMessage({ id: step.name }),
              })
            )}
            handlePreviousStep={this.handlePreviousStep}
            handleNextStep={() => {
              _.get(this.form, 'current.submit') &&
                _.get(this.form, 'current.submit')();
            }}
            actionLoading={loading}
          />
          {!challenge && this.renderLoader()}
          {challenge && (
            <ChallengeFormStepper
              actionLoading={loading}
              awardTypes={awardTypes}
              rewardTypes={rewardTypes}
              categories={categories}
              goalAdding={this.state.goalAdding}
              images={images}
              isDuplication
              kpis={kpis}
              units={units}
              period={period}
              team={this.teamId}
              types={types}
              onGoalAdded={this.handleGoalAdded.bind(this)}
              currentStep={this.getCurrentStep()}
              isLastStep={this.isLastStep()}
              setStart={this.setStart}
              setEnd={this.setEnd}
              setType={this.setType}
              setParticipants={this.setParticipants}
              setAwardType={this.setAwardType}
              handlePreviousStep={this.handlePreviousStep}
              handleNextStep={_.get(this.form, 'current.submit')}
              handleAddGoal={this.handleAddGoal}
              challenge={currentChallenge}
              setNewKpiOpen={this.setNewKpiOpen}
              setConfigRewardOpen={this.setConfigRewardOpen}
              teams={teams.filter(
                (t) =>
                  _.get(account, 'role.code') !== 'M' ||
                  _.get(account, 'team.id') === t.id
              )}
              teamGroup={teamGroup}
              rewardImages={rewardImages}
              rewardCategories={rewardCategories}
              awardError={this.state.awardError}
              dupplication
              participantsChoiceExpanded
            />
          )}
        </Formsy>
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
                  {intl.formatMessage({
                    id: 'challenge.award_list.add_reward',
                  })}
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
                    Annuler
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
    const {
      types: challengeRewardTypes,
      loading: challengeRewardTypeListLoading,
    } = this.props.challengeRewardTypeList;
    const { types: rewardTypes, loading: rewardTypeListLoading } =
      this.props.rewardTypeList;
    const { challenge, loading: challengeDetailLoading } =
      this.props.challengeDetail;
    const { images, loading: challengeImageListLoading } =
      this.props.challengeImageList;
    const { types, loading: challengeTypeListLoading } =
      this.props.challengeTypeList;
    const { success, error } = this.props.challengeCreation;
    const { period, loading: currentPeriodDetailLoading } =
      this.props.currentPeriodDetail;
    const { kpis, loading: kpiListLoading } = this.props.kpiList;
    const { teams, loading: teamListLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupsLoading } = this.props.teamGroupTree;
    const loading =
      categoryListLoading ||
      challengeAwardTypeListLoading ||
      challengeImageListLoading ||
      challengeTypeListLoading ||
      currentPeriodDetailLoading ||
      kpiListLoading ||
      challengeRewardTypeListLoading;

    const { account } = this.props.accountDetail;

    if (!account.hasChallengeAccess) {
      return <Redirect to={'/'} />;
    }

    if (success) {
      this.props.challengeCreationActions.clearChallengeCreation();
      this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints();
      this.props.history.push('/challenges');
      toast.success(intl.formatMessage({ id: 'challenge.creation.success' }));
    }
    if (error) {
      this.props.challengeCreationActions.clearChallengeCreation();
      toast.error(intl.formatMessage({ id: 'challenge.creation.error' }));
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading &&
          awardTypes &&
          challengeRewardTypes &&
          categories &&
          period &&
          images &&
          types &&
          kpis &&
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
  challengeCreation,
  challengeDetail,
  challengeImageList,
  challengeTypeList,
  currentPeriodDetail,
  kpiList,
  unitList,
  accountDetail,
  rewardImageList,
  rewardCategoryList,
  teamGroupTree,
  teamList,
}) => ({
  categoryList,
  accountDetail,
  challengeAwardTypeList,
  challengeRewardTypeList,
  rewardTypeList,
  challengeCreation,
  challengeDetail,
  challengeImageList,
  challengeTypeList,
  currentPeriodDetail,
  rewardImageList,
  rewardCategoryList,
  kpiList,
  unitList,
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
  challengeCreationActions: bindActionCreators(
    challengeCreationActions,
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
)(withStyles(styles)(injectIntl(ChallengeDuplication)));
