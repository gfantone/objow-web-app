import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ReactDataSheet from 'react-datasheet';
import {
  Loader,
  Card,
  ProgressButton,
  ErrorText,
  Spreadsheet,
} from '../../../../../../../../components';
import * as Resources from '../../../../../../../../Resources';
import * as goalListActions from '../../../../../../../../services/Goals/GoalList/actions';
import * as playerGoalBulkListActions from '../../../../../../../../services/PlayerGoals/PlayerGoalBulkList/actions';
import * as teamGoalBulkListActions from '../../../../../../../../services/TeamGoals/TeamGoalBulkList/actions';
import * as teamPlayerGoalBulkListActions from '../../../../../../../../services/TeamPlayerGoals/TeamPlayerGoalBulkList/actions';
import * as playerGoalListUpdateActions from '../../../../../../../../services/PlayerGoals/PlayerGoalListUpdate/actions';
import * as teamGoalListUpdateActions from '../../../../../../../../services/TeamGoals/TeamGoalListUpdate/actions';
import getPeriodByGoal from '../../helpers/getPeriodByGoal';
import _ from 'lodash';
import { injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

const styles = {
  root: {
    padding: 16,
  },
  mainWrapper: {
    marginTop: 50,
  },
  error: {
    marginBottom: 16,
  },
};

class GoalSpreadsheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // index of current period which goals are being loaded
      currentGoalIndexLoading: 0,
      // index of current team which goals are being loaded
      currentTeamLoading: 0,
      loadComplete: false,
      goals: [],
      playerGoals: [],
      teamPlayerGoals: [],
      teamGoals: [],
      gridLoaded: false,
      changeTeam: false,
      grid: [],
      error: false,
      selected: {},
    };
    this.lastSelected = null;
    this.dataGridRef = React.createRef();
  }

  updateGridIndividual = () => {
    const { intl } = this.props;
    const { goals } = this.props.goalList;
    const { teams } = this.props.teamList;
    const { account } = this.props.accountDetail;
    const { definition } = this.props.goalDefinitionDetail;
    const { playerGoals, teamPlayerGoals } = this.state;
    // const { goals: playerGoals, loading: playerGoalBulkListLoading } = this.props.playerGoalBulkList;
    // const { goals: teamPlayerGoals, loading: teamPlayerGoalListLoading } = this.props.teamPlayerGoalBulkList
    const now = new Date();
    const goalsByTeam = {};
    const { team: teamId } = this.props;
    let team;
    let collaborators = [];

    if (
      goals &&
      playerGoals &&
      teamPlayerGoals &&
      playerGoals.length > 0 &&
      teamPlayerGoals.length > 0
    ) {
      playerGoals.forEach((response) => {
        team = _.get(response, 'data[0].collaborator.team.id');
        collaborators = [
          ...collaborators,
          _.get(response, 'data').map((goal) => goal.collaborator),
        ];
        if (!goalsByTeam[team]) {
          goalsByTeam[team] = [];
        }
        goalsByTeam[team] = [...goalsByTeam[team], response.data];
      });

      collaborators = _.sortBy(
        _.uniqBy(_.flatten(collaborators), (c) => c.id),
        (c) => c.fullname
      );

      let data = [];
      let bottomSeparatorClass = '';
      const teamIndex = 0;
      // teams.forEach((team, teamIndex) => {
      data = [...data, []];
      // if(goalsByTeam[team.id]) {
      // goals.forEach((goal, periodIndex))

      playerGoals.forEach((playerGoalsByPeriod, periodIndex) => {
        const period = getPeriodByGoal(goals[periodIndex]);

        collaborators.forEach((collaborator, collaboratorIndex) => {
          const playerGoalByPeriod = playerGoalsByPeriod.data.find(
            (g) => g.collaborator.id === collaborator.id
          );
          if (data[teamIndex].length < collaboratorIndex + 1) {
            data[teamIndex] = [
              ...data[teamIndex],
              [
                {
                  value: _.get(collaborator, 'fullname'),
                  readOnly: true,
                  className: 'firstCell collaboratorCell baseCell',
                },
              ],
            ];
          }
          bottomSeparatorClass =
            collaboratorIndex >= playerGoalsByPeriod.data.length - 1
              ? 'bottomSeparator'
              : '';
          const goal = goals[periodIndex];

          const playerGoal = playerGoalByPeriod;
          const editable =
            playerGoal !== undefined &&
            ((goal.start.toDate() <= now && now <= goal.end.toDate()) ||
              goal.start.toDate() >= now ||
              (definition.past_editable && account.role.code === 'A'));

          data[teamIndex][collaboratorIndex] = [
            ...data[teamIndex][collaboratorIndex],
            {
              value: playerGoal !== undefined ? playerGoal.target : '',
              className: `dataCell baseCell ${bottomSeparatorClass} ${
                !playerGoal ? 'empty' : ''
              } period-${definition.periodicity.code}`,
              period:
                period.name ||
                intl
                  .formatMessage({ id: 'admin.goal.period_label_short' })
                  .format(periodIndex + 1),
              readOnly: !editable || !definition.isActive,
              type: 'playerGoal',
              id: playerGoal !== undefined ? playerGoal.id : '',
            },
          ];
        });

        const lineNumber = collaborators.length;
        const team_ids = collaborators.map((c) => _.get(c, 'team.id'));

        const teamPlayerGoal =
          parseInt(teamId) >= 0
            ? teamPlayerGoals[periodIndex].data.find(
                (g) => _.get(g, 'team.id') === parseInt(teamId)
              )
            : // All teams
              teamPlayerGoals[periodIndex].data
                .filter((g) => _.includes(team_ids, _.get(g, 'team.id')))
                .reduce(
                  (acc, g) =>
                    Object.assign(
                      {},
                      {
                        target: (g.target || 0) + (acc.target || 0),
                      }
                    ),
                  {}
                );

        // Total by team
        data[teamIndex][lineNumber] = data[teamIndex][lineNumber] || [
          {
            value: `Objectif alloué`,
            readOnly: true,
            className: 'firstCell baseCell totalCell footerCell',
          },
        ];

        data[teamIndex][lineNumber] = [
          ...data[teamIndex][lineNumber],
          {
            type: 'availableTarget',
            period:
              period.name ||
              intl
                .formatMessage({ id: 'admin.goal.period_label_short' })
                .format(periodIndex + 1),
            readOnly: true,
            value: _.get(teamPlayerGoal, 'target'),
            className: 'baseCell footerCell topSeparator',
          },
        ];

        const usedTarget = _.get(definition, 'kpi.unit.isRate', false)
          ? Math.ceil(
              playerGoalsByPeriod.data.reduce(
                (acc, goal) => acc + goal.target,
                0
              ) / playerGoalsByPeriod.data.length
            )
          : playerGoalsByPeriod.data.reduce(
              (acc, goal) => acc + goal.target,
              0
            );

        // Used by team
        data[teamIndex][lineNumber + 1] = data[teamIndex][lineNumber + 1] || [
          {
            value: `${intl.formatMessage({
              id: 'admin.goal.edit.all_target_label',
            })}`,
            readOnly: true,
            className: 'firstCell baseCell totalCell footerCell',
          },
        ];
        data[teamIndex][lineNumber + 1] = [
          ...data[teamIndex][lineNumber + 1],
          {
            value: parseFloat(parseFloat(usedTarget).toFixed(2)),
            type: 'usedTarget',
            period:
              period.name ||
              intl
                .formatMessage({ id: 'admin.goal.period_label_short' })
                .format(periodIndex + 1),
            readOnly: true,
            className: 'baseCell footerCell',
          },
        ];

        // Remaining
        data[teamIndex][lineNumber + 2] = data[teamIndex][lineNumber + 2] || [
          {
            value: `${intl.formatMessage({
              id: 'admin.goal.edit.remaining_target_label',
            })}`,
            readOnly: true,
            className: 'firstCell baseCell totalCell footerCell',
          },
        ];

        data[teamIndex][lineNumber + 2] = [
          ...data[teamIndex][lineNumber + 2],
          {
            value: parseFloat(
              parseFloat(_.get(teamPlayerGoal, 'target') - usedTarget).toFixed(
                2
              )
            ),
            readOnly: true,
            type: 'remainingTarget',
            period:
              period.name ||
              intl
                .formatMessage({ id: 'admin.goal.period_label_short' })
                .format(periodIndex + 1),
            className: 'baseCell footerCell',
          },
        ];
      });
      // }
      // });

      const validatedGrid = this.addValidationsToGrid([
        [
          {
            value: '',
            readOnly: true,
            className: 'firstCell baseCell firstLine',
          },
          ...goals.map((goal, index) => ({
            value:
              getPeriodByGoal(goal).name ||
              intl
                .formatMessage({ id: 'admin.goal.period_label_short' })
                .format(index + 1),
            readOnly: true,
            className: 'dataCell baseCell firstLine',
          })),
        ],
        ..._.flatten(data),
      ]);
      this.setState({
        ...this.state,
        grid: validatedGrid.grid,
        error: validatedGrid.error,
        changeTeam: false,
        gridLoaded: true,
      });
    }
  };

  updateGridTeam = () => {
    const { intl } = this.props;
    const { goals } = this.props.goalList;
    const { teams } = this.props.teamList;
    const { account } = this.props.accountDetail;
    const { definition } = this.props.goalDefinitionDetail;
    const { teamGoals } = this.state;
    // const { goals: teamGoals } = this.props.teamGoalBulkList;
    let data = [];
    let allTeams = [];
    const now = new Date();

    if (goals && teamGoals && teamGoals.length > 0) {
      teamGoals.forEach((response) => {
        allTeams = [
          ...allTeams,
          _.get(response, 'data').map((goal) => goal.team),
        ];
      });

      allTeams = _.uniqBy(_.flatten(allTeams), (t) => t.id);

      teamGoals.forEach((teamGoalsByPeriod, periodIndex) => {
        const goal = goals[periodIndex];
        const period = getPeriodByGoal(goal);
        allTeams.forEach((team, teamIndex) => {
          const teamGoal = teamGoalsByPeriod.data.find(
            (tg) => tg.team.id === team.id
          );
          const editable =
            teamGoal !== undefined &&
            ((goal.start.toDate() <= now && now <= goal.end.toDate()) ||
              goal.start.toDate() >= now ||
              (definition.past_editable && account.role.code === 'A'));

          if (data.length <= teamIndex) {
            data = [
              ...data,
              [
                {
                  value: _.get(team, 'name'),
                  readOnly: true,
                  className: 'firstCell baseCell collaboratorCell',
                },
              ],
            ];
          }

          data[teamIndex] = [
            ...data[teamIndex],
            {
              value: _.get(teamGoal, 'target'),
              period: period.name,
              id: _.get(teamGoal, 'id'),
              readOnly: !editable || !definition.isActive,
              type: 'playerGoal',
              className: `dataCell baseCell period-${
                definition.periodicity.code
              } ${!teamGoal ? 'empty' : ''}`,
            },
          ];
        });

        const lineNumber = allTeams.length;

        data[lineNumber] = data[lineNumber] || [
          {
            value: `Objectif alloué`,
            readOnly: true,
            className: 'firstCell baseCell totalCell footerCell',
          },
        ];

        data[lineNumber] = [
          ...data[lineNumber],
          {
            type: 'availableTarget',
            period: period.name,
            readOnly: true,
            value: _.get(goals[periodIndex], 'target'),
            className: 'baseCell footerCell topSeparator',
          },
        ];

        const usedTarget = _.get(definition, 'kpi.unit.isRate', false)
          ? Math.ceil(
              teamGoalsByPeriod.data.reduce(
                (acc, goal) => acc + goal.target,
                0
              ) / teamGoalsByPeriod.data.length
            )
          : teamGoalsByPeriod.data.reduce((acc, goal) => acc + goal.target, 0);
        // Used by team
        data[lineNumber + 1] = data[lineNumber + 1] || [
          {
            value: `${intl.formatMessage({
              id: 'admin.goal.edit.all_target_label',
            })}`,
            readOnly: true,
            className: 'firstCell baseCell totalCell footerCell',
          },
        ];

        data[lineNumber + 1] = [
          ...data[lineNumber + 1],
          {
            value: usedTarget,
            type: 'usedTarget',
            period: period.name,
            readOnly: true,
            className: 'baseCell footerCell',
          },
        ];

        // Remaining
        data[lineNumber + 2] = data[lineNumber + 2] || [
          {
            value: `${intl.formatMessage({
              id: 'admin.goal.edit.remaining_target_label',
            })}`,
            readOnly: true,
            className: 'firstCell baseCell totalCell footerCell',
          },
        ];

        data[lineNumber + 2] = [
          ...data[lineNumber + 2],
          {
            value: parseFloat(
              parseFloat(
                _.get(goals[periodIndex], 'target') - usedTarget
              ).toFixed(2)
            ),
            readOnly: true,
            type: 'remainingTarget',
            period:
              period.name ||
              intl
                .formatMessage({ id: 'admin.goal.period_label_short' })
                .format(periodIndex + 1),
            className: 'baseCell footerCell',
          },
        ];
      });
      const validatedGrid = this.addValidationsToGrid([
        [
          {
            value: '',
            readOnly: true,
            className: 'firstCell baseCell firstLine',
          },
          ...goals.map((goal, index) => ({
            value:
              getPeriodByGoal(goal).name ||
              intl
                .formatMessage({ id: 'admin.goal.period_label_short' })
                .format(index + 1),
            readOnly: true,
            className: 'dataCell baseCell firstLine',
          })),
        ],
        ...data,
      ]);

      this.setState({
        ...this.state,
        grid: validatedGrid.grid,
        error: validatedGrid.error,
        changeTeam: false,
        gridLoaded: true,
      });
    }
  };

  updateGrid = () => {
    const { definition } = this.props.goalDefinitionDetail;
    const isIndividualGoals = _.get(definition, 'type.code') === 'C';
    if (isIndividualGoals) {
      this.updateGridIndividual();
    } else {
      this.updateGridTeam();
    }
  };

  componentDidMount() {
    const { team } = this.props;
    const { definition } = this.props.goalDefinitionDetail;

    if (_.get(definition, 'type.code') === 'T') {
      this.fetchGoalsAllTeams();
    } else {
      // if(team) {
      //   this.fetchGoals()
      // } else {
      //   this.fetchGoalsAllTeams()
      // }
    }
  }

  fetchGoalsAllTeams = () => {
    const { teams } = this.props.teamList;
    const { goals, loading } = this.props.goalList;
    const { definition } = this.props.goalDefinitionDetail;
    const { loading: updateLoading } = this.props.playerGoalListUpdate;

    if (definition && !loading && (!goals || goals.length === 0)) {
      this.props.goalListActions.getGoalList(definition.id);
    }

    if (goals && goals.length > 0) {
      const dates = goals.map((goal) => getPeriodByGoal(goal).date);

      if (definition) {
        if (!this.state.nextTeamIndex) {
          this.setState({
            ...this.state,
            grid: [],
            playerGoals: [],
            teamPlayerGoals: [],
            teamGoals: [],
            nextTeamIndex: 1,
          });
          const filteredTeams = teams.filter((t, index) => index === 0);
          this.props.playerGoalBulkListActions.getPlayerGoalBulkList(
            definition.id,
            dates,
            filteredTeams
          );
          this.props.teamPlayerGoalBulkListActions.getTeamPlayerGoalBulkList(
            definition.id,
            dates,
            filteredTeams[0]
          );
          this.props.teamGoalBulkListActions.getTeamGoalBulkList(
            definition.id,
            dates
          );
        } else {
          const nextTeamIndex = this.state.nextTeamIndex;
          if (nextTeamIndex <= teams.length) {
            if (nextTeamIndex < teams.length) {
              this.setState({
                ...this.state,
                nextTeamIndex: nextTeamIndex + 1,
              });
            }
            const filteredTeams = teams.filter(
              (t, index) => index === nextTeamIndex
            );
            this.props.playerGoalBulkListActions.getPlayerGoalBulkList(
              definition.id,
              dates,
              filteredTeams
            );
            this.props.teamGoalBulkListActions.getTeamGoalBulkList(
              definition.id,
              dates
            );
            // this.props.teamPlayerGoalBulkListActions.getTeamPlayerGoalBulkList(definition.id, dates, filteredTeams[0])
          } else {
            this.updateGrid();
          }
        }
      }
    }
  };

  fetchGoals = () => {
    const { definition } = this.props.goalDefinitionDetail;
    const { teams } = this.props.teamList;
    const { goals, loading } = this.props.goalList;
    const { team } = this.props;

    const filteredTeams =
      team && teams.filter((t) => parseInt(t.id) === parseInt(team));
    // load data
    // const currentTeam = teams[this.state.currentTeamLoading]

    if (definition && !goals && !loading) {
      this.props.goalListActions.getGoalList(definition.id);
    }

    if (definition && goals && goals.length > 0) {
      const dates = goals.map((goal) => getPeriodByGoal(goal).date);
      this.setState(
        {
          ...this.state,
          firstTeamInitialized: true,
        },
        () => {
          if (_.get(definition, 'type.code') === 'C') {
            this.props.playerGoalBulkListActions.getPlayerGoalBulkList(
              definition.id,
              dates,
              filteredTeams
            );
            this.props.teamPlayerGoalBulkListActions.getTeamPlayerGoalBulkList(
              definition.id,
              dates,
              filteredTeams[0]
            );
          } else {
            this.props.teamGoalBulkListActions.getTeamGoalBulkList(
              definition.id,
              dates
            );
          }
        }
      );
    }
  };

  componentWillReceiveProps(nextProps) {
    const { team } = this.props;
    const { definition } = this.props.goalDefinitionDetail;
    const { goals: playerGoals, loading: playerGoalsLoading } =
      this.props.playerGoalBulkList;
    const { goals: teamPlayerGoals, loading: teamPlayerGoalsLoading } =
      this.props.teamPlayerGoalBulkList;
    const { goals: teamGoals, loading: teamGoalsLoading } =
      this.props.teamGoalBulkList;
    const { goals } = this.props.goalList;
    const loading =
      playerGoalsLoading || teamPlayerGoalsLoading || teamGoalsLoading;

    const goalsLoaded =
      (playerGoals &&
        playerGoals.length &&
        teamPlayerGoals &&
        teamPlayerGoals.length) ||
      (teamGoals && teamGoals.length);

    if (
      _.get(definition, 'type.code') === 'T' &&
      goals &&
      goals.length &&
      (!teamGoals || teamGoals.length === 0) &&
      !loading
    ) {
      this.setState(
        {
          ...this.state,
          grid: [],
          playerGoals: [],
          teamPlayerGoals: [],
          teamGoals: [],
          gridLoaded: false,
          changeTeam: false,
          nextTeamIndex: null,
        },
        this.fetchGoalsAllTeams
      );
    }

    // Load new team if switched
    if (
      nextProps.team &&
      (nextProps.team !== this.props.team || !this.state.firstTeamInitialized)
    ) {
      this.setState(
        {
          ...this.state,
          grid: [],
          playerGoals: [],
          teamPlayerGoals: [],
          teamGoals: [],
          gridLoaded: false,
          changeTeam: true,
          nextTeamIndex: null,
          // firstTeamInitialized: true
        },
        this.fetchGoals
      );
    }

    if (!nextProps.team && nextProps.team !== this.props.team) {
      this.setState(
        {
          ...this.state,
          grid: [],
          playerGoals: [],
          teamPlayerGoals: [],
          teamGoals: [],
          gridLoaded: false,
          changeTeam: true,
          nextTeamIndex: null,
        },
        this.fetchGoalsAllTeams
      );
    }

    if (nextProps.team && !loading && goalsLoaded) {
      this.setState({
        ...this.state,
        gridLoaded: false,
        playerGoals: playerGoals || [],
        teamPlayerGoals: teamPlayerGoals || [],
        teamGoals: teamGoals || [],
      });
      this.props.playerGoalBulkListActions.getPlayerGoalBulkListClear();
      this.props.teamPlayerGoalBulkListActions.getTeamPlayerGoalBulkListClear();
      this.props.teamGoalBulkListActions.getTeamGoalBulkListClear();
    }

    // Load next team
    if (_.get(definition, 'type.code') === 'C') {
      if (
        !nextProps.team &&
        this.state.nextTeamIndex &&
        playerGoals &&
        playerGoals.length
      ) {
        const mergeGoals = (stateGoals, newGoals) => {
          return stateGoals.map((stateGoal, index) =>
            newGoals && newGoals[index]
              ? Object.assign(stateGoal, {
                  data: [...stateGoal.data, ...newGoals[index].data],
                })
              : stateGoal
          );
        };

        this.setState(
          {
            ...this.state,
            gridLoaded: false,
            changeTeam: true,
            playerGoals:
              this.state.playerGoals.length > 0
                ? mergeGoals(this.state.playerGoals, playerGoals)
                : playerGoals || [],
            teamPlayerGoals:
              this.state.teamPlayerGoals.length > 0
                ? this.state.teamPlayerGoals
                : teamPlayerGoals || [],
            teamGoals:
              this.state.teamGoals.length > 0
                ? mergeGoals(this.state.teamGoals, teamGoals)
                : teamGoals || [],
          },
          this.fetchGoalsAllTeams
        );
        this.props.playerGoalBulkListActions.getPlayerGoalBulkListClear();
        this.props.teamPlayerGoalBulkListActions.getTeamPlayerGoalBulkListClear();
        this.props.teamGoalBulkListActions.getTeamGoalBulkListClear();
      }
    }
    if (
      _.get(definition, 'type.code') === 'T' &&
      teamGoals &&
      teamGoals.length
    ) {
      this.setState({
        ...this.state,
        gridLoaded: false,
        changeTeam: false,
        teamGoals: teamGoals,
      });
    }
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
    const { loading } = this.props.playerGoalListUpdate;

    if (this.state.changeTeam) {
      this.setState({
        ...this.state,
        changeTeam: false,
      });
    }

    if (!this.state.gridLoaded && !this.state.changeTeam && !loading) {
      this.updateGrid();
    }
  }

  renderLoader = () => {
    return (
      <div>
        <Loader centered />
      </div>
    );
  };
  addValidationsToGrid = (grid) => {
    const { goals } = this.props.goalList;
    const { definition } = this.props.goalDefinitionDetail;
    const { intl } = this.props;
    let updatedCells = [];
    let hasError = false;
    goals.forEach((goal, index) => {
      const period =
        definition.periodicity.code === 'C'
          ? {
              name: intl
                .formatMessage({ id: 'admin.goal.period_label_short' })
                .format(index + 1),
              date: goal.date,
            }
          : getPeriodByGoal(goal);
      const periodDataCells = _.flatten(grid).filter(
        (cell) => cell.period === period.name
      );

      const playersDataList = periodDataCells.filter(
        (cell) => cell.type === 'playerGoal'
      );
      const playersData = _.get(definition, 'kpi.unit.isRate', false)
        ? parseFloat(
            parseFloat(
              playersDataList.reduce(
                (acc, cell) => (parseFloat(cell.value) || 0) + acc,
                0
              ) / playersDataList.length
            ).toFixed(2)
          )
        : parseFloat(
            parseFloat(
              playersDataList.reduce(
                (acc, cell) => (parseFloat(cell.value) || 0) + acc,
                0
              )
            ).toFixed(2)
          );

      const available = _.get(
        periodDataCells.find((cell) => cell.type === 'availableTarget'),
        'value'
      );
      const used = periodDataCells.find((cell) => cell.type === 'usedTarget');
      const remaining = periodDataCells.find(
        (cell) => cell.type === 'remainingTarget'
      );

      if (used && remaining) {
        if (playersData > available) {
          hasError = true;
          updatedCells = [
            ...updatedCells,
            Object.assign({}, used, {
              className: `${used.className}`,
              error: true,
              value: playersData,
            }),
            Object.assign({}, remaining, {
              className: `${_.replace(used.className, 'valid', '')} error`,
              error: true,
              value: parseFloat(parseFloat(available - playersData).toFixed(2)),
            }),
          ];
        } else {
          updatedCells = [
            ...updatedCells,
            Object.assign({}, used, { error: false, value: playersData }),
            Object.assign({}, remaining, {
              className: `${_.replace(used.className, 'error', '')} valid`,
              error: false,
              value: parseFloat(parseFloat(available - playersData).toFixed(2)),
            }),
          ];
        }
      }
    });

    const result = grid.map((row) => {
      return row.map((cell) => {
        return (
          updatedCells.find(
            (c) =>
              cell.period &&
              cell.type &&
              cell.period === c.period &&
              cell.type === c.type
          ) || cell
        );
      });
    });

    return {
      grid: result,
      error: hasError,
    };
  };

  selectLine = (selection) => {
    const { goals } = this.props.goalList;
    let newSelection;

    if (
      selection.start.i === selection.end.i &&
      selection.start.j === selection.end.j &&
      selection.start.i > 0 &&
      selection.start.j === 0
    ) {
      newSelection = {
        start: {
          i: selection.start.i,
          j: 1,
        },
        end: {
          i: selection.start.i,
          j: goals.length,
        },
      };
    } else {
      newSelection = selection;
    }
    if (!_.isEqual(newSelection, this.state.selection)) {
      this.setState({ ...this.state, selected: selection });
    }
  };

  setGrid = (grid, hasError = false) => {
    this.setState({
      ...this.state,
      grid: grid,
      error: hasError,
    });
  };

  handleSubmit = () => {
    const { definition } = this.props.goalDefinitionDetail;
    const goalList = _.flatten(this.state.grid)
      .filter(
        (cell) =>
          cell.type === 'playerGoal' &&
          !_.isNull(cell.value) &&
          !_.isUndefined(cell.value) &&
          cell.id
      )
      .map((goal) => ({ id: goal.id, target: goal.value }));

    if (_.get(definition, 'type.code') === 'C') {
      this.props.playerGoalListUpdateActions.updatePlayerGoalList(goalList);
    } else {
      this.props.teamGoalListUpdateActions.updateTeamGoalList(goalList);
    }
  };

  renderData = () => {
    const { intl } = this.props;
    const { classes } = this.props;
    const { grid } = this.state;
    const { goals, loading: playerGoalBulkListLoading } =
      this.props.playerGoalBulkList;
    const { loading: teamGoalBulkListLoading } = this.props.teamGoalBulkList;
    const { definition } = this.props.goalDefinitionDetail;
    const {
      loading: loadingPlayer,
      success,
      error,
    } = this.props.playerGoalListUpdate;
    const {
      loading: loadingTeam,
      success: successTeam,
      error: errorTeam,
    } = this.props.teamGoalListUpdate;
    const onContextMenu = (e, cell, i, j) =>
      cell.readOnly ? e.preventDefault() : null;
    // const selectedParam = {selected: this.state.selected}
    const loading = loadingPlayer || loadingTeam;

    if (successTeam || success) {
      this.props.teamGoalListUpdateActions.updateTeamGoalListClear();
      this.props.playerGoalListUpdateActions.updatePlayerGoalListClear();
      toast.success(intl.formatMessage({ id: 'admin.goal.edit.success' }));
    }

    if (errorTeam || error) {
      this.props.teamGoalListUpdateActions.updateTeamGoalListClear();
      this.props.playerGoalListUpdateActions.updatePlayerGoalListClear();
      toast.error(intl.formatMessage({ id: 'admin.goal.edit.error' }));
    }

    const readonly = !definition.isActive;

    return (
      <React.Fragment>
        <Card marginDisabled>
          <Spreadsheet
            grid={grid}
            ref={this.dataGridRef}
            onCellsChanged={(changes, currentGrid) => {
              const validatedGrid = this.addValidationsToGrid(currentGrid);
              this.setGrid(validatedGrid.grid, validatedGrid.error);
            }}
          />
        </Card>
        <Grid container justify='center' style={{ padding: 30 }}>
          <Grid item>
            {this.state.error && !definition.allow_over_target && (
              <ErrorText className={classes.error} align='center'>
                Veuillez respecter l'objectif total alloué pour chaque période
              </ErrorText>
            )}
            <Formsy onValidSubmit={this.handleSubmit}>
              <ProgressButton
                disabled={
                  (this.state.error && !definition.allow_over_target) ||
                  readonly ||
                  playerGoalBulkListLoading ||
                  teamGoalBulkListLoading
                }
                type='submit'
                text={intl.formatMessage({ id: 'common.submit' })}
                loading={loading}
                centered
              />
            </Formsy>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  render = () => {
    const { definition, loading: goaldDefinitionLoading } =
      this.props.goalDefinitionDetail;
    const { goals, loading: playerGoalBulkListLoading } =
      this.props.playerGoalBulkList;
    const { loading: teamGoalBulkListLoading } = this.props.teamGoalBulkList;
    const { loading: teamPlayerGoalListLoading } =
      this.props.teamPlayerGoalBulkList;
    const { playerGoals, teamGoals, teamPlayerGoals } = this.state;
    const { filterLoading, setFilterLoading } = this.props;
    let loading = true;

    if (definition) {
      const type = _.get(definition, 'type.code');

      loading =
        type === 'C'
          ? goaldDefinitionLoading ||
            playerGoalBulkListLoading ||
            teamPlayerGoalListLoading
          : goaldDefinitionLoading || teamGoalBulkListLoading;
    }

    if (loading !== filterLoading) {
      setFilterLoading(loading);
    }

    return (
      <div className={this.props.classes.mainWrapper}>
        {loading && this.renderLoader()}
        {definition &&
          ((playerGoals && playerGoals.length > 0) ||
            (teamPlayerGoals && teamPlayerGoals.length > 0) ||
            (teamGoals && teamGoals.length > 0)) &&
          this.renderData()}
      </div>
    );
  };
}

const mapStateToProps = ({
  teamList,
  goalList,
  goalDefinitionDetail,
  playerGoalBulkList,
  teamPlayerGoalBulkList,
  teamGoalBulkList,
  playerGoalListUpdate,
  teamGoalListUpdate,
  accountDetail,
}) => ({
  teamList,
  goalList,
  goalDefinitionDetail,
  playerGoalBulkList,
  teamGoalBulkList,
  teamPlayerGoalBulkList,
  playerGoalListUpdate,
  teamGoalListUpdate,
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  goalListActions: bindActionCreators(goalListActions, dispatch),
  playerGoalBulkListActions: bindActionCreators(
    playerGoalBulkListActions,
    dispatch
  ),
  teamGoalBulkListActions: bindActionCreators(
    teamGoalBulkListActions,
    dispatch
  ),
  teamPlayerGoalBulkListActions: bindActionCreators(
    teamPlayerGoalBulkListActions,
    dispatch
  ),
  playerGoalListUpdateActions: bindActionCreators(
    playerGoalListUpdateActions,
    dispatch
  ),
  teamGoalListUpdateActions: bindActionCreators(
    teamGoalListUpdateActions,
    dispatch
  ),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(GoalSpreadsheet))
);
