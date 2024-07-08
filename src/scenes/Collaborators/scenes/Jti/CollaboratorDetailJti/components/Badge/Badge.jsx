import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import badgeComplete0 from '../../../../../../../assets/img/jti/badges/badge_completed_0.svg';
import badgeComplete1 from '../../../../../../../assets/img/jti/badges/badge_completed_1.svg';
import badgeComplete2 from '../../../../../../../assets/img/jti/badges/badge_completed_2.svg';
import badgeComplete3 from '../../../../../../../assets/img/jti/badges/badge_completed_3.svg';
import badgeComplete4 from '../../../../../../../assets/img/jti/badges/badge_completed_4.svg';
import badgeComplete5 from '../../../../../../../assets/img/jti/badges/badge_completed_5.svg';

import badge0 from '../../../../../../../assets/img/jti/badges/badge_0.svg';
import badge1 from '../../../../../../../assets/img/jti/badges/badge_1.svg';
import badge2 from '../../../../../../../assets/img/jti/badges/badge_2.svg';
import badge3 from '../../../../../../../assets/img/jti/badges/badge_3.svg';
import badge4 from '../../../../../../../assets/img/jti/badges/badge_4.svg';
import badge5 from '../../../../../../../assets/img/jti/badges/badge_5.svg';

import '../../../style.css';
import { Grid } from '@mui/material';
import bgProgress from '../../../../../../../assets/img/jti/bgProgress.png';

const listBadgeComplete = [
  badgeComplete0,
  badgeComplete1,
  badgeComplete2,
  badgeComplete3,
  badgeComplete4,
  badgeComplete5,
];
console.log(listBadgeComplete[0]);
const listBadge = [badge0, badge1, badge2, badge3, badge4, badge5];

const styles = {
  badgeCharacter: {
    position: 'relative',
    width: '114px',
    height: '65px',
    left: '28px',
    top: '-77px',
    display: 'flex',
    justifyContent: 'center',
  },
};

const Badge = ({ ...props }) => {
  const lvlBadge = props.lvlBadge || 0;
  const complete = props.complete !== null ? props.complete : false;
  const forCharacter = props.forCharacter || false;

  const renderData = () => {
    return (
      <div>
        {forCharacter && (
          <Grid item>
            <div style={styles.badgeCharacter}>
              <img
                style={{ position: 'relative' }}
                src={listBadgeComplete[lvlBadge]}
                alt='badge'
              />
            </div>
          </Grid>
        )}
        {!forCharacter && (
          <Grid item>
            {complete && (
              <img
                src={listBadgeComplete[lvlBadge]}
                alt='badge'
                style={{
                  width: '110px',
                  height: '72px',
                  backgroundImage: `url(${bgProgress})`,
                  backgroundRepeat: 'repeat-x',
                  backgroundPositionY: 'center',
                }}
              />
            )}
            {!complete && (
              <img
                src={listBadge[lvlBadge]}
                alt='badge'
                style={{
                  width: '110px',
                  height: '72px',
                  backgroundImage: `url(${bgProgress})`,
                  backgroundRepeat: 'repeat-x',
                  backgroundPositionY: 'center',
                }}
              />
            )}
          </Grid>
        )}
      </div>
    );
  };

  return <div>{renderData()}</div>;
};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(withStyles(styles)(Badge));
