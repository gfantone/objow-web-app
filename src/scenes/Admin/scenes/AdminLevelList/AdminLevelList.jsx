import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { AppBarSubTitle, Card, DefaultText, DefaultTitle, EmptyState, IconButton, InfoText, Loader, MainLayoutComponent, ProgressButton, TextField, HiddenInput } from '../../../../components'
import * as levelListActions from '../../../../services/Levels/LevelList/actions'
import * as levelListCreationActions from '../../../../services/Levels/LevelListCreation/actions'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import '../../../../helpers/FormsyHelper'
import '../../../../helpers/NumberHelper'
import {uuidv4} from '../../../../helpers/UUIDHelper'

class AdminLevelList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.initialized = false;
        this.state = {
            levels: []
        };
        this.props.levelListCreationActions.clearLevelListCreation();
        this.props.configListActions.clearConfigList()
    }

    handleAddLevel() {
        var levels = this.state.levels;
        levels.push({ key: uuidv4(), points: 0, players: 0 });
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { configs } = this.props.configList;
        const { levels } = this.props.levelList;
        if (!this.initialized && configs && levels) {
            this.initialized = true;
            this.setState({
                ...this.state,
                levels: levels.map(x => ({ key: uuidv4(), number: x.number, points: x.points, players: x.players }))
            })
        }
    }

    handleRemove = index => () => {
        var levels = this.state.levels;
        levels.splice(index, 1);
        this.setState({
            ...this.state,
            levels: levels
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
        this.props.levelListCreationActions.createLevelList(levels)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderForm() {
        const { configs } = this.props.configList;
        const { loading: levelListCreationLoading } = this.props.levelListCreation;
        const loading = levelListCreationLoading;
        const config = configs.find(x => x.code == 'CPA');
        const reachedLevels = this.state.levels.filter(x => x.players > 0)
        const reachedLevelNumbers = reachedLevels.map(x => Number(x.number))
        const maxRankDisabled = Math.max(...reachedLevelNumbers)

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
                    { this.state.levels.length > 0 && this.state.levels.map((level, index) => {
                        const disabled = level.number <= maxRankDisabled;
                        const validations = index > 0 ? { isLessThanOrEquals: 'reference', isMoreThan: `levels[${index-1}]` } : { isLessThanOrEquals: 'reference', equals: 0 };
                        const number = level.number ? level.number : index + 1;
                        return (
                            <Grid key={level.key} item xs={6} container spacing={1}>
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
        const { success } = this.props.levelListCreation;
        const loading = levelListLoading || configListLoading;

        if (success) {
            this.props.levelListCreationActions.clearLevelListCreation();
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

const mapStateToProps = ({ configList, levelList, levelListCreation }) => ({
    configList,
    levelList,
    levelListCreation
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    levelListActions: bindActionCreators(levelListActions, dispatch),
    levelListCreationActions: bindActionCreators(levelListCreationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLevelList)
