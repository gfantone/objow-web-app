import React, { useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { ChallengeImage, ChallengeReward } from '../..';
import { DefaultText, TimerTag, BoldTitle } from '../../../../../components';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';

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

const ChallengeSimpleJti = ({
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

  const isTeamGroupChallenge = challenge.typeCode === 'TG';
  console.log(goalPoints);
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(ChallengeSimpleJti));
