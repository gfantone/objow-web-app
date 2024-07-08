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
  TimerTag,
  ThemeWrapper,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import { Period } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFireAlt,
  faFlagCheckered,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

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
  const hasRank = goal.rank && goal.allow_ranking;

  const { successColor, errorColor } = useContext(ThemeWrapper.Context);

  let maxPointsKey;
  maxPointsKey = 'maxPoints';
  // if(goal.pointRepartitionMode === 'G') {
  // } else {
  //   if(goal.type === 'T' && goal.pointRepartitionMode === 'T') {
  //     maxPointsKey = 'maxTeamPoints'
  //   } else {
  //     // if(goal.pointRepartitionMode === 'T') {
  //     //   maxPointsKey = 'maxTeamCollaboratorPoints'
  //     // } else if(goal.pointRepartitionMode === 'I') {
  //       maxPointsKey = 'maxCollaboratorPoints'
  //     // }
  //   }
  // }
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
          <DefaultTitle lowercase className={classes.name} noWrap>
            {goal.name}
          </DefaultTitle>
          <Period goal={goal} />
        </Grid>
        {!hideTimer && (
          <Grid item>
            <TimerTag date={goal.end} />
          </Grid>
        )}
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
                  .format(parseFloat(goal.target.toFixed(2)).toLocaleString())}
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
          {hasRank && (
            <Grid item>
              <DefaultText lowercase>
                <FontAwesomeIcon icon={faFlagCheckered} />{' '}
                {goal.rank == 1
                  ? intl
                      .formatMessage({
                        id: 'admin.goal.thumbnail.first_rank_text',
                      })
                      .format(goal.rank)
                  : intl
                      .formatMessage({
                        id: 'admin.goal.thumbnail.other_rank_text',
                      })
                      .format(goal.rank)}{' '}
                <InfoText lowercase component='span'>
                  {intl
                    .formatMessage({ id: 'admin.goal.thumbnail.max_rank_text' })
                    .format(goal.participants)}
                </InfoText>
              </DefaultText>
            </Grid>
          )}
          {!hasRank && (
            <Grid item>
              <DefaultText lowercase>
                <FontAwesomeIcon icon={faFlagCheckered} />{' '}
                {goal.type == 'C'
                  ? intl
                      .formatMessage({ id: 'admin.goal.thumbnail.player_text' })
                      .format(goal.participants)
                  : intl
                      .formatMessage({ id: 'admin.goal.thumbnail.team_text' })
                      .format(goal.participants)}
              </DefaultText>
            </Grid>
          )}
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
          <Grid item className={classes.info} xs zeroMinWidth>
            <DefaultText lowercase align='right' noWrap style={typeStyle}>
              <FontAwesomeIcon icon={goal.type == 'C' ? faUser : faUsers} />{' '}
              {goal.type == 'C'
                ? intl.formatMessage({
                    id: 'admin.goal.thumbnail.collaborator_tag',
                  })
                : intl.formatMessage({ id: 'admin.goal.thumbnail.team_tag' })}
            </DefaultText>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(Goal));
