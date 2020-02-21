import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { AppBarSubTitle, Card, DefaultText, DefaultTitle, EmptyState, IconButton, InfoText, Loader, MainLayoutComponent, ProgressButton, TextField, HiddenInput } from '../../../../components'
import * as levelListActions from '../../../../services/Levels/LevelList/actions'
import * as levelListCreationActions from '../../../../services/Levels/LevelListCreation/actions'
import * as levelListUpdateActions from '../../../../services/Levels/LevelListUpdate/actions'
import * as levelListRemovingActions from '../../../../services/Levels/LevelListRemoving/actions'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import '../../../../helpers/FormsyHelper'
import '../../../../helpers/NumberHelper'

class AdminLevelList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.initialized = false;
        this.removedLevels = [];
        this.state = {
            levels: [],
            display: true
        };
        this.props.levelListCreationActions.clearLevelListCreation();
        this.props.levelListUpdateActions.clearLevelListUpdate();
        this.props.configListActions.clearConfigList()
    }

    handleAddLevel() {
        var levels = this.state.levels;
        levels.push({ id: levels.length + 1, points: 0, players: 0, isNew: true });
        this.setState({
            ...this.state,
            levels: levels
        })
    }

    componentDidMount() {
        const periodId = this.props.match.params.periodId;
        this.props.activateReturn();
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title='Configuration des levels' />);
        this.props.handleButtons(<IconButton size='small' onClick={this.handleAddLevel.bind(this)}><FontAwesomeIcon icon={faPlus} /></IconButton>);
        this.props.levelListActions.getLevelList(periodId);
        this.props.configListActions.getConfigList(periodId)
    }

    componentWillReceiveProps(props) {
        const { configs } = this.props.configList;
        const { levels } = props.levelList;
        if (!this.initialized && configs && levels) {
            this.initialized = true;
            this.setState({
                ...this.state,
                levels: levels
            })
        }
    }

    handleRemove = index => () => {
        var levels = this.state.levels;
        var removedLevels = levels.splice(index, 1);
        removedLevels = removedLevels.filter(level => !level.isNew);
        this.removedLevels = removedLevels.concat(this.removedLevels);
        this.setState({
            ...this.state,
            levels: levels,
            display: false
        }, () => {
            this.setState({
                ...this.state,
                display: true
            })
        })
    };

    handleSubmit() {
        const model = this.refs.form.getModel();
        var levels = this.state.levels;
        const levelPoints = model.levels;
        levels.map(level => {
            const index = levels.indexOf(level);
            level.points = levelPoints[index];
            level.period = Number(this.props.match.params.periodId)
        });
        const oldLevels = levels.filter(level => !level.isNew);
        const newLevels = levels.filter(level => level.isNew);
        this.props.levelListRemovingActions.removeLevelList(this.removedLevels);
        this.props.levelListUpdateActions.updateLevelList(oldLevels);
        this.props.levelListCreationActions.createLevelList(newLevels)
    }

    renderLoader() {
        return (
            <Loader centered />
        )
    }

    renderForm() {
        const { configs } = this.props.configList;
        const { loading: levelListCreationLoading } = this.props.levelListCreation;
        const { loading: levelListUpdateLoading } = this.props.levelListUpdate;
        const loading = levelListCreationLoading || levelListUpdateLoading;
        const config = configs.find(x => x.code == 'CPA');

        return (
            <Formsy ref='form' onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <InfoText>Total points mis en jeu / joueur (maximum/joueur)</InfoText>
                            <DefaultText>{config ? config.value : 0} PTS</DefaultText>
                            <HiddenInput name='reference' value={config ? config.value : 0} />
                        </Card>
                    </Grid>
                    { this.state.display && this.state.levels.length > 0 && this.state.levels.map((level, index) => {
                        const disabled = level.id == 1 || level.players > 0;
                        const validations = index > 0 ? { isLessThanOrEquals: 'reference', isMoreThan: `levels[${index-1}]` } : { isLessThanOrEquals: 'reference', equals: 0 };
                        const number = level.number ? level.number : index + 1;
                        return (
                            <Grid key={index} item xs={6} container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>Level {number}</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs>
                                                <TextField name={`levels[${index}]`} label='Points à atteindre' initial={level.points} fullWidth disabled={disabled} required
                                                    validations={validations}
                                                    validationErrors={{
                                                        isDefaultRequiredValue: 'Ce champ est requis.',
                                                        isLessThanOrEquals: 'La valeur doit être inférieure ou égale au total mis en jeu',
                                                        isMoreThan: 'La valeur doit être supérieure à la valeur du niveau précédent'
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <InfoText>% de joueurs</InfoText>
                                                <DefaultText>{level.players.toPercentage()}</DefaultText>
                                            </Grid>
                                            { !disabled && <Grid item xs='auto'>
                                                <IconButton color='secondary' size='small' onClick={this.handleRemove(index).bind(this)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </IconButton>
                                            </Grid> }
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        )
                    }) }
                    { this.state.levels.length == 0 && <Grid item xs={12}>
                        <EmptyState title='Aucun niveau trouvé' message='Créez un premier niveau' />
                    </Grid> }
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text='Valider' centered loading={loading} />
                    </Grid>
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { configs, loading: configListLoading } = this.props.configList;
        const { levels, loading: levelListLoading } = this.props.levelList;
        const { success: levelListCreationSuccess } = this.props.levelListCreation;
        const { success: levelListUpdateSuccess } = this.props.levelListUpdate;
        const loading = levelListLoading || configListLoading;

        if (levelListCreationSuccess && levelListUpdateSuccess) {
            this.props.levelListCreationActions.clearLevelListCreation();
            this.props.levelListUpdateActions.clearLevelListUpdate();
            this.props.configListActions.clearConfigList();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && configs && levels && this.renderForm() }
            </div>
        )
    }
}

const mapStateToProps = ({ configList, levelList, levelListCreation, levelListUpdate, levelListRemoving }) => ({
    configList,
    levelList,
    levelListCreation,
    levelListUpdate,
    levelListRemoving
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    levelListActions: bindActionCreators(levelListActions, dispatch),
    levelListCreationActions: bindActionCreators(levelListCreationActions, dispatch),
    levelListUpdateActions: bindActionCreators(levelListUpdateActions, dispatch),
    levelListRemovingActions: bindActionCreators(levelListRemovingActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLevelList)