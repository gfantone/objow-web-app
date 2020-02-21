import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faRandom, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { FullTableCell, RankEvolution, Table, TableBody, TableCell, TableChip, TableHead, TableHeadCell, TableRow } from '../../../../components'
import '../../../../helpers/NumberHelper'

const TeamGoalRankList = ({ ranks, ...props }) => {
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell colSpan={2}>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell>Équipes</TableHeadCell>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faBullseye} />
                        </TableHeadCell>
                        <TableHeadCell>PTS</TableHeadCell>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranks.map(rank => {
                        return (
                            <TableRow>
                                <FullTableCell style={{backgroundColor: rank.team.color.hex, width: 4}} />
                                <TableCell>
                                    <TableChip label={rank.rank ? rank.rank : '-'} />
                                </TableCell>
                                <TableCell>{rank.team.name}</TableCell>
                                <TableCell>{rank.progression.toPercentage()}</TableCell>
                                <TableCell>{rank.points}</TableCell>
                                <TableCell>
                                    <RankEvolution evolution={rank.evolution} />
                                </TableCell>
                            </TableRow>
                        )
                    }) }
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamGoalRankList