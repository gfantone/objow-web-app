import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {CardMedia, Grid, IconButton, Tooltip} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {ChallengeAwardList, ImageInput} from '../../components'
import '../../../../helpers/NumberHelper'
import '../../../../helpers/DateHelper'
import '../../../../helpers/FormsyHelper'
import '../../helpers/ChallengeFormsyHelper'
import {AppBarSubTitle, BlueText, Card, DatePicker, DefaultText, DefaultTitle, HiddenInput, IconButton as MenuIconButton, InfoText, Loader, MainLayoutComponent, ProgressButton, Select, TextField} from '../../../../components'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as challengeAwardTypeListActions from '../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions'
import * as challengeUpdateActions from '../../../../services/Challanges/ChallengeUpdate/actions'
import * as challengeDetailActions from '../../../../services/Challanges/ChallengeDetail/actions'
import * as challengeImageListActions from '../../../../services/ChallengeImages/ChallengeImageList/actions'
import * as challengeTypeListActions from '../../../../services/ChallengeTypes/ChallengeTypeList/actions'
import * as challengeTypeUsablePointsActions from '../../../../services/ChallengeTypes/ChallengeTypeUsablePoints/actions'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'

const styles = {
    image: {
        height: '100%',
        width: '100%'
    }
};

class ChallengeUpdate extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.key = 1;
        this.initialized = false;
        this.state = {
            start: null,
            end: null,
            type: null,
            image: null,
            goals: [{ key: this.key, category: null, kpi: null, goalName: null, target: null, points: null }]
        };
        this.props.challengeUpdateActions.clearChallengeUpdate();
        this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints()
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.handleTitle('Les challenges');
        this.props.handleSubHeader(<AppBarSubTitle title="Modification d'un challenge" />);
        this.props.handleButtons(<MenuIconButton size={'small'} onClick={this.handleAddGoal.bind(this)}><FontAwesomeIcon icon={faPlus} /></MenuIconButton>);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.challengeAwardTypeListActions.getChallengeAwardTypeList();
        this.props.categoryListActions.getActiveCategoryList();
        this.props.challengeDetailActions.getChallengeDetail(id);
        this.props.challengeTypeUsablePointsActions.getChallengeTypeUsablePointsByChallenge(id);
        this.props.challengeImageListActions.getChallengeImageList();
        this.props.challengeTypeListActions.getUsableChallengeTypeList();
        this.props.kpiListActions.getKpiList();
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { challenge } = this.props.challengeDetail;
        if (!this.initialized && challenge) {
            this.initialized = true;
            const goals = challenge.goals.map(x => ({ key: x.id, category: x.kpi.category ? x.kpi.category.id : null, kpi: x.kpi.id, goalName: x.name, target: x.target, points: x.points }));
            this.setState({
                ...this.state,
                start: challenge.start.toDate2(),
                end: challenge.end.toDate2(),
                type: challenge.type.id,
                goals: goals,
                awardType: challenge.award_type
            })
        }
    }

    handleAddGoal() {
        this.key += 1;
        var goals = this.state.goals;
        goals.push({ key: this.key, category: null, kpi: null, goalName: null, target: null, points: null });
        this.setState({
            ...this.state,
            goals: goals
        })
    }

    handleRemoveGoal = index => () => {
        var goals = this.state.goals;
        goals.splice(index, 1);
        this.setState({
            ...this.state,
            goals: goals
        })
    };

    handleCategoryChange = index => category => {
        var goals = this.state.goals;
        goals[index].category = category;
        goals[index].kpi = null;
        this.setState({
            ...this.state,
            goals: goals
        })
    };

    handleImageChange(image) {
        this.setState({
            ...this.state,
            image: image
        })
    }

    handlePeriodChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        }, () => {
            if (this.state.start && this.state.end) {
                this.props.challengeTypeUsablePointsActions.getChallengeTypeUsablePointsByChallenge(this.props.match.params.id, this.state.start, this.state.end)
            }
        })
    };

    handleValueChange = index => name => value => {
        var goals = this.state.goals;
        goals[index][name] = value;
        this.setState({
            ...this.state,
            goals: goals
        })
    };

    handleSubmit() {
        const { challenge: source } = this.props.challengeDetail;
        const model = this.refs.form.getModel();
        model.start.setHours(0, 0, 0, 0);
        model.end.setHours(23, 59, 59, 0);
        const challenge = {
            id: this.props.match.params.id,
            name: model.name,
            description: model.description,
            start: model.start,
            end: model.end,
            image: model.image,
            type: model.type,
            award_type: model.awardType
        };
        var goals = [];
        for (var i = 0; i < model.kpi.length; i++) {
            goals.push({ number: model.number[i], name: model.goalName[i], kpi: model.kpi[i], target: model.target[i], points: model.points[i], challenge: challenge.id })
        }
        var awards = [];
        for (var i = 0; i < model.award.length; i++) {
            awards.push({ id: source.awards[i].id, points: model.award[i] })
        }
        this.props.challengeUpdateActions.updateChallenge(challenge, awards, goals)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderGoal(index, goal = null) {
        const number = index + 1;
        const { categories } = this.props.categoryList;
        const { kpis } = this.props.kpiList;
        const displayKpis = goal.category ? kpis.filter(x => x.category && x.category.id == goal.category) : kpis;
        const kpi = goal.kpi ? kpis.find(x => x.id == goal.kpi) : null;
        const unit = kpi ? kpi.unit.name : null;

        return (
            <Grid key={goal.key} item xs={6}>
                <Card>
                    <Grid container spacing={2}>
                        <Grid item xs={12} container>
                            <Grid item xs>
                                <DefaultTitle>Indicateur {number}</DefaultTitle>
                                <HiddenInput name={`number[${index}]`} value={number} />
                            </Grid>
                            { this.state.goals.length > 1 && <Grid item>
                                <IconButton size='small' onClick={this.handleRemoveGoal(index).bind(this)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </IconButton>
                            </Grid> }
                        </Grid>
                        <Grid item xs={12}>
                            <Select name='category' label='Catégorie' emptyText={'Toutes'} options={categories} optionValueName='id' optionTextName='name' onChange={this.handleCategoryChange(index).bind(this)} fullWidth initial={goal.category} />
                        </Grid>
                        <Grid item xs={12}>
                            <Select name={`kpi[${index}]`} label='Kpi' options={displayKpis} initial={kpi ? kpi.id : null} optionValueName='id' optionTextName='name' onChange={this.handleValueChange(index)('kpi').bind(this)} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name={`goalName[${index}]`} label='Intitulé' onChange={this.handleValueChange(index)('goalName').bind(this)} fullWidth required initial={goal.goalName} />
                        </Grid>
                        <Grid item xs>
                            <DefaultText>Unité</DefaultText>
                            <InfoText>{unit}</InfoText>
                        </Grid>
                        <Grid item xs>
                            <TextField name={`target[${index}]`} label='Objectif' onChange={this.handleValueChange(index)('target').bind(this)} fullWidth required initial={goal.target} />
                        </Grid>
                        <Grid item>
                            <Tooltip title={'L’objectif fixé ici peut être atteint plusieurs fois. Chaque fois que celui-ci est atteint il rapporte le nombre de points associés.'}>
                                <BlueText style={{ marginTop: 20 }}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </BlueText>
                            </Tooltip>
                        </Grid>
                        <Grid item xs>
                            <TextField name={`points[${index}]`} label='Pts' onChange={this.handleValueChange(index)('target').bind(this)} fullWidth required initial={goal.points} />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        )
    }

    renderData() {
        const { classes } = this.props;
        const { types: awardTypes } = this.props.challengeAwardTypeList;
        const { challenge } = this.props.challengeDetail;
        const { images } = this.props.challengeImageList;
        const { loading } = this.props.challengeUpdate;
        const { points, loading: challengeTypeUsablePointsLoading } = this.props.challengeTypeUsablePoints;
        var { types } = this.props.challengeTypeList;
        const { period } = this.props.currentPeriodDetail;
        const today = new Date();
        const startMinDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const startMaxDate = this.state.end ? this.state.end : period.end.toDate2();
        const endMinDate = this.state.start ? this.state.start : today;
        const image = this.state.image ? images.find(x => x.id == this.state.image) : images.find(x => x.id == challenge.image.id);
        const imagePath = image ? image.path : null;
        const isMaxAward = this.state.awardType == awardTypes[0].id;
        const usablePoints = points ? (!isMaxAward ? points.all : points.participant) : 0;
        const currentType = types.find(x => x.id == this.state.type);
        const currentTypeCode = currentType ? currentType.code : null;

        return (
            <Formsy ref='form' onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12} container spacing={1}>
                        <Grid item xs={12}>
                            <DefaultTitle>Informations</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <div>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField name='name' label='Nom' fullWidth required initial={challenge.name}
                                                               validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField name='description' label='Description' fullWidth multiline required initial={challenge.description}
                                                               validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { !imagePath && <Grid container justify={'center'} alignItems={'center'} style={{height: '100%'}}>
                                            <Grid item>
                                                <InfoText align={'center'}>Aucune image sélectionée</InfoText>
                                            </Grid>
                                        </Grid> }
                                        { imagePath && <CardMedia image={imagePath} className={classes.image} /> }
                                    </Grid>
                                    <Grid item xs={3}>
                                        <DatePicker name='start' label='Début' format='dd/MM/yyyy' initial={this.state.start} onChange={this.handlePeriodChange('start').bind(this)} minDate={startMinDate} maxDate={startMaxDate} clearable fullWidth required
                                                    validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <DatePicker name='end' label='Fin' format='dd/MM/yyyy' initial={this.state.end} onChange={this.handlePeriodChange('end').bind(this)} minDate={endMinDate} maxDate={period.end.toDate2()} clearable fullWidth required
                                                    validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Select name='type' label='Type' options={types} initial={this.state.type} onChange={this.handlePeriodChange('type').bind(this)} optionValueName='id' optionTextName='name' fullWidth required disabled
                                                validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ImageInput name={'image'} label={'Sélectionner une image...'} images={images} onChange={this.handleImageChange.bind(this)} required initial={challenge.image.id} />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <ChallengeAwardList awards={challenge.awards} awardTypes={awardTypes} challengeTypeCode={currentTypeCode} initialAwardTypeId={challenge.award_type} readonly usablePoints={usablePoints} usablePointsLoading={challengeTypeUsablePointsLoading} />
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={12}>
                            <DefaultTitle>Indicateurs</DefaultTitle>
                        </Grid>
                        { this.state.goals.map((goal, index) => {
                            return this.renderGoal(index, goal)
                        }) }
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text='Valider' loading={loading} centered />
                    </Grid>
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { types: awardTypes, loading: challengeAwardTypeListLoading } = this.props.challengeAwardTypeList;
        const { categories, loading: categoryListLoading } = this.props.categoryList;
        const { challenge, loading: challengeDetailLoading } = this.props.challengeDetail;
        const { images, loading: challengeImageListLoading } = this.props.challengeImageList;
        const { types, loading: challengeTypeListLoading } = this.props.challengeTypeList;
        const { kpis, loading: kpiListLoading } = this.props.kpiList;
        const { period, loading: periodDetailLoading } = this.props.currentPeriodDetail;
        const { success } = this.props.challengeUpdate;
        const loading = challengeAwardTypeListLoading || categoryListLoading || challengeDetailLoading || challengeImageListLoading || challengeTypeListLoading || kpiListLoading || periodDetailLoading;

        if (success) {
            this.props.challengeUpdateActions.clearChallengeUpdate();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader()}
                { !loading && awardTypes && categories && challenge && images && types && kpis && period && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, categoryList, challengeAwardTypeList, challengeUpdate, challengeDetail, challengeImageList, challengeTypeList, challengeTypeUsablePoints, kpiList, currentPeriodDetail }) => ({
    accountDetail,
    categoryList,
    challengeAwardTypeList,
    challengeUpdate,
    challengeDetail,
    challengeImageList,
    challengeTypeList,
    challengeTypeUsablePoints,
    kpiList,
    currentPeriodDetail
});

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    challengeAwardTypeListActions: bindActionCreators(challengeAwardTypeListActions, dispatch),
    challengeUpdateActions: bindActionCreators(challengeUpdateActions, dispatch),
    challengeDetailActions: bindActionCreators(challengeDetailActions, dispatch),
    challengeImageListActions: bindActionCreators(challengeImageListActions, dispatch),
    challengeTypeListActions: bindActionCreators(challengeTypeListActions, dispatch),
    challengeTypeUsablePointsActions: bindActionCreators(challengeTypeUsablePointsActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChallengeUpdate))
