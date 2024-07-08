import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Formsy from "formsy-react";

import {
  AppBarSubTitle,
  MainLayoutComponent,
  Dialog,
  DialogTitle,
  DialogActions,
  ProgressButton,
  Button,
  Organization,
  Loader,
} from "../../../../components";
import { TeamCreationForm, TeamUpdateForm } from "./components";
import * as teamCreationActions from "../../../../services/Teams/TeamCreation/actions";
import * as teamUpdateActions from "../../../../services/Teams/TeamUpdate/actions";
import * as teamRemovingActions from "../../../../services/Teams/TeamRemoving/actions";
import * as teamGroupTreeAction from "../../../../services/TeamGroups/TeamGroupTree/actions";
import * as teamGroupCreationActions from "../../../../services/TeamGroups/TeamGroupCreation/actions";
import * as teamGroupUpdateActions from "../../../../services/TeamGroups/TeamGroupUpdate/actions";
import * as teamGroupRemovingActions from "../../../../services/TeamGroups/TeamGroupRemoving/actions";
import * as collaboratorListActions from "../../../../services/Collaborators/CollaboratorList/actions";
import * as teamCollaboratorListActions from "../../../../services/Teams/TeamCollaboratorList/actions";
import * as configListActions from "../../../../services/Configs/ConfigList/actions";
import { injectIntl } from "react-intl";
import _ from "lodash";
import { toast } from "react-toastify";

const styles = {
  teamDialog: {
    width: "90%",
    "& .MuiFormControlLabel-root": {
      marginLeft: 0,
    },
  },
};

class AdminOrganization extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {
      newTeamOpen: false,
    };
    this.wrapperElement = React.createRef();
    this.abortController = new AbortController();
  }
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: "admin.title" }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: "admin.organization.title" })}
      />
    );
    this.props.activateReturn();

    this.props.teamGroupTreeAction.getTeamGroupTree(
      false,
      true,
      this.abortController
    );
    this.props.collaboratorListActions.getFreeCollaboratorList();
  }

  componentDidUpdate(props) {
    const { collaborators, loading } = this.props.teamCollaboratorList;

    if (
      collaborators &&
      !loading &&
      this.state.team &&
      this.state.team.collaborators_count === collaborators.length &&
      !this.state.teamLoaded
    ) {
      this.setState({
        ...this.state,
        teamLoaded: true,
        team: {
          ...this.state.team,
          collaborators,
        },
      });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  addTeamToChildren = (baseTeam) => {
    this.setState({
      ...this.state,
      newTeamOpen: true,
      baseTeam,
    });
  };

  editTeam = (team, type) => {
    if (type === "team") {
      this.props.teamCollaboratorListActions.getTeamCollaboratorList(
        type === "team" ? { teamId: team.id } : { teamGroupId: team.id }
      );
    }
    this.setState({
      ...this.state,
      editTeamOpen: true,
      teamLoaded: type === "teamGroup",
      team: Object.assign({}, team, { type }),
    });
  };

  handleSubmitTeam = (m) => {
    const { collaborators: collaboratorList } = this.props.collaboratorList;
    const { superManagers } = this.props.superManagerList;
    const model = this.refs.form.getModel();
    const collaborators =
      model.type === "team" ? collaboratorList : superManagers;

    const team = {
      name: model.name,
      color: model.color,
      manager: model.manager,
      parent: _.get(this.state, "baseTeam.id"),
      lookup_id: model.lookup_id,
    };
    const newCollaborators = collaborators.filter((c) =>
      model.collaborators.includes(c.id)
    );

    if (model.type === "teamGroup") {
      this.props.teamGroupCreationActions.createTeamGroup(
        team,
        newCollaborators
      );
    } else {
      this.props.teamCreationActions.createTeam(team, newCollaborators);
    }
  };

  handleUpdateTeam = (m) => {
    const { collaborators: collaboratorList } = this.props.collaboratorList;
    const { superManagers } = this.props.superManagerList;
    const model = this.refs.updateForm.getModel();
    const collaborators =
      model.type === "team" ? collaboratorList : superManagers;

    const team = {
      id: this.state.team.id,
      name: model.name,
      color: model.color,
      manager: model.manager,
      parent: model.parent,
      lookup_id: model.lookup_id,
    };

    const newCollaborators = model.collaborators
      ? _.uniq(
          _.compact(
            model.collaborators
              .filter(
                (currentCollab) =>
                  currentCollab &&
                  _.get(this.state, "team.collaborators", [])
                    .map((c) => parseInt(c.id))
                    .indexOf(parseInt(currentCollab)) < 0
              )
              .map((c) => parseInt(c))
          )
        )
      : [];

    const oldCollaborators = _.compact(
      _.get(this.state, "team.collaborators", []).filter(
        (c) => c && !model.collaborators.includes(c.id)
      )
    ).map((c) => parseInt(c.id));

    if (model.type === "teamGroup") {
      this.props.teamGroupUpdateActions.updateTeamGroup(
        team,
        newCollaborators,
        oldCollaborators
      );
    } else {
      this.props.teamUpdateActions.updateTeam(
        team,
        newCollaborators,
        oldCollaborators
      );
    }
  };

  handleRemoveTeam = (team) => {
    if (team.type === "team" && team.collaborators.length === 0) {
      this.props.teamRemovingActions.removeTeam(team.id);
    }
    if (
      team.type === "teamGroup" &&
      team.collaborators.length === 0 &&
      team.teams.length === 0 &&
      team.teamGroups.length === 0
    ) {
      this.props.teamGroupRemovingActions.removeTeamGroup(team.id);
    }
  };

  onNewTeamClose = (callback) => {
    const defaultCallback = () => {
      if (typeof callback === "function") {
        callback();
      }
    };
    this.setState(
      {
        ...this.state,
        newTeamOpen: false,
        baseTeam: null,
      },
      defaultCallback
    );
  };

  onEditTeamClose = (callback) => {
    const defaultCallback = () => {
      if (typeof callback === "function") {
        callback();
      }
    };
    this.setState(
      {
        ...this.state,
        editTeamOpen: false,
        team: null,
      },
      defaultCallback
    );
    this.props.teamCollaboratorListActions.getTeamCollaboratorListClear();
  };

  renderLoader = () => {
    return <Loader centered />;
  };

  renderData() {
    const { images } = this.props.systemImageList;
    const { teamGroup } = this.props.teamGroupTree;
    const wrapperWidth = _.get(this.wrapperElement, "current.offsetWidth", 0);
    const { configs } = this.props.configList;
    const logo =
      images &&
      _.get(
        images.find((x) => x.code === "LOGO"),
        "src"
      );

    return (
      <Organization
        organizationRoot={teamGroup}
        onClick={(team, type) => this.editTeam(team, type)}
        onAddBelow={this.addTeamToChildren}
        companyLogo={logo}
      />
    );
  }

  render() {
    const { intl } = this.props;
    const { images, imagesLoading } = this.props.systemImageList;
    const { teamGroup, loading: teamGroupsLoading } = this.props.teamGroupTree;

    const { configs, loading: configLoading } = this.props.configList;

    const loading = teamGroupsLoading || configLoading || imagesLoading;
    const { loading: createTeamLoading, success: createTeamSuccess } =
      this.props.teamCreation;
    const { loading: updateTeamLoading, success: updateTeamSuccess } =
      this.props.teamUpdate;
    const { loading: removeTeamLoading, success: removeTeamSuccess } =
      this.props.teamRemoving;
    const { loading: createTeamGroupLoading, success: createTeamGroupSuccess } =
      this.props.teamGroupCreation;
    const { loading: updateTeamGroupLoading, success: updateTeamGroupSuccess } =
      this.props.teamGroupUpdate;
    const { loading: removeTeamGroupLoading, success: removeTeamGroupSuccess } =
      this.props.teamGroupRemoving;

    if (
      (createTeamSuccess || createTeamGroupSuccess) &&
      this.state.newTeamOpen
    ) {
      this.props.teamGroupCreationActions.clearTeamGroupCreation();
      this.props.teamCreationActions.clearTeamCreation();
      this.onNewTeamClose(() =>
        this.props.teamGroupTreeAction.getTeamGroupTree(
          false,
          true,
          this.abortController
        )
      );
      toast.success(
        intl.formatMessage({ id: "common.create_success_message" })
      );
      toast.warning(intl.formatMessage({ id: "common.cache_warning" }));
    }

    if (
      (updateTeamSuccess || updateTeamGroupSuccess) &&
      this.state.editTeamOpen
    ) {
      this.props.teamGroupUpdateActions.clearTeamGroupUpdate();
      this.props.teamUpdateActions.clearTeamUpdate();
      this.onEditTeamClose(() =>
        this.props.teamGroupTreeAction.getTeamGroupTree(
          false,
          true,
          this.abortController
        )
      );
      toast.success(
        intl.formatMessage({ id: "common.update_success_message" })
      );
      toast.warning(intl.formatMessage({ id: "common.cache_warning" }));
    }

    if (
      (removeTeamSuccess || removeTeamGroupSuccess) &&
      this.state.editTeamOpen
    ) {
      this.props.teamGroupRemovingActions.clearTeamGroupRemoving();
      this.props.teamRemovingActions.clearTeamRemoving();
      this.onEditTeamClose(() =>
        this.props.teamGroupTreeAction.getTeamGroupTree(
          false,
          true,
          this.abortController
        )
      );
      toast.success(
        intl.formatMessage({ id: "common.delete_success_message" })
      );
      toast.warning(intl.formatMessage({ id: "common.cache_warning" }));
    }

    const currentTeam = _.get(this.state, "team");
    const displayDeleteButton =
      currentTeam &&
      currentTeam.parent &&
      ((currentTeam.type === "team" &&
        _.get(currentTeam, "collaborators.length", 0) === 0) ||
        (currentTeam.type === "teamGroup" &&
          _.get(currentTeam, "collaborators.length", 0) === 0 &&
          _.get(currentTeam, "teams.length", 0) === 0 &&
          _.get(currentTeam, "teamGroups.length", 0) === 0));

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && teamGroup && configs && images && this.renderData()}
        <Dialog
          open={this.state.newTeamOpen}
          onClose={this.onNewTeamClose}
          classes={{ paper: this.props.classes.teamDialog }}
          maxWidth="md"
        >
          <DialogTitle>
            {intl
              .formatMessage({ id: "admin.organization.create_team_title" })
              .format(_.get(this, "state.baseTeam.name"))}
          </DialogTitle>
          <Formsy ref="form" onValidSubmit={this.handleSubmitTeam.bind(this)}>
            <TeamCreationForm form={this.refs.form} />
            <DialogActions>
              <ProgressButton
                type="submit"
                text={intl.formatMessage({ id: "common.submit" })}
                loading={createTeamLoading || createTeamGroupLoading}
                centered
              />
              <Button onClick={this.onNewTeamClose} color="secondary">
                {intl.formatMessage({ id: "common.cancel" })}
              </Button>
            </DialogActions>
          </Formsy>
        </Dialog>
        <Dialog
          open={this.state.editTeamOpen}
          onClose={this.onEditTeamClose}
          classes={{ paper: this.props.classes.teamDialog }}
          maxWidth="md"
        >
          <DialogTitle>
            {_.get(this.state.team, "parent") ? (
              <React.Fragment>
                {intl.formatMessage({
                  id:
                    _.get(this.state.team, "type") === "teamGroup"
                      ? "admin.organization.update_team_group"
                      : "admin.organization.update_team",
                })}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {intl.formatMessage({
                  id: "admin.organization.update_company",
                })}
              </React.Fragment>
            )}
          </DialogTitle>
          <Formsy
            ref="updateForm"
            onValidSubmit={this.handleUpdateTeam.bind(this)}
          >
            {this.state.teamLoaded ? (
              <TeamUpdateForm
                team={this.state.team}
                form={this.refs.updateForm}
              />
            ) : (
              <Loader centered />
            )}

            <Grid container justify="space-between" style={{ width: "100%" }}>
              <Grid item>
                {displayDeleteButton && (
                  <ProgressButton
                    type={"button"}
                    color="secondary"
                    text={intl.formatMessage({ id: "common.delete" })}
                    loading={removeTeamLoading}
                    centered
                    onClick={() => this.handleRemoveTeam(this.state.team)}
                  />
                )}
              </Grid>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <ProgressButton
                      type="submit"
                      text={intl.formatMessage({ id: "common.submit" })}
                      loading={updateTeamLoading || updateTeamGroupLoading}
                      centered
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={this.onEditTeamClose} color="secondary">
                      {intl.formatMessage({ id: "common.cancel" })}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Formsy>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({
  collaboratorList,
  teamGroupTree,
  teamCollaboratorList,
  teamCreation,
  teamUpdate,
  teamRemoving,
  teamGroupCreation,
  teamGroupUpdate,
  teamGroupRemoving,
  superManagerList,
  configList,
  systemImageList,
}) => ({
  collaboratorList,
  teamGroupTree,
  teamCollaboratorList,
  superManagerList,
  teamCreation,
  teamUpdate,
  teamRemoving,
  teamGroupCreation,
  teamGroupUpdate,
  teamGroupRemoving,
  configList,
  systemImageList,
});

const mapDispatchToProps = (dispatch) => ({
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
  collaboratorListActions: bindActionCreators(
    collaboratorListActions,
    dispatch
  ),
  teamCreationActions: bindActionCreators(teamCreationActions, dispatch),
  teamUpdateActions: bindActionCreators(teamUpdateActions, dispatch),
  teamRemovingActions: bindActionCreators(teamRemovingActions, dispatch),
  teamGroupCreationActions: bindActionCreators(
    teamGroupCreationActions,
    dispatch
  ),
  teamGroupUpdateActions: bindActionCreators(teamGroupUpdateActions, dispatch),
  teamGroupRemovingActions: bindActionCreators(
    teamGroupRemovingActions,
    dispatch
  ),
  configListActions: bindActionCreators(configListActions, dispatch),
  teamCollaboratorListActions: bindActionCreators(
    teamCollaboratorListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(AdminOrganization)));
