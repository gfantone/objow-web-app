import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import {CardMedia, Grid, IconButton, Tooltip} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ImageInput } from '../../components'
import '../../../../helpers/FormsyHelper'
import '../../helpers/ChallengeFormsyHelper'
import { AppBarSubTitle, BlueText, Card, DatePicker, DefaultText, DefaultTitle, HiddenInput, IconButton as MenuIconButton, InfoText, Loader, MainLayoutComponent, ProgressButton, Select, TextField } from '../../../../components'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as challengeAwardTypeListActions from '../../../../services/ChallengeAwardTypes/ChallengeAwardTypeList/actions'
import * as challengeCreationActions from '../../../../services/Challanges/ChallangeCreaton/actions'
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

class ChallengeCreation extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.key = 1;
        this.state = {
            start: null,
            end: null,
            type: null,
            awardType: null,
            image: null,
            goals: [{ key: this.key, category: null, kpi: null, goalName: null, target: null, points: null }]
        };
        this.props.challengeCreationActions.clearChallengeCreation();
        this.props.challengeTypeUsablePointsActions.clearChallengeTypeUsablePoints()
    }

    componentDidMount() {
        this.props.handleTitle('Les challenges');
        this.props.handleSubHeader(<AppBarSubTitle title="Création d'un challenge" />);
        this.props.handleButtons(<MenuIconButton size={'small'} onClick={this.handleAddGoal.bind(this)}><FontAwesomeIcon icon={faPlus} /></MenuIconButton>);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.challengeAwardTypeListActions.getChallengeAwardTypeList();
        this.props.categoryListActions.getCategoryList();
        this.props.challengeImageListActions.getChallengeImageList();
        this.props.challengeTypeListActions.getUsableChallengeTypeList();
        this.props.kpiListActions.getKpiList();
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail()
    }

    componentWillReceiveProps(props) {
        const { account } = props.accountDetail;
        const { types } = props.challengeTypeList;
        const { types: awardTypes } = props.challengeAwardTypeList;
        if (!this.state.type && account.role.code == 'M' && types) {
            const selectedType = types.find(x => x.code == 'CM');
            const selectedTypeId = selectedType ? selectedType.id : null;
            this.handlePeriodChange('type')(selectedTypeId)
        }
        if (!this.state.awardType && awardTypes) {
            this.state.awardType = awardTypes[0].id
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

    handleAwardTypeChange(type) {
        this.setState({
            ...this.state,
            awardType: type
        })
    }

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
            if (this.state.start && this.state.end && this.state.type) {
                const { types } = this.props.challengeTypeList;
                const teamId = types.find(x => x.code == 'CM') && this.state.type == types.find(x => x.code == 'CM').id ? this.props.match.params.id : null;
                this.props.challengeTypeUsablePointsActions.getChallengeTypeUsablePoints(this.state.type, this.state.start, this.state.end, teamId)
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
        const { types } = this.props.challengeTypeList;
        const model = this.refs.form.getModel();
        model.start.setHours(0, 0, 0, 0);
        model.end.setHours(23, 59, 59, 0);
        const challenge = {
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
            goals.push({ number: model.number[i], name: model.goalName[i], kpi: model.kpi[i], target: model.target[i], points: model.points[i] })
        }
        var awards = [];
        for (var i = 0; i < model.award.length; i++) {
            const rank = i + 1;
            awards.push({ rank: rank, points: model.award[i] })
        }
        const teamId = types.find(x => x.id == model.type && x.code == 'CM') != null && this.props.match.params.id ? this.props.match.params.id : null;
        this.props.challengeCreationActions.createChallenge(challenge, awards, goals, teamId)
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
                            <Select name='category' label='Catégorie' emptyText={'Toutes'} options={categories} optionValueName='id' optionTextName='name' onChange={this.handleCategoryChange(index).bind(this)} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Select name={`kpi[${index}]`} label='Kpi' options={displayKpis} initial={kpi ? kpi.id : null} optionValueName='id' optionTextName='name' onChange={this.handleValueChange(index)('kpi').bind(this)} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name={`goalName[${index}]`} label='Intitulé' onChange={this.handleValueChange(index)('goalName').bind(this)} fullWidth required />
                        </Grid>
                        <Grid item xs>
                            <DefaultText>Unité</DefaultText>
                            <InfoText>{unit}</InfoText>
                        </Grid>
                        <Grid item xs>
                            <TextField name={`target[${index}]`} label='Objectif' onChange={this.handleValueChange(index)('target').bind(this)} fullWidth required />
                        </Grid>
                        <Grid item>
                            <Tooltip title={'L’objectif fixé ici peut être atteint plusieurs fois. Chaque fois que celui-ci est atteint il rapporte le nombre de points associés.'}>
                                <BlueText style={{ marginTop: 20 }}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </BlueText>
                            </Tooltip>
                        </Grid>
                        <Grid item xs>
                            <TextField name={`points[${index}]`} label='Pts' onChange={this.handleValueChange(index)('target').bind(this)} fullWidth required />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        )
    }

    renderData() {
        const { classes } = this.props;
        const { account } = this.props.accountDetail;
        const { types: awardTypes } = this.props.challengeAwardTypeList;
        const { images } = this.props.challengeImageList;
        const { loading } = this.props.challengeCreation;
        const { points, loading: challengeTypeUsablePointsLoading } = this.props.challengeTypeUsablePoints;
        var { types } = this.props.challengeTypeList;
        const { period } = this.props.currentPeriodDetail;
        if (account.role.code == 'M') {
            types = types.filter(x => x.code == 'CM')
        } else if (account.role.code == 'A' && !this.props.match.params.id) {
            types = types.filter(x => x.code != 'CM')
        }
        const today = new Date();
        const startMinDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const startMaxDate = this.state.end ? this.state.end : period.end.toDate2();
        const endMinDate = this.state.start ? this.state.start : today;
        const image = this.state.image ? images.find(x => x.id == this.state.image) : null;
        const imagePath = image ? image.path : null;
        const isMaxAward = this.state.awardType == awardTypes[0].id;
        const usablePoints = points ? (!isMaxAward ? points.all : points.participant) : 0;
        const currentType = types.find(x => x.id == this.state.type);
        const participantName = currentType && currentType.code == 'CT' ? 'équipe' : 'joueur';

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
                                                    <TextField name='name' label='Nom' fullWidth required
                                                               validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField name='description' label='Description' fullWidth multiline required
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
                                        <Select name='type' label='Type' options={types} initial={this.state.type} onChange={this.handlePeriodChange('type').bind(this)} optionValueName='id' optionTextName='name' disabled={account.role.code == 'M'} fullWidth required
                                                                        validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ImageInput name={'image'} label={'Sélectionner une image...'} images={images} onChange={this.handleImageChange.bind(this)} required />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container spacing={1}>
                        <Grid item xs={12}>
                            <DefaultTitle>Récompenses</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        { challengeTypeUsablePointsLoading && <DefaultText>Calcul des pts utilisables...</DefaultText> }
                                        { !challengeTypeUsablePointsLoading && <DefaultText>{usablePoints} pts utilisables</DefaultText> }
                                        <HiddenInput name='usablePoints' value={usablePoints} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Select name='awardType' label='Type' options={awardTypes} initial={awardTypes[0].id} emptyDisabled onChange={this.handleAwardTypeChange.bind(this)} optionValueName='id' optionTextName='name' fullWidth required
                                                validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                        />
                                    </Grid>
                                    { isMaxAward && <Grid item xs={3}>
                                        <TextField name='award[0]' label={`Maximum / ${participantName}`} fullWidth required
                                            validations='isLessThanOrEquals:usablePoints'
                                            validationErrors={{
                                                isDefaultRequiredValue: 'Ce champ est requis.',
                                                isLessThanOrEquals: 'La récompense est trop élevée'
                                            }}
                                        />
                                    </Grid> }
                                    { !isMaxAward && <Grid item xs={3}>
                                        <TextField name='award[0]' label={`Gain ${participantName} #1`} fullWidth required
                                            validations='isRankingValid'
                                            validationErrors={{
                                                isDefaultRequiredValue: 'Ce champ est requis.',
                                                isRankingValid: 'La récompense est trop élevée'
                                            }}
                                        />
                                    </Grid> }
                                    { !isMaxAward && <Grid item xs={3}>
                                        <TextField name='award[1]' label={`Gain ${participantName} #2`} fullWidth required
                                            validations='isRankingValid'
                                            validationErrors={{
                                                isDefaultRequiredValue: 'Ce champ est requis.',
                                                isRankingValid: 'La récompense est trop élevée'
                                            }}
                                        />
                                    </Grid> }
                                    { !isMaxAward && <Grid item xs={3}>
                                        <TextField name='award[2]' label={`Gain ${participantName} #3`} fullWidth required
                                            validations='isRankingValid'
                                            validationErrors={{
                                                isDefaultRequiredValue: 'Ce champ est requis.',
                                                isRankingValid: 'La récompense est trop élevée'
                                            }}
                                        />
                                    </Grid> }
                                </Grid>
                            </Card>
                        </Grid>
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
        const { images, loading: challengeImageListLoading } = this.props.challengeImageList;
        const { types, loading: challengeTypeListLoading } = this.props.challengeTypeList;
        const { kpis, loading: kpiListLoading } = this.props.kpiList;
        const { period, loading: periodDetailLoading } = this.props.currentPeriodDetail;
        const { success } = this.props.challengeCreation;
        const loading = challengeAwardTypeListLoading || categoryListLoading || challengeImageListLoading || challengeTypeListLoading || kpiListLoading || periodDetailLoading;

        if (success) {
            this.props.challengeCreationActions.clearChallengeCreation();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading &&  this.renderLoader()}
                { !loading && awardTypes && categories && images && types && kpis && period && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, categoryList, challengeAwardTypeList, challengeCreation, challengeImageList, challengeTypeList, challengeTypeUsablePoints, kpiList, currentPeriodDetail }) => ({
    accountDetail,
    categoryList,
    challengeAwardTypeList,
    challengeCreation,
    challengeImageList,
    challengeTypeList,
    challengeTypeUsablePoints,
    kpiList,
    currentPeriodDetail
});

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    challengeAwardTypeListActions: bindActionCreators(challengeAwardTypeListActions, dispatch),
    challengeCreationActions: bindActionCreators(challengeCreationActions, dispatch),
    challengeImageListActions: bindActionCreators(challengeImageListActions, dispatch),
    challengeTypeListActions: bindActionCreators(challengeTypeListActions, dispatch),
    challengeTypeUsablePointsActions: bindActionCreators(challengeTypeUsablePointsActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChallengeCreation))
