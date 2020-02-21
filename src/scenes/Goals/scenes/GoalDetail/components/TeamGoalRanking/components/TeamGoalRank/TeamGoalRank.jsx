import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'
import {FlexibleTableCell, TableCell, TableChip, TableRow} from '../../../../../../../../components'

const styles = {
    upEvolution: {
        color: '#00E58D'
    },
    downEvolution: {
        color: '#E50000'
    }
}

const TeamGoalRank = (props) => {
    const {classes, rank} = props

    function _renderUpEvolution() {
        return <FontAwesomeIcon icon={faAngleUp} className={classes.upEvolution} />
    }

    function _renderEqualEvolution() {
        return '='
    }

    function _renderDownEvolution() {
        return <FontAwesomeIcon icon={faAngleDown} className={classes.downEvolution} />
    }

    return (
        <TableRow>
            <TableCell>
                <TableChip size='small' label={rank.rank} />
            </TableCell>
            <FlexibleTableCell>{rank.name}</FlexibleTableCell>
            <TableCell align='right'>{(rank.progression*100).toFixed()}%</TableCell>
            <TableCell align='right'>{rank.points}</TableCell>
            <TableCell align='right'>
                {
                    rank.rank_evolution > 0 ? _renderUpEvolution()
                    : rank.rank_evolution < 0 ? _renderDownEvolution()
                    : _renderEqualEvolution()
                }
            </TableCell>
        </TableRow>
    )
}

export default withStyles(styles)(TeamGoalRank)