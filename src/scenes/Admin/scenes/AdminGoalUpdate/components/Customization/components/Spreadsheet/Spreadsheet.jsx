import React, { Component, useState } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import ReactDataSheet from 'react-datasheet'
import { Loader, Card, ProgressButton } from '../../../../../../../../components'
import * as Resources from '../../../../../../../../Resources'
import * as playerGoalBulkListActions from '../../../../../../../../services/PlayerGoals/PlayerGoalBulkList/actions'
import * as teamGoalBulkListActions from '../../../../../../../../services/TeamGoals/TeamGoalBulkList/actions'
import * as teamPlayerGoalBulkListActions from '../../../../../../../../services/TeamPlayerGoals/TeamPlayerGoalBulkList/actions'
import * as playerGoalListUpdateActions from '../../../../../../../../services/PlayerGoals/PlayerGoalListUpdate/actions'
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
        borderBottom: '1px double rgb(33, 133, 208)',
      }
    },
    // First cell of last line
    '& tr:last-of-type .cell.baseCell.firstCell': {
      borderBottom: '1px solid #ddd',
      '&.selected': {
        borderTop: '1px double rgb(33, 133, 208)',
        borderBottom: '1px double rgb(33, 133, 208)',
      }
    },
    '& .cell.baseCell.firstLine': {
      background: 'white',
      color: '#333',
      textTransform: 'capitalize',
      fontWeight: 'bold',

    },
    '& .cell.bottomSeparator': {
      borderBottom: '1px solid #333'
    },
    '& .cell.baseCell': {
      lineHeight: 2,
      height: 30,
      zIndex: 10
    },
    '& .cell.dataCell': {
      minWidth: 150,
      '&.read-only': {
        textAlign: 'right'
      }
      // '&.selected': {
      //   zIndex: 40
      // }
    },
    '& .cell.read-only': {
      color: '#555555'
    },
    '& .cell.read-only.error': {
      color: 'red'
    },
    '& .cell.totalCell': {
    },
    '& .cell.marginCell': {
      minWidth: 300,
      zIndex: 20
    },
    '& .cell.collaboratorCell': {
      borderRight: '1px double #ADD8E6',
      '&.read-only': {
        // color: 'white',
        color: '#333',
        background: '#ADD8E6'
      }
    },
    '& .cell.footerCell': {
      // '&.read-only': {
      //
      //   background: '#555',
      //   color: 'white'
      // }
    },
  },

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

            ]
        }
    }

    updateGridIndividual = () => {
      const { goals } = this.props.goalList;
      const { teams } = this.props.teamList;
      const { goals: playerGoals, loading: playerGoalBulkListLoading } = this.props.playerGoalBulkList;
      const { goals: teamPlayerGoals, loading: teamPlayerGoalListLoading } = this.props.teamPlayerGoalBulkList

      const goalsByTeam = {}
      let team;

      if(playerGoals.length > 0) {
        playerGoals.forEach((response) => {
          team = _.get(response, 'data[0].collaborator.team.id');
          if(!goalsByTeam[team]) {
            goalsByTeam[team] = []
          }
          goalsByTeam[team] = [...goalsByTeam[team], response.data];
        });

        let data = []
        let bottomSeparatorClass = ''
        teams.forEach((team, teamIndex) => {
          data = [...data, []]
          if(goalsByTeam[team.id]) {
            goalsByTeam[team.id].forEach((playerGoalsByPeriod, periodIndex) => {
              const period = this.getPeriodByGoal(goals[periodIndex])
              playerGoalsByPeriod.forEach((playerGoalByPeriod, collaboratorIndex) => {
                if(data[teamIndex].length < collaboratorIndex + 1) {
                  data[teamIndex] = [...data[teamIndex], [{
                    value: _.get(playerGoalByPeriod, 'collaborator.fullname'),
                    readOnly: true,
                    className: 'firstCell collaboratorCell baseCell'
                  }]]
                }
                bottomSeparatorClass = collaboratorIndex >= playerGoalsByPeriod.length - 1 ? 'bottomSeparator' : ''
                data[teamIndex][collaboratorIndex] = [...data[teamIndex][collaboratorIndex], {
                  value: goalsByTeam[team.id][periodIndex][collaboratorIndex].target,
                  className: `dataCell baseCell ${bottomSeparatorClass}`,
                  period: period.name,
                  type: 'playerGoal',
                  id: goalsByTeam[team.id][periodIndex][collaboratorIndex].id
                }]

              })

              // Total by team
              data[teamIndex][playerGoalsByPeriod.length] = data[teamIndex][playerGoalsByPeriod.length] || [{
                value: `Objectif alloué`,
                readOnly: true,
                className: 'firstCell baseCell totalCell footerCell'
              }]

              data[teamIndex][playerGoalsByPeriod.length] = [...data[teamIndex][playerGoalsByPeriod.length], {
                type: 'availableTarget',
                period: period.name,
                value: _.get(teamPlayerGoals[periodIndex].data[teamIndex], 'target'),
                className: 'dataCell baseCell footerCell topSeparator'
              }]

              const usedTarget = playerGoalsByPeriod.reduce((acc, goal) => acc + goal.target, 0)

              // Used by team
              data[teamIndex][playerGoalsByPeriod.length + 1] = data[teamIndex][playerGoalsByPeriod.length + 1] || [{
                value: `Objectif utilisé`,
                readOnly: true,
                className: 'firstCell baseCell totalCell footerCell'
              }]

              data[teamIndex][playerGoalsByPeriod.length + 1] = [...data[teamIndex][playerGoalsByPeriod.length + 1], {
                value: usedTarget,
                type: 'usedTarget',
                period: period.name,
                readOnly: true,
                className: 'dataCell baseCell footerCell'
              }]

              // Remaining
              data[teamIndex][playerGoalsByPeriod.length + 2] = data[teamIndex][playerGoalsByPeriod.length + 2] || [{
                value: `Objectif restant`,
                readOnly: true,
                className: 'firstCell baseCell totalCell footerCell'
              }]

              data[teamIndex][playerGoalsByPeriod.length + 2] = [...data[teamIndex][playerGoalsByPeriod.length + 2], {
                value: _.get(teamPlayerGoals[periodIndex].data[teamIndex], 'target') - usedTarget,
                readOnly: true,
                type: 'remainingTarget',
                period: period.name,
                className: 'dataCell baseCell footerCell'
              }]
            })
          }
        });

        this.setState({
          ...this.state,
          grid: [
            [{ value: '', readOnly: true, className: 'firstCell baseCell firstLine' }, ...goals.map(goal => ({value: this.getPeriodByGoal(goal).name, readOnly: true, className: 'dataCell baseCell firstLine'}) )],
            ..._.flatten(data)
          ],
          changeTeam: false,
          gridLoaded: true
        })
      }
    }

    updateGridTeam = () => {
      const { goals } = this.props.goalList;
      const { teams } = this.props.teamList;
      const { goals: teamGoals } = this.props.teamGoalBulkList;
      let data = []

      if(teamGoals && teamGoals.length > 0) {
        teamGoals.forEach((response) => {
          response.data.forEach((teamGoal, teamIndex) => {
            if(data.length <= teamIndex){
              data = [...data, [{
                value: _.get(teamGoal, 'team.name'),
                readOnly: true,
                className: 'firstCell baseCell'
              }]]
            }
            data[teamIndex] = [...data[teamIndex], {
              value: _.get(teamGoal, 'target'),
              className: 'dataCell baseCell'
            }]
          })
        });
        this.setState({
          ...this.state,
          grid: [
            [{ value: '', readOnly: true, className: 'firstCell baseCell' }, ...goals.map(goal => ({value: this.getPeriodByGoal(goal).name, readOnly: true, className: 'dataCell baseCell'}) )],
            ...data
          ],
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
        const dates = goals.map(goal => this.getPeriodByGoal(goal).date)

        if(definition) {
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
    getPeriodByGoal = (goal) => {
      const { definition } = this.props.goalDefinitionDetail
      const periodicity = _.get(definition, 'periodicity.code')
      if(periodicity === 'W') {
        return this.getWeekByGoal(goal)
      }
      if(periodicity === 'M') {
        return this.getMonthByGoal(goal)
      }
      if(periodicity === 'Q') {
        return this.getQuarterByGoal(goal)
      }
      if(periodicity === 'S') {
        return this.getSemesterByGoal(goal)
      }
      if(periodicity === 'Y') {
        return this.getYearByGoal(goal)
      }
    }

    getWeekByGoal = (goal) => {
      const date = goal.start.toDate();
      return {name: `Semaine ${date.getWeekNumber()}`, date: date}
    }

    getMonthByGoal = (goal) => {
      const date = goal.start.toDate();
      return {name: Intl.DateTimeFormat('fr-FR', {month: 'long'}).format(date), date: date}
    };

    getQuarterByGoal = (goal) => {
      const date = goal.start.toDate();
      return {name: `Trimestre ${date.getQuarterNumber()}`, date: date}
    }

    getSemesterByGoal = (goal) => {
      const date = goal.start.toDate();
      return {name: `Semestre ${date.getSemesterNumber()}`, date: date}
    }

    getYearByGoal = (goal) => {
      const date = goal.start.toDate();

      return { name: date.getFullYear(), date: date }
    }

    renderLoader = () => {
        return <div>
            <Loader centered />
        </div>
    }
    addValidationsToGrid = (grid) => {

      const { goals } = this.props.goalList;
      let updatedCells = []
      goals.forEach((goal) => {
        const period = this.getPeriodByGoal(goal)
        const periodDataCells = _.flatten(grid).filter(cell => cell.period === period.name)
        const playersData = periodDataCells.filter(cell => cell.type === 'playerGoal').reduce((acc, cell) => cell.value + acc, 0)
        const available = _.get(periodDataCells.find(cell => cell.type === 'availableTarget'), 'value')
        const used = periodDataCells.find(cell => cell.type === 'usedTarget')
        const remaining = periodDataCells.find(cell => cell.type === 'remainingTarget')
        if(playersData > available) {
          updatedCells = [
            ...updatedCells,
            Object.assign({}, used, { className: `${used.className} error`, error: true, value: playersData }),
            Object.assign({}, remaining, { className: `${used.className} error`, error: true, value: available - playersData })
          ]
        } else {
          updatedCells = [
            ...updatedCells,
            Object.assign({}, used, { className: _.replace(used.className, 'error', ''), error: false, value: playersData }),
            Object.assign({}, remaining, { className: _.replace(used.className, 'error', ''), error: false, value: available - playersData })
          ]
        }
      });

      const result = grid.map(row => {
        return row.map(cell => {
          return updatedCells.find(c => cell.period && cell.type && cell.period === c.period && cell.type === c.type) || cell
        })
      })
      return result
    }

    setGrid = (grid) => {
      this.setState({
        ...this.state,
        grid: grid
      })
    }
    handleSubmit = () => {
      const goalList = _.flatten(this.state.grid).filter(cell => cell.type === 'playerGoal').map(goal => (
        {id: goal.id, target: goal.value}
      ))

      this.props.playerGoalListUpdateActions.updatePlayerGoalList(goalList)
    }

    renderData = () => {
        const {classes} = this.props
        const { grid } = this.state
        const {definition} = this.props.goalDefinitionDetail
        const { loading } = this.props.playerGoalListUpdate;
        const onContextMenu = (e, cell, i, j) => cell.readOnly ? e.preventDefault() : null;
        // this.updateGrid()
        return (
          <React.Fragment>
            <Card marginDisabled>
              <div className={ classes.spreadsheet }>
                <ReactDataSheet
                  data={grid}
                  valueRenderer={cell => cell.value}
                  onCellsChanged={changes => {
                    const currentGrid = grid.map(row => [...row]);
                    if(changes.filter( ({ cell, row, col, value }) => !isNaN(parseInt(value))).length > 0) {
                      changes.forEach(({ cell, row, col, value }) => {
                        // Only numeric values are valid and converted to Int
                        if(!isNaN(parseInt(value))) {
                          currentGrid[row][col] = { ...currentGrid[row][col], value: parseInt(value) };
                        }
                      });

                      this.setGrid(
                        this.addValidationsToGrid(currentGrid)
                      );
                    }
                  }}
                  onContextMenu={onContextMenu}
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
            <Grid container justify='center' style={{padding: 10}}>
              <Grid item>
                <Formsy onValidSubmit={this.handleSubmit}>
                  <ProgressButton type='submit' text='Valider' loading={loading} centered />
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

const mapStateToProps = ({teamList, goalList, goalDefinitionDetail, playerGoalBulkList, teamPlayerGoalBulkList, teamGoalBulkList, playerGoalListUpdate}) => ({
    teamList,
    goalList,
    goalDefinitionDetail,
    playerGoalBulkList,
    teamGoalBulkList,
    teamPlayerGoalBulkList,
    playerGoalListUpdate
})

const mapDispatchToProps = (dispatch) => ({
    playerGoalBulkListActions: bindActionCreators(playerGoalBulkListActions, dispatch),
    teamGoalBulkListActions: bindActionCreators(teamGoalBulkListActions, dispatch),
    teamPlayerGoalBulkListActions: bindActionCreators(teamPlayerGoalBulkListActions, dispatch),
    playerGoalListUpdateActions: bindActionCreators(playerGoalListUpdateActions, dispatch),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Spreadsheet))
