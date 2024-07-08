import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import '../../../style.css';
import { Grid } from '@mui/material';
import { Typography } from '@material-ui/core';
// import stones from '../../../../../../../assets/img/jti/stones/stone.svg';
import stone0 from '../../../../../../../assets/img/jti/stones/stone_big_0.png';
import stone1 from '../../../../../../../assets/img/jti/stones/stone_big_1.png';
import stone2 from '../../../../../../../assets/img/jti/stones/stone_big_2.png';
import stone3 from '../../../../../../../assets/img/jti/stones/stone_big_3.png';
import stone4 from '../../../../../../../assets/img/jti/stones/stone_big_4.png';
import stone5 from '../../../../../../../assets/img/jti/stones/stone_big_5.png';
import stone6 from '../../../../../../../assets/img/jti/stones/stone_big_6.png';
import stoneShadow from '../../../../../../../assets/img/jti/stones/stone_shadow.svg';
import btnBusiness from '../../../../../../../assets/img/jti/btn/btnViewBusiness.svg';
import btnGame from '../../../../../../../assets/img/jti/btn/btn_game.svg';
import buttonChooseCharacter from '../../../../../../../assets/img/jti/btn/button_choose_character.svg';
import characterGroup from '../../../../../../../assets/img/jti/character/character_group.png';
import { Button } from '../../../../../../../components';
import _ from 'lodash';
import { is } from 'date-fns/locale';

const styles = {
  content: {
    width: '100%',
    borderRadius: '20px',
    background: '#1c2530',
    boxShadow: '0px 5px 20px #000',
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
  },
};

const GoalCardInfos = ({ ...props }) => {
  const { goals } = props.collaboratorGoalSummaryList;
  const { account } = props.accountDetail;
  const isTrade = _.get(account, 'isJtiTradeEnv');
  const excluded_goal_kpis = [
    65, 66, 67, 68, 69, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  ];
  const stones = isTrade
    ? [
        { stone: stone0, condition: 0 },
        { stone: stone1, condition: 600 },
        { stone: stone2, condition: 1200 },
        { stone: stone3, condition: 1500 },
        { stone: stone4, condition: 2000 },
        { stone: stone5, condition: 2300 },
        { stone: stone6, condition: 2500 },
      ]
    : [
        { stone: stone0, condition: 0 },
        { stone: stone1, condition: 6 },
        { stone: stone2, condition: 12 },
        { stone: stone3, condition: 18 },
        { stone: stone4, condition: 25 },
        { stone: stone5, condition: 30 },
        { stone: stone6, condition: 33 },
      ];

  const completedGoals = isTrade
    ? goals
        .filter(
          (summary) => excluded_goal_kpis.indexOf(parseInt(summary.kpiId)) < 0
        )
        .reduce((acc, summary) => acc + summary.counter, 0)
    : goals.filter((goal) => goal.isCompleted).length;

  const completedStoneIdentifier = account.identifiers.filter(
    (identifier) => identifier.definition.order === 0
  )[0] || { value: null };
  const completedStoneIndex = _.isFinite(
    parseInt(completedStoneIdentifier.value)
  )
    ? parseInt(completedStoneIdentifier.value)
    : null;

  const hasLastStone = completedStoneIndex >= stones.length - 1;

  const nbGoal = !hasLastStone
    ? stones[completedStoneIndex + 1].condition - completedGoals
    : 0;
  // when the user has completed enough goals to get a new stone
  const newStone =
    completedStoneIndex === null ||
    (!hasLastStone &&
      stones[completedStoneIndex + 1].condition <= completedGoals);

  const selectedCharacterIdentifier = account.identifiers.filter(
    (identifier) => identifier.definition.order === 1
  )[0];
  const selectedCharacterIndex =
    selectedCharacterIdentifier?.value !== undefined &&
    selectedCharacterIdentifier?.value !== null &&
    selectedCharacterIdentifier?.value !== '' &&
    selectedCharacterIdentifier?.value >= 0
      ? selectedCharacterIdentifier.value
      : -1;

  return (
    <div style={styles.content}>
      {selectedCharacterIndex < 0 && (
        <>
          <Typography
            style={Object.assign({}, styles.cardTitle, {
              textAlign: 'center',
              marginLeft: 0,
            })}
          >
            PRÊT À ENTRER DANS L'AVENTURE ?
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <div
                style={{
                  width: 270,
                  height: 205,
                  backgroundImage: `url(${characterGroup})`,
                  backgroundSize: '260px 260px',
                  backgroundPosition: 'top center',
                  backgroundRepeat: 'no-repeat',
                  margin: 'auto',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <img
                src={buttonChooseCharacter}
                alt='btn-character'
                style={{
                  margin: 'auto',
                  marginBottom: 20,
                  width: '300',
                  display: 'block',
                }}
                onClick={() => {
                  props.history.push('/game');
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
      {selectedCharacterIndex >= 0 && (
        <>
          <Typography style={styles.cardTitle}>
            {newStone ? 'NOUVELLE PIERRE LOCALISÉE !' : 'MES DÉFIS BUSINESS'}
          </Typography>
          <Grid
            container
            justifyContent='flex-start'
            direction='row'
            alignItems='center'
            // style={{ padding: '20px' }}
          >
            {!hasLastStone && (
              <Grid
                item
                xs={4}
                style={{
                  marginTop: '-10px',
                  marginLeft: '-10px',
                  position: 'relative',
                }}
              >
                <img
                  src={stones[completedStoneIndex + 1].stone}
                  style={{ width: '100%' }}
                  alt='stones_i'
                />
                <img
                  src={stoneShadow}
                  style={{ position: 'absolute', bottom: 18, left: 20 }}
                />
              </Grid>
            )}
            {hasLastStone && (
              <Grid
                item
                xs={12}
                style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 10 }}
              >
                <Typography style={styles.cardDetailText}>
                  Mission accomplie : vous avez redonné à la terre ses couleurs
                  !
                </Typography>
              </Grid>
            )}
            {!hasLastStone && (
              <Grid item xs={8} style={{ marginTop: -7, marginLeft: -10 }}>
                {newStone && (
                  <>
                    <Typography style={styles.cardDetailText}>
                      Grâce à vos efforts, vous avez repéré les coordonnées où
                      se trouve une nouvelle pierre
                    </Typography>
                    <img
                      src={btnGame}
                      alt='btn-business'
                      style={{ marginTop: '15px' }}
                      onClick={() => {
                        props.history.push('/game');
                      }}
                    />
                  </>
                )}
                {!newStone && (
                  <>
                    <Typography style={styles.cardDetailText}>
                      Plus que{' '}
                      <span style={styles.cardDetailValueText}>
                        {nbGoal}{' '}
                        {isTrade ? 'points' : nbGoal > 1 ? 'défis' : 'défi'}{' '}
                        {isTrade ? '' : 'business'}
                      </span>{' '}
                      pour récupérer la prochaine pierre
                    </Typography>
                    <img
                      src={btnBusiness}
                      alt='btn-business'
                      style={{ marginTop: '15px' }}
                      onClick={() => {
                        props.history.push('/goals');
                      }}
                    />
                  </>
                )}
                {/*<Button*/}
                {/*  onClick={() => {*/}
                {/*    props.history.push('/goals');*/}
                {/*  }}*/}
                {/*  type='button'*/}
                {/*  color='primary'*/}
                {/*  style={styles.btn}*/}
                {/*>*/}
                {/*  VOIR MES DEFIS BUSINESS*/}
                {/*</Button>*/}
              </Grid>
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ accountDetail, collaboratorGoalSummaryList }) => ({
  accountDetail,
  collaboratorGoalSummaryList,
});

export default connect(mapStateToProps)(
  withStyles(styles)(withRouter(GoalCardInfos))
);
