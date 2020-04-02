import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AppBarSubTitle, Card, DataTable, DefaultText, InfoText, Loader, MainLayoutComponent } from '../../../../components'
import * as badgeListActions from '../../../../services/Badges/BadgeList/actions'
import * as badgeLevelRemainingPointsActions from '../../../../services/BadgeLevels/BadgeLevelRemainingPoints/actions'

const styles = {
    icon: {
        height: 34,
        width: 34
    }
};

class AdminBadgeList extends MainLayoutComponent {
    componentDidMount() {
        const periodId = this.props.match.params.periodId;
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title='Configuration des défis' />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.badgeListActions.getBadgeList(periodId);
        this.props.badgeLevelRemainingPointsActions.getBadgeLevelRemainingPoints(periodId)
    }

    handleClick(id) {
        this.props.history.push(`/admin/badges/${id}`)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { classes } = this.props;
        const { badges } = this.props.badgeList;
        const { points: remainingPoints } = this.props.badgeLevelRemainingPoints;
        var columns = [
            { name: 'id', options: { display: false, filter: false } },
            { name: 'code', label: 'Icône', options: {
                customBodyRender: value => {
                    const iconData = require(`../../../../assets/img/system/badge/icons/${value}.svg`);
                    return <CardMedia image={iconData} className={classes.icon} />
                },
                filter: false
            } },
            { name: 'privateTitle', label: 'Défis' },
            { name: 'levels', label: 'Nombre de rang' },
            { name: 'points', label: 'Pts/joueur mis en jeu' },
        ];
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => { this.props.history.push(`/admin/periods/${this.props.match.params.periodId}/badges/${colData[0]}`) }
        };

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <Grid container>
                            <Grid item>
                                <InfoText>Points restants à attribuer</InfoText>
                                <DefaultText>{remainingPoints} PTS</DefaultText>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <DataTable data={badges} columns={columns} options={options} />
                </Grid>
            </Grid>
        )
    }

    render() {
        const { badges, loading: badgeListLoading } = this.props.badgeList;
        const { points, loading: badgeLevelRemainingPointsLoading } = this.props.badgeLevelRemainingPoints;
        const loading = badgeListLoading || badgeLevelRemainingPointsLoading;

        return(
            <div>
                { loading && this.renderLoader() }
                { !loading && badges && points != null && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ badgeList, badgeLevelRemainingPoints }) => ({
    badgeList,
    badgeLevelRemainingPoints
});

const mapDispatchToProps = (dispatch) => ({
    badgeListActions: bindActionCreators(badgeListActions, dispatch),
    badgeLevelRemainingPointsActions: bindActionCreators(badgeLevelRemainingPointsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(AdminBadgeList)))
