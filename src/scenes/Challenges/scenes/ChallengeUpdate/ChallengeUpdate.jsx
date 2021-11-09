import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from "formsy-react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import {withStyles} from "@material-ui/core/styles";
import {ChallengeForm, ChallengeRewardForm} from '../../components'
import {AppBarSubTitle, IconButton as MenuIconButton, Loader, MainLayoutComponent, Dialog, DialogTitle, DialogActions, ProgressButton, Button} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions'
import * as challengeAwardTypeListActions from '../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions'
import * as challengeRewardTypeListActions from '../../../../services/ChallengeRewardTypes/ChallengeRewardTypeList/actions'
import * as challengeDetailActions from '../../../../services/Challanges/ChallengeDetail/actions'
import * as challengeImageListActions from '../../../../services/ChallengeImages/ChallengeImageList/actions'
import * as challengeTypeListActions from '../../../../services/ChallengeTypes/ChallengeTypeList/actions'
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import * as challengeUpdateActions from '../../../../services/Challanges/ChallengeUpdate/actions'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import _ from 'lodash'

const styles = {
  kpiDialog: {
    width: 900
  }
}

class ChallengeUpdate extends MainLayoutComponent {
    state = {goalAdding: false}

    constructor(props) {
        super(props)
        this.props.challengeUpdateActions.clearChallengeUpdate()
        this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints()
    }

    handleAddGoal() {
        this.setState({
            ...this.state,
            goalAdding: 1,
            configRewardOpen: false,
            currentAwards: [],
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id
        const { account } = this.props.accountDetail;

        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_LONG_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.CHALLENGE_UPDATE_TITLE} />)
        this.props.handleMaxWidth('md')
        this.props.activateReturn()
        this.props.categoryListActions.getActiveCategoryList()
        this.props.challengeAwardTypeListActions.getChallengeAwardTypeList()
        this.props.challengeRewardTypeListActions.getChallengeRewardTypeList()
        this.props.challengeDetailActions.getChallengeDetail(id)
        this.props.challengeImageListActions.getChallengeImageList()
        this.props.challengeTypeListActions.getUsableChallengeTypeList()
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail()
        this.props.kpiListActions.getKpiList()

        this.props.teamListActions.getTeamList()
    }
    componentWillReceiveProps() {
      const {challenge} = this.props.challengeDetail
      if(challenge && challenge.id !== this.state.challengeId) {
        this.setState({
          ...this.state,
          challengeId: challenge.id,
          currentAwards: challenge.awards
        })
      }
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

    handleValidSubmit(model) {
        const { types } = this.props.challengeTypeList
        const {types: rewardTypes} = this.props.challengeRewardTypeList
        const {types: awardTypes} = this.props.challengeAwardTypeList

        model.start.setHours(0, 0, 0, 0)
        model.end.setHours(23, 59, 59, 0)
        const start = model.start.toUTCJSON();
        const end = model.end.toUTCJSON();

        const challengeFormData = new FormData()
        challengeFormData.append('id', this.props.match.params.id)
        challengeFormData.append('name', model.name)
        challengeFormData.append('description', JSON.stringify(model.description))
        challengeFormData.append('start', start)
        challengeFormData.append('end', end)
        challengeFormData.append('type', model.type)
        challengeFormData.append('award_type', model.awardType)
        challengeFormData.append('reward_type', model.rewardType)
        challengeFormData.append('live', model.live ? model.live : false)

        if(Number.isInteger(model.image)) {
          challengeFormData.append('image', model.image)
          // challengeFormData.append('customImage', null)
        }
        if(model.image instanceof Blob){
          // challengeFormData.append('image', null)
          challengeFormData.append('customImage', model.image)
        }


        // Set custom image if exists
        const image = model.image.id ? {
          image: model.image
        } : {
          customImage: model.image
        }
        const challenge = Object.assign({
            id: this.props.match.params.id,
            name: model.name,
            description: JSON.stringify(model.description),
            start: model.start,
            end: model.end,
            type: model.type,
            reward_type: model.rewardType,
            award_type: model.awardType,
            live: model.live ? model.live : false
        }, image)

        var goals = []
        for (var i = 0; i < model.kpi.length; i++) {
            goals.push({ number: model.number[i], name: model.goalName[i], kpi: model.kpi[i], target: model.target[i], points: model.points[i], challenge: challenge.id })
        }
        const currentRewardType = rewardTypes.find(rewardType => rewardType.id === parseInt(challenge.reward_type))
        const currentAwardType = awardTypes.find(awardType => awardType.id === parseInt(challenge.award_type))
        let awards = []
        if(_.get(currentRewardType, 'code') === 'G') {
          awards = this.state.currentAwards.filter(award => {
            return !!award.reward
          }).map((award, index) => {
            if(model.awardTarget) {
              return Object.assign({}, award, {
                target: model.awardTarget[index]
              })
            }
            return award
          })

        } else {
          for (var i = 0; i < model.award.length; i++) {
            const rank = i + 1
            awards.push({ rank: rank, points: model.award[i], challenge: challenge.id })
          }
        }

        const teamId = types.find(x => x.id == model.type && x.code == 'CM') != null && this.props.match.params.id ? this.props.match.params.id : null
        this.props.challengeUpdateActions.updateChallenge(challenge, challengeFormData, awards, goals)
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
      this.setState({
        ...this.state,
        currentAwards: awards || this.state.currentAwards,
        currentAward: currentAward || this.state.currentAward,
        currentAwardIndex: currentAwardIndex !== undefined ? currentAwardIndex : this.state.currentAwardIndex,
        setAwards: setAwards || this.state.setAwards,
        configRewardOpen: value
      })
    }


    renderData() {
        const {categories} = this.props.categoryList
        const {types: awardTypes} = this.props.challengeAwardTypeList
        const {types: rewardTypes} = this.props.challengeRewardTypeList
        const {challenge} = this.props.challengeDetail
        const {images: rewardImages} = this.props.rewardImageList
        const {images} = this.props.challengeImageList
        const {period} = this.props.currentPeriodDetail
        const {types} = this.props.challengeTypeList
        const {loading} = this.props.challengeUpdate
        const {kpis} = this.props.kpiList
        const {teams} = this.props.teamList
        const {classes} = this.props




        // const currentReward = _.isString(_.get(this.state, 'currentAward.reward.description')) ?
        //   _.get(this.state, 'currentAward.reward') :
        //   Object.assign({}, _.get(this.state, 'currentAward.reward'), {
        //     description: JSON.parse(_.get(this.state, 'currentAward.reward.description'))
        //   })
        return (
            <div>
                <Formsy ref='form' onValidSubmit={this.handleValidSubmit.bind(this)}>
                    <ChallengeForm
                        actionLoading={loading}
                        awardTypes={awardTypes}
                        rewardTypes={rewardTypes}
                        categories={categories}
                        challenge={challenge}
                        goalAdding={this.state.goalAdding}
                        images={images}
                        isUpdate
                        kpis={kpis}
                        period={period}
                        types={types}
                        onGoalAdded={this.handleGoalAdded.bind(this)}
                        addGoal={this.handleAddGoal.bind(this)}
                        teams={teams}
                        setConfigRewardOpen={this.setConfigRewardOpen}
                        rewardImages={rewardImages}
                    />
                </Formsy>
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
        const {types: rewardTypes, loading: challengeRewardTypeListLoading} = this.props.challengeRewardTypeList
        const {challenge, loading: challengeDetailLoading} = this.props.challengeDetail
        const {images, loading: challengeImageListLoading} = this.props.challengeImageList
        const {types, loading: challengeTypeListLoading} = this.props.challengeTypeList
        const {success} = this.props.challengeUpdate
        const {period, loading: currentPeriodDetailLoading} = this.props.currentPeriodDetail
        const {kpis, loading: kpiListLoading} = this.props.kpiList
        const {teams, loading: teamListLoading} = this.props.teamList
        const loading = categoryListLoading || challengeAwardTypeListLoading || challengeRewardTypeListLoading || challengeDetailLoading || challengeImageListLoading || challengeTypeListLoading || currentPeriodDetailLoading || kpiListLoading || teamListLoading

        const { account } = this.props.accountDetail;
        if(!account.hasChallengeAccess) {
          return <Redirect to={'/'} />
        }

        if (success) {
            this.props.challengeUpdateActions.clearChallengeUpdate()
            this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints()
            this.props.history.goBack()
        }

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && awardTypes && rewardTypes && categories && challenge && period && images && types && kpis && teams && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({categoryList, challengeAwardTypeList, challengeRewardTypeList, challengeDetail, challengeImageList, challengeTypeList, challengeUpdate, currentPeriodDetail, kpiList, accountDetail, teamList, rewardImageList}) => ({
    categoryList,
    accountDetail,
    challengeAwardTypeList,
    challengeRewardTypeList,
    challengeDetail,
    challengeImageList,
    challengeTypeList,
    challengeUpdate,
    currentPeriodDetail,
    kpiList,
    rewardImageList,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    challengeAwardTypeListActions: bindActionCreators(challengeAwardTypeListActions, dispatch),
    challengeRewardTypeListActions: bindActionCreators(challengeRewardTypeListActions, dispatch),
    challengeDetailActions: bindActionCreators(challengeDetailActions, dispatch),
    challengeImageListActions: bindActionCreators(challengeImageListActions, dispatch),
    challengeTypeListActions: bindActionCreators(challengeTypeListActions, dispatch),
    challengeTypeUsablePointsActions: bindActionCreators(challengeTypeUsablePointsActions, dispatch),
    challengeUpdateActions: bindActionCreators(challengeUpdateActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch),
    rewardImageListActions: bindActionCreators(rewardImageListActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChallengeUpdate))
