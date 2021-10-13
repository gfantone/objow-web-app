import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Forsmy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { AppBarSubTitle, Loader, MainLayoutComponent, ProgressButton, Select, Switch, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '../../../../components'
import * as challengeTypeSummaryListActions from '../../../../services/ChallengeTypeSummaries/ChallengeTypeSummaryList/actions'
import * as challengeTypeListUpdateActions from '../../../../services/ChallengeTypes/ChallengeTypeListUpdate/actions'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import * as configListUpdateActions from '../../../../services/Configs/ConfigListUpdate/actions'
import * as periodicityListActions from '../../../../services/Periodicities/PeriodicityList/actions'
import { getWeeksOfYear } from '../../../../helpers/DateHelper'
import '../../../../helpers/StringHelper'

class AdminChallenge extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            managerChallengePeriodicity: null,
            globalChallengePeriodicity: null,
            teamChallengePeriodicity: null,
        };
        this.props.challengeTypeListUpdateActions.clearChallengeTypeListUpdate();
        this.props.configListUpdateActions.clearConfigListUpdate()
    }

    componentDidMount() {
        const periodId = this.props.match.params.periodId;
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title='Configuration des challenges' />);
        this.props.activateReturn();
        this.props.challengeTypeSummaryListActions.getChallengeTypeSummaryList(periodId);
        this.props.configListActions.getPermanentConfigList();
        this.props.periodicityListActions.getPeriodicityList()
    }

    getPeriodPoints(points, periodicity) {
        if (periodicity && periodicity.code == 'W') {
            const weeks = getWeeksOfYear();
            return Math.round(points / weeks)
        } else if (periodicity && periodicity.code == 'M') {
            return Math.round(points / 12)
        } else if (periodicity && periodicity.code == 'Q') {
            return Math.round(points / 4)
        } else if (periodicity && periodicity.code == 'S') {
            return Math.round(points / 2)
        } else if (periodicity && periodicity.code == 'Y') {
            return points
        } else {
            return 0
        }
    }

    handlePeriodicityChange = name => periodicity => {
        this.setState({
            ...this.state,
            [name]: periodicity
        })
    };

    handleSubmit(model) {
        const { types } = this.props.challengeTypeSummaryList;
        const managerChallenge = types.find(x => x.code == 'CM');
        const globalChallenge = types.find(x => x.code == 'CC');
        const teamChallenge = types.find(x => x.code == 'CT');
        var configs = [];
        const keys = Object.keys(model);
        for (var i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (Number.isInteger(Number(key))) {
                configs.push({id: key, value: model[key]})
            }
        }
        managerChallenge.periodicity = model.CM;
        globalChallenge.periodicity = model.CC;
        teamChallenge.periodicity = model.CT;
        this.props.challengeTypeListUpdateActions.updateChallengeTypeList([managerChallenge, globalChallenge, teamChallenge]);
        this.props.configListUpdateActions.updateConfigList(configs)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { types } = this.props.challengeTypeSummaryList;
        const { loading } = this.props.challengeTypeListUpdate;
        const { configs } = this.props.configList;
        const { periodicities } = this.props.periodicityList;

        const teamChallenge = types.find(x => x.code == 'CT');
        const globalChallenge = types.find(x => x.code == 'CC');

        

        const globalChallengePeriodicity = globalChallenge.periodicityId ? periodicities.find(x => x.id == globalChallenge.periodicityId) : this.state.globalChallengePeriodicity ? periodicities.find(x => x.id == this.state.globalChallengePeriodicity) : null;
        const globalChallengePeriodPoints = globalChallenge.periodicityId ? globalChallenge.periodPoints : this.getPeriodPoints(globalChallenge.points, globalChallengePeriodicity);
        const globalChallengeAddedPoints = globalChallenge.periodicityId ? globalChallenge.addedPoints : 0;
        const globalChallengeNextPeriodPoints = globalChallenge.periodicityId ? globalChallenge.nextPeriodPoints : globalChallengePeriodPoints;
        const teamChallengePeriodicity = teamChallenge.periodicityId ? periodicities.find(x => x.id == teamChallenge.periodicityId) : this.state.teamChallengePeriodicity ? periodicities.find(x => x.id == this.state.teamChallengePeriodicity) : null;
        const teamChallengePeriodPoints = teamChallenge.periodicityId ? teamChallenge.periodPoints : this.getPeriodPoints(teamChallenge.points, teamChallengePeriodicity);
        const teamChallengeAddedPoints = teamChallenge.periodicityId ? teamChallenge.addedPoints : 0;
        const teamChallengeNextPeriodPoints = teamChallenge.periodicityId ? teamChallenge.nextPeriodPoints : teamChallengePeriodPoints;
        const challengeRankActivation = configs.find(x => x.code == 'CRA');
        const challengeMaxActivation = configs.find(x => x.code == 'CMA');
        const challengeManagerEdit = configs.find(x => x.code == 'MCE');
        const challengeTitleActivation = configs.find(x => x.code == 'CTTA');

        return (
            <div>
                <Forsmy onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Switch name={challengeRankActivation.id} label='Activer les challenges de type « Classement »' initial={challengeRankActivation.value.toBoolean()} />
                            <Switch name={challengeMaxActivation.id} label='Activer les challenges de type « Cumuler un maximum de points »' initial={challengeMaxActivation.value.toBoolean()} />
                            <Switch name={challengeManagerEdit.id} label="Activer l'édition des challenges par les managers" initial={challengeManagerEdit.value.toBoolean()} />
                            <Switch name={challengeTitleActivation.id} label="Activer les titres de challenge sur les miniatures" initial={challengeTitleActivation.value.toBoolean()} />
                        </Grid>
                        <Grid item xs={12}>
                            <ProgressButton type='submit' text='Valider' loading={loading} centered />
                        </Grid>
                    </Grid>
                </Forsmy>
            </div>
        )
    }

    render() {
        const { types, loading: challengeTypeSummaryListLoading } = this.props.challengeTypeSummaryList;
        const { success: challengeTypeListUpdateSuccess } = this.props.challengeTypeListUpdate;
        const { configs, loading: configListLoading } = this.props.configList;
        const { success: configListUpdateSuccess } = this.props.configListUpdate;
        const { periodicities, loading: periodicityListLoading } = this.props.periodicityList;
        const loading = challengeTypeSummaryListLoading || configListLoading || periodicityListLoading;
        const success = challengeTypeListUpdateSuccess && configListUpdateSuccess;

        if (success) {
            this.props.challengeTypeListUpdateActions.clearChallengeTypeListUpdate();
            this.props.configListUpdateActions.clearConfigListUpdate();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && types && types.length > 0 && configs && periodicities && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ challengeTypeListUpdate, challengeTypeSummaryList, configList, configListUpdate, periodicityList }) => ({
    challengeTypeListUpdate,
    challengeTypeSummaryList,
    configList,
    configListUpdate,
    periodicityList
});

const mapDispatchToProps = (dispatch) => ({
    challengeTypeListUpdateActions: bindActionCreators(challengeTypeListUpdateActions, dispatch),
    challengeTypeSummaryListActions: bindActionCreators(challengeTypeSummaryListActions, dispatch),
    configListActions: bindActionCreators(configListActions, dispatch),
    configListUpdateActions: bindActionCreators(configListUpdateActions, dispatch),
    periodicityListActions: bindActionCreators(periodicityListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminChallenge)
