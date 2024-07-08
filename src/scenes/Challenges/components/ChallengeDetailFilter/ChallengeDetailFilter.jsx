import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Chip,
} from '@material-ui/core';
import {
  Button,
  DatePicker,
  Select,
  Switch,
  Loader,
  Dropdown,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as teamGroupListActions from '../../../../services/TeamGroups/TeamGroupList/actions';
import * as teamGroupTreeAction from '../../../../services/TeamGroups/TeamGroupTree/actions';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions';

const styles = {
  inputs: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  filterChip: {
    borderColor: '#43586C',
    background: '#E0E6F7',
    color: '#43586C',
    fontWeight: 'bold',
  },
};

class ChallengeDetailFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTeam: props.myTeam || false,
      teamGroup: props.teamGroup,
      team: props.team,
      filterOpen: false,
    };
    this.abortController = new AbortController();
  }

  componentDidMount() {
    this.props.teamGroupTreeAction.getTeamGroupTree(
      false,
      true,
      this.abortController,
    );
    this.props.teamListActions.getTeamList({
      disableCollaborators: true,
      full: true,
      abortController: this.abortController,
    });
    this.props.teamGroupListActions.getTeamGroupList(
      true,
      this.abortController,
    );
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.previousPeriodListActions.getPreviousPeriodList();
    this.form = React.createRef();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  componentWillReceiveProps(props) {
    if (
      props.team != this.state.team ||
      props.teamGroup != this.state.teamGroup
    ) {
      this.setState({
        ...this.state,
        team: props.team,
        teamGroup: props.teamGroup,
      });
    }
  }

  renderLoader() {
    return <Loader centered />;
  }

  handleChange = (name) => (value) => {
    if (name === 'teamGroup') {
      this.setState(
        {
          ...this.state,
          [name]: value,
          team: null,
        },
        this.handleSubmit,
      );
    } else {
      this.setState(
        {
          ...this.state,
          [name]: value,
        },
        this.handleSubmit,
      );
    }
  };

  handleSubmit(model) {
    this.setFilterOpen(false, () => {
      this.props.onChange(this.state.team, this.state.teamGroup);
      this.props.onClose();
    });
  }

  setFilterOpen = (value, callback) => {
    this.setState(
      {
        ...this.state,
        filterOpen: value,
      },
      callback,
    );
  };

  teamGroupTreeToList = (teamGroup, level = 0) => {
    return _.flatten([
      Object.assign({}, teamGroup, {
        level,
        selectName: `${'\xA0\xA0\xA0\xA0'.repeat(level)}${
          level > 0 ? '‣' : ''
        } ${_.get(teamGroup, 'name', [])}`,
      }),
      ..._.get(teamGroup, 'teamGroups', []).map((child) =>
        this.teamGroupTreeToList(child, level + 1),
      ),
    ]);
  };

  renderData() {
    const { intl, classes } = this.props;
    const { myTeam } = this.props;
    const { teams: fetchedTeams, loading: teamsLoading } = this.props.teamList;
    const { teamGroups: fetchedTeamGroups, loading: teamGroupsLoading } =
      this.props.teamGroupList;
    const { teamGroup } = this.props.teamGroupTree;
    const loading = teamsLoading || teamGroupsLoading;
    const currentTeam = fetchedTeams.find(
      (t) => t.id === parseInt(this.props.team),
    );

    // Get teams according to scope (challenge participant) if given
    const baseTeams = fetchedTeams.filter(
      (t) => !this.props.scopeTeams || this.props.scopeTeams.indexOf(t.id) >= 0,
    );

    const scopeTeamGroups = baseTeams.map((t) => _.get(t, 'parent.id'));
    // const teamGroups = fetchedTeamGroups.filter(t => scopeTeamGroups.indexOf(t.id) >= 0)

    // const teamGroups = this.teamGroupTreeToList(teamGroup).filter(tg => !this.props.scopeTeamGroups || scopeTeamGroups.indexOf(tg) > 0)
    const teamGroups = this.teamGroupTreeToList(teamGroup).filter(
      (tg) =>
        !this.props.scopeTeams ||
        _.intersection(tg.allTeamIds, this.props.scopeTeams).length > 0,
    );

    const teams = baseTeams.filter(
      (t) =>
        (!this.state.teamGroup && !this.state.team) ||
        _.get(t, 'parent.id') === parseInt(this.state.teamGroup) ||
        _.get(t, 'parent.id') === _.get(currentTeam, 'parent.id'),
    );
    const initialTeamGroup =
      this.state.teamGroup || _.get(currentTeam, 'parent.id');
    const initialTeam = this.state.team;
    const hasFilter = initialTeam || initialTeamGroup;
    return (
      <div>
        <Dropdown
          buttonContent={
            <div>
              <FontAwesomeIcon icon={faSlidersH} />
              <span style={{ marginLeft: 5 }}>
                {intl.formatMessage({ id: 'filter.title' })}
              </span>
            </div>
          }
          position="right"
          active={hasFilter}
          open={this.state.filterOpen}
          setOpen={this.setFilterOpen}
        >
          <Formsy onSubmit={this.handleSubmit.bind(this)} ref={this.form}>
            {loading && this.renderLoader()}

            {!loading && (
              <Grid container spacing={2} className={classes.inputs}>
                <Grid item xs={12} sm={6}>
                  <Select
                    name="teamGroup"
                    options={teamGroups}
                    onChange={(value) => this.handleChange('teamGroup')(value)}
                    optionValueName="id"
                    optionTextName="selectName"
                    emptyText={intl.formatMessage({
                      id: 'filter.all_team_group_label',
                    })}
                    initial={initialTeamGroup}
                    label="Département"
                  />
                </Grid>
                {!this.props.hideTeams && (
                  <Grid item xs={12} sm={6}>
                    <Select
                      name="team"
                      options={teams.sort((a, b) =>
                        a.id === _.get(myTeam, 'id') &&
                        b.id !== _.get(myTeam, 'id')
                          ? -1
                          : 1,
                      )}
                      onChange={(value) => this.handleChange('team')(value)}
                      optionValueName="id"
                      optionTextName="name"
                      emptyText={intl.formatMessage({
                        id: 'filter.all_team_label',
                      })}
                      initial={initialTeam}
                      label="équipe"
                    />
                  </Grid>
                )}
              </Grid>
            )}
          </Formsy>
        </Dropdown>
        <div style={{ marginTop: 5 }}>
          <Grid container spacing={1}>
            {this.state.teamGroup &&
              fetchedTeamGroups &&
              fetchedTeamGroups.length > 0 && (
                <Grid item>
                  <Chip
                    size="small"
                    label={
                      fetchedTeamGroups.find(
                        (tg) => tg.id === parseInt(this.state.teamGroup),
                      ).name
                    }
                    onDelete={() => this.handleChange('teamGroup')(null)}
                    variant="outlined"
                    className={this.props.classes.filterChip}
                  />
                </Grid>
              )}
            {this.state.team && fetchedTeams && fetchedTeams.length > 0 && (
              <Grid item>
                <Chip
                  size="small"
                  label={
                    fetchedTeams.find((t) => t.id === parseInt(this.state.team))
                      .name
                  }
                  onDelete={() => this.handleChange('team')(null)}
                  variant="outlined"
                  className={this.props.classes.filterChip}
                />
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    );
  }

  render() {
    const { teams } = this.props.teamList;
    const { teamGroups } = this.props.teamGroupList;
    const { teamGroup } = this.props.teamGroupTree;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;

    return <div style={{ minHeight: 30 }}>{this.renderData()}</div>;
  }
}

const mapStateToProps = ({
  teamList,
  teamGroupList,
  currentPeriodDetail,
  previousPeriodList,
  teamGroupTree,
}) => ({
  teamList,
  teamGroupTree,
  teamGroupList,
  currentPeriodDetail,
  previousPeriodList,
});

const mapDispatchToProps = (dispatch) => ({
  teamListActions: bindActionCreators(teamListActions, dispatch),
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
  teamGroupListActions: bindActionCreators(teamGroupListActions, dispatch),
  currentPeriodDetailActions: bindActionCreators(
    currentPeriodDetailActions,
    dispatch,
  ),
  previousPeriodListActions: bindActionCreators(
    previousPeriodListActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(injectIntl(ChallengeDetailFilter)));
