import React from 'react'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
import withWidth, {isWidthDown} from '@material-ui/core/withWidth'
import {Awards, Goals, Infos, AwardType} from './components'
import {ProgressButton, Select, TransferList, Card, BlueText, Switch, Tooltip, BigText} from '../../../../components'
import {faInfoCircle, faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Resources from '../../../../Resources'
import _ from 'lodash'

const ChallengeFormStepper = ({
    actionLoading,
    awardTypes,
    rewardTypes,
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
    setAwardType,
    handleAddGoal,
    setNewKpiOpen,
    setConfigRewardOpen,
    rewardImages,
    rewardCategories,
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
    const rewardType = challenge.rewardType ? challenge.rewardType : null
    const awards = challenge.awards || []
    const goals = challenge.goals || null
    const live = challenge.live || null
    const participants = challenge.participants || []

    const typeObject = types.find(x => x.id === parseInt(type))
    const typeId = typeObject ? typeObject.id : null
    const typeCode = typeObject ? typeObject.code : null
    var finalTypes = types
    const {account} = props.accountDetail


    const isMobile = isWidthDown('xs', props.width)

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
      },
      'C': {
        order: 4,
        icon: require(`../../../../assets/img/system/challenge/icons/race.png`),
        availableReward: ['gift', 'points'],
        soon: true,
        disabled: true
      }
    }

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
        setParticipants([])
    }
    const maxAwardType = awardTypes[0].id
    const finalInitialType = awardType ? awardType : maxAwardType
    const isMaxAward = parseInt(awardType) === maxAwardType
    let fields
    let title
    switch(currentStep.order){
      case 1:
        title = 'Sélection des participants'
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
            { type && (
              <Grid item>
                <Card>
                  <TransferList
                    listIn={ teams }
                    enableCollaboratorSelect={ _.get(typeObject, 'code') === 'CC' }
                    onChange={ setParticipants }
                    selected={participants}
                    />
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
        break;
      case 2:
        title = 'Sélection du mode de challenge'
        const participantsNumber = _.get(typeObject, 'code') === 'CC' ?
          participants.length :
          _.uniq(participants.map(p => p.team.id)).length

        fields = <Grid item xs={12}>
          <AwardType
            types={awardTypes}
            typesData={typesData}
            currentType={awardType}
            setType={setAwardType}
            participantsNumber={participantsNumber}
            participantType={typeObject}
          />
        </Grid>
        break;
      case 3:
        // fields = <Grid item xs={12}>
        // </Grid>
        // break;
        title = 'Configuration des informations'
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
      case 4:
        // fields = <Grid item xs={12}>
        // </Grid>
        // break;
        title = 'Configuration des indicateurs et des mécanismes du challenge'
        fields = <Grid item xs={12}>
          <Goals categories={categories}
            goals={goals}
            kpis={kpis}
            goalAdding={goalAdding}
            onGoalAdded={onGoalAdded}
            period={period}
            start={start}
            onEndChange={handleEndChange}
            onStartChange={handleStartChange}
            handleAddGoal={handleAddGoal}
            end={end}
            setNewKpiOpen={setNewKpiOpen}
          />
        </Grid>
        break;
      case 5:
        // fields = <Grid item xs={12}>
        // </Grid>
        // break;
        // console.log(awardType);
        title = 'Sélection des récompenses'
        const currentAwardType = awardTypes.find(at => at.id === parseInt(awardType))
        const availableRewardTypes = rewardTypes.filter(rt =>
          typesData[currentAwardType.code].availableReward.indexOf(rt.code === 'G' ? 'gift' : 'points') >= 0
        )
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
        break;
      // case 6:
      //   title = 'Sélection des options'
      //   fields = <Grid item xs={12}>
      //     {isMaxAward && <Card>
      //         <Grid container alignItems='center'>
      //             <Grid item>
      //                 <Switch name='live' label={Resources.CHALLENGE_AWARD_LIST_LIVE_LABEL} initial={live} />
      //             </Grid>
      //             <Grid item>
      //                 <Tooltip title={Resources.CHALLENGE_AWARD_LIST_LIVE_INFOS}>
      //                     <BlueText>
      //                         <FontAwesomeIcon icon={faInfoCircle} />
      //                     </BlueText>
      //                 </Tooltip>
      //             </Grid>
      //           </Grid>
      //       </Card>}
      //   </Grid>
      //   break;
      case 6:
        title = ''
        fields = <Grid item xs={12}>
          <Card>
            <div style={{ textAlign: 'center', margin: 'auto' }}>
              <p style={{fontSize: 19, color: '#555555'}}>
                Félicitations 🎉 !
              </p>
              <p style={{fontSize: 19, color: '#555555'}} >
                Votre challenge est prêt à être diffusé !
              </p>
            </div>
          </Card>

        </Grid>
        break;
    }

    return (
        <div>
          <Grid container spacing={4} style={{paddingBottom: isMobile ? 40 : 0}}>
              <Grid item style={{textAlign: 'center', width: '100%'}}>
                <BigText>
                  {title}
                </BigText>
              </Grid>
              { fields }
              {!isMobile && (
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
                          <ProgressButton text="suivant" centered />
                        </Grid>
                      }
                      { isLastStep &&
                        <Grid item>
                          <ProgressButton text="Valider" centered />
                        </Grid>
                      }
                    </Grid>
                  </Grid>
              )}
          </Grid>
        </div>
    )
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default connect(mapStateToProps)(withWidth()(ChallengeFormStepper))
