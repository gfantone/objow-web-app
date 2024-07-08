import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { CategoryIconInput } from '../../components';
import {
  AppBarSubTitle,
  Card,
  Loader,
  ProgressButton,
  TextField,
  Stepper,
} from '../../../../components';
import { BadgeFormStepper } from './components';
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions';
import * as badgeIconListActions from '../../../../services/BadgeIcons/BadgeIconList/actions';
import * as levelListActions from '../../../../services/Levels/LevelList/actions';
import * as badgeCreationActions from '../../../../services/Badges/BadgeCreation/actions';
import * as badgeLevelRemainingPointsActions from '../../../../services/BadgeLevels/BadgeLevelRemainingPoints/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as teamGroupTreeAction from '../../../../services/TeamGroups/TeamGroupTree/actions';

import { injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

class AdminBadgeCreation extends Component {
  state = {
    steps: [
      { order: 1, name: 'KPI', active: true },
      { order: 2, name: 'Informations' },
      { order: 3, name: 'Participants' },
      { order: 4, name: 'Paliers' },
      // { order: 4, name: 'Configuration'},
      // { order: 5, name: 'Options'},
      { order: 5, name: 'Validation' },
    ],
    finalModel: {},
  };
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }
  componentDidMount() {
    const { intl } = this.props;
    const periodId = this.props.match.params.periodId;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'badge.creation.badge_creation' })}
      />
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.categoryListActions.getActiveCategoryList();
    this.props.kpiListActions.getKpiList();
    this.props.badgeIconListActions.getUsableList();
    this.props.levelListActions.getLevelList(periodId);
    this.props.badgeLevelRemainingPointsActions.getBadgeLevelRemainingPoints(
      periodId
    );
    this.props.teamListActions.getTeamList({
      simpleCollaborators: true,
      nestedCollaborators: true,
    });
    this.props.teamGroupTreeAction.getTeamGroupTree();
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

  renderLoader() {
    return <Loader centered />;
  }

  changeStep(model) {
    const currentStep = this.getCurrentStep();

    const badgeLevels = model.target
      ? model.target.map((target, index) => {
          return {
            rank: index + 1,
            target: model.target[index]
              ? parseInt(model.target[index])
              : model.target[index],
            level: model.level[index]
              ? parseInt(model.level[index])
              : model.level[index],
            points: model.points[index]
              ? parseInt(model.points[index])
              : model.points[index],
          };
        })
      : null;

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
      finalModel: Object.assign(this.state.finalModel, model, {
        levels: badgeLevels || this.state.finalModel.levels,
      }),
    });
  }

  onSubmit(model) {
    const periodId = this.props.match.params.periodId;
    const currentStep = this.getCurrentStep();
    const nextStep = this.state.steps.find(
      (step) => step.order === currentStep.order + 1
    );
    if (nextStep) {
      this.changeStep(model);
    } else {
      // Create badge
      this.props.badgeCreationActions.createBadge(
        Object.assign(this.state.finalModel, { periodId })
      );
    }
  }

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

  getCurrentStep = () => {
    return this.state.steps.find((step) => step.active === true);
  };

  isLastStep = () => {
    const currentStep = this.getCurrentStep();
    return currentStep.order >= this.state.steps.length;
  };

  renderForm() {
    const { intl } = this.props;
    const { categories, loading: categoryListLoading } =
      this.props.categoryList;
    const { kpis, loading: kpiListLoading } = this.props.kpiList;
    const { icons } = this.props.badgeIconList;
    const { levels } = this.props.levelList;
    const { loading, success } = this.props.badgeCreation;
    const { points } = this.props.badgeLevelRemainingPoints;
    const { teamGroup } = this.props.teamGroupTree;
    const { teamList } = this.props.teamGroupTree;

    if (success) {
      this.props.badgeCreationActions.clearBadgeCreate();
      this.props.history.goBack();
      toast.success(intl.formatMessage({ id: 'badge.creation.success' }));
    }

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
        <Formsy ref={this.form} onValidSubmit={this.onSubmit.bind(this)}>
          <BadgeFormStepper
            badge={this.state.finalModel}
            currentStep={this.getCurrentStep()}
            isLastStep={this.isLastStep()}
            handlePreviousStep={this.handlePreviousStep}
            handleNextStep={_.get(this.form, 'current.submit')}
            categories={categories}
            kpis={kpis}
            icons={icons}
            levels={levels}
            loading={loading}
            setParticipants={this.setParticipants}
            remainingPoints={points}
            teamGroup={teamGroup}
          />
        </Formsy>
      </div>
    );
  }

  render() {
    const { categories, loading: categoryListLoading } =
      this.props.categoryList;
    const { kpis, loading: kpiListLoading } = this.props.kpiList;
    const { icons, loading: iconsLoading } = this.props.badgeIconList;
    const { levels, loading: levelListLoading } = this.props.levelList;
    const { teams, loading: teamsLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupsLoading } = this.props.teamGroupTree;

    const { points, loading: badgeLevelRemainingPointsLoading } =
      this.props.badgeLevelRemainingPoints;

    const loading =
      kpiListLoading ||
      categoryListLoading ||
      iconsLoading ||
      levelListLoading ||
      badgeLevelRemainingPointsLoading ||
      teamGroupsLoading ||
      teamsLoading;
    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && categories && kpis && icons && this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({
  kpiList,
  categoryList,
  badgeIconList,
  levelList,
  badgeCreation,
  badgeLevelRemainingPoints,
  teamGroupTree,
  teamList,
}) => ({
  kpiList,
  categoryList,
  badgeIconList,
  levelList,
  badgeCreation,
  badgeLevelRemainingPoints,
  teamGroupTree,
  teamList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
  kpiListActions: bindActionCreators(kpiListActions, dispatch),
  badgeIconListActions: bindActionCreators(badgeIconListActions, dispatch),
  levelListActions: bindActionCreators(levelListActions, dispatch),
  badgeCreationActions: bindActionCreators(badgeCreationActions, dispatch),
  badgeLevelRemainingPointsActions: bindActionCreators(
    badgeLevelRemainingPointsActions,
    dispatch
  ),
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
  teamListActions: bindActionCreators(teamListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AdminBadgeCreation));
