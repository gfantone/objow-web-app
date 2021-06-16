import React, { Component, useState } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {withStyles} from '@material-ui/core/styles'
import ReactDataSheet from 'react-datasheet'
import { Loader } from '../../../../../../../../components'
import * as Resources from '../../../../../../../../Resources'
import * as playerGoalBulkListActions from '../../../../../../../../services/PlayerGoals/PlayerGoalBulkList/actions'
import * as teamPlayerGoalBulkListActions from '../../../../../../../../services/TeamPlayerGoals/TeamPlayerGoalBulkList/actions'
import _ from 'lodash'

const styles = {
  root: {
      padding: 16,
  },
  spreadsheet: {
    width: '100%',
    paddingLeft: '250px',
    position: 'relative',
    '& .data-grid-container .data-grid': {
      display: 'block',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 8,
        border: '2px solid white',
        background: 'rgba(0, 0, 0, .5)'
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
      marginTop: '-1px',
      width: '250px',
      height: 31,
      zIndex: 30,
      left: 0,
      '&.selected': {
        zIndex: 40
      }
    },
    '& .cell.baseCell': {
      lineHeight: 2,
      height: 30,
      zIndex: 10
    },
    '& .cell.dataCell': {
      minWidth: 150,
      // '&.selected': {
      //   zIndex: 40
      // }
    },
    '& .cell.totalCell': {
      fontWeight: 'bold'
    },
    '& .cell.marginCell': {
      minWidth: 300,
      zIndex: 20
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
            grid: [

            ]
        }
    }
    updateGrid = () => {
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
        teams.forEach((team, teamIndex) => {
          data = [...data, []]
          if(goalsByTeam[team.id]) {
            goalsByTeam[team.id].forEach((playerGoalsByPeriod, periodIndex) => {
              playerGoalsByPeriod.forEach((playerGoalByPeriod, collaboratorIndex) => {
                if(data[teamIndex].length < collaboratorIndex + 1) {
                  data[teamIndex] = [...data[teamIndex], [{
                    value: _.get(playerGoalByPeriod, 'collaborator.fullname'),
                    readOnly: true,
                    className: 'firstCell baseCell'
                  }]]
                }
                data[teamIndex][collaboratorIndex] = [...data[teamIndex][collaboratorIndex], {value: goalsByTeam[team.id][periodIndex][collaboratorIndex].target, className: 'dataCell baseCell'}]

              })
              // Total by team
              data[teamIndex][playerGoalsByPeriod.length] = data[teamIndex][playerGoalsByPeriod.length] || [{
                value: `${team.name} : Objectif alloué`,
                readOnly: true,
                className: 'firstCell baseCell totalCell'
              }]

              data[teamIndex][playerGoalsByPeriod.length] = [...data[teamIndex][playerGoalsByPeriod.length], {
                value: _.get(teamPlayerGoals[periodIndex].data[teamIndex], 'target'),
                className: 'dataCell baseCell'
              }]

              // Team separator
              data[teamIndex][playerGoalsByPeriod.length + 1] = data[teamIndex][playerGoalsByPeriod.length + 1] || [{
                value: '',
                readOnly: true,
                className: 'firstCell baseCell'
              }]
              data[teamIndex][playerGoalsByPeriod.length + 1] = [...data[teamIndex][playerGoalsByPeriod.length + 1], {
                value: '',
                readOnly: true,
                className: 'dataCell baseCell'
              }]
            })
          }
        });

        this.setState({
          ...this.state,
          grid: [
            [{ value: '', readOnly: true, className: 'firstCell baseCell' }, ...goals.map(goal => ({value: this.getMonthByGoal(goal).name, readOnly: true, className: 'dataCell baseCell'}) )],
            ..._.flatten(data)
          ],
          gridLoaded: true
        })
      }
    }

    componentDidMount() {
      this.fetchGoals()
    }

    fetchGoals = () => {
      const {definition} = this.props.goalDefinitionDetail
      const { teams } = this.props.teamList;
      const { goals } = this.props.goalList;
      // load data
      // const currentTeam = teams[this.state.currentTeamLoading]

      if(goals && goals.length > 0) {
        const dates = goals.map(goal => this.getMonthByGoal(goal).date)

        if(definition) {
          this.props.playerGoalBulkListActions.getPlayerGoalBulkList(definition.id, dates, teams)
          this.props.teamPlayerGoalBulkListActions.getTeamPlayerGoalBulkList(definition.id, dates)
        }
      }
    }

    componentDidUpdate() {
      if(!this.state.gridLoaded) {
        this.updateGrid()
      }
    }

    getMonthByGoal = (goal) => {
      const date = goal.start.toDate();
      return {name: Intl.DateTimeFormat('fr-FR', {month: 'long'}).format(date), date: date}
    };

    renderLoader = () => {
        return <div>
            <Loader centered />
        </div>
    }

    setGrid = (grid) => {
      this.setState({
        ...this.state,
        grid: grid
      })
    }

    renderData = () => {
        const {classes} = this.props
        const { grid } = this.state
        const {definition} = this.props.goalDefinitionDetail
        const onContextMenu = (e, cell, i, j) => cell.readOnly ? e.preventDefault() : null;
        // this.updateGrid()
        return (
            <div className={ classes.spreadsheet }>
              <ReactDataSheet
                data={grid}
                valueRenderer={cell => cell.value}
                onCellsChanged={changes => {
                  const currentGrid = grid.map(row => [...row]);
                  changes.forEach(({ cell, row, col, value }) => {
                    currentGrid[row][col] = { ...currentGrid[row][col], value };
                  });
                  this.setGrid(currentGrid);
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
        )
    }

    render = () => {
      const {definition, loading: goaldDefinitionLoading} = this.props.goalDefinitionDetail
      const { goals, loading: playerGoalBulkListLoading } = this.props.playerGoalBulkList;
      const { goals: teamGoals, loading: teamPlayerGoalListLoading } = this.props.teamPlayerGoalBulkList
      const loading = playerGoalBulkListLoading || goaldDefinitionLoading || teamPlayerGoalListLoading

      return (
          <div>
              {loading && this.renderLoader()}
              {!loading && definition && goals && teamGoals && this.renderData()}
          </div>
      )
    }
}

const mapStateToProps = ({teamList, goalList, goalDefinitionDetail, playerGoalBulkList, teamPlayerGoalBulkList,}) => ({
    teamList,
    goalList,
    goalDefinitionDetail,
    playerGoalBulkList,
    teamPlayerGoalBulkList,
})

const mapDispatchToProps = (dispatch) => ({
    playerGoalBulkListActions: bindActionCreators(playerGoalBulkListActions, dispatch),
    teamPlayerGoalBulkListActions: bindActionCreators(teamPlayerGoalBulkListActions, dispatch),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Spreadsheet))
