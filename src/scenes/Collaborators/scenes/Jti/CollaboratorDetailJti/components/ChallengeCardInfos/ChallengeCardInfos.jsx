import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import '../../../style.css';
import { Grid } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Badge } from '../../components';
import { Button } from '../../../../../../../components';
import btnViewPerso from '../../../../../../../assets/img/jti/btn/btnViewPerso.svg';
import progressBadgeSlot from '../../../../../../../assets/img/jti/badges/progressBadgeSlot.svg';
import badgeStepFull from '../../../../../../../assets/img/jti/badges/badge_step_full.svg';
import badgeStepEmpty from '../../../../../../../assets/img/jti/badges/badge_step_empty.svg';
import bgProgress from '../../../../../../../assets/img/jti/bgProgress.png';
import _ from 'lodash';

const styles = {
  content: {
    width: '100%',
    borderRadius: '20px',
    background: '#1c2530',
    boxShadow: '0px 5px 20px #000',
    marginBottom: '40px',
  },
  cardTitle: {
    marginLeft: '20px',
    paddingTop: '20px',
    color: '#DFE9EE',
    fontFamily: 'VOXMedium',
    fontWeight: '700',
    fontSize: '26px',
    lineHeight: '30px',
    fontStyle: 'italic',
  },
  cardDetailText: {
    fontFamily: 'BarlowRegular',
    color: '#DFE9EE',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
  },
  cardDetailValueText: {
    fontFamily: 'BarlowRegular',
    color: '#DFE9EE',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '700',
  },
  btn: {
    fontFamily: 'VOXMedium',
    color: '#000',
    background: '#FF7F00',
    marginTop: '15px',
    marginBottom: '15px',
  },
};

const gradesList = [
  { lvlGrade: 0, complete: true, nextGrade: 3 },
  { lvlGrade: 1, complete: true, nextGrade: 3 },
  { lvlGrade: 2, complete: true, nextGrade: 3 },
  { lvlGrade: 3, complete: true, nextGrade: 3 },
  { lvlGrade: 4, complete: true, nextGrade: 3 },
  { lvlGrade: 5, complete: true, nextGrade: 0 },
];

const ChallengeCardInfos = ({ ...props }) => {
  const { challenges } = props.collaboratorChallengeList;
  const { account } = props.accountDetail;

  const completedChallenges = _.get(account, 'isJtiTradeEnv')
    ? challenges.filter(
        (challenge) => challenge.isCompleted && challenge.sourceId !== 34
      ).length
    : challenges.filter((challenge) => challenge.isCompleted).length;

  const currentGrade = parseInt(completedChallenges / 3);
  const lastGrade = currentGrade >= 5;

  const remainingChallenges = (currentGrade + 1) * 3 - completedChallenges;
  return (
    <div style={styles.content}>
      <Typography style={styles.cardTitle}>MES DÉFIS PERSONNELS</Typography>
      <div
        style={{
          marginLeft: '20px',
          marginRight: '20px',
          marginBottom: '10px',
          marginTop: '5px',
        }}
      >
        {lastGrade && (
          <Typography style={styles.cardDetailText}>
            Bravo ! Vous avez atteint le grade ultime
          </Typography>
        )}
        {!lastGrade && (
          <Typography style={styles.cardDetailText}>
            Plus que{' '}
            <span style={styles.cardDetailValueText}>
              {(currentGrade + 1) * 3 - completedChallenges}{' '}
              {remainingChallenges > 1 ? 'défis personnels' : 'défi personnel'}
            </span>{' '}
            pour passer au grade supérieur
          </Typography>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            width: '100vw',
            height: '80px',
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {gradesList.map((item, index) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Badge
                lvlBadge={item.lvlGrade}
                complete={index <= currentGrade}
              />
              {[...Array(item.nextGrade)].map((x, indexStep) => (
                <div
                  style={{
                    backgroundImage: `url(${bgProgress})`,
                    backgroundRepeat: 'repeat-x',
                    backgroundPositionY: 'center',
                    marginBottom: '6px',
                    height: '78px',
                    marginTop: 0,
                  }}
                >
                  <img
                    src={
                      index * 3 + indexStep > completedChallenges - 1
                        ? badgeStepEmpty
                        : badgeStepFull
                    }
                    alt='progSlot'
                    style={{ position: 'relative', top: '28px' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Grid container justifyContent='center'>
        <Grid item>
          <img
            src={btnViewPerso}
            alt='btn-personnels'
            style={{ marginTop: '20px', marginBottom: '10px' }}
            onClick={() => {
              props.history.push('/challenges');
            }}
          />
          {/*<Button*/}
          {/*  onClick={() => {*/}
          {/*    props.history.push('/challenges');*/}
          {/*  }}*/}
          {/*  type='button'*/}
          {/*  color='primary'*/}
          {/*  style={styles.btn}*/}
          {/*>*/}
          {/*  VOIR MES DEFIS PERSONNELS*/}
          {/*</Button>*/}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ accountDetail, collaboratorChallengeList }) => ({
  accountDetail,
  collaboratorChallengeList,
});

export default connect(mapStateToProps)(
  withStyles(styles)(withRouter(ChallengeCardInfos))
);
