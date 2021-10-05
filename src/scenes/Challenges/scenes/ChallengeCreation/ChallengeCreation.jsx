import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from "formsy-react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import {ChallengeFormStepper} from '../../components'
import {AppBarSubTitle, IconButton as MenuIconButton, Loader, MainLayoutComponent, Stepper} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryListActions from "../../../../services/Categories/CategoryList/actions"
import * as challengeAwardTypeListActions from "../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions"
import * as challengeCreationActions from '../../../../services/Challanges/ChallangeCreaton/actions'
import * as challengeDetailActions from "../../../../services/Challanges/ChallengeDetail/actions"
import * as challengeImageListActions from "../../../../services/ChallengeImages/ChallengeImageList/actions"
import * as challengeTypeListActions from "../../../../services/ChallengeTypes/ChallengeTypeList/actions"
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import * as currentPeriodDetailActions from "../../../../services/Periods/CurrentPeriodDetail/actions"
import * as kpiListActions from "../../../../services/Kpis/KpiList/actions"
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import _ from 'lodash'

class ChallengeCreation extends MainLayoutComponent {
    state = {
      goalAdding: false,
      steps: [
        { order: 1, name: 'Type', active: true},
        { order: 2, name: 'Informations'},
        { order: 3, name: 'Participants'},
        { order: 4, name: 'indicateurs et conditions'},
        { order: 5, name: 'Récompenses'},
        { order: 6, name: 'Options'},
        { order: 7, name: 'Validation'},
      ],
      finalModel: {},
      participants: []
    }

    constructor(props) {
        super(props)
        this.props.challengeCreationActions.clearChallengeCreation()
        this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints()
        this.form = React.createRef();
    }

    handleAddGoal() {
        this.setState({
            ...this.state,
            goalAdding: 1
        })
    }

    componentDidMount() {
        const { account } = this.props.accountDetail;
        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_LONG_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.CHALLENGE_CREATION_TITLE} />)
        this.props.handleButtons(<MenuIconButton size={'small'} onClick={this.handleAddGoal.bind(this)}><FontAwesomeIcon icon={faPlus} /></MenuIconButton>)
        this.props.handleMaxWidth('md')
        this.props.activateReturn()
        this.props.categoryListActions.getActiveCategoryList()
        this.props.challengeAwardTypeListActions.getChallengeAwardTypeList()
        this.props.challengeImageListActions.getChallengeImageList()
        this.props.challengeTypeListActions.getUsableChallengeTypeList()
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail()
        this.props.kpiListActions.getKpiList()
        this.props.teamListActions.getTeamList()
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
      // if(currentStep.order !== 3 || _.get(this.state.participants, 'length', 0) > 0) {
      //   if(model.type && this.state.finalModel.type !== model.type) {
      //     this.setParticipants([], apply)
      //   } else {
          apply()
      //   }
      // }
    }

    setParticipants = (participants, callback) => {
      this.setState({
          ...this.state,
          participants: participants
      }, callback)
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
        if(nextStep) {
          this.changeStep(model)
        } else {
          const { types } = this.props.challengeTypeList
          model.start.setHours(0, 0, 0, 0)
          model.end.setHours(23, 59, 59, 0)
          const start = model.start.toUTCJSON();
          const end = model.end.toUTCJSON();

          const challengeFormData = new FormData()
          challengeFormData.append('name', model.name)
          challengeFormData.append('description', JSON.stringify(model.description))
          challengeFormData.append('start', start)
          challengeFormData.append('end', end)
          challengeFormData.append('type', model.type)
          challengeFormData.append('award_type', model.awardType)
          challengeFormData.append('live', model.live ? model.live : false)
          if(Number.isInteger(model.image)) {
            challengeFormData.append('image', model.image)
          } else {
            challengeFormData.append('customImage', model.image)
          }


          // Set custom image if exists
          const image = model.image.id ? {
            image: model.image
          } : {
            customImage: model.image
          }
          const challenge = Object.assign({
            name: model.name,
            description: JSON.stringify(model.description),
            start: start,
            end: end,
            type: model.type,
            award_type: model.awardType,
            live: model.live ? model.live : false
          }, image)


          const teamId = types.find(x => x.id == model.type && x.code == 'CM') != null && this.props.match.params.id ? this.props.match.params.id : null
          this.props.challengeCreationActions.createChallenge(challenge, challengeFormData, model.awards, model.goals, teamId)
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

    renderData() {
        const {categories} = this.props.categoryList
        const {types: awardTypes} = this.props.challengeAwardTypeList
        const {images} = this.props.challengeImageList
        const {period} = this.props.currentPeriodDetail
        const {types} = this.props.challengeTypeList
        const {loading} = this.props.challengeCreation
        const {kpis} = this.props.kpiList
        const team = this.props.match.params.id
        const { teams } = this.props.teamList;
        const { account } = this.props.accountDetail;

        return (
            <div>
                <Stepper steps={this.state.steps} />
                <Formsy ref={this.form} onValidSubmit={this.handleValidSubmit.bind(this)}>
                    <ChallengeFormStepper
                        actionLoading={loading}
                        awardTypes={awardTypes}
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
                        handlePreviousStep={this.handlePreviousStep}
                        handleNextStep={_.get(this.form, 'current.submit')}
                        challenge={this.state.finalModel}
                    />
                </Formsy>
            </div>
        )
    }

    render() {
        const {categories, loading: categoryListLoading} = this.props.categoryList
        const {types: awardTypes, loading: challengeAwardTypeListLoading} = this.props.challengeAwardTypeList
        const {images, loading: challengeImageListLoading} = this.props.challengeImageList
        const {types, loading: challengeTypeListLoading} = this.props.challengeTypeList
        const {success} = this.props.challengeCreation
        const {period, loading: currentPeriodDetailLoading} = this.props.currentPeriodDetail
        const {kpis, loading: kpiListLoading} = this.props.kpiList
        const { teams, loading: teamLoading } = this.props.teamList;
        const loading = categoryListLoading || challengeAwardTypeListLoading || challengeImageListLoading || challengeTypeListLoading || currentPeriodDetailLoading || kpiListLoading || teamLoading

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
                {!loading && awardTypes && categories && period && images && types && kpis && teams && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, categoryList, challengeAwardTypeList, challengeCreation, challengeImageList, challengeTypeList, currentPeriodDetail, kpiList, teamList}) => ({
    categoryList,
    accountDetail,
    challengeAwardTypeList,
    challengeCreation,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCreation)
