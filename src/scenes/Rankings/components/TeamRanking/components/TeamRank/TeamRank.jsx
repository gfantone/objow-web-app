import React from 'react'
import { FlexibleTableCell, FullTableCell, RankEvolution, TableCell, TableChip, TableRow } from '../../../../../../components'

const TeamRank = ({ rank, selected, ...props }) => {
    const color = !selected ? 'default' : 'primary'

    return (
        <TableRow>
            <FullTableCell style={{backgroundColor: rank.team.color.hex, width: 4}} />
            <TableCell>
                <TableChip color={color} size='small' label={rank.rank ? rank.rank : '-'} />
            </TableCell>
            <TableCell color={color}>
                { rank.team.name }
            </TableCell>
            
            <TableCell align='right' color={color}>
                { rank.points }
            </TableCell>
            <TableCell align='right' color={color}>
                <RankEvolution evolution={rank.evolution} />
            </TableCell>
        </TableRow>
    )
}

export default TeamRank
