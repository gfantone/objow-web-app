import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withStyles} from '@material-ui/core/styles'
import {Grid, IconButton, CardMedia, RadioGroup, FormControlLabel} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {BlueText, Card, DefaultText, DefaultTitle, GreenRadio, HiddenInput, Select, Switch, TextField, Tooltip, IconButton as MenuIconButton} from '../../../../../../components'
import {ChallengeReward, ChallengeRewardCard} from '../../../'
import * as Resources from '../../../../../../Resources'
import * as challengeTypeUsablePointsActions from '../../../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import {uuidv4} from "../../../../../../helpers/UUIDHelper"
import './helpers/FormsyHelper'
import _ from 'lodash'

const styles = {
  pointsField: {
    '& .MuiFormLabel-root': {
      marginLeft: 25
    }
  }
}

const Awards = ({challengeId, challengeTypeCode, challengeTypeId, end, hasChallengeManager, initialAwards = [], initialLive = false, initialType, initialRewardType, isCreation, isDuplication, isUpdate, start, team, types, rewardTypes, setConfigRewardOpen, rewardImages, rewardCategories, classes, ...props}) => {
    const getInitialAwards = () => {
        if (initialAwards && initialAwards.length > 0) {
            const awardType = types.find(t => t.id === parseInt(initialType))
            return initialAwards.filter((award, index) => awardType.code === "M" ? index === 0 : true).map(x => ({key: uuidv4(), points: x.points, reward: x.reward, target: x.target}))
        } else {
            return [{key: uuidv4(), points: null, reward: null}]
        }
    }

    const {points, loading} = props.challengeTypeUsablePoints
    const maxAwardType = types.find(t => t.code === 'M').id
    const finalInitialType = initialType ? initialType : maxAwardType
    const finalInitialRewardType = initialRewardType ? initialRewardType : rewardTypes[0].id
    const [awards, setAwards] = React.useState(getInitialAwards)
    const [type, setType] = React.useState(finalInitialType)
    // const [type, setType] = React.useState(1)

    const [rewardType, setRewardType] = React.useState(finalInitialRewardType)
    const isMaxAward = parseInt(type) === maxAwardType
    const currentType = types.find(t => parseInt(type) === t.id)
    const currentRewardType = rewardTypes.find(t => parseInt(rewardType) === t.id)
    const usablePoints = points ? (!isMaxAward ? points.all : points.participant) : 0
    // console.log(_.slice(awards, 1));
    const icons = {
      'R': require(`../../../../../../assets/img/system/challenge/icons/Ribbons.png`),
      'M': require(`../../../../../../assets/img/system/challenge/icons/Rocket.png`),
      'P': require(`../../../../../../assets/img/system/challenge/icons/Levels.png`),
      'C': require(`../../../../../../assets/img/system/challenge/icons/race.png`)
    }
    const coinImage = require(`../../../../../../assets/img/system/challenge/icons/coin.png`)
    const giftImage = require(`../../../../../../assets/img/system/challenge/icons/gift.png`)
    const pointRewardImage = require(`../../../../../../assets/img/system/challenge/icons/points.png`)

    useEffect(() => {
        if ((isCreation || isDuplication) && challengeTypeId && end && start) {
            const teamFilter = hasChallengeManager && challengeTypeCode === 'CM' ? team : null
            props.challengeTypeUsablePointsActions.getChallengeTypeUsablePoints(challengeTypeId, start, end, teamFilter)
        } else if (isUpdate) {
            if (!start || !end) {
                props.challengeTypeUsablePointsActions.getChallengeTypeUsablePointsByChallenge(challengeId)
            } else {
                props.challengeTypeUsablePointsActions.getChallengeTypeUsablePointsByChallenge(challengeId, start, end)
            }
        }
    }, [challengeTypeCode, challengeTypeId, end, start])

    useEffect(() => {
        setConfigRewardOpen(false, awards)
    }, [awards])

    function handleAddAwardClick() {
        setAwards(awards => [...awards, {key: uuidv4(), points: null}])
    }

    function handleRemoveAwardClick(key) {
        setAwards(x => x.filter(y => y.key != key))
    }

    function handleTypeChange(newType) {
        setType(Number(newType))
    }
    function handleRewardTypeChange(event) {
        setRewardType(Number(event.target.value))
    }

    return (
        <div>
            <Grid container spacing={2} justify="center" style={{marginBottom: 20}}>
              <Grid item xs={10} sm={6}>
                <Card>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <CardMedia image={icons[currentType.code]} style={{width: 75, height: 75}} />
                    </Grid>
                    <Grid item xs>
                      <Grid container direction="column" spacing={1}>
                        <Grid item>
                          <DefaultTitle>
                            Mode : { currentType.name }
                            {currentType.code === 'P' && (
                              <span style={{marginLeft: 5, lineHeight: 1, verticalAlign: 'middle'}}>
                                <Tooltip title={Resources.CHALLENGE_STEP_MODE_INFORMATION} placement={'right'}>
                                  <BlueText style={{ width: 'fit-content' }} component={'span'}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                  </BlueText>
                                </Tooltip>
                              </span>
                            )}
                          </DefaultTitle>
                        </Grid>
                        <Grid item>
                          <DefaultText lowercase>
                            {Resources[`CHALLENGE_CREATION_AWARD_TYPE_DESCRIPTION_${currentType.code}`].format(
                              challengeTypeCode === 'CC' ? 'premiers' : 'premières équipes',
                              challengeTypeCode === 'CC' ? 'participant' : 'équipe'
                            )}
                          </DefaultText>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <DefaultTitle>
                        { Resources.REWARD_TITLE }
                      </DefaultTitle>
                    </Grid>
                    {!isMaxAward && (

                      <Grid item>
                        <DefaultTitle>
                          <MenuIconButton size={'small'} onClick={handleAddAwardClick} style={{marginTop: '-4px', color: '#00E58D', fontSize: '18px' }}>
                            <FontAwesomeIcon icon={faPlus} />
                          </MenuIconButton>
                        </DefaultTitle>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                      <Grid container spacing={4} direction="column">
                        <Grid item xs={12}>
                          <RadioGroup row name='rewardType' onChange={handleRewardTypeChange} value={rewardType}>
                            {rewardTypes.map(rewardType => (
                              <FormControlLabel value={rewardType.id} control={
                                <GreenRadio
                                />
                            } label={
                              <Grid container spacing={1}>
                                <Grid item>
                                  <CardMedia image={rewardType.code === 'G' ? giftImage : coinImage} style={{height: 20, width: 20}} />
                                </Grid>
                                <Grid item>
                                  {rewardType.name}
                                </Grid>
                              </Grid>
                            } />

                            ))}
                          </RadioGroup>

                          <HiddenInput name='rewardType' value={rewardType}/>

                        </Grid>
                        <Grid item>
                          <Grid container spacing={2}>
                            {awards.map((award, index) => {
                                const number = index + 1
                                const labels = {
                                  'M': (challengeTypeCode === 'CT' ? Resources.CHALLENGE_AWARD_LIST_TEAM_MAX_POINT_LABEL : Resources.CHALLENGE_AWARD_LIST_COLLABORATOR_MAX_POINT_LABEL),
                                  'R': (challengeTypeCode === 'CT' ? Resources.CHALLENGE_AWARD_LIST_TEAM_POINT_LABEL.format(number) : Resources.CHALLENGE_AWARD_LIST_COLLABORATOR_POINT_LABEL.format(number)),
                                  'C': (challengeTypeCode === 'CT' ? Resources.CHALLENGE_AWARD_LIST_TEAM_POINT_LABEL.format(number) : Resources.CHALLENGE_AWARD_LIST_COLLABORATOR_POINT_LABEL.format(number)),
                                  'P': Resources.CHALLENGE_AWARD_STEP_POINT_LABEL.format(number)
                                }
                                const label = labels[currentType.code]
                                // const validations = isMaxAward ? 'isLessThanOrEquals:usablePoints' : 'isRankingValid'
                                const validations = isMaxAward ? 'isInt' : {isRankingIncreasing: true, isInt: true}

                                const validationErrors = isMaxAward ? {
                                  isInt: Resources.COMMON_IS_INT_ERROR,
                                  isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                } : {
                                  isInt: Resources.COMMON_IS_INT_ERROR,
                                  isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                  isRankingIncreasing: 'Les récompenses doivent être décroissantes'
                                }
                                const reward = award.reward ? Object.assign({}, award.reward, {
                                  image: _.get(award, 'reward.image.path') || (award.reward.image && rewardImages ? rewardImages.find(i => i.id === parseInt(award.reward.image)).path : null),
                                  category: _.get(award, 'reward.category.id') ? _.get(award, 'reward.category') : rewardCategories && award.reward.category && rewardCategories.find(c => c.id === parseInt(award.reward.category))
                                }) : null
                                return (
                                  <Grid key={award.key} item xs={12} sm={6} md={4}>
                                    <Grid container spacing={1} direction="column">
                                      <Grid item xs={12}>
                                        <ChallengeRewardCard>
                                          <Grid container spacing={1} alignItems='flex-end'>
                                            <Grid item xs={12} >
                                              <Grid container direction='column' spacing={2}>
                                                <Grid item>
                                                  <Grid container justify='space-between'>
                                                    <Grid item>
                                                      <DefaultTitle>
                                                        {label}
                                                      </DefaultTitle>
                                                    </Grid>

                                                    {awards.length > 1 && <Grid item>
                                                      <IconButton size='small' onClick={() => handleRemoveAwardClick(award.key)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                      </IconButton>
                                                    </Grid>}

                                                  </Grid>
                                                </Grid>
                                                {currentRewardType.code === 'G' && (
                                                  <React.Fragment>
                                                    {currentType.code === 'P' && (
                                                      <Grid item xs={8}>
                                                        <TextField name={`awardTarget[${index}]`} label={Resources.CHALLENGE_AWARD_TARGET_LABEL} fullWidth required initial={award.target}
                                                          validations={{
                                                            isStepsIncreasing: true,
                                                            isInt: true
                                                          }}
                                                          validationErrors={{
                                                              isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                              isInt: Resources.COMMON_IS_INT_ERROR,
                                                              isStepsIncreasing: 'Les scores à atteindre doivent être croissants'
                                                          }}
                                                          />
                                                      </Grid>
                                                    )}
                                                    <Grid item xs={12} style={{cursor: 'pointer'}} onClick={() => setConfigRewardOpen(true, awards, award, index, setAwards)}>
                                                      {award.reward && (
                                                        <ChallengeReward reward={reward} />
                                                      )}
                                                      {!award.reward && (
                                                        <Card>
                                                          <DefaultText style={{textAlign: 'center', color: '#00E58D'}} lowercase>
                                                            Ajouter une récompense
                                                          </DefaultText>
                                                        </Card>
                                                      )}
                                                    </Grid>
                                                  </React.Fragment>
                                                )}
                                              </Grid>
                                            </Grid>
                                              {currentRewardType.code === 'P' && (
                                                <React.Fragment>
                                                  {currentType.code === 'P' && (
                                                    <Grid item xs={8}>
                                                      <TextField name={`awardTarget[${index}]`} label={Resources.CHALLENGE_AWARD_TARGET_LABEL} fullWidth required initial={award.target}
                                                        validations={{
                                                          isStepsIncreasing: true,
                                                          isInt: true
                                                        }}
                                                        validationErrors={{
                                                            isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                            isInt: Resources.COMMON_IS_INT_ERROR,
                                                            isStepsIncreasing: 'Les scores à atteindre doivent être croissants'
                                                        }}
                                                        />
                                                    </Grid>
                                                  )}
                                                  <Grid item xs={12}>
                                                    <CardMedia image={pointRewardImage} style={{height: 100, width: 100, margin: 'auto'}}/>
                                                  </Grid>
                                                  <Grid item xs={12} className={classes.pointsField} style={{position: 'relative'}}>

                                                    <CardMedia image={coinImage} style={{height: 20, width: 20, position: 'absolute', left: 5, top: -1}} />

                                                    <TextField name={`award[${index}]`} label="Points" fullWidth required initial={award.points}
                                                      validations={ validations }
                                                      validationErrors={validationErrors}
                                                    />
                                                  </Grid>
                                                </React.Fragment>
                                              )}
                                          </Grid>
                                        </ChallengeRewardCard>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )
                            })}
                            {isMaxAward && <Grid item xs>
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Switch name='live' label={Resources.CHALLENGE_AWARD_LIST_LIVE_LABEL} initial={initialLive} />
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title={Resources.CHALLENGE_AWARD_LIST_LIVE_INFOS}>
                                            <BlueText>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                            </BlueText>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>}
                        </Grid>
                        </Grid>
                      </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = ({challengeTypeUsablePoints}) => ({
    challengeTypeUsablePoints
})

const mapDispatchToProps = (dispatch) => ({
    challengeTypeUsablePointsActions: bindActionCreators(challengeTypeUsablePointsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Awards))
