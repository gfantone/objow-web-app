import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid, IconButton} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import Formsy from 'formsy-react'
import {SubHeader} from './components'
import {Card, DefaultText, DefaultTitle, IconButton as AppBarIconButton, InfoText, LabelText, MainLayoutComponent, ProgressButton, Select, TextField} from '../../../../components'
import * as badgeDetailActions from '../../../../services/Badges/BadgeDetail/actions'
import * as badgeLevelListActions from '../../../../services/BadgeLevels/BadgeLevelList/actions'
import * as badgeLevelListCreationActions from '../../../../services/BadgeLevels/BadgeLevelListCreation/actions'
import * as badgeLevelListRemovingActions from '../../../../services/BadgeLevels/BadgeLevelListRemoving/actions'
import * as badgeLevelListUpdateActions from '../../../../services/BadgeLevels/BadgeLevelListUpdate/actions'
import * as badgeLevelRemainingPointsActions from '../../../../services/BadgeLevels/BadgeLevelRemainingPoints/actions'
import * as badgeUpdateActions from '../../../../services/Badges/BadgeUpdate/actions'
import * as levelListActions from '../../../../services/Levels/LevelList/actions'
import '../../../../helpers/FormsyHelper'
import '../../../../helpers/NumberHelper'
import * as Resources from "../../../../Resources";

class AdminBadgeDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.initialized = false;
        this.state = {
            levels: []
        };
        this.removed_level_ids = [];
        this.props.badgeLevelListCreationActions.clearBadgeLevelListCreation();
        this.props.badgeLevelListRemovingActions.clearBadgeLevelListRemoving();
        this.props.badgeLevelListUpdateActions.clearBadgeLevelListUpdate();
        this.props.badgeUpdateActions.clearBadgeUpdate()
    }

    handleAdd() {
        var levels = this.state.levels;
        levels.push({ rank: null, target: 0, points: 0, badge: this.id, level: null, percentage: 0, isNew: true });
        this.setState({
            ...this.state,
            levels: levels
        })
    }

    handleRemove = index => () => {
        var levels = this.state.levels;
        const removedLevel = levels[index];
        levels.splice(index, 1);
        if (removedLevel.id) {
            this.removed_level_ids.push(removedLevel.id)
        }
        this.setState({
            ...this.state,
            levels: levels
        })
    };

    handleSubmit() {
        const model = this.refs.form.getModel();
        var levels = this.state.levels;
        levels.map(level => {
            const index = levels.indexOf(level);
            level.rank = index + 1;
            level.target = model.target[index];
            level.level = model.level[index];
            level.points = model.points[index]
        });
        const oldLevels = levels.filter(level => !level.isNew);
        const newLevels = levels.filter(level => level.isNew);
        this.props.badgeLevelListCreationActions.createBadgeLevelList(newLevels);
        this.props.badgeLevelListUpdateActions.updateBadgeLevelList(oldLevels);
        this.props.badgeLevelListRemovingActions.removeBadgeLevelList(this.removed_level_ids);
        this.props.badgeUpdateActions.updateBadge(this.id, model.description)
    }

    componentDidMount() {
        const periodId = this.props.match.params.periodId;
        this.id = this.props.match.params.id;
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<SubHeader />);
        this.props.handleMaxWidth('md');
        this.props.handleButtons(<AppBarIconButton size='small' onClick={this.handleAdd.bind(this)}><FontAwesomeIcon icon={faPlus} /></AppBarIconButton>);
        this.props.activateReturn();
        this.props.levelListActions.getLevelList(periodId);
        this.props.badgeLevelListActions.getBadgeLevelList(this.id);
        this.props.badgeDetailActions.getBadgeDetail(this.id);
        this.props.badgeLevelRemainingPointsActions.getBadgeLevelRemainingPoints(periodId)
    }

    componentWillReceiveProps(props) {
        const { levels } = props.badgeLevelList;
        if (!this.initialized && levels) {
            this.initialized = true;
            var points = 0;
            levels.map(level => {
                level.badge = level.badge.id;
                points += level.points
            });
            this.setState({
                ...this.state,
                levels: levels,
                points: points
            })
        }
    }

    renderData() {
        const { badge } = this.props.badgeDetail;
        const { levels } = this.props.levelList;
        const { points: remainingPoints } = this.props.badgeLevelRemainingPoints;
        const { loading: badgeLevelListCreationLoading } = this.props.badgeLevelListCreation;
        const { loading: badgeLevelListRemovingLoading } = this.props.badgeLevelListRemoving;
        const { loading: badgeLevelListUpdateLoading } = this.props.badgeLevelListUpdate;
        const { loading: badgeUpdateLoading } = this.props.badgeUpdate;
        const loading = badgeLevelListCreationLoading || badgeLevelListRemovingLoading || badgeLevelListUpdateLoading || badgeUpdateLoading;

        return (
            <Formsy ref='form' onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <InfoText>Points restants à attribuer</InfoText>
                            <DefaultText>{remainingPoints} pts</DefaultText>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>Informations générales</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <TextField name={'description'} label={'Description'} initial={badge.description} fullWidth />
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    { this.state.levels.map((level, index) => {
                        const number = index + 1;
                        const disabled = level.percentage > 0;
                        const removeButtonVisibility = disabled ? 'collapse' : 'visible';
                        return (
                            <Grid key={level.id} item container xs={12} spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>Rang {number}</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs>
                                                <TextField type='number' name={`target[${index}]`} label='Objectif' initial={level.target} disabled={disabled} fullWidth required
                                                    validations='isMoreThanOrEquals:0'
                                                    validationErrors={{
                                                        isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                        isMoreThanOrEquals: "L'objectif doit être supérieur ou égal à 0"
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Select name={`level[${index}]`} label='Condition' options={levels} optionValueName='id' optionTextName='number' optionTextPrefix='Lvl ' initial={level.level} disabled={disabled} fullWidth required
                                                    validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField type='number' name={`points[${index}]`} label='Nbre de point si atteint' initial={level.points} disabled={disabled} fullWidth required
                                                    validations='isMoreThanOrEquals:0'
                                                    validationErrors={{
                                                        isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                        isMoreThanOrEquals: "Le nombre de points doit être supérieur ou égal à 0"
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <LabelText noWrap>% de joueur l'ayant atteint</LabelText>
                                                <InfoText>{level.percentage.toFullPercentage()} %</InfoText>
                                            </Grid>
                                            <Grid item style={{visibility: removeButtonVisibility}}>
                                                <IconButton size='small' style={{marginTop: 16}} onClick={this.handleRemove(index).bind(this)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        )
                    }) }
                    <Grid item xs={12}>
                        <ProgressButton type={'submit'} text='Valider' centered loading={loading} />
                    </Grid>
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { badge, loading: badgeDetailLoading } = this.props.badgeDetail;
        const { levels: badgeLevels, loading: badgeLevelListLoading } = this.props.badgeLevelList;
        const { points, loading: badgeLevelRemainingPointsLoading } = this.props.badgeLevelRemainingPoints;
        const { success: badgeLevelListCreationSuccess } = this.props.badgeLevelListCreation;
        const { success: badgeLevelListRemovingSuccess } = this.props.badgeLevelListRemoving;
        const { success: badgeLevelListUpdateSuccess } = this.props.badgeLevelListUpdate;
        const { success: badgeUpdateSuccess } = this.props.badgeUpdate;
        const { levels, loading: levelListLoading } = this.props.levelList;
        const loading = badgeDetailLoading || badgeLevelListLoading || levelListLoading || badgeLevelRemainingPointsLoading;

        if (badgeLevelListCreationSuccess && badgeLevelListUpdateSuccess && badgeLevelListRemovingSuccess && badgeUpdateSuccess) {
            this.props.badgeLevelListCreationActions.clearBadgeLevelListCreation();
            this.props.badgeLevelListUpdateActions.clearBadgeLevelListUpdate();
            this.props.badgeLevelListRemovingActions.clearBadgeLevelListRemoving();
            this.props.badgeUpdateActions.clearBadgeUpdate();
            this.props.history.goBack()
        }

        return (
            <div>
                { !loading && badge && badgeLevels && levels && points != null && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ badgeDetail, badgeLevelList, badgeLevelListCreation, badgeLevelListRemoving, badgeLevelListUpdate, badgeLevelRemainingPoints, badgeUpdate, levelList }) => ({
    badgeDetail,
    badgeLevelList,
    badgeLevelListCreation,
    badgeLevelListRemoving,
    badgeLevelListUpdate,
    badgeLevelRemainingPoints,
    badgeUpdate,
    levelList
});

const mapDispatchToProps = (dispatch) => ({
    badgeDetailActions: bindActionCreators(badgeDetailActions, dispatch),
    badgeLevelListActions: bindActionCreators(badgeLevelListActions, dispatch),
    badgeLevelListCreationActions: bindActionCreators(badgeLevelListCreationActions, dispatch),
    badgeLevelListRemovingActions: bindActionCreators(badgeLevelListRemovingActions, dispatch),
    badgeLevelListUpdateActions: bindActionCreators(badgeLevelListUpdateActions, dispatch),
    badgeLevelRemainingPointsActions: bindActionCreators(badgeLevelRemainingPointsActions, dispatch),
    badgeUpdateActions: bindActionCreators(badgeUpdateActions, dispatch),
    levelListActions: bindActionCreators(levelListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminBadgeDetail)
