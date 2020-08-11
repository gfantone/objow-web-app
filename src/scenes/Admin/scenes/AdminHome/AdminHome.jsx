import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faStar, faUsers } from '@fortawesome/free-solid-svg-icons'
import {Card, DefaultText, DefaultTitle, GridLink, Loader, MainLayoutComponent, Select} from '../../../../components'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as nextPeriodListActions from '../../../../services/Periods/NextPeriodList/actions'

class AdminHome extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.period = null;
    }

    refresh(period) {
        var url = `/admin?period=${period}`;
        this.props.history.replace(url)
    }

    loadData() {
        const params = new URLSearchParams(window.location.search);
        const period = params.get('period');
        if (period != this.period) {
            this.period = period;
            this.setState(({
                ...this.state
            }))
        }
    }

    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
        this.props.nextPeriodListActions.getNextPeriodList();
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData()
    }

    renderLoader() {
        return <Loader centered />
    }

    handleYearChange(value) {
        this.refresh(value);
    }

    renderData() {
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: nextPeriods } = this.props.nextPeriodList;
        const periods = [currentPeriod].concat(nextPeriods);
        const periodId = this.period ? this.period : currentPeriod.id;

        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={6} container spacing={4}>
                        <Grid item xs={12} container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>
                                    <FontAwesomeIcon icon={faUsers} /> Utilisateurs et droits
                                </DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container spacing={2}>
                                        <GridLink item xs ={12} component={Link} to='/admin/users'>
                                            <DefaultText>Abonnements utilisateurs</DefaultText>
                                        </GridLink>
                                        <GridLink item xs ={12} component={Link} to='/admin/teams'>
                                            <DefaultText>Équipes</DefaultText>
                                        </GridLink>
                                        <GridLink item xs ={12} component={Link} to='/admin/access'>
                                            <DefaultText>Gestion droits d'accès</DefaultText>
                                        </GridLink>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={1} alignItems='flex-start'>
                            <Grid item xs={12}>
                                <DefaultTitle>
                                    <FontAwesomeIcon icon={faDatabase} /> Intégration et gestion de données
                                </DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container spacing={2}>
                                        <GridLink item xs ={12} component={Link} to='/admin/reports'>
                                            <DefaultText>Rapports</DefaultText>
                                        </GridLink>
                                        <GridLink item xs ={12} component={Link} to='/admin/imports/logs'>
                                            <DefaultText>Journal d'imports</DefaultText>
                                        </GridLink>
                                        <GridLink item xs ={12} component={Link} to='/admin/logo'>
                                            <DefaultText>Changement du logo</DefaultText>
                                        </GridLink>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>
                                        <FontAwesomeIcon icon={faStar} /> Configuration des indicateurs
                                    </DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Formsy>
                                                    <Select name={'year'} label={'Année à configurer'} options={periods} emptyDisabled initial={periodId} optionValueName={'id'} optionTextName={'name'} fullWidth onChange={this.handleYearChange.bind(this)} />
                                                </Formsy>
                                            </Grid>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/points`}>
                                                <DefaultText>Répartition générale des points</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/categories`}>
                                                <DefaultText>Catégories</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/goals`}>
                                                <DefaultText>Objectifs</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/goal-levels`}>
                                                <DefaultText>Points</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/challenges`}>
                                                <DefaultText>Challenges</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/badges`}>
                                                <DefaultText>Défis</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/levels`}>
                                                <DefaultText>Level</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/reward-categories`}>
                                                <DefaultText>Récompenses</DefaultText>
                                            </GridLink>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        const { period: currentPeriod, loading: currentPeriodDetailLoading } = this.props.currentPeriodDetail;
        const { periods: nextPeriods, loading: nextPeriodListLoading } = this.props.nextPeriodList;
        const loading = currentPeriodDetailLoading || nextPeriodListLoading;

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && currentPeriod && nextPeriods && this.renderData() }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    nextPeriodListActions: bindActionCreators(nextPeriodListActions, dispatch)
});

const mapStateToProps = ({ currentPeriodDetail, nextPeriodList }) => ({
    currentPeriodDetail,
    nextPeriodList
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
