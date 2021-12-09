import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom, faSortAmountDown, faCheck, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { FullTableCell, RankEvolution, Table, TableBody, TableCell, TableChip, TableHead, TableHeadCell, TableRow, TableRowDisabled } from '../../../../components'
import * as Resources from '../../../../Resources'

const TeamChallengeRankList = ({ranks, teamId, ...props}) => {
    const hasRacePositions = ranks.reduce((acc, rank) => rank.race_position || acc  ,false)
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell colSpan={2}>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        { hasRacePositions && (
                          <TableHeadCell>
                            <FontAwesomeIcon icon={faFlagCheckered} />
                          </TableHeadCell>
                        ) }
                        <TableHeadCell>{Resources.TEAM_CHALLENGE_RANKING_TEAM_COLUMN}</TableHeadCell>
                        <TableHeadCell>{Resources.TEAM_CHALLENGE_RANKING_POINTS_COLUMN}</TableHeadCell>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranks.map(rank => {
                        const selected = rank.team ? rank.team.id == teamId : false
                        const color = !selected ? 'default' : 'primary'
                        const TableRowComponent = rank.race_position ? TableRowDisabled : TableRow
                        return (
                            <TableRowComponent>
                                <FullTableCell style={{backgroundColor: rank.team.color.hex, width: 4}} />
                                <TableCell>
                                    <TableChip color={color} label={rank.rank ? rank.rank : '-'} />
                                </TableCell>
                                { hasRacePositions && rank.race_position && (
                                  <TableCell>
                                    <FontAwesomeIcon icon={faCheck} />
                                  </TableCell>
                                ) }
                                { hasRacePositions && !rank.race_position && (
                                  <TableCell />
                                )}
                                <TableCell color={color}>{rank.team.name}</TableCell>
                                <TableCell color={color}>{rank.points}</TableCell>
                                <TableCell>
                                    <RankEvolution evolution={rank.evolution} />
                                </TableCell>
                            </TableRowComponent>
                        )
                    }) }
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamChallengeRankList
