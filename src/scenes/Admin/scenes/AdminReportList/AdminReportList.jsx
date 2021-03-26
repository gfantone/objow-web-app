import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { AppBarSubTitle, DataTable, Loader, MainLayoutComponent, GridLink } from '../../../../components'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'

class AdminReportList extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle('Administration')
        this.props.handleSubHeader(<AppBarSubTitle title='Liste des rapports' />)
        this.props.activateReturn()
        this.props.kpiListActions.getKpiList()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { kpis } = this.props.kpiList
        const columns = [
            { name: 'id', label: 'Ref KPI' },
            { name: 'name', label: 'Intitulé du KPI' },
            { name: 'unit.name', label: 'Unité du résultat' },
            { name: 'manual', label: 'Format', options: {
                customBodyRender: value => {
                    return value ? 'Manuel' : 'Standard'
                }
            } },
            { name: 'periodicity.description', label: 'Actualisation' },
            { name: 'category.name', label: 'Catégorie' }
        ]
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => { this.props.history.push(`/admin/reports/${colData[0]}`) }
        }
        // TODO : link to metabase dashboard 
        // <GridLink component={Link} to={`/admin/dashboard`}>Dashboard</GridLink>
        return (
            <React.Fragment>
              <DataTable data={kpis} columns={columns} options={options} />
            </React.Fragment>
        )
    }

    render() {
        const { kpis, loading } = this.props.kpiList

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && kpis && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ kpiList }) => ({
    kpiList
})

const mapDispatchToProps = (dispatch) => ({
    kpiListActions: bindActionCreators(kpiListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminReportList)
