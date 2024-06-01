import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import '../../../style.css';
import { Grid } from '@mui/material';
import { Typography } from '@material-ui/core';
import _ from 'lodash';

const styles = {
  content: {
    marginTop: '4px',
  },
  name: {
    color: '#DFE9EE',
    fontFamily: 'VOXMedium',
    fontSize: '40px',
    fontStyle: 'italic',
    fontWeight: '700',
    marginLeft: 3,
  },
  surname: {
    color: '#ffffff',
    fontFamily: 'VOXMedium',
    fontSize: '16px',
    fontStyle: 'italic',
    lineHeight: '16px',
    fontWeight: '700',
    marginTop: '-13px',
    marginBottom: '15px',
  },
  contentGrade: {
    marginLeft: '-10px',
    marginTop: '5px',
    padding: 0,
    width: '115%',
  },
  gradeTitle: {
    fontFamily: 'VOXMedium',
    color: '#6790A9',
    fontSize: '8px',
    lineHeight: '8px',
    fontWeight: '700',
  },
  grade: {
    fontFamily: 'VOXMedium',
    background:
      'linear-gradient(to bottom, rgba(255, 255, 174, 1), rgba(255, 232, 0, 1), rgba(255, 127, 0, 1), rgba(255, 41, 0, 1))',
    backgroundClip: 'text',
    color: 'transparent',
    fontSize: '16px',
    textAlign: 'left',
    paddingLeft: 5,
    fontWeight: '700',
    fontStyle: 'italic',
    position: 'relative',
    left: '-6px',
  },
};

const CharacterDetail = ({ ...props }) => {
  const { account } = props.accountDetail;
  const { challenges } = props.collaboratorChallengeList;

  const selectedCharacterIdentifier = account.identifiers.filter(
    (identifier) => identifier.definition.order === 1
  )[0];

  const selectedCharacterIndex =
    selectedCharacterIdentifier?.value !== undefined &&
    selectedCharacterIdentifier?.value !== null &&
    selectedCharacterIdentifier?.value >= 0
      ? selectedCharacterIdentifier.value
      : -1;

  const completedChallenges = _.get(account, 'isJtiTradeEnv')
    ? challenges.filter(
        (challenge) => challenge.isCompleted && challenge.sourceId !== 34
      ).length
    : challenges.filter((challenge) => challenge.isCompleted).length;

  const characters = [
    { name: 'RICK', surname: "L'AIGLE" },
    { name: 'CLÉO', surname: 'LADY ICONIC' },
    { name: 'HENRY', surname: 'LE DANDY' },
    { name: 'IRIS', surname: 'LA FLEUR' },
  ];

  const grades = [
    'PIONNIER',
    'VOYAGEUR',
    'CHERCHEUR',
    'AVENTURIER',
    'EXPLORATEUR',
    'MAÎTRE DU TEMPS',
  ];
  let gradeIndex = parseInt(completedChallenges / 3);
  gradeIndex = gradeIndex > 5 ? 5 : gradeIndex;
  const character = characters[selectedCharacterIndex];
  return (
    <>
      {character && (
        <Grid item>
          <div style={styles.content}>
            <Typography style={styles.name}>
              {characters[selectedCharacterIndex].name}
            </Typography>
            <Typography style={styles.surname}>
              {characters[selectedCharacterIndex].surname}
            </Typography>
          </div>
          <div style={styles.contentGrade}>
            <Typography style={styles.gradeTitle}>GRADE</Typography>
            <Typography style={styles.grade}>{grades[gradeIndex]}</Typography>
          </div>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = ({
  accountDetail,
  collaboratorGoalSummaryList,
  collaboratorChallengeList,
}) => ({
  accountDetail,
  collaboratorGoalSummaryList,
  collaboratorChallengeList,
});

export default connect(mapStateToProps)(withStyles(styles)(CharacterDetail));
