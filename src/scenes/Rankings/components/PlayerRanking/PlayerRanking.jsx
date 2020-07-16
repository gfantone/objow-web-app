import React from 'react'
import {TableBody} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import {faRandom, faSortAmountDown} from '@fortawesome/free-solid-svg-icons'
import {PlayerRank} from './components'
import {Table, TableHead, TableHeadCell, TableRow} from '../../../../components'
import * as Resources from '../../../../Resources'

const PlayerRanking = ({ranking, collaboratorId}) => {
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell align='left'>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell colSpan={2}>{Resources.COLLABORATOR_RANKING_COLLABORATOR_COLUMN}</TableHeadCell>
                        <TableHeadCell align='right'>{Resources.COLLABORATOR_RANKING_LEVEL_COLUMN}</TableHeadCell>
                        <TableHeadCell align='right'>
                            <FontAwesomeIcon icon={faStar} />
                        </TableHeadCell>
                        <TableHeadCell align='right'>{Resources.COLLABORATOR_RANKING_POINTS_COLUMN}</TableHeadCell>
                        <TableHeadCell align='right'>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranking.map(rank => {
                        const selected = rank.collaboratorId == collaboratorId
                        return <PlayerRank key={rank.id} rank={rank} selected={selected} />
                    }) }
                </TableBody>
            </Table>
        </div>
    )
}

export default PlayerRanking
