import React, { Component, useState } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {withStyles} from '@material-ui/core/styles'
import ReactDataSheet from 'react-datasheet'
import { Loader } from '../../../../../../../../components'
import * as Resources from '../../../../../../../../Resources'
import * as playerGoalListActions from '../../../../../../../../services/PlayerGoals/PlayerGoalList/actions'
import * as teamPlayerGoalListActions from '../../../../../../../../services/TeamPlayerGoals/TeamPlayerGoalList/actions'

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
            grid: [
              [
                { readOnly: true, value: '' },
                { value: 'A', readOnly: true },
                { value: 'B', readOnly: true },
                { value: 'C', readOnly: true },
                { value: 'D', readOnly: true },
              ],
              [
                { readOnly: true, value: 1 },
                { value: 1 },
                { value: 3 },
                { value: 3 },
                { value: 3 },
              ],
              [
                { readOnly: true, value: 2 },
                { value: 2 },
                { value: 4 },
                { value: 4 },
                { value: 4 },
              ],
              [
                { readOnly: true, value: 3 },
                { value: 1 },
                { value: 3 },
                { value: 3 },
                { value: 3 },
              ],
              [
                { readOnly: true, value: 4 },
                { value: 2 },
                { value: 4 },
                { value: 4 },
                { value: 4 },

              ],
            ]
        }
    }

    componentDidMount() {
      const {definition} = this.props.goalDefinitionDetail
      if(definition) {
        this.props.playerGoalListActions.getPlayerGoalList(definition.id, null, 1)
        this.props.teamPlayerGoalListActions.getTeamPlayerGoalList(definition.id, new Date('08/02/21'))
      }
    }

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
        const { goals } = this.props.playerGoalList;
        const onContextMenu = (e, cell, i, j) => cell.readOnly ? e.preventDefault() : null;

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
      const { goals, loading: playerGoalListLoading } = this.props.playerGoalList;
      const { goals: teamGoals, loading: teamPlayerGoalListLoading } = this.props.teamPlayerGoalList
      const loading = playerGoalListLoading || goaldDefinitionLoading
      console.log(teamPlayerGoalListLoading, teamGoals);
      return (
          <div>
              {loading && this.renderLoader()}
              {!loading && definition && goals && teamGoals && this.renderData()}
          </div>
      )
    }
}

const mapStateToProps = ({goalDefinitionDetail, playerGoalList, teamPlayerGoalList,}) => ({
    goalDefinitionDetail,
    playerGoalList,
    teamPlayerGoalList,
})

const mapDispatchToProps = (dispatch) => ({
    playerGoalListActions: bindActionCreators(playerGoalListActions, dispatch),
    teamPlayerGoalListActions: bindActionCreators(teamPlayerGoalListActions, dispatch),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Spreadsheet))
