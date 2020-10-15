import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CardMedia, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {AircallForm} from './components'
import {AppBarSubTitle, DefaultTitle, InfoText, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as partnerDetailActions from '../../../../services/Partners/PartnerDetail/actions'

const styles = {
    logo: {
        height: 150,
        width: 150
    }
}

class AdminPartnerDetail extends MainLayoutComponent {
    componentDidMount() {
        const id = this.props.match.params.id
        this.props.handleTitle(Resources.ADMIN_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.ADMIN_PARTNER_DETAIL_SUBTITLE} />)
        this.props.handleMaxWidth('md')
        this.props.activateReturn()
        this.props.kpiListActions.getKpiListByPartner(id)
        this.props.partnerDetailActions.getPartner(id)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyConnection() {
        return <InfoText>{Resources.ADMIN_PARTNER_DETAIL_EMPTY_CONNECTION}</InfoText>
    }

    renderData() {
        const {classes} = this.props
        const {kpis} = this.props.kpiList
        const {partner} = this.props.partnerDetail

        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item>
                        <CardMedia image={partner.logo} className={classes.logo} />
                    </Grid>
                    <Grid item xs>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <DefaultTitle>{partner.name}</DefaultTitle>
                                <InfoText>{partner.description}</InfoText>
                            </Grid>
                            <Grid item xs={12}>
                                {!partner.hasToken && this.renderEmptyConnection()}
                                {partner.hasToken && partner.code === 'AC' && <AircallForm kpis={kpis} />}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        const {kpis, loading: kpiListLoading} = this.props.kpiList
        const {partner, loading: partnerDetailLoading} = this.props.partnerDetail
        const loading = kpiListLoading || partnerDetailLoading

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && kpis && partner && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({kpiList, partnerDetail}) => ({
    kpiList,
    partnerDetail
})

const mapDispatchToProps = (dispatch) => ({
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    partnerDetailActions: bindActionCreators(partnerDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminPartnerDetail))
