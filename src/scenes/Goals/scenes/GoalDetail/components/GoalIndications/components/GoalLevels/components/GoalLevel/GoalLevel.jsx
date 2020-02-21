import React from 'react'
import {DefaultText, TableChip, TableCell, TableRow} from '../../../../../../../../../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'

const GoalLevel = (props) => {
    const {number, level} = props

    return (
        <TableRow>
            <TableCell>
                <TableChip label={number} />
            </TableCell>
            <TableCell>
                <DefaultText noWrap>{level.percentage*100} %</DefaultText>
            </TableCell>
            <TableCell>
                <FontAwesomeIcon icon={faAngleRight} />
            </TableCell>
            <TableCell align='right'>
                <DefaultText noWrap>{level.points} PTS</DefaultText>
            </TableCell>
        </TableRow>
    )
}

export default GoalLevel