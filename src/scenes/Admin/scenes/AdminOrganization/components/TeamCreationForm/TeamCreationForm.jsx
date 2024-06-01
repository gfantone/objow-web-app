import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import {
  Grid,
  IconButton,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  AppBarSubTitle,
  Card,
  ColorInput,
  DefaultTitle,
  Loader,
  MainLayoutComponent,
  Select,
  TextField,
  ProgressButton,
  Avatar,
  GreenRadio,
  HiddenInput,
} from '../../../../../../components';
import * as colorListActions from '../../../../../../services/Colors/ColorList/actions';
import * as managerListActions from '../../../../../../services/Managers/ManagerList/actions';
import * as superManagerListActions from '../../../../../../services/SuperManagers/SuperManagerList/actions';
import * as teamCreationActions from '../../../../../../services/Teams/TeamCreation/actions';
import * as Resources from '../../../../../../Resources';
import { injectIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  photo: {
    width: 48,
    height: 48,
  },
};

class TeamCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collaborators: [],
    };
    this.props.teamCreationActions.clearTeamCreation();
  }

  handleColorClick = (id) => () => {
    this.setState({
      ...this.state,
      color: id,
    });
  };

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

  componentDidMount() {
    this.props.colorListActions.getFreeColorList();
    this.props.managerListActions.getFreeManagerList();
    this.props.superManagerListActions.getFreeSuperManagerList();
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderCollaboratorSelector(index, id = null) {
    const { intl } = this.props;
    const { classes } = this.props;

    const currentType = this.state.type || 'team';
    const isTeam = currentType === 'team';

    var { collaborators } = this.props.collaboratorList;
    const { superManagers: superManagersList } = this.props.superManagerList;
    const ids = this.state.collaborators.filter((x) => x != id);

    const collaborator = isTeam
      ? _.get(
          collaborators?.filter((c) => c.id == id),
          '[0]'
        )
      : _.get(
          superManagersList?.filter((c) => c.id == id),
          '[0]'
        );
    var photo = id ? collaborator.photo : null;

    collaborators = collaborators?.filter(
      (collaborator) =>
        !ids.includes(collaborator.id) &&
        parseInt(this.state.reservedManager) !== collaborator.id
    );
    const superManagers = superManagersList?.filter(
      (collaborator) =>
        !ids.includes(collaborator.id) &&
        parseInt(this.state.reservedManager) !== collaborator.id
    );
    photo = photo ? photo : '/assets/img/user/avatar.svg';

    return (
      <Grid key={id ? id : 'new'} item xs={6}>
        <Card>
          <Grid container spacing={2} alignItems='flex-end'>
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
                options={isTeam ? collaborators : superManagers}
                initial={id ? id : null}
                onChange={this.handleCollaboratorChange(index)}
                optionValueName='id'
                optionTextName='fullname'
                fullWidth
              />
            </Grid>
            {id && (
              <Grid item>
                <IconButton
                  size='small'
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

  setType = (event) => {
    this.setState({
      ...this.state,
      type: event.target.value,
    });
  };

  setReservedManager = (newValue) => {
    this.setState({
      ...this.state,
      reservedManager: newValue,
    });
  };

  renderData() {
    const { intl } = this.props;
    const { loading } = this.props.teamCreation;
    var { colors } = this.props.colorList;
    const { managers } = this.props.managerList;
    const { superManagers: superManagersList } = this.props.superManagerList;
    const superManagers = superManagersList.filter(
      (collaborator) => !this.state.collaborators.includes(collaborator.id)
    );
    const collaboratorCount = this.state.collaborators.length;
    const types = [
      {
        name: 'team',
        label: intl.formatMessage({ id: 'common.team' }),
      },
      {
        name: 'teamGroup',
        label: intl.formatMessage({ id: 'common.team_group' }),
      },
    ];
    const currentType = this.state.type || 'team';
    const isTeam = currentType === 'team';
    return (
      <Grid container spacing={4}>
        <HiddenInput name='type' value={currentType} />

        <Grid item xs={12} container style={{ marginTop: 5, paddingBottom: 5 }}>
          <RadioGroup
            row
            name='type'
            onChange={this.setType}
            value={currentType}
          >
            {types.map((type) => (
              <FormControlLabel
                value={type.name}
                control={<GreenRadio />}
                label={type.label}
              />
            ))}
          </RadioGroup>
        </Grid>

        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name='name'
                    initial={_.get(this.props.team, 'name')}
                    label={intl.formatMessage({ id: 'team.form.name' })}
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
                <Grid item xs={6}>
                  <Select
                    name='manager'
                    label={
                      isTeam
                        ? intl.formatMessage({ id: 'team.form.manager' })
                        : intl.formatMessage({
                            id: 'team_group.form.super_manager',
                          })
                    }
                    initial={_.get(this.props.team, 'manager')}
                    options={isTeam ? managers : superManagers}
                    optionValueName='id'
                    optionTextName='fullname'
                    onChange={this.setReservedManager}
                    fullWidth
                    validationErrors={{
                      isDefaultRequiredValue: intl.formatMessage({
                        id: 'common.form.required_error',
                      }),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name='lookup_id'
                    label={intl.formatMessage({ id: 'team.form.id' })}
                    fullWidth
                    lowercase
                  />
                </Grid>
                {isTeam && (
                  <Grid item xs={12}>
                    <ColorInput
                      name='color'
                      label={intl.formatMessage({ id: 'team.form.color' })}
                      initial={_.get(this.props.team, 'color')}
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
        <Grid item xs={12} container spacing={2}>
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
      </Grid>
    );
  }

  render() {
    const { colors, loading: colorListLoading } = this.props.colorList;
    const { managers, loading: managerListLoading } = this.props.managerList;
    const { superManagers, loading: superManagerListLoading } =
      this.props.superManagerList;
    const { success } = this.props.teamCreation;
    const loading =
      colorListLoading || managerListLoading || superManagerListLoading;
    // if (success) {
    //     this.props.teamCreationActions.clearTeamCreation();
    //     this.props.history.goBack()
    // }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && colors && managers && superManagers && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  collaboratorList,
  colorList,
  managerList,
  teamCreation,
  superManagerList,
}) => ({
  collaboratorList,
  colorList,
  managerList,
  superManagerList,
  teamCreation,
});

const mapDispatchToProps = (dispatch) => ({
  colorListActions: bindActionCreators(colorListActions, dispatch),
  managerListActions: bindActionCreators(managerListActions, dispatch),
  superManagerListActions: bindActionCreators(
    superManagerListActions,
    dispatch
  ),
  teamCreationActions: bindActionCreators(teamCreationActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(TeamCreationForm)));
