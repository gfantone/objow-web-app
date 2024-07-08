import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import rick from '../../../../../../../assets/img/jti/character/rick_characters.png';
// import character0 from '../../../../../../../assets/img/jti/character/character_0.svg';
import character0 from '../../../../../../../assets/img/jti/character/character_0.png';
import character1 from '../../../../../../../assets/img/jti/character/character_1.png';
import character2 from '../../../../../../../assets/img/jti/character/character_2.png';
import character3 from '../../../../../../../assets/img/jti/character/character_3.png';
import characterEmpty from '../../../../../../../assets/img/jti/character/character_empty.svg';

import '../../../style.css';
import { Grid } from '@mui/material';
import { Badge } from '../../components';
import _ from 'lodash';

const styles = {};

const Character = ({ ...props }) => {
  const renderData = () => {
    const { account } = props.accountDetail;
    const { challenges } = props.collaboratorChallengeList;
    const completedChallenges = _.get(account, 'isJtiTradeEnv')
      ? challenges.filter(
          (challenge) => challenge.isCompleted && challenge.sourceId !== 34
        ).length
      : challenges.filter((challenge) => challenge.isCompleted).length;

    let gradeIndex = parseInt(completedChallenges / 3);
    gradeIndex = gradeIndex > 5 ? 5 : gradeIndex;
    const selectedCharacterIdentifier = account.identifiers.filter(
      (identifier) => identifier.definition.order === 1
    )[0];
    const selectedCharacterIndex =
      selectedCharacterIdentifier?.value !== undefined &&
      selectedCharacterIdentifier?.value !== null &&
      selectedCharacterIdentifier?.value >= 0
        ? selectedCharacterIdentifier.value
        : -1;
    const characters = [character0, character1, character2, character3];

    const character = characters[selectedCharacterIndex] || characterEmpty;

    return (
      <Grid item style={{ maxWidth: '168px', maxHeight: '182px' }}>
        <img src={character} alt='rick' style={{ width: '100%' }} />
        {characters[selectedCharacterIndex] && (
          <Badge lvlBadge={gradeIndex} forCharacter={true} />
        )}
      </Grid>
    );
  };

  return <div>{renderData()}</div>;
};

const mapStateToProps = ({ accountDetail, collaboratorChallengeList }) => ({
  accountDetail,
  collaboratorChallengeList,
});

export default connect(mapStateToProps)(withStyles(styles)(Character));
