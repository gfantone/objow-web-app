import React, { Component, useState } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {withStyles} from '@material-ui/core/styles'
import ReactDataSheet from 'react-datasheet'
import { Loader } from '../../../../../../../../components'
import * as Resources from '../../../../../../../../Resources'
import * as playerGoalBulkListActions from '../../../../../../../../services/PlayerGoals/PlayerGoalBulkList/actions'
import * as teamPlayerGoalListActions from '../../../../../../../../services/TeamPlayerGoals/TeamPlayerGoalList/actions'
import _ from 'lodash'

const styles = {
  root: {
      padding: 16,
  },
  spreadsheet: {
    '& .data-grid': {
      width: '100%'
    },
    '& .data-grid-container .data-grid .cell > input': {
      width: '100%',
      height: 'auto'
    }
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
            grid: [

            ]
        }
    }
    updateGrid = () => {
      console.log('updateGrid');
      const { goals } = this.props.goalList;
      const { teams } = this.props.teamList;
      const { goals: playerGoals, loading: playerGoalBulkListLoading } = this.props.playerGoalBulkList;
      console.log(playerGoals);
      const goalsByTeam = {}
      playerGoals.forEach((response) => {
        
        console.log(new URLSearchParams(response.config.url));
      });

      // let data = []
      // teams.forEach((team, teamIndex) => {
      //   data = [...data, []]
      //   this.state.playerGoals[team.id].forEach((playerGoalsByPeriod, periodIndex) => {
      //     return playerGoalsByPeriod.forEach((playerGoalByPeriod, collaboratorIndex) => {
      //       if(data[teamIndex].length < collaboratorIndex + 1) {
      //         data[teamIndex] = [...data[teamIndex], [{ value: _.get(playerGoalByPeriod, 'collaborator.fullname'), readOnly: true }]]
      //       }
      //       data[teamIndex][collaboratorIndex] = [...data[teamIndex][collaboratorIndex], {value: this.state.playerGoals[team.id][periodIndex][collaboratorIndex].target}]
      //     })
      //   })
      // });

      // this.setState({
      //   ...this.state,
      //   grid: [
      //     [{ value: '', readOnly: true }, ...goals.map(goal => ({value: this.getMonthByGoal(goal).name, readOnly: true}) )],
      //     ..._.flatten(data)
      //   ]
      // })
    }

    componentDidMount() {
      // const { goals } = this.props.goalList;
      // const { teams } = this.props.teamList;
      // this.setState({
      //   ...this.state,
      //   goals: goals,
      // })
      // Initial fetchGoals
      this.fetchGoals()

      // const {definition} = this.props.goalDefinitionDetail
      // const { teams } = this.props.teamList;
      // const { goals } = this.props.goalList;
      // const { goals: playerGoals } = this.props.playerGoalList;
      // const { goals: teamPlayerGoals } = this.props.teamPlayerGoalList;
      //
      // if(goals && playerGoals && teamPlayerGoals) {
      //   this.setState({
      //     ...this.state,
      //     goals: goals,
      //     playerGoals: playerGoals,
      //     teamPlayerGoals: teamPlayerGoals
      //   }, () => {
      //     // everything is loaded
      //     if(this.state.currentTeamLoading >= teams.length - 1  && this.state.currentGoalIndexLoading >= goals.length - 1) {
      //       return
      //     }
      //     const newTeamIndex = this.state.currentTeamLoading >= teams.length ? 0 : this.state.currentTeamLoading
      //     const newGoalIndex = this.state.currentGoalIndexLoading >= goals.length ? 0 : this.state.currentGoalIndexLoading
      //     this.setState({
      //       ...this.state,
      //       currentGoalIndexLoading: newGoalIndex,
      //       currentTeamLoading: newTeamIndex
      //     })
      //     console.log(this.state)
      //   })
      // }
      //
      // const currentTeam = teams[this.state.currentTeamLoading]
      //
      // if(goals && goals.length > 0) {
      //   const period = this.getMonthByGoal(goals[this.state.currentGoalIndexLoading])
      //
      //   if(definition) {
      //     this.props.playerGoalListActions.getPlayerGoalList(definition.id, period.date, currentTeam.id)
      //     this.props.teamPlayerGoalListActions.getTeamPlayerGoalList(definition.id, period.date)
      //   }
      // }
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
          // this.props.teamPlayerGoalListActions.getTeamPlayerGoalList(definition.id, period.date)
        }
      }
    }

    componentDidUpdate() {
      this.updateGrid()
    //   const {definition} = this.props.goalDefinitionDetail
    //   const { teams } = this.props.teamList;
    //   const { goals } = this.props.goalList;
    //   const { goals: playerGoals, loading: playerGoalListLoading } = this.props.playerGoalList;
    //   const { goals: teamPlayerGoals, loading: teamPlayerGoalListLoading } = this.props.teamPlayerGoalList;
    //   console.log(this.state.currentTeamLoading, this.state.currentGoalIndexLoading, playerGoals);
    //   if(!teamPlayerGoalListLoading && !playerGoalListLoading && teams && goals && playerGoals && teamPlayerGoals && !this.state.loadComplete) {
    //
    //     // build new goals list by team
    //     let newPlayerGoals = Object.assign({}, this.state.playerGoals)
    //     const currentTeamId = teams[this.state.currentTeamLoading].id
    //     if(!this.state.playerGoals[currentTeamId]){
    //       newPlayerGoals[currentTeamId] = [playerGoals]
    //     } else {
    //       newPlayerGoals[currentTeamId] = [...newPlayerGoals[currentTeamId], playerGoals]
    //     }
    //
    //     // change current load indexes
    //     const newGoalIndex = this.state.currentGoalIndexLoading >= goals.length - 1 ? 0 : this.state.currentGoalIndexLoading + 1
    //     let newTeamIndex = this.state.currentTeamLoading
    //     if(newGoalIndex === 0) {
    //       newTeamIndex = this.state.currentTeamLoading >= teams.length - 1 ? 0 : this.state.currentTeamLoading + 1
    //     }
    //     if(this.state.currentTeamLoading >= teams.length - 1  && this.state.currentGoalIndexLoading >= goals.length - 1) {
    //       this.setState({loadComplete: true})
    //       return
    //     }
    //     this.setState({
    //       ...this.state,
    //       playerGoals: newPlayerGoals,
    //       teamPlayerGoals: this.state.teamPlayerGoals.length > 0 ? [...this.state.teamPlayerGoals, teamPlayerGoals] : [teamPlayerGoals],
    //       currentGoalIndexLoading: newGoalIndex,
    //       currentTeamLoading: newTeamIndex,
    //     }, () => {
    //       if(this.state.currentTeamLoading >= teams.length - 1  && this.state.currentGoalIndexLoading >= goals.length - 1) {
    //         this.updateGrid()
    //       } else {
    //         this.fetchGoals()
    //       }
    //     })
    //   }
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
        this.updateGrid()
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
              />
            </div>
        )
    }

    render = () => {
      const {definition, loading: goaldDefinitionLoading} = this.props.goalDefinitionDetail
      const { goals, loading: playerGoalBulkListLoading } = this.props.playerGoalBulkList;
      const { goals: teamGoals, loading: teamPlayerGoalListLoading } = this.props.teamPlayerGoalList
      const loading = playerGoalBulkListLoading || goaldDefinitionLoading
      return (
          <div>
              {loading && this.renderLoader()}
              {!loading && definition && goals && teamGoals && this.renderData()}
          </div>
      )
    }
}

const mapStateToProps = ({teamList, goalList, goalDefinitionDetail, playerGoalBulkList, teamPlayerGoalList,}) => ({
    teamList,
    goalList,
    goalDefinitionDetail,
    playerGoalBulkList,
    teamPlayerGoalList,
})

const mapDispatchToProps = (dispatch) => ({
    playerGoalBulkListActions: bindActionCreators(playerGoalBulkListActions, dispatch),
    teamPlayerGoalListActions: bindActionCreators(teamPlayerGoalListActions, dispatch),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Spreadsheet))
