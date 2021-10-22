import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Redirect } from 'react-router-dom'
import {AppBarSubTitle, IconButton as MenuIconButton, Loader, MainLayoutComponent, Stepper} from "../../../../components"
import * as challengeCreationActions from '../../../../services/Challanges/ChallangeCreaton/actions'
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import * as Resources from "../../../../Resources"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import Formsy from "formsy-react"
import {ChallengeFormStepper} from "../../components/ChallengeFormStepper"
import * as categoryListActions from "../../../../services/Categories/CategoryList/actions"
import * as challengeAwardTypeListActions from "../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions"
import * as challengeDetailActions from "../../../../services/Challanges/ChallengeDetail/actions"
import * as challengeImageListActions from "../../../../services/ChallengeImages/ChallengeImageList/actions"
import * as challengeTypeListActions from "../../../../services/ChallengeTypes/ChallengeTypeList/actions"
import * as currentPeriodDetailActions from "../../../../services/Periods/CurrentPeriodDetail/actions"
import * as kpiListActions from "../../../../services/Kpis/KpiList/actions"
import * as teamListActions from "../../../../services/Teams/TeamList/actions"
import _ from 'lodash'

class ChallengeDuplication extends MainLayoutComponent {
    state = {
      goalAdding: false,
      steps: [
        { order: 1, name: 'Type', active: true},
        { order: 2, name: 'Informations'},
        { order: 3, name: 'Participants'},
        { order: 4, name: 'indicateurs et mécanismes'},
        { order: 5, name: 'Récompenses'},
        // { order: 6, name: 'Options'},
        { order: 6, name: 'Validation'},
      ],
      initialized: false,
      finalModel: {},
      participants: []
    }

    constructor(props) {
        super(props)
        this.props.challengeCreationActions.clearChallengeCreation()
        this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints()
    }

    handleAddGoal = () => {
        this.setState({
            ...this.state,
            goalAdding: 1
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id
        const { account } = this.props.accountDetail;

        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_LONG_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.CHALLENGE_DUPLICATION_TITLE} />)
        this.props.handleMaxWidth('md')
        this.props.activateReturn()
        this.props.categoryListActions.getActiveCategoryList()
        this.props.challengeAwardTypeListActions.getChallengeAwardTypeList()
        this.props.challengeDetailActions.getChallengeDetail(id)
        this.props.challengeImageListActions.getChallengeImageList()
        this.props.challengeTypeListActions.getUsableChallengeTypeList()
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail()
        this.props.kpiListActions.getKpiList()
        this.props.teamListActions.getTeamList()
        const params = new URLSearchParams(window.location.search)
        const teamParam = params.get('team')
        this.teamId = teamParam ? Number(teamParam) : null
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

    getCurrentStep = () => {
      return this.state.steps.find(step => step.active === true)
    }

    setActiveStep = (newActiveStep) => {
      this.setState({
        ...this.state,
        steps: this.state.steps.map(step => step.order === newActiveStep.order ? Object.assign(step, {active: true}) : Object.assign(step, {active: false}))
      })
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
          finalModel: Object.assign(this.state.finalModel, model, {
            participants: this.state.participants,
            goals: model.kpi ? goals : this.state.finalModel.goals,
            awards: model.award ? awards : this.state.finalModel.awards
          })
        })
      }
      const checkValidation = (
        (currentStep.order !== 3 || _.get(this.state.participants, 'length', 0) > 0) &&
        (currentStep.order !== 1 || this.state.finalModel.awardType)
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
      this.setState({
        ...this.state,
        finalModel: Object.assign(this.state.finalModel, {awardType})
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

    async handleValidSubmit(model) {
      const currentStep = this.getCurrentStep()
      const nextStep = this.state.steps.find(step => step.order === currentStep.order + 1)

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
        challengeFormData.append('live', finalModel.live ? finalModel.live : false)
        challengeFormData.append('participants', participants)

        if(Number.isInteger(finalModel.image)) {
          challengeFormData.append('image', finalModel.image)
        } else {
          challengeFormData.append('customImage', finalModel.image)
        }


        // // Set custom image if exists
        // let image
        // if(finalModel.image.id) {
        //   image = {
        //     image: finalModel.image
        //   }
        // }
        // else if(typeof finalModel.customImage === 'string' || finalModel.customImage instanceof String) {
        //   // Make blob file from url for dupplication
        //
        //   const splitFile = finalModel.customImage.split('/')
        //   const fileName = splitFile[splitFile.length - 1]
        //   let file = await fetch(finalModel.customImage).then(r => r.blob()).then(blobFile => new File([blobFile], fileName, { type: `${fileName.split('.')[1]}` }))
        //
        //   challengeFormData.append('customImage', file)
        //   image = {
        //     customImage: file
        //   }
        // } else {
        //   image = {
        //     customImage: finalModel.image
        //   }
        // }

        // Set custom image if exists
        const image = finalModel.image.id ? {
          image: finalModel.image
        } : {
          customImage: finalModel.image
        }


        let challenge = Object.assign({
          name: finalModel.name,
          description: JSON.stringify(finalModel.description),
          start: start,
          end: end,
          type: finalModel.type,
          award_type: finalModel.awardType,
          live: finalModel.live ? finalModel.live : false,
          participants: participants

        }, image)


        const teamId = types.find(x => x.id == finalModel.type && x.code == 'CM') != null && this.props.match.params.id ? this.props.match.params.id : null

        if (typeof finalModel.image === 'string' || finalModel.image instanceof String) {

          var filename = finalModel.image.split('/').pop()
          var blob = null
          var xhr = new XMLHttpRequest()
          xhr.open("GET", finalModel.image)
          xhr.responseType = "blob"
          xhr.onload = function()
          {
            blob = xhr.response
            challenge = Object.assign(challenge, {customImage: blob})
            challengeFormData.append('customImage', blob, filename)
            this.props.challengeCreationActions.createChallenge(challenge, challengeFormData, finalModel.awards, finalModel.goals, teamId)
          }.bind(this)
          xhr.send()
        } else {
          this.props.challengeCreationActions.createChallenge(challenge, challengeFormData, finalModel.awards, finalModel.goals, teamId)
        }
      }
    }

    challengeToModel = (challenge) => {
      const {teams} = this.props.teamList
      const participants = challenge.type.code === "CT" ?
        _.flatten(teams.filter(team => challenge.participants.map(p => p.id).indexOf(team.id) >= 0).map(team => team.collaborators)) :
        challenge.participants

      return {
        name: challenge.name,
        description: JSON.parse(challenge.description),
        image: _.get(challenge, 'image.id'),
        customImage: challenge.customImage,
        awardType: _.get(challenge, 'award_type'),
        type: _.get(challenge, 'type.id'),
        live: _.get(challenge, 'live'),
        // start: _.get(challenge, 'start').toDate2(),
        // end: _.get(challenge, 'end').toDate2(),
        participants: participants,
        awards: _.get(challenge, 'awards'),
        goals: _.get(challenge, 'goals').map(goal => Object.assign(goal, {kpi: goal.kpi.id})),
      }
    }

    renderData() {
        const {categories} = this.props.categoryList
        const {types: awardTypes} = this.props.challengeAwardTypeList
        const {challenge} = this.props.challengeDetail
        const {images} = this.props.challengeImageList
        const {period} = this.props.currentPeriodDetail
        const {types} = this.props.challengeTypeList
        const {loading} = this.props.challengeCreation
        const {kpis} = this.props.kpiList
        const {teams} = this.props.teamList
        const { account } = this.props.accountDetail;

        if(!this.state.initialized) {
          const finalModel = this.challengeToModel(challenge)
          this.setState({
            ...this.state,
            initialized: true,
            finalModel: finalModel,
            participants: finalModel.participants
          })
        }
        return (
            <div>
                <Stepper steps={this.state.steps} />
                <Formsy ref='form' onValidSubmit={this.handleValidSubmit.bind(this)}>
                    <ChallengeFormStepper
                        actionLoading={loading}
                        awardTypes={awardTypes}
                        categories={categories}
                        challenge={challenge}
                        goalAdding={this.state.goalAdding}
                        images={images}
                        isDuplication
                        kpis={kpis}
                        period={period}
                        team={this.teamId}
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
                        teams={teams.filter(t => _.get(account, 'role.code') !== 'M' || _.get(account, 'team.id') === t.id )}
                    />
                </Formsy>
            </div>
        )
    }

    render() {
        const {categories, loading: categoryListLoading} = this.props.categoryList
        const {types: awardTypes, loading: challengeAwardTypeListLoading} = this.props.challengeAwardTypeList
        const {challenge, loading: challengeDetailLoading} = this.props.challengeDetail
        const {images, loading: challengeImageListLoading} = this.props.challengeImageList
        const {types, loading: challengeTypeListLoading} = this.props.challengeTypeList
        const {success} = this.props.challengeCreation
        const {period, loading: currentPeriodDetailLoading} = this.props.currentPeriodDetail
        const {kpis, loading: kpiListLoading} = this.props.kpiList
        const {teams, loading: teamListLoading} = this.props.teamList
        const loading = categoryListLoading || challengeAwardTypeListLoading || challengeDetailLoading || challengeImageListLoading || challengeTypeListLoading || currentPeriodDetailLoading || kpiListLoading || teamListLoading

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
                {!loading && awardTypes && categories && challenge && period && images && types && kpis && teams && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({categoryList, challengeAwardTypeList, challengeCreation, challengeDetail, challengeImageList, challengeTypeList, currentPeriodDetail, kpiList, accountDetail, teamList}) => ({
    categoryList,
    accountDetail,
    challengeAwardTypeList,
    challengeCreation,
    challengeDetail,
    challengeImageList,
    challengeTypeList,
    currentPeriodDetail,
    kpiList,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    challengeAwardTypeListActions: bindActionCreators(challengeAwardTypeListActions, dispatch),
    challengeCreationActions: bindActionCreators(challengeCreationActions, dispatch),
    challengeDetailActions: bindActionCreators(challengeDetailActions, dispatch),
    challengeImageListActions: bindActionCreators(challengeImageListActions, dispatch),
    challengeTypeListActions: bindActionCreators(challengeTypeListActions, dispatch),
    challengeTypeUsablePointsActions: bindActionCreators(challengeTypeUsablePointsActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDuplication)
