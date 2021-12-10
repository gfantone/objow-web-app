import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom, faSortAmountDown, faCheck, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { FullTableCell, RankEvolution, Table, TableBody, TableCell, TableChip, TableHead, TableHeadCell, TableRow, TableRowHighlight } from '../../../../components'
import * as Resources from '../../../../Resources'

const TeamChallengeRankList = ({ranks, teamId, ...props}) => {
    const hasRanking = ranks.reduce((acc, rank) => rank.rank || acc  ,false)
    let borderTop = false
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell colSpan={2}>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell>{Resources.TEAM_CHALLENGE_RANKING_TEAM_COLUMN}</TableHeadCell>
                        <TableHeadCell>{Resources.TEAM_CHALLENGE_RANKING_POINTS_COLUMN}</TableHeadCell>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranks.map((rank, index) => {
                        const selected = rank.team ? rank.team.id == teamId : false
                        const color = !selected ? 'default' : 'primary'
                        const hasAward = rank.awards.length > 0 && (
                          (rank.award_type_code === 'C' && rank.race_position) ||
                          rank.award_type_code === 'R'
                        )
                        const isRaceMode = rank.award_type_code === 'C'

                        if(!hasAward && hasRanking && index > 0 && borderTop === false) {
                          borderTop = index
                        }

                        const TableRowComponent = hasAward ? TableRowHighlight : TableRow
                        return (
                            <TableRowComponent key={rank.id} style={{borderTop: borderTop === index ? '2px solid #333' : ''}}>
                                <FullTableCell style={{backgroundColor: rank.team.color.hex, width: 4}} />
                                <TableCell>
                                    <TableChip color={color} label={rank.rank ? rank.rank : '-'} />
                                </TableCell>
                                <TableCell style={{fontWeight: hasAward ? 'bold' : ''}} color={color}>{rank.team.name}</TableCell>
                                <TableCell style={{fontWeight: hasAward ? 'bold' : ''}} color={color}>{rank.points}{ isRaceMode ? `/${rank.goals_count}` : '' }</TableCell>
                                <TableCell style={{fontWeight: hasAward ? 'bold' : ''}}>
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
