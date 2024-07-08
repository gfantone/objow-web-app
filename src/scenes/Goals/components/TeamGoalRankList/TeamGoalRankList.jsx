import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  faBullseye,
  faRandom,
  faSortAmountDown,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import {
  FullTableCell,
  RankEvolution,
  Table,
  TableBody,
  TableCell,
  FlexibleTableCell,
  TableChip,
  TableHead,
  TableHeadCell,
  TableRow,
  TableRowHighlight,
  FixedTableCell,
  ThemeWrapper,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import '../../../../helpers/NumberHelper';
import _ from 'lodash';

const styles = {
  tableWrapper: {
    boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)',
    overflowX: 'auto',
  },
  positionCell: {
    paddingLeft: 5,
    paddingRight: 5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
};

const TeamGoalRankList = ({
  ranks,
  teamId,
  account,
  goal,
  classes,

  ...props
}) => {
  const intl = useIntl();
  const hasPoints = _.get(goal, 'levels.length', 0) > 0;
  const mobileScreen = isWidthDown('xs', props.width);
  const cellWidth = mobileScreen ? 90 : 'auto';

  const { successColor, errorColor } = useContext(ThemeWrapper.Context);

  return (
    <div className={classes.tableWrapper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell colSpan={2}>
              <FontAwesomeIcon icon={faSortAmountDown} />
            </TableHeadCell>
            <TableHeadCell>
              {intl.formatMessage({ id: 'common.teams' })}
            </TableHeadCell>
            <TableHeadCell style={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faBullseye} />
            </TableHeadCell>
            {hasPoints && goal.allow_ranking_points && (
              <TableHeadCell>
                {Resources.TEAM_GOAL_RANK_LIST_POINTS_COLUMN}
              </TableHeadCell>
            )}
            {goal.allow_ranking_latest_value && (
              <TableHeadCell style={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon={faChartLine} />
              </TableHeadCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {ranks.map((rank) => {
            const selected = rank.team ? rank.team.id == teamId : false;
            const color = !selected ? 'default' : 'primary';

            const TableRowComponent = selected ? TableRowHighlight : TableRow;
            return (
              <TableRowComponent
                style={{ background: selected ? '#E4F6E0' : 'auto' }}
              >
                <FullTableCell
                  style={{ backgroundColor: rank.team.color.hex, width: 4 }}
                />
                <FullTableCell>
                  <div
                    className={classes.positionCell}
                    style={{ width: mobileScreen ? 60 : 90 }}
                  >
                    <span>
                      <TableChip
                        color='default'
                        label={rank.rank ? rank.rank : '-'}
                      />
                    </span>
                    {rank.evolution !== 0 && (
                      <React.Fragment>
                        <span style={{ marginLeft: 8 }}>
                          <RankEvolution evolution={rank.evolution} />
                        </span>
                        <span
                          style={{
                            marginLeft: 3,
                            color:
                              rank.evolution > 0
                                ? successColor
                                : rank.evolution < 0
                                ? errorColor
                                : 'auto',
                          }}
                        >
                          {Math.abs(rank.evolution)}
                        </span>
                      </React.Fragment>
                    )}
                  </div>
                </FullTableCell>
                <FlexibleTableCell
                  color={color}
                  style={{
                    minWidth: cellWidth,
                    maxWidth: cellWidth,
                    whiteSpace: 'normal',
                  }}
                >
                  {rank.team.name}
                </FlexibleTableCell>
                <TableCell color={color} style={{ textAlign: 'center' }}>
                  <div>
                    {parseFloat(
                      ((rank.counter / rank.target) * 100).toFixed(2)
                    )}
                    %
                  </div>
                  {(_.get(account, 'role.code') === 'A' ||
                    (_.get(account, 'role.code') === 'M' &&
                      _.get(account, 'team.id') ===
                        _.get(rank, 'team.id'))) && (
                    <div style={{ fontSize: 10, opacity: 0.8 }}>
                      {rank.counter.toLocaleString()}&nbsp;/&nbsp;
                      {rank.target.toLocaleString()}
                    </div>
                  )}
                </TableCell>
                {hasPoints && goal.allow_ranking_points && (
                  <TableCell color={color}>{rank.points}</TableCell>
                )}
                {goal.allow_ranking_latest_value && (
                  <TableCell
                    color={color}
                    style={{
                      textAlign: 'center',
                      color: rank.latest_result ? successColor : 'auto',
                    }}
                  >
                    {rank.latest_result ? `+${rank.latest_result}` : 0}
                  </TableCell>
                )}
              </TableRowComponent>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(withWidth()(TeamGoalRankList));
