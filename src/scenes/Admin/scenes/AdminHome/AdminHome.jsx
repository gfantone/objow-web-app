import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faStar, faUsers } from '@fortawesome/free-solid-svg-icons'
import {Card, DefaultText, DefaultTitle, GridLink, Loader, MainLayoutComponent, Select} from '../../../../components'
import * as Resources from '../../../../Resources'
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
        const { account } = this.props.accountDetail;

        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={6} container spacing={4}>
                        <Grid item xs={12} container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>
                                    <FontAwesomeIcon icon={faUsers} /> {Resources.ADMIN_HOME_USER_AREA}
                                </DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container spacing={2}>
                                        <GridLink item xs ={12} component={Link} to='/admin/users'>
                                            <DefaultText>{Resources.ADMIN_HOME_USER_LINK}</DefaultText>
                                        </GridLink>
                                        <GridLink item xs ={12} component={Link} to='/admin/teams'>
                                            <DefaultText>{Resources.ADMIN_HOME_TEAM_LINK}</DefaultText>
                                        </GridLink>
                                        <GridLink item xs ={12} component={Link} to='/admin/access'>
                                            <DefaultText>{Resources.ADMIN_HOME_PERMISSION_LINK}</DefaultText>
                                        </GridLink>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={1} alignItems='flex-start'>
                            <Grid item xs={12}>
                                <DefaultTitle>
                                    <FontAwesomeIcon icon={faDatabase} /> {Resources.ADMIN_HOME_DATA_AREA}
                                </DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container spacing={2}>
                                        <GridLink item xs ={12} component={Link} to='/admin/partners'>
                                            <DefaultText>{Resources.ADMIN_HOME_PARTNER_LINK}</DefaultText>
                                        </GridLink>
                                        <GridLink item xs ={12} component={Link} to='/admin/reports'>
                                            <DefaultText>{Resources.ADMIN_HOME_REPORT_LINK}</DefaultText>
                                        </GridLink>
                                        <GridLink item xs ={12} component={Link} to='/admin/imports/logs'>
                                            <DefaultText>{Resources.ADMIN_HOME_IMPORT_LINK}</DefaultText>
                                        </GridLink>
                                        <GridLink item xs ={12} component={Link} to='/admin/logo'>
                                            <DefaultText>{Resources.ADMIN_HOME_LOGO_LINK}</DefaultText>
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
                                        <FontAwesomeIcon icon={faStar} /> {Resources.ADMIN_HOME_INDICATOR_AREA}
                                    </DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Formsy>
                                                    <Select name={'year'} label={Resources.ADMIN_HOME_YEAR_LABEL} options={periods} emptyDisabled initial={periodId} optionValueName={'id'} optionTextName={'name'} fullWidth onChange={this.handleYearChange.bind(this)} />
                                                </Formsy>
                                            </Grid>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/points`}>
                                                <DefaultText>{Resources.ADMIN_HOME_POINT_LINK}</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/categories`}>
                                                <DefaultText>{Resources.ADMIN_HOME_CATEGORY_LINK}</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/goals`}>
                                                <DefaultText>{Resources.ADMIN_HOME_GOAL_LINK}</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/goal-levels/mode-select`}>
                                                <DefaultText>{Resources.ADMIN_HOME_GOAL_LEVEL_LINK}</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/challenges`}>
                                                <DefaultText>{account.challengeWording || Resources.ADMIN_HOME_CHALLENGE_LINK}</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/badges`}>
                                                <DefaultText>{Resources.ADMIN_HOME_BADGE_LINK}</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/periods/${periodId}/levels`}>
                                                <DefaultText>{Resources.ADMIN_HOME_LEVEL_LINK}</DefaultText>
                                            </GridLink>
                                            <GridLink item xs={12} component={Link} to={`/admin/reward-categories`}>
                                                <DefaultText>{Resources.ADMIN_HOME_REWARD_LINK}</DefaultText>
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

const mapStateToProps = ({ currentPeriodDetail, nextPeriodList, accountDetail }) => ({
    currentPeriodDetail,
    nextPeriodList,
    accountDetail
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
