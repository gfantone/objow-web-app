import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { faSortAmountDown, faGift } from '@fortawesome/free-solid-svg-icons';
import {
  FullTableCell,
  RankEvolution,
  Table,
  TableBody,
  TableChip,
  TableHead,
  TableHeadCell,
  TableRow,
  TableRowHighlight,
  FixedTableCell,
  Tooltip,
  Card,
  FlexibleTableCell,
  ThemeWrapper,
} from '../../../../components';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { ChallengeReward } from '../';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  photo: {
    height: 28,
    width: 28,
  },
  levelIcon: {
    height: 28,
    width: 28,
  },
  tooltip: {
    minWidth: 320,
  },
  transparentTooltip: {
    background: 'transparent',
  },
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

const TeamChallengeRankList = ({
  ranks,
  teamId,
  classes,
  displayCollaboratorDepartment,
  ...props
}) => {
  const intl = useIntl();
  const hasRanking = ranks.reduce((acc, rank) => rank.rank || acc, false);
  const hasRankAward = (rank) =>
    rank.awards.length > 0 &&
    ((rank.award_type_code === 'C' && rank.race_position) ||
      rank.award_type_code === 'R');
  const coinImage = require(`../../../../assets/img/system/challenge/icons/coin.png`);
  const giftImage = require(`../../../../assets/img/system/challenge/icons/gift.png`);
  const hasAwards = ranks.reduce(
    (acc, rank) => hasRankAward(rank) || acc,
    false
  );
  let borderTop = false;
  const isMobile = isWidthDown('xs', props.width);
  const cellWidth = isMobile ? 100 : 'auto';

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
              {intl.formatMessage({ id: 'challenge.ranking.team_column' })}
            </TableHeadCell>
            {displayCollaboratorDepartment && (
              <TableHeadCell colSpan={1}>
                {intl.formatMessage({
                  id: 'challenge.ranking.collaborator_team_group_column',
                })}
              </TableHeadCell>
            )}
            <TableHeadCell>
              <Grid container justify='center'>
                <Grid item style={{ marginRight: 5 }}>
                  <FontAwesomeIcon icon={faGift} />
                </Grid>
              </Grid>
            </TableHeadCell>
            <TableHeadCell style={{ textAlign: 'center' }}>
              {intl.formatMessage({ id: 'challenge.ranking.points_column' })}
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranks.map((rank, index) => {
            const selected = rank.team ? rank.team.id == teamId : false;
            const color = !selected ? 'default' : 'primary';
            const hasAward = hasRankAward(rank);
            const isRaceMode = rank.award_type_code === 'C';
            if (
              hasAwards &&
              !hasAward &&
              hasRanking &&
              index > 0 &&
              borderTop === false
            ) {
              borderTop = index;
            }
            const TableRowComponent = hasAward ? TableRowHighlight : TableRow;
            const pointEvolution = rank.points - rank.previous_points;
            return (
              <TableRowComponent
                key={rank.id}
                style={{
                  borderTop: borderTop === index ? '2px solid #333' : '',
                  background: selected ? '#E4F6E0' : 'auto',
                }}
              >
                <FullTableCell
                  style={{ backgroundColor: rank.team.color.hex, width: 4 }}
                />
                <FullTableCell>
                  <div
                    className={classes.positionCell}
                    style={{ width: isMobile ? 76 : 90 }}
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
                            fontWeight: hasAward ? 'bold' : '',
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
                  style={{
                    fontWeight: hasAward ? 'bold' : '',
                    minWidth: cellWidth,
                    maxWidth: cellWidth,
                  }}
                  color={color}
                >
                  {rank.team.name}
                </FlexibleTableCell>
                {displayCollaboratorDepartment && (
                  <FlexibleTableCell
                    style={{
                      fontWeight: hasAward ? 'bold' : '',
                      minWidth: cellWidth,
                      maxWidth: cellWidth,
                      whiteSpace: 'normal',
                    }}
                    color={color}
                  >
                    {_.get(rank, 'team.parent.name')}
                  </FlexibleTableCell>
                )}
                <FixedTableCell
                  style={{ verticalAlign: 'middle' }}
                  color={color}
                >
                  {rank.awards && rank.awards.length > 0 && (
                    <Grid container justify='center'>
                      {rank.awards[0].reward ? (
                        <Grid item>
                          <Tooltip
                            closeButtonStyle={{
                              position: 'absolute',
                              top: 18,
                              right: 4,
                              zIndex: 100,
                            }}
                            className={`${classes.tooltip} ${classes.transparentTooltip}`}
                            title={
                              <div style={{ minWidth: 320 }}>
                                <Card>
                                  <ChallengeReward
                                    reward={rank.awards[0].reward}
                                  />
                                </Card>
                              </div>
                            }
                          >
                            <CardMedia
                              image={giftImage}
                              style={{
                                height: 20,
                                width: 20,
                                marginRight: 5,
                                marginTop: -2,
                              }}
                            />
                          </Tooltip>
                        </Grid>
                      ) : (
                        <Grid item>
                          <Tooltip
                            title={
                              <Grid container spacing={1}>
                                <Grid item>{rank.awards[0].points}</Grid>
                                <Grid item>
                                  <CardMedia
                                    image={coinImage}
                                    style={{ height: 20, width: 20 }}
                                  />
                                </Grid>
                              </Grid>
                            }
                          >
                            <CardMedia
                              image={coinImage}
                              style={{
                                height: 20,
                                width: 20,
                                marginRight: 5,
                                marginTop: -2,
                              }}
                            />
                          </Tooltip>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </FixedTableCell>
                <FlexibleTableCell
                  style={{
                    fontWeight: hasAward ? 'bold' : '',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }}
                  color={color}
                >
                  <div>
                    {rank.points.toLocaleString()}
                    {isRaceMode ? `/${rank.goals_count}` : ''}
                  </div>
                  {pointEvolution !== 0 && (
                    <div
                      style={{
                        fontWeight: hasAward ? 'bold' : '',
                        color:
                          pointEvolution > 0
                            ? successColor
                            : pointEvolution < 0
                            ? errorColor
                            : 'auto',
                      }}
                    >
                      {pointEvolution > 0 ? '+' : pointEvolution < 0 ? '-' : ''}
                      <span style={{ marginLeft: 3 }}>
                        {Math.abs(pointEvolution).toLocaleString()}
                      </span>
                    </div>
                  )}
                </FlexibleTableCell>
              </TableRowComponent>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(withWidth()(TeamChallengeRankList));
