import React, { useState } from 'react';
import { Grid, CardMedia, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { faFireAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { ChallengeImage, ChallengeType, ChallengeReward } from '..';
import {
  DefaultText,
  InfoText,
  TimerTag,
  AccentText,
  Tooltip,
  Card,
  BoldTitle,
} from '../../../../components';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  imageContainer: {
    position: 'relative',
  },
  timerContainer: {
    position: 'absolute',
    right: 0,
    top: 16,
  },
  tooltip: {
    minWidth: 320,
  },
  transparentTooltip: {
    background: 'transparent',
  },
};

const ChallengeSimple = ({
  challenge,
  fetchWonAwards,
  fetchCurrentRank,
  fetchGoalPoints,
  fetchTopParticipants,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;
  const { account } = props.accountDetail;
  const [wonAwards, setWonAwards] = useState(
    fetchWonAwards ? null : challenge.wonAwards
  );
  const [rank, setRank] = useState(fetchCurrentRank ? null : challenge.rank);
  const [wonAwardsLoading, setWonAwardsLoading] = useState(false);
  const [rankLoading, setRankLoading] = useState(false);
  const [initialized, setInitialized] = useState();
  const [goalPoints, setGoalPoints] = useState();
  const [topParticipants, setTopParticipants] = useState();

  const allowRank = account.hasChallengeRankAccess;

  if (!initialized) {
    setInitialized(true);
    if (fetchWonAwards) {
      setWonAwardsLoading(true);
      fetchWonAwards()
        .then((results) => {
          setWonAwardsLoading(false);
          setWonAwards(results.data);
        })
        .catch(() => {
          setWonAwardsLoading(false);
        });
    }
    if (fetchCurrentRank) {
      setRankLoading(true);
      fetchCurrentRank()
        .then((results) => {
          setRankLoading(false);
          setRank(results.data);
        })
        .catch(() => {
          setRankLoading(false);
        });
    }
    if (fetchGoalPoints) {
      fetchGoalPoints().then((results) => {
        setGoalPoints(results.data);
      });
    }
    if (fetchTopParticipants) {
      fetchTopParticipants().then((results) => {
        setTopParticipants(results.data);
      });
    }
  }

  const coinImage = require(`../../../../assets/img/system/challenge/icons/coin.png`);
  const giftImage = require(`../../../../assets/img/system/challenge/icons/gift.png`);

  const displayRank = rank && allowRank;

  const challengeTypeInfos = {
    CT: {
      rank: (
        <span>
          <span style={{ fontWeight: 'bold' }}>{challenge.participants}</span>{' '}
          {intl.formatMessage({ id: 'challenge.teams' }).format('')}
        </span>
      ),
    },
    TP: {
      rank: (
        <span>
          <span style={{ fontWeight: 'bold' }}>{challenge.participants}</span>{' '}
          {intl.formatMessage({ id: 'challenge.teams' }).format('')}
        </span>
      ),
    },
    CC: {
      rank: (
        <span>
          <span>
            {challenge.totalParticipants &&
            challenge.participants !== challenge.totalParticipants ? (
              <span>
                <span style={{ fontWeight: 'bold' }}>
                  {challenge.participants}
                </span>{' '}
                / {challenge.totalParticipants}
              </span>
            ) : (
              <span style={{ fontWeight: 'bold' }}>
                {challenge.participants}
              </span>
            )}
          </span>
          {intl.formatMessage({ id: 'challenge.collaborators' }).format('')}
        </span>
      ),
    },
    TG: {
      rank: (
        <span>
          <span style={{ fontWeight: 'bold' }}>{challenge.participants}</span>{' '}
          {intl.formatMessage({ id: 'challenge.team_groups' }).format('')}
        </span>
      ),
    },
  };

  const isTeamGroupChallenge = challenge.typeCode === 'TG';

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.imageContainer}>
            <div className={classes.timerContainer}>
              <TimerTag date={challenge.end} />
            </div>
            <ChallengeImage image={challenge.custom_image || challenge.image} />
          </div>
        </Grid>
        <Grid item xs={12} style={{ maxHeight: 49, overflow: 'hidden' }}>
          <Grid container spacing={2} style={{ alignItems: 'baseline' }}>
            <Grid
              container
              spacing={1}
              direction='column'
              style={{ padding: '5px 5px 0 5px' }}
            >
              <Grid item>
                <BoldTitle lowercase style={{ lineHeight: 1 }}>
                  {challenge.name}
                </BoldTitle>
              </Grid>
              {!isTeamGroupChallenge && (
                <Grid item>
                  <Grid container direction='row' spacing={2}>
                    <Grid item>
                      <DefaultText lowercase>
                        {!rankLoading && displayRank && (
                          <div>
                            <span style={{ fontWeight: 'bold', fontSize: 15 }}>
                              {rank == 1
                                ? intl
                                    .formatMessage({
                                      id: 'challenge.first_rank',
                                    })
                                    .format(rank)
                                : intl
                                    .formatMessage({
                                      id: 'challenge.other_rank',
                                    })
                                    .format(rank)}
                            </span>
                            <InfoText component='span'>
                              {' '}
                              / {challenge.participants}
                            </InfoText>
                          </div>
                        )}
                        {!rankLoading && !displayRank && (
                          <div>
                            &nbsp;
                            {challengeTypeInfos[challenge.typeCode].rank}
                          </div>
                        )}
                        {rankLoading && allowRank && (
                          <span>
                            <CircularProgress
                              style={{
                                width: 20,
                                height: 20,
                                marginLeft: 10,
                                color: '#00E58D',
                                marginBottom: -5,
                              }}
                            />
                          </span>
                        )}
                      </DefaultText>
                    </Grid>
                    <Grid item>
                      {/* enable_manager_score is undefined for collaborator challenges */}
                      {challenge.enable_manager_score !== false && (
                        <Grid item>
                          <DefaultText lowercase>
                            <span style={{ fontWeight: 'bold', fontSize: 15 }}>
                              {intl
                                .formatMessage({ id: 'challenge.points' })
                                .format('')}
                            </span>
                            {goalPoints &&
                              parseFloat(goalPoints).toLocaleString()}
                          </DefaultText>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
            {wonAwardsLoading && (
              <Grid item>
                <CircularProgress
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 10,
                    color: '#00E58D',
                    marginBottom: -5,
                  }}
                />
              </Grid>
            )}

            {wonAwards && (
              <Grid item style={{ maxHeight: 37 }}>
                <Grid container spacing={1}>
                  <Grid item>
                    <DefaultText
                      lowercase
                      style={{ fontSize: 15, fontWeight: 'bold' }}
                    >
                      {intl.formatMessage({ id: 'challenge.awards_title' })} :
                    </DefaultText>
                  </Grid>
                  {wonAwards.length === 0 && (
                    <Grid item style={{ position: 'relative', fontSize: 15 }}>
                      <Tooltip title='Aucun gain remporté'>
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
                                style={{
                                  height: 18,
                                  width: 18,
                                  marginRight: 5,
                                }}
                              />
                            ) : (
                              <CardMedia
                                image={coinImage}
                                style={{
                                  height: 18,
                                  width: 18,
                                  marginRight: 5,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </Tooltip>
                    </Grid>
                  )}
                  {wonAwards.length > 0 && (
                    <React.Fragment>
                      {wonAwards[0].reward ? (
                        <Grid item>
                          <Tooltip
                            className={`${classes.tooltip} ${classes.transparentTooltip}`}
                            title={
                              <div style={{ minWidth: 320 }}>
                                <Card>
                                  <ChallengeReward
                                    reward={wonAwards[0].reward}
                                  />
                                </Card>
                              </div>
                            }
                          >
                            <CardMedia
                              image={giftImage}
                              style={{ height: 18, width: 18, marginRight: 5 }}
                            />
                          </Tooltip>
                        </Grid>
                      ) : (
                        <Grid item>
                          <Tooltip
                            title={
                              <Grid container spacing={1}>
                                <Grid item>{wonAwards[0].points}</Grid>
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
                              style={{ height: 18, width: 18, marginRight: 5 }}
                            />
                          </Tooltip>
                        </Grid>
                      )}
                    </React.Fragment>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(ChallengeSimple));
