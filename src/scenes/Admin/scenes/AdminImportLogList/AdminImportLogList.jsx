import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppBarSubTitle, DataTable, Loader, MainLayoutComponent } from '../../../../components'
import * as importLogListActions from '../../../../services/ImportLogs/ImportLogList/actions'
import '../../../../helpers/StringHelper'

class AdminImportLogList extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Journal d'import" />);
        this.props.activateReturn();
        this.props.importLogListActions.getImportLogList()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        var { logs } = this.props.importLogList;
        const columns = [
            { name: 'id', label: 'Ref' },
            { name: 'file', label: 'Fichier' },
            { name: 'date', label: "Date d'exécution", options: {
                filter: false,
                customBodyRender: value => {
                    return value.toDate().toLocaleString()
                }
            } },
            { name: 'state.name', label: 'État' }
        ];
        const options = {
            selectableRows: 'none'
        };

        return <DataTable data={logs} columns={columns} options={options} />
    }

    render() {
        const { logs, loading } = this.props.importLogList;

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && logs && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ importLogList }) => ({
    importLogList
});

const mapDispatchToProps = (dispatch) => ({
    importLogListActions: bindActionCreators(importLogListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminImportLogList)
