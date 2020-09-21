import React from 'react'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
import {Awards, Goals, Infos} from './components'
import {ProgressButton} from '../../../../components'
import * as Resources from '../../../../Resources'

const ChallengeForm = ({actionLoading, awardTypes, categories, challenge, images, isCreation, isDuplication, isUpdate, kpis, period, team, types, goalAdding, onGoalAdded, ...props}) => {
    const id = challenge ? challenge.id : null
    const name = challenge ? challenge.name : null
    const description = challenge ? challenge.description : null
    const [start, setStart] = React.useState(challenge ? challenge.start.toDate2() : null)
    const [end, setEnd] = React.useState(challenge ? challenge.end.toDate2() : null)
    const [type, setType] = React.useState(challenge ? challenge.type : null)
    const typeObject = types.find(x => x.id == type)
    const typeId = typeObject ? typeObject.id : null
    const typeCode = typeObject ? typeObject.code : null
    const image = challenge ? challenge.image : null
    const awardType = challenge ? challenge.award_type : null
    const awards = challenge ? challenge.awards : []
    const goals = challenge ? challenge.goals : null
    var finalTypes = types
    const {account} = props.accountDetail

    if (account.role.code === 'M') {
        finalTypes = finalTypes.filter(x => x.code === 'CM')
    } else if (account.role.code === 'A' && !team) {
        finalTypes = finalTypes.filter(x => x.code !== 'CM')
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
                        initialType={awardType}
                        isCreation={isCreation}
                        isUpdate={isUpdate}
                        start={start}
                        team={team}
                        types={awardTypes}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Goals categories={categories}
                           goals={goals}
                           kpis={kpis}
                           goalAdding={goalAdding}
                           onGoalAdded={onGoalAdded}
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
