import React, { useContext, useEffect, useState } from 'react';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Link } from 'react-router-dom';
import { Grid, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faGift } from '@fortawesome/free-solid-svg-icons';

import _ from 'lodash';
import {
  FixedTableCell,
  FlexibleTableCell,
  RankEvolution,
  Table,
  TableBody,
  TableChip,
  TableHead,
  TableHeadCell,
  TableRow,
  TableRowHighlight,
  FullTableCell,
  Avatar,
  Tooltip,
  Card,
  ThemeWrapper,
} from '../../../../components';
import { ChallengeReward } from '../';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';

const styles = {
  avatarLink: {
    '& a ': {
      textDecoration: 'none',
    },
  },
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
    position: 'relative',
  },
  positionCell: {
    paddingLeft: 5,
    paddingRight: 5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
};

const CollaboratorChallengeRankList = ({
  ranks,
  collaboratorId,
  teamId,
  displayCollaboratorLevel,
  displayCollaboratorDepartment,
  displayCollaboratorTeam,
  hideHeader,
  configList,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;

  const teamColors = ranks
    ? _.compact(ranks.map((rank) => _.get(rank, 'collaborator.team.color.hex')))
    : [];
  const colspan = teamColors.length > 0 ? 2 : 1;
  const hasRanking = ranks.reduce((acc, rank) => rank.rank || acc, false);

  const hasRankAward = (rank) =>
    rank.awards.length > 0 &&
    ((rank.award_type_code === 'C' && rank.race_position) ||
      rank.award_type_code === 'R');

  const hasAwards = ranks.reduce(
    (acc, rank) => hasRankAward(rank) || acc,
    false
  );

  const { successColor, errorColor } = useContext(ThemeWrapper.Context);

  const mobileScreen = isWidthDown('xs', props.width);

  const coinImage = require(`../../../../assets/img/system/challenge/icons/coin.png`);
  const giftImage = require(`../../../../assets/img/system/challenge/icons/gift.png`);
  const cellWidth = mobileScreen ? 100 : 'auto';

  let borderTop = false;
  return (
    <div className={classes.tableWrapper}>
      <Table>
        {!hideHeader && (
          <TableHead>
            <TableRow>
              <TableHeadCell colspan={colspan}>
                <FontAwesomeIcon icon={faSortAmountDown} />
              </TableHeadCell>
              {displayCollaboratorLevel && (
                <TableHeadCell colSpan={2}>
                  {intl.formatMessage({ id: 'challenge.ranking.level_column' })}
                </TableHeadCell>
              )}
              <TableHeadCell colSpan={2}>
                {intl.formatMessage({
                  id: 'challenge.ranking.collaborator_column',
                })}
              </TableHeadCell>
              {displayCollaboratorTeam && (
                <TableHeadCell colSpan={1}>
                  {intl.formatMessage({
                    id: 'challenge.ranking.collaborator_team_column',
                  })}
                </TableHeadCell>
              )}
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
        )}
        <TableBody>
          {ranks.map((rank, index) => {
            const photo = rank.collaborator.photo
              ? rank.collaborator.photo
              : '/assets/img/user/avatar.svg';
            const selected = rank.collaborator
              ? rank.collaborator.id == collaboratorId ||
                _.get(rank, 'collaborator.team.id') == teamId
              : false;
            const hasAward = hasRankAward(rank);
            const color = !selected && !hasAward ? 'default' : 'primary';
            const teamColor = _.get(rank, 'collaborator.team.color.hex');
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
            const positionAbsolute = rank.fixed ? { position: 'absolute' } : {};
            return (
              <TableRowComponent
                key={rank.id}
                style={{
                  borderTop: borderTop === index ? '2px solid #333' : '',
                  background: selected ? '#E4F6E0' : 'auto',
                  ...positionAbsolute,
                }}
              >
                <FullTableCell
                  style={{ backgroundColor: teamColor, width: 4, minWidth: 4 }}
                />
                <FullTableCell>
                  <div
                    className={classes.positionCell}
                    style={{ width: mobileScreen ? 76 : 90 }}
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
                {displayCollaboratorLevel && (
                  <React.Fragment>
                    <FullTableCell style={{ verticalAlign: 'middle' }}>
                      {_.get(rank, 'collaborator.level.icon.path') && (
                        <div style={{ paddingLeft: 10 }}>
                          <Avatar
                            src={_.get(rank, 'collaborator.level.icon.path')}
                            className={classes.levelIcon}
                            entityId={rank.collaborator.id}
                          />
                        </div>
                      )}
                    </FullTableCell>
                    <FullTableCell>
                      <span
                        style={{
                          fontSize: 15,
                          paddingLeft: 5,
                          paddingRight: 10,
                        }}
                      >
                        {_.get(rank, 'collaborator.level.number')}
                      </span>
                    </FullTableCell>
                  </React.Fragment>
                )}

                <FixedTableCell
                  style={{
                    paddingRight: 0,
                    verticalAlign: 'middle',
                    width: 50,
                  }}
                >
                  <div className={classes.avatarLink}>
                    {_.get(rank, 'collaborator.team.id') ? (
                      <Link
                        to={`/teams/${_.get(
                          rank,
                          'collaborator.team.id'
                        )}/collaborators/${_.get(
                          rank,
                          'collaborator.id'
                        )}/detail`}
                      >
                        <Avatar
                          src={photo}
                          className={classes.photo}
                          entityId={rank.collaborator.id}
                          fallbackName={rank.collaborator.fullname}
                        />
                      </Link>
                    ) : (
                      <Avatar
                        src={photo}
                        className={classes.photo}
                        entityId={rank.collaborator.id}
                        fallbackName={rank.collaborator.fullname}
                      />
                    )}
                  </div>
                </FixedTableCell>

                <FlexibleTableCell
                  style={{
                    fontWeight: hasAward ? 'bold' : '',
                    minWidth: cellWidth,
                    maxWidth: cellWidth,
                  }}
                  color={color}
                >
                  {mobileScreen ? (
                    <React.Fragment>
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {rank.collaborator.firstname}
                      </div>
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {rank.collaborator.lastname}
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {rank.collaborator.firstname}{' '}
                        {rank.collaborator.lastname}
                      </div>
                    </React.Fragment>
                  )}
                </FlexibleTableCell>
                {displayCollaboratorTeam && (
                  <FlexibleTableCell
                    style={{
                      fontWeight: hasAward ? 'bold' : '',
                      minWidth: cellWidth,
                      maxWidth: cellWidth,
                      whiteSpace: 'normal',
                    }}
                    color={color}
                  >
                    {_.get(rank, 'collaborator.team.name')}
                  </FlexibleTableCell>
                )}
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
                    {_.get(rank, 'collaborator.team.parent.name')}
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

const mapStateToProps = ({ configList }) => ({ configList });

export default connect(mapStateToProps)(
  withStyles(styles)(withWidth()(CollaboratorChallengeRankList))
);
