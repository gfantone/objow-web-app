import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Formsy from 'formsy-react';
import { SubHeader } from './components';
import {
  Card,
  DefaultText,
  ErrorText,
  DefaultTitle,
  IconButton as AppBarIconButton,
  InfoText,
  LabelText,
  MainLayoutComponent,
  ProgressButton,
  Button,
  Select,
  TextField,
  HiddenInput,
  Dialog,
  DialogTitle,
  DialogActions,
  TransferList,
} from '../../../../components';
import { CategoryIconInput } from '../../components';
import { Participants } from '../../../Challenges/components/ChallengeForm/components';
import * as badgeDetailActions from '../../../../services/Badges/BadgeDetail/actions';
import * as badgeLevelListActions from '../../../../services/BadgeLevels/BadgeLevelList/actions';
import * as badgeLevelListCreationActions from '../../../../services/BadgeLevels/BadgeLevelListCreation/actions';
import * as badgeLevelListRemovingActions from '../../../../services/BadgeLevels/BadgeLevelListRemoving/actions';
import * as badgeLevelListUpdateActions from '../../../../services/BadgeLevels/BadgeLevelListUpdate/actions';
import * as badgeLevelRemainingPointsActions from '../../../../services/BadgeLevels/BadgeLevelRemainingPoints/actions';
import * as badgeIconListActions from '../../../../services/BadgeIcons/BadgeIconList/actions';
import * as badgeUpdateActions from '../../../../services/Badges/BadgeUpdate/actions';
import * as levelListActions from '../../../../services/Levels/LevelList/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as teamGroupTreeAction from '../../../../services/TeamGroups/TeamGroupTree/actions';
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import '../../../../helpers/FormsyHelper';
import '../../../../helpers/NumberHelper';
import { injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import { toast } from 'react-toastify';
import _ from 'lodash';

const styles = {
  kpiDialog: {
    width: 900,
    maxWidth: 900,
  },
};

class AdminBadgeDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.id = null;
    this.initialized = false;
    this.state = {
      levels: [],
    };
    const periodId = this.props.match.params.periodId;
    this.removed_level_ids = [];
    this.props.badgeLevelListCreationActions.clearBadgeLevelListCreation();
    this.props.badgeLevelListRemovingActions.clearBadgeLevelListRemoving();
    this.props.badgeLevelListUpdateActions.clearBadgeLevelListUpdate();
    this.props.badgeUpdateActions.clearBadgeUpdate();
    this.props.badgeLevelRemainingPointsActions.getBadgeLevelRemainingPoints(
      periodId,
    );
  }

  handleAdd() {
    var levels = this.state.levels;
    levels.push({
      rank: null,
      target: 0,
      points: 0,
      badge: this.id,
      level: null,
      percentage: 0,
      isNew: true,
    });
    this.setState({
      ...this.state,
      levels: levels,
    });
  }

  handleRemove = (index) => () => {
    var levels = this.state.levels;
    const removedLevel = levels[index];
    levels.splice(index, 1);
    if (removedLevel.id) {
      this.removed_level_ids.push(removedLevel.id);
    }
    this.setState({
      ...this.state,
      levels: levels,
    });
  };

  handleSubmit() {
    const model = this.refs.form.getModel();
    const participants = this.state.newParticipants
      ? {
          participants: JSON.stringify(
            this.state.newParticipants.map((p) => ({ id: p.id })),
          ),
        }
      : {};
    var levels = this.state.levels;

    levels.map((level) => {
      const index = levels.indexOf(level);
      level.rank = index + 1;
      level.target = model.target[index];
      level.level = model.level[index];
      level.points = model.points[index];
    });
    const oldLevels = levels.filter((level) => !level.isNew);
    const newLevels = levels.filter((level) => level.isNew);
    this.props.badgeLevelListCreationActions.createBadgeLevelList(newLevels);
    this.props.badgeLevelListUpdateActions.updateBadgeLevelList(oldLevels);
    this.props.badgeLevelListRemovingActions.removeBadgeLevelList(
      this.removed_level_ids,
    );
    this.props.badgeUpdateActions.updateBadge(
      this.id,
      Object.assign(model, participants),
    );
  }

  componentDidMount() {
    const periodId = this.props.match.params.periodId;
    this.id = this.props.match.params.id;
    this.props.handleTitle('Administration');
    this.props.handleSubHeader(<SubHeader />);
    this.props.handleMaxWidth('md');
    this.props.handleButtons(
      <AppBarIconButton size="small" onClick={this.handleAdd.bind(this)}>
        <FontAwesomeIcon icon={faPlus} />
      </AppBarIconButton>,
    );
    this.props.activateReturn();
    this.props.teamListActions.getTeamList();
    this.props.teamGroupTreeAction.getTeamGroupTree();
    this.props.levelListActions.getLevelList(periodId);
    this.props.categoryListActions.getActiveCategoryList();
    this.props.badgeIconListActions.getUsableListForBadge(this.id);
    this.props.badgeLevelListActions.getBadgeLevelList(this.id);
    this.props.badgeDetailActions.getBadgeDetail(this.id);
    this.props.badgeLevelRemainingPointsActions.getBadgeLevelRemainingPoints(
      periodId,
    );
  }

  componentWillReceiveProps(props) {
    const { levels } = props.badgeLevelList;
    if (!this.initialized && levels) {
      this.initialized = true;
      var points = 0;
      levels.map((level) => {
        level.badge = level.badge.id;
        points += level.points;
      });
      this.setState({
        ...this.state,
        levels: levels,
        points: points,
      });
    }
  }

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

  renderData() {
    const { intl } = this.props;
    const { badge } = this.props.badgeDetail;
    const { levels } = this.props.levelList;
    const { teams } = this.props.teamList;
    const { categories } = this.props.categoryList;
    const { icons, loading: iconsLoading } = this.props.badgeIconList;
    const { points: remainingPoints } = this.props.badgeLevelRemainingPoints;
    const { loading: badgeLevelListCreationLoading } =
      this.props.badgeLevelListCreation;
    const { loading: badgeLevelListRemovingLoading } =
      this.props.badgeLevelListRemoving;
    const { loading: badgeLevelListUpdateLoading } =
      this.props.badgeLevelListUpdate;
    const { loading: badgeUpdateLoading } = this.props.badgeUpdate;
    const { teamGroup, loading: teamGroupsLoading } = this.props.teamGroupTree;
    const loading =
      badgeLevelListCreationLoading ||
      badgeLevelListRemovingLoading ||
      badgeLevelListUpdateLoading ||
      badgeUpdateLoading;
    const isDefault = !!badge.code;

    const currentRemainingPoints =
      remainingPoints -
      _.sum(
        this.state.levels.map((level) =>
          level.percentage === 0 ? parseInt(level.points) || 0 : 0,
        ),
      );

    const newParticipants = _.get(this.state, 'newParticipants');

    return (
      <Formsy ref="form" onValidSubmit={this.handleSubmit.bind(this)}>
        <Grid container spacing={4} justify="center">
          <Grid item xs={12}>
            <Card>
              <InfoText>Points restants à attribuer</InfoText>
              <DefaultText>{currentRemainingPoints} pts</DefaultText>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle>Informations générales</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name={'publicTitle'}
                          label={'Titre'}
                          initial={badge.publicTitle}
                          fullWidth
                          disabled={isDefault}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name={'privateTitle'}
                          label={'Sous-titre'}
                          initial={badge.privateTitle}
                          fullWidth
                          disabled={isDefault}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name={'description'}
                          label={'Description'}
                          initial={badge.description}
                          fullWidth
                        />
                      </Grid>
                      {!isDefault && (
                        <Grid item xs={12}>
                          <Select
                            name="category"
                            initial={_.get(badge, 'category.id')}
                            label={intl.formatMessage({
                              id: 'admin.goal.category_label',
                            })}
                            options={categories}
                            optionValueName="id"
                            optionTextName="name"
                            fullWidth
                            required
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
          {!isDefault && (
            <React.Fragment>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <DefaultTitle>Kpi</DefaultTitle>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Grid container direction="column" spacing={2}>
                            <Grid item>
                              <Select
                                name="kpiCategory"
                                emptyText={intl.formatMessage({
                                  id: 'filter.all_category_label',
                                })}
                                label={intl.formatMessage({
                                  id: 'admin.goal.category_label',
                                })}
                                options={categories}
                                optionValueName="id"
                                optionTextName="name"
                                fullWidth
                                disabled
                              />
                            </Grid>
                            {_.get(badge, 'kpi.id') && (
                              <Grid item>
                                <Select
                                  name="kpi"
                                  label={intl.formatMessage({
                                    id: 'admin.goal.kpi_label',
                                  })}
                                  initial={_.get(badge, 'kpi.id')}
                                  options={[_.get(badge, 'kpi')]}
                                  optionValueName="id"
                                  optionTextName="name"
                                  fullWidth
                                  required
                                  disabled
                                />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Grid container direction="column" spacing={2}>
                            <Grid item>
                              <InfoText>
                                {intl.formatMessage({
                                  id: 'admin.goal.unit_label',
                                })}
                              </InfoText>
                              <DefaultText lowercase style={{ minHeight: 19 }}>
                                {_.get(badge, 'kpi.unit.name')}
                              </DefaultText>
                            </Grid>
                            <Grid item>
                              <InfoText>
                                {intl.formatMessage({
                                  id: 'admin.goal.periodicity_label',
                                })}
                              </InfoText>
                              <DefaultText lowercase style={{ minHeight: 19 }}>
                                {_.get(badge, 'kpi.periodicity.description')}
                              </DefaultText>
                            </Grid>
                            <Grid item>
                              <InfoText>
                                {intl.formatMessage({
                                  id: 'admin.goal.kpi_format_label',
                                })}
                              </InfoText>

                              <DefaultText lowercase style={{ minHeight: 19 }}>
                                {_.get(badge, 'kpi.manual')
                                  ? 'Manuel'
                                  : 'Automatique'}
                              </DefaultText>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <DefaultTitle>Icone</DefaultTitle>
                    </Grid>
                    <Grid item xs={12}>
                      <Card>
                        <CategoryIconInput
                          name="icon"
                          label="Icône"
                          icons={[icons]}
                          initial={_.get(badge, 'icon.id')}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Participants
                  participants={newParticipants || badge.participants}
                  teams={teams}
                  handleChangeParticipants={this.handleChangeParticipants}
                  setParticipantsEditOpen={this.setParticipantsEditOpen}
                />
              </Grid>
            </React.Fragment>
          )}
          {this.state.levels.map((level, index) => {
            const number = index + 1;
            const disabled = level.percentage > 0;
            const removeButtonVisibility = disabled ? 'collapse' : 'visible';
            return (
              <Grid key={level.id} item container xs={12} spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle>Rang {number}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <TextField
                          type="number"
                          name={`target[${index}]`}
                          label="Objectif"
                          initial={level.target}
                          disabled={disabled}
                          fullWidth
                          required
                          validations="isMoreThanOrEquals:0"
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                            isMoreThanOrEquals:
                              "L'objectif doit être supérieur ou égal à 0",
                          }}
                        />
                      </Grid>
                      <Grid item xs>
                        <Select
                          name={`level[${index}]`}
                          label="Condition"
                          options={levels}
                          optionValueName="id"
                          optionTextName="number"
                          optionTextPrefix="Lvl "
                          initial={level.level}
                          disabled={disabled}
                          fullWidth
                          required
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                          }}
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          type="number"
                          name={`points[${index}]`}
                          label="Nbre de point si atteint"
                          initial={level.points}
                          disabled={disabled}
                          fullWidth
                          required
                          onChange={(value) => {
                            this.setState({
                              ...this.state,
                              levels: this.state.levels.map(
                                (level, currentIndex) => {
                                  if (index === currentIndex) {
                                    return Object.assign({}, level, {
                                      points: value,
                                    });
                                  }
                                  return level;
                                },
                              ),
                            });
                          }}
                          validations="isMoreThanOrEquals:0"
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                            isMoreThanOrEquals:
                              'Le nombre de points doit être supérieur ou égal à 0',
                          }}
                        />
                      </Grid>
                      <Grid item xs>
                        <LabelText noWrap>
                          % de joueur l'ayant atteint
                        </LabelText>
                        <InfoText>
                          {level.percentage.toFullPercentage()} %
                        </InfoText>
                      </Grid>
                      <Grid item style={{ visibility: removeButtonVisibility }}>
                        <IconButton
                          size="small"
                          style={{ marginTop: 16 }}
                          onClick={this.handleRemove(index).bind(this)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            );
          })}
          <Grid item>
            <ErrorText lowercase>
              <HiddenInput
                name="maxPoints"
                validations="isMoreThanOrEquals:0"
                validationErrors={{
                  isMoreThanOrEquals:
                    'Les points alloués aux rangs ne doivent pas excéder le nombre de points disponibles',
                }}
                value={currentRemainingPoints}
              />
            </ErrorText>
          </Grid>
          <Grid item xs={12}>
            <ProgressButton
              type={'submit'}
              text={intl.formatMessage({ id: 'common.submit' })}
              centered
              loading={loading}
            />
          </Grid>
        </Grid>
      </Formsy>
    );
  }

  render() {
    const { intl } = this.props;
    const { badge, loading: badgeDetailLoading } = this.props.badgeDetail;
    const { levels: badgeLevels, loading: badgeLevelListLoading } =
      this.props.badgeLevelList;
    const { points, loading: badgeLevelRemainingPointsLoading } =
      this.props.badgeLevelRemainingPoints;
    const { success: badgeLevelListCreationSuccess } =
      this.props.badgeLevelListCreation;
    const { success: badgeLevelListRemovingSuccess } =
      this.props.badgeLevelListRemoving;
    const { success: badgeLevelListUpdateSuccess } =
      this.props.badgeLevelListUpdate;
    const { success: badgeUpdateSuccess } = this.props.badgeUpdate;
    const { levels, loading: levelListLoading } = this.props.levelList;
    const { teams, loading: teamListLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupsLoading } = this.props.teamGroupTree;
    const { categories, loading: categoryListLoading } =
      this.props.categoryList;
    const { icons, loading: iconsLoading } = this.props.badgeIconList;

    const loading =
      badgeDetailLoading ||
      badgeLevelListLoading ||
      levelListLoading ||
      badgeLevelRemainingPointsLoading ||
      iconsLoading ||
      teamListLoading ||
      categoryListLoading ||
      teamGroupsLoading;

    if (
      badgeLevelListCreationSuccess &&
      badgeLevelListUpdateSuccess &&
      badgeLevelListRemovingSuccess &&
      badgeUpdateSuccess
    ) {
      this.props.badgeLevelListCreationActions.clearBadgeLevelListCreation();
      this.props.badgeLevelListUpdateActions.clearBadgeLevelListUpdate();
      this.props.badgeLevelListRemovingActions.clearBadgeLevelListRemoving();
      this.props.badgeUpdateActions.clearBadgeUpdate();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' }),
      );
      this.props.history.goBack();
    }

    const newParticipants = _.get(this.state, 'newParticipants');

    return (
      <div>
        {!loading &&
          badge &&
          badgeLevels &&
          levels &&
          points != null &&
          teams &&
          icons &&
          categories && (
            <React.Fragment>
              {this.renderData()}
              {!badge.code && (
                <Dialog
                  open={this.state.participantsEditOpen}
                  onClose={() => this.setParticipantsEditOpen(false)}
                  classes={{ paper: this.props.classes.kpiDialog }}
                >
                  <Formsy onValidSubmit={this.handleSubmitParticipants}>
                    <Grid container spacing={1} direction="column">
                      <Grid item style={{ paddingTop: 0 }}>
                        <DialogTitle>
                          {intl.formatMessage({
                            id: 'challenge.update.edit_participants',
                          })}
                        </DialogTitle>
                      </Grid>
                      <Grid item>
                        <TransferList
                          listIn={teamGroup}
                          enableCollaboratorSelect={true}
                          enableTeamSelect={true}
                          onChange={this.handleChangeParticipants}
                          selected={
                            newParticipants || _.get(badge, 'participants')
                          }
                        />
                      </Grid>
                      <Grid item>
                        <DialogActions>
                          <ProgressButton
                            type="submit"
                            text={intl.formatMessage({ id: 'common.submit' })}
                            centered
                          />
                          <Button
                            onClick={() => this.setParticipantsEditOpen(false)}
                            color="secondary"
                          >
                            {intl.formatMessage({ id: 'common.cancel' })}
                          </Button>
                        </DialogActions>
                      </Grid>
                    </Grid>
                  </Formsy>
                </Dialog>
              )}
            </React.Fragment>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({
  badgeDetail,
  badgeLevelList,
  badgeIconList,
  badgeLevelListCreation,
  badgeLevelListRemoving,
  badgeLevelListUpdate,
  badgeLevelRemainingPoints,
  badgeUpdate,
  levelList,
  teamGroupTree,
  teamList,
  categoryList,
}) => ({
  badgeDetail,
  badgeLevelList,
  badgeIconList,
  badgeLevelListCreation,
  badgeLevelListRemoving,
  badgeLevelListUpdate,
  badgeLevelRemainingPoints,
  badgeUpdate,
  levelList,
  categoryList,
  teamGroupTree,
  teamList,
});

const mapDispatchToProps = (dispatch) => ({
  badgeDetailActions: bindActionCreators(badgeDetailActions, dispatch),
  badgeLevelListActions: bindActionCreators(badgeLevelListActions, dispatch),
  badgeIconListActions: bindActionCreators(badgeIconListActions, dispatch),
  badgeLevelListCreationActions: bindActionCreators(
    badgeLevelListCreationActions,
    dispatch,
  ),
  badgeLevelListRemovingActions: bindActionCreators(
    badgeLevelListRemovingActions,
    dispatch,
  ),
  badgeLevelListUpdateActions: bindActionCreators(
    badgeLevelListUpdateActions,
    dispatch,
  ),
  badgeLevelRemainingPointsActions: bindActionCreators(
    badgeLevelRemainingPointsActions,
    dispatch,
  ),
  badgeUpdateActions: bindActionCreators(badgeUpdateActions, dispatch),
  levelListActions: bindActionCreators(levelListActions, dispatch),
  teamListActions: bindActionCreators(teamListActions, dispatch),
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(injectIntl(AdminBadgeDetail)));
