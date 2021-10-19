import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid, IconButton, CardMedia} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {BlueText, Card, DefaultText, DefaultTitle, HiddenInput, Select, Switch, TextField, Tooltip} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as challengeTypeUsablePointsActions from '../../../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import {uuidv4} from "../../../../../../helpers/UUIDHelper"
import './helpers/FormsyHelper'

const Awards = ({challengeId, challengeTypeCode, challengeTypeId, end, hasChallengeManager, initialAwards = [], initialLive = false, initialType, isCreation, isDuplication, isUpdate, start, team, types, ...props}) => {
    const getInitialAwards = () => {
        if (initialAwards && initialAwards.length > 0) {
            return initialAwards.map(x => ({key: uuidv4(), points: x.points}))
        } else {
            return [{key: uuidv4(), points: null}]
        }
    }

    const {points, loading} = props.challengeTypeUsablePoints
    const maxAwardType = types[0].id
    const finalInitialType = initialType ? initialType : maxAwardType
    const [awards, setAwards] = React.useState(getInitialAwards)
    const [type, setType] = React.useState(finalInitialType)
    const isMaxAward = parseInt(type) === maxAwardType
    const currentType = types.find(t => parseInt(type) === t.id)
    const usablePoints = points ? (!isMaxAward ? points.all : points.participant) : 0

    const icons = {
      'R': require(`../../../../../../assets/img/system/challenge/icons/Ribbons.png`),
      'M': require(`../../../../../../assets/img/system/challenge/icons/Rocket.png`)
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

    function handleAddAwardClick() {
        setAwards(awards => [...awards, {key: uuidv4(), points: null}])
    }

    function handleRemoveAwardClick(key) {
        setAwards(x => x.filter(y => y.key != key))
    }

    function handleTypeChange(newType) {
        setType(Number(newType))
    }
    return (
        <div>
            <Grid container spacing={2} justify="center">
              <Grid item xs={6}>
                <Card>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <CardMedia image={icons[currentType.code]} style={{width: 75, height: 75}} />
                    </Grid>
                    <Grid item style={{width:"80%"}}>
                      <Grid container direction="column" spacing={1}>
                        <Grid item>
                          <DefaultTitle>
                            Mode : { currentType.name }
                          </DefaultTitle>
                        </Grid>
                        <Grid item>
                          <DefaultText lowercase>
                            {Resources[`CHALLENGE_CREATION_AWARD_TYPE_DESCRIPTION_${currentType.code}`]}
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
                    <Grid container spacing={2}>
                        <Grid item>
                            <DefaultTitle>Points</DefaultTitle>
                        </Grid>
                        {!isMaxAward && <Grid item>
                            <IconButton size='small' onClick={handleAddAwardClick}>
                                <FontAwesomeIcon size='xs' icon={faPlus} />
                            </IconButton>
                        </Grid>}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            {awards.map((award, index) => {
                                const number = index + 1
                                const label = isMaxAward ? (challengeTypeCode === 'CT' ? Resources.CHALLENGE_AWARD_LIST_TEAM_MAX_POINT_LABEL : Resources.CHALLENGE_AWARD_LIST_COLLABORATOR_MAX_POINT_LABEL) : (challengeTypeCode === 'CT' ? Resources.CHALLENGE_AWARD_LIST_TEAM_POINT_LABEL.format(number) : Resources.CHALLENGE_AWARD_LIST_COLLABORATOR_POINT_LABEL.format(number))
                                // const validations = isMaxAward ? 'isLessThanOrEquals:usablePoints' : 'isRankingValid'
                                const validations = null
                                const validationErrors = isMaxAward ? {isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR, isLessThanOrEquals: 'La récompense est trop élevée',} : {isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR, isRankingValid: 'La récompense est trop élevée'}
                                return (
                                    <Grid key={award.key} item xs={3}>
                                        <Grid container spacing={1} alignItems='flex-end'>
                                            <Grid item xs>
                                                <TextField name={`award[${index}]`} label={label} fullWidth required initial={award.points}
                                                           validations={validations}
                                                           validationErrors={validationErrors}
                                                />
                                            </Grid>
                                            {!isMaxAward && awards.length > 1 && <Grid item>
                                                <IconButton size='small' onClick={() => handleRemoveAwardClick(award.key)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </IconButton>
                                            </Grid>}
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
                    </Card>
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
