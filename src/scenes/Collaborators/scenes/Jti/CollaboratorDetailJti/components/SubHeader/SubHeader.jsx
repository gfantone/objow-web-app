import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material';
import { Character } from '../Character';

import '../../../style.css';
import separation from '../../../../../../../assets/img/jti/separation.svg';
import slot from '../../../../../../../assets/img/jti/stones/slot.svg';
import stone0 from '../../../../../../../assets/img/jti/stones/stone_0.png';
import stone1 from '../../../../../../../assets/img/jti/stones/stone_1.png';
import stone2 from '../../../../../../../assets/img/jti/stones/stone_2.png';
import stone3 from '../../../../../../../assets/img/jti/stones/stone_3.png';
import stone4 from '../../../../../../../assets/img/jti/stones/stone_4.png';
import stone5 from '../../../../../../../assets/img/jti/stones/stone_5.png';
import stone6 from '../../../../../../../assets/img/jti/stones/stone_6.png';
import bgStones from '../../../../../../../assets/img/jti/stones/bgStones.svg';
import { CharacterDetail } from '../CharacterDetail';
import { Typography } from '@material-ui/core';
import _ from 'lodash';

const styles = {
  content: {
    background: '#151924',
    fontWeight: 'bold',
    borderRadius: '0 0 35px 40px',
    boxShadow: '0px 5px 20px #000',
  },
  progressTitle: {
    fontFamily: 'VOXMedium',
    fontWeight: '700',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#6790A9',
    fontSize: 12,
  },
  progressValueText: {
    fontFamily: 'VOXMedium',
    color: '#DFE9EE',
    fontSize: '24px',
    fontWeight: '700',
    fontStyle: 'italic',
    lineHeight: '24px',
    textAlign: 'center',
    marginTop: '3px',
  },
  progressTotalText: {
    fontFamily: 'VOXMedium',
    color: '#6790A9',
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: '14px',
    lineHeight: '14px',
    textAlign: 'center',
  },
};

const SubHeader = ({ ...props }) => {
  const { classes } = props;
  const renderData = () => {
    const { account } = props.accountDetail;
    const { challenges } = props.collaboratorChallengeList;
    const { goals } = props.collaboratorGoalSummaryList;
    const { data } = props.collaboratorDataList;
    const stones = [stone0, stone1, stone2, stone3, stone4, stone5, stone6];
    const excluded_goal_kpis = [
      65, 66, 67, 68, 69, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
    ];

    const completedChallenges = _.get(account, 'isJtiTradeEnv')
      ? challenges
          .filter((challenge) => parseInt(challenge.sourceId) !== 34)
          .reduce((acc, challenge) => acc + challenge.goal_points, 0)
      : challenges.filter((challenge) => challenge.isCompleted).length;

    const completedGoals = _.get(account, 'isJtiTradeEnv')
      ? goals
          .filter(
            (summary) => excluded_goal_kpis.indexOf(parseInt(summary.kpiId)) < 0
          )
          .reduce((acc, summary) => acc + summary.counter, 0)
      : goals.filter((summary) => summary.isCompleted).length;

    const completedStone = account.identifiers.filter(
      (identifier) => identifier.definition.order === 0
    )[0] || { value: null };

    const rank = data.filter((item) => item.user.id === account.id)[0];

    return (
      <div className={classes.content}>
        <Grid container spacing={0} alignItems='center' justifyContent='center'>
          <Character />
          <CharacterDetail />
        </Grid>
        <Grid container justifyContent='space-evenly'>
          <Grid item>
            <Typography align='center' style={styles.progressTitle}>
              DÉFIS
            </Typography>
            <Typography align='center' style={styles.progressTitle}>
              BUSINESS
            </Typography>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='baseline'
              spacing={0.5}
            >
              <Grid item>
                <Typography style={styles.progressValueText}>
                  {completedGoals}
                </Typography>
              </Grid>
              {!_.get(account, 'isJtiTradeEnv') && (
                <Grid item>
                  <Typography style={styles.progressTotalText}>
                    /{goals.length}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <img src={separation} alt='separation1' />
          </Grid>
          <Grid item>
            <Typography align='center' style={styles.progressTitle}>
              DÉFIS
            </Typography>
            <Typography align='center' style={styles.progressTitle}>
              PERSONNELS
            </Typography>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='baseline'
              spacing={0.5}
            >
              <Grid item>
                <Typography style={styles.progressValueText}>
                  {completedChallenges}
                </Typography>
              </Grid>
              {!_.get(account, 'isJtiTradeEnv') && (
                <Grid item>
                  <Typography style={styles.progressTotalText}>
                    /{challenges.length}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <img src={separation} alt='separation2' />
          </Grid>
          <Grid item>
            <Typography align='center' style={styles.progressTitle}>
              CLASSEMENT
            </Typography>
            <Typography align='center' style={styles.progressTitle}>
              GÉNÉRAL
            </Typography>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='baseline'
              spacing={0.5}
            >
              <Grid item>
                <Typography style={styles.progressValueText}>
                  {rank ? rank.dataValue : ''}
                </Typography>
              </Grid>
              <Grid item>
                <Typography style={styles.progressTotalText}>
                  /{_.get(account, 'isJtiTradeEnv') ? '151' : '2000'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          style={{ marginTop: '10px', marginBottom: '-56px' }}
          justifyContent='center'
          spacing={1}
        >
          {[...Array(7).keys()].map((i) => (
            <Grid item style={{ overflow: 'hidden' }}>
              {_.isFinite(parseInt(completedStone.value)) &&
              parseInt(completedStone.value) >= parseInt(i) ? (
                <img style={{ height: 36 }} src={stones[i]} alt='slot1' />
              ) : (
                <img style={{ height: 36 }} src={slot} alt='slot1' />
              )}
            </Grid>
          ))}
        </Grid>
        <img
          src={bgStones}
          alt='bgStones'
          style={{
            boxShadow: '0px 5px 20px #000',
            opacity: 0.12,
            width: '98%',
            position: 'relative',
            top: '0px',
            left: '3px',
          }}
        />
      </div>
    );
  };

  return <div>{renderData()}</div>;
};

const mapStateToProps = ({
  accountDetail,
  collaboratorChallengeList,
  collaboratorGoalSummaryList,
  collaboratorDataList,
}) => ({
  accountDetail,
  collaboratorChallengeList,
  collaboratorGoalSummaryList,
  collaboratorDataList,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
