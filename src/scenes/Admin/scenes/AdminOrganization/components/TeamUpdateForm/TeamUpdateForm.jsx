import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  AppBarSubTitle,
  HiddenInput,
  Card,
  ColorInput,
  DefaultTitle,
  Loader,
  MainLayoutComponent,
  Select,
  TextField,
  ProgressButton,
  Avatar,
} from '../../../../../../components';
import * as collaboratorListActions from '../../../../../../services/Collaborators/CollaboratorList/actions';
import * as colorListActions from '../../../../../../services/Colors/ColorList/actions';
import * as managerListActions from '../../../../../../services/Managers/ManagerList/actions';
import * as teamGroupListActions from '../../../../../../services/TeamGroups/TeamGroupList/actions';
import * as superManagerListActions from '../../../../../../services/SuperManagers/SuperManagerList/actions';
import * as teamDetailActions from '../../../../../../services/Teams/TeamDetail/actions';
import * as teamUpdateActions from '../../../../../../services/Teams/TeamUpdate/actions';
import * as teamRemovingActions from '../../../../../../services/Teams/TeamRemoving/actions';
import * as Resources from '../../../../../../Resources';
import { injectIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  photo: {
    width: 48,
    height: 48,
  },
};

class TeamUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.id = null;
    this.initialized = false;
    this.collaborators = [];
    this.state = {
      color: null,
      collaborators: [],
    };
    this.props.teamUpdateActions.clearTeamUpdate();
    this.props.teamRemovingActions.clearTeamRemoving();
  }

  getManagers() {
    var { managers } = this.props.managerList;
    const { superManagers: superManagersList } = this.props.superManagerList;
    const superManagers = superManagersList.filter(
      (collaborator) => !this.state.collaborators.includes(collaborator.id),
    );
    const team = this.props.team;

    const isTeam = team.type === 'team';
    let newManagers = [];

    if (isTeam) {
      newManagers = [...managers];
    } else {
      newManagers = [...superManagers];
    }

    if (team && team.manager) {
      return [team.manager, ...newManagers];
    }
    return newManagers;
  }

  handleCollaboratorChange = (index) => (value) => {
    var collaborators = this.props.form.getModel().collaborators;
    collaborators[index] = Number(value);
    collaborators = collaborators.filter((x) => x != -1);

    this.setState({
      ...this.state,
      collaborators: collaborators,
    });
  };

  handleRemoveCollaborator = (index) => () => {
    var collaborators = this.state.collaborators;
    collaborators.splice(index, 1);
    this.setState({
      ...this.state,
      collaborators: collaborators,
    });
  };

  handleRemoveTeam = () => {
    this.props.teamRemovingActions.removeTeam(this.props.match.params.id);
  };

  componentDidMount() {
    this.props.collaboratorListActions.getFreeCollaboratorList();
    this.props.colorListActions.getFreeColorList();
    this.props.managerListActions.getFreeManagerList();
    this.props.superManagerListActions.getFreeSuperManagerList();
    this.props.teamGroupListActions.getTeamGroupList();
  }

  componentWillReceiveProps(props) {
    const { collaborators } = props.collaboratorList;
    const { superManagers } = props.superManagerList;
    const team = props.team;
    if (!this.initialized && collaborators && superManagers && team) {
      const collaboratorIds = _.get(team, 'collaborators', []).map((c) => c.id);
      this.initialized = true;
      const collaboratorList =
        team.type === 'team' ? collaborators : superManagers;
      this.collaborators = collaboratorList.concat(team.collaborators);
      this.setState({
        ...this.state,
        color: _.get(team, 'color.id'),
        collaborators: collaboratorIds,
      });
    }
  }

  setReservedManager = (newValue) => {
    this.setState({
      ...this.state,
      reservedManager: newValue,
    });
  };

  renderLoader() {
    return <Loader centered />;
  }

  renderCollaboratorSelector(index, id = null) {
    const { intl } = this.props;
    const { classes } = this.props;
    // var collaborators = [...this.collaborators];
    const { superManagers: superManagersList } = this.props.superManagerList;

    const team = this.props.team;
    const isTeam = team.type === 'team';

    const ids = this.state.collaborators.filter((x) => x != id);
    const collaboratorList = this.collaborators;

    const collaborator = _.get(
      collaboratorList.filter((c) => c && c.id == id),
      '[0]',
    );
    var photo = id ? collaborator.photo : null;

    const collaborators = collaboratorList.filter(
      (collaborator) =>
        collaborator &&
        !ids.includes(collaborator.id) &&
        collaborator.id !== parseInt(this.state.reservedManager),
    );
    photo = photo ? photo : '/assets/img/user/avatar.svg';

    return (
      <Grid key={id ? id : 'new'} item xs={6}>
        <Card>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item>
              <Avatar
                className={classes.photo}
                src={photo}
                entityId={_.get(collaborator, 'id')}
                fallbackName={_.get(collaborator, 'fullname')}
              />
            </Grid>
            <Grid item xs>
              <Select
                name={`collaborators[${index}]`}
                label={intl
                  .formatMessage({
                    id: isTeam
                      ? 'team.form.collaborator'
                      : 'team_group.form.user',
                  })
                  .format(index + 1)}
                options={collaborators}
                initial={id ? id : null}
                onChange={this.handleCollaboratorChange(index)}
                optionValueName="id"
                optionTextName="fullname"
                fullWidth
              />
            </Grid>
            {id && (
              <Grid item>
                <IconButton
                  size="small"
                  onClick={this.handleRemoveCollaborator(index).bind(this)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Card>
      </Grid>
    );
  }

  renderData() {
    const { intl } = this.props;
    const { loading } = this.props.teamUpdate;
    const { teamRemovingLoading } = this.props.teamRemoving;
    var { colors: initialColors } = this.props.colorList;
    const { teamGroups } = this.props.teamGroupList;
    const managers = this.getManagers();
    const team = this.props.team;
    const collaboratorCount = this.state.collaborators.length;
    const hasCollaborators = collaboratorCount > 0;
    let colors = [...initialColors];
    if (team && !colors.includes(team.color)) {
      colors = [team.color, ...colors];
      // colors.splice(0, 0, team.color)
    }

    const isTeam = team.type === 'team';
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div>
            <HiddenInput name="type" value={_.get(team, 'type')} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        name="name"
                        label={intl.formatMessage({ id: 'team.form.name' })}
                        initial={team.name}
                        fullWidth
                        required
                        lowercase
                        validationErrors={{
                          isDefaultRequiredValue: intl.formatMessage({
                            id: 'common.form.required_error',
                          }),
                        }}
                      />
                    </Grid>
                    {team.parent && (
                      <Grid item xs={6}>
                        <Select
                          name="manager"
                          label={
                            isTeam
                              ? intl.formatMessage({ id: 'team.form.manager' })
                              : intl.formatMessage({
                                  id: 'team_group.form.super_manager',
                                })
                          }
                          initial={team.manager ? team.manager.id : null}
                          options={managers}
                          optionValueName="id"
                          optionTextName="fullname"
                          onChange={this.setReservedManager}
                          fullWidth
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                          }}
                        />
                      </Grid>
                    )}
                    {team.parent && (
                      <Grid item xs={6}>
                        <Select
                          name="parent"
                          label={intl.formatMessage({ id: 'team.form.parent' })}
                          initial={
                            isTeam
                              ? _.get(team, 'parent.id')
                              : _.get(team, 'parent')
                          }
                          emptyDisabled
                          options={teamGroups.filter(
                            (teamGroup) => isTeam || teamGroup.id !== team.id,
                          )}
                          optionValueName="id"
                          optionTextName="name"
                          fullWidth
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                          }}
                        />
                      </Grid>
                    )}

                    <Grid item xs={6}>
                      <TextField
                        name="lookup_id"
                        label={intl.formatMessage({ id: 'team.form.id' })}
                        placeholder={team.id}
                        initial={team.lookup_id}
                        fullWidth
                        lowercase
                      />
                    </Grid>
                    {_.get(team, 'type') === 'team' && (
                      <Grid item xs={12}>
                        <ColorInput
                          name="color"
                          label={intl.formatMessage({ id: 'team.form.color' })}
                          initial={team.color.id}
                          colors={colors}
                          required
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DefaultTitle>
                  {isTeam
                    ? intl.formatMessage({ id: 'team.form.collaborators' })
                    : intl.formatMessage({ id: 'team_group.form.users' })}
                </DefaultTitle>
              </Grid>
              {this.state.collaborators.map((collaborator, index) => {
                return this.renderCollaboratorSelector(index, collaborator);
              })}
              {this.renderCollaboratorSelector(collaboratorCount)}
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { collaborators, loading: collaboratorListLoading } =
      this.props.collaboratorList;
    const { colors, loading: colorListLoading } = this.props.colorList;
    const { teamGroups, teamGroupsLoading } = this.props.teamGroupList;
    const { managers, loading: managerListLoading } = this.props.managerList;
    const { superManagers, loading: superManagerListLoading } =
      this.props.superManagerList;
    const { success: teamUpdateSuccess } = this.props.teamUpdate;
    const { success: teamRemovingSuccess } = this.props.teamRemoving;
    const loading =
      collaboratorListLoading ||
      colorListLoading ||
      managerListLoading ||
      superManagerListLoading ||
      teamGroupsLoading;
    const success = teamUpdateSuccess || teamRemovingSuccess;
    const team = this.props.team;
    // console.log(team);
    // if (success) {
    //     this.props.teamUpdateActions.clearTeamUpdate();
    //     this.props.teamRemovingActions.clearTeamRemoving();
    //     this.props.history.goBack()
    // }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading &&
          collaborators &&
          colors &&
          superManagers &&
          managers &&
          team &&
          teamGroups &&
          this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  collaboratorList,
  colorList,
  managerList,
  teamDetail,
  teamUpdate,
  teamRemoving,
  teamGroupList,
  superManagerList,
}) => ({
  collaboratorList,
  colorList,
  managerList,
  superManagerList,
  teamDetail,
  teamGroupList,
  teamUpdate,
  teamRemoving,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorListActions: bindActionCreators(
    collaboratorListActions,
    dispatch,
  ),
  colorListActions: bindActionCreators(colorListActions, dispatch),
  managerListActions: bindActionCreators(managerListActions, dispatch),
  superManagerListActions: bindActionCreators(
    superManagerListActions,
    dispatch,
  ),
  teamDetailActions: bindActionCreators(teamDetailActions, dispatch),
  teamUpdateActions: bindActionCreators(teamUpdateActions, dispatch),
  teamRemovingActions: bindActionCreators(teamRemovingActions, dispatch),
  teamGroupListActions: bindActionCreators(teamGroupListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(injectIntl(TeamUpdateForm)));
