import React from 'react'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
import {Awards, Goals, Infos, Participants} from './components'
import {ProgressButton} from '../../../../components'
import * as Resources from '../../../../Resources'
import _ from 'lodash'

const ChallengeForm = ({actionLoading, awardTypes, rewardTypes, categories, challenge, images, isCreation, isDuplication, isUpdate, kpis, period, team, types, goalAdding, onGoalAdded, addGoal, teams, setConfigRewardOpen, rewardImages, rewardCategories, handleChangeParticipants, setParticipantsEditOpen, newParticipants, ...props}) => {
    const id = challenge ? challenge.id : null
    const name = challenge ? challenge.name : null
    const description = challenge ? challenge.description : null
    const [start, setStart] = React.useState(challenge && !isDuplication ? challenge.start.toDate2() : null)
    const [end, setEnd] = React.useState(challenge && !isDuplication ? challenge.end.toDate2() : null)
    const [type, setType] = React.useState(challenge ? challenge.type.id : null)
    const typeObject = types.find(x => x.id === type)
    const typeId = typeObject ? typeObject.id : null
    const typeCode = typeObject ? typeObject.code : null
    const image = challenge ? _.get(challenge, 'image.id') : null
    const customImage = challenge ? challenge.customImage : null
    const awardType = challenge ? challenge.award_type : null
    const rewardType = challenge ? challenge.reward_type : null
    const awards = challenge ? challenge.awards : []
    const goals = challenge ? challenge.goals : null
    const live = challenge ? challenge.live : null
    const participants = challenge ? challenge.participants : null

    var finalTypes = types
    const {account} = props.accountDetail

    const typesData = {
      'R': {
        minimumParticipants: 2,
        order: 1,
        icon: require(`../../../../assets/img/system/challenge/icons/Ribbons.png`),
        availableReward: ['points', 'gift']
      },
      'M': {
        order: 2,
        icon: require(`../../../../assets/img/system/challenge/icons/Rocket.png`),
        availableReward: ['points']
      },
      'P': {
        order: 3,
        icon: require(`../../../../assets/img/system/challenge/icons/Levels.png`),
        availableReward: ['gift'],
        soon: true,
        disabled: true
      },
      'C': {
        order: 4,
        icon: require(`../../../../assets/img/system/challenge/icons/race.png`),
        availableReward: ['gift', 'points'],
        soon: true,
        disabled: true
      }
    }

    const currentAwardType = awardTypes.find(at => at.id === parseInt(awardType))
    const availableRewardTypes = rewardTypes.filter(rt =>
      typesData[currentAwardType.code].availableReward.indexOf(rt.code === 'G' ? 'gift' : 'points') >= 0
    )

    if (!isUpdate) {
        if (account.role.code === 'M') {
            finalTypes = finalTypes.filter(x => x.code === 'CM')
        } else if (account.role.code === 'A' && !team) {
            finalTypes = finalTypes.filter(x => x.code !== 'CM')
        }
    }

    const hasChallengeManager = finalTypes.find(x => x.code === 'CM') != null

    function handleEndChange(newEnd) {
        setEnd(newEnd)
    }

    function handleStartChange(newStart) {
        setStart(newStart)
    }

    function handleTypeChange(newType) {
        setType(Number(newType))
    }

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Infos
                        description={description}
                        end={end}
                        image={image}
                        customImage={customImage}
                        images={images}
                        isUpdate={isUpdate}
                        name={name}
                        period={period}
                        start={start}
                        type={type}
                        types={finalTypes}
                        onEndChange={handleEndChange}
                        onStartChange={handleStartChange}
                        onTypeChange={handleTypeChange}
                        awardTypes={awardTypes}
                        awardType={awardType}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Goals categories={categories}
                           goals={goals}
                           kpis={kpis}
                           goalAdding={goalAdding}
                           onGoalAdded={onGoalAdded}
                           addGoal={addGoal}
                    />
                </Grid>
                <Grid item xs={12}>
                  <Awards
                    challengeId={id}
                    challengeTypeCode={typeCode}
                    challengeTypeId={typeId}
                    end={end}
                    hasChallengeManager={hasChallengeManager}
                    initialAwards={awards}
                    initialLive={live}
                    initialType={awardType}
                    initialRewardType={rewardType}
                    isCreation={isCreation}
                    isDuplication={isDuplication}
                    isUpdate={isUpdate}
                    start={start}
                    team={team}
                    types={awardTypes}
                    rewardTypes={availableRewardTypes}
                    setConfigRewardOpen={setConfigRewardOpen}
                    rewardImages={rewardImages}
                    rewardCategories={rewardCategories}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Participants
                      participants={newParticipants || participants}
                      teams={teams}
                      handleChangeParticipants={handleChangeParticipants}
                      setParticipantsEditOpen={setParticipantsEditOpen}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ProgressButton
                        centered
                        loading={actionLoading}
                        text={Resources.CHALLENGE_CREATION_SUBMIT_BUTTON}
                        type='submit'
                    />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default connect(mapStateToProps)(ChallengeForm)
