import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import Formsy from "formsy-react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import {withStyles} from "@material-ui/core/styles";
import {ChallengeFormStepper, ChallengeRewardForm} from '../../components'
import {AppBarSubTitle, IconButton as MenuIconButton, Loader, MainLayoutComponent, Stepper, Dialog, DialogTitle, Select, DialogActions, ProgressButton, TextField, Button} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryListActions from "../../../../services/Categories/CategoryList/actions"
import * as challengeAwardTypeListActions from "../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions"
import * as challengeRewardTypeListActions from "../../../../services/ChallengeRewardTypes/ChallengeRewardTypeList/actions"
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions'
import * as challengeCreationActions from '../../../../services/Challanges/ChallangeCreaton/actions'
import * as challengeDetailActions from "../../../../services/Challanges/ChallengeDetail/actions"
import * as challengeImageListActions from "../../../../services/ChallengeImages/ChallengeImageList/actions"
import * as challengeTypeListActions from "../../../../services/ChallengeTypes/ChallengeTypeList/actions"
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import * as currentPeriodDetailActions from "../../../../services/Periods/CurrentPeriodDetail/actions"
import * as rewardTypeListActions from '../../../../services/RewardTypes/RewardTypeList/actions'
import * as kpiListActions from "../../../../services/Kpis/KpiList/actions"
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as kpiCreationActions from '../../../../services/Kpis/KpiCreation/actions'
import _ from 'lodash'

const styles = {
  kpiDialog: {
    width: 900
  }
}

class ChallengeCreation extends MainLayoutComponent {
    state = {
      goalAdding: false,
      steps: [
        { order: 1, name: 'Participants', active: true},
        { order: 2, name: 'Mode'},
        { order: 3, name: 'Informations'},
        { order: 4, name: 'indicateurs et mécanismes'},
        { order: 5, name: 'Récompenses'},
        // { order: 6, name: 'Options'},
        { order: 6, name: 'Validation'},
      ],
      finalModel: {},
      configRewardOpen: false,
      currentAwards: [],
      participants: []
    }

    constructor(props) {
        super(props)
        this.props.challengeCreationActions.clearChallengeCreation()
        this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints()
        this.form = React.createRef();
    }

    handleAddGoal = () => {
        this.setState({
            ...this.state,
            goalAdding: 1
        })
    }

    componentDidMount() {
        const { account } = this.props.accountDetail;
        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_LONG_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.CHALLENGE_CREATION_TITLE} />)
        // this.props.handleButtons(<MenuIconButton size={'small'} onClick={this.handleAddGoal.bind(this)}><FontAwesomeIcon icon={faPlus} /></MenuIconButton>)
        this.props.handleMaxWidth('md')
        this.props.activateReturn()
        this.props.categoryListActions.getActiveCategoryList()
        this.props.challengeAwardTypeListActions.getChallengeAwardTypeList()
        this.props.challengeRewardTypeListActions.getChallengeRewardTypeList()
        this.props.challengeImageListActions.getChallengeImageList()
        this.props.challengeTypeListActions.getUsableChallengeTypeList()
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail()
        this.props.rewardImageListActions.getRewardImageList()
        this.props.kpiListActions.getKpiList()
        this.props.teamListActions.getTeamList()
        this.props.rewardTypeListActions.getRewardTypeList()
    }

    renderLoader() {
        return <Loader centered />
    }

    handleGoalAdded() {
        this.setState({
            ...this.props.state,
            goalAdding: false
        })
    }

    setActiveStep = (newActiveStep) => {
      this.setState({
        ...this.state,
        steps: this.state.steps.map(step => step.order === newActiveStep.order ? Object.assign(step, {active: true}) : Object.assign(step, {active: false}))
      })
    }

    getCurrentStep = () => {
      return this.state.steps.find(step => step.active === true)
    }

    changeStep(model) {
      const currentStep = this.getCurrentStep()
      // Reset participants if we change goal type (team or individual)
      const apply = () => {
        let goals = []
        if(model.kpi) {
          for (var i = 0; i < model.kpi.length; i++) {
            goals.push({ number: model.number[i], name: model.goalName[i], kpi: model.kpi[i], target: model.target[i], points: model.points[i] })
          }
        }
        let awards = []
        if(model.award) {
          for (var i = 0; i < model.award.length; i++) {
            const rank = i + 1
            awards.push({ rank: rank, points: model.award[i] })
          }
        }
        // Set award target for mode palier
        let currentAwards = this.state.currentAwards
        if(model.awardTarget && this.state.currentAwards) {
          console.log(model.awardTarget, this.state.currentAwards);
          currentAwards = this.state.currentAwards.map((award, index) => {
            return Object.assign({}, award, {
              target: model.awardTarget[index]
            })
          })
        }

        this.setState({
          ...this.state,
          steps: this.state.steps.map(step => {
            if(step.order === currentStep.order) {
              return Object.assign(step, {active: false, completed: true})
            }
            if(step.order === currentStep.order + 1) {
              return Object.assign(step, {active: true})
            }
            return step
          }),
          currentAwards: currentAwards,
          finalModel: Object.assign(this.state.finalModel, model, {
            participants: this.state.participants,
            goals: model.kpi ? goals : this.state.finalModel.goals,
            awards: model.award ? awards : this.state.finalModel.awards
          })
        })
      }
      const checkValidation = (
        (currentStep.order !== 1 || _.get(this.state.participants, 'length', 0) > 0) &&
        (currentStep.order !== 2 || this.state.finalModel.awardType)
      )
      if(checkValidation) {
        // if(model.type && this.state.finalModel.type !== model.type) {
        //   this.setParticipants([], apply)
        // } else {
          apply()
        // }
      }
    }

    setParticipants = (participants, callback) => {
      this.setState({
          ...this.state,
          participants: participants,
          finalModel: Object.assign({}, this.state.finalModel, {participants})
      }, callback)
    }

    setAwardType = (awardType) => {
      const {types: awardTypes} = this.props.challengeAwardTypeList
      this.setState({
        ...this.state,
        finalModel: Object.assign(this.state.finalModel, {
          awardType
        })
      })
    }

    setStart = (start) => {
      this.setState({
        ...this.state,
        finalModel: Object.assign(this.state.finalModel, {start})
      })
    }

    setEnd = (end) => {
      this.setState({
        ...this.state,
        finalModel: Object.assign(this.state.finalModel, {end})
      })
    }
    setType = (type) => {
      this.setState({
        ...this.state,
        finalModel: Object.assign(this.state.finalModel, {type})
      })
    }
    setCustomImage = (customImage) => {
      this.setState({
        ...this.state,
        finalModel: Object.assign(this.state.finalModel, {customImage})
      })
    }

    handleValidSubmit(model) {
        const currentStep = this.getCurrentStep()
        const nextStep = this.state.steps.find(step => step.order === currentStep.order + 1)
        const {types: rewardTypes} = this.props.challengeRewardTypeList
        if(nextStep) {
          this.changeStep(model)
        } else {
          const { types } = this.props.challengeTypeList
          const finalModel = this.state.finalModel
          finalModel.start.setHours(0, 0, 0, 0)
          finalModel.end.setHours(23, 59, 59, 0)
          const start = finalModel.start.toUTCJSON();
          const end = finalModel.end.toUTCJSON();

          const participants = JSON.stringify(finalModel.participants.map(p => ({id: p.id})))

          const challengeFormData = new FormData()
          challengeFormData.append('name', finalModel.name)
          challengeFormData.append('description', JSON.stringify(finalModel.description))
          challengeFormData.append('start', start)
          challengeFormData.append('end', end)
          challengeFormData.append('type', finalModel.type)
          challengeFormData.append('award_type', finalModel.awardType)
          challengeFormData.append('reward_type', finalModel.rewardType)
          challengeFormData.append('live', finalModel.live ? finalModel.live : false)
          challengeFormData.append('participants', participants)

          if(Number.isInteger(finalModel.image)) {
            challengeFormData.append('image', finalModel.image)
          } else {
            challengeFormData.append('customImage', finalModel.image)
          }


          // Set custom image if exists
          const image = finalModel.image.id ? {
            image: finalModel.image
          } : {
            customImage: finalModel.image
          }
          const challenge = Object.assign({
            name: finalModel.name,
            description: JSON.stringify(finalModel.description),
            start: start,
            end: end,
            type: finalModel.type,
            award_type: finalModel.awardType,
            reward_type: finalModel.rewardType,
            live: finalModel.live ? finalModel.live : false,
            participants: participants

          }, image)

          const currentRewardType = rewardTypes.find(rewardType => rewardType.id === parseInt(finalModel.rewardType))
          const awards = _.get(currentRewardType, 'code') === 'G' ?
            // gift awards should have reward
            this.state.currentAwards.filter(award => !!award.reward) :
            finalModel.awards
          const teamId = types.find(x => x.id == finalModel.type && x.code == 'CM') != null && this.props.match.params.id ? this.props.match.params.id : null

          this.props.challengeCreationActions.createChallenge(
            challenge,
            challengeFormData,
            awards,
            finalModel.goals,
            teamId
          )
        }
    }

    handleNextStep = () => {
      this.form.current.submit()
    }
    handlePreviousStep = () => {

      const currentStep = this.getCurrentStep()
      const previousStep = this.state.steps.find(step => step.order === currentStep.order - 1);
      if(previousStep) {
        this.setState({
          ...this.state,
          steps: this.state.steps.map(step => {
            if(step.order === currentStep.order) {
              return Object.assign(step, {active: false, completed: false})
            }
            if(step.order === currentStep.order - 1) {
              return Object.assign(step, {active: true, completed: false})
            }
            return step
          })
        })
      }
    }

    isLastStep = () => {
      const currentStep = this.getCurrentStep()
      return currentStep.order >= this.state.steps.length
    }

    setNewKpiOpen = (value) => {
      this.setState({
        ...this.state,
        newKpiOpen: value
      })
    }

    handleSubmitKpi = (model) => {
      this.props.kpiCreationActions.createKpi(model)
      this.setNewKpiOpen(false)
    }

    handleSubmitReward = (model) => {
      const newAward = Object.assign({}, this.state.currentAward, {
        reward: Object.assign({}, _.get(this.state.currentAward, 'reward'), model)
      })
      const newAwards = [
        ..._.slice(this.state.currentAwards, 0, this.state.currentAwardIndex),
        newAward,
        ..._.slice(this.state.currentAwards, this.state.currentAwardIndex + 1),

      ]
      this.state.setAwards(newAwards)
      this.setState({
        ...this.state,
        currentAwards: newAwards,
        configRewardOpen: false
      })
    }

    setConfigRewardOpen = (value, awards, currentAward, currentAwardIndex, setAwards) => {
      const {types: rewardTypes} = this.props.rewardTypeList
      const {types} = this.props.challengeTypeList
      const currentType = types.find(t => t.id === parseInt(_.get(this.state, 'finalModel.type')))
      const defaultReward = {
        type: currentType.code === 'CC' ?
          rewardTypes.find(t => t.code === 'P').id :
          rewardTypes.find(t => t.code === 'T').id
      }
      // console.log(currentAward ? Object.assign({}, currentAward, { reward: currentAward.reward || defaultReward }) : this.state.currentAward);
      this.setState({
        ...this.state,
        currentAwards: awards || this.state.currentAwards,
        currentAward: currentAward ?
          Object.assign({}, currentAward, { reward: currentAward.reward ? Object.assign({}, currentAward.reward, defaultReward) : defaultReward }) :
          this.state.currentAward,
        // currentAward: currentAward || this.state.currentAward,
        currentAwardIndex: currentAwardIndex !== undefined ? currentAwardIndex : this.state.currentAwardIndex,
        setAwards: setAwards || this.state.setAwards,
        configRewardOpen: value
      })
    }


    renderData() {
        const {categories} = this.props.categoryList
        const {types: awardTypes} = this.props.challengeAwardTypeList
        const {types: rewardTypes} = this.props.challengeRewardTypeList
        const {images} = this.props.challengeImageList
        const {images: rewardImages} = this.props.rewardImageList
        const {period} = this.props.currentPeriodDetail
        const {types} = this.props.challengeTypeList
        const {loading} = this.props.challengeCreation
        const {kpis} = this.props.kpiList
        const team = this.props.match.params.id
        const { teams } = this.props.teamList;
        const { account } = this.props.accountDetail;
        const criticities = [
          {order: 1, name: 'Basse'},
          {order: 2, name: 'Moyenne'},
          {order: 3, name: 'Haute'}
        ]

        return (
            <div>
                <Stepper steps={this.state.steps} />
                <Formsy ref={this.form} onValidSubmit={this.handleValidSubmit.bind(this)}>
                    <ChallengeFormStepper
                        actionLoading={loading}
                        awardTypes={awardTypes}
                        rewardTypes={rewardTypes}
                        categories={categories}
                        goalAdding={this.state.goalAdding}
                        images={images}
                        isCreation
                        kpis={kpis}
                        period={period}
                        team={team}
                        teams={teams.filter(t => _.get(account, 'role.code') !== 'M' || _.get(account, 'team.id') === t.id )}
                        types={types}
                        onGoalAdded={this.handleGoalAdded.bind(this)}

                        currentStep={this.getCurrentStep()}
                        isLastStep={this.isLastStep()}
                        setStart={this.setStart}
                        setEnd={this.setEnd}
                        setType={this.setType}
                        setCustomImage={this.setCustomImage}
                        setParticipants={this.setParticipants}
                        setAwardType={this.setAwardType}
                        handlePreviousStep={this.handlePreviousStep}
                        handleNextStep={_.get(this.form, 'current.submit')}
                        handleAddGoal={this.handleAddGoal}
                        challenge={this.state.finalModel}
                        setNewKpiOpen={this.setNewKpiOpen}
                        setConfigRewardOpen={this.setConfigRewardOpen}
                        rewardImages={rewardImages}
                    />
                </Formsy>

                <Dialog
                    open={this.state.newKpiOpen}
                    onClose={() => this.setNewKpiOpen(false)}
                    classes={{ paper: this.props.classes.kpiDialog }}
                >
                    <DialogTitle>Demande de création de KPI</DialogTitle>
                    <Formsy onValidSubmit={this.handleSubmitKpi} >
                      <Grid container direction="column" spacing={2} >
                        <Grid item>
                          <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Select name='criticity' label={Resources.ADMIN_GOAL_CREATION_CRITICITY_LABEL} options={criticities} optionValueName='order' optionTextName='name' fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Select name='category' label={Resources.ADMIN_GOAL_CREATION_CATEGORY_LABEL} options={categories} optionValueName='id' optionTextName='name' fullWidth />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField name='name' label={Resources.ADMIN_GOAL_CREATION_KPI_NAME_LABEL} fullWidth required />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField name='description' label={Resources.ADMIN_GOAL_CREATION_DESCRIPTION_LABEL} fullWidth required multiline rows={4} variant="outlined"/>
                        </Grid>
                      </Grid>
                      <DialogActions>
                          <ProgressButton type='submit' text={Resources.ADMIN_GOAL_CREATION_SUBMIT_BUTTON} centered />
                          <Button onClick={() => this.setNewKpiOpen(false)} color="secondary">Annuler</Button>
                      </DialogActions>
                    </Formsy>
                </Dialog>
                <Dialog
                    open={this.state.configRewardOpen}
                    onClose={() => this.setConfigRewardOpen(false)}
                    classes={{ paper: this.props.classes.kpiDialog }}
                >
                    <DialogTitle>Création de récompense</DialogTitle>
                    <Formsy onValidSubmit={this.handleSubmitReward} >
                      <ChallengeRewardForm reward={_.get(this.state, 'currentAward.reward')}/>
                      <DialogActions>
                          <ProgressButton type='submit' text={Resources.ADMIN_GOAL_CREATION_SUBMIT_BUTTON} centered />
                          <Button onClick={() => this.setConfigRewardOpen(false)} color="secondary">Annuler</Button>
                      </DialogActions>
                    </Formsy>
                </Dialog>
            </div>
        )
    }

    render() {
        const {categories, loading: categoryListLoading} = this.props.categoryList
        const {types: awardTypes, loading: challengeAwardTypeListLoading} = this.props.challengeAwardTypeList
        const {types: challengeRewardTypes, loading: challengeRewardTypeListLoading} = this.props.challengeRewardTypeList
        const {types: rewardTypes, loading: rewardTypeListLoading} = this.props.rewardTypeList
        const {images, loading: challengeImageListLoading} = this.props.challengeImageList

        const {types, loading: challengeTypeListLoading} = this.props.challengeTypeList
        const {success} = this.props.challengeCreation
        const {period, loading: currentPeriodDetailLoading} = this.props.currentPeriodDetail
        const {kpis, loading: kpiListLoading} = this.props.kpiList
        const { teams, loading: teamLoading } = this.props.teamList;
        const loading = categoryListLoading || challengeAwardTypeListLoading || challengeImageListLoading || challengeTypeListLoading || currentPeriodDetailLoading || kpiListLoading || teamLoading || challengeRewardTypeListLoading

        const { account } = this.props.accountDetail;


        if(!account.hasChallengeAccess) {
          return <Redirect to={'/'} />
        }

        if (success) {
            this.props.challengeCreationActions.clearChallengeCreation()
            this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints()
            this.props.history.goBack()
        }

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && awardTypes && challengeRewardTypes && categories && period && images && types && kpis && teams && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, categoryList, challengeAwardTypeList, challengeRewardTypeList, rewardTypeList, challengeCreation, challengeImageList, challengeTypeList, currentPeriodDetail, kpiList, rewardImageList, teamList}) => ({
    categoryList,
    accountDetail,
    challengeAwardTypeList,
    challengeRewardTypeList,
    rewardTypeList,
    challengeCreation,
    challengeImageList,
    challengeTypeList,
    currentPeriodDetail,
    kpiList,
    rewardImageList,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    challengeAwardTypeListActions: bindActionCreators(challengeAwardTypeListActions, dispatch),
    challengeRewardTypeListActions: bindActionCreators(challengeRewardTypeListActions, dispatch),
    challengeCreationActions: bindActionCreators(challengeCreationActions, dispatch),
    challengeDetailActions: bindActionCreators(challengeDetailActions, dispatch),
    challengeImageListActions: bindActionCreators(challengeImageListActions, dispatch),
    challengeTypeListActions: bindActionCreators(challengeTypeListActions, dispatch),
    challengeTypeUsablePointsActions: bindActionCreators(challengeTypeUsablePointsActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch),
    kpiCreationActions: bindActionCreators(kpiCreationActions, dispatch),
    rewardImageListActions: bindActionCreators(rewardImageListActions, dispatch),
    rewardTypeListActions: bindActionCreators(rewardTypeListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChallengeCreation))
