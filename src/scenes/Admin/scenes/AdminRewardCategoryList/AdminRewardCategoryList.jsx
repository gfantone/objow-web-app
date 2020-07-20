import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CardMedia, Grid} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"
import {DataTable, IconButton, Loader, MainLayoutComponent} from '../../../../components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import * as Resources from '../../../../Resources'
import {RewardSettings, SubHeader} from './components'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions'

const styles = {
    icon: {
        height: 34,
        width: 34
    }
}

class AdminRewardCategoryList extends MainLayoutComponent {
    loadData(isActive) {
        if (isActive) {
            this.props.rewardCategoryListActions.getActiveRewardCategoryList()
        } else {
            this.props.rewardCategoryListActions.getInactiveRewardCategoryList()
        }
    }

    handleActivationChange(isActive) {
        this.loadData(isActive)
    }

    handleAdd() {
        this.props.history.push(`/admin/reward-categories/creation`)
    }

    componentDidMount() {
        this.props.handleTitle('Administration')
        this.props.handleSubHeader(<SubHeader onChange={this.handleActivationChange.bind(this)} />)
        this.props.handleButtons(<IconButton size='small' onClick={this.handleAdd.bind(this)}><FontAwesomeIcon icon={faPlus} /></IconButton>)
        this.props.handleMaxWidth('sm')
        this.props.activateReturn()
        this.loadData(true)
        this.props.configListActions.getPermanentConfigList()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {classes} = this.props
        const {categories} = this.props.rewardCategoryList
        const columns = [
            { name: 'id', options: {display: false, filter: false} },
            { name: 'icon.path', label: Resources.ADMIN_REWARD_CATEGORY_LIST_ICON_COLUMN, options: {
                customBodyRender: value => {
                    return <CardMedia image={value} className={classes.icon} />
                },
                filter: false
            } },
            { name: 'name', label: Resources.ADMIN_REWARD_CATEGORY_LIST_NAME_COLUMN },
        ]
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => {
                this.props.history.push(`/admin/reward-categories/modification/${colData[0]}`)
            }
        }
        return <DataTable data={categories} columns={columns} options={options} />
    }

    renderSettings() {
        return <RewardSettings />
    }

    render() {
        const {configs, loading: configListLoading} = this.props.configList
        const {categories, loading: rewardCategoryListLoading} = this.props.rewardCategoryList
        const loading = configListLoading || rewardCategoryListLoading

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {loading && this.renderLoader()}
                        {!loading && categories && this.renderData()}
                    </Grid>
                    <Grid item xs={12}>
                        {!configListLoading && configs && this.renderSettings()}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({configList, rewardCategoryList}) => ({
    configList,
    rewardCategoryList
})

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    rewardCategoryListActions: bindActionCreators(rewardCategoryListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminRewardCategoryList))
