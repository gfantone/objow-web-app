import React from 'react';
import { connect } from 'react-redux';
import { CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card, BigText, DefaultText } from '../../../../../../components';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const useStyles = makeStyles((theme) => {
  return {
    card: {
      margin: 0,
      padding: 10,
      height: '100%',
    },
    cardContent: {
      height: '100%',
      paddingBottom: '40px',
    },
    typeItem: {
      cursor: 'pointer',
      width: 300,
      borderRadius: 34,
      transition: 'transform 200ms',
      '&:hover': {
        transform: 'scale(1.02)',
      },
      '& .MuiPaper-root': {
        height: '100%',
        borderRadius: 30,
      },
    },
    disabledItem: {
      '& .MuiCardMedia-root': {
        filter: 'grayscale(1)',
      },
      opacity: '0.6',
    },
    active: {
      background: theme.palette.primary.main,
    },
    icon: {
      height: 120,
      width: 120,
    },
    rewardTypeIcon: {
      height: 20,
      width: 20,
      marginTop: '1px',
    },
  };
});

const AwardType = ({
  types,
  currentType,
  setType,
  participantsNumber,
  participantType,
  typesData,
  ...props
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const coinImage = require(`../../../../../../assets/img/system/challenge/icons/coin.png`);
  const giftImage = require(`../../../../../../assets/img/system/challenge/icons/gift.png`);

  const isDisabled = (type) =>
    typesData[type.code].disabled ||
    (typesData[type.code].minimumParticipants &&
      participantsNumber < typesData[type.code].minimumParticipants);

  const participants_text = intl
    .formatMessage({ id: 'challenge.form.steps.participants' })
    .toLowerCase();
  const participant_text = intl
    .formatMessage({ id: 'challenge.form.steps.participant' })
    .toLowerCase();
  const first_text = intl.formatMessage({ id: 'challenge.form.first' });
  const first_teams = intl.formatMessage({ id: 'challenge.form.first_teams' });
  const first_departments = intl.formatMessage({
    id: 'challenge.form.first_departments',
  });
  const department_text = intl
    .formatMessage({ id: 'common.team_group' })
    .toLowerCase();
  const team_text = intl.formatMessage({ id: 'common.team' }).toLowerCase();
  const departments_text = intl
    .formatMessage({ id: 'common.team_groups' })
    .toLowerCase();
  const teams_text = intl.formatMessage({ id: 'common.teams' }).toLowerCase();

  return (
    <div>
      <Grid container spacing={1} justify='space-around'>
        {_.sortBy(types, (type) => _.get(typesData[type.code], 'order')).map(
          (type) => (
            <Grid
              item
              onClick={() => !isDisabled(type) && setType(type.id)}
              className={`${classes.typeItem} ${
                type.id === currentType ? classes.active : ''
              } ${isDisabled(type) ? classes.disabledItem : ''}`}
              style={{ marginBottom: 20, position: 'relative' }}
            >
              <Card
                marginDisabled
                className={classes.card}
                contentClassName={classes.cardContent}
              >
                <Grid
                  container
                  spacing={1}
                  direction='column'
                  alignItems='center'
                >
                  <Grid item>
                    <CardMedia
                      image={typesData[type.code].icon}
                      className={classes.icon}
                    />
                  </Grid>
                  <Grid item>
                    <BigText>
                      {intl.formatMessage({
                        id: `challenge.modes.${type.code}`,
                      })}
                    </BigText>
                  </Grid>
                  <Grid item style={{ textAlign: 'center' }}>
                    <DefaultText lowercase>
                      {intl
                        .formatMessage({
                          id: `challenge.form.award_type_description_${_.lowerCase(
                            type.code
                          )}`,
                        })
                        .format(
                          _.get(participantType, 'code') === 'CC'
                            ? first_text
                            : _.get(participantType, 'code') === 'TG'
                            ? first_departments
                            : first_teams,
                          _.get(participantType, 'code') === 'CC'
                            ? participant_text
                            : _.get(participantType, 'code') === 'TG'
                            ? department_text
                            : team_text,
                          'X'
                        )}
                    </DefaultText>
                  </Grid>
                  {isDisabled(type) &&
                    typesData[type.code].minimumParticipants && (
                      <Grid item>
                        <DefaultText
                          lowercase
                          style={{ color: '#E50000', textAlign: 'center' }}
                        >
                          {intl
                            .formatMessage({
                              id: 'challenge.form.award_type_minimum_participants',
                            })
                            .format(
                              typesData[type.code].minimumParticipants,
                              _.get(participantType, 'code') === 'CC'
                                ? participants_text
                                : _.get(participantType, 'code') === 'TG'
                                ? departments_text
                                : teams_text
                            )}
                        </DefaultText>
                      </Grid>
                    )}
                  {isDisabled(type) && typesData[type.code].soon && (
                    <Grid item>
                      <DefaultText
                        lowercase
                        style={{ color: '#E50000', textAlign: 'center' }}
                      >
                        {intl.formatMessage({
                          id: 'challenge.form.soon_available',
                        })}
                      </DefaultText>
                    </Grid>
                  )}
                  <Grid
                    item
                    // style={{ width: '100%' }}
                    style={{ position: 'absolute', width: '94%', bottom: 16 }}
                  >
                    <Grid container justify='space-between'>
                      <Grid item>
                        {typesData[type.code].availableReward.indexOf(
                          'points'
                        ) >= 0 && (
                          <Grid container spacing={1} style={{ width: 100 }}>
                            <Grid item>
                              <CardMedia
                                image={coinImage}
                                className={classes.rewardTypeIcon}
                              />
                            </Grid>
                            <Grid item>
                              <DefaultText lowercase>
                                {intl.formatMessage({ id: 'common.points' })}
                              </DefaultText>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item>
                        {typesData[type.code].availableReward.indexOf('gift') >=
                          0 && (
                          <Grid container spacing={1} style={{ width: 100 }}>
                            <Grid item>
                              <CardMedia
                                image={giftImage}
                                className={classes.rewardTypeIcon}
                              />
                            </Grid>
                            <Grid item>
                              <DefaultText lowercase>
                                {intl.formatMessage({ id: 'common.gift' })}
                              </DefaultText>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(AwardType);
