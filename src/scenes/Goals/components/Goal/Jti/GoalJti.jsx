import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  AccentText,
  DefaultText,
  DefaultTitle,
  ProgressBar,
  InfoText,
  ThemeWrapper,
} from '../../../../../components';
import * as Resources from '../../../../../Resources';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

const styles = {
  icon: {
    width: 41,
    height: 41,
    marginRight: 8,
  },
  name: {
    marginRight: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  progress: {
    marginTop: 16,
  },
  progressBar: {
    marginTop: 8,
  },
  infos: {
    marginTop: 16,
  },
  info: {
    marginLeft: 16,
  },
  subInfo: {
    marginLeft: 4,
  },
  animated: {
    // transition: 'all 0.2s ease-in-out',
    border: '1px solid transparent',
    padding: 5,
    borderRadius: 10,
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.02)',
    },
  },
};

const Goal = ({
  goal,
  hideIcon,
  hideSubInfo,
  hideTimer,
  hideProgressionDetail,
  animate,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;

  const progression = parseFloat(
    ((goal.counter / goal.target) * 100).toFixed(2)
  );
  const typeStyle = goal.type === 'T' ? { color: goal.color } : null;

  const { successColor, errorColor } = useContext(ThemeWrapper.Context);

  let maxPointsKey;
  maxPointsKey = 'maxPoints';
  const maxPoints = goal[maxPointsKey];
  const hasPoints = goal[maxPointsKey] > 0;

  return (
    <div className={animate ? classes.animated : ''}>
      <Grid container style={{ marginBottom: hideProgressionDetail ? -40 : 0 }}>
        {!hideIcon && (
          <Grid item>
            <CardMedia image={goal.icon} className={classes.icon} />
          </Grid>
        )}
        <Grid item xs zeroMinWidth>
          <DefaultTitle lowercase className={classes.name}>
            {goal.name}
          </DefaultTitle>
        </Grid>
      </Grid>
      <Grid container className={classes.progress}>
        {!hideProgressionDetail && (
          <Grid item>
            <DefaultText lowercase>
              {intl
                .formatMessage({ id: 'admin.goal.thumbnail.counter_text' })
                .format(goal.counter.toLocaleString())}{' '}
              <InfoText lowercase component='span'>
                {intl
                  .formatMessage({ id: 'admin.goal.thumbnail.target_text' })
                  .format(goal.target.toLocaleString())}
              </InfoText>
            </DefaultText>
          </Grid>
        )}
        <Grid item xs>
          <AccentText
            align='right'
            style={{
              fontSize: hideProgressionDetail ? 16 : 14,
              fontWeight: 'bold',
              color: successColor,
            }}
          >
            {'{0}%'.format(progression)}
          </AccentText>
        </Grid>
      </Grid>
      <Grid container className={classes.progressBar}>
        <Grid item xs>
          <ProgressBar gradient value={progression} animate />
        </Grid>
      </Grid>
      {!hideSubInfo && (
        <Grid container className={classes.infos}>
          {hasPoints && (
            <Grid item className={classes.info}>
              <DefaultText lowercase>
                <FontAwesomeIcon icon={faFireAlt} />{' '}
                {intl
                  .formatMessage({ id: 'admin.goal.thumbnail.points_text' })
                  .format(goal.points)}{' '}
                <InfoText lowercase component='span'>
                  {intl
                    .formatMessage({
                      id: 'admin.goal.thumbnail.max_points_text',
                    })
                    .format(maxPoints)}
                </InfoText>
              </DefaultText>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(Goal));
