import React, { useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { ChallengeImage } from '../..';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultText, TimerTag, BoldTitle } from '../../../../../components';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const styles = (theme) => {
  return {
    challengeImage: {
      height: '600px',
    },
    imageContainer: {
      position: 'relative',
    },
    timerContainer: {
      position: 'absolute',
      right: 0,
      top: 16,
    },
    avatarGroup: {
      marginLeft: '-2px',
      flexWrap: 'wrap',

      height: 35,
      overflow: 'hidden',
    },
    avatar: {
      width: 35,
      height: 35,
    },
    bigText: {
      fontSize: 18,
    },
    smallText: {
      fontSize: 15,
    },
    challengeType: {
      lineHeight: 35,
      verticalAlign: 'center',
      whiteSpace: 'nowrap',
    },
    tooltip: {
      minWidth: 320,
    },
    transparentTooltip: {
      background: 'transparent',
    },
    accentText: {
      position: 'absolute',
      top: -5,
      left: 15,
      color: theme.palette.primary.main,
      zIndex: 100,
    },
    circularProgress: {
      width: 20,
      height: 20,
      marginLeft: 10,
      color: theme.palette.primary.main,
      marginBottom: -5,
    },
  };
};

const ChallengeJti = ({
  challenge,
  scoreByTeam,
  fetchWonAwards,
  fetchCurrentRank,
  fetchGoalPoints,
  fetchTopParticipants,
  ...props
}) => {
  const intl = useIntl();
  const { classes, configs } = props;
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
      fetchWonAwards(_.get(challenge, 'id'))
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
      fetchCurrentRank(_.get(challenge, 'id'))
        .then((results) => {
          setRankLoading(false);
          setRank(results.data);
        })
        .catch(() => {
          setRankLoading(false);
        });
    }
    if (fetchGoalPoints) {
      fetchGoalPoints(_.get(challenge, 'sourceId')).then((results) => {
        setGoalPoints(results.data);
      });
    }
    if (fetchTopParticipants) {
      fetchTopParticipants(_.get(challenge, 'sourceId')).then((results) => {
        setTopParticipants(results.data);
      });
    }
  }

  const hasParticipants = !_.isEmpty(topParticipants);

  const displayTitle =
    configs &&
    _.get(
      configs.find((c) => c.code === 'CTTA'),
      'value',
      'false'
    ).toBoolean();
  const isTeamGroupChallenge = challenge.typeCode === 'TG';
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.imageContainer}>
            <div className={classes.timerContainer}>
              <TimerTag date={challenge.end} />
            </div>
            <ChallengeImage
              image={challenge.custom_image || challenge.image}
              style={{ height: hasParticipants ? '' : '189px' }}
            />
          </div>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Grid container spacing={1} direction='column'>
            {displayTitle && (
              <Grid item>
                <BoldTitle lowercase style={{ lineHeight: 1 }}>
                  {challenge.name}
                </BoldTitle>
              </Grid>
            )}
            {!isTeamGroupChallenge && (
              <Grid item style={{ maxHeight: '27px' }}>
                <Grid
                  container
                  spacing={2}
                  style={{ alignItems: 'baseline' }}
                  direction='row'
                >
                  {/* enable_manager_score is undefined for collaborator challenges */}
                  {challenge.enable_manager_score !== false && (
                    <Grid item>
                      <DefaultText lowercase className={classes.smallText}>
                        &nbsp;
                        <span style={{ fontWeight: 'bold' }}>
                          {intl
                            .formatMessage({ id: 'challenge.points' })
                            .format('')}
                        </span>
                        {goalPoints && parseFloat(goalPoints).toLocaleString()}
                      </DefaultText>
                    </Grid>
                  )}
                  {wonAwardsLoading && (
                    <Grid item>
                      <CircularProgress className={classes.circularProgress} />
                    </Grid>
                  )}
                  <Grid item xs />
                  {goalPoints !== undefined && goalPoints > 0 ? (
                    <Grid item>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        color='#4CAF50'
                        style={{
                          fontSize: 18,
                        }}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            )}
            <Grid item>
              <Grid
                container
                spacing={1}
                direction='row'
                style={{ flexWrap: 'noWrap' }}
              ></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(ChallengeJti));
