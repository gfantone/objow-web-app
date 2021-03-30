import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { AppBarSubTitle, DataTable, Loader, MainLayoutComponent, GridLink, RoundedTabs, RoundedTab } from '../../../../components'
import { SubHeader } from './components'
import { AdminMetabase } from '../AdminMetabase'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'

class AdminReportList extends MainLayoutComponent {

    constructor(props) {
      super(props);
      this.state = {
        tabValue: 0
      }
    }

    componentDidMount() {
        this.props.handleTitle('Administration')
        this.props.handleSubHeader(<SubHeader handleChangeTab={ this.handleChangeTab }/>)
        this.props.activateReturn()
        this.props.kpiListActions.getKpiList()
        this.props.configListActions.getPermanentConfigList()
    }

    handleChangeTab = (value) => {
      this.setState({
        ...this.state,
        tabValue: value
      })
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { kpis } = this.props.kpiList
        const { configs } = this.props.configList
        const MTBS = configs && configs.find(c => c.code === 'MTBS')


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
                this.state.tabValue === 0 && <DataTable data={kpis} columns={columns} options={options} />
              }
              {
                this.state.tabValue === 1 && <AdminMetabase MTBS={ MTBS } />
              }
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
