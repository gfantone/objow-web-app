import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Formsy from 'formsy-react'
import { Card, DefaultTitle, Loader, ProgressButton, Select, TextField } from '../../../../../../components'
import * as challengeTypeListActions from '../../../../../../services/ChallengeTypes/ChallengeTypeList/actions'
import * as challengeTypeListUpdateActions from '../../../../../../services/ChallengeTypes/ChallengeTypeListUpdate/actions'
import * as configListActions from '../../../../../../services/Configs/ConfigList/actions'
import * as configListUpdateActions from '../../../../../../services/Configs/ConfigListUpdate/actions'
import './helpers/FormsyHelper'

const styles = {
    title: {
        marginBottom: 16
    },
    form: {
        marginBottom: 32
    },
    arrow: {
        marginTop: 24
    }
};

const rules = [
    { id: 'P', name: '1€ = 10 PTS' },
    { id: 'L', name: 'Libre' }
];

class PlayerPointConfig extends Component {
    constructor(props) {
        super(props);
        this.initialized = false;
        this.state = {
            ruleId: null,
            rule: '',
            global: {
                id: null,
                points: { value: 0, display: true },
                budget: { value: 0, display: true }
            },
            goals: {
                id: null,
                points: { value: 0, display: true },
                percentage: { value: 0, display: true }
            },
            badges: {
                id: null,
                points: { value: 0, display: true },
                percentage: { value: 0, display: true }
            },
            managerChallenges: {
                points: { value: 0, display: true },
                percentage: { value: 0, display: true }
            },
            globalChallenges: {
                points: { value: 0, display: true },
                percentage: { value: 0, display: true }
            }
        };
        this.props.challengeTypeListUpdateActions.clearChallengeTypeListUpdate();
        this.props.configListUpdateActions.clearConfigListUpdate()
    }

    componentDidMount(props) {
        const periodId = this.props.period;
        this.props.challengeTypeListActions.getChallengeTypeList(periodId);
        this.props.configListActions.getConfigList(periodId)
    }

    componentWillReceiveProps(props) {
        const { types } = props.challengeTypeList;
        const { configs } = props.configList;
        if (!this.initialized && types && configs) {
            const rule = configs.find(x => x.code == 'CCRP');
            const global = configs.find(x => x.code == 'CPA');
            const goals = configs.find(x => x.code == 'CPG');
            const badges = configs.find(x => x.code == 'CPB');
            const managerChallenges = types.find(x => x.code == 'CM');
            const globalChallenges = types.find(x => x.code == 'CC');
            this.initialized = true;
            this.setState({
                ...this.state,
                ruleId: rule.id,
                rule: rule.value,
                global: {
                    id: global.id,
                    points: { value: global.value, display: true },
                    budget: { value: global.value / 10, display: true }
                },
                goals: {
                    id: goals.id,
                    points: { value: goals.value, display: true },
                    percentage: { value: global.value > 0 ? Number((goals.value / global.value * 100).toFixed(2)) : 0, display: true }
                },
                badges: {
                    id: badges.id,
                    points: { value: badges.value, display: true },
                    percentage: { value: global.value > 0 ? Number((badges.value / global.value * 100).toFixed(2)) : 0, display: true }
                },
                managerChallenges: {
                    points: { value: managerChallenges.currentPoints, display: true },
                    percentage: { value: global.value > 0 ? Number((managerChallenges.currentPoints / global.value).toFixed(2)) * 100 : 0, display: true }
                },
                globalChallenges: {
                    points: { value: globalChallenges.currentPoints, display: true },
                    percentage: { value: global.value > 0 ? Number((globalChallenges.currentPoints / global.value).toFixed(2)) * 100 : 0, display: true }
                }
            })
        }
    }

    handleRuleChange(value) {
        this.setState({
            ...this.state,
            rule: value
        })
    }

    handleBudgetChange(value) {
        const points = value * 10;
        var global = this.state.global;
        var goals = this.state.goals;
        var badges = this.state.badges;
        var managerChallenges = this.state.managerChallenges;
        var globalChallenges = this.state.globalChallenges;
        global.budget.value = value;
        global.points.value = points;
        goals.points.value = Math.round(points * (goals.percentage.value / 100));
        badges.points.value = Math.round(points * (badges.percentage.value / 100));
        managerChallenges.points.value = Math.round(points * (managerChallenges.percentage.value / 100));
        globalChallenges.points.value = Math.round(points * (globalChallenges.percentage.value / 100));
        global.points.display = false;
        goals.points.display = false;
        badges.points.display = false;
        managerChallenges.points.display = false;
        globalChallenges.points.display = false;
        this.setState({
            ...this.state,
            global: global,
            goals: goals,
            badges: badges,
            managerChallenges: managerChallenges,
            globalChallenges: globalChallenges
        }, () => {
            global.points.display = true;
            goals.points.display = true;
            badges.points.display = true;
            managerChallenges.points.display = true;
            globalChallenges.points.display = true;
            this.setState({
                ...this.state,
                global: global,
                goals: goals,
                badges: badges,
                managerChallenges: managerChallenges,
                globalChallenges: globalChallenges
            })
        })
    }

    handleGlobalPointsChange(value) {
        const budget = (value / 10).toFixed(2);
        var global = this.state.global;
        var goals = this.state.goals;
        var badges = this.state.badges;
        var managerChallenges = this.state.managerChallenges;
        var globalChallenges = this.state.globalChallenges;
        global.points.value = value;
        global.budget.value = budget;
        goals.points.value = Math.round(value * (goals.percentage.value / 100));
        badges.points.value = Math.round(value * (badges.percentage.value / 100));
        managerChallenges.points.value = Math.round(value * (managerChallenges.percentage.value / 100));
        globalChallenges.points.value = Math.round(value * (globalChallenges.percentage.value / 100));
        global.budget.display = false;
        goals.points.display = false;
        badges.points.display = false;
        managerChallenges.points.display = false;
        globalChallenges.points.display = false;
        this.setState({
            ...this.state,
            global: global,
            goals: goals,
            badges: badges,
            managerChallenges: managerChallenges,
            globalChallenges: globalChallenges
        }, () => {
            global.budget.display = true;
            goals.points.display = true;
            badges.points.display = true;
            managerChallenges.points.display = true;
            globalChallenges.points.display = true;
            this.setState({
                ...this.state,
                global: global,
                goals: goals,
                badges: badges,
                managerChallenges: managerChallenges,
                globalChallenges: globalChallenges
            })
        })
    }

    handlePercentageChange = name => value => {
        const points = Math.round(this.state.global.points.value * (value / 100));
        var config = this.state[name];
        config.percentage.value = value;
        config.points.value = points;
        config.points.display = false;
        this.setState({
            ...this.state,
            [name]: config
        }, () => {
            config.points.display = true;
            this.setState({
                ...this.state,
                [name]: config
            })
        })
    };

    handlePointsChange = name => value => {
        const percentage = ((value / this.state.global.points.value) * 100).toFixed(2);
        var config = this.state[name];
        config.points.value = value;
        config.percentage.value = percentage;
        config.percentage.display = false;
        this.setState({
            ...this.state,
            [name]: config
        }, () => {
            config.percentage.display = true;
            this.setState({
                ...this.state,
                [name]: config
            })
        })
    };

    handleSubmit(model) {
        const { types } = this.props.challengeTypeList;
        const managerChallenges = types.find(x => x.code == 'CM');
        const globalChallenges = types.find(x => x.code == 'CC');
        const configs = [
            { id: this.state.ruleId, value: model.rule },
            { id: this.state.global.id, value: model.global },
            { id: this.state.goals.id, value: model.goals },
            { id: this.state.badges.id, value: model.badges },
        ];
        managerChallenges.currentPoints = model.managerChallenges;
        globalChallenges.currentPoints = model.globalChallenges;
        this.props.challengeTypeListUpdateActions.updateChallengeTypeList([managerChallenges, globalChallenges]);
        this.props.configListUpdateActions.updateConfigList(configs)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { classes } = this.props;
        const { loading: challengeTypeListUpdateLoading } = this.props.challengeTypeListUpdate;
        const { loading: configListUpdateLoading } = this.props.configListUpdate;
        const loading = challengeTypeListUpdateLoading || configListUpdateLoading;

        return (
            <div>
                <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>Nombre total de PTS pouvant être gagnés / joueur</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Select name='rule' label='Règle de calcul' fullWidth options={rules} optionValueName='id' optionTextName='name' initial={this.state.rule} onChange={this.handleRuleChange.bind(this)} />
                                        </Grid>
                                        { this.state.rule == 'P' && <Grid item>
                                            { this.state.global.budget.display && <TextField name='globalPercentage' type='number' label='Budget' initial={this.state.global.budget.value} onChange={this.handleBudgetChange.bind(this)} /> }
                                        </Grid> }
                                        { this.state.rule == 'P' && <Grid item>
                                            <FontAwesomeIcon icon={faAngleRight} className={classes.arrow} />
                                        </Grid> }
                                        <Grid item>
                                            { this.state.global.points.display && <TextField name='global' type='number' label='PTS' initial={this.state.global.points.value} onChange={this.handleGlobalPointsChange.bind(this)} required
                                                validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                            /> }
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>Objectifs</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            { this.state.goals.percentage.display && <TextField name='hello' type='number' label='%' initial={this.state.goals.percentage.value} onChange={this.handlePercentageChange('goals').bind(this)} /> }
                                        </Grid>
                                        <Grid item>
                                            <FontAwesomeIcon icon={faAngleRight} className={classes.arrow} />
                                        </Grid>
                                        <Grid item>
                                            { this.state.goals.points.display && <TextField name='goals' type='number' label='Pts' initial={this.state.goals.points.value} onChange={this.handlePointsChange('goals').bind(this)} required
                                                validations='isCollaboratorPointsValid'
                                                validationErrors={{
                                                    isDefaultRequiredValue: 'Ce champ est requis.',
                                                    isCollaboratorPointsValid: 'Le somme des points est supérieur au maximum de points'
                                                }}
                                            /> }
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>Défis</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            { this.state.badges.percentage.display && <TextField name='hello' type='number' label='%' initial={this.state.badges.percentage.value} onChange={this.handlePercentageChange('badges').bind(this)} /> }
                                        </Grid>
                                        <Grid item>
                                            <FontAwesomeIcon icon={faAngleRight} className={classes.arrow} />
                                        </Grid>
                                        <Grid item>
                                            { this.state.badges.points.display && <TextField name='badges' type='number' label='Pts' initial={this.state.badges.points.value} onChange={this.handlePointsChange('badges').bind(this)} required
                                                validations='isCollaboratorPointsValid'
                                                validationErrors={{
                                                    isDefaultRequiredValue: 'Ce champ est requis.',
                                                    isCollaboratorPointsValid: 'Le somme des points est supérieur au maximum de points'
                                                }}
                                            /> }
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>Challenges managers</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            { this.state.managerChallenges.percentage.display && <TextField name='hello' type='number' label='%' initial={this.state.managerChallenges.percentage.value} onChange={this.handlePercentageChange('managerChallenges').bind(this)} /> }
                                        </Grid>
                                        <Grid item>
                                            <FontAwesomeIcon icon={faAngleRight} className={classes.arrow} />
                                        </Grid>
                                        <Grid item>
                                            { this.state.managerChallenges.points.display && <TextField name='managerChallenges' type='number' label='Pts' initial={this.state.managerChallenges.points.value} onChange={this.handlePointsChange('managerChallenges').bind(this)} required
                                                validations='isCollaboratorPointsValid'
                                                validationErrors={{
                                                    isDefaultRequiredValue: 'Ce champ est requis.',
                                                    isCollaboratorPointsValid: 'Le somme des points est supérieur au maximum de points'
                                                }}
                                            /> }
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>Challenges globaux</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            { this.state.globalChallenges.percentage.display && <TextField name='hello' type='number' label='%' initial={this.state.globalChallenges.percentage.value} onChange={this.handlePercentageChange('globalChallenges').bind(this)} /> }
                                        </Grid>
                                        <Grid item>
                                            <FontAwesomeIcon icon={faAngleRight} className={classes.arrow} />
                                        </Grid>
                                        <Grid item>
                                            { this.state.globalChallenges.points.display && <TextField name='globalChallenges' type='number' label='Pts' initial={this.state.globalChallenges.points.value} onChange={this.handlePointsChange('globalChallenges').bind(this)} required
                                                validations='isCollaboratorPointsValid'
                                                validationErrors={{
                                                    isDefaultRequiredValue: 'Ce champ est requis.',
                                                    isCollaboratorPointsValid: 'Le somme des points est supérieur au maximum de points'
                                                }}
                                            /> }
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <ProgressButton type='submit' text='Valider' centered loading={loading} />
                        </Grid>
                    </Grid>
                </Formsy>
            </div>
        )
    }

    render() {
        const { types, loading: challengeTypeListLoading } = this.props.challengeTypeList;
        const { success: challengeTypeListUpdateSuccess } = this.props.challengeTypeListUpdate;
        const { configs, loading: configListLoading } = this.props.configList;
        const { success: configListUpdateSuccess } = this.props.configListUpdate;
        const loading = challengeTypeListLoading || configListLoading;
        const success = challengeTypeListUpdateSuccess && configListUpdateSuccess;

        if (success) {
            this.props.challengeTypeListUpdateActions.clearChallengeTypeListUpdate();
            this.props.configListUpdateActions.clearConfigListUpdate()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && types && configs && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ challengeTypeList, challengeTypeListUpdate, configList, configListUpdate }) => ({
    challengeTypeList,
    challengeTypeListUpdate,
    configList,
    configListUpdate
});

const mapDispatchToProps = (dispatch) => ({
    challengeTypeListActions: bindActionCreators(challengeTypeListActions, dispatch),
    challengeTypeListUpdateActions: bindActionCreators(challengeTypeListUpdateActions, dispatch),
    configListActions: bindActionCreators(configListActions, dispatch),
    configListUpdateActions: bindActionCreators(configListUpdateActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlayerPointConfig))