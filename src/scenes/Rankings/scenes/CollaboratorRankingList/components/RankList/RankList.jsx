import React from 'react'
import { connect } from 'react-redux'
import { CardMedia, TableBody } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faRandom, faRocket, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { Rank } from './components'
import { Table, TableHead, TableHeadCell, TableRow } from '../../../../../../components'

const styles = {
    icon: {
        height: 34,
        width: 34
    }
}

const RankList = ({ challengeRank, generalRank, generalRankIcon, categoryRanks, onChallengeClick, onGeneralClick, onCategoryClick, ...props }) => {
    const { classes } = props
    const { account } = props.accountDetail

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell colSpan={2} align='left'>Nom</TableHeadCell>
                        <TableHeadCell align='right'>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
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
                    { account.hasGeneralRankAccess && generalRank && <Rank image={<FontAwesomeIcon icon={generalRankIcon} className={classes.icon} />} name='Classement général' rank={generalRank} onClick={onGeneralClick} /> }
                    { account.hasCategoryRankAccess && categoryRanks.map(rank => {
                        const icon = <CardMedia image={rank.category.icon.path} className={classes.icon} />
                        return <Rank key={rank.id} image={icon} name={rank.category.name} rank={rank} onClick={() => onCategoryClick(rank.category.id, rank.periodId)} />
                    }) }
                    { account.hasCategoryRankAccess && challengeRank && <Rank image={<FontAwesomeIcon icon={faRocket} className={classes.icon} />} name='Challenges' rank={challengeRank} onClick={onChallengeClick} /> }
                </TableBody>
            </Table>
        </div>
    )
}

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
})

export default connect(mapStateToProps)(withStyles(styles)(RankList))
