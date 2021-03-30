import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { AppBarSubTitle, DataTable, Loader, MainLayoutComponent, GridLink } from '../../../../components'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'

class AdminReportList extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle('Administration')
        this.props.handleSubHeader(<AppBarSubTitle title='Liste des rapports' />)
        this.props.activateReturn()
        this.props.kpiListActions.getKpiList()
        this.props.configListActions.getPermanentConfigList()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { kpis } = this.props.kpiList
        const { configs } = this.props.configList
        const MTBS = configs && configs.find(c => c.code === 'MTBS')
        console.log(configs);
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
        return (
            <React.Fragment>
              {
                MTBS && (
                  <GridLink component={Link} to={`/admin/dashboard`}>Dashboard</GridLink>
                )
              }
              <DataTable data={kpis} columns={columns} options={options} />
            </React.Fragment>
        )
    }

    render() {
        const { kpis, loading } = this.props.kpiList
        const { configs, loading: configLoading } = this.props.configList

        return (
            <div>
                { loading && configLoading && this.renderLoader() }
                { !loading && !configLoading && kpis && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ kpiList, configList }) => ({
    kpiList,
    configList
})

const mapDispatchToProps = (dispatch) => ({
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    configListActions: bindActionCreators(configListActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminReportList)
