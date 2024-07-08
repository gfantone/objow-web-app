import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Grid, IconButton} from '@material-ui/core';
import Formsy from 'formsy-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  ChallengeFormStepper,
  ChallengeRewardForm,
  ChallengeSearchBar
} from '../../components';
import {
  AppBarSubTitle,
  IconButton as MenuIconButton,
  Loader,
  MainLayoutComponent,
  Stepper,
  Dialog,
  DialogTitle,
  Select,
  DialogActions,
  ProgressButton,
  TextField,
  Button,
  I18nWrapper,
  Card, DefaultTitle, Collaborator, CollaboratorFilterAndSearchBar, TransferList,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import * as challengeAwardTypeListActions from '../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions';
import * as challengeRewardTypeListActions from '../../../../services/ChallengeRewardTypes/ChallengeRewardTypeList/actions';
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions';
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions';
import * as challengeCreationActions from '../../../../services/Challanges/ChallangeCreaton/actions';
import * as challengeDetailActions from '../../../../services/Challanges/ChallengeDetail/actions';
import * as challengeImageListActions from '../../../../services/ChallengeImages/ChallengeImageList/actions';
import * as challengeTypeListActions from '../../../../services/ChallengeTypes/ChallengeTypeList/actions';
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as rewardTypeListActions from '../../../../services/RewardTypes/RewardTypeList/actions';
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions';
import * as unitListActions from '../../../../services/Units/UnitList/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as teamGroupTreeAction from '../../../../services/TeamGroups/TeamGroupTree/actions';
import * as kpiCreationActions from '../../../../services/Kpis/KpiCreation/actions';
import _ from 'lodash';
import { toast } from 'react-toastify';

const styles = (theme) => {
  return {
    kpiDialog: {
      width: 900,
      maxWidth: 900,
    },
    teamDialog: {
      width: "90%",
      "& .MuiFormControlLabel-root": {
        marginLeft: 0,
      },
    },
    itemIcon: {
      position: 'relative',
      float: 'right',
      left: '-10px',
      bottom: '40px',
      marginTop: '-10px',
      zIndex: 40,
    },
    // addIcon: {
    //   color: theme.palette.primary.main,
    // },
    deleteIcon: {
      color: '#E50000',
    },
  }
};

class ChallengeCreation extends MainLayoutComponent {
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
    finalModel: {},
    configRewardOpen: false,
    currentAwards: [],
    participants: [],
    teamPersonalized: {
      name: '',
      lookup_id: '',
      collaborators: []
    },
    personalizedTeamOpen: false,
    teamPersonalizedSelect: -1,
    search: '',
    filterOpen: false,
    collaboratorFilterLoaded: false,
    resultSearch: [],
    teamSearch: -1,
    collaboratorSearch: -1,
    teamGroup: -1,
  };

  constructor(props) {
    super(props);
    this.props.challengeCreationActions.clearChallengeCreation();
    this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints();
    this.form = React.createRef();
  }

  getCollaborators = () => {
    const { teams } = this.props.teamList;
    return teams.map((t) => {
      if (t.collaborators.length > 0) {
        return { team: t.name, collaborators: t.collaborators }
      }
    })
  }

  handleAddGoal = () => {
    this.setState({
      ...this.state,
      goalAdding: 1,
    });
  };

  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    this.abortController = new AbortController();
    this.props.handleTitle(
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' })
    );
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'challenge.creation.title' })}
      />
    );
    // this.props.handleButtons(<MenuIconButton size={'small'} onClick={this.handleAddGoal.bind(this)}><FontAwesomeIcon icon={faPlus} /></MenuIconButton>)
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.categoryListActions.getActiveCategoryList();
    this.props.challengeAwardTypeListActions.getChallengeAwardTypeList();
    this.props.challengeRewardTypeListActions.getChallengeRewardTypeList();
    this.props.challengeImageListActions.getChallengeImageList();
    this.props.challengeTypeListActions.getUsableChallengeTypeList();
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.rewardImageListActions.getRewardImageList();
    this.props.kpiListActions.getKpiList();
    this.props.unitListActions.getUnitList();
    this.props.teamListActions.getTeamList({
      simpleCollaborators: true,
      nestedCollaborators: true,
      abortController: this.abortController,
    });
    this.props.teamGroupTreeAction.getTeamGroupTree();
    this.props.rewardTypeListActions.getRewardTypeList();
    this.props.rewardCategoryListActions.getActiveRewardCategoryList();
  }

  componentWillUnmount() {
    this.abortController.abort();
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

  getCurrentStep = () => {
    return this.state.steps.find((step) => step.active === true);
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
              description: model.goalDescription[i],
              kpi: model.kpi[i],
              target,
              points,
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
    const { types: awardTypes } = this.props.challengeAwardTypeList;
    this.setState({
      ...this.state,
      finalModel: Object.assign(this.state.finalModel, {
        awardType,
      }),
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
  setCustomImage = (customImage) => {
    this.setState({
      ...this.state,
      finalModel: Object.assign(this.state.finalModel, { customImage }),
    });
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

  onPersonalizedTeamOpen = () => {
    this.setState({
      ...this.state,
      teamPersonalized: {
        name: '',
        lookup_id: '',
        collaborators: []
      },
      search: '',
      resultSearch: [],
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
      search: '',
      resultSearch: [],
      personalizedTeamOpen: false
    })
  }

  onUpdateTeam = (teamId) => {
    const teams = this.state.participants
    if (!teams || !teams[teamId]) return
    this.setState({
      ...this.state,
      teamPersonalizedSelect: teamId,
      teamPersonalized: {
        name: teams[teamId].name || '',
        lookup_id: teams[teamId].lookup_id || '',
        collaborators: teams[teamId].collaborators || []
      },
      search: '',
      resultSearch: [],
      personalizedTeamOpen: true
    })
  };

  handleSearch = (newValue) => {
    if (!newValue) {
      this.setState({
        ...this.state,
        search: '',
        resultSearch: [],
      })
    } else {
      const result = []
      const collaborators = this.getCollaborators() || []
      collaborators.forEach((c) => {
        if (c && c.collaborators) {
          c.collaborators.forEach((c1) => {
            if (c1.firstname.toLowerCase().includes(newValue.toLowerCase())
              || c1.lastname.toLowerCase().includes(newValue.toLowerCase())) {
              // Check collaborator is already in team
              const index = this.state.teamPersonalized.collaborators.findIndex(c2 => c2.id === c1.id);
              let isAlreadyInTeam = false;
              this.state.participants.forEach((t) => {
                const i = t.collaborators.findIndex(tc => tc.id === c1.id);
                if (i !== -1) isAlreadyInTeam = true;
              })
              if (index === -1 && !isAlreadyInTeam) {
                result.push(c1);
              }
            }
          })
        }
      })
      this.setState({
        ...this.state,
        search: newValue,
        resultSearch: result,
      })
    }
  };

  selectedPersonalizedIds = (currentType) => {
    if (!currentType || currentType.code !== 'TP') return []
    let collaborator_ids = []
    this.state.participants.forEach((team) => {
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
    if (this.state.teamPersonalizedSelect !== -1 && this.state.participants[this.state.teamPersonalizedSelect]) {
      let newTeams = [...this.state.participants]
      newTeams[this.state.teamPersonalizedSelect] = team
      this.setParticipants(newTeams, () => {
        this.onPersonalizedTeamClose();
      });
    }
  }

  onTeamPersonalizedAdded = (team) => {
    let newTeams = [...this.state.participants]
    newTeams.push(team);
    this.setParticipants(newTeams, () => {
      this.onPersonalizedTeamClose();
    });
  }

  onDeleteTeam = (teamId) => {
    if (this.state.participants && this.state.participants[teamId]) {
      let newTeams = [...this.state.participants]
      newTeams.splice(teamId, 1);
      this.setParticipants(newTeams, () => {
        this.onPersonalizedTeamClose()
      });
    }
  };

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

  handleValidSubmit(model) {
    const currentStep = this.getCurrentStep();
    const nextStep = this.state.steps.find(
      (step) => step.order === currentStep.order + 1
    );
    const { types: rewardTypes } = this.props.challengeRewardTypeList;
    if (nextStep) {
      this.changeStep(model);
    } else {
      const { types } = this.props.challengeTypeList;
      const currentType = types.find(
        (t) => t.id === parseInt(_.get(this.state, 'finalModel.type'))
      );
      const finalModel = this.state.finalModel;
      finalModel.start.setHours(0, 0, 0, 0);
      finalModel.end.setHours(23, 59, 59, 0);
      const start = finalModel.start.toUTCJSON();
      const end = finalModel.end.toUTCJSON();

      const participants = (currentType.code !== 'TP') ? JSON.stringify(
        finalModel.participants.map((p) => ({ id: p.id }))
      ) : JSON.stringify(finalModel.participants);

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
      } else {
        challengeFormData.append('customImage', finalModel.image);
      }

      // Set custom image if exists
      const image = finalModel.image.id
        ? {
            image: finalModel.image,
          }
        : {
            customImage: finalModel.image,
          };
      const challenge = Object.assign(
        {
          name: finalModel.name,
          description: JSON.stringify(finalModel.description),
          start: start,
          end: end,
          type: finalModel.type,
          award_type: finalModel.awardType,
          reward_type: finalModel.rewardType,
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

  handleFilterClose() {
    this.setState({
      ...this.state,
      filterOpen: false,
    });
  }

  onCollaboratorFilterLoaded() {
    if (!this.state.collaboratorFilterLoaded) {
      this.setState({
        ...this.state,
        collaboratorFilterLoaded: true,
      });
    }
  }

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

  handleUpdateTeam(teamId) {
    this.onUpdateTeam(teamId);
  }

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
    const { images } = this.props.challengeImageList;
    const { images: rewardImages } = this.props.rewardImageList;
    const { categories: rewardCategories } = this.props.rewardCategoryList;
    const { period } = this.props.currentPeriodDetail;
    const { types } = this.props.challengeTypeList;
    const { loading } = this.props.challengeCreation;
    const { kpis } = this.props.kpiList;
    const { units } = this.props.unitList;
    const team = this.props.match.params.id;
    const { teams } = this.props.teamList;
    const { teamGroup } = this.props.teamGroupTree;
    const { account } = this.props.accountDetail;

    const currentType =
      _.get(this.state, 'finalModel.type') &&
      types.find(
        (t) =>
          t.id === parseInt(this.state.finalModel.type)
      );
    const criticities = [
      { order: 1, name: intl.formatMessage({ id: 'kpi.criticity.low' }) },
      { order: 2, name: intl.formatMessage({ id: 'kpi.criticity.medium' }) },
      { order: 3, name: intl.formatMessage({ id: 'kpi.criticity.high' }) },
    ];

    const currentRewardType =
      _.get(this.state, 'finalModel.rewardType') &&
      rewardTypes.find(
        (rewardType) =>
          rewardType.id === parseInt(this.state.finalModel.rewardType)
      );
    const awards =
      _.get(currentRewardType, 'code') === 'G'
        ? // gift awards should have reward
          this.state.currentAwards.filter((award) => !!award.reward)
        : this.state.finalModel.awards;

    const challenge = Object.assign({}, this.state.finalModel, {
      awards,
    });

    return (
      <div>
        <Stepper
          steps={this.state.steps.map((step) =>
            Object.assign({}, step, {
              name: intl.formatMessage({ id: step.name }),
            })
          )}
          handlePreviousStep={this.handlePreviousStep}
          handleNextStep={_.get(this.form, 'current.submit')}
          actionLoading={loading}
        />
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
                            isAlreadyUsedIn: this.state.participants
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
                            isAlreadyUsedIn: this.state.participants
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
                <Grid item xs={12}>
                  <TransferList
                    listIn={teamGroup}
                    teamGroupMode={currentType && currentType.code === 'TG'}
                    selectedPersonalizedIds={this.selectedPersonalizedIds(currentType) || []}
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
                    selected={this.state.teamPersonalized.collaborators}
                    defaultChoicesExpanded={false}
                    onUpdateTeam={this.handleUpdateTeam}
                    enableSearch
                  />
                </Grid>
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
        <Formsy
          ref={this.form}
          onValidSubmit={this.handleValidSubmit.bind(this)}
        >
          <ChallengeFormStepper
            actionLoading={loading}
            awardTypes={awardTypes}
            rewardTypes={rewardTypes}
            categories={categories}
            goalAdding={this.state.goalAdding}
            images={images}
            isCreation
            kpis={kpis}
            units={units}
            period={period}
            team={team}
            teams={teams.filter(
              (t) =>
                _.get(account, 'role.code') !== 'M' ||
                _.get(account, 'team.id') === t.id
            )}
            teamGroup={teamGroup}
            types={types}
            onGoalAdded={this.handleGoalAdded.bind(this)}
            currentStep={this.getCurrentStep()}
            isLastStep={this.isLastStep()}
            setStart={this.setStart}
            setEnd={this.setEnd}
            setType={this.setType}
            setCustomImage={this.setCustomImage}
            setParticipants={this.setParticipants}
            setAwardType={this.setAwardType}
            handlePreviousStep={this.handlePreviousStep}
            handleNextStep={_.get(this.form, 'current.submit')}
            handleAddGoal={this.handleAddGoal}
            challenge={challenge}
            setNewKpiOpen={this.setNewKpiOpen}
            setConfigRewardOpen={this.setConfigRewardOpen}
            rewardImages={rewardImages}
            rewardCategories={rewardCategories}
            awardError={this.state.awardError}
            onPersonalizedTeamOpen={this.onPersonalizedTeamOpen}
            onUpdateTeam={this.onUpdateTeam.bind(this)}
          />
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
    const { images, loading: challengeImageListLoading } =
      this.props.challengeImageList;

    const { types, loading: challengeTypeListLoading } =
      this.props.challengeTypeList;
    const { success, error } = this.props.challengeCreation;
    const { period, loading: currentPeriodDetailLoading } =
      this.props.currentPeriodDetail;
    const { kpis, loading: kpiListLoading } = this.props.kpiList;
    const { teams, loading: teamLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupsLoading } = this.props.teamGroupTree;
    const loading =
      categoryListLoading ||
      challengeAwardTypeListLoading ||
      challengeImageListLoading ||
      challengeTypeListLoading ||
      currentPeriodDetailLoading ||
      kpiListLoading ||
      teamLoading ||
      challengeRewardTypeListLoading ||
      teamGroupsLoading;

    const { account } = this.props.accountDetail;

    if (!account.hasChallengeAccess) {
      return <Redirect to={'/'} />;
    }

    if (success) {
      this.props.challengeCreationActions.clearChallengeCreation();
      this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints();
      this.props.history.goBack();
      toast.success(intl.formatMessage({ id: 'challenge.creation.success' }));
    }
    if (error) {
      this.props.challengeCreationActions.clearChallengeCreation();
      toast.error(intl.formatMessage({ id: 'challenge.creation.success' }));
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
          teams &&
          this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  categoryList,
  challengeAwardTypeList,
  challengeRewardTypeList,
  rewardTypeList,
  challengeCreation,
  challengeImageList,
  challengeTypeList,
  currentPeriodDetail,
  kpiList,
  unitList,
  rewardImageList,
  rewardCategoryList,
  teamList,
  teamGroupTree,
}) => ({
  categoryList,
  accountDetail,
  challengeAwardTypeList,
  challengeRewardTypeList,
  rewardTypeList,
  challengeCreation,
  challengeImageList,
  challengeTypeList,
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
  kpiCreationActions: bindActionCreators(kpiCreationActions, dispatch),
  rewardImageListActions: bindActionCreators(rewardImageListActions, dispatch),
  rewardCategoryListActions: bindActionCreators(
    rewardCategoryListActions,
    dispatch
  ),
  rewardTypeListActions: bindActionCreators(rewardTypeListActions, dispatch),
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(ChallengeCreation)));
