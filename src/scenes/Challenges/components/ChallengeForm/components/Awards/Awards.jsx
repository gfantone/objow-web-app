import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid, IconButton} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Card, DefaultText, DefaultTitle, HiddenInput, Select, TextField} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as challengeTypeUsablePointsActions from '../../../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import {uuidv4} from "../../../../../../helpers/UUIDHelper"
import './helpers/FormsyHelper'

const Awards = ({challengeId, challengeTypeCode, challengeTypeId, end, hasChallengeManager, initialAwards = [], initialType, isCreation, isDuplication, isUpdate, start, team, types, ...props}) => {
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
    const isMaxAward = type === maxAwardType
    const usablePoints = points ? (!isMaxAward ? points.all : points.participant) : 0

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
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DefaultTitle>{Resources.CHALLENGE_AWARD_LIST_TITLE}</DefaultTitle>
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
                            <Grid item xs={12}>
                                {loading && <DefaultText>{Resources.CHALLENGE_AWARD_LIST_POINTS_CALCULATION_MESSAGE}</DefaultText>}
                                {!loading && <DefaultText>{Resources.CHALLENGE_AWARD_LIST_USABLE_POINTS.format(usablePoints)}</DefaultText>}
                                <HiddenInput name='usablePoints' value={usablePoints} />
                            </Grid>
                            <Grid item xs={3}>
                                <Select
                                    disabled={isUpdate}
                                    emptyDisabled
                                    fullWidth
                                    initial={finalInitialType}
                                    label={Resources.CHALLENGE_AWARD_LIST_TYPE_LABEL}
                                    name='awardType'
                                    options={types}
                                    optionTextName='name'
                                    optionValueName='id'
                                    required
                                    validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                    onChange={handleTypeChange}
                                />
                            </Grid>
                            {awards.map((award, index) => {
                                const number = index + 1
                                const label = isMaxAward ? (challengeTypeCode === 'CT' ? Resources.CHALLENGE_AWARD_LIST_TEAM_MAX_POINT_LABEL : Resources.CHALLENGE_AWARD_LIST_COLLABORATOR_MAX_POINT_LABEL) : (challengeTypeCode === 'CT' ? Resources.CHALLENGE_AWARD_LIST_TEAM_POINT_LABEL.format(number) : Resources.CHALLENGE_AWARD_LIST_COLLABORATOR_POINT_LABEL.format(number))
                                const validations = isMaxAward ? 'isLessThanOrEquals:usablePoints' : 'isRankingValid'
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
