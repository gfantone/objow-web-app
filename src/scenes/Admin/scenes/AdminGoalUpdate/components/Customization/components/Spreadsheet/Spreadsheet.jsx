import React, { Component, useState } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import ReactDataSheet from 'react-datasheet'
import { Loader, Card, ProgressButton, ErrorText } from '../../../../../../../../components'
import * as Resources from '../../../../../../../../Resources'
import * as goalListActions from '../../../../../../../../services/Goals/GoalList/actions'
import * as playerGoalBulkListActions from '../../../../../../../../services/PlayerGoals/PlayerGoalBulkList/actions'
import * as teamGoalBulkListActions from '../../../../../../../../services/TeamGoals/TeamGoalBulkList/actions'
import * as teamPlayerGoalBulkListActions from '../../../../../../../../services/TeamPlayerGoals/TeamPlayerGoalBulkList/actions'
import * as playerGoalListUpdateActions from '../../../../../../../../services/PlayerGoals/PlayerGoalListUpdate/actions'
import * as teamGoalListUpdateActions from '../../../../../../../../services/TeamGoals/TeamGoalListUpdate/actions'
import getPeriodByGoal from '../../helpers/getPeriodByGoal'
import _ from 'lodash'

const styles = {
  root: {
      padding: 16,
  },
  mainWrapper: {
    marginTop: 50,
  },
  spreadsheet: {
    width: '100%',
    paddingLeft: '250px',
    position: 'relative',
    '& .data-grid-container .data-grid': {
      display: 'block',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      '&::-webkit-scrollbar-track': {
        background: '#ddd',
        borderRadius: 8,
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 8,
        border: '2px solid #ddd',
        background: '#888'

      },
      '&::-webkit-scrollbar': {
        '-webkit-appearance': 'none',
        '&:horizontal': {
          height: 11
        }
      }
    },
    '& .data-grid-container .data-grid .cell > input': {
      width: '100%',
      height: '100%'
    },
    '& .data-grid-container .data-grid .cell.read-only': {
      color: '#555555',
      background: 'white',
      '&.empty': {
        background: 'rgb(251, 238, 237)',
        border: 'none',
        '&.selected': {
          borderTop: '1px double rgb(33, 133, 208)',
          borderRight: '1px double rgb(33, 133, 208)',
          borderLeft: '1px double rgb(33, 133, 208)',
          borderBottom: '1px double rgb(33, 133, 208)',
        }
      }
    },
    '& .data-grid-container .data-grid .cell.read-only.firstCell': {
      textAlign: 'left'
    },
    '& .cell.baseCell.firstCell': {
      paddingLeft: 5,
      position: 'absolute',
      lineHeight: 2,
      // marginTop: '-1px',
      width: '250px',
      height: 31,
      zIndex: 30,
      left: 0,
      fontWeight: 'bold',
      borderTop: 0,
      borderBottom: 0,
      fontSize: 14,
      '&.selected': {
        borderTop: '1px double rgb(33, 133, 208)',
        borderRight: '1px double rgb(33, 133, 208)',
        borderLeft: '1px double rgb(33, 133, 208)',
        borderBottom: '1px double rgb(33, 133, 208)',
        zIndex: 40
      }
    },
    // First cell of first line
    '& tr:first-of-type .cell.baseCell.firstCell': {
      borderTop: '1px solid #ddd',
      marginTop: '-1px',
      '&.selected': {
        borderTop: '1px double rgb(33, 133, 208)',
        borderRight: '1px double rgb(33, 133, 208)',
        borderLeft: '1px double rgb(33, 133, 208)',
        borderBottom: '1px double rgb(33, 133, 208)',
      }
    },
    // First cell of last line
    '& tr:last-of-type .cell.baseCell.firstCell': {
      borderBottom: '1px solid #ddd',
      '&.selected': {
        borderTop: '1px double rgb(33, 133, 208)',
        borderRight: '1px double rgb(33, 133, 208)',
        borderLeft: '1px double rgb(33, 133, 208)',
        borderBottom: '1px double rgb(33, 133, 208)',
      }
    },
    '&  .data-grid-container .data-grid .cell.baseCell.firstLine': {
      '&.read-only': {
        color: '#333',
        textTransform: 'capitalize',
        fontWeight: 'bold',
      },
    },
    // '& .cell.bottomSeparator': {
    //   borderBottom: '1px solid #333'
    // },
    '& .cell.baseCell': {
      lineHeight: 2,
      height: 30,
      zIndex: 10
    },
    '& .data-grid-container .data-grid .cell.dataCell': {
      '&.read-only': {
        textAlign: 'right',
        color: '#ddd',
      },
      '&.period-W': {
        minWidth: 110
      },
      '&.period-M': {
        minWidth: 150
      },
      '&.period-Q': {
        minWidth: 300
      },
      '&.period-S': {
        minWidth: 300
      },
      '&.period-Y': {
        minWidth: 300
      },
    },


    '& .data-grid-container .data-grid .cell.collaboratorCell': {
      borderRight: '1px double #ADD8E6',
      '&.read-only': {
        // color: 'white',
        color: '#333',
        background: '#ADD8E6'
      }
    },
    '&  .data-grid-container .data-grid .cell.read-only.footerCell': {

        fontWeight: 'bold',
        border: 'none',
        color: '#333',
        background: "#ddd",
        textAlign: 'right',
        fontSize: 16,
        lineHeight: 1.7,
        '&.error': {
          color: '#E50000'
        },
        '&.valid': {
          color: '#00E58D'
        },
        '&.firstCell':{
          textAlign: 'left',
        },
        '&.selected': {
          borderTop: '1px double rgb(33, 133, 208)',
          borderRight: '1px double rgb(33, 133, 208)',
          borderLeft: '1px double rgb(33, 133, 208)',
          borderBottom: '1px double rgb(33, 133, 208)',
        }
    },
  },
  error: {
      marginBottom: 16
  }
}

class Spreadsheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // index of current period which goals are being loaded
            currentGoalIndexLoading: 0,
            // index of current team which goals are being loaded
            currentTeamLoading: 0,
            loadComplete: false,
            goals: [],
            playerGoals: {},
            teamPlayerGoals: [],
            gridLoaded: false,
            changeTeam: false,
            grid: [

            ],
            error: false,
            selected: {

            }
        }
        this.lastSelected = null
        this.dataGridRef = React.createRef()
    }

    updateGridIndividual = () => {
      const { goals } = this.props.goalList;
      const { teams } = this.props.teamList;
      const { definition } = this.props.goalDefinitionDetail
      const { goals: playerGoals, loading: playerGoalBulkListLoading } = this.props.playerGoalBulkList;
      const { goals: teamPlayerGoals, loading: teamPlayerGoalListLoading } = this.props.teamPlayerGoalBulkList
      const now = new Date()
      const goalsByTeam = {}
      let team;
      let collaborators = []

      if(playerGoals && teamPlayerGoals && playerGoals.length > 0 && teamPlayerGoals.length > 0) {

        playerGoals.forEach((response) => {
          team = _.get(response, 'data[0].collaborator.team.id');
          collaborators =  [...collaborators, _.get(response, 'data').map(goal => goal.collaborator)]
          if(!goalsByTeam[team]) {
            goalsByTeam[team] = []
          }
          goalsByTeam[team] = [...goalsByTeam[team], response.data];
        });

        collaborators = _.uniqBy(_.flatten(collaborators), c => c.id)


        let data = []
        let bottomSeparatorClass = ''
        teams.forEach((team, teamIndex) => {
          data = [...data, []]
          if(goalsByTeam[team.id]) {
            goalsByTeam[team.id].forEach((playerGoalsByPeriod, periodIndex) => {
              const period = getPeriodByGoal(goals[periodIndex])

              collaborators.forEach((collaborator, collaboratorIndex) => {
                const playerGoalByPeriod = playerGoalsByPeriod.find(g => g.collaborator.id === collaborator.id)
                if(data[teamIndex].length < collaboratorIndex + 1) {
                  data[teamIndex] = [...data[teamIndex], [{
                    value: _.get(collaborator, 'fullname'),
                    readOnly: true,
                    className: 'firstCell collaboratorCell baseCell'
                  }]]
                }
                bottomSeparatorClass = collaboratorIndex >= playerGoalsByPeriod.length - 1 ? 'bottomSeparator' : ''
                const goal = goals[periodIndex]
                const playerGoal = goalsByTeam[team.id][periodIndex][collaboratorIndex]
                const editable = playerGoal && ((goal.start.toDate() <= now && now <= goal.end.toDate()) || goal.start.toDate() >= now)
                data[teamIndex][collaboratorIndex] = [...data[teamIndex][collaboratorIndex], {
                  value: playerGoal ? playerGoal.target : '',
                  className: `dataCell baseCell ${bottomSeparatorClass} ${!playerGoal ? 'empty' : ''} period-${definition.periodicity.code}`,
                  period: period.name,
                  readOnly: !editable || !definition.isActive,
                  type: 'playerGoal',
                  id: playerGoal ? goalsByTeam[team.id][periodIndex][collaboratorIndex].id : ''
                }]

              })

              const lineNumber = collaborators.length
              // Total by team
              data[teamIndex][lineNumber] = data[teamIndex][lineNumber] || [{
                value: `Objectif alloué`,
                readOnly: true,
                className: 'firstCell baseCell totalCell footerCell'
              }]

              data[teamIndex][lineNumber] = [...data[teamIndex][lineNumber], {
                type: 'availableTarget',
                period: period.name,
                readOnly: true,
                value: _.get(teamPlayerGoals[periodIndex].data[teamIndex], 'target'),
                className: 'baseCell footerCell topSeparator'
              }]
              const usedTarget = _.get(definition, 'kpi.unit.isRate', false) ?
                Math.ceil(playerGoalsByPeriod.reduce((acc, goal) => acc + goal.target, 0) / playerGoalsByPeriod.length) :
                playerGoalsByPeriod.reduce((acc, goal) => acc + goal.target, 0)

              // Used by team
              data[teamIndex][lineNumber + 1] = data[teamIndex][lineNumber + 1] || [{
                value: `Objectif utilisé`,
                readOnly: true,
                className: 'firstCell baseCell totalCell footerCell'
              }]

              data[teamIndex][lineNumber + 1] = [...data[teamIndex][lineNumber + 1], {
                value: usedTarget,
                type: 'usedTarget',
                period: period.name,
                readOnly: true,
                className: 'baseCell footerCell'
              }]

              // Remaining
              data[teamIndex][lineNumber + 2] = data[teamIndex][lineNumber + 2] || [{
                value: `Objectif restant`,
                readOnly: true,
                className: 'firstCell baseCell totalCell footerCell'
              }]

              data[teamIndex][lineNumber + 2] = [...data[teamIndex][lineNumber + 2], {
                value: _.get(teamPlayerGoals[periodIndex].data[teamIndex], 'target') - usedTarget,
                readOnly: true,
                type: 'remainingTarget',
                period: period.name,
                className: 'baseCell footerCell'
              }]
            })
          }
        });
        const validatedGrid = this.addValidationsToGrid([
          [{ value: '', readOnly: true, className: 'firstCell baseCell firstLine' }, ...goals.map(goal => ({value: getPeriodByGoal(goal).name, readOnly: true, className: 'dataCell baseCell firstLine'}) )],
          ..._.flatten(data)
        ])
        this.setState({
          ...this.state,
          grid: validatedGrid.grid,
          error: validatedGrid.error,
          changeTeam: false,
          gridLoaded: true
        })
      }
    }

    updateGridTeam = () => {
      const { goals } = this.props.goalList;
      const { teams } = this.props.teamList;
      const { definition } = this.props.goalDefinitionDetail
      const { goals: teamGoals } = this.props.teamGoalBulkList;
      let data = []
      const now = new Date()

      if(teamGoals && teamGoals.length > 0) {
        teamGoals.forEach((response, periodIndex) => {
          const goal = goals[periodIndex]
          const period = getPeriodByGoal(goal)
          const editable = (goal.start.toDate() <= now && now <= goal.end.toDate()) || goal.start.toDate() >= now
          response.data.forEach((teamGoal, teamIndex) => {
            if(data.length <= teamIndex){
              data = [...data, [{
                value: _.get(teamGoal, 'team.name'),
                readOnly: true,
                className: 'firstCell baseCell collaboratorCell'
              }]]
            }
            data[teamIndex] = [...data[teamIndex], {
              value: _.get(teamGoal, 'target'),
              period: period.name,
              id: _.get(teamGoal, 'id'),
              readOnly: !editable || !definition.isActive,
              type: 'playerGoal',
              className: `dataCell baseCell period-${definition.periodicity.code}`
            }]
          })

          const lineNumber = response.data.length

          data[lineNumber] = data[lineNumber] || [{
            value: `Objectif alloué`,
            readOnly: true,
            className: 'firstCell baseCell totalCell footerCell'
          }]

          data[lineNumber] = [...data[lineNumber], {
            type: 'availableTarget',
            period: period.name,
            readOnly: true,
            value: _.get(goals[periodIndex], 'target'),
            className: 'baseCell footerCell topSeparator'
          }]

          const usedTarget = _.get(definition, 'kpi.unit.isRate', false) ?
            Math.ceil(response.data.reduce((acc, goal) => acc + goal.target, 0) / response.data.length) :
            response.data.reduce((acc, goal) => acc + goal.target, 0)
          // Used by team
          data[lineNumber + 1] = data[lineNumber + 1] || [{
            value: `Objectif utilisé`,
            readOnly: true,
            className: 'firstCell baseCell totalCell footerCell'
          }]

          data[lineNumber + 1] = [...data[lineNumber + 1], {
            value: usedTarget,
            type: 'usedTarget',
            period: period.name,
            readOnly: true,
            className: 'baseCell footerCell'
          }]

          // Remaining
          data[lineNumber + 2] = data[lineNumber + 2] || [{
            value: `Objectif restant`,
            readOnly: true,
            className: 'firstCell baseCell totalCell footerCell'
          }]

          data[lineNumber + 2] = [...data[lineNumber + 2], {
            value: _.get(goals[periodIndex], 'target') - usedTarget,
            readOnly: true,
            type: 'remainingTarget',
            period: period.name,
            className: 'baseCell footerCell'
          }]
        });
        const validatedGrid = this.addValidationsToGrid([
          [{ value: '', readOnly: true, className: 'firstCell baseCell firstLine' }, ...goals.map(goal => ({value: getPeriodByGoal(goal).name, readOnly: true, className: 'dataCell baseCell firstLine'}) )],
          ...data
        ])
        this.setState({
          ...this.state,
          grid: validatedGrid.grid,
          error: validatedGrid.error,
          changeTeam: false,
          gridLoaded: true
        })
      }
    }

    updateGrid = () => {
      const {definition} = this.props.goalDefinitionDetail
      const isIndividualGoals = _.get(definition, 'type.code') === 'C'
      if(isIndividualGoals) {
        this.updateGridIndividual()
      } else {
        this.updateGridTeam()
      }

    }

    componentDidMount() {
      this.fetchGoals()
    }

    fetchGoals = () => {
      const {definition} = this.props.goalDefinitionDetail
      const { teams } = this.props.teamList;
      const { goals } = this.props.goalList;
      const { team } = this.props;
      const filteredTeams = team ? teams.filter(t => parseInt(t.id) === parseInt(team)) : [teams[0]]

      // load data
      // const currentTeam = teams[this.state.currentTeamLoading]

      if(goals && goals.length > 0) {
        const dates = goals.map(goal => getPeriodByGoal(goal).date)

        if(definition) {
          this.props.goalListActions.getGoalList(definition.id)
          if(_.get(definition, 'type.code') === 'C') {
            this.props.playerGoalBulkListActions.getPlayerGoalBulkList(definition.id, dates, filteredTeams)
            this.props.teamPlayerGoalBulkListActions.getTeamPlayerGoalBulkList(definition.id, dates, filteredTeams[0])
          } else {
            this.props.teamGoalBulkListActions.getTeamGoalBulkList(definition.id, dates)
          }
        }
      }
    }
    componentWillReceiveProps(nextProps) {

      if(nextProps.team !== this.props.team) {
        this.setState({
          ...this.state,
          gridLoaded: false,
          changeTeam: true,
        }, this.fetchGoals)
      }
    }

    componentDidUpdate() {
      if(this.state.changeTeam) {
        this.setState({
          ...this.state,
          changeTeam: false
        })
      }
      if(!this.state.gridLoaded && !this.state.changeTeam) {
        this.updateGrid()
      }
    }
    // getPeriodByGoal = (goal) => {
    //
    //   const { definition } = this.props.goalDefinitionDetail
    //   const periodicity = _.get(definition, 'periodicity.code')
    //   if(periodicity === 'W') {
    //     return this.getWeekByGoal(goal)
    //   }
    //   if(periodicity === 'M') {
    //     return this.getMonthByGoal(goal)
    //   }
    //   if(periodicity === 'Q') {
    //     return this.getQuarterByGoal(goal)
    //   }
    //   if(periodicity === 'S') {
    //     return this.getSemesterByGoal(goal)
    //   }
    //   if(periodicity === 'Y') {
    //     return this.getYearByGoal(goal)
    //   }
    // }
    //
    // getWeekByGoal = (goal) => {
    //   const date = goal.start.toDate();
    //   return {name: `Semaine ${date.getWeekNumber()}`, date: date}
    // }
    //
    // getMonthByGoal = (goal) => {
    //   const date = goal.start.toDate();
    //   return {name: Intl.DateTimeFormat('fr-FR', {month: 'long'}).format(date), date: date}
    // };
    //
    // getQuarterByGoal = (goal) => {
    //   const date = goal.start.toDate();
    //   return {name: `Trimestre ${date.getQuarterNumber()}`, date: date}
    // }
    //
    // getSemesterByGoal = (goal) => {
    //   const date = goal.start.toDate();
    //   return {name: `Semestre ${date.getSemesterNumber()}`, date: date}
    // }
    //
    // getYearByGoal = (goal) => {
    //   const date = goal.start.toDate();
    //
    //   return { name: date.getFullYear(), date: date }
    // }

    renderLoader = () => {
        return <div>
            <Loader centered />
        </div>
    }
    addValidationsToGrid = (grid) => {
      const { goals } = this.props.goalList;
      const { definition } = this.props.goalDefinitionDetail
      let updatedCells = []
      let hasError = false
      goals.forEach((goal) => {
        const period = getPeriodByGoal(goal)
        const periodDataCells = _.flatten(grid).filter(cell => cell.period === period.name)
        const playersDataList = periodDataCells.filter(cell => cell.type === 'playerGoal')
        const playersData = _.get(definition, 'kpi.unit.isRate', false) ?
          Math.ceil(playersDataList.reduce((acc, cell) => cell.value + acc, 0) / playersDataList.length) :
          playersDataList.reduce((acc, cell) => cell.value + acc, 0)

        const available = _.get(periodDataCells.find(cell => cell.type === 'availableTarget'), 'value')
        const used = periodDataCells.find(cell => cell.type === 'usedTarget')
        const remaining = periodDataCells.find(cell => cell.type === 'remainingTarget')
        if(used && remaining) {
          if(playersData > available) {
            hasError = true
            updatedCells = [
              ...updatedCells,
              Object.assign({}, used, { className: `${used.className}`, error: true, value: playersData }),
              Object.assign({}, remaining, { className: `${_.replace(used.className, 'valid', '')} error`, error: true, value: available - playersData })
            ]
          } else {
            updatedCells = [
              ...updatedCells,
              Object.assign({}, used, { error: false, value: playersData }),
              Object.assign({}, remaining, { className: `${_.replace(used.className, 'error', '')} valid`, error: false, value: available - playersData })
            ]
          }
        }
      });

      const result = grid.map(row => {
        return row.map(cell => {
          return updatedCells.find(c => cell.period && cell.type && cell.period === c.period && cell.type === c.type) || cell
        })
      })

      return {
        grid: result,
        error: hasError
      }
    }

    selectLine = (selection) => {
      const { goals } = this.props.goalList;
      let newSelection;

      if(selection.start.i === selection.end.i && selection.start.j === selection.end.j && selection.start.i > 0 && selection.start.j === 0) {
        newSelection = {
          start: {
            i: selection.start.i,
            j: 1
          },
          end: {
            i: selection.start.i,
            j: goals.length
          }
        }
      } else {

        newSelection = selection
      }
      if(!_.isEqual(newSelection, this.state.selection)){
        this.setState({...this.state, selected: selection})
      }
    }

    setGrid = (grid, hasError=false) => {
      this.setState({
        ...this.state,
        grid: grid,
        error: hasError
      })
    }
    handleSubmit = () => {
      const {definition} = this.props.goalDefinitionDetail
      const goalList = _.flatten(this.state.grid).filter(cell => cell.type === 'playerGoal').map(goal => (
        {id: goal.id, target: goal.value}
      ))

      if(_.get(definition, 'type.code') === 'C') {
        this.props.playerGoalListUpdateActions.updatePlayerGoalList(goalList)
      } else {
        this.props.teamGoalListUpdateActions.updateTeamGoalList(goalList)
      }

    }

    renderData = () => {
        const {classes} = this.props
        const { grid } = this.state
        const {definition} = this.props.goalDefinitionDetail
        const { loading } = this.props.playerGoalListUpdate;
        const onContextMenu = (e, cell, i, j) => cell.readOnly ? e.preventDefault() : null;
        // const selectedParam = {selected: this.state.selected}

        const readonly = !definition.isActive

        return (
          <React.Fragment>
            <Card marginDisabled>
              <div className={ classes.spreadsheet }>
                <ReactDataSheet
                  data={grid}
                  ref={this.dataGridRef}
                  valueRenderer={cell => cell.value}
                  onCellsChanged={changes => {
                    const currentGrid = grid.map(row => [...row]);
                    if(changes.filter( ({ cell, row, col, value }) => !isNaN(parseInt(value))).length > 0) {
                      changes.forEach(({ cell, row, col, value }) => {
                        // Only numeric values are valid and converted to Int
                        if(!isNaN(parseInt(value)) && parseInt(value) >= 0) {
                          currentGrid[row][col] = { ...currentGrid[row][col], value: parseInt(value) };
                        }
                      });
                      const validatedGrid = this.addValidationsToGrid(currentGrid)
                      this.setGrid(
                        validatedGrid.grid,
                        validatedGrid.error
                      );
                    }
                  }}
                  onContextMenu={onContextMenu}

                  onSelect={({ start, end }) => {
                    // this.selectLine({start, end})

                    // TODO : update scrollLeft when move selection outside of grid
                    if(this.lastSelected) {

                      const dataGrid = _.get(this.dataGridRef, 'current.dgDom.children[0]')
                      let movingCell;
                      let direction;

                      if(start.j !== this.lastSelected.start.j) {
                        movingCell = 'start'
                        direction = this.lastSelected.start.j < start.j ? 'right' : 'left'
                      }
                      if(end.j !== this.lastSelected.end.j) {
                        movingCell = 'end'
                        direction = this.lastSelected.end.j < end.j ? 'right' : 'left'
                      }

                      // dataGrid.scrollLeft = 150
                    }
                    this.lastSelected = { start, end }
                  }}
                  cellRenderer={props => {
                    return(
                      <td {...props} style={props.cell.style}>
                        {props.children}
                      </td>
                    )
                  }}
                  />
              </div>
            </Card>
            <Grid container justify='center' style={{padding: 30}}>
              <Grid item>
                { this.state.error && !definition.allow_over_target && <ErrorText className={classes.error} align='center'>Veuillez respecter l'objectif total alloué pour chaque période</ErrorText> }
                <Formsy onValidSubmit={this.handleSubmit}>
                  <ProgressButton disabled={this.state.error && !definition.allow_over_target || readonly} type='submit' text='Valider' loading={loading} centered />
                </Formsy>
              </Grid>
            </Grid>
          </React.Fragment>
        )
    }

    render = () => {
      const {definition, loading: goaldDefinitionLoading} = this.props.goalDefinitionDetail
      const { goals, loading: playerGoalBulkListLoading } = this.props.playerGoalBulkList;
      const { goals: teamGoals, loading: teamGoalBulkListLoading } = this.props.teamGoalBulkList;
      const { goals: teamPlayerGoals, loading: teamPlayerGoalListLoading } = this.props.teamPlayerGoalBulkList
      let loading = true;

      if(definition) {
        const type = _.get(definition, 'type.code')

        loading = type === 'C' ?
          goaldDefinitionLoading || playerGoalBulkListLoading || teamPlayerGoalListLoading :
          goaldDefinitionLoading || teamGoalBulkListLoading
      }
      return (
          <div className={this.props.classes.mainWrapper}>
              {loading && this.renderLoader()}
              {!loading && definition && (goals && (teamGoals || teamPlayerGoals)) && this.renderData()}
          </div>
      )
    }
}

const mapStateToProps = ({teamList, goalList, goalDefinitionDetail, playerGoalBulkList, teamPlayerGoalBulkList, teamGoalBulkList, playerGoalListUpdate, teamGoalListUpdate}) => ({
    teamList,
    goalList,
    goalDefinitionDetail,
    playerGoalBulkList,
    teamGoalBulkList,
    teamPlayerGoalBulkList,
    playerGoalListUpdate,
    teamGoalListUpdate
})

const mapDispatchToProps = (dispatch) => ({
    goalListActions: bindActionCreators(goalListActions, dispatch),
    playerGoalBulkListActions: bindActionCreators(playerGoalBulkListActions, dispatch),
    teamGoalBulkListActions: bindActionCreators(teamGoalBulkListActions, dispatch),
    teamPlayerGoalBulkListActions: bindActionCreators(teamPlayerGoalBulkListActions, dispatch),
    playerGoalListUpdateActions: bindActionCreators(playerGoalListUpdateActions, dispatch),
    teamGoalListUpdateActions: bindActionCreators(teamGoalListUpdateActions, dispatch),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Spreadsheet))
