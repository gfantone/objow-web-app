import React from 'react';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Link } from 'react-router-dom';
import { Grid, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortAmountDown,
  faRandom,
  faCheck,
  faFlagCheckered,
  faGift,
  faChartLine,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import {
  FixedTableCell,
  FlexibleTableCell,
  RankEvolution,
  Table,
  TableBody,
  TableCell,
  TableChip,
  TableHead,
  TableHeadCell,
  TableRow,
  TableRowHighlight,
  FullTableCell,
  Avatar,
  DefaultText,
  Tooltip,
  Card,
  GridLink,
  AccentText,
} from '../../../../components';
import { ChallengeReward } from '../';
import { useIntl } from 'react-intl';

const styles = {
  wrapper: {
    background: 'white',
    padding: '7px 10px',
    alignItems: 'center',
    position: 'relative',
    height: 50,
    overflow: 'visible',
    borderRadius: 5,
    boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)',
  },
  photoWrapper: {
    border: '2px solid #00E58D',
    borderRadius: 35,
  },
  photo: {
    width: 45,
    height: 45,
    border: '2px solid transparent',
  },
};

const CollaboratorChallengeCurrentRank = ({ rank, challenge, ...props }) => {
  const intl = useIntl();
  const { classes } = props;

  const mobileScreen = isWidthDown('xs', props.width);

  const coinImage = require(`../../../../assets/img/system/challenge/icons/coin.png`);
  const giftImage = require(`../../../../assets/img/system/challenge/icons/gift.png`);
  const cellWidth = mobileScreen ? 100 : 'auto';

  let borderTop = false;

  const photo = rank.collaborator.photo
    ? rank.collaborator.photo
    : '/assets/img/user/avatar.svg';
  const selected = true;
  const hasAward =
    rank.awards.length > 0 &&
    ((rank.award_type_code === 'C' && rank.race_position) ||
      rank.award_type_code === 'R');
  const color = !selected && !hasAward ? 'default' : 'primary';
  const teamColor = _.get(rank, 'collaborator.team.color.hex');
  const isRaceMode = rank.award_type_code === 'C';

  return (
    <div className={classes.wrapper}>
      <div style={{ position: 'absolute', top: -20, left: 20 }}>
        {_.get(rank, 'collaborator.team.id') ? (
          <Link
            to={`/teams/${_.get(
              rank,
              'collaborator.team.id',
            )}/collaborators/${_.get(rank, 'collaborator.id')}/detail`}
          >
            <div className={classes.photoWrapper}>
              <Avatar
                src={photo}
                className={classes.photo}
                entityId={rank.collaborator.id}
                fallbackName={rank.collaborator.fullname}
              />
            </div>
          </Link>
        ) : (
          <div className={classes.photoWrapper}>
            <Avatar
              src={photo}
              className={classes.photo}
              entityId={rank.collaborator.id}
              fallbackName={rank.collaborator.fullname}
            />
          </div>
        )}
      </div>
      <span style={{ position: 'absolute', top: 15, left: 35 }}>
        <TableChip color="default" label={rank.rank ? rank.rank : '-'} />
      </span>
      <Grid
        container
        spacing={2}
        style={{
          position: 'absolute',
          top: 8,
          left: 80,
          alignItems: 'baseline',
        }}
      >
        <Grid item style={{ marginTop: 2 }}>
          <DefaultText lowercase style={{ fontSize: 16 }}>
            <span style={{ fontWeight: 'bold' }}>Score : </span>
            <span>{rank.points}</span>
          </DefaultText>
        </Grid>
        <Grid item>
          <Grid container spacing={1} style={{ alignItems: 'center' }}>
            <Grid item>
              <DefaultText
                lowercase
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                {intl.formatMessage({ id: 'challenge.awards_title' })} :
              </DefaultText>
            </Grid>

            {rank.awards && rank.awards.length === 0 && (
              <Grid item style={{ position: 'relative' }}>
                <Tooltip title="Aucun gain remporté">
                  <div>
                    <AccentText
                      lowercase
                      style={{
                        position: 'absolute',
                        top: -5,
                        left: 15,
                        color: '#00E58D',
                        zIndex: 100,
                      }}
                    >
                      <FontAwesomeIcon icon={faLock} />
                    </AccentText>
                    <div style={{ filter: 'grayscale(1)' }}>
                      {_.get(challenge, 'rewardTypeCode') === 'G' ? (
                        <CardMedia
                          image={giftImage}
                          style={{ height: 20, width: 20, marginRight: 5 }}
                        />
                      ) : (
                        <CardMedia
                          image={coinImage}
                          style={{ height: 20, width: 20, marginRight: 5 }}
                        />
                      )}
                    </div>
                  </div>
                </Tooltip>
              </Grid>
            )}
            {rank.awards && rank.awards.length > 0 && (
              <React.Fragment>
                {rank.awards[0].reward ? (
                  <Grid item>
                    <Tooltip
                      className={`${classes.tooltip} ${classes.transparentTooltip}`}
                      title={
                        <div style={{ minWidth: 320 }}>
                          <Card>
                            <ChallengeReward reward={rank.awards[0].reward} />
                          </Card>
                        </div>
                      }
                    >
                      <CardMedia
                        image={giftImage}
                        style={{ height: 20, width: 20, marginRight: 5 }}
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
                        style={{ height: 20, width: 20, marginRight: 5 }}
                      />
                    </Tooltip>
                  </Grid>
                )}
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(
  withWidth()(CollaboratorChallengeCurrentRank),
);
