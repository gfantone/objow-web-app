import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, CardMedia, IconButton, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faBalanceScale,
  faCalendarAlt,
  faEquals,
  faInfoCircle,
  faUser,
  faUsers,
  faTimes,
  faClock,
  faPencilAlt as faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { faStar, faEdit } from '@fortawesome/free-regular-svg-icons';
import {
  AccentTag,
  AccentText,
  AnimationController,
  BlueTag,
  BlueText,
  Card,
  DefaultText,
  DefaultTitle,
  InfoText,
  Table,
  TableBody,
  TableCell,
  TableChip,
  TableRow,
  Tooltip,
  RichText,
  Linkify,
  Dialog,
  BigText,
  ProgressBar,
  IconButton as MenuIconButton,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import {
  ChallengeReward,
  ChallengeRewardDetail,
  ChallengeRewardCard,
  ChallengeKpiResultUpdate,
} from '../';
import * as collaboratorDataListActions from '../../../../services/CollaboratorData/CollaboratorDataList/actions';
import { useIntl } from 'react-intl';
import '../../../../helpers/StringHelper';
import _ from 'lodash';

const styles = (theme) => {
  return {
    rewardDialog: {
      width: 900,
      maxWidth: 900,
    },
    kpiResultDialog: {
      overflow: 'visible',
    },
    icon: {
      height: 100,
      width: 100,
    },
    dialogCloseIcon: {
      position: 'absolute',
      color: 'white',
      top: 10,
      right: 10,
      width: 25,
      height: 25,
      fontSize: 20,
      zIndex: 100,
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.main,
        color: 'white',
      },
    },
    link: {
      fontSize: 14,
      cursor: 'pointer',
      color: 'rgb(15,111,222)',
      opacity: 1,
      fontWeight: 'normal',
    },
  };
};

const animationController = <AnimationController />;

const ChallengeCondition = ({ challenge, goals, participants, ...props }) => {
  const intl = useIntl();
  const { account } = props.accountDetail;

  const [rewardDetail, setRewardDetail] = useState();
  const [currentGoal, setCurrentGoal] = useState(null);

  const start = challenge.start.toDate2().toLocaleDateString();
  const end = challenge.end.toDate2().toLocaleDateString();
  const lastUpdate = challenge.last_update
    ? challenge.last_update.toDate()
    : null;
  const lastUpdateTime = lastUpdate
    ? `${lastUpdate.getHours() < 10 ? '0' : ''}${lastUpdate.getHours()}:${
        lastUpdate.getMinutes() < 10 ? '0' : ''
      }${lastUpdate.getMinutes()}`
    : null;

  const typeIcon = challenge.typeCode === 'CT' ? faUsers : faUser;

  const coinImage = require(`../../../../assets/img/system/challenge/icons/coin.png`);
  const giftImage = require(`../../../../assets/img/system/challenge/icons/gift.png`);

  const modeIcons = {
    R: require(`../../../../assets/img/system/challenge/icons/Ribbons.png`),
    M: require(`../../../../assets/img/system/challenge/icons/Rocket.png`),
    P: require(`../../../../assets/img/system/challenge/icons/Levels.png`),
    C: require(`../../../../assets/img/system/challenge/icons/race.png`),
  };

  const teamIds = _.get(account, 'team.id')
    ? [_.get(account, 'team.id')]
    : _.get(account, 'team_group.allTeamIds');

  const includesManagerTeam =
    _.intersection(teamIds, challenge.participantTeamIds).length ===
    challenge.participantTeamIds.length;

  // const canEdit =
  //   (_.get(account, 'hasManagerChallengeEditAccess') && includesManagerTeam) ||
  //   _.get(account, 'role.code') === 'A';

  const canEdit =
    _.get(account, 'hasManagerChallengeEditAccess') ||
    _.get(account, 'role.code') === 'A';

  const rewardTypeIcon =
    challenge.rewardTypeCode === 'G' ? giftImage : coinImage;
  const pointRewardImage = require(`../../../../assets/img/system/challenge/icons/points.png`);

  const renderMaximumAward = () => {
    const award = challenge.awards[0];

    return (
      <Grid container spacing={1}>
        <Grid
          key={award.key}
          item
          xs={12}
          sm={6}
          md={4}
          style={{ borderRadius: 15 }}
        >
          <Grid container spacing={1} direction='column'>
            <Grid item xs={12}>
              <ChallengeRewardCard>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item xs={12}>
                    <Grid container direction='column' spacing={2}>
                      <Grid item>
                        <Grid container justify='space-between'>
                          <Grid item>
                            <DefaultTitle>
                              {challenge.typeCode === 'TG'
                                ? intl.formatMessage({
                                    id: 'challenge.condition.team_group_max_points_label',
                                  })
                                : challenge.typeCode === 'CT'
                                ? intl.formatMessage({
                                    id: 'challenge.condition.team_max_points_label',
                                  })
                                : intl.formatMessage({
                                    id: 'challenge.condition.collaborator_max_points_label',
                                  })}
                            </DefaultTitle>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <CardMedia
                          image={pointRewardImage}
                          style={{ height: 100, width: 100, margin: 'auto' }}
                        />
                      </Grid>
                      <Grid item>
                        <Grid container>
                          <Grid item>
                            <CardMedia
                              image={coinImage}
                              style={{
                                height: 20,
                                width: 20,
                                marginRight: 5,
                                marginTop: -2,
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <DefaultText>
                              {intl
                                .formatMessage({
                                  id: 'challenge.condition.award_points',
                                })
                                .format(award.points.toLocaleString())}
                            </DefaultText>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ChallengeRewardCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderRankingAwards = () => {
    return (
      <Table backgroundDisabled>
        <TableBody>
          <Grid container spacing={1}>
            {challenge.awards.map((award, awardIndex) => {
              const highlightAward =
                // filtered on participant
                (challenge.collaboratorId || challenge.teamId) &&
                // step is reached
                challenge.rank == award.rank;
              return (
                <React.Fragment>
                  {challenge.rewardTypeCode === 'P' && (
                    <Grid
                      key={award.key}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      style={{
                        background: highlightAward ? '#00E58D' : '',
                        borderRadius: 15,
                      }}
                    >
                      <Grid container spacing={1} direction='column'>
                        <Grid item xs={12}>
                          <ChallengeRewardCard>
                            <Grid container spacing={1} alignItems='flex-end'>
                              <Grid item xs={12}>
                                <Grid container direction='column' spacing={2}>
                                  <Grid item>
                                    <Grid container justify='space-between'>
                                      <Grid item>
                                        <DefaultTitle>
                                          {challenge.typeCode === 'TG'
                                            ? intl
                                                .formatMessage({
                                                  id: 'challenge.condition.team_group_rank',
                                                })
                                                .format(award.rank)
                                            : challenge.typeCode === 'CT'
                                            ? intl
                                                .formatMessage({
                                                  id: 'challenge.condition.team_rank',
                                                })
                                                .format(award.rank)
                                            : intl
                                                .formatMessage({
                                                  id: 'challenge.condition.collaborator_rank',
                                                })
                                                .format(award.rank)}
                                        </DefaultTitle>
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item xs={12}>
                                    <CardMedia
                                      image={pointRewardImage}
                                      style={{
                                        height: 100,
                                        width: 100,
                                        margin: 'auto',
                                      }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Grid container>
                                      <Grid item>
                                        <CardMedia
                                          image={coinImage}
                                          style={{
                                            height: 20,
                                            width: 20,
                                            marginRight: 5,
                                            marginTop: -2,
                                          }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <DefaultText>
                                          {intl
                                            .formatMessage({
                                              id: 'challenge.condition.award_points',
                                            })
                                            .format(
                                              award.points.toLocaleString()
                                            )}
                                        </DefaultText>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </ChallengeRewardCard>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  {challenge.rewardTypeCode === 'G' && (
                    <Grid
                      item
                      xs={12}
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        award.reward &&
                        setRewardDetail(Object.assign({}, award.reward))
                      }
                    >
                      <div>
                        <TableRow>
                          <TableCell style={{ width: 270 }}>
                            <Grid container direction='column' spacing={1}>
                              <Grid item>
                                <Grid container spacing={1}>
                                  <Grid item>
                                    <TableChip label={'>'} />
                                  </Grid>
                                  <Grid item>
                                    <DefaultTitle>
                                      {challenge.typeCode === 'TG'
                                        ? intl
                                            .formatMessage({
                                              id: 'challenge.condition.team_group_rank',
                                            })
                                            .format(award.rank)
                                        : challenge.typeCode === 'CT'
                                        ? intl
                                            .formatMessage({
                                              id: 'challenge.condition.team_rank',
                                            })
                                            .format(award.rank)
                                        : intl
                                            .formatMessage({
                                              id: 'challenge.condition.collaborator_rank',
                                            })
                                            .format(award.rank)}
                                    </DefaultTitle>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item style={{ maxWidth: 250 }}>
                                <ChallengeReward reward={award.reward} />
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </div>
                    </Grid>
                  )}
                </React.Fragment>
              );
            })}
          </Grid>
        </TableBody>
      </Table>
    );
  };

  const renderStepAwards = () => {
    const awards = _.sortBy(challenge.awards, ['target']);
    return (
      <Grid container spacing={1}>
        {awards.map((award, awardIndex) => {
          const highlightAward =
            // filtered on participant
            (challenge.collaboratorId || challenge.teamId) &&
            // step is reached
            challenge.goalPoints >= award.target &&
            // next step is not reached
            (awardIndex >= awards.length - 1 ||
              challenge.goalPoints < awards[awardIndex + 1].target);
          return (
            <React.Fragment>
              {challenge.rewardTypeCode === 'P' && (
                <Grid
                  key={award.key}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{
                    background: highlightAward ? '#00E58D' : '',
                    borderRadius: 15,
                  }}
                >
                  <Grid container spacing={1} direction='column'>
                    <Grid item xs={12}>
                      <ChallengeRewardCard>
                        <Grid container spacing={1} alignItems='flex-end'>
                          <Grid item xs={12}>
                            <Grid container direction='column' spacing={2}>
                              <Grid item>
                                <Grid container justify='space-between'>
                                  <Grid item>
                                    <DefaultTitle>
                                      {intl
                                        .formatMessage({
                                          id: 'challenge.award_list.step_point_label',
                                        })
                                        .format(award.rank)}
                                    </DefaultTitle>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item>
                                <DefaultText>
                                  {intl.formatMessage({
                                    id: 'challenge.award_list.target_label',
                                  })}{' '}
                                  : {award.target.toLocaleString()}
                                </DefaultText>
                              </Grid>
                              <Grid item xs={12}>
                                <CardMedia
                                  image={pointRewardImage}
                                  style={{
                                    height: 100,
                                    width: 100,
                                    margin: 'auto',
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item>
                                    <CardMedia
                                      image={coinImage}
                                      style={{
                                        height: 20,
                                        width: 20,
                                        marginRight: 5,
                                        marginTop: -2,
                                      }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <DefaultText>
                                      {intl
                                        .formatMessage({
                                          id: 'challenge.condition.award_points',
                                        })
                                        .format(award.points.toLocaleString())}
                                    </DefaultText>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ChallengeRewardCard>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {challenge.rewardTypeCode === 'G' && (
                <Grid
                  item
                  xs={12}
                  style={{
                    cursor: 'pointer',
                    background: highlightAward ? '#00E58D' : '',
                    borderRadius: 15,
                  }}
                  onClick={() =>
                    award.reward &&
                    setRewardDetail(Object.assign({}, award.reward))
                  }
                >
                  <div>
                    <TableRow>
                      <TableCell style={{ width: 270 }}>
                        <Grid container direction='column' spacing={1}>
                          <Grid item>
                            <Grid container spacing={1}>
                              <Grid item>
                                <TableChip label={'>'} />
                              </Grid>
                              <Grid item>
                                <DefaultText>
                                  {intl
                                    .formatMessage({
                                      id: 'challenge.award_list.step_point_label',
                                    })
                                    .format(award.rank)}
                                </DefaultText>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <DefaultText>
                              {intl.formatMessage({
                                id: 'challenge.award_list.target_label',
                              })}{' '}
                              : {award.target.toLocaleString()}
                            </DefaultText>
                          </Grid>
                          <Grid item style={{ maxWidth: 250 }}>
                            <ChallengeReward reward={award.reward} />
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </div>
                </Grid>
              )}
            </React.Fragment>
          );
        })}
      </Grid>
    );
  };

  const renderAwards = () => {
    return (
      <Grid container spacing={2}>
        {challenge.awards.map((award) => {
          return (
            <Grid
              key={award.key}
              item
              xs={12}
              sm={6}
              md={4}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                award.reward && setRewardDetail(Object.assign({}, award.reward))
              }
            >
              <Grid container spacing={1} direction='column'>
                <Grid item xs={12}>
                  <ChallengeRewardCard>
                    <Grid container spacing={1} alignItems='flex-end'>
                      {challenge.rewardTypeCode === 'G' && (
                        <Grid item xs={12}>
                          <Grid container direction='column' spacing={2}>
                            <Grid item>
                              <Grid container justify='space-between'>
                                <Grid item>
                                  {challenge.awardCode === 'P' ? (
                                    <DefaultText>
                                      {intl
                                        .formatMessage({
                                          id: 'challenge.award_list.step_point_label',
                                        })
                                        .format(award.rank)}
                                    </DefaultText>
                                  ) : (
                                    <DefaultTitle>
                                      {challenge.typeCode === 'TG'
                                        ? intl
                                            .formatMessage({
                                              id: 'challenge.condition.team_group_rank',
                                            })
                                            .format(award.rank)
                                        : challenge.typeCode === 'CT'
                                        ? intl
                                            .formatMessage({
                                              id: 'challenge.condition.team_rank',
                                            })
                                            .format(award.rank)
                                        : intl
                                            .formatMessage({
                                              id: 'challenge.condition.collaborator_rank',
                                            })
                                            .format(award.rank)}
                                    </DefaultTitle>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>

                            {challenge.awardCode === 'P' && (
                              <Grid item>
                                <DefaultText>
                                  {intl.formatMessage({
                                    id: 'challenge.award_list.target_label',
                                  })}{' '}
                                  : {award.target.toLocaleString()}
                                </DefaultText>
                              </Grid>
                            )}
                            <Grid item xs={12}>
                              {award.reward && (
                                <ChallengeReward reward={award.reward} />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                      {challenge.rewardTypeCode === 'P' && (
                        <React.Fragment>
                          <Grid item xs>
                            <DefaultTitle>
                              {challenge.typeCode === 'TG'
                                ? intl
                                    .formatMessage({
                                      id: 'challenge.condition.team_group_rank',
                                    })
                                    .format(award.rank)
                                : challenge.typeCode === 'CT'
                                ? intl
                                    .formatMessage({
                                      id: 'challenge.condition.team_rank',
                                    })
                                    .format(award.rank)
                                : intl
                                    .formatMessage({
                                      id: 'challenge.condition.collaborator_rank',
                                    })
                                    .format(award.rank)}
                            </DefaultTitle>
                          </Grid>
                        </React.Fragment>
                      )}
                    </Grid>
                  </ChallengeRewardCard>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const closeKpiModal = () => {
    props.collaboratorDataListActions.getCollaboratorDataListClear();
    setCurrentGoal(null);
  };

  const openKpiModal = (goal) => {
    props.collaboratorDataListActions.getCollaboratorDataListClear();
    setCurrentGoal(goal);
  };

  const closeCollaboratorKpiModal = () => {
    props.collaboratorDataListActions.getCollaboratorDataListClear();
    setCurrentGoal(null);
  };

  const openCollaboratorKpiModal = (goal) => {
    props.collaboratorDataListActions.getCollaboratorDataListClear();
    setCurrentGoal(goal);
  };

  const goalTooltip =
    challenge.awardCode === 'C'
      ? intl.formatMessage({
          id: 'challenge.condition.race_condition_goal_info',
        })
      : intl.formatMessage({ id: 'challenge.condition.goal_info' });
  // const AwardWrapperComponent = challenge.awardCode === 'P' || challenge.awardCode === 'R' ? React.Fragment : Card
  const AwardWrapperComponent = React.Fragment;

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
  const the_first_department = intl.formatMessage({
    id: 'challenge.form.the_first_department',
  });
  const the_first_team = intl.formatMessage({
    id: 'challenge.form.the_first_team',
  });
  const the_first = intl.formatMessage({ id: 'challenge.form.the_first' });

  const beginningOfLastMonth = new Date();
  beginningOfLastMonth.setMonth(beginningOfLastMonth.getMonth() - 1);
  beginningOfLastMonth.setDate(1);
  return (
    <div>
      <Grid container spacing={4} style={{ position: 'relative' }}>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={12}>
            <DefaultTitle isContrast>
              {intl.formatMessage({ id: 'challenge.condition.condition_area' })}
            </DefaultTitle>
          </Grid>
          {lastUpdate && (
            <Grid item xs={12} style={{ paddingTop: 0 }}>
              <DefaultText
                isContrast
                lowercase
                style={{ fontSize: 12, opacity: 0.8 }}
              >
                {intl
                  .formatMessage({ id: 'challenge.condition.last_update' })
                  .format(lastUpdate.toLocaleDateString(), lastUpdateTime)}
                <span style={{ fontWeight: 'bold' }}>
                  {intl
                    .formatMessage({
                      id: 'challenge.condition.last_update_time',
                    })
                    .format(lastUpdate.toLocaleDateString(), lastUpdateTime)}
                </span>
              </DefaultText>
            </Grid>
          )}
          <Grid item xs={12}>
            <Card marginDisabled>
              <Grid container spacing={2} alignItems={'flex-end'}>
                <Grid item xs={12} sm>
                  <Table backgroundDisabled>
                    <TableBody>
                      {goals.map((goal) => {
                        const progression = Math.round(
                          (goal.counter / goal.target) * 100
                        );
                        return (
                          <TableRow>
                            <TableCell>
                              <Grid container spacing={2}>
                                <Grid item>
                                  <TableChip label={goal.number} />
                                </Grid>
                                <Grid item xs>
                                  <div>
                                    <Grid container spacing={1}>
                                      <Grid item xs={12}>
                                        <div>
                                          <Grid container spacing={1}>
                                            <Grid item xs zeroMinWidth>
                                              <DefaultText
                                                lowercase
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 'bold',
                                                }}
                                              >
                                                <Grid
                                                  container
                                                  spacing={1}
                                                  alignItems='center'
                                                >
                                                  <Grid item>
                                                    {goal.name}&nbsp;
                                                    <Tooltip
                                                      title={goalTooltip}
                                                      placement={'right'}
                                                    >
                                                      <BlueText
                                                        style={{
                                                          width: 'fit-content',
                                                        }}
                                                        component={'span'}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faInfoCircle}
                                                        />
                                                      </BlueText>
                                                    </Tooltip>
                                                  </Grid>

                                                  {((goal.kpiCustom.toBoolean() &&
                                                    canEdit) ||
                                                    (goal.kpiCustom.toBoolean() &&
                                                      !canEdit &&
                                                      goal.kpiCollaboratorEditable.toBoolean() &&
                                                      challenge.end
                                                        .toDate2()
                                                        .getTime() >
                                                        beginningOfLastMonth.getTime())) && (
                                                    <Grid
                                                      item
                                                      onClick={() =>
                                                        openKpiModal(goal)
                                                      }
                                                      className={
                                                        props.classes.link
                                                      }
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faPencil}
                                                        style={{
                                                          marginRight: 5,
                                                        }}
                                                      />
                                                      {intl.formatMessage({
                                                        id: 'challenge.kpi_results.edit_results',
                                                      })}
                                                    </Grid>
                                                  )}
                                                </Grid>
                                              </DefaultText>
                                            </Grid>
                                            <Grid item>
                                              <DefaultText>
                                                <FontAwesomeIcon
                                                  icon={faBalanceScale}
                                                />{' '}
                                                ({goal.unit})
                                              </DefaultText>
                                            </Grid>
                                          </Grid>
                                        </div>
                                      </Grid>
                                      <Grid>
                                        <InfoText
                                          lowercase
                                          style={{
                                            marginTop: -5,
                                            marginLeft: 4,
                                          }}
                                        >
                                          {goal.description}
                                        </InfoText>
                                      </Grid>
                                      {challenge.awardCode === 'C' && (
                                        <Grid
                                          item
                                          xs={12}
                                          style={{
                                            marginTop: 10,
                                            marginBottom: 15,
                                            maxWidth: 400,
                                          }}
                                        >
                                          <Grid container>
                                            <Grid item>
                                              <DefaultText
                                                lowercase
                                                style={{ fontSize: 13 }}
                                              >
                                                {intl
                                                  .formatMessage({
                                                    id: 'admin.goal.thumbnail.counter_text',
                                                  })
                                                  .format(
                                                    goal.counter.toLocaleString()
                                                  )}{' '}
                                                <InfoText
                                                  lowercase
                                                  style={{ fontSize: 13 }}
                                                  component='span'
                                                >
                                                  {intl
                                                    .formatMessage({
                                                      id: 'admin.goal.thumbnail.target_text',
                                                    })
                                                    .format(
                                                      goal.target.toLocaleString()
                                                    )}
                                                </InfoText>
                                              </DefaultText>
                                            </Grid>
                                            <Grid item xs>
                                              <AccentText align='right'>
                                                {'{0}%'.format(progression)}
                                              </AccentText>
                                            </Grid>
                                          </Grid>
                                          <Grid container>
                                            <Grid item xs>
                                              <ProgressBar
                                                value={progression}
                                              />
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      )}
                                      {challenge.awardCode !== 'C' && (
                                        <Grid item xs={12}>
                                          <div>
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <td style={{ padding: 0 }}>
                                                    <DefaultText
                                                      lowercase
                                                      style={{
                                                        textAlign: 'right',
                                                        paddingRight: 5,
                                                        fontSize: 13,
                                                      }}
                                                    >
                                                      {intl.formatMessage({
                                                        id: 'challenge.condition.label',
                                                      })}{' '}
                                                      :
                                                    </DefaultText>
                                                  </td>
                                                  <td>
                                                    <Grid
                                                      container
                                                      spacing={1}
                                                      style={{ marginTop: -2 }}
                                                    >
                                                      <Grid item>
                                                        <DefaultText lowercase>
                                                          {'individualTarget' in
                                                          goal
                                                            ? goal.individualTarget.toLocaleString()
                                                            : goal.target.toLocaleString()}
                                                        </DefaultText>
                                                      </Grid>

                                                      <React.Fragment>
                                                        <Grid item>
                                                          <DefaultText
                                                            lowercase
                                                          >
                                                            <FontAwesomeIcon
                                                              icon={faEquals}
                                                            />
                                                          </DefaultText>
                                                        </Grid>
                                                        <Grid item>
                                                          <BlueTag>
                                                            {intl
                                                              .formatMessage({
                                                                id: 'challenge.condition.point_target',
                                                              })
                                                              .format(
                                                                goal.targetPoints.toLocaleString()
                                                              )}
                                                          </BlueTag>
                                                        </Grid>
                                                      </React.Fragment>
                                                    </Grid>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td style={{ padding: 0 }}>
                                                    <DefaultText
                                                      lowercase
                                                      style={{
                                                        textAlign: 'right',
                                                        paddingRight: 5,
                                                        fontSize: 13,
                                                      }}
                                                    >
                                                      👉{' '}
                                                      {intl.formatMessage({
                                                        id: 'challenge.condition.label_completed',
                                                      })}{' '}
                                                      :
                                                    </DefaultText>
                                                  </td>
                                                  <td>
                                                    <Grid
                                                      container
                                                      spacing={1}
                                                      style={{ marginTop: '0' }}
                                                    >
                                                      <Grid
                                                        item
                                                        style={{
                                                          marginTop: -1,
                                                        }}
                                                      >
                                                        <AccentText>
                                                          {goal.counter.toLocaleString()}
                                                        </AccentText>
                                                      </Grid>

                                                      <React.Fragment>
                                                        <Grid
                                                          item
                                                          style={{
                                                            marginTop: 0,
                                                          }}
                                                        >
                                                          <AccentText>
                                                            <FontAwesomeIcon
                                                              icon={
                                                                faAngleRight
                                                              }
                                                            />
                                                          </AccentText>
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          style={{
                                                            marginTop: -2,
                                                          }}
                                                        >
                                                          <AccentTag>
                                                            {intl
                                                              .formatMessage({
                                                                id: 'challenge.condition.point_counter',
                                                              })
                                                              .format(
                                                                goal.points.toLocaleString()
                                                              )}
                                                          </AccentTag>
                                                        </Grid>
                                                      </React.Fragment>
                                                    </Grid>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </Grid>
                                      )}
                                    </Grid>
                                  </div>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={12} sm={'auto'}>
                  <div>
                    <Grid container justify={'center'}>
                      <Grid item>{animationController}</Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={12}>
            <DefaultTitle isContrast>
              {intl.formatMessage({
                id: 'challenge.condition.description_area',
              })}
            </DefaultTitle>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <DefaultTitle lowercase>
                            {challenge.name}
                          </DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                          <DefaultText>
                            {intl
                              .formatMessage({
                                id: 'challenge.condition.period',
                              })
                              .format(start, end)}
                          </DefaultText>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <RichText
                        initial={JSON.parse(challenge.description)}
                        readOnly={true}
                        onChange={() => {}}
                        email={account.email}
                        iframeHeight={account.isJtiEnv ? 300 : null}
                        isJti={account.isJtiEnv}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Grid
                    container
                    spacing={1}
                    direction='column'
                    alignItems='center'
                  >
                    <Grid item>
                      <CardMedia
                        image={modeIcons[challenge.awardCode]}
                        className={props.classes.icon}
                      />
                    </Grid>
                    <Grid item>
                      <BigText>
                        {intl.formatMessage({
                          id: `challenge.modes_full.${challenge.awardCode}`,
                        })}
                        {challenge.awardCode === 'P' && (
                          <span
                            style={{
                              marginLeft: 5,
                              lineHeight: 1,
                              verticalAlign: 'middle',
                            }}
                          >
                            <Tooltip
                              title={intl.formatMessage({
                                id: 'challenge.form.step_mode_information',
                              })}
                              placement={'right'}
                            >
                              <BlueText
                                style={{ width: 'fit-content' }}
                                component={'span'}
                              >
                                <FontAwesomeIcon icon={faInfoCircle} />
                              </BlueText>
                            </Tooltip>
                          </span>
                        )}
                      </BigText>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: -10 }}>
                      <DefaultText lowercase>
                        <FontAwesomeIcon icon={typeIcon} />{' '}
                        {intl.formatMessage({
                          id: `challenge.types.${challenge.typeCode}`,
                        })}
                      </DefaultText>
                    </Grid>
                    <Grid item style={{ textAlign: 'center' }}>
                      <DefaultText lowercase style={{ fontSize: 14 }}>
                        {_.get(challenge, 'awards.length', 0) > 1
                          ? intl
                              .formatMessage({
                                id: `challenge.form.award_type_description_${_.lowerCase(
                                  challenge.awardCode
                                )}`,
                              })
                              .format(
                                challenge.typeCode === 'CC'
                                  ? first_text
                                  : challenge.typeCode === 'TG'
                                  ? first_departments
                                  : first_teams,
                                challenge.typeCode === 'CC'
                                  ? participant_text
                                  : challenge.typeCode === 'TG'
                                  ? department_text
                                  : team_text,
                                _.get(challenge, 'awards.length')
                              )
                          : intl
                              .formatMessage({
                                id: `challenge.form.award_type_description_single_${_.lowerCase(
                                  challenge.awardCode
                                )}`,
                              })
                              .format(
                                challenge.typeCode === 'CC'
                                  ? the_first
                                  : challenge.typeCode === 'TG'
                                  ? the_first_department
                                  : the_first_team,
                                challenge.typeCode === 'CC'
                                  ? participant_text
                                  : challenge.typeCode === 'TG'
                                  ? department_text
                                  : team_text
                              )}
                      </DefaultText>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={12}>
            <DefaultTitle isContrast>
              {intl.formatMessage({ id: 'challenge.condition.award_area' })}
            </DefaultTitle>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} style={{ marginBottom: 5 }}>
              <Grid item>
                <CardMedia
                  image={rewardTypeIcon}
                  style={{ height: 25, width: 25 }}
                />
              </Grid>
              <Grid item>
                <DefaultTitle isContrast style={{ marginTop: 3 }}>
                  {intl.formatMessage({
                    id: `challenge.reward_types.${challenge.rewardTypeCode}`,
                  })}
                </DefaultTitle>
              </Grid>
            </Grid>
            {challenge.rewardTypeCode === 'G' ? (
              renderAwards()
            ) : (
              <AwardWrapperComponent>
                {challenge.awardCode == 'M' && renderMaximumAward()}
                {challenge.awardCode == 'R' && renderRankingAwards()}
                {challenge.awardCode == 'C' && renderRankingAwards()}
                {challenge.awardCode == 'P' && renderStepAwards()}
              </AwardWrapperComponent>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={rewardDetail}
        classes={{ paper: props.classes.rewardDialog }}
        onClose={() => setRewardDetail(null)}
      >
        <Grid container spacing={1} direction='column'>
          <Grid item>
            <ChallengeRewardDetail reward={rewardDetail} />
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        open={currentGoal !== null}
        classes={{ root: props.classes.kpiResultDialog }}
        onClose={closeKpiModal}
        maxWidth={false}
      >
        <Hidden smDown>
          <IconButton
            size='small'
            onClick={closeKpiModal}
            className={props.classes.dialogCloseIcon}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            size='small'
            onClick={closeKpiModal}
            className={props.classes.dialogCloseIcon}
            style={{ top: 5, right: 5 }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Hidden>
        <Grid
          container
          spacing={1}
          direction='column'
          style={{ marginTop: '0', width: '100%' }}
        >
          <Grid item style={{ width: '100%' }}>
            {(canEdit ||
              (_.get(currentGoal, 'kpiCollaboratorEditable') &&
                challenge.end.toDate2().getTime() >
                  beginningOfLastMonth.getTime())) && (
              <ChallengeKpiResultUpdate
                challenge={challenge}
                goal={currentGoal}
                setGoal={setCurrentGoal}
                collaboratorEdit={_.get(account, 'role.code') === 'C'}
              />
            )}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorDataListActions: bindActionCreators(
    collaboratorDataListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChallengeCondition));
