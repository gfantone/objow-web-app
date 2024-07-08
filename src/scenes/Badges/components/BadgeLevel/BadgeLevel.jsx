import React from 'react';
import { connect } from 'react-redux';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CollaboratorList, LevelCondition, Points } from './components';
import {
  AccentText,
  DefaultText,
  DefaultTitle,
  InfoText,
  ProgressBar,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import '../../../../helpers/NumberHelper';
import '../../../../helpers/StringHelper';
import _ from 'lodash';

const styles = {
  icon: {
    height: 45,
    width: 45,
    overflow: 'hidden',
    borderRadius: 25,
  },
  bigIcon: {
    height: 67,
    width: 67,
    overflow: 'hidden',
    borderRadius: 40,
  },
  categoryIcon: {
    height: 30,
    width: 30,
    border: '2px solid white',
  },
  wrapper: {
    filter: 'grayscale(1)',
    opacity: 0.3,
  },
};

const BadgeLevel = ({ level, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const { collaborator } = props.collaboratorDetail;

  const iconData = level.code
    ? require(`../../../../assets/img/system/badge/icons/${level.code}.svg`)
    : _.get(level, 'icon.path');

  const counter = level.counter <= level.target ? level.counter : level.target;
  const progression = (counter / level.target).toFullPercentage();
  const hasLevel = collaborator
    ? level.level <= collaborator.level.number
    : false;

  return (
    <div style={{ position: 'relative' }}>
      {!hasLevel && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -95,
            marginTop: -15,
          }}
        >
          <LevelCondition level={level} />
        </div>
      )}
      <div className={!hasLevel ? classes.wrapper : ''}>
        <Grid container spacing={2}>
          <Grid item container xs={12} spacing={2}>
            <Grid item>
              <CardMedia image={iconData} className={classes.icon} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <DefaultTitle
                lowercase
                noWrap
                style={{ fontWeight: 'bold', fontSize: 16 }}
              >
                {level.publicTitle}
              </DefaultTitle>
              <InfoText lowercase>
                {intl
                  .formatMessage({ id: 'badge.level.rank_text' })
                  .format(level.rank)}
              </InfoText>
            </Grid>
            <Grid item>
              <Points level={level} />
            </Grid>
          </Grid>
          <Grid item>
            <DefaultText lowercase>{level.privateTitle}</DefaultText>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item container xs={12}>
              <Grid item xs>
                <DefaultText lowercase>
                  {intl
                    .formatMessage({ id: 'badge.level.counter_text' })
                    .format(counter)}{' '}
                  <InfoText lowercase component="span">
                    /{' '}
                    {intl
                      .formatMessage({ id: 'badge.level.target_text' })
                      .format(level.target)}
                  </InfoText>
                </DefaultText>
              </Grid>
              <Grid item>
                <AccentText style={{ fontWeight: 'bold', fontSize: 14 }}>
                  {progression} %
                </AccentText>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ProgressBar value={progression} gradient animate />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item style={{ minHeight: 30 }}>
                <CollaboratorList collaborators={level.collaborators} />
              </Grid>

              <Grid item style={{ minHeight: 30 }}>
                {level.category && (
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <CardMedia
                        image={_.get(level, 'category.icon.path')}
                        className={classes.categoryIcon}
                      />
                    </Grid>
                    <Grid item>
                      <DefaultText lowercase style={{ fontSize: 16 }}>
                        {_.get(level, 'category.name')}
                      </DefaultText>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = ({ collaboratorDetail }) => ({
  collaboratorDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(BadgeLevel));
