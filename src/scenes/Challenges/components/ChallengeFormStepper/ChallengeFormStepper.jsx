import React from 'react'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
import {Awards, Goals, Infos} from './components'
import {ProgressButton, Select, TransferList, Card} from '../../../../components'
import * as Resources from '../../../../Resources'

const ChallengeFormStepper = ({
    actionLoading,
    awardTypes,
    categories,
    images,
    isCreation,
    isDuplication,
    isUpdate,
    kpis,
    period,
    team,
    teams,
    types,
    goalAdding,
    onGoalAdded,
    currentStep,
    isLastStep,
    handleNextStep,
    handlePreviousStep,
    challenge,
    setStart,
    setEnd,
    setType,
    setCustomImage,
    setParticipants,
    ...props
  }) => {
    const id = challenge.id || null
    const name = challenge.name || null
    const description = challenge.description || null
    const start = challenge.start || null
    const end =  challenge.end || null
    const type =  challenge.type || null

    const image = challenge.image || null
    const customImage = challenge.customImage || null
    const awardType = challenge.awardType ? challenge.awardType : null
    const awards = challenge.awards || []
    const goals = challenge.goals || null
    const live = challenge.live || null
    const participants = challenge.participants || []


    const typeObject = types.find(x => x.id === type)
    const typeId = typeObject ? typeObject.id : null
    const typeCode = typeObject ? typeObject.code : null
    var finalTypes = types
    const {account} = props.accountDetail

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
    let fields
    console.log(challenge);
    switch(currentStep.order){
      case 1:
        fields = <Grid item xs={12}>
        </Grid>
        break;
      case 2:
        // fields = <Grid item xs={12}>
        // </Grid>
        // break;
        fields = <Grid item xs={12}>
          <Infos
            description={description}
            end={end}
            image={image}
            customImage={customImage}
            images={images}
            name={name}
            period={period}
            start={start}
            type={type}
            types={finalTypes}
            onEndChange={handleEndChange}
            onStartChange={handleStartChange}
            setCustomImage={setCustomImage}
          />
        </Grid>
        break;
      case 3:
        // fields = <Grid item xs={12}>
        // </Grid>
        // break;
        fields = <Grid item xs={12}>
          <Grid container direction='column' spacing={2}>
            <Grid item xs={12}>
                <Grid container justify='center'>
                  <Grid item xs={4}>
                    <Select
                        disabled={isUpdate}
                        fullWidth
                        initial={type}
                        label={Resources.CHALLENGE_CREATION_INFO_TYPE_LABEL}
                        name='type'
                        options={types}
                        optionTextName='name'
                        optionValueName='id'
                        required
                        validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                        onChange={handleTypeChange}
                    />
                  </Grid>
                </Grid>
            </Grid>
            <Grid item>
              <Card>
                <TransferList
                  listIn={ teams }
                  enableCollaboratorSelect={ type === '1' }
                  onChange={ setParticipants }
                  selected={participants}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        break;
      case 4:
        // fields = <Grid item xs={12}>
        // </Grid>
        // break;
        fields = <Grid item xs={12}>
          <Goals categories={categories}
            goals={goals}
            kpis={kpis}
            goalAdding={goalAdding}
            onGoalAdded={onGoalAdded}
          />
        </Grid>
        break;
      case 5:
        // fields = <Grid item xs={12}>
        // </Grid>
        // break;
        // console.log(awardType);
        fields = <Grid item xs={12}>
            <Awards
                challengeId={id}
                challengeTypeCode={typeCode}
                challengeTypeId={typeId}
                end={end}
                hasChallengeManager={hasChallengeManager}
                initialAwards={awards}
                initialLive={live}
                initialType={awardType}
                isCreation={isCreation}
                isDuplication={isDuplication}
                isUpdate={isUpdate}
                start={start}
                team={team}
                types={awardTypes}
            />
        </Grid>
        break;
      case 6:
        fields = <Grid item xs={12}>
        </Grid>
        break;
      case 7:
        fields = <Grid item xs={12}>
        </Grid>
        break;
    }


    return (
        <div>
          <Grid container spacing={4}>
              { fields }
              <Grid item xs={12}>
                <Grid container spacing={4} direction='row' justify='center'>
                  { currentStep.order > 1 &&
                    <Grid item>
                      <ProgressButton onClick={ (e) => {
                        e.preventDefault()
                        handlePreviousStep()
                      } } color="secondary" text="précédent" centered />
                    </Grid>
                  }
                  { !isLastStep &&
                    <Grid item>
                      <ProgressButton onClick={ handleNextStep } text="suivant" centered />
                    </Grid>
                  }
                  { isLastStep &&
                    <Grid item>
                      <ProgressButton onClick={ handleNextStep } text="Valider" centered />
                    </Grid>
                  }
                </Grid>
              </Grid>
          </Grid>
        </div>
    )
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default connect(mapStateToProps)(ChallengeFormStepper)
