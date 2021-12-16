import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faRandom, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { FullTableCell, RankEvolution, Table, TableBody, TableCell, TableChip, TableHead, TableHeadCell, TableRow } from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/NumberHelper'
import _ from 'lodash'

const TeamGoalRankList = ({ranks, teamId, account, ...props}) => {

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell colSpan={2}>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell>{Resources.TEAM_GOAL_RANK_LIST_TEAM_COLUMN}</TableHeadCell>
                        <TableHeadCell style={{textAlign: 'center'}}>
                            <FontAwesomeIcon icon={faBullseye} />
                        </TableHeadCell>
                        <TableHeadCell>{Resources.TEAM_GOAL_RANK_LIST_POINTS_COLUMN}</TableHeadCell>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranks.map(rank => {
                        const selected = rank.team ? rank.team.id == teamId : false
                        const color = !selected ? 'default' : 'primary'

                        return (
                            <TableRow>
                                <FullTableCell style={{backgroundColor: rank.team.color.hex, width: 4}} />
                                <TableCell>
                                    <TableChip color={color} label={rank.rank ? rank.rank : '-'} />
                                </TableCell>
                                <TableCell color={color}>{rank.team.name}</TableCell>
                                <TableCell color={color} style={{textAlign: 'center'}}>
                                  <div>
                                    {rank.progression.toPercentage()}
                                  </div>
                                  {(_.get(account, 'role.code') === 'A' || _.get(account, 'role.code') === 'M') && (
                                    <div style={{fontSize: 10, opacity: 0.8}}>
                                      {rank.counter}&nbsp;/&nbsp;{rank.target}
                                    </div>
                                  ) }


                                </TableCell>
                                <TableCell color={color}>{rank.points}</TableCell>
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
