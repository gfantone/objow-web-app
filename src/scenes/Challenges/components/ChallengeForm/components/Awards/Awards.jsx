import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid, IconButton, CardMedia} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {BlueText, Card, DefaultText, DefaultTitle, HiddenInput, Select, Switch, TextField, Tooltip, IconButton as MenuIconButton} from '../../../../../../components'
import {ChallengeReward} from '../../../'
import * as Resources from '../../../../../../Resources'
import * as challengeTypeUsablePointsActions from '../../../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import {uuidv4} from "../../../../../../helpers/UUIDHelper"
import './helpers/FormsyHelper'
import _ from 'lodash'

const Awards = ({challengeId, challengeTypeCode, challengeTypeId, end, hasChallengeManager, initialAwards = [], initialLive = false, initialType, initialRewardType, isCreation, isDuplication, isUpdate, start, team, types, rewardTypes, setConfigRewardOpen, rewardImages, ...props}) => {
    const getInitialAwards = () => {
        if (initialAwards && initialAwards.length > 0) {
            const awardType = types.find(t => t.id === parseInt(initialType))
            return initialAwards.filter((award, index) => awardType.code === "M" ? index === 0 : true).map(x => ({key: uuidv4(), points: x.points, reward: x.reward, target: x.target}))
        } else {
            return [{key: uuidv4(), points: null, reward: null, target: null}]
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
      'P': require(`../../../../../../assets/img/system/challenge/icons/Levels.png`)
    }

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
    function handleRewardTypeChange(newType) {
        setRewardType(Number(newType))
    }

    return (
        <div>
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
                          <Grid item xs={6}>
                            <Select
                              name='rewardType'
                              label='Récompenses'
                              initial={initialRewardType}
                              options={rewardTypes}
                              optionValueName='id'
                              optionTextName='name'
                              emptyDisabled
                              disabled={rewardTypes.length <= 1}
                              onChange={handleRewardTypeChange}
                              fullWidth
                            />
                            {rewardTypes.length <= 1 && (
                              <HiddenInput name='rewardType' value={finalInitialRewardType}/>
                            )}
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                            {awards.map((award, index) => {
                                const number = index + 1
                                const labels = {
                                  'M': (challengeTypeCode === 'CT' ? Resources.CHALLENGE_AWARD_LIST_TEAM_MAX_POINT_LABEL : Resources.CHALLENGE_AWARD_LIST_COLLABORATOR_MAX_POINT_LABEL),
                                  'R': (challengeTypeCode === 'CT' ? Resources.CHALLENGE_AWARD_LIST_TEAM_POINT_LABEL.format(number) : Resources.CHALLENGE_AWARD_LIST_COLLABORATOR_POINT_LABEL.format(number)),
                                  'P': Resources.CHALLENGE_AWARD_STEP_POINT_LABEL.format(number)
                                }
                                const label = labels[currentType.code]
                                // const validations = isMaxAward ? 'isLessThanOrEquals:usablePoints' : 'isRankingValid'
                                const validations = null
                                const validationErrors = isMaxAward ? {isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR, isLessThanOrEquals: 'La récompense est trop élevée',} : {isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR, isRankingValid: 'La récompense est trop élevée'}
                                const reward = award.reward ? Object.assign({}, award.reward, {
                                  image: _.get(award, 'reward.image.path') || (award.reward.image && rewardImages ? rewardImages.find(i => i.id === parseInt(award.reward.image)).path : null)
                                }) : null
                                return (
                                    <Grid key={award.key} item xs={4}>
                                      <Card>
                                        <Grid container spacing={1} alignItems='flex-end'>
                                            {currentRewardType.code === 'G' && (
                                              <Grid item xs={10} >
                                                <Grid container direction='column' spacing={1}>
                                                  <Grid item>
                                                    <DefaultText>
                                                      {label}
                                                    </DefaultText>
                                                  </Grid>
                                                  {currentType.code === 'P' && (
                                                    <Grid item xs={12}>
                                                      <TextField name={`awardTarget[${index}]`} label={Resources.CHALLENGE_AWARD_TARGET_LABEL} fullWidth required initial={award.target}
                                                        validations={validations}
                                                        validationErrors={validationErrors}
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
                                                </Grid>
                                              </Grid>
                                            )}
                                            {currentRewardType.code === 'P' && (
                                              <Grid item xs>
                                                <TextField name={`award[${index}]`} label={label} fullWidth required initial={award.points}
                                                  validations={validations}
                                                  validationErrors={validationErrors}
                                                  />
                                              </Grid>
                                            )}

                                            {!isMaxAward && awards.length > 1 && <Grid item>
                                                <IconButton size='small' onClick={() => handleRemoveAwardClick(award.key)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </IconButton>
                                            </Grid>}
                                        </Grid>
                                      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(Awards)
