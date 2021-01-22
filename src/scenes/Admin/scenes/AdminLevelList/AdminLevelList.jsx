import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as levelListActions from '../../../../services/Levels/LevelList/actions'
import * as levelListCreationActions from '../../../../services/Levels/LevelListCreation/actions'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import {SubHeader} from './components'
import {DataTable, IconButton, Loader} from '../../../../components'
import {CardMedia} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"

const styles = {
    icon: {
        height: 34,
        width: 34
    }
}

class AdminLevelList extends Component {
    onAdd() {
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const periodId = this.period ? this.period : currentPeriod.id;
        console.log(periodId);
        this.props.history.push(`/admin/periods/${periodId}/levels/creation`)
    }

    loadData() {
        this.props.levelListActions.getLevelList()

    }

    componentDidMount() {
        const periodId = this.props.match.params.periodId;
        this.props.activateReturn();
        this.props.handleTitle('Administration');
        this.props.levelListActions.getLevelList(periodId);
        this.props.configListActions.getConfigList(periodId)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {classes} = this.props
        const {levels} = this.props.levelList
        const columns = [
            { name: 'id', options: {display: false, filter: false} },
            { name: 'icon.path', label: 'Icône', options: {
                customBodyRender: value => {
                    return <CardMedia image={value} className={classes.icon} />
                },
                filter: false
            } },
            // { title: 'name', label: 'Nom' },
        ]
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => {
                this.props.history.push(`/admin/levels/modification/${colData[0]}`)
            }
        }
        return <DataTable data={levels} columns={columns} options={options} />
    }

    render() {
        const {levels, loading} = this.props.levelList
        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && levels && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({ configList, levelList, levelListCreation }) => ({
    configList,
    levelList,
    levelListCreation
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    levelListActions: bindActionCreators(levelListActions, dispatch),
    levelListCreationActions: bindActionCreators(levelListCreationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminLevelList))
