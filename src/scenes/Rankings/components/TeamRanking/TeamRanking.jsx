import React from 'react'
import { TableBody } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faRandom, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { TeamRank } from './components'
import { Table, TableHead, TableHeadCell, TableRow } from '../../../../components'

const TeamRanking = ({ ranking }) => {
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell align='left' colSpan={2}>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell>Équipes</TableHeadCell>
                        <TableHeadCell align='right'>
                            <FontAwesomeIcon icon={faStar} />
                        </TableHeadCell>
                        <TableHeadCell align='right'>PTS</TableHeadCell>
                        <TableHeadCell align='right'>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranking.map(rank => {
                        return <TeamRank key={rank.id} rank={rank} />
                    }) }
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamRanking