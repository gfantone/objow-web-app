import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { SubHeader } from './components'
import { MainLayoutComponent, ProgressButton, TextField, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '../../../../components'
import * as collaboratorDataListActions from '../../../../services/CollaboratorData/CollaboratorDataList/actions'
import * as collaboratorDataUpdateActions from '../../../../services/CollaboratorData/CollaboratorDataUpdate/actions'
import * as kpiDetailActions from '../../../../services/Kpis/KpiDetail/actions'

class AdminReportDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.props.collaboratorDataUpdateActions.clearCollaboratorDataUpdate()
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<SubHeader />);
        this.props.activateReturn();
        this.props.collaboratorDataListActions.getCollaboratorDataList(id);
        this.props.kpiDetailActions.getKpiDetail(id)
    }

    handleSubmit(model) {
        const data = [];
        const keys = Object.keys(model);
        keys.map(key => {
            const item = { id: key, value: model[key] };
            data.push(item)
        });
        this.props.collaboratorDataUpdateActions.updateCollaboratorData(data)
    }

    renderData() {
        const { data } = this.props.collaboratorDataList;
        const { kpi } = this.props.kpiDetail;
        const { loading } = this.props.collaboratorDataUpdate;

        return (
            <Formsy onSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>ID</TableHeadCell>
                                    <TableHeadCell>Collaborateur</TableHeadCell>
                                    <TableHeadCell>Équipes</TableHeadCell>
                                    <TableHeadCell>Résultat cumulé période</TableHeadCell>
                                    <TableHeadCell>Résultat cumulé période précédente</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { data.map(item => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.firstname} {item.lastname}</TableCell>
                                            <TableCell>{item.team}</TableCell>
                                            <TableCell>
                                                { kpi.manual && <TextField type='number' name={item.dataId} initial={item.dataValue} /> }
                                                { !kpi.manual && <span>{item.dataValue}</span> }
                                            </TableCell>
                                            <TableCell>
                                                { kpi.manual && item.previousDataId && <TextField type='number' name={item.previousDataId} initial={item.previousDataValue} /> }
                                                { !kpi.manual && <span>{item.previousDataValue}</span> }
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) }
                            </TableBody>
                        </Table>
                    </Grid>
                    { kpi.manual && <Grid item xs={12}>
                        <ProgressButton type='submit' text='Valider' loading={loading} centered />
                    </Grid> }
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { data, loading: collaboratorDataListLoading } = this.props.collaboratorDataList;
        const { kpi, loading: kpiDetailLoading } = this.props.kpiDetail;
        const loading = collaboratorDataListLoading || kpiDetailLoading;
        const { success } = this.props.collaboratorDataUpdate;

        if (success) {
            this.props.collaboratorDataUpdateActions.clearCollaboratorDataUpdate();
            this.props.history.goBack()
        }

        return (
            <div>
                { !loading && data && kpi && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ collaboratorDataList, collaboratorDataUpdate, kpiDetail }) => ({
    collaboratorDataList,
    collaboratorDataUpdate,
    kpiDetail
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorDataListActions: bindActionCreators(collaboratorDataListActions, dispatch),
    collaboratorDataUpdateActions: bindActionCreators(collaboratorDataUpdateActions, dispatch),
    kpiDetailActions: bindActionCreators(kpiDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminReportDetail)