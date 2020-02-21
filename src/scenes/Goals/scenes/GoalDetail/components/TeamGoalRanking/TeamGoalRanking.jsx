import React from 'react'
import {TableBody} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBullseye, faRandom, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import {Table, TableHead, TableHeadCell, TableRow} from '../../../../../../components'
import {TeamGoalRank} from './components'

const TeamGoalRanking = (props) => {
    const {ranking} = props

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell align='left'>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell>Équipes</TableHeadCell>
                        <TableHeadCell align='right'>
                            <FontAwesomeIcon icon={faBullseye} />
                        </TableHeadCell>
                        <TableHeadCell align='right'>PTS</TableHeadCell>
                        <TableHeadCell align='right'>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ranking.map((rank, index) => {
                        return <TeamGoalRank key={index} rank={rank} />
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamGoalRanking