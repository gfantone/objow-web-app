import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Redirect } from 'react-router-dom'
import {AppBarSubTitle, IconButton as MenuIconButton, Loader, MainLayoutComponent} from "../../../../components"
import * as challengeCreationActions from '../../../../services/Challanges/ChallangeCreaton/actions'
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import * as Resources from "../../../../Resources"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import Formsy from "formsy-react"
import {ChallengeForm} from "../../components/ChallengeForm"
import * as categoryListActions from "../../../../services/Categories/CategoryList/actions"
import * as challengeAwardTypeListActions from "../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions"
import * as challengeDetailActions from "../../../../services/Challanges/ChallengeDetail/actions"
import * as challengeImageListActions from "../../../../services/ChallengeImages/ChallengeImageList/actions"
import * as challengeTypeListActions from "../../../../services/ChallengeTypes/ChallengeTypeList/actions"
import * as currentPeriodDetailActions from "../../../../services/Periods/CurrentPeriodDetail/actions"
import * as kpiListActions from "../../../../services/Kpis/KpiList/actions"

class ChallengeDuplication extends MainLayoutComponent {
    state = {goalAdding: false}

    constructor(props) {
        super(props)
        this.props.challengeCreationActions.clearChallengeCreation()
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
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.CHALLENGE_DUPLICATION_TITLE} />)
        this.props.handleButtons(<MenuIconButton size={'small'} onClick={this.handleAddGoal.bind(this)}><FontAwesomeIcon icon={faPlus} /></MenuIconButton>)
        this.props.handleMaxWidth('md')
        this.props.activateReturn()
        this.props.categoryListActions.getActiveCategoryList()
        this.props.challengeAwardTypeListActions.getChallengeAwardTypeList()
        this.props.challengeDetailActions.getChallengeDetail(id)
        this.props.challengeImageListActions.getChallengeImageList()
        this.props.challengeTypeListActions.getUsableChallengeTypeList()
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail()
        this.props.kpiListActions.getKpiList()
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

    handleValidSubmit(model) {
        const { types } = this.props.challengeTypeList
        model.start.setHours(0, 0, 0, 0)
        model.end.setHours(23, 59, 59, 0)
        const challenge = {
            name: model.name,
            description: model.description,
            start: model.start,
            end: model.end,
            image: model.image,
            type: model.type,
            award_type: model.awardType,
            live: model.live ? model.live : false
        }
        var goals = []
        for (var i = 0; i < model.kpi.length; i++) {
            goals.push({ number: model.number[i], name: model.goalName[i], kpi: model.kpi[i], target: model.target[i], points: model.points[i] })
        }
        var awards = []
        for (var i = 0; i < model.award.length; i++) {
            const rank = i + 1
            awards.push({ rank: rank, points: model.award[i] })
        }
        const teamId = types.find(x => x.id == model.type && x.code === 'CM') != null && this.teamId ? this.teamId : null
        this.props.challengeCreationActions.createChallenge(challenge, awards, goals, teamId)
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
                        isDuplication
                        kpis={kpis}
                        period={period}
                        team={this.teamId}
                        types={types}
                        onGoalAdded={this.handleGoalAdded.bind(this)}
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
        const loading = categoryListLoading || challengeAwardTypeListLoading || challengeDetailLoading || challengeImageListLoading || challengeTypeListLoading || currentPeriodDetailLoading || kpiListLoading

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
                {!loading && awardTypes && categories && challenge && period && images && types && kpis && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({categoryList, challengeAwardTypeList, challengeCreation, challengeDetail, challengeImageList, challengeTypeList, currentPeriodDetail, kpiList, accountDetail}) => ({
    categoryList,
    accountDetail,
    challengeAwardTypeList,
    challengeCreation,
    challengeDetail,
    challengeImageList,
    challengeTypeList,
    currentPeriodDetail,
    kpiList
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
    kpiListActions: bindActionCreators(kpiListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDuplication)
