import React from 'react';
import { connect } from 'react-redux';
import { CardMedia, TableBody } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import {
  faRandom,
  faRocket,
  faSortAmountDown,
} from '@fortawesome/free-solid-svg-icons';
import { Rank } from './components';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';

const styles = {
  icon: {
    height: 34,
    width: 34,
    margin: 'auto',
  },
};

const RankList = ({
  challengeRank,
  generalRank,
  generalRankIcon,
  categoryRanks,
  onChallengeClick,
  onGeneralClick,
  onCategoryClick,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;
  const { account } = props.accountDetail;

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell colSpan={2} align="left">
              {intl.formatMessage({ id: 'ranking.columns.name' })}
            </TableHeadCell>
            <TableHeadCell align="right">
              <FontAwesomeIcon icon={faSortAmountDown} />
            </TableHeadCell>
            <TableHeadCell align="right">
              {Resources.RANK_LIST_POINTS_COLUMN}
            </TableHeadCell>
            <TableHeadCell align="right">
              <FontAwesomeIcon icon={faRandom} />
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {account.hasGeneralRankAccess && generalRank && (
            <Rank
              image={
                <FontAwesomeIcon
                  icon={generalRankIcon}
                  className={classes.icon}
                />
              }
              name={intl.formatMessage({ id: 'ranking.general_title' })}
              rank={generalRank}
              onClick={onGeneralClick}
            />
          )}
          {account.hasCategoryRankAccess &&
            categoryRanks.map((rank) => {
              const icon = (
                <CardMedia
                  image={rank.category.icon.path}
                  className={classes.icon}
                />
              );
              return (
                <Rank
                  key={rank.id}
                  image={icon}
                  name={rank.category.name}
                  rank={rank}
                  onClick={() =>
                    onCategoryClick(rank.category.id, rank.periodId)
                  }
                />
              );
            })}
          {account.hasCategoryRankAccess && challengeRank && (
            <Rank
              image={
                <FontAwesomeIcon icon={faRocket} className={classes.icon} />
              }
              name={intl.formatMessage({ id: 'ranking.challenges_title' })}
              rank={challengeRank}
              onClick={onChallengeClick}
            />
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(RankList));
