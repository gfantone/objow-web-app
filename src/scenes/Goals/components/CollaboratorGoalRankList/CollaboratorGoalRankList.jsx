import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faSortAmountDown, faRandom } from '@fortawesome/free-solid-svg-icons'
import { FixedTableCell, FlexibleTableCell, RankEvolution, Table, TableBody, TableCell, TableChip, TableHead, TableHeadCell, TableRow, Avatar } from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/NumberHelper'
import _ from 'lodash'

const styles = {
    photo: {
        height: 34,
        width: 34
    }
}

const CollaboratorGoalRankList = ({ranks, collaboratorId, account, ...props}) => {
    const { classes } = props
    console.log(account);
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell colSpan={2}>{Resources.COLLABORATOR_GOAL_RANK_LIST_PLAYER_COLUMN}</TableHeadCell>
                        <TableHeadCell style={{textAlign: 'center'}}>
                            <FontAwesomeIcon icon={faBullseye} />
                        </TableHeadCell>
                        <TableHeadCell>{Resources.COLLABORATOR_GOAL_RANK_LIST_POINTS_COLUMN}</TableHeadCell>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranks.map(rank => {
                        const photo = rank.collaborator.photo ? rank.collaborator.photo : '/assets/img/user/avatar.svg'
                        const selected = rank.collaborator ? rank.collaborator.id == collaboratorId : false
                        const color = !selected ? 'default' : 'primary'

                        return (
                            <TableRow key={rank.id}>
                                <TableCell>
                                    <TableChip color={color} label={rank.rank ? rank.rank : '-'} />
                                </TableCell>
                                <FixedTableCell>
                                    <Avatar src={photo} className={classes.photo} entityId={ _.get(rank, 'collaborator.id') } fallbackName={ _.get(rank, 'collaborator.fullname') } />
                                </FixedTableCell>
                                <FlexibleTableCell color={color}>{rank.collaborator.firstname} {rank.collaborator.lastname}</FlexibleTableCell>
                                <TableCell color={color} style={{textAlign: 'center'}}>
                                  <div>
                                    {rank.progression.toPercentage()}
                                  </div>
                                  {(_.get(account, 'role.code') === 'A' || _.get(account, 'role.code') === 'M') && (
                                    <div style={{fontSize: 10, opacity: 0.6}}>
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

export default withStyles(styles)(CollaboratorGoalRankList)
