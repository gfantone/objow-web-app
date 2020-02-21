import React from 'react'
import { FlexibleTableCell, FullTableCell, RankEvolution, TableCell, TableChip, TableRow } from '../../../../../../components'

const TeamRank = ({ rank, ...props }) => {
    return (
        <TableRow>
            <FullTableCell style={{backgroundColor: rank.team.color.hex, width: 4}} />
            <TableCell>
                <TableChip size='small' label={rank.rank ? rank.rank : '-'} />
            </TableCell>
            <FlexibleTableCell>
                { rank.team.name }
            </FlexibleTableCell>
            <TableCell align='right'>
                { rank.victories }
            </TableCell>
            <TableCell align='right'>
                { rank.points }
            </TableCell>
            <TableCell align='right'>
                <RankEvolution evolution={rank.evolution} />
            </TableCell>
        </TableRow>
    )
}

export default TeamRank