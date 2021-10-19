import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from "formsy-react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import {ChallengeForm} from '../../components'
import {AppBarSubTitle, IconButton as MenuIconButton, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as challengeAwardTypeListActions from '../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions'
import * as challengeDetailActions from '../../../../services/Challanges/ChallengeDetail/actions'
import * as challengeImageListActions from '../../../../services/ChallengeImages/ChallengeImageList/actions'
import * as challengeTypeListActions from '../../../../services/ChallengeTypes/ChallengeTypeList/actions'
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import * as challengeUpdateActions from '../../../../services/Challanges/ChallengeUpdate/actions'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'

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
            goalAdding: 1
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
        this.props.challengeDetailActions.getChallengeDetail(id)
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

    handleValidSubmit(model) {
        const { types } = this.props.challengeTypeList
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
            award_type: model.awardType,
            live: model.live ? model.live : false
        }, image)

        var goals = []
        for (var i = 0; i < model.kpi.length; i++) {
            goals.push({ number: model.number[i], name: model.goalName[i], kpi: model.kpi[i], target: model.target[i], points: model.points[i], challenge: challenge.id })
        }
        var awards = []
        for (var i = 0; i < model.award.length; i++) {
            const rank = i + 1
            awards.push({ rank: rank, points: model.award[i], challenge: challenge.id })
        }
        const teamId = types.find(x => x.id == model.type && x.code == 'CM') != null && this.props.match.params.id ? this.props.match.params.id : null
        this.props.challengeUpdateActions.updateChallenge(challenge, challengeFormData, awards, goals)
    }

    renderData() {
        const {categories} = this.props.categoryList
        const {types: awardTypes} = this.props.challengeAwardTypeList
        const {challenge} = this.props.challengeDetail
        const {images} = this.props.challengeImageList
        const {period} = this.props.currentPeriodDetail
        const {types} = this.props.challengeTypeList
        const {loading} = this.props.challengeUpdate
        const {kpis} = this.props.kpiList
        const {teams} = this.props.teamList

        return (
            <div>
                <Formsy ref='form' onValidSubmit={this.handleValidSubmit.bind(this)}>
                    <ChallengeForm
                        actionLoading={loading}
                        awardTypes={awardTypes}
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
        const {success} = this.props.challengeUpdate
        const {period, loading: currentPeriodDetailLoading} = this.props.currentPeriodDetail
        const {kpis, loading: kpiListLoading} = this.props.kpiList
        const {teams, loading: teamListLoading} = this.props.teamList
        const loading = categoryListLoading || challengeAwardTypeListLoading || challengeDetailLoading || challengeImageListLoading || challengeTypeListLoading || currentPeriodDetailLoading || kpiListLoading || teamListLoading

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
                {!loading && awardTypes && categories && challenge && period && images && types && kpis && teams && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({categoryList, challengeAwardTypeList, challengeDetail, challengeImageList, challengeTypeList, challengeUpdate, currentPeriodDetail, kpiList, accountDetail, teamList}) => ({
    categoryList,
    accountDetail,
    challengeAwardTypeList,
    challengeDetail,
    challengeImageList,
    challengeTypeList,
    challengeUpdate,
    currentPeriodDetail,
    kpiList,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    challengeAwardTypeListActions: bindActionCreators(challengeAwardTypeListActions, dispatch),
    challengeDetailActions: bindActionCreators(challengeDetailActions, dispatch),
    challengeImageListActions: bindActionCreators(challengeImageListActions, dispatch),
    challengeTypeListActions: bindActionCreators(challengeTypeListActions, dispatch),
    challengeTypeUsablePointsActions: bindActionCreators(challengeTypeUsablePointsActions, dispatch),
    challengeUpdateActions: bindActionCreators(challengeUpdateActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeUpdate)
