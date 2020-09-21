import React from 'react'
import {Grid} from '@material-ui/core'
import {Awards, Goals, Infos} from './components'
import {ProgressButton} from '../../../../components'
import * as Resources from '../../../../Resources'

const ChallengeForm = ({actionLoading, awardTypes, categories, challenge, images, isCreation = false, isDuplication = false, isUpdate = false, kpis, period, readonly, types, goalAdding, onGoalAdded, ...props}) => {
    const id = challenge ? challenge.id : null
    const name = challenge ? challenge.name : null
    const description = challenge ? challenge.description : null
    const [start, setStart] = React.useState(challenge ? challenge.start.toDate2() : null)
    const [end, setEnd] = React.useState(challenge ? challenge.end.toDate2() : null)
    const [type, setType] = React.useState(challenge ? challenge.type : null)
    const typeObject = types.find(x => x.id == type)
    const typeCode = typeObject ? typeObject.code : null
    const image = challenge ? challenge.image : null
    const awardType = challenge ? challenge.award_type : null
    const awards = challenge ? challenge.awards : []
    const goals = challenge ? challenge.goals : null

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
                        name={name}
                        period={period}
                        readonly={readonly}
                        start={start}
                        type={type}
                        types={types}
                        onEndChange={handleEndChange}
                        onStartChange={handleStartChange}
                        onTypeChange={handleTypeChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Awards
                        challengeId={id}
                        challengeType={typeCode}
                        end={end}
                        initialAwards={awards}
                        initialType={awardType}
                        readonly={readonly}
                        start={start}
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

export default ChallengeForm
