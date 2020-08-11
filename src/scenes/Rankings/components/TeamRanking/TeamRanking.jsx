import React from 'react'
import {TableBody} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import {faRandom, faSortAmountDown} from '@fortawesome/free-solid-svg-icons'
import {TeamRank} from './components'
import {Table, TableHead, TableHeadCell, TableRow} from '../../../../components'
import * as Resources from '../../../../Resources'

const TeamRanking = ({ranking, teamId}) => {
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell align='left' colSpan={2}>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell>{Resources.TEAM_RANKING_TEAM_COLUMN}</TableHeadCell>
                        <TableHeadCell align='right'>
                            <FontAwesomeIcon icon={faStar} />
                        </TableHeadCell>
                        <TableHeadCell align='right'>{Resources.TEAM_RANKING_POINTS_COLUMN}</TableHeadCell>
                        <TableHeadCell align='right'>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranking.map(rank => {
                        const selected = rank.teamId == teamId
                        return <TeamRank key={rank.id} rank={rank} selected={selected} />
                    }) }
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamRanking
