import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { AppBarSubTitle, DataTable, IconButton, Loader, MainLayoutComponent } from '../../../../components'
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions'

const styles = {
    root: {
        position: 'relative'
    },
    iconMargin: {
        marginRight: 16
    },
    loader: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

class AdminGoalList extends MainLayoutComponent {
    constructor(props) {
        super(props)
    }

    handleCreate() {
        this.props.history.push(`/admin/periods/${this.props.match.params.periodId}/goals/creation`)
    }

    handleCreateFolder() {
        this.props.history.push('/admin/category')
    }

    componentDidMount() {
        const { classes } = this.props;
        this.props.activateReturn();
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title='Configuration des objectifs' />);
        this.props.handleMaxWidth('lg');
        this.props.handleButtons(<div>
            <Tooltip title='Créer une catégorie'>
                <IconButton size='small' onClick={this.handleCreateFolder.bind(this)} classes={{root: classes.iconMargin}}><FontAwesomeIcon icon={faFolderPlus} /></IconButton>
            </Tooltip>
            <Tooltip title='Créer un objectif'>
                <IconButton size='small' onClick={this.handleCreate.bind(this)}><FontAwesomeIcon icon={faPlus} /></IconButton>
            </Tooltip>
        </div>);
        this.props.actions.getGoalDefinitionList(this.props.match.params.periodId)
    }

    _renderLoader() {
        return (
            <div className={this.props.classes.loader}>
                <Loader />
            </div>
        )
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { definitions } = this.props.goalDefinitionList;
        var columns = [
            { name: 'id', label: 'Ref' },
            { name: 'name', label: 'Nom' },
            { name: 'kpi.unit.name', label: 'Unité' },
            { name: 'type.description', label: 'Objectif' },
            { name: 'periodicity.description', label: 'Périodicité' },
            { name: 'target', label: 'Obj. global annuel' },
            { name: 'default', label: 'Par défaut' },
            { name: 'category.name', label: 'Catégorie' }
        ];
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => { this.props.history.push(`/admin/periods/${this.props.match.params.periodId}/goals/modification/${colData[0]}`) }
        };
        return <DataTable data={definitions} columns={columns} options={options} />
    }

    render() {
        const { definitions, loading } = this.props.goalDefinitionList;

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && definitions && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ goalDefinitionList }) => ({
    goalDefinitionList
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(goalDefinitionListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(AdminGoalList)))