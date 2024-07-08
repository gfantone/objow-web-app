import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  CardMedia,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  BlueText,
  Card,
  DefaultText,
  DefaultTitle,
  HiddenInput,
  Select,
  Switch,
  TextField,
  Tooltip,
  IconButton as MenuIconButton,
  GreenRadio,
} from '../../../../../../components';
import { ChallengeReward, ChallengeRewardCard } from '../../../';
import { useIntl } from 'react-intl';
import * as Resources from '../../../../../../Resources';
import * as challengeTypeUsablePointsActions from '../../../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions';
import { uuidv4 } from '../../../../../../helpers/UUIDHelper';
import './helpers/FormsyHelper';
import _ from 'lodash';

const styles = {
  pointsField: {
    '& .MuiFormLabel-root': {
      marginLeft: 25,
    },
  },
};

const Awards = ({
  challengeId,
  challengeTypeCode,
  challengeTypeId,
  end,
  hasChallengeManager,
  initialAwards = [],
  initialLive = false,
  initialType,
  initialRewardType,
  isCreation,
  isDuplication,
  isUpdate,
  start,
  team,
  types,
  rewardTypes,
  setConfigRewardOpen,
  rewardImages,
  rewardCategories,
  classes,
  ...props
}) => {
  const intl = useIntl();
  const getInitialAwards = () => {
    if (initialAwards && initialAwards.length > 0) {
      const awardType = types.find((t) => t.id === parseInt(initialType));
      return initialAwards
        .filter((award, index) => (awardType.code === 'M' ? index === 0 : true))
        .map((x) => ({
          key: uuidv4(),
          points: x.points,
          reward: x.reward,
          target: x.target,
        }));
    } else {
      return [{ key: uuidv4(), points: null, reward: null, target: null }];
    }
  };

  const { points, loading } = props.challengeTypeUsablePoints;
  const maxAwardType = types.find((t) => t.code === 'M').id;
  const stepAwardType = types.find((t) => t.code === 'P').id;
  const finalInitialType = initialType ? initialType : maxAwardType;
  const finalInitialRewardType = initialRewardType
    ? initialRewardType
    : rewardTypes[0].id;
  const [awards, setAwards] = React.useState(getInitialAwards);
  const [type, setType] = React.useState(finalInitialType);
  // const [type, setType] = React.useState(1)
  const [rewardType, setRewardType] = React.useState(finalInitialRewardType);
  const isMaxAward = parseInt(type) === maxAwardType;
  const isStepAward = parseInt(type) === stepAwardType;

  const currentType = types.find((t) => parseInt(type) === t.id);
  const currentRewardType = rewardTypes.find(
    (t) => parseInt(rewardType) === t.id
  );
  const usablePoints = points
    ? !isMaxAward
      ? points.all
      : points.participant
    : 0;
  // console.log(_.slice(awards, 1));
  const icons = {
    R: require(`../../../../../../assets/img/system/challenge/icons/Ribbons.png`),
    M: require(`../../../../../../assets/img/system/challenge/icons/Rocket.png`),
    P: require(`../../../../../../assets/img/system/challenge/icons/Levels.png`),
  };

  const coinImage = require(`../../../../../../assets/img/system/challenge/icons/coin.png`);
  const giftImage = require(`../../../../../../assets/img/system/challenge/icons/gift.png`);
  const pointRewardImage = require(`../../../../../../assets/img/system/challenge/icons/points.png`);

  useEffect(() => {
    if ((isCreation || isDuplication) && challengeTypeId && end && start) {
      const teamFilter =
        hasChallengeManager && challengeTypeCode === 'CM' ? team : null;
      props.challengeTypeUsablePointsActions.getChallengeTypeUsablePoints(
        challengeTypeId,
        start,
        end,
        teamFilter
      );
    } else if (isUpdate) {
      if (!start || !end) {
        props.challengeTypeUsablePointsActions.getChallengeTypeUsablePointsByChallenge(
          challengeId
        );
      } else {
        props.challengeTypeUsablePointsActions.getChallengeTypeUsablePointsByChallenge(
          challengeId,
          start,
          end
        );
      }
    }
  }, [challengeTypeCode, challengeTypeId, end, start]);

  useEffect(() => {
    setConfigRewardOpen(false, awards);
  }, [awards]);

  function handleAddAwardClick() {
    setAwards((awards) => [...awards, { key: uuidv4(), points: null }]);
  }

  function handleRemoveAwardClick(key) {
    setAwards((x) => x.filter((y) => y.key != key));
  }

  function handleTypeChange(newType) {
    setType(Number(newType));
  }
  function handleRewardTypeChange(event) {
    setRewardType(Number(event.target.value));
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <DefaultTitle isContrast>
                {intl.formatMessage({ id: 'reward.title' })}
              </DefaultTitle>
            </Grid>
            {!isMaxAward && (
              <Grid item>
                <DefaultTitle>
                  <MenuIconButton
                    size={'small'}
                    onClick={handleAddAwardClick}
                    style={{
                      marginTop: '-4px',
                      color: '#00E58D',
                      fontSize: '18px',
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </MenuIconButton>
                </DefaultTitle>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4} direction='column'>
            <Grid item xs={12}>
              <RadioGroup
                row
                name='rewardType'
                onChange={handleRewardTypeChange}
                value={rewardType}
              >
                {rewardTypes.map((rewardType) => (
                  <FormControlLabel
                    value={rewardType.id}
                    control={<GreenRadio />}
                    label={
                      <Grid container spacing={1}>
                        <Grid item>
                          <CardMedia
                            image={
                              rewardType.code === 'G' ? giftImage : coinImage
                            }
                            style={{ height: 20, width: 20 }}
                          />
                        </Grid>
                        <Grid item>
                          <DefaultText isContrast lowercase>
                            {intl.formatMessage({
                              id: `challenge.reward_types.${rewardType.code}`,
                            })}
                          </DefaultText>
                        </Grid>
                      </Grid>
                    }
                  />
                ))}
              </RadioGroup>

              <HiddenInput name='rewardType' value={rewardType} />
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {awards.map((award, index) => {
                  const number = index + 1;
                  const labels = {
                    M:
<<<<<<< HEAD
                      challengeTypeCode === 'CT'
=======
                      challengeTypeCode === 'CT' || challengeTypeCode === 'TP'
>>>>>>> dev
                        ? intl.formatMessage({
                            id: 'challenge.award_list.team_max_point_label',
                          })
                        : intl.formatMessage({
                            id: 'challenge.award_list.collaborator_max_point_label',
                          }),
                    R:
<<<<<<< HEAD
                      challengeTypeCode === 'CT'
=======
                      challengeTypeCode === 'CT' || challengeTypeCode === 'TP'
>>>>>>> dev
                        ? intl
                            .formatMessage({
                              id: 'challenge.award_list.team_point_label',
                            })
                            .format(number)
                        : intl
                            .formatMessage({
                              id: 'challenge.award_list.collaborator_point_label',
                            })
                            .format(number),
                    C:
<<<<<<< HEAD
                      challengeTypeCode === 'CT'
=======
                      challengeTypeCode === 'CT' || challengeTypeCode === 'TP'
>>>>>>> dev
                        ? intl
                            .formatMessage({
                              id: 'challenge.award_list.team_point_label',
                            })
                            .format(number)
                        : intl
                            .formatMessage({
                              id: 'challenge.award_list.collaborator_point_label',
                            })
                            .format(number),
                    P: intl
                      .formatMessage({
                        id: 'challenge.award_list.step_point_label',
                      })
                      .format(number),
                  };
                  const label = labels[currentType.code];
                  const validations =
                    isMaxAward || currentType.code === 'P'
                      ? { isRankingDecreasing: true, isInt: true }
                      : { isRankingIncreasing: true, isInt: true };

                  const validationErrors =
                    isMaxAward || currentType.code === 'P'
                      ? {
                          isInt: intl.formatMessage({
                            id: 'common.form.is_int_error',
                          }),
                          isDefaultRequiredValue: intl.formatMessage({
                            id: 'common.form.required_error',
                          }),
                          isRankingDecreasing:
                            'Les récompenses doivent être croissantes',
                        }
                      : {
                          isInt: intl.formatMessage({
                            id: 'common.form.is_int_error',
                          }),
                          isDefaultRequiredValue: intl.formatMessage({
                            id: 'common.form.required_error',
                          }),
                          isRankingIncreasing:
                            'Les récompenses doivent être décroissantes',
                        };
                  const reward = award.reward
                    ? Object.assign({}, award.reward, {
                        image:
                          _.get(award, 'reward.image.path') ||
                          (award.reward.image && rewardImages
                            ? rewardImages.find(
                                (i) => i.id === parseInt(award.reward.image)
                              ).path
                            : null),
                        category: _.get(award, 'reward.category.id')
                          ? _.get(award, 'reward.category')
                          : rewardCategories &&
                            award.reward.category &&
                            rewardCategories.find(
                              (c) => c.id === parseInt(award.reward.category)
                            ),
                      })
                    : null;
                  return (
                    <Grid key={award.key} item xs={12} sm={6} md={4}>
                      <Grid container spacing={1} direction='column'>
                        <Grid item xs={12}>
                          <ChallengeRewardCard>
                            <Grid container spacing={1} alignItems='flex-end'>
                              <Grid item xs={12}>
                                <Grid container direction='column' spacing={2}>
                                  <Grid item>
                                    <Grid container justify='space-between'>
                                      <Grid item>
                                        <DefaultTitle>{label}</DefaultTitle>
                                      </Grid>

                                      {awards.length > 1 && (
                                        <Grid item>
                                          <IconButton
                                            size='small'
                                            onClick={() =>
                                              handleRemoveAwardClick(award.key)
                                            }
                                          >
                                            <FontAwesomeIcon
                                              icon={faTrashAlt}
                                            />
                                          </IconButton>
                                        </Grid>
                                      )}
                                    </Grid>
                                  </Grid>
                                  {currentRewardType.code === 'G' && (
                                    <React.Fragment>
                                      {currentType.code === 'P' && (
                                        <Grid item xs={8}>
                                          <TextField
                                            lowercase
                                            name={`awardTarget[${index}]`}
                                            label={intl.formatMessage({
                                              id: 'challenge.award_list.target_label',
                                            })}
                                            fullWidth
                                            required
                                            initial={award.target}
                                            validations={{
                                              isStepsIncreasing: true,
                                              isInt: true,
                                            }}
                                            validationErrors={{
                                              isDefaultRequiredValue:
                                                intl.formatMessage({
                                                  id: 'common.form.required_error',
                                                }),
                                              isInt: intl.formatMessage({
                                                id: 'common.form.is_int_error',
                                              }),
                                              isStepsIncreasing:
                                                'Les scores à atteindre doivent être croissants',
                                            }}
                                          />
                                        </Grid>
                                      )}
                                      <Grid
                                        item
                                        xs={12}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                          setConfigRewardOpen(
                                            true,
                                            awards,
                                            award,
                                            index,
                                            setAwards
                                          )
                                        }
                                      >
                                        {award.reward && (
                                          <ChallengeReward reward={reward} />
                                        )}
                                        {!award.reward && (
                                          <Card>
                                            <DefaultText
                                              style={{
                                                textAlign: 'center',
                                                color: '#00E58D',
                                              }}
                                              lowercase
                                            >
                                              {intl.formatMessage({
                                                id: 'challenge.form.add_reward',
                                              })}
                                            </DefaultText>
                                          </Card>
                                        )}
                                      </Grid>
                                    </React.Fragment>
                                  )}
                                  {currentRewardType.code === 'P' && (
                                    <React.Fragment>
                                      {currentType.code === 'P' && (
                                        <Grid item xs={8}>
                                          <TextField
                                            lowercase
                                            name={`awardTarget[${index}]`}
                                            label={intl.formatMessage({
                                              id: 'challenge.award_list.target_label',
                                            })}
                                            fullWidth
                                            required
                                            initial={award.target}
                                            validations={{
                                              isStepsIncreasing: true,
                                              isInt: true,
                                            }}
                                            validationErrors={{
                                              isDefaultRequiredValue:
                                                intl.formatMessage({
                                                  id: 'common.form.required_error',
                                                }),
                                              isInt: intl.formatMessage({
                                                id: 'common.form.is_int_error',
                                              }),
                                              isStepsIncreasing:
                                                'Les scores à atteindre doivent être croissants',
                                            }}
                                          />
                                        </Grid>
                                      )}
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
                                      <Grid
                                        item
                                        xs={12}
                                        className={classes.pointsField}
                                        style={{ position: 'relative' }}
                                      >
                                        <CardMedia
                                          image={coinImage}
                                          style={{
                                            height: 20,
                                            width: 20,
                                            position: 'absolute',
                                            left: 5,
                                            top: 3,
                                          }}
                                        />

                                        <TextField
                                          lowercase
                                          name={`award[${index}]`}
                                          label='Points'
                                          fullWidth
                                          required
                                          initial={award.points}
                                          validations={validations}
                                          validationErrors={validationErrors}
                                        />
                                      </Grid>
                                    </React.Fragment>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </ChallengeRewardCard>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
                {(isMaxAward || isStepAward) &&
                  currentRewardType.code !== 'G' && (
                    <Grid item xs>
                      <Grid container alignItems='center'>
                        <Grid item>
                          <Switch
                            name='live'
                            label={intl.formatMessage({
                              id: 'challenge.award_list.list_live_label',
                            })}
                            initial={initialLive}
                          />
                        </Grid>
                        <Grid item>
                          <Tooltip
                            title={intl.formatMessage({
                              id: 'challenge.award_list.list_live_infos',
                            })}
                          >
                            <BlueText>
                              <FontAwesomeIcon icon={faInfoCircle} />
                            </BlueText>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ challengeTypeUsablePoints }) => ({
  challengeTypeUsablePoints,
});

const mapDispatchToProps = (dispatch) => ({
  challengeTypeUsablePointsActions: bindActionCreators(
    challengeTypeUsablePointsActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Awards));
